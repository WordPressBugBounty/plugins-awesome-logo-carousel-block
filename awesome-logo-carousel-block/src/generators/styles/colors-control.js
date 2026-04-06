import { PREFIX } from '../../constants';

const generateColorsStyles = ({ controlName, attributes }) => {
    const { [`${PREFIX}${controlName}Colors`]: colors } = attributes;
    const { normal, hover } = colors;

    return {
        normal,
        hover
    };
};

export default generateColorsStyles;
