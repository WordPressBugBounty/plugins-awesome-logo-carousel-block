<?php
/**
 * REST API endpoint for accordion patterns with transient caching
 */

namespace AwesomeLogoCarouselBlock\Inc;

use WP_REST_Request;
use WP_REST_Server;
use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'AwesomeLogoCarouselBlock\Inc\Alcb_Patterns' ) ) {

    class Alcb_Patterns {
        const TRANSIENT_KEY    = 'alcb_patterns_cache';
        const TRANSIENT_EXPIRY = HOUR_IN_SECONDS * 12;
        const REMOTE_URL       = 'https://logocarousel.gutenbergkits.com/wp-json/divo-patterns/v1/patterns';
        const NAMESPACE        = 'alcb/v1';
        const ROUTE            = '/patterns';

        private static $instance = null;

        public function __construct() {
            add_action( 'rest_api_init', [ $this, 'register_routes' ] );
        }

        public function register_routes() {
            register_rest_route(
                self::NAMESPACE,
                self::ROUTE,
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_patterns' ],
                    'permission_callback' => [ $this, 'permissions_check' ],
                    'args'                => [
                        'refresh' => [
                            'type'    => 'boolean',
                            'default' => false,
                        ],
                    ],
                ]
            );
        }

        /**
         * Only logged-in users with edit_posts capability can call this endpoint.
         */
        public function permissions_check() {
            return current_user_can( 'edit_posts' );
        }

        public function get_patterns( WP_REST_Request $request ) {
            $force_refresh = (bool) $request->get_param( 'refresh' );

            if ( ! $force_refresh ) {
                $cached = get_transient( self::TRANSIENT_KEY );
                if ( false !== $cached ) {
                    return rest_ensure_response( $cached );
                }
            }

            $response = wp_remote_get(
                add_query_arg(
                    [
                        'per_page' => 100,
                    ],
                    self::REMOTE_URL
                ),
                [
                    'timeout'    => 15,
                    'user-agent' => 'AwesomeLogoCarouselBlock/' . ALCB_VERSION,
                ]
            );

            if ( is_wp_error( $response ) ) {
                return new WP_Error(
                    'alcb_fetch_failed',
                    $response->get_error_message(),
                    [ 'status' => 502 ]
                );
            }

            $code = wp_remote_retrieve_response_code( $response );
            if ( 200 !== (int) $code ) {
                return new WP_Error(
                    'alcb_fetch_failed',
                    sprintf( 'Remote API returned HTTP %d.', $code ),
                    [ 'status' => 502 ]
                );
            }

            $body = wp_remote_retrieve_body( $response );
            $data = json_decode( $body, true );

            if ( ! is_array( $data ) ) {
                return new WP_Error(
                    'alcb_invalid_response',
                    'Remote API returned invalid JSON.',
                    [ 'status' => 502 ]
                );
            }

            set_transient( self::TRANSIENT_KEY, $data, self::TRANSIENT_EXPIRY );

            return rest_ensure_response( $data );
        }

        public static function instance() {
            if ( is_null( self::$instance ) ) {
                self::$instance = new self();
            }
            return self::$instance;
        }
    }
}
