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
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                style={{
                    fill: '#38a083'
                }}
            >
                <path d="M4 19h2c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2h2c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2h-2c0-1.103-.897-2-2-2H8c-1.103 0-2 .897-2 2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2zM20 7v10h-2V7h2zM8 5h8l.001 14H8V5zM4 7h2v10H4V7z" />
            </svg>
        )
    },
    attributes,
    edit: Edit,
    save: Save
});
