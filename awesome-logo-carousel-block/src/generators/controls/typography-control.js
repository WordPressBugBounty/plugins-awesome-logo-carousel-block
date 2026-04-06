import { PREFIX } from '../../constants';

const generateTypographyAttributes = ({ controlName }) => {
    return {
        [`${PREFIX}${controlName}FontFamily`]: {
            type: 'string'
        },
        [`${PREFIX}${controlName}FontWeight`]: {
            type: 'object'
        },
        [`${PREFIX}${controlName}FontStyle`]: {
            type: 'string'
        },
        [`${PREFIX}${controlName}TextTransform`]: {
            type: 'string'
        },
        [`${PREFIX}${controlName}TextDecoration`]: {
            type: 'string'
        },
        [`${PREFIX}${controlName}FontSizes`]: {
            type: 'object',
            default: {
                desk: {
                    type: 'number'
                },
                tab: {
                    type: 'number'
                },
                mob: {
                    type: 'number'
                }
            }
        },
        [`${PREFIX}${controlName}LineHeights`]: {
            type: 'object',
            default: {
                desk: {
                    type: 'number'
                },
                tab: {
                    type: 'number'
                },
                mob: {
                    type: 'number'
                }
            }
        },
        [`${PREFIX}${controlName}LetterSpacings`]: {
            type: 'object',
            default: {
                desk: {
                    type: 'number'
                },
                tab: {
                    type: 'number'
                },
                mob: {
                    type: 'number'
                }
            }
        },
        [`${PREFIX}${controlName}FontSizeUnits`]: {
            type: 'object',
            default: {
                desk: 'px',
                tab: 'px',
                mob: 'px'
            }
        },
        [`${PREFIX}${controlName}LineHeightUnits`]: {
            type: 'object',
            default: {
                desk: 'px',
                tab: 'px',
                mob: 'px'
            }
        },
        [`${PREFIX}${controlName}LetterSpacingUnits`]: {
            type: 'object',
            default: {
                desk: 'px',
                tab: 'px',
                mob: 'px'
            }
        }
    };
};

export default generateTypographyAttributes;
