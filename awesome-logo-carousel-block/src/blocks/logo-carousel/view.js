/**
 * Frontend runtime for lcb/logo-carousel.
 *
 * Reads its configuration from the data-* attributes in the saved markup, so
 * nothing here requires a change to save.js.
 */
import { __ } from '@wordpress/i18n';
import { BREAKPOINTS } from '../../constants/breakpoints';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const prefersReducedMotion = () =>
    typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION_QUERY).matches;

/**
 * Read a boolean data attribute without throwing on missing values.
 *
 * JSON.parse(undefined) throws, and these attributes are conditionally
 * emitted, so a missing one used to take the whole initialiser down and leave
 * every carousel on the page unstyled and unmoving.
 *
 * @param {string|undefined} value    Raw dataset value.
 * @param {boolean}          fallback Value to use when absent or unparseable.
 * @return {boolean} Parsed boolean.
 */
const readBool = (value, fallback = false) => {
    if (value === undefined || value === '') {
        return fallback;
    }
    try {
        return Boolean(JSON.parse(value));
    } catch (e) {
        return fallback;
    }
};

const readInt = (value, fallback) => {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
};

/**
 * Build the play/pause control required for an auto-rotating carousel.
 *
 * WCAG 2.2.2 requires a way to stop motion that starts automatically and lasts
 * more than five seconds. Autoplay is on by default here and
 * `disableOnInteraction: false` means it resumes even after the user interacts,
 * so hover-pause alone does not satisfy it — and does nothing at all for
 * keyboard or touch users.
 *
 * The button is created at runtime rather than in save.js so that existing
 * content gets it without re-saving, and no stored markup changes.
 *
 * @param {Object} swiper Swiper instance.
 * @return {HTMLButtonElement} The control.
 */
const createPlayPauseControl = swiper => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'alcb__autoplay-toggle';

    let paused = false;

    const render = () => {
        button.setAttribute('aria-pressed', paused ? 'true' : 'false');
        button.setAttribute(
            'aria-label',
            paused
                ? __('Start logo carousel autoplay', 'awesome-logo-carousel-block')
                : __('Pause logo carousel autoplay', 'awesome-logo-carousel-block')
        );
        button.dataset.state = paused ? 'paused' : 'playing';
    };

    button.addEventListener('click', () => {
        paused = !paused;
        if (paused) {
            swiper.autoplay?.stop();
        } else {
            swiper.autoplay?.start();
        }
        render();
    });

    render();

    // Let the rest of the runtime know whether the user has taken control, so
    // focus handling never restarts something they deliberately paused.
    button.alcbIsPaused = () => paused;

    return button;
};

/**
 * Initialise one carousel.
 *
 * @param {HTMLElement} block The block wrapper.
 * @return {void}
 */
const initCarousel = block => {
    const container = block.querySelector('.alcb__carousel_container');

    if (!container || container.dataset.alcbInitialised === 'true') {
        return;
    }
    container.dataset.alcbInitialised = 'true';

    const { dataset } = container;
    const sliderId = dataset.id;

    const deskItems = readInt(dataset.desktop, 4);
    const tabItems = readInt(dataset.tablet, 2);
    const phoneItems = readInt(dataset.mobile, 1);

    const deskSpace = readInt(dataset.deskspace, 30);
    const tabSpace = readInt(dataset.tabspace, 20);
    const phoneSpace = readInt(dataset.phonespace, 0);

    const deskRows = readInt(dataset.deskrows, 1);
    const tabRows = readInt(dataset.tabrows, 1);
    const phoneRows = readInt(dataset.phonerows, 1);

    const autoplayEnabled = readBool(dataset.autoplay, false) && !prefersReducedMotion();
    const pauseOnHover = readBool(dataset.pauseonhover, true);

    const autoplayOptions = autoplayEnabled
        ? {
              delay: readInt(dataset.autoplaydelay, 2000),
              reverseDirection: readBool(dataset.autoplaydirection, false),
              pauseOnMouseEnter: pauseOnHover,
              disableOnInteraction: false
          }
        : false;

    const showPagination = readBool(dataset.pagination, false);
    const showNav = readBool(dataset.navigation, false);

    const swiper = new Swiper(`#${sliderId}`, {
        pagination: showPagination
            ? {
                  el: block.querySelector('.alcb__pag'),
                  clickable: true,
                  type: dataset.paginationtype || 'bullets'
              }
            : false,
        navigation: showNav
            ? {
                  nextEl: block.querySelector('.alcb__next'),
                  prevEl: block.querySelector('.alcb__prev')
              }
            : false,
        slidesPerView: deskItems,
        spaceBetween: deskSpace,
        autoplay: autoplayOptions,
        speed: readInt(dataset.speed, 400),
        loop: readBool(dataset.loop, true),
        keyboard: readBool(dataset.keyboard, false),
        mousewheel: readBool(dataset.mousewheel, false),
        autoHeight: readBool(dataset.autoheight, false),
        /*
         * Swiper's a11y module ships in the bundle but was never configured, so
         * its messages were untranslated and the nav elements — plain <div>s in
         * the saved markup — carried no accessible name.
         */
        a11y: {
            enabled: true,
            prevSlideMessage: __('Previous slide', 'awesome-logo-carousel-block'),
            nextSlideMessage: __('Next slide', 'awesome-logo-carousel-block'),
            firstSlideMessage: __('This is the first slide', 'awesome-logo-carousel-block'),
            lastSlideMessage: __('This is the last slide', 'awesome-logo-carousel-block'),
            paginationBulletMessage: __('Go to slide {{index}}', 'awesome-logo-carousel-block'),
            containerMessage: __('Logo carousel', 'awesome-logo-carousel-block')
        },
        breakpoints: {
            [BREAKPOINTS.mobile]: {
                slidesPerView: phoneItems,
                spaceBetween: phoneSpace,
                grid: { rows: phoneRows, fill: 'row' }
            },
            [BREAKPOINTS.tablet]: {
                slidesPerView: tabItems,
                spaceBetween: tabSpace,
                grid: { rows: tabRows, fill: 'row' }
            },
            [BREAKPOINTS.desktop]: {
                slidesPerView: deskItems,
                spaceBetween: deskSpace,
                grid: { rows: deskRows, fill: 'row' }
            }
        }
    });

    if (!autoplayOptions) {
        return;
    }

    const toggle = createPlayPauseControl(swiper);
    block.appendChild(toggle);

    // Hover pause is Swiper's job; keyboard users need the focus equivalent.
    block.addEventListener('focusin', () => {
        if (!toggle.alcbIsPaused()) {
            swiper.autoplay?.stop();
        }
    });
    block.addEventListener('focusout', event => {
        if (!toggle.alcbIsPaused() && !block.contains(event.relatedTarget)) {
            swiper.autoplay?.start();
        }
    });
};

/**
 * Defer initialisation until the carousel is near the viewport.
 *
 * Swiper is ~150 KB and initialising every carousel on a long page at
 * DOMContentLoaded costs main-thread time for content nobody has scrolled to.
 *
 * @param {HTMLElement} block The block wrapper.
 * @return {void}
 */
const observeCarousel = block => {
    if (typeof window.IntersectionObserver !== 'function') {
        initCarousel(block);
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    initCarousel(entry.target);
                }
            });
        },
        // Start early enough that it is running by the time it is on screen.
        { rootMargin: '200px 0px' }
    );

    observer.observe(block);
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.wp-block-lcb-logo-carousel').forEach(observeCarousel);
});
