/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { softMinifyCssStrings } from '../helper';

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
                @media (max-width: 1024px) and (min-width: 768px) {
                    ${tabStyles}
                }
            `
                : ''
        }
        ${
            mobStyles !== undefined && mobStyles !== '' && mobStyles !== null
                ? `
                @media (max-width: 767px) {
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
