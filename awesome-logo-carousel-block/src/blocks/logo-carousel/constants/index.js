import { __ } from '@wordpress/i18n';

export const VISIBLES = [
    {
        label: __('Always', 'awesome-logo-carousel-block'),
        value: 'caption__always'
    },
    {
        label: __('Hover', 'awesome-logo-carousel-block'),
        value: 'caption__hover'
    }
];

export const HOVER_EFFECTS = [
    {
        label: __('None', 'awesome-logo-carousel-block'),
        value: 'none'
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

export const BORDER_STYLES = [
    {
        label: __('None', 'awesome-logo-carousel-block'),
        value: 'none'
    },
    {
        label: __('Solid', 'awesome-logo-carousel-block'),
        value: 'solid'
    },
    {
        label: __('Dotted', 'awesome-logo-carousel-block'),
        value: 'dotted'
    },
    {
        label: __('Dashed', 'awesome-logo-carousel-block'),
        value: 'dashed'
    },
    {
        label: __('Double', 'awesome-logo-carousel-block'),
        value: 'double'
    },
    {
        label: __('Groove', 'awesome-logo-carousel-block'),
        value: 'groove'
    },
    {
        label: __('Ridge', 'awesome-logo-carousel-block'),
        value: 'ridge'
    },
    {
        label: __('Inset', 'awesome-logo-carousel-block'),
        value: 'inset'
    },
    {
        label: __('Outset', 'awesome-logo-carousel-block'),
        value: 'outset'
    }
];

// item
export const ITEM_PADDING = 'itemPadding';

export const LOGO_BG = 'logo';
export const LOGO_PADDING = 'logoPadding';

export const LOGO_MWIDTH = 'logoMaxWidth';

//navigation
export const NAV_BG = 'navBg';
export const NAV_BORDER = 'navBorder';
export const NAV_BRADIUS = 'navBorderRadius';
export const NAV_WIDTH = 'navWidth';
export const NAV_HEIGHT = 'navHeight';
export const NAV_ICON_SIZE = 'navIconSize';
export const NAV_MARGIN = 'navMargin';
export const NAV_HOVER_BG = 'navHoverBg';
//pagination
export const PAGI_MARGIN = 'pagiMargin';
export const ACTIVE_PAGI_WIDTH = 'activePagiWidth';
export const INACRIVE_PAGI_WIDTH = 'inactivePagiWidth';
export const INACTIVE_PAGI_HEIGHT = 'inactivePagiHeight';
export const ACTIVE_PAGI_HEIGHT = 'activePagiHeight';
export const PAGI_BORDER = 'pagiBorder';
export const PAGI_BRADIUS = 'pagiBorder';

// nav positions
export const NAV_POSITIONS = [
    {
        label: __('Top Left (Pro)', 'awesome-logo-carousel-block'),
        value: 'top-left',
        disabled: true
    },
    {
        label: __('Top Center (Pro)', 'awesome-logo-carousel-block'),
        value: 'top-center',
        disabled: true
    },
    {
        label: __('Top Right (Pro)', 'awesome-logo-carousel-block'),
        value: 'top-right',
        disabled: true
    },
    {
        label: __('Center Center', 'awesome-logo-carousel-block'),
        value: ''
    },
    {
        label: __('Bottom Left (Pro)', 'awesome-logo-carousel-block'),
        value: 'bottom-left',
        disabled: true
    },
    {
        label: __('Bottom Center (Pro)', 'awesome-logo-carousel-block'),
        value: 'bottom-center',
        disabled: true
    },
    {
        label: __('Bottom Right (Pro)', 'awesome-logo-carousel-block'),
        value: 'bottom-right',
        disabled: true
    }
];

export const PAG_TYPES = [
    {
        label: __('Bullets', 'awesome-logo-carousel-block'),
        value: 'bullets'
    },
    {
        label: __('Numbers', 'awesome-logo-carousel-block'),
        value: 'fraction'
    },
    {
        label: __('Progressbar', 'awesome-logo-carousel-block'),
        value: 'progressbar'
    }
];
