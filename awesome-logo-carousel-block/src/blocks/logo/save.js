import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
const { DynamicTag } = window?.alcbModules;

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
