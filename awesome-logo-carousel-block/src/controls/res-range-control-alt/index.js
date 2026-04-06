/**
 * WordPress dependencies
 */
import { Flex, FlexItem, RangeControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import ResLabelControl from '../res-label-control';
import ResetButton from '../reset-btn';

const ResRangeControlAlt = ({ label, controlName, objAttrs, min = 0, max, instanceId }) => {
    const { attributes, setAttributes } = objAttrs;
    const { resMode } = attributes;

    const id = `res-controls-${instanceId}`;

    const modes = {
        Desktop: 'desk',
        Tablet: 'tab',
        Mobile: 'phone'
    };

    const modePrefix = modes[resMode];

    return (
        <div className="alcb-control-container">
            <Flex align="flex-start">
                <FlexItem>
                    <ResLabelControl label={label} />
                </FlexItem>
            </Flex>
            <div className="alcb-controls-body" id={id}>
                {modePrefix && (
                    <ResetButton
                        onReset={() => setAttributes({ [`${modePrefix}${controlName}`]: '' })}
                        value={attributes[`${modePrefix}${controlName}`]}
                    >
                        <RangeControl
                            value={attributes[`${modePrefix}${controlName}`]}
                            onChange={value => setAttributes({ [`${modePrefix}${controlName}`]: value })}
                            min={min}
                            max={max}
                        />
                    </ResetButton>
                )}
            </div>
        </div>
    );
};

export default withInstanceId(ResRangeControlAlt);
