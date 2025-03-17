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
        add_action( 'admin_init', [ $this, 'awesome_logo_carousel_block_dci_plugin' ] );
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


    /**
     * SDK Integration
     */
    public function awesome_logo_carousel_block_dci_plugin() {
        // Include DCI SDK.
        require_once ALCB_PATH . 'admin/dci/start.php';
        wp_register_style('dci-sdk-awesome-logo-carousel-block', ALCB_URL . 'admin/dci/assets/css/dci.css', array(), '1.2.1', 'all');
        wp_enqueue_style('dci-sdk-awesome-logo-carousel-block');

        dci_dynamic_init( array(
          'sdk_version'   => '1.2.1',
          'product_id'    => 9,
          'plugin_name'   => 'Logo Carousel', // make simple, must not empty
          'plugin_title'  => 'Love using Logo Carousel? Congrats 🎉  ( Never miss an Important Update )', // You can describe your plugin title here
          'api_endpoint'  => 'https://dashboard.codedivo.com/wp-json/dci/v1/data-insights',
          'slug'          => 'awesome-logo-carousel-block', // folder-name or write 'no-need' if you don't want to use
          'core_file'     => false,
          'plugin_deactivate_id' => false,
          'menu'          => array(
            'slug' => 'aclb-carousel',
          ),
          'public_key'    => 'pk_Ds7qp5gH1LRkcaEGJlRr1VJ8l9DkL7IH',
          'is_premium'    => false,
          'popup_notice'  => false,
          'deactivate_feedback' => false,
          'text_domain'  => 'awesome-logo-carousel-block',
          'plugin_msg'   => '<p>Be Top-contributor by sharing non-sensitive plugin data and create an impact to the global WordPress community today! You can receive valuable emails periodically.</p>',
        ) );

      }
              
}

new Alcb_Admin_Page();