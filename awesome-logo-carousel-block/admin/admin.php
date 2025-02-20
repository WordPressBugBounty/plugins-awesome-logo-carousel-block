<?php
/**
 * Admin Support Page
*/

namespace AwesomeLogoCarouselBlocks\Admin;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Alcb_Admin_Page {
    /**
     * Contructor 
    */
    public function __construct(){
        add_action( 'admin_menu', [ $this, 'aclb_plugin_admin_page' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'aclb_admin_page_assets' ] );
    }

    // Admin Assets
    public function aclb_admin_page_assets($screen) {
        if( 'settings_page_aclb-carousel' == $screen ) {
            wp_enqueue_style( 'admin-asset', plugins_url('css/admin-page.css', __FILE__ ) );
        }
    }

    // Admin Page
    public function aclb_plugin_admin_page(){
        add_submenu_page( 'options-general.php', __('Logo Carousel Block','awesome-logo-carousel-blocks'), __('Logo Carousel Block','awesome-logo-carousel-blocks'), 'manage_options', 'aclb-carousel', [ $this, 'aclb_admin_page_content_callback' ] );
    }
    public function aclb_admin_page_content_callback(){
        ?>
            <div class="admin_page_container">
                <div class="plugin_head">
                    <div class="head_container">
                        <h1 class="plugin_title"><?php echo esc_html__('Logo Carousel Block','awesome-logo-carousel-blocks'); ?></h1>
                        <h4 class="plugin_subtitle"><?php echo esc_html__('A Custom Gutenberg Block to Create an excellent clients Logo Carousel in your Gutenberg Editor', 'awesome-logo-carousel-blocks'); ?></h4>
                    </div>
                </div>
                <div class="plugin_body">
                    <div class="doc_video_area">
                        <div class="doc_video">
                            <iframe width="100%" height="350" src="https://www.youtube.com/embed/YteoGr18R_Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="support_area">
                        <div class="single_support pro_support">
                            <h4 class="title"> <?php echo esc_html__('Unlock Pro Features','awesome-logo-carousel-blocks'); ?></h4>
                            <p class="description">
                                <?php echo esc_html__('Unlock more features and get premium support by upgrading to Pro version.','awesome-logo-carousel-blocks'); ?>
                            </p>
                            <div class="support_btn">
                                <a href="https://logocarousel.gutenbergkits.com" class="pro-btn">
                                    <?php echo esc_html__('Upgrade to Pro','awesome-logo-carousel-blocks'); ?>
                                </a>
                            </div>
                        </div>
                        <div class="single_support">
                            <h4 class="title"><?php echo esc_html__('Get Support','awesome-logo-carousel-blocks'); ?></h4>
                            <div class="support_btn">
                                <a href="https://support.gutenbergkits.com" target="_blank"><?php echo esc_html__('Contact','awesome-logo-carousel-blocks'); ?></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php 
    }
}

new Alcb_Admin_Page();