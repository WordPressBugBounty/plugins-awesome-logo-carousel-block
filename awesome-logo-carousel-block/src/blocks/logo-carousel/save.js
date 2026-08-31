/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';
const { DynamicTag } = window?.alcbModules || {};

export default function Save({ attributes }) {
    const {
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
        // links
        enableLink,
        openInNewTab,
        logoLinks,
        navPosition,
        customNavigation,
        prevNav,
        nextNav,
        paginationType,
        linkType
    } = attributes;

    return (
        <div
            {...useBlockProps.save({
                className: classnames({
                    alcb__active_pagination: showPagination
                })
            })}
        >
            <div
                dir={slideDirection}
                className={`alcb__carousel_container swiper`}
                data-desktop={deskItemsPerView || 4}
                data-tablet={tabItemsPerView || 2}
                data-mobile={phoneItemsPerView || 1}
                data-autoplay={autoplay}
                data-autoplayDelay={autoplayDelay}
                data-autoplayDirection={reverseAutoplayDirection}
                data-speed={speed}
                data-loop={loop}
                data-pauseonhover={pauseOnHover}
                data-keyboard={keyboard}
                data-mousewheel={mousewheel}
                data-autoheight={autoHeight}
                data-deskSpace={deskSpace || 30}
                data-tabSpace={tabSpace || 20}
                data-phoneSpace={phoneSpace || 0}
                data-id={sliderId}
                data-pagination={showPagination}
                data-navigation={showNav}
                id={sliderId}
                {...(paginationType &&
                    paginationType !== 'bullets' && {
                        'data-paginationType': paginationType
                    })}
                {...(deskRows && {
                    'data-deskrows': deskRows
                })}
                {...(tabRows && {
                    'data-tabrows': tabRows
                })}
                {...(phoneRows && {
                    'data-phonerows': phoneRows
                })}
            >
                <div className="swiper-wrapper">
                    {images &&
                        Array.isArray(images) &&
                        images.map((logo, index) => {
                            return (
                                <DynamicTag
                                    key={logo.id}
                                    tagName={enableLink ? 'a' : 'div'}
                                    className={classnames('swiper-slide alcb__logo-item')}
                                    style={{
                                        border: ` ${borderWidth} ${borderStyle} ${borderColor}`,
                                        borderRadius: `${borderRadius}px`
                                    }}
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
                                            {logo.caption ? logo.caption : __('No Caption Available', 'awesome-logo-carousel-block')}
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
        </div>
    );
}
