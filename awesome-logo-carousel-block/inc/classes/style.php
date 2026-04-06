<?php
/**
 * Dynamic Styles
 *
 * @package AwesomeLogoCarouselBlock
 */

namespace AwesomeLogoCarouselBlock\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Alcb_Style
 * 
 * Generates dynamic inline styles based on block attributes.
 */
class Alcb_Style {

	use Alcb_Instance;

	/**
	 * Constructor
	 * 
	 * @return void
	 */
	private function __construct() {
		add_filter( 'render_block', [ $this, 'generate_style' ], 10, 2 );
		add_filter( 'render_block_lcb/logo-carousel', [ $this, 'add_unique_class' ], 10, 2 );
	}

	/**
	 * Generate Style
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string
	 */
	public function generate_style( $block_content, $block ) {
		if ( isset( $block['blockName'] ) && str_contains( $block['blockName'], 'lcb/' ) ) {
			$attrs = $block['attrs'] ?? [];

			// Early return if attributes are empty.
			if ( empty( $attrs ) ) {
				return $block_content;
			}

			// Get the unique ID safely.
			$unique_id = isset( $attrs['sliderId'] ) ? sanitize_key( $attrs['sliderId'] ) : '';
			if ( empty( $unique_id ) ) {
				return $block_content;
			}

			$block_style = $attrs['blockStyle'] ?? '';

			if ( ! empty( $block_style ) ) {
				$handle = 'alcb-style-' . $unique_id;
				$this->render_inline_css( $handle, $block_style );
				return $block_content;
			}
		}

		return $block_content;
	}

	/**
	 * Render Inline CSS
	 *
	 * @param string $handle The style handle.
	 * @param string $css    The CSS content.
	 * @return void
	 */
	public function render_inline_css( $handle, $css ) {
		wp_register_style( $handle, false, [], ALCB_VERSION, 'all' );
		wp_enqueue_style( $handle, false, [], ALCB_VERSION, 'all' );
		wp_add_inline_style( $handle, $this->sanitize_css( $css ) );
	}

	/**
	 * Add Unique Class
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string
	 */
	public function add_unique_class( $block_content, $block ) {
		$attrs = $block['attrs'] ?? [];

		// Early return if attributes are empty.
		if ( empty( $attrs ) ) {
			return $block_content;
		}

		// Get the unique ID safely and properly escape it.
		$unique_id = isset( $attrs['sliderId'] ) ? esc_attr( $attrs['sliderId'] ) : '';
		if ( empty( $unique_id ) ) {
			return $block_content;
		}

		$block_content = str_replace( 'wp-block-lcb-logo-carousel', 'wp-block-lcb-logo-carousel ' . $unique_id, $block_content );
		return $block_content;
	}


	/**
	 * Sanitize CSS method
	 *
	 * @since 1.0.0
	 * @param string $css CSS to Sanitize.
	 * @return string
	 */
	private function sanitize_css( $css ) {
		// Validate UTF-8 encoding
		$css = wp_check_invalid_utf8( $css );

		if ( empty( $css ) ) {
			return '';
		}

		// Normalize whitespace to prevent obfuscation tricks
		$css = preg_replace( '/\s+/', ' ', $css );

		// Remove CSS comments (can hide payloads: /* expression */background:url() */)
		$css = preg_replace( '!/\*.*?\*/!s', '', $css );

		// Remove backslash escapes used to bypass keyword filters (e.g. \65 xpression)
		$css = preg_replace( '/\\\\[0-9a-fA-F]{0,6}\s?/', '', $css );

		// Block dangerous CSS functions and protocols
		// Covers: expression(), url(), javascript:, vbscript:, data:, behavior
		if ( preg_match(
			'/expression\s*\(
			| url\s*\(
			| javascript\s*:
			| vbscript\s*:
			| data\s*:
			| @import
			| behavior\s*:
			| -moz-binding\s*:
			| content\s*:/ix',
			$css
		) ) {
			return '';
		}

		// Block HTML tags that could escape the <style> context
		if ( preg_match( '/<\s*\/?\s*(script|style|link|meta|object|embed|iframe)/i', $css ) ) {
			return '';
		}

		// Trim and return
		return trim( $css );
	}
}