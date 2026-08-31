/**
 * FROZEN — v1 deprecation. Append-only: never edit this directory once released.
 *
 * `supports` and `apiVersion` are declared explicitly and that is not optional.
 * WordPress builds a deprecated block type as
 *   Object.assign( omit( blockType, DEPRECATED_ENTRY_KEYS ), deprecation )
 * and DEPRECATED_ENTRY_KEYS contains 'attributes', 'supports', 'save',
 * 'migrate', 'isEligible' and 'apiVersion'. Anything omitted here is therefore
 * absent, not inherited — a deprecation without `supports` runs with no
 * supports at all, which would drop the `align` attribute and invalidate every
 * wide/full block on every site.
 *
 * No `isEligible`: it is consulted for VALID blocks too, and returning true
 * would re-parse and migrate content that was perfectly fine.
 * No `migrate`: the attribute shape has not changed.
 */
import attributes from './attributes.json';
import supports from './supports.json';
import save from './save';

export default {
    apiVersion: 3,
    supports,
    attributes,
    save
};
