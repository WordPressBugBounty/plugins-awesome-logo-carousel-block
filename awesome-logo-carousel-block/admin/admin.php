<?php
/**
 * Admin Dashboard Page
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
	 * Marketing stats shown in the hero.
	 *
	 * Update these when the WordPress.org listing changes.
	 */
	const STAT_INSTALLS = '4,000+';
	const STAT_RATING   = '4.2';
	const STAT_BLOCKS   = '5';

	/**
	 * External URLs used across the dashboard.
	 */
	const URL_HOME    = 'https://logocarousel.gutenbergkits.com';
	const URL_PRICING = 'https://logocarousel.gutenbergkits.com/pricing/';
	const URL_DEMOS   = 'https://logocarousel.gutenbergkits.com/demos/';
	const URL_DOCS    = 'https://logocarousel.gutenbergkits.com/docs/';
	const URL_SUPPORT = 'https://support.gutenbergkits.com';
	const URL_REVIEW  = 'https://wordpress.org/support/plugin/awesome-logo-carousel-block/reviews/#new-post';
	const VIDEO_ID    = 'SXGosLhHadU';

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
	 * Whether the Pro plugin is active.
	 *
	 * @return bool
	 */
	private function has_pro() {
		return class_exists( '\Alcb_Logo_Carousel_Pro' );
	}

	/**
	 * Whether Pro is active but its license is not.
	 *
	 * Guarded with method_exists so an older Pro release, which exposes
	 * is_valid() but not get_license(), still resolves rather than fatally
	 * erroring on the free plugin's dashboard.
	 *
	 * @return bool True when Pro is running unlicensed.
	 */
	private function pro_needs_license() {
		return $this->has_pro()
			&& class_exists( '\Alcbp_Pro_License' )
			&& method_exists( '\Alcbp_Pro_License', 'is_valid' )
			&& ! \Alcbp_Pro_License::is_valid();
	}

	/**
	 * Which unlicensed state Pro is in.
	 *
	 * @return string One of `inactive`, `expired` or `invalid`.
	 */
	private function license_state() {
		if ( ! method_exists( '\Alcbp_Pro_License', 'get_license' ) ) {
			return 'inactive';
		}

		$license = \Alcbp_Pro_License::get_license();

		if ( '' === $license['license_key'] ) {
			return 'inactive';
		}

		if ( 'expired' === $license['status'] ) {
			return 'expired';
		}

		// A key still marked valid that fails is_valid() has run past its
		// expiry date rather than being rejected outright.
		if ( 'valid' === $license['status'] ) {
			return 'expired';
		}

		return 'invalid';
	}

	/**
	 * Enqueue Admin Assets
	 *
	 * @param string $screen The current admin screen.
	 * @return void
	 */
	public function alcb_admin_page_assets( $screen ) {
		if ( 'settings_page_alcb-carousel' !== $screen ) {
			return;
		}

		wp_enqueue_style( 'alcb-admin-asset', plugins_url( 'css/admin.css', __FILE__ ), [], \ALCB_VERSION );
		wp_enqueue_script( 'alcb-admin-asset', plugins_url( 'js/admin.js', __FILE__ ), [], \ALCB_VERSION, true );

		wp_localize_script(
			'alcb-admin-asset',
			'alcbAdmin',
			[
				'videoId'     => self::VIDEO_ID,
				'videoTitle'  => __( 'Logo Carousel Block — 2 minute tour', 'awesome-logo-carousel-block' ),
				'copied'      => __( 'Copied', 'awesome-logo-carousel-block' ),
				'copyFailed'  => __( 'Press Ctrl/Cmd + C to copy', 'awesome-logo-carousel-block' ),
			]
		);
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
	 * Inline SVG icon.
	 *
	 * All icons share a 24x24 stroke outline style.
	 *
	 * @param string $name  Icon slug.
	 * @param int    $size  Rendered size in px.
	 * @return string Escaped SVG markup.
	 */
	private function icon( $name, $size = 16 ) {
		$paths = [
			'sparkles'       => '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
			'arrow-up-right' => '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
			'arrow-right'    => '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
			'chevron-right'  => '<path d="m9 18 6-6-6-6"/>',
			'circle-check'   => '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
			'plus'           => '<path d="M5 12h14"/><path d="M12 5v14"/>',
			'play'           => '<polygon points="6 3 20 12 6 21 6 3"/>',
			'lock'           => '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
			'carousel'       => '<rect width="10" height="16" x="7" y="4" rx="2"/><path d="M3 6.5v11"/><path d="M21 6.5v11"/>',
			'grid'           => '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
			'layers'         => '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.18-9.17 4.16a2 2 0 0 1-1.66 0L2 12.18"/><path d="m22 17.18-9.17 4.16a2 2 0 0 1-1.66 0L2 17.18"/>',
			'ticker'         => '<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>',
			'marquee'        => '<path d="M4 12h16"/><path d="m15 7 5 5-5 5"/><path d="M4 5v14"/>',
			'book-open'      => '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
			'life-buoy'      => '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
			'star'           => '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
			'template'       => '<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/>',
			'images'         => '<path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="m22 13-1.3-1.3a2 2 0 0 0-2.8 0L14 16"/><circle cx="12" cy="8" r="2"/><rect width="16" height="16" x="6" y="2" rx="2"/>',
			'accordion'      => '<path d="m7 20 5-5 5 5"/><path d="m7 4 5 5 5-5"/>',
			'copy'           => '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
			'key'            => '<path d="m15.5 7.5 3 3L22 7l-3-3"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
			'info'           => '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
			'alert-triangle' => '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
		];

		if ( ! isset( $paths[ $name ] ) ) {
			return '';
		}

		return sprintf(
			'<svg class="alcb-icon" width="%1$d" height="%1$d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">%2$s</svg>',
			absint( $size ),
			$paths[ $name ]
		);
	}

	/**
	 * The block catalogue rendered on the Overview and Blocks tabs.
	 *
	 * @return array
	 */
	private function get_blocks() {
		return [
			[
				'slug'  => 'carousel',
				'icon'  => 'carousel',
				'title' => __( 'Carousel', 'awesome-logo-carousel-block' ),
				'desc'  => __( 'Sliding logo showcase with autoplay, loop and navigation controls.', 'awesome-logo-carousel-block' ),
				'pro'   => false,
				'long'  => __( 'The flagship block. Powered by Swiper with responsive columns, adjustable gap, autoplay and delay, infinite loop, auto height, keyboard and mousewheel control, navigation arrows and pagination.', 'awesome-logo-carousel-block' ),
			],
			[
				'slug'  => 'grid',
				'icon'  => 'grid',
				'title' => __( 'Grid & List', 'awesome-logo-carousel-block' ),
				'desc'  => __( 'Static logo layouts in a responsive grid or simple list.', 'awesome-logo-carousel-block' ),
				'pro'   => false,
				'long'  => __( 'A no-JavaScript CSS grid for when motion is not wanted. Per-device columns and gap, captions and descriptions, hover overlays with slide and scale animations, and full typography control.', 'awesome-logo-carousel-block' ),
			],
			[
				'slug'  => 'stagger',
				'icon'  => 'layers',
				'title' => __( 'Stagger', 'awesome-logo-carousel-block' ),
				'desc'  => __( 'Offset sliding rows with a smooth staggered motion effect.', 'awesome-logo-carousel-block' ),
				'pro'   => true,
				'long'  => __( 'Rotates logos in and out of a grid one cell at a time. Eight animation presets including rotate, fill in, skew and blur, with adjustable stagger delay and group pause.', 'awesome-logo-carousel-block' ),
			],
			[
				'slug'  => 'ticker',
				'icon'  => 'ticker',
				'title' => __( 'Ticker', 'awesome-logo-carousel-block' ),
				'desc'  => __( 'Infinite marquee scrolling that never stops or resets.', 'awesome-logo-carousel-block' ),
				'pro'   => true,
				'long'  => __( 'A continuously scrolling logo strip with pixel-per-second speed control and pause on hover. Logos are cloned automatically so the loop never visibly restarts.', 'awesome-logo-carousel-block' ),
			],
			[
				'slug'  => 'marquee',
				'icon'  => 'marquee',
				'title' => __( 'Marquee', 'awesome-logo-carousel-block' ),
				'desc'  => __( 'CSS-only scrolling row or column for any block content.', 'awesome-logo-carousel-block' ),
				'pro'   => true,
				'long'  => __( 'Accepts any inner blocks, not just logos. Horizontal or vertical orientation, four directions, pause on hover, and per-item width, border and padding. Runs on pure CSS with no JavaScript.', 'awesome-logo-carousel-block' ),
			],
		];
	}

	/**
	 * Welcome page content callback
	 *
	 * @return void
	 */
	public function alcb_admin_page_content_callback() {
		$has_pro = $this->has_pro();

		$tabs = [
			'overview' => __( 'Overview', 'awesome-logo-carousel-block' ),
			'blocks'   => __( 'Blocks', 'awesome-logo-carousel-block' ),
			'help'     => __( 'Help', 'awesome-logo-carousel-block' ),
		];

		if ( $has_pro ) {
			$tabs['license'] = __( 'License', 'awesome-logo-carousel-block' );
		}

		/*
		 * Read server-side so a redirect back from a form handler — the Pro
		 * license screen posts to admin-post.php and returns to
		 * ?page=alcb-carousel&tab=license — lands on the right panel even
		 * before any JavaScript runs.
		 */
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only tab selection.
		$active = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'overview';

		if ( ! isset( $tabs[ $active ] ) ) {
			$active = 'overview';
		}
		?>
		<div class="alcb-app" id="alcb-app" data-active-tab="<?php echo esc_attr( $active ); ?>">

			<header class="alcb-topbar">
				<div class="alcb-topbar__inner">

					<div class="alcb-brand">
						<span class="alcb-brand__mark" aria-hidden="true">
							<i></i><i></i><i></i>
						</span>
						<span class="alcb-brand__name"><?php esc_html_e( 'Logo Carousel', 'awesome-logo-carousel-block' ); ?></span>
					</div>

					<nav class="alcb-tabs" role="tablist" aria-label="<?php esc_attr_e( 'Dashboard sections', 'awesome-logo-carousel-block' ); ?>">
						<?php
						foreach ( $tabs as $slug => $label ) :
							$on = $slug === $active;
							?>
							<button
								type="button"
								class="alcb-tab<?php echo $on ? ' is-active' : ''; ?>"
								role="tab"
								id="alcb-tab-<?php echo esc_attr( $slug ); ?>"
								aria-controls="alcb-panel-<?php echo esc_attr( $slug ); ?>"
								aria-selected="<?php echo $on ? 'true' : 'false'; ?>"
								<?php echo $on ? '' : 'tabindex="-1"'; ?>
								data-tab="<?php echo esc_attr( $slug ); ?>"
							>
								<?php echo esc_html( $label ); ?>
							</button>
						<?php endforeach; ?>
					</nav>

					<div class="alcb-topbar__end">
						<span class="alcb-version">v<?php echo esc_html( \ALCB_VERSION ); ?></span>

						<a class="alcb-textlink" href="<?php echo esc_url( self::URL_DOCS ); ?>" target="_blank" rel="noopener noreferrer">
							<?php esc_html_e( 'Documentation', 'awesome-logo-carousel-block' ); ?>
							<?php echo $this->icon( 'arrow-up-right', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</a>

						<?php if ( $has_pro ) : ?>
							<a class="alcb-btn alcb-btn--dark" href="<?php echo esc_url( self::URL_DEMOS ); ?>" target="_blank" rel="noopener noreferrer">
								<?php echo $this->icon( 'sparkles', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<?php esc_html_e( 'Explore demos', 'awesome-logo-carousel-block' ); ?>
							</a>
						<?php else : ?>
							<a class="alcb-btn alcb-btn--dark" href="<?php echo esc_url( self::URL_PRICING ); ?>" target="_blank" rel="noopener noreferrer">
								<?php echo $this->icon( 'sparkles', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<?php esc_html_e( 'Upgrade', 'awesome-logo-carousel-block' ); ?>
							</a>
						<?php endif; ?>
					</div>

				</div>
			</header>

			<div class="alcb-content">
				<div class="alcb-notices" id="alcb-notices"></div>

				<div class="alcb-panel<?php echo 'overview' === $active ? ' is-active' : ''; ?>" id="alcb-panel-overview" role="tabpanel" aria-labelledby="alcb-tab-overview" tabindex="0" <?php echo 'overview' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_overview( $has_pro ); ?>
				</div>

				<div class="alcb-panel<?php echo 'blocks' === $active ? ' is-active' : ''; ?>" id="alcb-panel-blocks" role="tabpanel" aria-labelledby="alcb-tab-blocks" tabindex="0" <?php echo 'blocks' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_blocks_tab( $has_pro ); ?>
				</div>

				<div class="alcb-panel<?php echo 'help' === $active ? ' is-active' : ''; ?>" id="alcb-panel-help" role="tabpanel" aria-labelledby="alcb-tab-help" tabindex="0" <?php echo 'help' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_help_tab(); ?>
				</div>

				<?php if ( $has_pro ) : ?>
					<div class="alcb-panel alcb-panel--license<?php echo 'license' === $active ? ' is-active' : ''; ?>" id="alcb-panel-license" role="tabpanel" aria-labelledby="alcb-tab-license" tabindex="0" <?php echo 'license' === $active ? '' : 'hidden'; ?>>
						<?php do_action( 'alcb_license_page' ); ?>
					</div>
				<?php endif; ?>
			</div>

		</div>
		<?php
	}

	/**
	 * Overview tab.
	 *
	 * @param bool $has_pro Whether Pro is active.
	 * @return void
	 */
	private function render_overview( $has_pro ) {
		$new_page = admin_url( 'post-new.php?post_type=page' );

		$this->render_license_alert();
		?>
		<section class="alcb-hero">
			<div class="alcb-hero__body">
				<p class="alcb-eyebrow">
					<?php echo $this->icon( 'circle-check', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php esc_html_e( 'Plugin active — ready to use', 'awesome-logo-carousel-block' ); ?>
				</p>

				<h1 class="alcb-hero__title"><?php esc_html_e( 'Showcase your client logos, effortlessly.', 'awesome-logo-carousel-block' ); ?></h1>

				<p class="alcb-hero__sub"><?php esc_html_e( 'Lightweight Gutenberg blocks for carousels, grids and tickers. Fully customizable, responsive, and fast — no coding required.', 'awesome-logo-carousel-block' ); ?></p>

				<div class="alcb-hero__actions">
					<a class="alcb-btn alcb-btn--primary" href="<?php echo esc_url( $new_page ); ?>">
						<?php echo $this->icon( 'plus', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php esc_html_e( 'Create your first carousel', 'awesome-logo-carousel-block' ); ?>
					</a>
					<button type="button" class="alcb-btn alcb-btn--ghost" data-alcb-play>
						<?php echo $this->icon( 'play', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php esc_html_e( 'Watch 2-min tour', 'awesome-logo-carousel-block' ); ?>
					</button>
				</div>

				<dl class="alcb-stats">
					<div class="alcb-stat">
						<dt class="alcb-stat__value"><?php echo esc_html( self::STAT_INSTALLS ); ?></dt>
						<dd class="alcb-stat__label"><?php esc_html_e( 'Active installs', 'awesome-logo-carousel-block' ); ?></dd>
					</div>
					<div class="alcb-stat">
						<dt class="alcb-stat__value"><?php echo esc_html( self::STAT_RATING ); ?> <span aria-hidden="true">★</span></dt>
						<dd class="alcb-stat__label"><?php esc_html_e( 'WordPress.org rating', 'awesome-logo-carousel-block' ); ?></dd>
					</div>
					<div class="alcb-stat">
						<dt class="alcb-stat__value"><?php echo esc_html( self::STAT_BLOCKS ); ?></dt>
						<dd class="alcb-stat__label"><?php esc_html_e( 'Blocks included', 'awesome-logo-carousel-block' ); ?></dd>
					</div>
				</dl>
			</div>

			<div class="alcb-hero__media">
				<div class="alcb-video" id="alcb-video" data-video-id="<?php echo esc_attr( self::VIDEO_ID ); ?>">
					<img
						class="alcb-video__poster"
						src="<?php echo esc_url( plugins_url( 'images/hero-thumbnail.jpg', __FILE__ ) ); ?>"
						alt=""
						width="1040" height="567" loading="lazy" decoding="async"
					/>
					<button type="button" class="alcb-video__play" data-alcb-play>
						<span class="screen-reader-text"><?php esc_html_e( 'Play the 2 minute video tour', 'awesome-logo-carousel-block' ); ?></span>
						<?php echo $this->icon( 'play', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
				</div>
			</div>
		</section>

		<section class="alcb-section">
			<div class="alcb-section__head">
				<div>
					<h2 class="alcb-section__title"><?php esc_html_e( 'Available blocks', 'awesome-logo-carousel-block' ); ?></h2>
					<p class="alcb-section__sub"><?php esc_html_e( 'Add any of these from the block inserter in the editor.', 'awesome-logo-carousel-block' ); ?></p>
				</div>
				<button type="button" class="alcb-textlink alcb-textlink--accent" data-alcb-goto="blocks">
					<?php esc_html_e( 'Compare Free & Pro', 'awesome-logo-carousel-block' ); ?>
					<?php echo $this->icon( 'chevron-right', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
			</div>

			<div class="alcb-cards">
				<?php
				foreach ( $this->get_blocks() as $block ) :
					$locked = $block['pro'] && ! $has_pro;
					?>
					<div class="alcb-card<?php echo $block['pro'] ? ' is-pro' : ''; ?>">
						<div class="alcb-card__top">
							<span class="alcb-card__icon">
								<?php echo $this->icon( $block['icon'], 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</span>
							<span class="alcb-badge">
								<?php echo $block['pro'] ? esc_html__( 'Pro', 'awesome-logo-carousel-block' ) : esc_html__( 'Free', 'awesome-logo-carousel-block' ); ?>
							</span>
						</div>
						<div class="alcb-card__text">
							<h3 class="alcb-card__title"><?php echo esc_html( $block['title'] ); ?></h3>
							<p class="alcb-card__desc"><?php echo esc_html( $block['desc'] ); ?></p>
						</div>
						<?php if ( $locked ) : ?>
							<a class="alcb-card__action is-locked" href="<?php echo esc_url( self::URL_PRICING ); ?>" target="_blank" rel="noopener noreferrer">
								<?php esc_html_e( 'Unlock in Pro', 'awesome-logo-carousel-block' ); ?>
								<?php echo $this->icon( 'lock', 13 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</a>
						<?php else : ?>
							<a class="alcb-card__action" href="<?php echo esc_url( $new_page ); ?>">
								<?php esc_html_e( 'New page', 'awesome-logo-carousel-block' ); ?>
								<?php echo $this->icon( 'arrow-right', 13 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</a>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</section>

		<section class="alcb-columns">
			<?php
			$this->render_link_card(
				__( 'Help & resources', 'awesome-logo-carousel-block' ),
				__( 'Everything you need to get unstuck.', 'awesome-logo-carousel-block' ),
				[
					[
						'icon'  => 'book-open',
						'label' => __( 'Documentation', 'awesome-logo-carousel-block' ),
						'meta'  => __( 'Setup guides, block options and examples', 'awesome-logo-carousel-block' ),
						'url'   => self::URL_DOCS,
					],
					[
						'icon'  => 'life-buoy',
						'label' => __( 'Get support', 'awesome-logo-carousel-block' ),
						'meta'  => __( 'Free forum support, priority support with Pro', 'awesome-logo-carousel-block' ),
						'url'   => self::URL_SUPPORT,
					],
					[
						'icon'  => 'star',
						'label' => __( 'Rate the plugin', 'awesome-logo-carousel-block' ),
						'meta'  => __( 'Reviews keep the plugin free and improving', 'awesome-logo-carousel-block' ),
						'url'   => self::URL_REVIEW,
					],
				]
			);

			$this->render_link_card(
				__( 'More from GutenbergKits', 'awesome-logo-carousel-block' ),
				__( 'Free blocks that pair well with this one.', 'awesome-logo-carousel-block' ),
				[
					[
						'icon'  => 'template',
						'label' => __( 'GutenLayouts', 'awesome-logo-carousel-block' ),
						'meta'  => __( 'Ready-made Gutenberg patterns and templates', 'awesome-logo-carousel-block' ),
						'url'   => 'https://gutenlayouts.com',
					],
					[
						'icon'  => 'images',
						'label' => __( 'GutSlider', 'awesome-logo-carousel-block' ),
						'meta'  => __( 'All-in-one block slider for the editor', 'awesome-logo-carousel-block' ),
						'url'   => 'https://gutslider.com',
					],
					[
						'icon'  => 'accordion',
						'label' => __( 'Easy Accordion', 'awesome-logo-carousel-block' ),
						'meta'  => __( 'Accordions and FAQs, styled to match', 'awesome-logo-carousel-block' ),
						'url'   => 'https://accordion.gutenbergkits.com/',
					],
				]
			);
			?>
		</section>
		<?php
	}

	/**
	 * Warn when Pro is running without an active license.
	 *
	 * Pro keeps working unlicensed — only updates stop — so this is worded as
	 * a prompt rather than a failure, and it is not dismissible because the
	 * state stays actionable until the key is entered.
	 *
	 * @return void
	 */
	private function render_license_alert() {
		if ( ! $this->pro_needs_license() ) {
			return;
		}

		$state = $this->license_state();

		if ( 'expired' === $state ) {
			$title = __( 'Your Pro license has expired', 'awesome-logo-carousel-block' );
			$body  = __( 'Logo Carousel Pro keeps working and your existing blocks are unaffected, but this site no longer receives updates. Renew your license to start receiving them again.', 'awesome-logo-carousel-block' );
			$cta   = __( 'Renew license', 'awesome-logo-carousel-block' );
		} elseif ( 'invalid' === $state ) {
			$title = __( 'Your Pro license key is not valid', 'awesome-logo-carousel-block' );
			$body  = __( 'Logo Carousel Pro keeps working and your existing blocks are unaffected, but this site will not receive updates until a valid key is activated.', 'awesome-logo-carousel-block' );
			$cta   = __( 'Fix license', 'awesome-logo-carousel-block' );
		} else {
			$title = __( 'Activate your Pro license', 'awesome-logo-carousel-block' );
			$body  = __( 'Logo Carousel Pro is installed and every Pro block is already available. Activating your license turns on automatic updates, so you receive fixes and new features as they ship.', 'awesome-logo-carousel-block' );
			$cta   = __( 'Activate license', 'awesome-logo-carousel-block' );
		}

		$url = add_query_arg(
			[
				'page' => 'alcb-carousel',
				'tab'  => 'license',
			],
			admin_url( 'options-general.php' )
		);
		?>
		<div class="alcb-alert">
			<span class="alcb-alert__icon">
				<?php echo $this->icon( 'alert-triangle', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</span>
			<div class="alcb-alert__text">
				<h2 class="alcb-alert__title"><?php echo esc_html( $title ); ?></h2>
				<p class="alcb-alert__desc"><?php echo esc_html( $body ); ?></p>
			</div>
			<?php
			/*
			 * A real link, so it still works without JavaScript; the dashboard
			 * script intercepts data-alcb-goto and switches panels in place.
			 */
			?>
			<a class="alcb-btn alcb-btn--warn" href="<?php echo esc_url( $url ); ?>" data-alcb-goto="license">
				<?php echo esc_html( $cta ); ?>
			</a>
		</div>
		<?php
	}

	/**
	 * A card containing a list of outbound links.
	 *
	 * @param string $title Card title.
	 * @param string $sub   Card subtitle.
	 * @param array  $rows  Rows with icon, label, meta and url keys.
	 * @return void
	 */
	private function render_link_card( $title, $sub, $rows ) {
		?>
		<div class="alcb-linkcard">
			<div class="alcb-linkcard__head">
				<h2 class="alcb-linkcard__title"><?php echo esc_html( $title ); ?></h2>
				<p class="alcb-linkcard__sub"><?php echo esc_html( $sub ); ?></p>
			</div>
			<?php foreach ( $rows as $row ) : ?>
				<a class="alcb-row" href="<?php echo esc_url( $row['url'] ); ?>" target="_blank" rel="noopener noreferrer">
					<span class="alcb-row__icon">
						<?php echo $this->icon( $row['icon'], 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</span>
					<span class="alcb-row__text">
						<span class="alcb-row__label"><?php echo esc_html( $row['label'] ); ?></span>
						<span class="alcb-row__meta"><?php echo esc_html( $row['meta'] ); ?></span>
					</span>
					<span class="alcb-row__arrow">
						<?php echo $this->icon( 'arrow-up-right', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</span>
				</a>
			<?php endforeach; ?>
		</div>
		<?php
	}

	/**
	 * Blocks tab — block detail plus a Free vs Pro comparison.
	 *
	 * @param bool $has_pro Whether Pro is active.
	 * @return void
	 */
	private function render_blocks_tab( $has_pro ) {
		$new_page = admin_url( 'post-new.php?post_type=page' );

		$rows = [
			[ __( 'Carousel block', 'awesome-logo-carousel-block' ), true, true ],
			[ __( 'Grid & List block', 'awesome-logo-carousel-block' ), true, true ],
			[ __( 'Stagger, Ticker & Marquee blocks', 'awesome-logo-carousel-block' ), false, true ],
			[ __( 'Responsive columns, gap & autoplay', 'awesome-logo-carousel-block' ), true, true ],
			[ __( 'Logo links & captions', 'awesome-logo-carousel-block' ), true, true ],
			[ __( 'Hover effects', 'awesome-logo-carousel-block' ), true, true ],
			[ __( 'Border, radius, padding & background', 'awesome-logo-carousel-block' ), true, true ],
			[ __( 'Pattern library', 'awesome-logo-carousel-block' ), __( 'Free patterns', 'awesome-logo-carousel-block' ), __( 'All patterns', 'awesome-logo-carousel-block' ) ],
			[ __( 'Multiple rows', 'awesome-logo-carousel-block' ), false, true ],
			[ __( 'Navigation positions', 'awesome-logo-carousel-block' ), '1', '7' ],
			[ __( 'Pagination styles', 'awesome-logo-carousel-block' ), __( 'Bullets', 'awesome-logo-carousel-block' ), __( 'Bullets, numbers, progress', 'awesome-logo-carousel-block' ) ],
			[ __( 'Custom navigation arrows', 'awesome-logo-carousel-block' ), false, true ],
			[ __( 'Priority support', 'awesome-logo-carousel-block' ), false, true ],
		];
		?>
		<section class="alcb-section">
			<div class="alcb-section__head">
				<div>
					<h2 class="alcb-section__title"><?php esc_html_e( 'Every block in the suite', 'awesome-logo-carousel-block' ); ?></h2>
					<p class="alcb-section__sub"><?php esc_html_e( 'Search the block inserter for “logo” to find them all.', 'awesome-logo-carousel-block' ); ?></p>
				</div>
			</div>

			<div class="alcb-blocklist">
				<?php
				foreach ( $this->get_blocks() as $block ) :
					$locked = $block['pro'] && ! $has_pro;
					?>
					<article class="alcb-blockrow<?php echo $block['pro'] ? ' is-pro' : ''; ?>">
						<span class="alcb-card__icon alcb-card__icon--lg">
							<?php echo $this->icon( $block['icon'], 22 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</span>
						<div class="alcb-blockrow__text">
							<h3 class="alcb-blockrow__title">
								<?php echo esc_html( $block['title'] ); ?>
								<span class="alcb-badge">
									<?php echo $block['pro'] ? esc_html__( 'Pro', 'awesome-logo-carousel-block' ) : esc_html__( 'Free', 'awesome-logo-carousel-block' ); ?>
								</span>
							</h3>
							<p class="alcb-blockrow__desc"><?php echo esc_html( $block['long'] ); ?></p>
						</div>
						<div class="alcb-blockrow__action">
							<?php if ( $locked ) : ?>
								<a class="alcb-btn alcb-btn--ghost" href="<?php echo esc_url( self::URL_PRICING ); ?>" target="_blank" rel="noopener noreferrer">
									<?php echo $this->icon( 'lock', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
									<?php esc_html_e( 'Unlock in Pro', 'awesome-logo-carousel-block' ); ?>
								</a>
							<?php else : ?>
								<a class="alcb-btn alcb-btn--ghost" href="<?php echo esc_url( $new_page ); ?>">
									<?php esc_html_e( 'New page', 'awesome-logo-carousel-block' ); ?>
								</a>
							<?php endif; ?>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
		</section>

		<section class="alcb-section">
			<div class="alcb-section__head">
				<div>
					<h2 class="alcb-section__title"><?php esc_html_e( 'Free vs Pro', 'awesome-logo-carousel-block' ); ?></h2>
					<p class="alcb-section__sub"><?php esc_html_e( 'Everything in Free stays in Free. Pro adds blocks, layouts and controls on top.', 'awesome-logo-carousel-block' ); ?></p>
				</div>
				<?php if ( ! $has_pro ) : ?>
					<a class="alcb-btn alcb-btn--dark" href="<?php echo esc_url( self::URL_PRICING ); ?>" target="_blank" rel="noopener noreferrer">
						<?php echo $this->icon( 'sparkles', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php esc_html_e( 'Upgrade to Pro', 'awesome-logo-carousel-block' ); ?>
					</a>
				<?php endif; ?>
			</div>

			<div class="alcb-tablewrap">
				<table class="alcb-table">
					<thead>
						<tr>
							<th scope="col"><?php esc_html_e( 'Feature', 'awesome-logo-carousel-block' ); ?></th>
							<th scope="col"><?php esc_html_e( 'Free', 'awesome-logo-carousel-block' ); ?></th>
							<th scope="col" class="is-pro"><?php esc_html_e( 'Pro', 'awesome-logo-carousel-block' ); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ( $rows as $row ) : ?>
							<tr>
								<th scope="row"><?php echo esc_html( $row[0] ); ?></th>
								<td><?php $this->cell( $row[1] ); ?></td>
								<td class="is-pro"><?php $this->cell( $row[2] ); ?></td>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</section>
		<?php
	}

	/**
	 * Render a comparison table cell.
	 *
	 * @param bool|string $value True for a tick, false for a dash, or literal text.
	 * @return void
	 */
	private function cell( $value ) {
		if ( true === $value ) {
			echo '<span class="alcb-tick">' . $this->icon( 'circle-check', 17 ) . '<span class="screen-reader-text">' . esc_html__( 'Included', 'awesome-logo-carousel-block' ) . '</span></span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			return;
		}
		if ( false === $value ) {
			echo '<span class="alcb-dash" aria-hidden="true">—</span><span class="screen-reader-text">' . esc_html__( 'Not included', 'awesome-logo-carousel-block' ) . '</span>';
			return;
		}
		echo '<span class="alcb-cellnote">' . esc_html( $value ) . '</span>';
	}

	/**
	 * Help tab — FAQ, resources and system information.
	 *
	 * @return void
	 */
	private function render_help_tab() {
		$faqs = [
			[
				'q' => __( 'How do I add a logo carousel to a page?', 'awesome-logo-carousel-block' ),
				'a' => __( 'Edit any post or page, click the block inserter, search for “Logo Carousel”, and insert the block. Then use “Add Logos” in the block toolbar to pick images from your media library.', 'awesome-logo-carousel-block' ),
			],
			[
				'q' => __( 'Can I link each logo to a different website?', 'awesome-logo-carousel-block' ),
				'a' => __( 'Yes. Turn on “Enable Logos link” in the block settings, then either enter a URL per logo, or switch Link Type to “Logo Based” and set the link on the attachment itself in the media library.', 'awesome-logo-carousel-block' ),
			],
			[
				'q' => __( 'Is the carousel responsive?', 'awesome-logo-carousel-block' ),
				'a' => __( 'Yes. Columns, gap, logo size and most spacing controls have separate desktop, tablet and mobile values. Use the device switcher at the top of the settings sidebar to set each one.', 'awesome-logo-carousel-block' ),
			],
			[
				'q' => __( 'Will it slow my site down?', 'awesome-logo-carousel-block' ),
				'a' => __( 'The block only loads its script and styles on pages where it is actually used. There is no jQuery dependency and no page builder required.', 'awesome-logo-carousel-block' ),
			],
			[
				'q' => __( 'Do I need the free plugin if I have Pro?', 'awesome-logo-carousel-block' ),
				'a' => __( 'Yes. Pro is an add-on: it extends the free plugin rather than replacing it. Keep both installed and active.', 'awesome-logo-carousel-block' ),
			],
			[
				'q' => __( 'Does it work with my theme?', 'awesome-logo-carousel-block' ),
				'a' => __( 'It works with both block themes and classic themes. If a theme stylesheet overrides something, the block settings can usually override it back.', 'awesome-logo-carousel-block' ),
			],
		];

		global $wp_version;
		$theme = wp_get_theme();

		$info = [
			__( 'Plugin version', 'awesome-logo-carousel-block' ) => \ALCB_VERSION,
			__( 'Pro version', 'awesome-logo-carousel-block' )    => $this->has_pro() && defined( 'ALCBP_VERSION' ) ? \ALCBP_VERSION : __( 'Not installed', 'awesome-logo-carousel-block' ),
			__( 'WordPress', 'awesome-logo-carousel-block' )      => $wp_version,
			__( 'PHP', 'awesome-logo-carousel-block' )            => PHP_VERSION,
			__( 'Theme', 'awesome-logo-carousel-block' )          => $theme->get( 'Name' ) . ' ' . $theme->get( 'Version' ),
			__( 'Block theme', 'awesome-logo-carousel-block' )    => wp_is_block_theme() ? __( 'Yes', 'awesome-logo-carousel-block' ) : __( 'No', 'awesome-logo-carousel-block' ),
		];
		?>
		<section class="alcb-columns alcb-columns--help">

			<div class="alcb-linkcard alcb-linkcard--flush">
				<div class="alcb-linkcard__head">
					<h2 class="alcb-linkcard__title"><?php esc_html_e( 'Frequently asked questions', 'awesome-logo-carousel-block' ); ?></h2>
					<p class="alcb-linkcard__sub"><?php esc_html_e( 'The short answers to what people ask most.', 'awesome-logo-carousel-block' ); ?></p>
				</div>
				<?php foreach ( $faqs as $i => $faq ) : ?>
					<details class="alcb-faq"<?php echo 0 === $i ? ' open' : ''; ?>>
						<summary class="alcb-faq__q">
							<span><?php echo esc_html( $faq['q'] ); ?></span>
							<?php echo $this->icon( 'chevron-right', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</summary>
						<p class="alcb-faq__a"><?php echo esc_html( $faq['a'] ); ?></p>
					</details>
				<?php endforeach; ?>
			</div>

			<div class="alcb-help-aside">
				<?php
				$this->render_link_card(
					__( 'Still stuck?', 'awesome-logo-carousel-block' ),
					__( 'We answer support requests every working day.', 'awesome-logo-carousel-block' ),
					[
						[
							'icon'  => 'book-open',
							'label' => __( 'Read the documentation', 'awesome-logo-carousel-block' ),
							'meta'  => __( 'Setup guides, block options and examples', 'awesome-logo-carousel-block' ),
							'url'   => self::URL_DOCS,
						],
						[
							'icon'  => 'life-buoy',
							'label' => __( 'Open a support ticket', 'awesome-logo-carousel-block' ),
							'meta'  => __( 'Include the system info below to speed things up', 'awesome-logo-carousel-block' ),
							'url'   => self::URL_SUPPORT,
						],
						[
							'icon'  => 'star',
							'label' => __( 'Leave a review', 'awesome-logo-carousel-block' ),
							'meta'  => __( 'Reviews keep the plugin free and improving', 'awesome-logo-carousel-block' ),
							'url'   => self::URL_REVIEW,
						],
					]
				);
				?>

				<div class="alcb-linkcard">
					<div class="alcb-linkcard__head alcb-linkcard__head--row">
						<div>
							<h2 class="alcb-linkcard__title"><?php esc_html_e( 'System info', 'awesome-logo-carousel-block' ); ?></h2>
							<p class="alcb-linkcard__sub"><?php esc_html_e( 'Paste this into any support request.', 'awesome-logo-carousel-block' ); ?></p>
						</div>
						<button type="button" class="alcb-btn alcb-btn--ghost alcb-btn--sm" data-alcb-copy="#alcb-sysinfo">
							<?php echo $this->icon( 'copy', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<span><?php esc_html_e( 'Copy', 'awesome-logo-carousel-block' ); ?></span>
						</button>
					</div>
					<dl class="alcb-sysinfo" id="alcb-sysinfo">
						<?php foreach ( $info as $label => $value ) : ?>
							<div class="alcb-sysinfo__row">
								<dt><?php echo esc_html( $label ); ?></dt>
								<dd><?php echo esc_html( $value ); ?></dd>
							</div>
						<?php endforeach; ?>
					</dl>
				</div>
			</div>

		</section>
		<?php
	}
}

// Initialize the class.
Alcb_Admin_Page::get_instance();
