<?php
/**
 * Create a trait to handle the instance of the class
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Trait Alcb_Instance
 * 
 * Implements the singleton pattern functionality for classes.
 */
trait Alcb_Instance {

	/**
	 * Instance
	 *
	 * @var self|null
	 */
	private static $instance = null;

	/**
	 * Get Instance
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
