/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
import { MediaPlaceholder, RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const { handleUniqueId } = window.alcbModules.Helpers;
const { DynamicTag } = window?.alcbModules;

// editor style
import Inspect from './inspect';

import classnames from 'classnames';

export default function Edit(props) {
    const { attributes, setAttributes, clientId, isSelected, context } = props;
    const {
        sliderId,
        photo,
        imgAlt,
        link,
        hoverEffect,
        imageRes,
        captionVisibility,
        caption,
        enableLink,
        contentVisiblity,
        showDesc,
        description,
        logoHoverStyle,
        hoverOverlay,
        contentPosition,
        visibleContentPosition
    } = attributes;

    // Block ID
    useEffect(() => {
        handleUniqueId({ sliderId, setAttributes, clientId });
        setAttributes({
            enableLink: context['lcb/enableLink'],
            captionVisibility: context['lcb/captionVisibility'],
            contentVisiblity: context['lcb/contentVisiblity'],
            showDesc: context['lcb/showDesc'],
            logoHoverStyle: context['lcb/logoHoverStyle'],
            hoverOverlay: context['lcb/hoverOverlay'],
            hoverEffect: context['lcb/hoverEffect'],
            contentPosition: context['lcb/contentPosition'],
            visibleContentPosition: context['lcb/visibleContentPosition']
        });
    }, [context]);

    return (
        <Fragment>
            {isSelected && <Inspect {...props} />}
            <div {...useBlockProps()}>
                {photo && photo?.url ? (
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
                            <img src={photo.sizes && photo.sizes[imageRes] ? photo.sizes[imageRes].url : photo.url} alt={imgAlt} />
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
                                    <RichText
                                        tagName="span"
                                        value={caption || photo?.caption}
                                        onChange={v =>
                                            setAttributes({
                                                caption: v
                                            })
                                        }
                                        placeholder={__('write caption..', 'awesome-logo-carousel-block')}
                                    />
                                </div>
                            )}
                            {showDesc && (
                                <div className="alcb__logo-description">
                                    <RichText
                                        tagName="span"
                                        value={description}
                                        onChange={v =>
                                            setAttributes({
                                                description: v
                                            })
                                        }
                                        placeholder={__('write description..', 'awesome-logo-carousel-block')}
                                    />
                                </div>
                            )}
                        </div>
                    </DynamicTag>
                ) : (
                    <div className="logo-media-placeholder">
                        <MediaPlaceholder
                            onSelect={media => {
                                setAttributes({
                                    photo: {
                                        id: media.id,
                                        url: media.url,
                                        sizes: media.sizes
                                    },
                                    caption: media.caption
                                });
                            }}
                            accept="image/*"
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: __('Upload Logo', 'awesome-logo-carousel-block') }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
