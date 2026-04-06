/**
 * Add global attributes to all blocks
 */

import { addFilter } from '@wordpress/hooks';

addFilter('blocks.registerBlockType', 'alcb/attribute/global', function (settings, name) {
    if (name.includes('lcb/')) {
        settings.attributes = {
            ...settings.attributes,
            sliderId: {
                type: 'string'
            },
            preview: {
                type: 'boolean',
                default: false
            },
            resMode: {
                type: 'string',
                default: 'Desktop'
            },
            blockStyle: {
                type: 'object'
            }
        };
    }

    return settings;
});
