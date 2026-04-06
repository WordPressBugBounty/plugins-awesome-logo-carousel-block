const generateBackgroundAttributes = controlName => {
    return {
        [`${controlName}bgType`]: {
            type: 'string',
            default: 'classic'
        },
        [`${controlName}bgColor`]: {
            type: 'string'
        },
        [`${controlName}bgGradient`]: {
            type: 'string'
        },
        [`${controlName}bgImage`]: {
            type: 'object',
            default: {
                id: '',
                url: ''
            }
        },
        [`${controlName}bgImageSize`]: {
            type: 'string',
            default: 'cover'
        },
        [`${controlName}bgImagePosition`]: {
            type: 'string',
            default: 'center center'
        },
        [`${controlName}bgImageAttachment`]: {
            type: 'string',
            default: 'scroll'
        },
        [`${controlName}bgImageRepeat`]: {
            type: 'string',
            default: 'no-repeat'
        },
        [`${controlName}bgImageOverlay`]: {
            type: 'boolean',
            default: false
        },
        [`${controlName}bgImageOverlayColor`]: {
            type: 'string'
        },
        [`${controlName}bgImageOverlayOpacity`]: {
            type: 'number',
            default: 0.5
        }
    };
};

export default generateBackgroundAttributes;
