/**
 * Add global attributes to all blocks
 */

import { addFilter } from '@wordpress/hooks';

/**
 * Attributes every `lcb/*` block gets for free.
 *
 * These are LIVE and may change in future releases. Deprecations must never
 * read from here — each one carries its own frozen copy in
 * `src/blocks/<block>/deprecated/vN/attributes.json`.
 */
export const ALCB_GLOBAL_ATTRIBUTES = {
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

addFilter('blocks.registerBlockType', 'alcb/attribute/global', function (settings, name, deprecation) {
    if (!name.includes('lcb/')) {
        return settings;
    }

    /**
     * WordPress applies this filter to every deprecation as well as to the
     * block itself, passing the deprecation as the third argument.
     *
     * Deprecations must be left alone. They ship a frozen attribute schema
     * that already contains the globals as they existed in that version, and
     * injecting today's globals would silently reshape every historical
     * schema — e.g. giving `sliderId` a default would materialise `data-id`
     * and `id` on content that never had them, invalidating those blocks on
     * every site at once, with no code change to any save function.
     */
    if (deprecation) {
        return settings;
    }

    settings.attributes = {
        // Globals first, so an explicit declaration on the block always wins.
        // On WordPress versions that predate the `deprecation` argument this
        // ordering is what keeps a deprecation's own frozen `sliderId` intact.
        ...ALCB_GLOBAL_ATTRIBUTES,
        ...settings.attributes
    };

    return settings;
});
