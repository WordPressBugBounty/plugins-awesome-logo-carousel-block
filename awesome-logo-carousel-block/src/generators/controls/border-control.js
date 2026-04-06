import { PREFIX } from '../../constants';

const generateBorderAttributes = ({ controlName }) => {
    return {
        [`${PREFIX}${controlName}Style`]: {
            type: 'string',
            default: 'none'
        },
        [`${PREFIX}${controlName}Colors`]: {
            type: 'object',
            default: {
                normal: '',
                hover: ''
            }
        },
        [`${PREFIX}${controlName}Values`]: {
            type: 'object',
            default: {
                top: {
                    type: 'number'
                },
                right: {
                    type: 'number'
                },
                bottom: {
                    type: 'number'
                },
                left: {
                    type: 'number'
                }
            }
        },
        [`${PREFIX}${controlName}TabValues`]: {
            type: 'object',
            default: {
                top: {
                    type: 'number'
                },
                right: {
                    type: 'number'
                },
                bottom: {
                    type: 'number'
                },
                left: {
                    type: 'number'
                }
            }
        },
        [`${PREFIX}${controlName}MobValues`]: {
            type: 'object',
            default: {
                top: {
                    type: 'number'
                },
                right: {
                    type: 'number'
                },
                bottom: {
                    type: 'number'
                },
                left: {
                    type: 'number'
                }
            }
        },
        [`${PREFIX}${controlName}Units`]: {
            type: 'object',
            default: {
                desk: 'px',
                tab: 'px',
                mob: 'px'
            }
        },
        [`${PREFIX}${controlName}IsLinked`]: {
            type: 'boolean',
            default: true
        }
    };
};

export default generateBorderAttributes;
