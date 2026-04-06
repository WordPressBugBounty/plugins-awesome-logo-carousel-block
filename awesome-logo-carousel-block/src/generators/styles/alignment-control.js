import { PREFIX } from '../../constants';

const generateAlignmentStyles = ({ controlName, attributes, propertyName }) => {
    const { [`${PREFIX}${controlName}Aligns`]: aligns } = attributes;

    const deskAlign = aligns && aligns.desk !== undefined && aligns.desk !== '' ? `${propertyName}:${aligns.desk};` : '';
    const tabAlign = aligns && aligns.tab !== undefined && aligns.tab !== '' ? `${propertyName}:${aligns.tab};` : '';
    const mobAlign = aligns && aligns.mob !== undefined && aligns.mob !== '' ? `${propertyName}:${aligns.mob};` : '';

    return {
        deskAlign,
        tabAlign,
        mobAlign
    };
};

export default generateAlignmentStyles;
