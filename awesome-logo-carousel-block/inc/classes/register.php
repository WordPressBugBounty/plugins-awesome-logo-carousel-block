<?php
/**
 * Register Class to register the blocks
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Alcb_Register_Blocks
 * 
 * Handles registration of Gutenberg blocks.
 */
class Alcb_Register_Blocks {

	use Alcb_Instance;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ] );
		if ( ! wp_is_block_theme() ) {
			add_filter( 'should_load_separate_core_block_assets', '__return_true' );
		}
	}

	/**
	 * Register Block
	 *
	 * @return void
	 */
	public function register_block() {

		$blocks = [
			[
				'name'   => 'logo-carousel',
				'is_pro' => false,
			],
			[
				'name'   => 'logo',
				'is_pro' => false,
			],
			[
				'name'   => 'grid-logo',
				'is_pro' => false,
			],
			[
				'name'   => 'stagger-child',
				'is_pro' => true,
			],
			[
				'name'   => 'stagger',
				'is_pro' => true,
			],
			[
				'name'   => 'ticker-child',
				'is_pro' => true,
			],
			[
				'name'   => 'ticker-carousel',
				'is_pro' => true,
			],
		];

		/**
		 * Filters the blocks this plugin registers.
		 *
		 * Lets the Pro plugin register its own blocks instead of requiring a
		 * free release every time it adds one. The hardcoded Pro entries above
		 * stay as the default on purpose: dropping them would unregister the
		 * Pro blocks on every site running a Pro build that predates this
		 * filter, which would break their existing content.
		 *
		 * @since 2.3.0
		 * @param array $blocks List of [ 'name' => string, 'is_pro' => bool ].
		 */
		$blocks = apply_filters( 'alcb_registered_blocks', $blocks );

		if ( ! empty( $blocks ) && is_array( $blocks ) ) {
			foreach ( $blocks as $block ) {

				if ( $block['is_pro'] ) {

					/*
					 * ALCBP_PATH is defined by the Pro plugin. Checking only for
					 * the class is not enough: on PHP 8 an undefined constant is
					 * a fatal error rather than a notice, so a Pro build that
					 * defines the class before the constant would take the whole
					 * site down here.
					 */
					if ( ! class_exists( '\Alcb_Logo_Carousel_Pro' ) || ! defined( 'ALCBP_PATH' ) ) {
						continue;
					}

					$block_path = trailingslashit( ALCBP_PATH ) . 'build/blocks/' . $block['name'];
					if ( file_exists( $block_path ) ) {
						register_block_type( $block_path );
					}
				} else {
					$block_path = trailingslashit( ALCB_PATH ) . 'build/blocks/' . $block['name'];
					if ( file_exists( $block_path ) ) {
						register_block_type( $block_path );
					}
				}
			}
		}
	}
}