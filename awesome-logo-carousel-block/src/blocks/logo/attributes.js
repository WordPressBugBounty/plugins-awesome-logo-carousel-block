const attributes = {
    photo: {
        type: 'object',
        default: {}
    },
    /*
     * `imgAlt` and `imageRes` are read by save.js but were never declared, so
     * they were always undefined: every logo rendered with no `alt` attribute
     * at all, and `photo.sizes[imageRes]` never resolved to a sized image.
     *
     * Declared here WITHOUT a default, and that is load-bearing. A default of
     * ''  would make React emit `alt=""` where it previously emitted nothing —
     * a markup change, which would invalidate every existing lcb/logo block on
     * every site. Left undefined, the saved output is byte-identical and the
     * attributes simply become available to bind a control to.
     *
     * The missing alt is meanwhile backfilled at render time by
     * inc/classes/frontend.php, which fixes existing content too.
     */
    imgAlt: {
        type: 'string'
    },
    imageRes: {
        type: 'string'
    },
    link: {
        type: 'object',
        default: {
            url: '',
            openInNewTab: false
        }
    },
    caption: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    enableLink: {
        type: 'boolean',
        default: false
    },
    captionVisibility: {
        type: 'boolean',
        default: false
    },
    contentVisiblity: {
        type: 'string',
        default: 'cv_always'
    },
    showDesc: {
        type: 'boolean',
        default: false
    },
    logoHoverStyle: {
        type: 'string',
        default: ''
    },
    hoverOverlay: {
        type: 'string',
        default: 'auto'
    },
    hoverEffect: {
        type: 'string',
        default: ''
    },
    contentPosition: {
        type: 'string',
        default: ''
    },
    visibleContentPosition: {
        type: 'string',
        default: ''
    }
};
export default attributes;
