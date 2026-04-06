/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { GENERAL_UNITS } from '../../constants';
import ResLabelControl from '../res-label-control';
import ResetButton from '../reset-btn';
import UnitsControl from '../units-control';
import DimensionControl from './dimension';

const ResBoxControl = ({ label, controlName, noUnits = false, units, min, max, instanceId }) => {
    const { usePanelProps } = window?.alcbModules?.Helpers;
    const { attributes, setAttributes } = usePanelProps();
    const { resMode } = attributes;

    const deviceTypes = {
        Desktop: 'Values',
        Tablet: 'TabValues',
        Mobile: 'MobValues'
    };

    const {
        [`${controlName}Values`]: deskValues,
        [`${controlName}TabValues`]: tabValues,
        [`${controlName}MobValues`]: mobValues,
        [`${controlName}Units`]: boxUnits,
        [`${controlName}IsLinked`]: isLinked
    } = attributes;

    const deviceValues = {
        Desktop: deskValues,
        Tablet: tabValues,
        Mobile: mobValues
    };

    const id = `res-controls-${instanceId}`;
    const availableUnits = units || GENERAL_UNITS;

    const checkValue = values => values && Object.values(values).some(value => value !== undefined && value !== '' && !isNaN(value));

    const hasValue = Object.values(deviceValues).some(checkValue);

    const handleReset = () => {
        const resetValues = Object.keys(deviceTypes).reduce(
            (acc, device) => ({
                ...acc,
                [`${controlName}${deviceTypes[device]}`]: {
                    top: '',
                    right: '',
                    bottom: '',
                    left: ''
                }
            }),
            {}
        );
        setAttributes(resetValues);
    };

    const handleUnitsChange = (value, device) => {
        setAttributes({
            [`${controlName}Units`]: {
                ...boxUnits,
                [device.toLowerCase()]: value
            }
        });
    };

    const handleDimensionChange = (value, device) => {
        setAttributes({
            [`${controlName}${deviceTypes[device]}`]: {
                ...deviceValues[device],
                ...value
            }
        });
    };

    return (
        <div className="alcb-control-container nx-box">
            <Flex align="flex-start">
                <FlexBlock>
                    <ResLabelControl
                        label={label}
                        requiredProps={{
                            id,
                            resMode,
                            setAttributes,
                            attributes
                        }}
                    />
                </FlexBlock>
                <FlexItem>
                    <ResetButton onReset={handleReset} value={hasValue} />
                </FlexItem>
                <FlexItem>
                    {!noUnits && (
                        <Fragment>
                            <UnitsControl
                                value={boxUnits && boxUnits[resMode.toLowerCase()]}
                                onChange={value => handleUnitsChange(value, resMode)}
                                units={availableUnits}
                            />
                        </Fragment>
                    )}
                </FlexItem>
            </Flex>
            <div className="alcb-controls-body" id={id}>
                <DimensionControl
                    top={deviceValues[resMode]?.top}
                    right={deviceValues[resMode]?.right}
                    bottom={deviceValues[resMode]?.bottom}
                    left={deviceValues[resMode]?.left}
                    onChange={value => handleDimensionChange(value, resMode)}
                    neededProps={{ setAttributes, controlName, isLinked }}
                    min={min}
                    max={max}
                />
            </div>
        </div>
    );
};

export default ResBoxControl;
