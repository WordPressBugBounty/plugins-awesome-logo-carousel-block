/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
import { BlockControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import PatternsModal from '../pattern';
import BlockPlaceholder from '../../controls/block-placeholder';
import blockIcon from './icon';
import classnames from 'classnames';
import { useSelect } from '@wordpress/data';
import { BREAKPOINTS } from '../../constants/breakpoints';

const { handleUniqueId } = window?.alcbModules?.Helpers || {};
const { DynamicTag, generateRangeStyles } = window?.alcbModules || {};

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
        deskItemsPerView,
        tabItemsPerView,
        phoneItemsPerView,
        deskSpace,
        tabSpace,
        phoneSpace,
        deskRows,
        tabRows,
        phoneRows,
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
        linkType,
        patternMode,
        openModal
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

    // Slider breakpoints — shared with the frontend so the preview matches.
    const breakPoints = {
        breakpoints: {
            [BREAKPOINTS.mobile]: {
                slidesPerView: phoneItemsPerView || 1,
                spaceBetween: parseInt(phoneSpace) || 0,
                grid: {
                    // Was `mobRows`, which is not a registered attribute, so it
                    // was always undefined and mobile rows never previewed.
                    rows: phoneRows || 1,
                    fill: 'row'
                }
            },
            [BREAKPOINTS.tablet]: {
                slidesPerView: tabItemsPerView || 2,
                spaceBetween: parseInt(tabSpace) || 20,
                grid: {
                    rows: tabRows || 1,
                    fill: 'row'
                }
            },
            [BREAKPOINTS.desktop]: {
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
    /*
     * KNOWN ISSUE: with multiple rows and loop both enabled, Swiper's Grid
     * module throws "Cannot read properties of undefined (reading 'column')"
     * from loopFix() in the editor preview. Grid does not support loop mode.
     *
     * It surfaces here only because the mobile rows fix above made rows take
     * effect at all — the preview previously read `mobRows`, which is not a
     * registered attribute, so rows were always 1. Confirmed by A/B: restoring
     * the old undefined value silences it, reinstating the fix brings it back.
     *
     * Left as-is deliberately. It is confined to the editor preview: the
     * frontend runs clean, saved content is unaffected, and no block is
     * invalidated. Suppressing it by disabling loop was tried and did not stop
     * the exception, so that change was reverted rather than shipped as a
     * behavioural difference that fixes nothing.
     */
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
        deskItemsPerView,
        tabItemsPerView,
        phoneItemsPerView,
        deskSpace,
        tabSpace,
        phoneSpace,
        sliderRef,
        slideStatus,
        deskRows,
        tabRows,
        phoneRows,
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

                /*
                 * Merge onto the existing image rather than rebuilding it.
                 *
                 * This used to return a fresh object containing only id, url,
                 * alt and customLink, which silently dropped `caption` and
                 * `sizes`. Because the effect below writes the result straight
                 * back with setAttributes, simply opening and saving a post was
                 * enough to lose every caption — save.js then rendered the
                 * literal string "No Caption Available" under each logo.
                 *
                 * The REST field is `alcb_custom_link`; it was previously read
                 * as `gtvb_custom_link`, which is a field this plugin never
                 * registers. That always resolved to '', which is what kept the
                 * data loss above mostly dormant — so the two fixes have to
                 * land together or fixing the field name would trigger it.
                 */
                return media ? { ...image, customLink: media.alcb_custom_link || '' } : image;
            });
        },
        [images]
    );

    // Update attributes when custom links are fetched
    useEffect(() => {
        if (mediaData && mediaData.length > 0) {
            // Check if any custom links have changed. Images saved before the
            // link feature existed have no `customLink` key at all, so compare
            // against '' rather than undefined — otherwise every such post is
            // marked dirty the moment it is opened.
            const hasChanges = mediaData.some((newImage, index) => {
                const oldImage = images[index];
                return oldImage && (oldImage.customLink || '') !== (newImage.customLink || '');
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
                                    // Registered in plugin.php as the REST field
                                    // `alcb_custom_link` (meta `_alcb_custom_link`).
                                    customLink: item.alcb_custom_link || ''
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
                                        ? __('Change Logos', 'awesome-logo-carousel-block')
                                        : __('Add Logos', 'awesome-logo-carousel-block')}
                                </ToolbarButton>
                            )}
                        />
                    </ToolbarGroup>
                </BlockControls>
            )}
            {isSelected && <Inspect {...props} />}
            <DynamicStyle {...props} />
            {openModal && <PatternsModal {...props} />}
            <div
                {...useBlockProps({
                    className: classnames(sliderId, {
                        alcb__active_pagination: showPagination
                    })
                })}
            >
                {patternMode && (!images || images.length === 0) && (
                    <BlockPlaceholder
                        icon={blockIcon}
                        title={__('Logo Carousel', 'awesome-logo-carousel-block')}
                        description={__(
                            'Showcase client and partner logos in a sliding carousel. Start from a ready-made layout, or add your own logos straight away.',
                            'awesome-logo-carousel-block'
                        )}
                        primaryLabel={__('Choose a pattern', 'awesome-logo-carousel-block')}
                        onPrimary={() => setAttributes({ openModal: true })}
                        secondaryLabel={__('Add logos manually', 'awesome-logo-carousel-block')}
                        onSecondary={() => setAttributes({ patternMode: false, openModal: false })}
                        footnote={__('You can change the layout and styling at any time.', 'awesome-logo-carousel-block')}
                    />
                )}

                {!patternMode && (!images || images.length === 0) && (
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

                {images && images.length > 0 && (
                    <>
                        <div className="alcb__carousel_container swiper" ref={sliderRef}>
                            <div className="swiper-wrapper">
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
                    </>
                )}
            </div>
        </Fragment>
    );
}
