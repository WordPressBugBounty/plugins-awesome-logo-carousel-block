/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

// prefix
export const PREFIX = 'alcb_';

// units
export const GENERAL_UNITS = ['px', 'em', 'rem'];
export const LHLS_UNITS = ['px', 'em'];

// Responsive Devices
export const RES_DEVICES = [
    {
        label: __('Desktop', 'awesome-logo-carousel-block'),
        value: 'Desktop',
        icon: (
            <svg width="8" height="7" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 0H0.666667C0.298611 0 0 0.293945 0 0.65625V5.03125C0 5.39355 0.298611 5.6875 0.666667 5.6875H3.33333L3.11111 6.34375H2.11111C1.92639 6.34375 1.77778 6.49004 1.77778 6.67188C1.77778 6.85371 1.92639 7 2.11111 7H5.88889C6.07361 7 6.22222 6.85371 6.22222 6.67188C6.22222 6.49004 6.07361 6.34375 5.88889 6.34375H4.88889L4.66667 5.6875H7.33333C7.70139 5.6875 8 5.39355 8 5.03125V0.65625C8 0.293945 7.70139 0 7.33333 0ZM7.11111 4.8125H0.888889V0.875H7.11111V4.8125Z"></path>
            </svg>
        )
    },
    {
        label: __('Tablet', 'awesome-logo-carousel-block'),
        value: 'Tablet',
        icon: (
            <svg width="6" height="7" viewBox="0 0 6 7" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0H1C0.446667 0 0 0.390833 0 0.875V6.125C0 6.60917 0.446667 7 1 7H5C5.55333 7 6 6.60917 6 6.125V0.875C6 0.390833 5.55333 0 5 0ZM3.66667 6.41667H2.33333V6.125H3.66667V6.41667ZM5.41667 5.54167H0.583333V0.875H5.41667V5.54167Z"></path>
            </svg>
        )
    },
    {
        label: __('Mobile', 'awesome-logo-carousel-block'),
        value: 'Mobile',
        icon: (
            <svg width="4" height="7" viewBox="0 0 4 7" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33333 0H0.666667C0.297778 0 0 0.390833 0 0.875V6.125C0 6.60917 0.297778 7 0.666667 7H3.33333C3.70222 7 4 6.60917 4 6.125V0.875C4 0.390833 3.70222 0 3.33333 0ZM2.44444 6.41667H1.55556V6.125H2.44444V6.41667ZM3.61111 5.54167H0.388889V0.875H3.61111V5.54167Z"></path>
            </svg>
        )
    }
];

// text alignment
export const TEXT_ALIGNS = [
    {
        label: __('Left', 'awesome-logo-carousel-block'),
        value: 'left',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M4 12l10 0" />
                <path d="M4 18l14 0" />
            </svg>
        )
    },
    {
        label: __('Center', 'awesome-logo-carousel-block'),
        value: 'center',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M8 12l8 0" />
                <path d="M6 18l12 0" />
            </svg>
        )
    },
    {
        label: __('Right', 'awesome-logo-carousel-block'),
        value: 'right',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M10 12l10 0" />
                <path d="M6 18l14 0" />
            </svg>
        )
    }
];

// flex aligns
export const FLEX_HORIZONTAL_ALIGNS = [
    {
        label: __('Left', 'awesome-logo-carousel-block'),
        value: 'flex-start',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l0 16" />
                <path d="M8 9m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
            </svg>
        )
    },
    {
        label: __('Center', 'awesome-logo-carousel-block'),
        value: 'center',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 12l5 0" />
                <path d="M15 12l5 0" />
                <path d="M9 6m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
        )
    },
    {
        label: __('Right', 'awesome-logo-carousel-block'),
        value: 'flex-end',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 4l0 16" />
                <path d="M4 9m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
            </svg>
        )
    }
];
export const FLEX_VERTICAL_ALIGNS = [
    {
        label: __('Top', 'awesome-logo-carousel-block'),
        value: 'flex-start',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l16 0" />
                <path d="M9 8m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
        )
    },
    {
        label: __('Middle', 'awesome-logo-carousel-block'),
        value: 'center',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 4l0 5" />
                <path d="M12 15l0 5" />
                <path d="M6 9m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
            </svg>
        )
    },
    {
        label: __('Bottom', 'awesome-logo-carousel-block'),
        value: 'flex-end',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20l16 0" />
                <path d="M9 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
        )
    }
];

// Box Shadow Position
export const BOX_SHADOW_POSITION = [
    {
        label: __('Outset', 'awesome-logo-carousel-block'),
        value: 'outset'
    },
    {
        label: __('Inset', 'awesome-logo-carousel-block'),
        value: 'inset'
    }
];

// Border Style
export const BORDER_STYLES = [
    {
        label: __('Solid', 'awesome-logo-carousel-block'),
        value: 'solid',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true" focusable="false">
                <path d="M5 11.25h14v1.5H5z" />
            </svg>
        )
    },
    {
        label: __('Dashed', 'awesome-logo-carousel-block'),
        value: 'dashed',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true" focusable="false">
                <path fillRule="evenodd" d="M5 11.25h3v1.5H5v-1.5zm5.5 0h3v1.5h-3v-1.5zm8.5 0h-3v1.5h3v-1.5z" clipRule="evenodd" />
            </svg>
        )
    },
    {
        label: __('Dotted', 'awesome-logo-carousel-block'),
        value: 'dotted',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true" focusable="false">
                <path
                    fillRule="evenodd"
                    d="M5.25 11.25h1.5v1.5h-1.5v-1.5zm3 0h1.5v1.5h-1.5v-1.5zm4.5 0h-1.5v1.5h1.5v-1.5zm1.5 0h1.5v1.5h-1.5v-1.5zm4.5 0h-1.5v1.5h1.5v-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        )
    }
];

// Background Types
export const BACKGROUND_TYPES = [
    {
        label: __('Classic', 'awesome-logo-carousel-block'),
        value: 'classic'
    },
    {
        label: __('Gradient', 'awesome-logo-carousel-block'),
        value: 'gradient'
    }
];

// Overlay Types
export const OVERLAY_TYPES = [
    {
        label: __('Classic', 'awesome-logo-carousel-block'),
        value: 'classic'
    },
    {
        label: __('Gradient', 'awesome-logo-carousel-block'),
        value: 'gradient'
    }
];

// Gradient Palettes
export const GRADIENT_PALETTES = [
    {
        name: 'JShine',
        gradient: 'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
        slug: 'jshine'
    },
    {
        name: 'Rastafarie',
        gradient: 'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
        slug: 'rastafari'
    },
    {
        name: 'Yoda',
        gradient: 'linear-gradient(135deg,#FF0099 0%, #493240 100%)',
        slug: 'yoda'
    },
    {
        name: 'Piglet',
        gradient: 'linear-gradient(135deg,#ee9ca7 0%, #ffdde1 100%)',
        slug: 'piglet'
    },
    {
        name: 'Cool Blues',
        gradient: 'linear-gradient(135deg,#2193b0 0%, #6dd5ed 100%)',
        slug: 'cool-blues'
    },
    {
        name: 'MegaTron',
        gradient: 'linear-gradient(135deg,#C6FFDD 0%, #FBD786 100%)',
        slug: 'megatron'
    }
];

// Heading Tags
export const HEADING_TAGS = [
    {
        label: __('H1', 'awesome-logo-carousel-block'),
        value: 'h1'
    },
    {
        label: __('H2', 'awesome-logo-carousel-block'),
        value: 'h2'
    },
    {
        label: __('H3', 'awesome-logo-carousel-block'),
        value: 'h3'
    },
    {
        label: __('H4', 'awesome-logo-carousel-block'),
        value: 'h4'
    },
    {
        label: __('H5', 'awesome-logo-carousel-block'),
        value: 'h5'
    },
    {
        label: __('H6', 'awesome-logo-carousel-block'),
        value: 'h6'
    },
    {
        label: __('Div', 'awesome-logo-carousel-block'),
        value: 'div'
    },
    {
        label: __('P', 'awesome-logo-carousel-block'),
        value: 'p'
    },
    {
        label: __('Span', 'awesome-logo-carousel-block'),
        value: 'span'
    }
];

export const taSvgib = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    span: 'span'
};
