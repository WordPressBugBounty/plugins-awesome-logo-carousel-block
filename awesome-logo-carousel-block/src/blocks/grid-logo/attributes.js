const {
    generateBackgroundAttributes,
    generateResBoxControlAttributes,
    generateBorderAttributes,
    generateResRangeAttributes,
    generateTypographyAttributes,
    generateAlignmentAttributes
} = window?.alcbModules;

import {
    ALIGN,
    // caption
    CAPTION_MARGIN,
    CAPTION_TITLE_TYPO,
    CONTENT_BG,
    // content
    CONTENT_BORDER,
    CONTENT_BRADIUS,
    CONTENT_PADDING,
    // desc
    DESC_MARGIN,
    DESC_TITLE_TYPO,
    GAP,
    GRID_COL,
    GRID_GAP,
    // logo style
    LOGO_BORDER,
    LOGO_BRADIUS,
    LOGO_HOVER_BG,
    LOGO_PADDING,
    LOGO_SIZE,
    VALIGN
} from './constants';

const attributes = {
    patternMode: {
        type: 'boolean',
        default: true
    },
    openModal: {
        type: 'boolean',
        default: false
    },
    images: {
        type: 'array',
        default: []
    },
    enableLink: {
        type: 'boolean',
        default: false
    },
    logoHoverStyle: {
        type: 'string',
        default: ''
    },
    captionVisibility: {
        type: 'boolean',
        default: false
    },
    captionTitleColor: {
        type: 'string'
    },
    contentVisiblity: {
        type: 'string',
        default: 'cv_always'
    },
    contentPosition: {
        type: 'string',
        default: ''
    },
    visibleContentPosition: {
        type: 'string',
        default: ''
    },
    showDesc: {
        type: 'boolean',
        default: false
    },
    descColor: {
        type: 'string'
    },
    hoverOverlay: {
        type: 'string',
        default: 'auto'
    },
    hoverEffect: {
        type: 'string',
        default: ''
    },
    // grid logo
    ...generateResRangeAttributes({
        controlName: GRID_COL
    }),
    ...generateResRangeAttributes({
        controlName: GRID_GAP
    }),
    // logo style
    ...generateBorderAttributes({
        controlName: LOGO_BORDER
    }),
    ...generateResBoxControlAttributes(LOGO_BRADIUS),
    ...generateResBoxControlAttributes(LOGO_PADDING),
    ...generateBackgroundAttributes(LOGO_HOVER_BG),
    ...generateResRangeAttributes({
        controlName: LOGO_SIZE
    }),
    // caption
    ...generateResBoxControlAttributes(CAPTION_MARGIN),
    ...generateTypographyAttributes({
        controlName: CAPTION_TITLE_TYPO
    }),
    // desc
    ...generateResBoxControlAttributes(DESC_MARGIN),
    ...generateTypographyAttributes({
        controlName: DESC_TITLE_TYPO
    }),
    // content
    ...generateBorderAttributes({
        controlName: CONTENT_BORDER
    }),
    ...generateResBoxControlAttributes(CONTENT_BRADIUS),
    ...generateBackgroundAttributes(CONTENT_BG),
    ...generateAlignmentAttributes({
        controlName: ALIGN
    }),
    ...generateResBoxControlAttributes(CONTENT_PADDING),

    // flex
    ...generateAlignmentAttributes({
        controlName: VALIGN
    }),
    ...generateResRangeAttributes({
        controlName: GAP
    })
};
export default attributes;
