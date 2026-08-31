/**
 * DEPRECATION v1 — frozen snapshot of the `lcb/grid-logo` save output as of 2.2.4.
 *
 * DO NOT EDIT, REFORMAT, OR "TIDY" THIS FILE.
 *
 * This one is genuinely simple, but it is snapshotted for the same reason as
 * the others: the moment `gallery-inner` or the wrapper class changes, every
 * existing grid on every site is re-validated against the new save().
 *
 * `showPagination` and `images` are destructured but unused in the original.
 * Kept verbatim — a destructure has no effect on output, and matching the
 * source exactly is worth more than tidiness in a file nobody should edit.
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function Save({ attributes }) {
    const { sliderId, showPagination, images } = attributes;

    return (
        <div
            {...useBlockProps.save({
                className: classnames(sliderId)
            })}
        >
            <div className="gallery-inner">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
