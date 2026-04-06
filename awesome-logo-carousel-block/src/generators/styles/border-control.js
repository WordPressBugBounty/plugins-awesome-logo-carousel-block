import { PREFIX } from '../../constants';

const generateBorderStyles = ({ controlName, attributes }) => {
    const {
        [`${PREFIX}${controlName}Style`]: style,
        [`${PREFIX}${controlName}Colors`]: colors,
        [`${PREFIX}${controlName}Values`]: deskValues,
        [`${PREFIX}${controlName}TabValues`]: tabValues,
        [`${PREFIX}${controlName}MobValues`]: mobValues,
        [`${PREFIX}${controlName}Units`]: units,
        [`${PREFIX}${controlName}IsLinked`]: isLinked
    } = attributes;

    let borderDeskStyles = '';
    let borderTabStyles = '';
    let borderMobStyles = '';

    if (isLinked) {
        borderDeskStyles =
            deskValues?.top !== undefined && deskValues?.top !== '' && isNaN(deskValues?.top) === false
                ? `
            border-width: ${deskValues?.top}${units.desk}; 
            border-style: ${style};
        `
                : '';
    } else {
        borderDeskStyles = `
            ${
                deskValues && deskValues.top !== undefined && deskValues.top !== '' && isNaN(deskValues.top) === false
                    ? `border-top-width: ${deskValues.top}${units.desk}; border-top-style: ${style};`
                    : ''
            }
            ${
                deskValues && deskValues.right !== undefined && deskValues.right !== '' && isNaN(deskValues.right) === false
                    ? `border-right-width: ${deskValues.right}${units.desk}; border-right-style: ${style};`
                    : ''
            }
            ${
                deskValues && deskValues.bottom !== undefined && deskValues.bottom !== '' && isNaN(deskValues.bottom) === false
                    ? `border-bottom-width: ${deskValues.bottom}${units.desk}; border-bottom-style: ${style};`
                    : ''
            }
            ${
                deskValues && deskValues.left !== undefined && deskValues.left !== '' && isNaN(deskValues.left) === false
                    ? `border-left-width: ${deskValues.left}${units.desk}; border-left-style: ${style};`
                    : ''
            }
        `;
    }

    if (isLinked) {
        borderTabStyles =
            tabValues?.top !== undefined && tabValues?.top !== '' && isNaN(tabValues?.top) === false
                ? `
            border-width: ${tabValues?.top}${units.tab};
            border-style: ${style};
        `
                : '';
    } else {
        borderTabStyles = `
            ${
                tabValues && tabValues.top !== undefined && tabValues.top !== '' && isNaN(tabValues.top) === false
                    ? `border-top-width: ${tabValues.top}${units.tab}; border-top-style: ${style};`
                    : ''
            } 
            ${
                tabValues && tabValues.right !== undefined && tabValues.right !== '' && isNaN(tabValues.right) === false
                    ? `border-right-width: ${tabValues.right}${units.tab}; border-right-style: ${style};`
                    : ''
            }
            ${
                tabValues && tabValues.bottom !== undefined && tabValues.bottom !== '' && isNaN(tabValues.bottom) === false
                    ? `border-bottom-width: ${tabValues.bottom}${units.tab}; border-bottom-style: ${style};`
                    : ''
            } 
            ${
                tabValues && tabValues.left !== undefined && tabValues.left !== '' && isNaN(tabValues.left) === false
                    ? `border-left-width: ${tabValues.left}${units.tab}; border-left-style: ${style};`
                    : ''
            }
        `;
    }

    if (isLinked) {
        borderMobStyles =
            mobValues?.top !== undefined && mobValues?.top !== '' && isNaN(mobValues?.top) === false
                ? `
            border-width: ${mobValues?.top}${units.mob};
            border-style: ${style};
        `
                : '';
    } else {
        borderMobStyles = `
            ${
                mobValues && mobValues.top !== undefined && mobValues.top !== '' && isNaN(mobValues.top) === false
                    ? `border-top-width: ${mobValues.top}${units.mob}; border-top-style: ${style};`
                    : ''
            }
            ${
                mobValues && mobValues.right !== undefined && mobValues.right !== '' && isNaN(mobValues.right) === false
                    ? `border-right-width: ${mobValues.right}${units.mob}; border-right-style: ${style};`
                    : ''
            }
            ${
                mobValues && mobValues.bottom !== undefined && mobValues.bottom !== '' && isNaN(mobValues.bottom) === false
                    ? `border-bottom-width: ${mobValues.bottom}${units.mob}; border-bottom-style: ${style};`
                    : ''
            }
            ${
                mobValues && mobValues.left !== undefined && mobValues.left !== '' && isNaN(mobValues.left) === false
                    ? `border-left-width: ${mobValues.left}${units.mob}; border-left-style: ${style};`
                    : ''
            }
        `;
    }

    // Border Color
    const borderColor = colors ? `border-color: ${colors.normal};` : '';
    const borderColorHover = colors ? `border-color: ${colors.hover};` : '';

    let desktopStyles = '';
    let tabletStyles = '';
    let mobileStyles = '';
    let hoverColor = '';

    desktopStyles = borderDeskStyles && borderDeskStyles !== '' ? `${borderColor}${borderDeskStyles}` : '';
    tabletStyles = borderTabStyles && borderTabStyles !== '' ? `${borderColor}${borderTabStyles}` : '';
    mobileStyles = borderMobStyles && borderMobStyles !== '' ? `${borderColor}${borderMobStyles}` : '';
    hoverColor = borderColorHover;

    return {
        desktopStyles,
        tabletStyles,
        mobileStyles,
        hoverColor
    };
};

export default generateBorderStyles;
