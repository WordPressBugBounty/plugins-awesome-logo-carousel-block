import { __ } from '@wordpress/i18n';

export const VISIBLES = [
    {
        label: __('Always', 'awesome-logo-carousel-block'),
        value: 'cv_always'
    },
    {
        label: __('Hover', 'awesome-logo-carousel-block'),
        value: 'cv_hover'
    }
];
export const OVERLAY = [
    {
        label: __('Auto', 'awesome-logo-carousel-block'),
        value: 'auto'
    },
    {
        label: __('Overlay', 'awesome-logo-carousel-block'),
        value: 'overlay'
    }
];
export const HOVER_EFFECTS = [
    {
        label: __('None', 'awesome-logo-carousel-block'),
        value: ''
    },
    {
        label: __('GrayScale', 'awesome-logo-carousel-block'),
        value: 'normal_to_gray'
    },
    {
        label: __('Zoom In', 'awesome-logo-carousel-block'),
        value: 'zoom_in'
    },
    {
        label: __('Zoom Out', 'awesome-logo-carousel-block'),
        value: 'zoom_out'
    }
];

export const CONTENT_EFFECT = [
    {
        label: __('Slide Up', 'awesome-logo-carousel-block'),
        value: ''
    },
    {
        label: __('Slide Down', 'awesome-logo-carousel-block'),
        value: 'slide-down'
    },
    {
        label: __('Slide Left', 'awesome-logo-carousel-block'),
        value: 'slide-left'
    },
    {
        label: __('Slide Right', 'awesome-logo-carousel-block'),
        value: 'slide-right'
    },
    {
        label: __('Scale', 'awesome-logo-carousel-block'),
        value: 'scale'
    }
];

export const CONTENT_POSITIONS = [
    { label: __('Top', 'awesome-logo-carousel-block'), value: 'top' },
    { label: __('Bottom', 'awesome-logo-carousel-block'), value: '' }
];

export const VC_POSITIONS = [
    { label: __('Left', 'awesome-logo-carousel-block'), value: 'vc_left' },
    { label: __('Right', 'awesome-logo-carousel-block'), value: 'vc_right' },
    { label: __('Top', 'awesome-logo-carousel-block'), value: 'vc_top' },
    { label: __('Bottom', 'awesome-logo-carousel-block'), value: '' }
];

// grid
export const GRID_COL = 'gridCol';
export const GRID_GAP = 'gridGap';

// logo style
export const LOGO_BORDER = 'logoBorder';
export const LOGO_BRADIUS = 'logoBorderRadius';
export const LOGO_PADDING = 'logoPadding';
export const LOGO_HOVER_BG = 'logoHoverBg';
export const CAPTION_BG = 'captionBg';
export const LOGO_SIZE = 'logoSize';

// caption
export const CAPTION_MARGIN = 'captionMargin';
export const CAPTION_TITLE_TYPO = 'captiontitletypo';

// desc
export const DESC_MARGIN = 'descMargin';
export const DESC_TITLE_TYPO = 'desctitletypo';

// content
export const CONTENT_BORDER = 'contentborder';
export const CONTENT_BRADIUS = 'contentradius';
export const CONTENT_BG = 'contentbg';
export const CONTENT_PADDING = 'contentpadding';

// align
export const ALIGN = 'align';

// gap
export const GAP = 'gap';
export const VALIGN = 'valign';
