const BACKGROUND_KEYS = [
    'bgType',
    'bgColor',
    'bgGradient',
    'bgImage',
    'bgImageSize',
    'bgImagePosition',
    'bgImageAttachment',
    'bgImageRepeat',
    'bgImageOverlay',
    'bgImageOverlayColor',
    'bgImageOverlayOpacity'
];

const generateClassicBackground = ({ bgColor, bgImage, bgImageSize, bgImagePosition, bgImageAttachment, bgImageRepeat }) => {
    const styles = [];

    if (bgColor) {
        styles.push(`background-color: ${bgColor};`);
    }

    if (bgImage?.url) {
        styles.push(`
            background-image: url(${bgImage.url});
            background-size: ${bgImageSize};
            background-position: ${bgImagePosition};
            background-attachment: ${bgImageAttachment};
            background-repeat: ${bgImageRepeat};
        `);
    }

    return styles.join(' ');
};

const generateOverlay = ({ bgImageOverlayColor, bgImageOverlayOpacity }) => `
    position: relative;
    z-index: 1;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        z-index: -1;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${bgImageOverlayColor};
        opacity: ${bgImageOverlayOpacity};
    }
`;

const generateGradientBackground = bgGradient => (bgGradient ? `background-image: ${bgGradient};` : '');

const generateBgStyles = ({ controlName, attributes }) => {
    // const { usePanelProps } = window?.alcbModules?.Helpers;
    // const { attributes } = usePanelProps();

    // Extract all background-related properties with their prefixed names
    const bgProps = BACKGROUND_KEYS.reduce((acc, key) => {
        acc[key] = attributes[`${controlName}${key}`];
        return acc;
    }, {});

    // Set default for bgType if not provided
    bgProps.bgType = bgProps.bgType || 'classic';

    let bgStyle = '';

    switch (bgProps.bgType) {
        case 'classic':
            bgStyle = generateClassicBackground(bgProps);
            if (bgProps.bgImageOverlay) {
                bgStyle += generateOverlay(bgProps);
            }
            break;
        case 'gradient':
            bgStyle = generateGradientBackground(bgProps.bgGradient);
            break;
    }
    return { bgStyle };
};

export default generateBgStyles;
