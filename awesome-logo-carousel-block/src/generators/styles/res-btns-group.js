import { PREFIX } from '../../constants';

const generateResBtnsGroupStyle = ({ controlName, attributes }) => {
    const {
        [`${PREFIX}${controlName}Desk`]: deskValue,
        [`${PREFIX}${controlName}Tab`]: tabValue,
        [`${PREFIX}${controlName}Mob`]: mobValue
    } = attributes;

    const deskStyle = deskValue !== undefined && deskValue !== '' ? deskValue : '';

    const tabStyle = tabValue !== undefined && tabValue !== '' ? tabValue : '';

    const mobStyle = mobValue !== undefined && mobValue !== '' ? mobValue : '';

    return {
        deskStyle,
        tabStyle,
        mobStyle
    };
};

export default generateResBtnsGroupStyle;
