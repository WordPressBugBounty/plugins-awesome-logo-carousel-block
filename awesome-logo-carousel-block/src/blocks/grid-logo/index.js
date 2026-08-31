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

// shared with the editor placeholder
import blockIcon from './icon';

// frozen save snapshots for content written by earlier versions
import deprecated from './deprecated';

/**
 * Block Registration
 */
registerBlockType(metadata, {
    icon: { src: blockIcon, foreground: '#38a083' },
    attributes,
    deprecated,
    edit: Edit,
    save: Save
});
