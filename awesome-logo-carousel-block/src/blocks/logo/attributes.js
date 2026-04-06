const { generateBackgroundAttributes, generateResBoxControlAttributes, generateBorderAttributes, generateResRangeAttributes } =
    window?.alcbModules;

const attributes = {
    photo: {
        type: 'object',
        default: {}
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
