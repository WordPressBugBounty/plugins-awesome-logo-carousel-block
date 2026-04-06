import { useEffect } from '@wordpress/element';
const { generateBgStyles, generateResBoxStyles, generateBorderStyles, generateRangeStyles } = window?.alcbModules;
const { softMinifyCssStrings, styleGenerator } = window?.alcbModules?.Helpers;

import {
    ACTIVE_PAGI_HEIGHT,
    // pagination
    ACTIVE_PAGI_WIDTH,
    INACRIVE_PAGI_WIDTH,
    INACTIVE_PAGI_HEIGHT,
    ITEM_PADDING,
    LOGO_BG,
    LOGO_MWIDTH,
    LOGO_PADDING,
    NAV_BG,
    NAV_BORDER,
    NAV_BRADIUS,
    NAV_HEIGHT,
    NAV_HOVER_BG,
    NAV_ICON_SIZE,
    NAV_MARGIN,
    NAV_WIDTH,
    PAGI_BORDER,
    PAGI_BRADIUS,
    PAGI_MARGIN
} from './constants';

const DynamicStyle = ({ attributes, setAttributes }) => {
    const { sliderId, blockStyle, iconColor, iconHoverColor, pagiColor } = attributes;

    // max-width
    const {
        deskStyle: logoMaxWidthDesk,
        tabStyle: logoMaxWidthTab,
        mobStyle: logoMaxWidthMob
    } = generateRangeStyles({
        controlName: LOGO_MWIDTH,
        attributes,
        propertyName: 'max-width'
    });

    // item
    const {
        boxDeskStyles: itemDeskPadding,
        boxTabStyles: itemTabPadding,
        boxMobStyles: itemMobPadding
    } = generateResBoxStyles({
        controlName: ITEM_PADDING,
        propertyName: 'padding',
        attributes
    });

    const { bgStyle: logoBg } = generateBgStyles({
        controlName: LOGO_BG,
        attributes
    });
    const { bgStyle: navBg } = generateBgStyles({
        controlName: NAV_BG,
        attributes
    });
    const { bgStyle: navHoverBg } = generateBgStyles({
        controlName: NAV_HOVER_BG,
        attributes
    });

    const {
        boxDeskStyles: logoPaddingDeskStyles,
        boxTabStyles: logoPaddingTabStyles,
        boxMobStyles: logoPaddingMobStyles
    } = generateResBoxStyles({
        controlName: LOGO_PADDING,
        propertyName: 'padding',
        attributes
    });
    // navigation
    const {
        boxDeskStyles: navDeskMargin,
        boxTabStyles: navTabMargin,
        boxMobStyles: navMobMargin
    } = generateResBoxStyles({
        controlName: NAV_MARGIN,
        attributes,
        propertyName: 'margin'
    });

    const {
        desktopStyles: navBorderDeskStyle,
        tabletStyles: navBorderTabStyle,
        mobileStyles: navBorderMobStyle,
        hoverColor: navBorderHoverColor
    } = generateBorderStyles({
        controlName: NAV_BORDER,
        attributes
    });

    const {
        boxDeskStyles: navBradiusDeskStyles,
        boxTabStyles: navBradiusTabStyles,
        boxMobStyles: navBradiusMobStyles
    } = generateResBoxStyles({
        controlName: NAV_BRADIUS,
        attributes,
        propertyName: 'border-radius',
        forRadius: true
    });

    const {
        deskStyle: navDeskHeight,
        tabStyle: navTabHeight,
        mobStyle: navMobHeight
    } = generateRangeStyles({
        controlName: NAV_HEIGHT,
        attributes,
        propertyName: 'height'
    });

    const {
        deskStyle: navDeskWidth,
        tabStyle: navTabWidth,
        mobStyle: navMobWidth
    } = generateRangeStyles({
        controlName: NAV_WIDTH,
        attributes,
        propertyName: 'width'
    });

    const {
        deskStyle: navIconDeskSize,
        tabStyle: navIconTabSize,
        mobStyle: navIconMobSize
    } = generateRangeStyles({
        controlName: NAV_ICON_SIZE,
        attributes,
        propertyName: 'font-size'
    });

    const {
        deskStyle: navCustomIconDeskSize,
        tabStyle: navCustomIconTabSize,
        mobStyle: navCustomIconMobSize
    } = generateRangeStyles({
        controlName: NAV_ICON_SIZE,
        attributes,
        propertyName: 'width'
    });

    const {
        deskStyle: navCustomIconDeskHeight,
        tabStyle: navCustomIconTabHeight,
        mobStyle: navCustomIconMobHeight
    } = generateRangeStyles({
        controlName: NAV_ICON_SIZE,
        attributes,
        propertyName: 'height'
    });
    // pagination
    const {
        boxDeskStyles: pagiDeskMargin,
        boxTabStyles: pagiTabMargin,
        boxMobStyles: pagiMobMargin
    } = generateResBoxStyles({
        controlName: PAGI_MARGIN,
        attributes,
        propertyName: 'margin'
    });
    const {
        boxDeskStyles: pagiBradiusDeskStyles,
        boxTabStyles: pagiBradiusTabStyles,
        boxMobStyles: pagiBradiusMobStyles
    } = generateResBoxStyles({
        controlName: PAGI_BRADIUS,
        attributes,
        propertyName: 'border-radius',
        forRadius: true
    });
    const {
        deskStyle: activepagiDeskWidth,
        tabStyle: activepagiTabWidth,
        mobStyle: activepagiMobWidth
    } = generateRangeStyles({
        controlName: ACTIVE_PAGI_WIDTH,
        attributes,
        propertyName: 'width'
    });

    const {
        deskStyle: activepagiDeskHeight,
        tabStyle: activepagiTabHeight,
        mobStyle: activepagiMobHeight
    } = generateRangeStyles({
        controlName: ACTIVE_PAGI_HEIGHT,
        attributes,
        propertyName: 'height'
    });
    const {
        deskStyle: inactivepagiDeskWidth,
        tabStyle: inactivepagiTabWidth,
        mobStyle: inactivepagiMobWidth
    } = generateRangeStyles({
        controlName: INACRIVE_PAGI_WIDTH,
        attributes,
        propertyName: 'width'
    });
    const {
        deskStyle: inactivepagiDeskHeight,
        tabStyle: inactivepagiTabHeight,
        mobStyle: inactivepagiMobHeight
    } = generateRangeStyles({
        controlName: INACTIVE_PAGI_HEIGHT,
        attributes,
        propertyName: 'height'
    });
    const {
        desktopStyles: pagiBorderDeskStyle,
        tabletStyles: pagiBorderTabStyle,
        mobileStyles: pagiBorderMobStyle
    } = generateBorderStyles({
        controlName: PAGI_BORDER,
        attributes
    });

    const deskStyles = `
        ${
            itemDeskPadding
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel`, [
                      {
                          v: itemDeskPadding
                      }
                  ])}`
                : ''
        }
        ${
            logoBg
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__logo-item`, [
                      {
                          v: logoBg
                      }
                  ])}`
                : ''
        }
        ${
            logoPaddingDeskStyles
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__logo-image`, [
                      {
                          v: logoPaddingDeskStyles
                      }
                  ])}`
                : ''
        }
        ${
            logoMaxWidthDesk
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__logo-image img`, [
                      {
                          v: logoMaxWidthDesk
                      }
                  ])}`
                : ''
        }
        ${
            navBg || navBorderDeskStyle || navBradiusDeskStyles || navDeskHeight || navDeskWidth || navDeskMargin
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev`,
                      [
                          {
                              v: navBg
                          },
                          {
                              v: navBorderDeskStyle
                          },
                          {
                              v: navBradiusDeskStyles
                          },
                          {
                              v: navDeskHeight
                          },
                          {
                              v: navDeskWidth
                          },
                          {
                              v: navDeskMargin
                          }
                      ]
                  )}`
                : ''
        }
        ${
            navHoverBg || navBorderHoverColor
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next:hover, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev:hover`,
                      [
                          {
                              v: navHoverBg
                          },
                          {
                              v: navBorderHoverColor
                          }
                      ]
                  )}`
                : ''
        }
        ${
            navIconDeskSize || navCustomIconDeskSize || navCustomIconDeskHeight || iconColor
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next:after, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev:after`,
                      [
                          {
                              v: navIconDeskSize
                          },
                          {
                              v: navCustomIconDeskSize
                          },
                          {
                              v: navCustomIconDeskHeight
                          },
                          { p: 'color', v: iconColor }
                      ]
                  )}`
                : ''
        }
        ${
            iconHoverColor
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next:hover:after, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev:hover:after`,
                      [
                          {
                              p: 'color',
                              v: iconHoverColor
                          }
                      ]
                  )}`
                : ''
        }
        ${
            pagiDeskMargin
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__pag.swiper-pagination`, [
                      {
                          v: pagiDeskMargin
                      }
                  ])}`
                : ''
        }
        ${
            inactivepagiDeskWidth || inactivepagiDeskHeight || pagiBradiusDeskStyles || pagiColor
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet`, [
                      {
                          v: inactivepagiDeskWidth
                      },
                      {
                          v: inactivepagiDeskHeight
                      },
                      {
                          v: pagiBradiusDeskStyles
                      },
                      { p: 'background-color', v: pagiColor }
                  ])}`
                : ''
        }
        ${
            activepagiDeskWidth || activepagiDeskHeight
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet-active`, [
                      {
                          v: activepagiDeskWidth
                      },
                      {
                          v: activepagiDeskHeight
                      }
                  ])}`
                : ''
        }
        ${
            pagiBorderDeskStyle
                ? `.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet,
                   .${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet-active {
                       ${pagiBorderDeskStyle},
                   }`
                : ''
        }
    `;
    const tabStyles = `
        ${
            itemTabPadding
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel`, [
                      {
                          v: itemTabPadding
                      }
                  ])}`
                : ''
        }
        ${
            logoPaddingTabStyles
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__logo-image`, [
                      {
                          v: logoPaddingTabStyles
                      }
                  ])}`
                : ''
        }
        ${
            logoMaxWidthTab
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__logo-image img`, [
                      {
                          v: logoMaxWidthTab
                      }
                  ])}`
                : ''
        }
        ${
            navBorderTabStyle || navBradiusTabStyles || navTabHeight || navTabWidth || navTabMargin
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev`,
                      [
                          {
                              v: navBorderTabStyle
                          },
                          {
                              v: navBradiusTabStyles
                          },
                          {
                              v: navTabHeight
                          },
                          {
                              v: navTabWidth
                          },
                          {
                              v: navTabMargin
                          }
                      ]
                  )}`
                : ''
        }
        ${
            navIconTabSize || navCustomIconTabSize || navCustomIconTabHeight
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next:after, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev:after`,
                      [
                          {
                              v: navIconTabSize
                          },
                          {
                              v: navCustomIconTabSize
                          },
                          {
                              v: navCustomIconTabHeight
                          }
                      ]
                  )}`
                : ''
        }
        ${
            pagiTabMargin
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__pag.swiper-pagination`, [
                      {
                          v: pagiTabMargin
                      }
                  ])}`
                : ''
        }
        ${
            inactivepagiTabWidth || inactivepagiTabHeight || pagiBradiusTabStyles
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet`, [
                      {
                          v: inactivepagiTabWidth
                      },
                      {
                          v: inactivepagiTabHeight
                      },
                      {
                          v: pagiBradiusTabStyles
                      }
                  ])}`
                : ''
        }
        ${
            activepagiTabWidth || activepagiTabHeight
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet-active`, [
                      {
                          v: activepagiTabWidth
                      },
                      {
                          v: activepagiTabHeight
                      }
                  ])}`
                : ''
        }
        ${
            pagiBorderTabStyle
                ? `.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet,
                   .${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet-active {
                       ${pagiBorderTabStyle},
                   }`
                : ''
        }
    `;
    const mobStyles = `
        ${
            itemMobPadding
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel`, [
                      {
                          v: itemMobPadding
                      }
                  ])}`
                : ''
        }
        ${
            logoPaddingMobStyles
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__logo-image`, [
                      {
                          v: logoPaddingMobStyles
                      }
                  ])}`
                : ''
        }
        ${
            logoMaxWidthMob
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__logo-image img`, [
                      {
                          v: logoMaxWidthMob
                      }
                  ])}`
                : ''
        }
        ${
            navBorderMobStyle || navBradiusMobStyles || navMobHeight || navMobWidth || navMobMargin
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev`,
                      [
                          {
                              v: navBorderMobStyle
                          },
                          {
                              v: navBradiusMobStyles
                          },
                          {
                              v: navMobHeight
                          },
                          {
                              v: navMobWidth
                          },
                          {
                              v: navMobMargin
                          }
                      ]
                  )}`
                : ''
        }
        ${
            navIconMobSize || navCustomIconMobSize || navCustomIconMobHeight
                ? `${styleGenerator(
                      `.${sliderId}.wp-block-lcb-logo-carousel .swiper-button-next:after, .${sliderId}.wp-block-lcb-logo-carousel .swiper-button-prev:after`,
                      [
                          {
                              v: navIconMobSize
                          },
                          {
                              v: navCustomIconMobSize
                          },
                          {
                              v: navCustomIconMobHeight
                          }
                      ]
                  )}`
                : ''
        }
        ${
            pagiMobMargin
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .alcb__pag.swiper-pagination`, [
                      {
                          v: pagiMobMargin
                      }
                  ])}`
                : ''
        }
        ${
            inactivepagiMobWidth || inactivepagiMobHeight || pagiBradiusMobStyles
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet`, [
                      {
                          v: inactivepagiMobWidth
                      },
                      {
                          v: inactivepagiMobHeight
                      },
                      {
                          v: pagiBradiusMobStyles
                      }
                  ])}`
                : ''
        }
        ${
            activepagiMobWidth || activepagiMobHeight
                ? `${styleGenerator(`.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet-active`, [
                      {
                          v: activepagiMobWidth
                      },
                      {
                          v: activepagiMobHeight
                      }
                  ])}`
                : ''
        }
        ${
            pagiBorderMobStyle
                ? `.${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet,
                   .${sliderId}.wp-block-lcb-logo-carousel .swiper-pagination-bullet-active {
                       ${pagiBorderMobStyle},
                   }`
                : ''
        }
    `;

    /**
     * Block All Styles
     */
    const blockStyleCss = `
        ${deskStyles.replace(/\s/g, '').length > 0 ? `${deskStyles}` : ''}
        ${
            tabStyles.replace(/\s/g, '').length > 0
                ? `@media (max-width: 1024px) {
                    ${tabStyles}
                }`
                : ''
        }
        ${
            mobStyles.replace(/\s/g, '').length > 0
                ? `@media (max-width: 767px) {
                    ${mobStyles}
                }`
                : ''
        }
    `;

    // Set Block Styles
    useEffect(() => {
        if (JSON.stringify(blockStyle) !== JSON.stringify(blockStyleCss)) {
            setAttributes({ blockStyle: softMinifyCssStrings(blockStyleCss) });
        }
    }, [blockStyleCss, blockStyle, setAttributes]);

    return <style>{`${softMinifyCssStrings(blockStyleCss)}`}</style>;
};

export default DynamicStyle;
