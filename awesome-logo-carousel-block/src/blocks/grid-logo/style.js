import { useEffect } from '@wordpress/element';
const {
    generateBgStyles,
    generateResBoxStyles,
    generateBorderStyles,
    generateRangeStyles,
    generateTypographyStyles,
    generateAlignmentStyles
} = window?.alcbModules;
const { softMinifyCssStrings, styleGenerator } = window?.alcbModules?.Helpers;

import {
    ALIGN,
    // caption
    CAPTION_MARGIN,
    CAPTION_TITLE_TYPO,
    CONTENT_BG,
    CONTENT_BORDER,
    CONTENT_BRADIUS,
    CONTENT_PADDING,
    DESC_MARGIN,
    DESC_TITLE_TYPO,
    GAP,
    // grid
    GRID_COL,
    GRID_GAP,
    // logo style
    LOGO_BORDER,
    LOGO_BRADIUS,
    LOGO_HOVER_BG,
    LOGO_PADDING,
    LOGO_SIZE,
    VALIGN
} from './constants';

const DynamicStyle = ({ attributes, setAttributes }) => {
    const { sliderId, blockStyle, captionTitleColor, descColor } = attributes;
    // grid
    const {
        deskStyle: gridColDeskStyle,
        tabStyle: gridColTabStyle,
        mobStyle: gridColMobStyle
    } = generateRangeStyles({
        controlName: GRID_COL,
        attributes,
        noProperty: true,
        noUnits: true
    });

    const {
        deskStyle: gridGapDeskStyle,
        tabStyle: gridGapTabStyle,
        mobStyle: gridGapMobStyle
    } = generateRangeStyles({
        controlName: GRID_GAP,
        attributes,
        propertyName: 'gap'
    });

    // logo style
    const {
        desktopStyles: logoBorderDeskStyle,
        tabletStyles: logoBorderTabStyle,
        mobileStyles: logoBorderMobStyle
    } = generateBorderStyles({
        controlName: LOGO_BORDER,
        attributes
    });

    const {
        boxDeskStyles: logoBradiusDeskStyles,
        boxTabStyles: logoBradiusTabStyles,
        boxMobStyles: logoBradiusMobStyles
    } = generateResBoxStyles({
        controlName: LOGO_BRADIUS,
        attributes,
        propertyName: 'border-radius',
        forRadius: true
    });

    const {
        boxDeskStyles: logoPaddingDeskStyles,
        boxTabStyles: logoPaddingTabStyles,
        boxMobStyles: logoPaddingMob
    } = generateResBoxStyles({
        controlName: LOGO_PADDING,
        attributes,
        propertyName: 'padding'
    });

    const { bgStyle: logoHoverBg } = generateBgStyles({
        controlName: LOGO_HOVER_BG,
        attributes
    });

    const {
        deskStyle: deskWidth,
        tabStyle: tabWidth,
        mobStyle: mobWidth
    } = generateRangeStyles({
        controlName: LOGO_SIZE,
        attributes,
        propertyName: 'width'
    });

    // caption
    const {
        boxDeskStyles: captionMarginDeskStyles,
        boxTabStyles: captionMarginTabStyles,
        boxMobStyles: captionMarginMobStyles
    } = generateResBoxStyles({
        controlName: CAPTION_MARGIN,
        attributes,
        propertyName: 'margin'
    });

    const {
        desktopStyles: captionDeskTypo,
        tabletStyles: captionTabTypo,
        mobileStyles: captionMobTypo
    } = generateTypographyStyles({
        controlName: CAPTION_TITLE_TYPO,
        attributes
    });

    // desc
    const {
        boxDeskStyles: descMarginDeskStyles,
        boxTabStyles: descMarginTabStyles,
        boxMobStyles: descMarginMobStyles
    } = generateResBoxStyles({
        controlName: DESC_MARGIN,
        attributes,
        propertyName: 'margin'
    });

    const {
        desktopStyles: descDeskTypo,
        tabletStyles: descTabTypo,
        mobileStyles: descMobTypo
    } = generateTypographyStyles({
        controlName: DESC_TITLE_TYPO,
        attributes
    });

    // content
    const {
        desktopStyles: contentBorderDeskStyle,
        tabletStyles: contentBorderTabStyle,
        mobileStyles: contentBorderMobStyle
    } = generateBorderStyles({
        controlName: CONTENT_BORDER,
        attributes
    });

    const {
        boxDeskStyles: contentBradiusDeskStyles,
        boxTabStyles: contentBradiusTabStyles,
        boxMobStyles: contentBradiusMobStyles
    } = generateResBoxStyles({
        controlName: CONTENT_BRADIUS,
        attributes,
        propertyName: 'border-radius',
        forRadius: true
    });

    const {
        boxDeskStyles: contentDeskPadding,
        boxTabStyles: contentTabPadding,
        boxMobStyles: contentMobPadding
    } = generateResBoxStyles({
        controlName: CONTENT_PADDING,
        attributes,
        propertyName: 'padding'
    });

    const { bgStyle: contentbg } = generateBgStyles({
        controlName: CONTENT_BG,
        attributes
    });

    const {
        deskAlign: contentDeskAlign,
        tabAlign: contentTabAlign,
        mobAlign: contentMobAlign
    } = generateAlignmentStyles({
        controlName: ALIGN,
        attributes,
        propertyName: 'text-align'
    });

    // flex
    const {
        deskStyle: deskGap,
        tabStyle: tabGap,
        mobStyle: mobGap
    } = generateRangeStyles({
        controlName: GAP,
        attributes,
        propertyName: 'gap'
    });

    const {
        deskAlign: vDeskAlign,
        tabAlign: vTabAlign,
        mobAlign: vMobAlign
    } = generateAlignmentStyles({
        controlName: VALIGN,
        attributes,
        propertyName: 'align-items'
    });

    const deskStyles = `
        ${
            gridColDeskStyle || gridGapDeskStyle
                ? styleGenerator(`.${sliderId} .gallery-inner`, [
                      {
                          p: 'grid-template-columns',
                          v: `repeat(${gridColDeskStyle}, 1fr)`
                      },
                      {
                          v: gridGapDeskStyle
                      }
                  ])
                : ''
        }
        ${
            logoBorderDeskStyle || logoBradiusDeskStyles || logoPaddingDeskStyles || logoHoverBg || deskGap || vDeskAlign
                ? styleGenerator(`.${sliderId} .logo-wrapper`, [
                      {
                          v: logoBorderDeskStyle
                      },
                      {
                          v: logoBradiusDeskStyles
                      },
                      {
                          v: logoPaddingDeskStyles
                      },
                      {
                          v: logoHoverBg
                      },
                      {
                          v: deskGap
                      },
                      {
                          v: vDeskAlign
                      }
                  ])
                : ''
        }
        ${
            deskGap || vDeskAlign
                ? styleGenerator(`.${sliderId}.wp-block-lcb-grid-logo .logo-wrapper.flex`, [
                      {
                          v: deskGap
                      },
                      {
                          v: vDeskAlign
                      }
                  ])
                : ''
        }
        ${
            contentDeskAlign || contentDeskPadding
                ? styleGenerator(`.${sliderId}.wp-block-lcb-grid-logo .logo-content`, [
                      {
                          v: contentDeskAlign
                      },
                      {
                          v: contentDeskPadding
                      }
                  ])
                : ''
        }
        ${
            captionTitleColor || captionMarginDeskStyles || captionDeskTypo
                ? styleGenerator(`.${sliderId} .alcb__logo-caption `, [
                      {
                          p: 'color',
                          v: captionTitleColor
                      },
                      {
                          v: captionMarginDeskStyles
                      },
                      {
                          v: captionDeskTypo
                      }
                  ])
                : ''
        }
        ${
            descColor || descMarginDeskStyles || descDeskTypo
                ? styleGenerator(`.${sliderId} .alcb__logo-description `, [
                      {
                          p: 'color',
                          v: descColor
                      },
                      {
                          v: descMarginDeskStyles
                      },
                      {
                          v: descDeskTypo
                      }
                  ])
                : ''
        }
        ${
            contentBorderDeskStyle || contentBradiusDeskStyles || contentbg
                ? styleGenerator(`.${sliderId} .logo-content `, [
                      {
                          v: contentBorderDeskStyle
                      },
                      {
                          v: contentBradiusDeskStyles
                      },
                      {
                          v: contentbg
                      }
                  ])
                : ''
        }
        ${
            deskWidth
                ? styleGenerator(`.${sliderId}.wp-block-lcb-grid-logo .logo-img`, [
                      {
                          v: deskWidth
                      }
                  ])
                : ''
        }
    `;
    const tabStyles = `
        ${
            gridColTabStyle || gridGapTabStyle
                ? styleGenerator(`.${sliderId} .gallery-inner`, [
                      {
                          p: 'grid-template-columns',
                          v: `repeat(${gridColTabStyle}, 1fr)`
                      },
                      {
                          v: gridGapTabStyle
                      }
                  ])
                : ''
        }
        ${
            logoBorderTabStyle || logoBradiusTabStyles || logoPaddingTabStyles
                ? styleGenerator(`.${sliderId} .logo-wrapper`, [
                      {
                          v: logoBorderTabStyle
                      },
                      {
                          v: logoBradiusTabStyles
                      },
                      {
                          v: logoPaddingTabStyles
                      }
                  ])
                : ''
        }
        ${
            tabGap || vTabAlign
                ? styleGenerator(`.${sliderId}.wp-block-lcb-grid-logo .logo-wrapper.flex`, [
                      {
                          v: tabGap
                      },
                      {
                          v: vTabAlign
                      }
                  ])
                : ''
        }
        ${
            contentTabAlign || contentTabPadding
                ? styleGenerator(`.${sliderId}.wp-block-lcb-grid-logo .logo-content`, [
                      {
                          v: contentTabAlign
                      },
                      {
                          v: contentTabPadding
                      }
                  ])
                : ''
        }
        ${
            captionMarginTabStyles || captionTabTypo
                ? styleGenerator(`.${sliderId} .alcb__logo-caption `, [
                      {
                          v: captionMarginTabStyles
                      },
                      {
                          v: captionTabTypo
                      }
                  ])
                : ''
        }
        ${
            descMarginTabStyles || descTabTypo
                ? styleGenerator(`.${sliderId} .alcb__logo-description `, [
                      {
                          v: descMarginTabStyles
                      },
                      {
                          v: descTabTypo
                      }
                  ])
                : ''
        }
        ${
            contentBorderTabStyle || contentBradiusTabStyles
                ? styleGenerator(`.${sliderId} .logo-content `, [
                      {
                          v: contentBorderTabStyle
                      },
                      {
                          v: contentBradiusTabStyles
                      }
                  ])
                : ''
        }
    `;
    const mobStyles = `
        ${
            gridColMobStyle || gridGapMobStyle
                ? styleGenerator(`.${sliderId} .gallery-inner`, [
                      {
                          p: 'grid-template-columns',
                          v: `repeat(${gridColMobStyle}, 1fr)`
                      },
                      {
                          v: gridGapMobStyle
                      }
                  ])
                : ''
        }
        ${
            logoBorderMobStyle || logoBradiusMobStyles || logoPaddingMob
                ? styleGenerator(`.${sliderId} .logo-wrapper`, [
                      {
                          v: logoBorderMobStyle
                      },
                      {
                          v: logoBradiusMobStyles
                      },
                      {
                          v: logoPaddingMob
                      }
                  ])
                : ''
        }
         ${
             mobGap || vMobAlign
                 ? styleGenerator(`.${sliderId}.wp-block-lcb-grid-logo .logo-wrapper.flex`, [
                       {
                           v: mobGap
                       },
                       {
                           v: vMobAlign
                       }
                   ])
                 : ''
         }
        ${
            contentMobAlign || contentMobPadding
                ? styleGenerator(`.${sliderId}.wp-block-lcb-grid-logo .logo-content`, [
                      {
                          v: contentMobAlign
                      },
                      {
                          v: contentMobPadding
                      }
                  ])
                : ''
        }
        ${
            captionMarginMobStyles || captionMobTypo
                ? styleGenerator(`.${sliderId} .alcb__logo-caption `, [
                      {
                          v: captionMarginMobStyles
                      },
                      {
                          v: captionMobTypo
                      }
                  ])
                : ''
        }
        ${
            descMarginMobStyles || descMobTypo
                ? styleGenerator(`.${sliderId} .alcb__logo-description `, [
                      {
                          v: descMarginMobStyles
                      },
                      {
                          v: descMobTypo
                      }
                  ])
                : ''
        }
        ${
            contentBorderMobStyle || contentBradiusMobStyles
                ? styleGenerator(`.${sliderId} .logo-content `, [
                      {
                          v: contentBorderMobStyle
                      },
                      {
                          v: contentBradiusMobStyles
                      }
                  ])
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
