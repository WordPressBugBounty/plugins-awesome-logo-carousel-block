const { generateBackgroundAttributes, generateResBoxControlAttributes, generateBorderAttributes, generateResRangeAttributes } =
    window?.alcbModules;

import {
    ACTIVE_PAGI_HEIGHT,
    ACTIVE_PAGI_WIDTH,
    INACRIVE_PAGI_WIDTH,
    INACTIVE_PAGI_HEIGHT,
    ITEM_PADDING,
    LOGO_BG,
    LOGO_MWIDTH,
    LOGO_PADDING,
    NAV_BG,
    NAV_BORDER,
    NAV_BRADIUS,
    NAV_HEIGHT,
    NAV_HOVER_BG,
    NAV_ICON_SIZE,
    NAV_MARGIN,
    NAV_WIDTH,
    PAGI_BORDER,
    PAGI_BRADIUS,
    // pagination
    PAGI_MARGIN
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
    slideStatus: {
        type: 'boolean',
        default: false
    },
    linkType: {
        type: 'string',
        default: ''
    },
    images: {
        type: 'array'
    },
    loop: {
        type: 'boolean',
        default: true
    },
    autoplay: {
        type: 'boolean',
        default: true
    },
    reverseAutoplayDirection: {
        type: 'boolean',
        default: false
    },
    speed: {
        type: 'number',
        default: 400
    },
    autoplayDelay: {
        type: 'number',
        default: 2000
    },
    pauseOnHover: {
        type: 'boolean',
        default: true
    },
    keyboard: {
        type: 'boolean',
        default: false
    },
    mousewheel: {
        type: 'boolean',
        default: false
    },
    autoHeight: {
        type: 'boolean',
        default: false
    },
    slideDirection: {
        type: 'string',
        default: 'ltr'
    },
    showNav: {
        type: 'boolean',
        default: true
    },
    showPagination: {
        type: 'boolean',
        default: true
    },
    itemDevice: {
        type: 'string',
        default: 'desktop'
    },
    deskItemsPerView: {
        type: 'number',
        default: 4
    },
    tabItemsPerView: {
        type: 'number',
        default: 2
    },
    phoneItemsPerView: {
        type: 'number',
        default: 1
    },
    deskRows: {
        type: 'number'
    },
    tabRows: {
        type: 'number'
    },
    phoneRows: {
        type: 'number'
    },
    spaceDevice: {
        type: 'string',
        default: 'desktop'
    },
    deskSpace: {
        type: 'number',
        default: 30
    },
    tabSpace: {
        type: 'number',
        default: 20
    },
    phoneSpace: {
        type: 'number',
        default: 10
    },
    showCaption: {
        type: 'boolean',
        default: false
    },
    captionVisibility: {
        type: 'string',
        default: 'caption__hover'
    },
    captionBg: {
        type: 'string',
        default: '#333333'
    },
    captionColor: {
        type: 'string',
        default: '#ffffff'
    },
    borderWidth: {
        type: 'string',
        default: '0'
    },
    borderColor: {
        type: 'string',
        default: '#333333'
    },
    borderStyle: {
        type: 'string',
        default: 'solid'
    },
    borderRadius: {
        type: 'number',
        default: 0
    },
    logoHoverStyle: {
        type: 'string',
        default: 'none'
    },
    // link
    enableLink: {
        type: 'boolean',
        default: false
    },
    logoLinks: {
        type: 'array',
        default: []
    },
    openInNewTab: {
        type: 'boolean',
        default: false
    },
    //navigation
    iconColor: {
        type: 'string'
    },
    iconHoverColor: {
        type: 'string'
    },
    navPosition: {
        type: 'string',
        default: ''
    },
    customNavigation: {
        type: 'boolean',
        default: false
    },
    prevNav: {
        type: 'object',
        default: {
            id: '',
            url: '',
            alt: ''
        }
    },
    nextNav: {
        type: 'object',
        default: {
            id: '',
            url: '',
            alt: ''
        }
    },
    // pagination
    pagiColor: {
        type: 'string'
    },
    paginationType: {
        type: 'string',
        default: 'bullets'
    },
    // generator
    ...generateResRangeAttributes({
        controlName: LOGO_MWIDTH
    }),
    ...generateResBoxControlAttributes(ITEM_PADDING),
    ...generateBackgroundAttributes(LOGO_BG),
    ...generateResBoxControlAttributes(LOGO_PADDING),
    // navigation
    ...generateBorderAttributes({
        controlName: NAV_BORDER
    }),
    ...generateResBoxControlAttributes(NAV_BRADIUS),
    ...generateResRangeAttributes({
        controlName: NAV_WIDTH
    }),
    ...generateResRangeAttributes({
        controlName: NAV_HEIGHT
    }),
    ...generateResRangeAttributes({
        controlName: NAV_ICON_SIZE
    }),
    ...generateResBoxControlAttributes(NAV_MARGIN),
    ...generateBackgroundAttributes(NAV_BG),
    ...generateBackgroundAttributes(NAV_HOVER_BG),
    // pagination
    ...generateResBoxControlAttributes(PAGI_MARGIN),
    ...generateResRangeAttributes({
        controlName: INACRIVE_PAGI_WIDTH
    }),
    ...generateResRangeAttributes({
        controlName: ACTIVE_PAGI_WIDTH
    }),
    ...generateResRangeAttributes({
        controlName: INACTIVE_PAGI_HEIGHT
    }),
    ...generateResRangeAttributes({
        controlName: ACTIVE_PAGI_HEIGHT
    }),
    ...generateBorderAttributes({
        controlName: PAGI_BORDER
    }),
    ...generateResBoxControlAttributes(PAGI_BRADIUS)
};
export default attributes;
