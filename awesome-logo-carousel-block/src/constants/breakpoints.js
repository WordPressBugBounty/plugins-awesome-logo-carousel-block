/**
 * The single source of truth for responsive breakpoints.
 *
 * Three different sets used to be hardcoded in three places and none of them
 * agreed: the editor preview switched at 320/768/1025, the frontend at
 * 320/601/992, and the generated CSS at 767/768/1024. Between 601–767px and
 * 992–1024px the column count and the styling disagreed, so what an editor
 * previewed was not what visitors saw.
 *
 * These values match the media queries `src/style-generator` already emits
 * (mobile ≤767, tablet 768–1024, desktop ≥1025), so the CSS is what moved
 * least and the JS was brought into line with it.
 *
 * Deliberately dependency-free: `view.js` imports this on the frontend, and
 * pulling in `src/constants/index.js` would drag @wordpress/i18n and every
 * editor control constant into the frontend bundle.
 */
export const BREAKPOINTS = {
    mobile: 320,
    tablet: 768,
    desktop: 1025
};

export default BREAKPOINTS;
