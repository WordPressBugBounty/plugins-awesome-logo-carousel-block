/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { Button, ButtonGroup, ColorIndicator, ColorPalette, Flex, FlexBlock, FlexItem, Popover, Tooltip } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ResetButton from '../reset-btn';

/**
 * Internal dependencies
 */
import classNames from 'classnames';
import { BORDER_STYLES, GENERAL_UNITS, PREFIX } from '../../constants';
import ResLabelControl from '../res-label-control';
import UnitsControl from '../units-control';
import DimensionControl from './dimension';

const BorderControl = ({ label = '', controlName, instanceId, objAttrs, units, noHover = false, min = null, max = null }) => {
    const [colorStylePanel, setColorStylePanel] = useState(false);
    const [colorTab, setColorTab] = useState('normal');

    const COLORS = wp.data.select('core/editor').getEditorSettings().colors;

    const id = `border-control-${instanceId}`;

    const { attributes, setAttributes } = objAttrs;
    const { resMode } = attributes;
    const availableUnits = units || GENERAL_UNITS;

    const {
        [`${PREFIX}${controlName}Style`]: borderStyle,
        [`${PREFIX}${controlName}Values`]: deskValues,
        [`${PREFIX}${controlName}TabValues`]: tabValues,
        [`${PREFIX}${controlName}MobValues`]: mobValues,
        [`${PREFIX}${controlName}Units`]: boxUnits,
        [`${PREFIX}${controlName}IsLinked`]: isLinked,
        [`${PREFIX}${controlName}Colors`]: borderColors
    } = attributes;

    const hasColorValue = borderColors && (borderColors?.normal || borderColors?.hover);

    const hasValue =
        (deskValues && deskValues.top !== undefined && deskValues.top !== '' && isNaN(deskValues.top) === false) ||
        (deskValues && deskValues.right !== undefined && deskValues.right !== '' && isNaN(deskValues.right) === false) ||
        (deskValues && deskValues.bottom !== undefined && deskValues.bottom !== '' && isNaN(deskValues.bottom) === false) ||
        (deskValues && deskValues.left !== undefined && deskValues.left !== '' && isNaN(deskValues.left) === false) ||
        (tabValues && tabValues.top !== undefined && tabValues.top !== '' && isNaN(tabValues.top) === false) ||
        (tabValues && tabValues.right !== undefined && tabValues.right !== '' && isNaN(tabValues.right) === false) ||
        (tabValues && tabValues.bottom !== undefined && tabValues.bottom !== '' && isNaN(tabValues.bottom) === false) ||
        (tabValues && tabValues.left !== undefined && tabValues.left !== '' && isNaN(tabValues.left) === false) ||
        (mobValues && mobValues.top !== undefined && mobValues.top !== '' && isNaN(mobValues.top) === false) ||
        (mobValues && mobValues.right !== undefined && mobValues.right !== '' && isNaN(mobValues.right) === false) ||
        (mobValues && mobValues.bottom !== undefined && mobValues.bottom !== '' && isNaN(mobValues.bottom) === false) ||
        (mobValues && mobValues.left !== undefined && mobValues.left !== '' && isNaN(mobValues.left) === false) ||
        hasColorValue ||
        (borderStyle && borderStyle !== '' && borderStyle !== 'none');

    return (
        <div className="alcb-control-container">
            {label && (
                <div className="alcb-mb-8">
                    <ResLabelControl
                        requiredProps={{
                            id,
                            resMode,
                            setAttributes,
                            attributes
                        }}
                        label={label}
                        noResBtns={true}
                    />
                </div>
            )}
            <Fragment>
                <div className="alcb-mb-8">
                    <Flex align="flex-start">
                        <FlexBlock>
                            <ResLabelControl
                                label={__('Border', 'awesome-logo-carousel-block')}
                                requiredProps={{
                                    id,
                                    resMode,
                                    setAttributes,
                                    attributes
                                }}
                            />
                        </FlexBlock>
                        <FlexItem>
                            <ResetButton
                                onReset={() => {
                                    setAttributes({
                                        [`${PREFIX}${controlName}Values`]: {
                                            top: '',
                                            right: '',
                                            bottom: '',
                                            left: ''
                                        },
                                        [`${PREFIX}${controlName}TabValues`]: {
                                            top: '',
                                            right: '',
                                            bottom: '',
                                            left: ''
                                        },
                                        [`${PREFIX}${controlName}MobValues`]: {
                                            top: '',
                                            right: '',
                                            bottom: '',
                                            left: ''
                                        },
                                        [`${PREFIX}${controlName}Units`]: {
                                            desk: 'px',
                                            tab: 'px',
                                            mob: 'px'
                                        },
                                        [`${PREFIX}${controlName}IsLinked`]: true,
                                        [`${PREFIX}${controlName}Style`]: '',
                                        [`${PREFIX}${controlName}Colors`]: {
                                            normal: '',
                                            hover: ''
                                        }
                                    });
                                }}
                                value={hasValue}
                            />
                        </FlexItem>
                        <FlexItem>
                            {resMode === 'Desktop' && (
                                <UnitsControl
                                    value={boxUnits && boxUnits.desk}
                                    onChange={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Units`]: {
                                                ...boxUnits,
                                                desk: value
                                            }
                                        })
                                    }
                                    units={availableUnits}
                                />
                            )}
                            {resMode === 'Tablet' && (
                                <UnitsControl
                                    value={boxUnits && boxUnits.tab}
                                    onChange={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Units`]: {
                                                ...boxUnits,
                                                tab: value
                                            }
                                        })
                                    }
                                    units={availableUnits}
                                />
                            )}
                            {resMode === 'Mobile' && (
                                <UnitsControl
                                    value={boxUnits && boxUnits.mob}
                                    onChange={value =>
                                        setAttributes({
                                            [`${PREFIX}${controlName}Units`]: {
                                                ...boxUnits,
                                                mob: value
                                            }
                                        })
                                    }
                                    units={availableUnits}
                                />
                            )}
                        </FlexItem>
                        <FlexItem>
                            <button
                                className="affra-color-style-btn"
                                onClick={() => setColorStylePanel(!colorStylePanel)}
                                style={{
                                    border: `1px ${borderStyle} ${borderColors && borderColors.normal}`
                                }}
                            >
                                <ColorIndicator
                                    colorValue={borderColors && borderColors.normal}
                                    title={__('Normal', 'awesome-logo-carousel-block')}
                                />
                            </button>
                            {colorStylePanel && (
                                <Popover
                                    placement="bottom-end"
                                    className="alcb-color-style-popover"
                                    focusOnMount={false}
                                    onClose={() => setColorStylePanel(false)}
                                    onFocusOutside={() => setColorStylePanel(false)}
                                    offset={5}
                                >
                                    <div className="border-styles">
                                        <label className="border-style-label">{__('Style', 'awesome-logo-carousel-block')}</label>
                                        <div className="b-styles">
                                            <ButtonGroup id="border-style" className="alcb-btn-group">
                                                {BORDER_STYLES &&
                                                    BORDER_STYLES.map((item, index) => {
                                                        return (
                                                            <Tooltip text={item.label} key={index} placement="top">
                                                                <Button
                                                                    className={classNames(
                                                                        'border-style-btn',
                                                                        `${borderStyle === item.value ? 'active' : ''}`
                                                                    )}
                                                                    onClick={() =>
                                                                        setAttributes({
                                                                            [`${PREFIX}${controlName}Style`]: item.value
                                                                        })
                                                                    }
                                                                >
                                                                    {item.icon}
                                                                </Button>
                                                            </Tooltip>
                                                        );
                                                    })}
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                    {!noHover && (
                                        <div className="colors-tabs">
                                            <button
                                                className={classNames('single-tab', `${colorTab === 'normal' ? 'active' : ''}`)}
                                                onClick={() => setColorTab('normal')}
                                            >
                                                {__('Normal', 'awesome-logo-carousel-block')}
                                            </button>
                                            <button
                                                className={classNames('single-tab', `${colorTab === 'hover' ? 'active' : ''}`)}
                                                onClick={() => setColorTab('hover')}
                                            >
                                                {__('Hover', 'awesome-logo-carousel-block')}
                                            </button>
                                        </div>
                                    )}

                                    <div className="colors-body">
                                        {colorTab === 'normal' && (
                                            <ColorPalette
                                                value={borderColors && borderColors.normal}
                                                onChange={colorValue =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}Colors`]: {
                                                            ...borderColors,
                                                            normal: colorValue
                                                        }
                                                    })
                                                }
                                                colors={COLORS}
                                            />
                                        )}
                                        {colorTab === 'hover' && !noHover && (
                                            <ColorPalette
                                                value={borderColors && borderColors.hover}
                                                onChange={colorValue =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}Colors`]: {
                                                            ...borderColors,
                                                            hover: colorValue
                                                        }
                                                    })
                                                }
                                                colors={COLORS}
                                            />
                                        )}
                                    </div>
                                </Popover>
                            )}
                        </FlexItem>
                    </Flex>
                    <div className="alcb-controls-body" id={id}>
                        {resMode === 'Desktop' && (
                            <DimensionControl
                                top={deskValues && deskValues.top}
                                right={deskValues && deskValues.right}
                                bottom={deskValues && deskValues.bottom}
                                left={deskValues && deskValues.left}
                                onChange={value =>
                                    setAttributes({
                                        [`${PREFIX}${controlName}Values`]: {
                                            ...deskValues,
                                            ...value
                                        }
                                    })
                                }
                                neededProps={{ setAttributes, controlName, isLinked }}
                                min={min}
                                max={max}
                            />
                        )}
                        {resMode === 'Tablet' && (
                            <DimensionControl
                                top={tabValues && tabValues.top}
                                right={tabValues && tabValues.right}
                                bottom={tabValues && tabValues.bottom}
                                left={tabValues && tabValues.left}
                                onChange={value =>
                                    setAttributes({
                                        [`${PREFIX}${controlName}TabValues`]: {
                                            ...tabValues,
                                            ...value
                                        }
                                    })
                                }
                                neededProps={{ setAttributes, controlName, isLinked }}
                                min={min}
                                max={max}
                            />
                        )}
                        {resMode === 'Mobile' && (
                            <DimensionControl
                                top={mobValues && mobValues.top}
                                right={mobValues && mobValues.right}
                                bottom={mobValues && mobValues.bottom}
                                left={mobValues && mobValues.left}
                                onChange={value =>
                                    setAttributes({
                                        [`${PREFIX}${controlName}MobValues`]: {
                                            ...mobValues,
                                            ...value
                                        }
                                    })
                                }
                                neededProps={{ setAttributes, controlName, isLinked }}
                                min={min}
                                max={max}
                            />
                        )}
                    </div>
                </div>
            </Fragment>
        </div>
    );
};

export default withInstanceId(BorderControl);
