<?php
/**
 * Enqueue scripts and styles.
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Alcb_Enqueue
 * 
 * Handles enqueueing of editor and frontend assets.
 */
class Alcb_Enqueue {

	use Alcb_Instance;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	private function __construct() {
		$this->hooks();
	}

	/**
	 * Hooks
	 *
	 * @return void
	 */
	public function hooks() {
		// Priority 5 so the handles exist before blocks are registered on init
		// at the default priority and resolve their block.json dependencies.
		add_action( 'init', [ $this, 'register_editor_scripts' ], 5 );
		// After block registration on init (priority 10), when block.json's
		// script handles exist.
		add_action( 'init', [ $this, 'set_block_script_translations' ], 20 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ], 2 );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
	}

	/**
	 * Register editor scripts early enough to be used as block.json dependencies.
	 *
	 * `alcb-modules` exposes window.alcbModules, which every block's
	 * attributes.js and save.js destructure at module scope. It used to be
	 * enqueued directly on enqueue_block_editor_assets without being declared
	 * as a dependency of any block, so load order was incidental: if a block
	 * script ever ran first, destructuring undefined would throw, registration
	 * would never happen, and every logo block on the page would render as
	 * "unrecognized block". Registering here lets block.json depend on it.
	 *
	 * @since 2.3.0
	 * @return void
	 */
	public function register_editor_scripts() {
		$modules_asset = trailingslashit( ALCB_PATH ) . 'build/modules/index.asset.php';

		if ( ! file_exists( $modules_asset ) ) {
			return;
		}

		$md_file = require $modules_asset;

		if ( ! is_array( $md_file ) ) {
			return;
		}

		wp_register_script(
			'alcb-modules',
			ALCB_URL . 'build/modules/index.js',
			$md_file['dependencies'],
			$md_file['version'],
			false
		);

		// Translations for the ~260 JS strings. Without this call none of them
		// are translatable at runtime, however complete the POT file is.
		wp_set_script_translations( 'alcb-modules', 'awesome-logo-carousel-block', trailingslashit( ALCB_PATH ) . 'languages' );
	}

	/**
	 * Attach translations to the scripts WordPress registers from block.json.
	 *
	 * Runs after block registration (init, priority 10) because the handles do
	 * not exist before then. The frontend view script needs this too now that
	 * it carries the carousel's accessibility strings.
	 *
	 * @since 2.3.0
	 * @return void
	 */
	public function set_block_script_translations() {
		$languages = trailingslashit( ALCB_PATH ) . 'languages';

		foreach ( [ 'logo-carousel', 'grid-logo', 'logo' ] as $block ) {
			foreach ( [ 'editor-script', 'view-script' ] as $suffix ) {
				$handle = 'lcb-' . $block . '-' . $suffix;

				if ( wp_script_is( $handle, 'registered' ) ) {
					wp_set_script_translations( $handle, 'awesome-logo-carousel-block', $languages );
				}
			}
		}
	}

	/**
	 * Enqueue Block Editor Assets
	 *
	 * @return void
	 */
	public function enqueue_block_editor_assets() {

		// Modules — registered on init so block.json can depend on the handle.
		wp_enqueue_script( 'alcb-modules' );

		// Global.
		if ( file_exists( ALCB_PATH . 'build/global/index.asset.php' ) ) {
			$gd_file = require ALCB_PATH . 'build/global/index.asset.php';
			if ( is_array( $gd_file ) ) {
				wp_register_script(
					'alcb-global',
					ALCB_URL . 'build/global/index.js',
					$gd_file['dependencies'],
					$gd_file['version'],
					false
				);
				wp_register_style(
					'alcb-global-style',
					ALCB_URL . 'build/global/index.css',
					[],
					$gd_file['version'],
					'all'
				);
			}
		}

		// Localize script.
		wp_localize_script(
			'alcb-global',
			'alcbData',
			[
				'hasPro' => class_exists( '\Alcb_Logo_Carousel_Pro' ),
			]
		);
		wp_enqueue_script( 'alcb-global' );
	}

	/**
	 * Enqueue Block Assets
	 *
	 * @return void
	 */
	public function enqueue_block_assets() {
		wp_register_style( 'alcb-swiper', ALCB_URL . 'inc/assets/css/swiper-bundle.min.css', [], '11.1.14', 'all' );
		wp_register_script( 'alcb-swiper', ALCB_URL . 'inc/assets/js/swiper-bundle.min.js', [], '11.1.14', true );
	}
}