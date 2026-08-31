<?php
/**
 * Frontend markup enhancements.
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Alcb_Frontend
 *
 * Adds accessibility and performance attributes to block output at render time
 * rather than in save.js.
 *
 * Doing this server-side is a deliberate choice. Changing the saved markup
 * would re-validate every block on every site against the new save() output,
 * and any mismatch shows the user "Attempt Block Recovery". Rendering-time
 * enhancement carries none of that risk, and it has a second advantage: it
 * applies to content that already exists, so a site that is never re-edited
 * still gets labelled controls, lazy images and intrinsic dimensions.
 *
 * When save.js does eventually change (behind a block deprecation), the
 * corresponding pieces here can be retired.
 *
 * @since 2.3.0
 */
class Alcb_Frontend {

	use Alcb_Instance;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	private function __construct() {
		add_filter( 'render_block_lcb/logo-carousel', [ $this, 'enhance_carousel' ], 10, 2 );
		add_filter( 'render_block_lcb/grid-logo', [ $this, 'enhance_images_only' ], 10, 2 );
		add_filter( 'render_block_lcb/logo', [ $this, 'enhance_images_only' ], 10, 2 );
	}

	/**
	 * Whether the markup rewriter is available.
	 *
	 * WP_HTML_Tag_Processor landed in WordPress 6.2 and this plugin still
	 * supports 6.0, so every enhancement is optional by design. On older
	 * installs the block renders exactly as it did before.
	 *
	 * @return bool
	 */
	private function can_rewrite() {
		return class_exists( 'WP_HTML_Tag_Processor' );
	}

	/**
	 * Whether the tag at the cursor carries a class.
	 *
	 * `WP_HTML_Tag_Processor::has_class()` only exists in WordPress 6.4+, so
	 * the class attribute is inspected directly to keep the 6.2 floor.
	 *
	 * @param \WP_HTML_Tag_Processor $processor Processor positioned on a tag.
	 * @param string                 $class_name Class to look for.
	 * @return bool
	 */
	private function tag_has_class( $processor, $class_name ) {
		$classes = $processor->get_attribute( 'class' );

		if ( ! is_string( $classes ) ) {
			return false;
		}

		return in_array( $class_name, preg_split( '/\s+/', trim( $classes ) ), true );
	}

	/**
	 * Add accessibility and loading attributes to a rendered carousel.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Parsed block.
	 * @return string
	 */
	public function enhance_carousel( $block_content, $block ) {
		if ( ! $this->can_rewrite() || '' === trim( (string) $block_content ) ) {
			return $block_content;
		}

		$processor   = new \WP_HTML_Tag_Processor( $block_content );
		$image_index = 0;

		while ( $processor->next_tag() ) {
			$tag = $processor->get_tag();

			if ( 'IMG' === $tag ) {
				$this->enhance_image( $processor, $image_index );
				++$image_index;
				continue;
			}

			if ( 'DIV' !== $tag ) {
				continue;
			}

			if ( $this->tag_has_class( $processor, 'alcb__carousel_container' ) ) {
				/*
				 * Announce the carousel as a labelled region. Without this a
				 * screen reader user lands in a bare list of images with no
				 * indication that the content rotates.
				 */
				$processor->set_attribute( 'role', 'region' );
				$processor->set_attribute( 'aria-roledescription', 'carousel' );
				$processor->set_attribute( 'aria-label', __( 'Logo carousel', 'awesome-logo-carousel-block' ) );
				continue;
			}

			/*
			 * The previous/next controls are plain <div>s in the saved markup,
			 * so they are neither focusable nor announced. Promoting the tag to
			 * a real <button> would change the markup; role + tabindex + an
			 * accessible name gives assistive technology the same information
			 * without touching what is stored in the database.
			 */
			if ( $this->tag_has_class( $processor, 'alcb__prev' ) ) {
				$processor->set_attribute( 'role', 'button' );
				$processor->set_attribute( 'tabindex', '0' );
				$processor->set_attribute( 'aria-label', __( 'Previous slide', 'awesome-logo-carousel-block' ) );
				continue;
			}

			if ( $this->tag_has_class( $processor, 'alcb__next' ) ) {
				$processor->set_attribute( 'role', 'button' );
				$processor->set_attribute( 'tabindex', '0' );
				$processor->set_attribute( 'aria-label', __( 'Next slide', 'awesome-logo-carousel-block' ) );
			}
		}

		return $processor->get_updated_html();
	}

	/**
	 * Add loading and dimension attributes to images in a rendered block.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Parsed block.
	 * @return string
	 */
	public function enhance_images_only( $block_content, $block ) {
		if ( ! $this->can_rewrite() || '' === trim( (string) $block_content ) ) {
			return $block_content;
		}

		$processor   = new \WP_HTML_Tag_Processor( $block_content );
		$image_index = 0;

		while ( $processor->next_tag( [ 'tag_name' => 'IMG' ] ) ) {
			$this->enhance_image( $processor, $image_index );
			++$image_index;
		}

		return $processor->get_updated_html();
	}

	/**
	 * Apply loading, decoding, dimension and alt attributes to one image.
	 *
	 * @param \WP_HTML_Tag_Processor $processor   Processor positioned on an IMG.
	 * @param int                    $image_index Zero-based index within the block.
	 * @return void
	 */
	private function enhance_image( $processor, $image_index ) {
		if ( null === $processor->get_attribute( 'decoding' ) ) {
			$processor->set_attribute( 'decoding', 'async' );
		}

		/*
		 * The first logo is very often above the fold, so lazy-loading it would
		 * delay the LCP element rather than help. Everything after it is fair
		 * game.
		 */
		if ( 0 === $image_index ) {
			if ( null === $processor->get_attribute( 'fetchpriority' ) ) {
				$processor->set_attribute( 'fetchpriority', 'high' );
			}
		} elseif ( null === $processor->get_attribute( 'loading' ) ) {
			$processor->set_attribute( 'loading', 'lazy' );
		}

		/*
		 * `lcb/logo` renders alt from an attribute that was never declared, so
		 * the attribute is absent entirely rather than empty. An <img> with no
		 * alt is announced by its filename; an explicitly empty alt marks it
		 * decorative, which is the better default for a logo that sits inside a
		 * captioned, linked wrapper.
		 */
		if ( null === $processor->get_attribute( 'alt' ) ) {
			$processor->set_attribute( 'alt', '' );
		}

		// Intrinsic dimensions prevent the layout shift these blocks cause today.
		if ( null !== $processor->get_attribute( 'width' ) || null !== $processor->get_attribute( 'height' ) ) {
			return;
		}

		$attachment_id = $this->attachment_id_from_tag( $processor );

		if ( ! $attachment_id ) {
			return;
		}

		$meta = wp_get_attachment_metadata( $attachment_id );

		if ( ! empty( $meta['width'] ) && ! empty( $meta['height'] ) ) {
			$processor->set_attribute( 'width', (string) (int) $meta['width'] );
			$processor->set_attribute( 'height', (string) (int) $meta['height'] );
		}
	}

	/**
	 * Resolve the attachment ID for the image at the cursor.
	 *
	 * The carousel stores it in the `id` attribute; the logo block stores it in
	 * a `wp-image-<id>` class.
	 *
	 * @param \WP_HTML_Tag_Processor $processor Processor positioned on an IMG.
	 * @return int Attachment ID, or 0 when it cannot be determined.
	 */
	private function attachment_id_from_tag( $processor ) {
		$id = $processor->get_attribute( 'id' );

		if ( is_string( $id ) && ctype_digit( $id ) ) {
			return (int) $id;
		}

		$classes = $processor->get_attribute( 'class' );

		if ( is_string( $classes ) && preg_match( '/\bwp-image-(\d+)\b/', $classes, $matches ) ) {
			return (int) $matches[1];
		}

		return 0;
	}
}
