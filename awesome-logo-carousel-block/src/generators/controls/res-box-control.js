const generateResBoxControlAttributes = controlName => {
    return {
        [`${controlName}Values`]: {
            type: 'object',
            default: {
                top: '',
                right: '',
                bottom: '',
                left: ''
            }
        },
        [`${controlName}TabValues`]: {
            type: 'object',
            default: {
                top: '',
                right: '',
                bottom: '',
                left: ''
            }
        },
        [`${controlName}MobValues`]: {
            type: 'object',
            default: {
                top: '',
                right: '',
                bottom: '',
                left: ''
            }
        },
        [`${controlName}Units`]: {
            type: 'object',
            default: {
                desktop: 'px',
                tablet: 'px',
                mobile: 'px'
            }
        },
        [`${controlName}IsLinked`]: {
            type: 'boolean',
            default: true
        }
    };
};
export default generateResBoxControlAttributes;
