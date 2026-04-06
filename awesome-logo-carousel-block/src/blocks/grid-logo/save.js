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
