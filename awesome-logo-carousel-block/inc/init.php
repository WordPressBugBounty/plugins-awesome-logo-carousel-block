<?php
/**
 * Init Class for Awesome Logo Carousel Block Plugin 
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initialization Class
 * 
 * Handles block category registration and orchestrates other core classes.
 */
class Alcb_Init {

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
		add_filter( 'block_categories_all', [ $this, 'register_block_category' ], 10, 2 );
		$this->includes();
	}

	/**
	 * Register Block Category
	 *
	 * @param array[]  $categories Block categories.
	 * @param \WP_Post $post       Post being loaded.
	 * @return array[]
	 */
	public function register_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			[
				[
					'slug'  => 'alcb-blocks',
					'title' => __( 'Logo Blocks', 'awesome-logo-carousel-block' ),
					'icon'  => null,
				],
			]
		);
	}

	/**
	 * Includes Files and Initializes Core Classes
	 * 
	 * @return void
	 */
	public function includes() {
		require_once ALCB_INC . 'classes/register.php';
		require_once ALCB_INC . 'classes/enqueue.php';
		require_once ALCB_INC . 'classes/style.php';

		Alcb_Register_Blocks::get_instance();
		Alcb_Enqueue::get_instance();
		Alcb_Style::get_instance();
	}

}

// Initialize the core classes
Alcb_Init::get_instance();
