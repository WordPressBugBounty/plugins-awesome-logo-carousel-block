/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { softMinifyCssStrings } from '../helper';
import { BREAKPOINTS } from '../constants/breakpoints';

/*
 * Derived from the shared breakpoints so the CSS, the editor preview and the
 * frontend can no longer drift apart. These evaluate to the same 767/768/1024
 * the generator has always emitted, so `blockStyle` output is unchanged.
 */
const TABLET_MIN = BREAKPOINTS.tablet;
const TABLET_MAX = BREAKPOINTS.desktop - 1;
const MOBILE_MAX = BREAKPOINTS.tablet - 1;

const GlobalStyleHandler = props => {
    const { attributes, setAttributes, deskStyles, tabStyles, mobStyles } = props;
    const { blockStyle } = attributes;

    /**
     * Block Styles
     */
    const blockStyleCss = `
        ${
            deskStyles !== undefined && deskStyles !== ''
                ? `
                ${deskStyles}
            `
                : ''
        }
        ${
            tabStyles !== undefined && tabStyles !== '' && tabStyles !== null
                ? `
                @media (max-width: ${TABLET_MAX}px) and (min-width: ${TABLET_MIN}px) {
                    ${tabStyles}
                }
            `
                : ''
        }
        ${
            mobStyles !== undefined && mobStyles !== '' && mobStyles !== null
                ? `
                @media (max-width: ${MOBILE_MAX}px) {
                    ${mobStyles}
                }
            `
                : ''
        }
    `;

    // Set Block Styles
    useEffect(() => {
        if (JSON.stringify(blockStyle) !== JSON.stringify(blockStyleCss)) {
            setAttributes({ blockStyle: softMinifyCssStrings(blockStyleCss) });
        }
    }, [attributes]);

    return <style>{`${softMinifyCssStrings(blockStyleCss)}`}</style>;
};

export default GlobalStyleHandler;
