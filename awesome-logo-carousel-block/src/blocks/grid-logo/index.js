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
                    <rect rx="0.5" strokeWidth="1.5" id="svg_1" height={18} width={20} y={3} x={2} stroke="#38a083" fill="#fff" />
                    <g id="svg_6">
                        <rect
                            rx="0.1"
                            id="svg_2"
                            height="2.87493"
                            width="4.81238"
                            y="7.70323"
                            x="5.6251"
                            strokeWidth="1.5"
                            stroke="#38a083"
                            fill="#38a083"
                        />
                        <rect
                            rx="0.1"
                            id="svg_3"
                            height="2.87493"
                            width="4.81238"
                            y="7.70323"
                            x="13.56252"
                            strokeWidth="1.5"
                            stroke="#38a083"
                            fill="#38a083"
                        />
                        <rect
                            rx="0.1"
                            id="svg_4"
                            height="2.87493"
                            width="4.81238"
                            y="13.42184"
                            x="5.6251"
                            strokeWidth="1.5"
                            stroke="#38a083"
                            fill="#38a083"
                        />
                        <rect
                            rx="0.1"
                            id="svg_5"
                            height="2.87493"
                            width="4.81238"
                            y="13.42184"
                            x="13.56252"
                            strokeWidth="1.5"
                            stroke="#38a083"
                            fill="#38a083"
                        />
                    </g>
                </g>
            </svg>
        )
    },
    attributes,
    edit: Edit,
    save: Save
});
