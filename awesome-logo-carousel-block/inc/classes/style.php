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

		/*
		 * Only the wrapper needs the unique class. str_replace() rewrote every
		 * occurrence in the block content, so a caption or alt text containing
		 * the class name would pick it up too.
		 */
		$needle   = 'wp-block-lcb-logo-carousel';
		$position = strpos( $block_content, $needle );

		if ( false === $position ) {
			return $block_content;
		}

		return substr_replace( $block_content, $needle . ' ' . $unique_id, $position, strlen( $needle ) );
	}


	/**
	 * Sanitize CSS method
	 *
	 * @since 1.0.0
	 * @param string $css CSS to Sanitize.
	 * @return string
	 */
	private function sanitize_css( $css ) {
		// Validate UTF-8 encoding.
		$css = wp_check_invalid_utf8( $css );

		if ( empty( $css ) ) {
			return '';
		}

		// Remove CSS comments first — they can hide payloads (/* expression */url()).
		$css = preg_replace( '!/\*.*?\*/!s', '', $css );

		// Normalize whitespace to prevent obfuscation tricks.
		$css = preg_replace( '/\s+/', ' ', $css );

		// @import can pull in an entire external stylesheet. We never emit one, so drop it.
		$css = preg_replace( '/@import\s[^;]*;?/i', '', $css );

		// A tag like this in CSS is an attempt to break out of the <style> context,
		// never a legitimate style. This one still voids the whole sheet.
		if ( preg_match( '/<\s*\/?\s*(script|style|link|meta|object|embed|iframe)/i', $css ) ) {
			return '';
		}

		/*
		 * Filter declaration by declaration.
		 *
		 * Previously any occurrence of `url(` or `content:` anywhere in the
		 * stylesheet caused the entire thing to be discarded — so setting a
		 * background image on a logo silently dropped every style for that
		 * block. Now only the offending declaration is dropped.
		 *
		 * The value must be followed by `;` or `}`, so selectors (`a:hover {`)
		 * and media queries (`@media (max-width: 600px) {`) are not mistaken
		 * for declarations. `url(...)` and quoted strings are matched as whole
		 * chunks because they may legitimately contain a `;` — a base64 data
		 * URI always does.
		 */
		$css = preg_replace_callback(
			'/([-a-zA-Z_][-a-zA-Z0-9_]*)\s*:\s*((?:url\([^)]*\)|"[^"]*"|\'[^\']*\'|[^;{}])*)(?=[;}])/',
			[ $this, 'filter_declaration' ],
			$css
		);

		// Trim and return.
		return trim( $css );
	}

	/**
	 * Filter a single CSS declaration, dropping it if the value is unsafe.
	 *
	 * @since 2.3.0
	 * @param array $matches Match groups: 1 = property, 2 = value.
	 * @return string The declaration, or an empty string to drop it.
	 */
	private function filter_declaration( $matches ) {
		$property = strtolower( $matches[1] );
		$value    = $matches[2];

		// Properties whose only purpose is to execute code.
		if ( in_array( $property, [ 'behavior', '-moz-binding' ], true ) ) {
			return '';
		}

		/*
		 * Scan a decoded copy so `\65 xpression(` cannot slip past the keyword
		 * check, but return the original value — rewriting what we emit would
		 * corrupt legitimate escaped identifiers and `content` strings.
		 *
		 * Note this must *decode* escapes, not strip them: `\65` is the escape
		 * for `e`, so stripping it turns `expression(` into `xpression(` and
		 * the check silently passes.
		 */
		$probe = $this->decode_css_escapes( $value );
		$probe = strtolower( $probe );

		if ( preg_match( '/expression\s*\(|javascript\s*:|vbscript\s*:|-moz-binding/', $probe ) ) {
			return '';
		}

		// url() is allowed, but only when it points somewhere safe.
		if ( false !== strpos( $probe, 'url(' ) ) {
			if ( ! preg_match_all( '/url\(\s*([\'"]?)(.*?)\1\s*\)/i', $probe, $urls, PREG_SET_ORDER ) ) {
				// Unparseable url() — drop the declaration rather than guess.
				return '';
			}

			foreach ( $urls as $url ) {
				if ( ! $this->is_safe_css_url( trim( $url[2] ) ) ) {
					return '';
				}
			}
		}

		return $matches[1] . ':' . $value;
	}

	/**
	 * Decode CSS escape sequences so keyword checks cannot be bypassed.
	 *
	 * Used only to build a scanning copy of a value — never on output.
	 *
	 * @since 2.3.0
	 * @param string $value Raw declaration value.
	 * @return string Value with escapes resolved.
	 */
	private function decode_css_escapes( $value ) {
		// Hex escapes: `\65 ` -> `e`, `\000065` -> `e`.
		$value = preg_replace_callback(
			'/\\\\([0-9a-fA-F]{1,6})\s?/',
			static function ( $matches ) {
				$code = hexdec( $matches[1] );
				// Only ASCII matters for the keywords we screen for.
				return $code > 0 && $code < 128 ? chr( $code ) : '';
			},
			$value
		);

		// Literal escapes: `\e` -> `e`.
		return preg_replace( '/\\\\(.)/', '$1', $value );
	}

	/**
	 * Whether a url() target is safe to emit.
	 *
	 * @since 2.3.0
	 * @param string $url The URL as written inside url().
	 * @return bool
	 */
	private function is_safe_css_url( $url ) {
		if ( '' === $url ) {
			return false;
		}

		// Raster data URIs only. SVG data URIs can carry script.
		if ( preg_match( '#^data:image/(png|jpe?g|gif|webp|avif);base64,[a-z0-9+/=\s]+$#i', $url ) ) {
			return true;
		}

		// Absolute and protocol-relative http(s).
		if ( preg_match( '#^(https?:)?//#i', $url ) ) {
			return true;
		}

		// Any other scheme (javascript:, data:, vbscript:, file: …) is rejected.
		if ( preg_match( '#^[a-z][a-z0-9+.-]*:#i', $url ) ) {
			return false;
		}

		// No scheme left, so this is a relative path — safe.
		return true;
	}
}