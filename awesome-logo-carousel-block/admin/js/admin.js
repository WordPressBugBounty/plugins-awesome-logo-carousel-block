/**
 * Logo Carousel Block — admin dashboard.
 *
 * Vanilla JS, no jQuery. Handles tab switching, the YouTube facade,
 * relocating core admin notices, and the copy-system-info button.
 */
(function () {
	'use strict';

	var app = document.getElementById( 'alcb-app' );

	if ( ! app ) {
		return;
	}

	var strings = window.alcbAdmin || {};

	/* ---------------------------------------------------------------------
	 * Tabs
	 * ------------------------------------------------------------------ */

	var tabs = Array.prototype.slice.call( app.querySelectorAll( '.alcb-tab' ) );

	function panelFor( tab ) {
		return document.getElementById( tab.getAttribute( 'aria-controls' ) );
	}

	function activate( name, focus ) {
		var match = tabs.filter( function ( tab ) {
			return tab.dataset.tab === name;
		} )[ 0 ];

		if ( ! match ) {
			return;
		}

		tabs.forEach( function ( tab ) {
			var panel = panelFor( tab );
			var on = tab === match;

			tab.classList.toggle( 'is-active', on );
			tab.setAttribute( 'aria-selected', on ? 'true' : 'false' );
			tab.tabIndex = on ? 0 : -1;

			if ( panel ) {
				panel.classList.toggle( 'is-active', on );
				panel.hidden = ! on;
			}
		} );

		if ( focus ) {
			match.focus();
		}

		/*
		 * Written as a query param rather than a hash so the URL matches what
		 * the server renders on load — the Pro license screen redirects back
		 * to ?page=alcb-carousel&tab=license after posting a form.
		 */
		if ( window.history && window.history.replaceState ) {
			var url = new URL( window.location.href );

			url.searchParams.set( 'tab', name );
			url.hash = '';

			window.history.replaceState( null, '', url.toString() );
		}
	}

	tabs.forEach( function ( tab ) {
		tab.addEventListener( 'click', function () {
			activate( tab.dataset.tab );
		} );

		// Left/right arrows move between tabs, home/end jump to the ends.
		tab.addEventListener( 'keydown', function ( event ) {
			var index = tabs.indexOf( tab );
			var next = null;

			if ( 'ArrowRight' === event.key ) {
				next = tabs[ ( index + 1 ) % tabs.length ];
			} else if ( 'ArrowLeft' === event.key ) {
				next = tabs[ ( index - 1 + tabs.length ) % tabs.length ];
			} else if ( 'Home' === event.key ) {
				next = tabs[ 0 ];
			} else if ( 'End' === event.key ) {
				next = tabs[ tabs.length - 1 ];
			}

			if ( next ) {
				event.preventDefault();
				activate( next.dataset.tab, true );
			}
		} );
	} );

	// Cross-panel links, e.g. "Compare Free & Pro".
	app.addEventListener( 'click', function ( event ) {
		var trigger = event.target.closest( '[data-alcb-goto]' );

		if ( ! trigger ) {
			return;
		}

		event.preventDefault();
		activate( trigger.dataset.alcbGoto );
		window.scrollTo( { top: 0, behavior: 'smooth' } );
	} );

	/*
	 * The server already rendered the correct panel from ?tab=, so there is
	 * nothing to do on load. Older links using a #hash are still honoured,
	 * and a hash-only URL change does not reload the page — without this the
	 * address bar would update while the wrong panel stayed on screen.
	 */
	function activateFromHash() {
		var name = ( window.location.hash || '' ).replace( '#', '' );

		if ( name ) {
			activate( name );
		}
	}

	activateFromHash();

	window.addEventListener( 'hashchange', activateFromHash );

	/* ---------------------------------------------------------------------
	 * YouTube facade
	 *
	 * The iframe is only created once the user asks for it, so the dashboard
	 * makes no third-party request on load.
	 * ------------------------------------------------------------------ */

	app.addEventListener( 'click', function ( event ) {
		if ( ! event.target.closest( '[data-alcb-play]' ) ) {
			return;
		}

		event.preventDefault();

		var wrap = document.getElementById( 'alcb-video' );

		if ( ! wrap || wrap.dataset.loaded ) {
			return;
		}

		var id = wrap.dataset.videoId;

		if ( ! id ) {
			return;
		}

		var iframe = document.createElement( 'iframe' );

		iframe.src =
			'https://www.youtube-nocookie.com/embed/' +
			encodeURIComponent( id ) +
			'?autoplay=1&rel=0';
		iframe.title = strings.videoTitle || 'Video tour';
		iframe.allow =
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
		iframe.allowFullscreen = true;

		wrap.innerHTML = '';
		wrap.appendChild( iframe );
		wrap.dataset.loaded = 'true';

		if ( ! wrap.getBoundingClientRect().height ) {
			return;
		}

		wrap.scrollIntoView( { block: 'nearest', behavior: 'smooth' } );
	} );

	/* ---------------------------------------------------------------------
	 * Copy system info
	 * ------------------------------------------------------------------ */

	app.addEventListener( 'click', function ( event ) {
		var button = event.target.closest( '[data-alcb-copy]' );

		if ( ! button ) {
			return;
		}

		event.preventDefault();

		var source = document.querySelector( button.dataset.alcbCopy );

		if ( ! source ) {
			return;
		}

		var text = Array.prototype.slice
			.call( source.querySelectorAll( '.alcb-sysinfo__row' ) )
			.map( function ( row ) {
				var dt = row.querySelector( 'dt' );
				var dd = row.querySelector( 'dd' );

				return (
					( dt ? dt.textContent.trim() : '' ) +
					': ' +
					( dd ? dd.textContent.trim() : '' )
				);
			} )
			.join( '\n' );

		var label = button.querySelector( 'span' );
		var original = label ? label.textContent : '';

		function done( message ) {
			if ( ! label ) {
				return;
			}

			label.textContent = message;

			window.setTimeout( function () {
				label.textContent = original;
			}, 2000 );
		}

		if ( navigator.clipboard && navigator.clipboard.writeText ) {
			navigator.clipboard.writeText( text ).then(
				function () {
					done( strings.copied || 'Copied' );
				},
				function () {
					done( strings.copyFailed || 'Press Ctrl/Cmd + C to copy' );
				}
			);
		} else {
			done( strings.copyFailed || 'Press Ctrl/Cmd + C to copy' );
		}
	} );

	/* ---------------------------------------------------------------------
	 * Relocate admin notices
	 *
	 * WordPress and other plugins inject notices above our topbar, which
	 * breaks the layout. Move them inside the content area rather than
	 * hiding them, so nothing important is swallowed.
	 * ------------------------------------------------------------------ */

	function relocateNotices() {
		var target = document.getElementById( 'alcb-notices' );
		var body = document.getElementById( 'wpbody-content' );

		if ( ! target || ! body ) {
			return;
		}

		var notices = body.querySelectorAll(
			':scope > .notice, :scope > .updated, :scope > .error, :scope > .update-nag'
		);

		Array.prototype.forEach.call( notices, function ( notice ) {
			target.appendChild( notice );
		} );
	}

	relocateNotices();

	// Some notices are injected late; catch them for a short window.
	if ( window.MutationObserver ) {
		var body = document.getElementById( 'wpbody-content' );

		if ( body ) {
			var observer = new MutationObserver( relocateNotices );

			observer.observe( body, { childList: true } );

			window.setTimeout( function () {
				observer.disconnect();
			}, 5000 );
		}
	}
} )();
