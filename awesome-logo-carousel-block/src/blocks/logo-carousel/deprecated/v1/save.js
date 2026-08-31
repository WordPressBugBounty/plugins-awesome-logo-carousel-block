/**
 * DEPRECATION v1 — frozen snapshot of the `lcb/logo-carousel` save output as of 2.2.4.
 *
 * DO NOT EDIT, REFORMAT, OR "TIDY" THIS FILE.
 *
 * Every character here is load-bearing: the double space in
 * `alcb__logo-image  alcb__${logoHoverStyle}`, the leading space in the inline
 * `border:` value, and the camelCase `data-*` props that React lowercases on
 * serialization. Changing any of them breaks validation for content saved by
 * 2.2.4 and earlier, which is the exact failure this file exists to prevent.
 *
 * It is intentionally self-contained — no imports from `window.alcbModules`,
 * no shared generators, no shared constants. A deprecation that depends on a
 * global is a deprecation that can throw during validation.
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
