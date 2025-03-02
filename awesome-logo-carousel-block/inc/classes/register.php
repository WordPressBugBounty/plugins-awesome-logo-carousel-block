<?php 
/**
 * Register Class to register the blocks
 */

namespace AwesomeLogoCarouselBlocks\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if( ! class_exists( 'Alcb_Register_Blocks' ) ) {

    class Alcb_Register_Blocks {

        use Alcb_Instance;

        /**
         * Constructor
         * 
         * @return void
         */
        public function __construct() {
            add_action( 'init', [ $this, 'register_block' ] );
        }

        /**
         * Register Block
         * 
         * @return void
         */
        public function register_block() {
            $blocks = ['logo-carousel'];
           

            if ( ! empty( $blocks ) and is_array( $blocks ) ) {
				foreach ( $blocks as $block ) {
					register_block_type( trailingslashit( ALCB_PATH ) . '/build/blocks/' . $block );
				}
			}
        }
    }

    // Initialize the class
    Alcb_Register_Blocks::get_instance();

}