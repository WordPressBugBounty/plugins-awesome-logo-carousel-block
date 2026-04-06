/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
import { BlockControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useSelect } from '@wordpress/data';

const { handleUniqueId } = window.alcbModules.Helpers;
const { DynamicTag, generateRangeStyles } = window?.alcbModules;

// editor style
import './editor.scss';
import Inspect from './inspect';

// dynamic style
import DynamicStyle from './style';

export default function Edit(props) {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const {
        slideStatus,
        sliderId,
        images,
        loop,
        speed,
        autoplay,
        reverseAutoplayDirection,
        autoplayDelay,
        pauseOnHover,
        keyboard,
        mousewheel,
        autoHeight,
        slideDirection,
        showNav,
        showPagination,
        itemDevice,
        deskItemsPerView,
        tabItemsPerView,
        phoneItemsPerView,
        spaceDevice,
        deskSpace,
        tabSpace,
        phoneSpace,
        deskRows,
        tabRows,
        mobRows,
        showCaption,
        captionVisibility,
        captionBg,
        captionColor,
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        logoHoverStyle,
        // logo links
        enableLink,
        logoLinks,
        openInNewTab,
        navPosition,
        customNavigation,
        prevNav,
        nextNav,
        paginationType,
        linkType
    } = attributes;

    // blcok id
    useEffect(() => {
        handleUniqueId({ sliderId, setAttributes, clientId });
    }, []);

    // slider init
    const sliderInit = function (sliderE, options) {
        if (sliderE?.swiper) {
            sliderE?.swiper.destroy();
        }
        new Swiper(sliderE, options);
    };

    // Slider breakpoints
    const breakPoints = {
        breakpoints: {
            320: {
                slidesPerView: phoneItemsPerView || 1,
                spaceBetween: parseInt(phoneSpace) || 0,
                grid: {
                    rows: mobRows || 1,
                    fill: 'row'
                }
            },
            768: {
                slidesPerView: tabItemsPerView || 2,
                spaceBetween: parseInt(tabSpace) || 20,
                grid: {
                    rows: tabRows || 1,
                    fill: 'row'
                }
            },
            1025: {
                slidesPerView: deskItemsPerView || 4,
                spaceBetween: parseInt(deskSpace) || 30,
                grid: {
                    rows: deskRows || 1,
                    fill: 'row'
                }
            }
        }
    };

    // slider
    const sliderRef = useRef(null);
    useEffect(() => {
        if (sliderRef.current && images && images.length > 0) {
            const options = {
                loop,
                speed,
                loopAddBlankSlides: true,
                autoplay: autoplay
                    ? {
                          delay: autoplayDelay,
                          reverseDirection: reverseAutoplayDirection,
                          pauseOnMouseEnter: pauseOnHover,
                          disableOnInteraction: false
                      }
                    : false,
                navigation: showNav
                    ? {
                          nextEl: sliderRef.current.parentElement.querySelector('.alcb__next'),
                          prevEl: sliderRef.current.parentElement.querySelector('.alcb__prev')
                      }
                    : false,
                pagination: showPagination
                    ? {
                          el: sliderRef.current.parentElement.querySelector('.alcb__pag'),
                          clickable: showPagination,
                          type: paginationType
                      }
                    : false,
                keyboard,
                mousewheel,
                autoHeight,
                ...breakPoints
            };
            sliderInit(sliderRef.current, options);
        }
    }, [
        loop,
        speed,
        autoplay,
        reverseAutoplayDirection,
        autoplayDelay,
        pauseOnHover,
        keyboard,
        mousewheel,
        autoHeight,
        slideDirection,
        showNav,
        showPagination,
        itemDevice,
        deskItemsPerView,
        tabItemsPerView,
        phoneItemsPerView,
        spaceDevice,
        deskSpace,
        tabSpace,
        phoneSpace,
        sliderRef,
        slideStatus,
        deskRows,
        tabRows,
        mobRows,
        customNavigation,
        prevNav,
        nextNav,
        paginationType
    ]);
    // Fetch media data including custom_link for all images
    const mediaData = useSelect(
        select => {
            if (!images || !Array.isArray(images) || images.length === 0) return [];

            const { getMedia } = select('core');
            return images.map(image => {
                const media = getMedia(image.id);
                return media
                    ? {
                          id: image.id,
                          url: image.url,
                          alt: image.alt,
                          customLink: media.gtvb_custom_link || ''
                      }
                    : image;
            });
        },
        [images]
    );

    // Update attributes when custom links are fetched
    useEffect(() => {
        if (mediaData && mediaData.length > 0) {
            // Check if any custom links have changed
            const hasChanges = mediaData.some((newImage, index) => {
                const oldImage = images[index];
                return oldImage && oldImage.customLink !== newImage.customLink;
            });

            // Only update if there are actual changes to avoid infinite loops
            if (hasChanges) {
                setAttributes({ images: mediaData });
            }
        }
    }, [mediaData]);

    return (
        <Fragment>
            {images && (
                <BlockControls>
                    <ToolbarGroup>
                        <MediaUpload
                            onSelect={media => {
                                const selectedImages = Array.isArray(media) ? media : [media];
                                const formattedImages = selectedImages.map(item => ({
                                    id: item.id,
                                    url: item.url,
                                    alt: item.alt,
                                    caption: item.caption,
                                    sizes: item?.sizes,
                                    customLink: item.gtvb_custom_link || ''
                                }));

                                setAttributes({ images: formattedImages });
                            }}
                            allowedTypes={['image']}
                            multiple={true}
                            gallery={true}
                            value={images ? images.map(img => img.id) : []}
                            render={({ open }) => (
                                <ToolbarButton
                                    className="components-toolbar__control"
                                    label={__('Edit Logos', 'awesome-logo-carousel-block')}
                                    onClick={open}
                                >
                                    {images && images.length > 0
                                        ? __('Change Logos', 'gutenbergnative-blocks')
                                        : __('Add Logos', 'gutenbergnative-blocks')}
                                </ToolbarButton>
                            )}
                        />
                    </ToolbarGroup>
                </BlockControls>
            )}
            {isSelected && <Inspect {...props} />}
            <DynamicStyle {...props} />
            <div
                {...useBlockProps({
                    className: classnames(sliderId, {
                        alcb__active_pagination: showPagination
                    })
                })}
            >
                <div className="alcb__carousel_container swiper" ref={sliderRef}>
                    <div className="swiper-wrapper">
                        {images && images.length > 0 ? (
                            <>
                                {images.map((logo, index) => {
                                    return (
                                        <DynamicTag
                                            tagName={enableLink ? 'a' : 'div'}
                                            className={classnames('swiper-slide alcb__logo-item')}
                                            style={{
                                                border: ` ${borderWidth} ${borderStyle} ${borderColor}`,
                                                borderRadius: `${borderRadius}px`
                                            }}
                                            key={index}
                                            {...(enableLink && linkType !== 'logo-based' && logoLinks[index]
                                                ? {
                                                      href: logoLinks[index],
                                                      ...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})
                                                  }
                                                : {})}
                                            {...(enableLink && linkType === 'logo-based'
                                                ? {
                                                      href: logo?.customLink,
                                                      ...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})
                                                  }
                                                : {})}
                                        >
                                            <div className={`alcb__logo-image  alcb__${logoHoverStyle}`}>
                                                <img src={logo.url} alt={logo.alt} id={logo.id} />
                                            </div>
                                            {showCaption && (
                                                <div
                                                    className={`alcb__logo-caption ${captionVisibility}`}
                                                    style={{
                                                        color: captionColor,
                                                        backgroundColor: captionBg
                                                    }}
                                                >
                                                    {logo.caption
                                                        ? logo.caption
                                                        : __('No Caption Available', 'awesome-logo-carousel-block')}
                                                </div>
                                            )}
                                        </DynamicTag>
                                    );
                                })}
                            </>
                        ) : (
                            <MediaPlaceholder
                                multiple={true}
                                gallery={true}
                                onSelect={media =>
                                    setAttributes({
                                        images: media,
                                        slideStatus: !slideStatus
                                    })
                                }
                                onFilesPreUpload={media =>
                                    setAttributes({
                                        images: Array.from(media),
                                        slideStatus: !slideStatus
                                    })
                                }
                                onSelectURL={false}
                                allowedTypes={['image']}
                                labels={{
                                    title: __('Add Logos', 'awesome-logo-carousel-block')
                                }}
                            />
                        )}
                    </div>
                </div>
                {showPagination && <div className="alcb__pag swiper-pagination"></div>}
                {showNav && (
                    <div
                        className={classnames('navigation', {
                            [navPosition]: navPosition !== '',
                            'nav-pos': navPosition !== ''
                        })}
                    >
                        {customNavigation ? (
                            <>
                                <div className="alcb__prev custom-nav swiper-button-prev">
                                    {prevNav?.url && <img src={prevNav.url} alt={prevNav.alt} id={prevNav.id} />}
                                </div>
                                <div className="alcb__next custom-nav swiper-button-next">
                                    {nextNav?.url && <img src={nextNav.url} alt={nextNav.alt} id={nextNav.id} />}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="alcb__prev swiper-button-prev"></div>
                                <div className="alcb__next swiper-button-next"></div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </Fragment>
    );
}
