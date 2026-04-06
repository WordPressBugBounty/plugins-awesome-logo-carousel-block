<?php
/**
 * Admin Support Page
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock\Admin;

use AwesomeLogoCarouselBlock\Inc\Alcb_Instance;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Alcb_Admin_Page
 * 
 * Handles the configuration of the plugin admin page.
 */
class Alcb_Admin_Page {

	use Alcb_Instance;

	/**
	 * Constructor
	 * 
	 * @return void
	 */
	private function __construct() {
		add_action( 'admin_menu', [ $this, 'alcb_plugin_admin_page' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'alcb_admin_page_assets' ] );
	}

	/**
	 * Enqueue Admin Assets
	 *
	 * @param string $screen The current admin screen.
	 * @return void
	 */
	public function alcb_admin_page_assets( $screen ) {
		if ( 'settings_page_alcb-carousel' === $screen ) {
			wp_enqueue_style( 'alcb-admin-asset', plugins_url( 'css/admin.css', __FILE__ ), [], \ALCB_VERSION );
			wp_enqueue_script( 'alcb-admin-asset', plugins_url( 'js/admin.js', __FILE__ ), [ 'jquery' ], \ALCB_VERSION, true );
		}
	}

	/**
	 * Register Admin Page
	 *
	 * @return void
	 */
	public function alcb_plugin_admin_page() {
		add_submenu_page(
			'options-general.php',
			__( 'Logo Carousel Block', 'awesome-logo-carousel-block' ),
			__( 'Logo Carousel Block', 'awesome-logo-carousel-block' ),
			'manage_options',
			'alcb-carousel',
			[ $this, 'alcb_admin_page_content_callback' ]
		);
	}

	/**
	 * Welcome page content callback
	 *
	 * @return void
	 */
	public function alcb_admin_page_content_callback() {
		?>
		<!-- Main Dashboard Container -->
		<div class="lc-dashboard-container">
			<!-- Header Section -->
			 <header class="outer">
				<div class="lc-dashboard-header inner-wrapper">
					<div class="lc-header-left">
						<div class="lc-logo">
							<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="2.5" y="2.5" width="95" height="95" rx="17.5" stroke="#2A5462" stroke-width="5"/>
								<path d="M35.2998 25.5H63.7002C64.4693 25.5 65.1109 25.7245 65.6484 26.1719L65.873 26.3779C66.4566 26.9651 66.75 27.6848 66.75 28.5713V71.4287C66.75 72.2043 66.5257 72.8514 66.0791 73.3926L65.874 73.6182L65.8721 73.6191C65.2911 74.2056 64.5788 74.5 63.7002 74.5H35.2998C34.531 74.5 33.8883 74.2748 33.3486 73.8252L33.123 73.6191C32.5421 73.0346 32.25 72.3158 32.25 71.4287V28.5713C32.25 27.6847 32.5422 26.9649 33.123 26.3779C33.7064 25.7931 34.4207 25.5 35.2998 25.5ZM17.5498 32.6426H24.6504C25.4197 32.6427 26.0629 32.8673 26.6025 33.3154L26.8271 33.5205C27.408 34.1074 27.7001 34.8274 27.7002 35.7139V64.2861C27.7001 65.0623 27.4764 65.7098 27.0312 66.251L26.8262 66.4766C26.2427 67.0633 25.5287 67.3573 24.6504 67.3574H17.5498C16.7809 67.3574 16.1392 67.1319 15.6016 66.6826L15.3779 66.4766L15.376 66.4756L15.1709 66.25C14.7242 65.7088 14.5001 65.0617 14.5 64.2861V35.7139C14.5001 34.9382 14.7248 34.2903 15.1719 33.7471L15.377 33.5205C15.9578 32.9362 16.6707 32.6426 17.5498 32.6426ZM74.3496 32.6426H81.4502C82.2192 32.6426 82.861 32.8672 83.3984 33.3145L83.623 33.5205C84.2066 34.1077 84.4999 34.8274 84.5 35.7139V64.2861C84.4999 65.0617 84.2758 65.7088 83.8291 66.25L83.624 66.4756L83.6221 66.4766C83.0411 67.063 82.3287 67.3574 81.4502 67.3574H74.3496C73.5808 67.3573 72.939 67.1319 72.4014 66.6826L72.1777 66.4766L72.1768 66.4756L71.9717 66.25C71.5248 65.7087 71.2999 65.0619 71.2998 64.2861V35.7139C71.2999 34.9383 71.5246 34.2903 71.9717 33.7471L72.1768 33.5205C72.7575 32.9362 73.4706 32.6427 74.3496 32.6426Z" fill="#2A5462" stroke="#2A5462"/>
							</svg>
						</div>
						<nav class="lc-main-nav">
							<ul class="lc-nav-list">
								<li class="tab__title active" data-tab="tab1"><?php esc_html_e( 'Welcome', 'awesome-logo-carousel-block' ); ?></li>
								<?php
								if ( class_exists( '\Alcb_Logo_Carousel_Pro' ) ) :
									?>
								<li class="tab__title" data-tab="tab2"><?php esc_html_e( 'License', 'awesome-logo-carousel-block' ); ?></li>
									<?php
									else :
										?>
								<a href="https://logocarousel.gutenbergkits.com/pricing" target="_blank" class="lc-btn pro-btn">
										<?php esc_html_e( 'Get Pro', 'awesome-logo-carousel-block' ); ?>
								</a>
										<?php
									endif;
								?>
							</ul>
						</nav>
					</div>
					<div class="lc-header-right">
						<span class="lc-version">v<?php echo esc_html( \ALCB_VERSION ); ?></span>
						<a href="https://logocarousel.gutenbergkits.com" class="lc-external-link" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
								<polyline points="15 3 21 3 21 9"></polyline>
								<line x1="10" y1="14" x2="21" y2="3"></line>
							</svg>
						</a>
					</div>
				</div>
			</header>

			<!-- Welcome Content -->
			<div class="lc-dashboard-content">
				<div class="inner-wrapper">
					<div class="tabs__panels">
						<div class="tab__panel active" id="tab1">
							<!-- Hero Section -->
							<section class="lc-hero-section">
								<div class="lc-hero-content">
									<h1><?php esc_html_e( 'Welcome to Logo Carousel Block', 'awesome-logo-carousel-block' ); ?></h1>
									<p><?php esc_html_e( 'A fast, fully customizable & beautiful WordPress block suitable for showcasing client logos, brand partners, and sponsors. It is very lightweight and offers unparalleled speed.', 'awesome-logo-carousel-block' ); ?></p>
									<div class="lc-hero-buttons">
										<a href="<?php
											echo ! class_exists( '\Alcb_Logo_Carousel_Pro' ) ? esc_url( 'https://logocarousel.gutenbergkits.com/pricing/' ) : esc_url( 'https://logocarousel.gutenbergkits.com/demos/' );
										?>" class="lc-btn lc-btn-primary"><?php
												if ( ! class_exists( '\Alcb_Logo_Carousel_Pro' ) ) {
													esc_html_e( 'Upgrade to Pro', 'awesome-logo-carousel-block' );
												} else {
													esc_html_e( 'Explore Demos', 'awesome-logo-carousel-block' );
												}
										?></a>
									</div>
								</div>
								<div class="lc-hero-video">
									<div class="lc-video-container">
										<iframe width="100%" height="315" src="https://www.youtube.com/embed/SXGosLhHadU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									</div>
								</div>
							</section>

							<!-- Two Column Layout -->
							<div class="lc-two-column-section">
								<!-- Left Column - Features -->
								<div class="lc-features-column">
									<h2><?php esc_html_e( 'Available Blocks', 'awesome-logo-carousel-block' ); ?></h2>
									<div class="lc-features-grid">
										<div class="lc-feature-box">
											<h3><?php esc_html_e( 'Carousel', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'showcase logos in carousel style with customization options.', 'awesome-logo-carousel-block' ); ?></p>
											<span class="tags">
												<?php echo esc_html__( 'Freemium', 'awesome-logo-carousel-block' ); ?>
											</span>
										</div>
										<div class="lc-feature-box">
											<h3><?php esc_html_e( 'Grid & List', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'showcase logos in grid and list style with customization options.', 'awesome-logo-carousel-block' ); ?></p>
											<span class="tags">
												<?php echo esc_html__( 'Freemium', 'awesome-logo-carousel-block' ); ?>
											</span>
										</div>
										<div class="lc-feature-box">
											<h3><?php esc_html_e( 'Stagger', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'showcase logos in sliding mode with Stagger Effect.', 'awesome-logo-carousel-block' ); ?></p>
											<span class="tags pro">
												<?php echo esc_html__( 'Premium', 'awesome-logo-carousel-block' ); ?>
											</span>
										</div>
										<div class="lc-feature-box">
											<h3><?php esc_html_e( 'Ticker-Marquee', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'showcase logos in infinite ticker or marquee style.', 'awesome-logo-carousel-block' ); ?></p>
											<span class="tags pro">
												<?php echo esc_html__( 'Premium', 'awesome-logo-carousel-block' ); ?>
											</span>
										</div>
									</div>
								</div>
								
								<!-- Right Column - Extensions -->
								<div class="lc-extensions-column">
									<h2><?php esc_html_e( 'Extend Your Website', 'awesome-logo-carousel-block' ); ?></h2>

									<!-- GutenLayouts -->
									<div class="lc-extension-item">
										<div class="lc-extension-content">
											<h3><?php esc_html_e( 'GutenLayouts', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'Ultimate Gutenberg patterns and templates.', 'awesome-logo-carousel-block' ); ?></p>
										</div>
										<div class="lc-extension-action">
											<a href="https://gutenlayouts.com" class="lc-btn lc-btn-small" target="_blank"><?php esc_html_e( 'More', 'awesome-logo-carousel-block' ); ?></a>
										</div>
									</div>

									<!-- Extension 1 -->
									<div class="lc-extension-item">
										<div class="lc-extension-content">
											<h3><?php esc_html_e( 'GutSlider', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'All in One Block Slider for Gutenberg Editor.', 'awesome-logo-carousel-block' ); ?></p>
										</div>
										<div class="lc-extension-action">
											<a href="https://gutslider.com" class="lc-btn lc-btn-small" target="_blank"><?php esc_html_e( 'Get it', 'awesome-logo-carousel-block' ); ?></a>
										</div>
									</div>
									
									<!-- Extension 2 -->
									<div class="lc-extension-item">
										<div class="lc-extension-content">
											<h3><?php esc_html_e( 'Easy Accordion Block', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'Create stunning accordions and faqs in Gutenberg editor', 'awesome-logo-carousel-block' ); ?></p>
										</div>
										<div class="lc-extension-action">
											<a href="https://accordion.gutenbergkits.com/" class="lc-btn lc-btn-small" target="_blank"><?php esc_html_e( 'Get it', 'awesome-logo-carousel-block' ); ?></a>
										</div>
									</div>
									
									<!-- Extension 4 -->
									<div class="lc-extension-item">
										<div class="lc-extension-content">
											<h3><?php esc_html_e( 'Google Map', 'awesome-logo-carousel-block' ); ?></h3>
											<p><?php esc_html_e( 'Embed Google Maps easily in Gutenberg editor.', 'awesome-logo-carousel-block' ); ?></p>
										</div>
										<div class="lc-extension-action">
											<a href="https://wordpress.org/plugins/gmap-block/" class="lc-btn lc-btn-small" target="_blank"><?php esc_html_e( 'Install', 'awesome-logo-carousel-block' ); ?></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- License Tab Content -->
						<div class="tab__panel" id="tab2">
							<?php
								do_action( 'alcb_license_page' );
							?>
						</div>
					</div>
					<!-- Three Column Support Section -->
					<section class="lc-support-section">
						<!-- Support Box 1 -->
						<div class="lc-support-box">
							<div class="lc-support-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
								</svg>
							</div>
							<h3><?php esc_html_e( 'Premium Support', 'awesome-logo-carousel-block' ); ?></h3>
							<p><?php esc_html_e( 'Get fast and reliable support from our expert team.', 'awesome-logo-carousel-block' ); ?></p>
							<a href="https://support.gutenbergkits.com" target="_blank" class="lc-btn lc-btn-outline"><?php esc_html_e( 'Get Support', 'awesome-logo-carousel-block' ); ?></a>
						</div>
						
						<!-- Support Box 2 -->
						<div class="lc-support-box">
							<div class="lc-support-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
							</div>
							<h3><?php esc_html_e( 'Contact Us', 'awesome-logo-carousel-block' ); ?></h3>
							<p><?php esc_html_e( 'Have questions? Our team is ready to help you.', 'awesome-logo-carousel-block' ); ?></p>
							<a href="mailto:gutenbergkits@gmail.com" class="lc-btn lc-btn-outline"><?php esc_html_e( 'Contact', 'awesome-logo-carousel-block' ); ?></a>
						</div>
						
						<!-- Support Box 3 -->
						<div class="lc-support-box">
							<div class="lc-support-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
								</svg>
							</div>
							<h3><?php esc_html_e( 'Rate Our Plugin', 'awesome-logo-carousel-block' ); ?></h3>
							<p><?php esc_html_e( 'Love Logo Carousel Block? Leave us a review.', 'awesome-logo-carousel-block' ); ?></p>
							<a href="https://wordpress.org/plugins/awesome-logo-carousel-block/#reviews" target="_blank" class="lc-btn lc-btn-outline"><?php esc_html_e( 'Rate Plugin', 'awesome-logo-carousel-block' ); ?></a>
						</div>
					</section>
				</div>
			</div>
		</div>
		<?php
	}
}

// Initialize the class.
Alcb_Admin_Page::get_instance();