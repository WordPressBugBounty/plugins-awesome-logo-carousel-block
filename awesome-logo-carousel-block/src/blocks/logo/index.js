import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import metadata from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';

// attributes
import attributes from './attributes';

/**
 * Block Registration
 */
registerBlockType(metadata, {
    icon: {
        src: (
            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
                <g>
                    <rect rx="0.5" strokeWidth="1.5" id="svg_1" height={10} width={22} y={7} x={1} stroke="#38a083" fill="none" />
                </g>
            </svg>
        )
    },
    attributes,
    edit: Edit,
    save: Save
});
