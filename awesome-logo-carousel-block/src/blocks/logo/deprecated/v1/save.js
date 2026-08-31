/**
 * DEPRECATION v1 — frozen snapshot of the `lcb/logo` save output as of 2.2.4.
 *
 * DO NOT EDIT, REFORMAT, OR "TIDY" THIS FILE.
 *
 * Note the shapes this must keep validating, however wrong they look:
 *  - `photo` defaults to `{}` (truthy), so empty logo blocks serialized
 *    `<img class="wp-image-undefined">` with no `src` at all.
 *  - `imgAlt` and `imageRes` were never declared attributes, so `alt` was
 *    omitted entirely and `photo.sizes[imageRes]` never resolved.
 * Both are real saved markup on live sites. Reproducing them is the point.
 *
 * Intentionally self-contained — no `window.alcbModules`, no shared helpers.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

// Local copy of src/controls/dynamic-tag — frozen so upstream edits cannot reach this file.
const DynamicTag = props => {
    const { tagName, children, ...attr } = props;
    const Tag = tagName || 'h2';
    return <Tag {...attr}>{children}</Tag>;
};

export default function Save({ attributes }) {
    const {
        sliderId,
        showPagination,
        photo,
        imgAlt,
        link,
        imageRes,
        captionVisibility,
        caption,
        contentVisiblity,
        showDesc,
        description,
        logoHoverStyle,
        hoverOverlay,
        hoverEffect,
        contentPosition,
        visibleContentPosition
    } = attributes;

    return (
        <div
            {...useBlockProps.save({
                className: classnames('wp-block-lcb-logo', sliderId, {
                    alcb__active_pagination: showPagination
                })
            })}
        >
            {photo && (
                <DynamicTag
                    tagName={link && link.url ? 'a' : 'div'}
                    {...(link && link.url && { href: link.url })}
                    {...(link &&
                        link.openInNewTab && {
                            target: '_blank',
                            rel: 'noopener noreferrer'
                        })}
                    className={classnames('logo-wrapper', {
                        [visibleContentPosition]: visibleContentPosition !== '',
                        flex: visibleContentPosition !== ''
                    })}
                >
                    <div
                        className={classnames('logo-img', {
                            [`alcb__${logoHoverStyle}`]: logoHoverStyle !== ''
                        })}
                    >
                        <img
                            className={`wp-image-${photo.id}`}
                            src={photo.sizes && photo.sizes[imageRes] ? photo.sizes[imageRes].url : photo.url}
                            alt={imgAlt}
                        />
                    </div>
                    <div
                        className={classnames('logo-content', {
                            [contentVisiblity]: contentVisiblity !== 'cv_always',
                            [hoverOverlay]: hoverOverlay !== 'auto',
                            [hoverEffect]: hoverEffect !== '',
                            [contentPosition]: contentPosition !== ''
                        })}
                    >
                        {captionVisibility && (
                            <div className="alcb__logo-caption">
                                {caption || photo?.caption || __('No Caption', 'awesome-logo-carousel-block')}
                            </div>
                        )}
                        {showDesc && (
                            <div className="alcb__logo-description">
                                {description || __('No Description', 'awesome-logo-carousel-block')}
                            </div>
                        )}
                    </div>
                </DynamicTag>
            )}
        </div>
    );
}
