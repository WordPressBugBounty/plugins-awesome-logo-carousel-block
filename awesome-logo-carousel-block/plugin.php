<?php
/**
 * Plugin Name:       Awesome Logo Carousel Block
 * Plugin URI:        https://logocarousel.gutenbergkits.com
 * Description:       Showcase brand logos in interactive grid, carousel, slider, ticker, and list view.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           2.2.3
 * Author:            Gutenbergkits Team
 * Author URI:        https://gutenbergkits.com
 * License:           GPL-2.0-or-later
 * Text Domain:       awesome-logo-carousel-block
 * Domain Path:       /languages
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main Plugin Class
 * 
 * Handles the initialization and core hooks for the plugin.
 */
final class Alcb_Plugin {

	/**
	 * Plugin Version
	 *
	 * @var string
	 */
	const VERSION = '2.2.3';

	/**
	 * Instance
	 *
	 * @var self|null
	 */
	private static $instance = null;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	private function __construct() {
		$this->constants();
		$this->includes();
		$this->hooks();
	}

	/**
	 * Define Constants
	 *
	 * @return void
	 */
	private function constants() {
		if ( ! defined( 'ALCB_VERSION' ) ) {
			define( 'ALCB_VERSION', self::VERSION );
		}
		if ( ! defined( 'ALCB_FILE' ) ) {
			define( 'ALCB_FILE', __FILE__ );
		}
		if ( ! defined( 'ALCB_URL' ) ) {
			define( 'ALCB_URL', plugin_dir_url( __FILE__ ) );
		}
		if ( ! defined( 'ALCB_PATH' ) ) {
			define( 'ALCB_PATH', plugin_dir_path( __FILE__ ) );
		}
		if ( ! defined( 'ALCB_INC' ) ) {
			define( 'ALCB_INC', plugin_dir_path( __FILE__ ) . 'inc/' );
		}
	}

	/**
	 * Include required files
	 *
	 * @return void
	 */
	private function includes() {
		require_once ALCB_INC . 'instance.php';
		require_once ALCB_INC . 'init.php';
		require_once ALCB_PATH . 'admin/admin.php';
	}

	/**
	 * Setup Hooks
	 *
	 * @return void
	 */
	private function hooks() {
		// Media Custom Field Hooks
		add_filter( 'attachment_fields_to_edit', [ $this, 'add_custom_link_field_to_media' ], 10, 2 );
		add_filter( 'attachment_fields_to_save', [ $this, 'save_custom_link_field' ], 10, 2 );
		add_action( 'rest_api_init', [ $this, 'register_custom_link_rest_field' ] );

		register_activation_hook( __FILE__, [ $this, 'redirect_to_admin' ] );
		add_action( 'admin_init', [ $this, 'handle_redirection' ] );
	}

	/**
	 * Add custom link field to media
	 *
	 * @param array   $form_fields Form fields.
	 * @param \WP_Post $post        Post object.
	 * @return array
	 */
	public function add_custom_link_field_to_media( $form_fields, $post ) {
		$form_fields['alcb_custom_link'] = [
			'label' => __( 'Link', 'awesome-logo-carousel-block' ),
			'input' => 'text',
			'value' => get_post_meta( $post->ID, '_alcb_custom_link', true ),
			'helps' => __( 'Custom link for this image', 'awesome-logo-carousel-block' ),
		];
		return $form_fields;
	}

	/**
	 * Save custom link field
	 *
	 * @param array $post       Post data.
	 * @param array $attachment Attachment data.
	 * @return array
	 */
	public function save_custom_link_field( $post, $attachment ) {
		if ( isset( $attachment['alcb_custom_link'] ) ) {
			update_post_meta( $post['ID'], '_alcb_custom_link', sanitize_text_field( $attachment['alcb_custom_link'] ) );
		}
		return $post;
	}

	/**
	 * Register custom link field in REST API
	 *
	 * @return void
	 */
	public function register_custom_link_rest_field() {
		register_rest_field(
			'attachment',
			'alcb_custom_link',
			[
				'get_callback'    => function( $object ) {
					return get_post_meta( $object['id'], '_alcb_custom_link', true );
				},
				'update_callback' => function( $value, $object ) {
					return update_post_meta( $object['id'], '_alcb_custom_link', sanitize_text_field( $value ) );
				},
				'schema'          => [
					'description' => __( 'Custom link for the image', 'awesome-logo-carousel-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
				],
			]
		);
	}

	/**
	 * Set transient for admin redirection on activation
	 *
	 * @return void
	 */
	public function redirect_to_admin() {
		set_transient( '_alcb_redirect', true, 30 );
	}

	/**
	 * Handle admin redirection
	 *
	 * @return void
	 */
	public function handle_redirection() {
		if ( get_transient( '_alcb_redirect' ) ) {
			delete_transient( '_alcb_redirect' );
			wp_safe_redirect( admin_url( 'options-general.php?page=alcb-carousel' ) );
			exit;
		}
	}

	/**
	 * Get the singleton instance
	 *
	 * @return self
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}

/**
 * Initialize the plugin
 *
 * @return Alcb_Plugin
 */
function alcb_logo_carousel() {
	return Alcb_Plugin::get_instance();
}

alcb_logo_carousel();
