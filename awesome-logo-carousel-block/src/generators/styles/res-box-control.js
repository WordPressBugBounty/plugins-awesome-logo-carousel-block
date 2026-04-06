const generateResBoxStyles = ({ controlName, propertyName, attributes, forRadius = false }) => {
    const getValues = mode => attributes[`${controlName}${mode}Values`] || {};
    const getUnit = mode => attributes[`${controlName}Units`]?.[mode] || '';
    const isLinked = attributes[`${controlName}IsLinked`];

    const generateStyles = (values, unit) => {
        if (isLinked && values.top !== undefined && values.top !== '' && !isNaN(values.top)) {
            return `${propertyName}: ${values.top}${unit};`;
        }
        return ['top', 'right', 'bottom', 'left']
            .map(pos =>
                values[pos] !== undefined && values[pos] !== '' && !isNaN(values[pos])
                    ? `${
                          forRadius
                              ? `border-${pos
                                    .replace(/top|bottom/, '$&-left')
                                    .replace(/right/, 'top-right')
                                    .replace(/left/, 'bottom-left')}-radius`
                              : `${propertyName}-${pos}`
                      }: ${values[pos]}${unit};`
                    : ''
            )
            .join('\n');
    };

    return {
        boxDeskStyles: generateStyles(getValues(''), getUnit('desktop')),
        boxTabStyles: generateStyles(getValues('Tab'), getUnit('tablet')),
        boxMobStyles: generateStyles(getValues('Mob'), getUnit('mobile'))
    };
};

export default generateResBoxStyles;
