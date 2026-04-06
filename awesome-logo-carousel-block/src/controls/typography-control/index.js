/**
 * WordPress dependencies
 */
import { BaseControl, Button, ButtonGroup, Flex, FlexBlock, FlexItem, Popover, RangeControl, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { GENERAL_UNITS, LHLS_UNITS, PREFIX } from '../../constants';
import ResetButton from '../reset-btn';
import UnitsControl from '../units-control';

/**
 * Internal dependencies
 */
import ResLabelControl from '../res-label-control';

//block constant
import classNames from 'classnames';
import { fontStyleOptions, textDecorationOptions, textTransformOptions } from './constants';

const TypographyControl = ({ label, controlName, objAttrs, instanceId }) => {
    const { attributes, setAttributes } = objAttrs;
    const { resMode } = attributes;
    const {
        [`${PREFIX}${controlName}FontStyle`]: fontStyle,
        [`${PREFIX}${controlName}TextTransform`]: textTransform,
        [`${PREFIX}${controlName}TextDecoration`]: textDecoration,

        [`${PREFIX}${controlName}FontSizes`]: fontSizes,
        [`${PREFIX}${controlName}LineHeights`]: lineHeights,
        [`${PREFIX}${controlName}LetterSpacings`]: letterSpacings,

        [`${PREFIX}${controlName}FontSizeUnits`]: fontSizeUnits,
        [`${PREFIX}${controlName}LineHeightUnits`]: lineHeightUnits,
        [`${PREFIX}${controlName}LetterSpacingUnits`]: letterSpacingUnits
    } = attributes;

    const [typographyPanel, setTypographyPanel] = useState(false);

    return (
        <div className="alcb-control-container typography-control">
            <Flex>
                <FlexBlock>
                    <BaseControl id={`typography-control-${instanceId}`} label={label} />
                </FlexBlock>
                <FlexItem>
                    <Button
                        className="alcb-btn"
                        icon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16">
                                <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                            </svg>
                        )}
                        label="Typography"
                        onClick={() => setTypographyPanel(true)}
                    />
                </FlexItem>
            </Flex>
            {typographyPanel && (
                <Popover
                    position="bottom left"
                    className="alcb-typography-popover"
                    onClose={() => setTypographyPanel(false)}
                    onFocusOutside={() => setTypographyPanel(false)}
                    offset={5}
                >
                    <div className="alcb-typography-panel alcb-popover">
                        <div className="alcb-mb-16">
                            <Flex align="center">
                                <FlexBlock>
                                    <ResLabelControl
                                        id="font-size-control"
                                        label={__('Font Size', 'alcb-blocks')}
                                        requiredProps={{
                                            resMode,
                                            setAttributes,
                                            attributes
                                        }}
                                    />
                                </FlexBlock>
                                <FlexItem>
                                    {resMode === 'Desktop' && (
                                        <UnitsControl
                                            value={fontSizeUnits && fontSizeUnits.desk}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}FontSizeUnits`]: {
                                                        ...fontSizeUnits,
                                                        desk: value
                                                    }
                                                })
                                            }
                                            units={GENERAL_UNITS}
                                        />
                                    )}
                                    {resMode === 'Tablet' && (
                                        <UnitsControl
                                            value={fontSizeUnits && fontSizeUnits.tab}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}FontSizeUnits`]: {
                                                        ...fontSizeUnits,
                                                        tab: value
                                                    }
                                                })
                                            }
                                            units={GENERAL_UNITS}
                                        />
                                    )}
                                    {resMode === 'Mobile' && (
                                        <UnitsControl
                                            value={fontSizeUnits && fontSizeUnits.mob}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}FontSizeUnits`]: {
                                                        ...fontSizeUnits,
                                                        mob: value
                                                    }
                                                })
                                            }
                                            units={GENERAL_UNITS}
                                        />
                                    )}
                                </FlexItem>
                            </Flex>
                            <div className="alcb-controls-body" id="font-size-control">
                                {resMode === 'Desktop' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}FontSizes`]: {
                                                        ...fontSizes,
                                                        desk: ''
                                                    },
                                                    [`${PREFIX}${controlName}FontSizeUnits`]: {
                                                        ...fontSizeUnits,
                                                        desk: 'px'
                                                    }
                                                })
                                            }
                                            value={fontSizes && fontSizes.desk}
                                        >
                                            <RangeControl
                                                value={fontSizes && fontSizes.desk}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}FontSizes`]: {
                                                            ...fontSizes,
                                                            desk: value
                                                        }
                                                    })
                                                }
                                                min={1}
                                                max={200}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                                {resMode === 'Tablet' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}FontSizes`]: {
                                                        ...fontSizes,
                                                        tab: ''
                                                    },
                                                    [`${PREFIX}${controlName}FontSizeUnits`]: {
                                                        ...fontSizeUnits,
                                                        tab: 'px'
                                                    }
                                                })
                                            }
                                            value={fontSizes && fontSizes.tab}
                                        >
                                            <RangeControl
                                                value={fontSizes && fontSizes.tab}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}FontSizes`]: {
                                                            ...fontSizes,
                                                            tab: value
                                                        }
                                                    })
                                                }
                                                min={1}
                                                max={200}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                                {resMode === 'Mobile' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}FontSizes`]: {
                                                        ...fontSizes,
                                                        mob: ''
                                                    },
                                                    [`${PREFIX}${controlName}FontSizeUnits`]: {
                                                        ...fontSizeUnits,
                                                        mob: 'px'
                                                    }
                                                })
                                            }
                                            value={fontSizes && fontSizes.mob}
                                        >
                                            <RangeControl
                                                value={fontSizes && fontSizes.mob}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}FontSizes`]: {
                                                            ...fontSizes,
                                                            mob: value
                                                        }
                                                    })
                                                }
                                                min={1}
                                                max={200}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="alcb-mb-16">
                            <div className="alcb-flex">
                                <div className="alcb-flex-item">
                                    <label htmlFor="text-transform-control" className="alcb-label alcb-mb-8 alcb-inline-block">
                                        {__('Decoration', 'alcb-blocks')}
                                    </label>
                                    <ButtonGroup
                                        id="text-transform-control"
                                        className="alcb-btn-group alcb-full-group text-transform-btn-group"
                                    >
                                        {textDecorationOptions &&
                                            textDecorationOptions.map((item, index) => {
                                                return (
                                                    <Tooltip text={item.label} key={index} placement="top">
                                                        <Button
                                                            className={classNames(
                                                                'text-transform-btn',
                                                                ` ${item.value === textDecoration ? 'active' : ''}`
                                                            )}
                                                            onClick={() =>
                                                                setAttributes({
                                                                    [`${PREFIX}${controlName}TextDecoration`]: item.value
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
                                <div className="alcb-flex-item">
                                    <label htmlFor="text-transform-control" className="alcb-label alcb-mb-8 alcb-inline-block">
                                        {__('Transform', 'alcb-blocks')}
                                    </label>
                                    <ButtonGroup
                                        id="text-transform-control"
                                        className="alcb-btn-group alcb-full-group text-transform-btn-group"
                                    >
                                        {textTransformOptions &&
                                            textTransformOptions.map((item, index) => {
                                                return (
                                                    <Tooltip text={item.label} key={index} placement="top">
                                                        <Button
                                                            className={classNames(
                                                                'text-transform-btn',
                                                                ` ${item.value === textTransform ? 'active' : ''}`
                                                            )}
                                                            onClick={() =>
                                                                setAttributes({
                                                                    [`${PREFIX}${controlName}TextTransform`]: item.value
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
                        </div>
                        <div className="alcb-mb-16">
                            <Flex>
                                <FlexBlock>
                                    <label htmlFor="font-style-control" className="alcb-label">
                                        {__('Style', 'alcb-blocks')}
                                    </label>
                                </FlexBlock>
                                <FlexItem>
                                    <ButtonGroup id="font-style-control" className="alcb-btn-group">
                                        {fontStyleOptions &&
                                            fontStyleOptions.map((item, index) => {
                                                return (
                                                    <Tooltip text={item.label} key={index} placement="top">
                                                        <Button
                                                            className={classNames(
                                                                'font-style-btn',
                                                                ` ${item.value === fontStyle ? 'active' : ''}`
                                                            )}
                                                            onClick={() =>
                                                                setAttributes({
                                                                    [`${PREFIX}${controlName}FontStyle`]: item.value
                                                                })
                                                            }
                                                        >
                                                            {item.icon}
                                                        </Button>
                                                    </Tooltip>
                                                );
                                            })}
                                    </ButtonGroup>
                                </FlexItem>
                            </Flex>
                        </div>
                        <div className="alcb-mb-16">
                            <Flex align="flex-start">
                                <FlexBlock>
                                    <ResLabelControl
                                        id="line-height-control"
                                        label={__('Line Height', 'alcb-blocks')}
                                        requiredProps={{
                                            resMode,
                                            setAttributes,
                                            attributes
                                        }}
                                    />
                                </FlexBlock>
                                <FlexItem>
                                    {resMode === 'Desktop' && (
                                        <UnitsControl
                                            value={lineHeightUnits && lineHeightUnits.desk}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LineHeightUnits`]: {
                                                        ...lineHeightUnits,
                                                        desk: value
                                                    }
                                                })
                                            }
                                            units={LHLS_UNITS}
                                        />
                                    )}
                                    {resMode === 'Tablet' && (
                                        <UnitsControl
                                            value={lineHeightUnits && lineHeightUnits.tab}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LineHeightUnits`]: {
                                                        ...lineHeightUnits,
                                                        tab: value
                                                    }
                                                })
                                            }
                                            units={LHLS_UNITS}
                                        />
                                    )}
                                    {resMode === 'Mobile' && (
                                        <UnitsControl
                                            value={lineHeightUnits && lineHeightUnits.mob}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LineHeightUnits`]: {
                                                        ...lineHeightUnits,
                                                        mob: value
                                                    }
                                                })
                                            }
                                            units={LHLS_UNITS}
                                        />
                                    )}
                                </FlexItem>
                            </Flex>
                            <div className="alcb-controls-body" id="line-height-control">
                                {resMode === 'Desktop' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LineHeights`]: {
                                                        ...lineHeights,
                                                        desk: ''
                                                    },
                                                    [`${PREFIX}${controlName}LineHeightUnits`]: {
                                                        ...lineHeightUnits,
                                                        desk: 'px'
                                                    }
                                                })
                                            }
                                            value={lineHeights && lineHeights.desk}
                                        >
                                            <RangeControl
                                                value={lineHeights && lineHeights.desk}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}LineHeights`]: {
                                                            ...lineHeights,
                                                            desk: value
                                                        }
                                                    })
                                                }
                                                min={0}
                                                max={100}
                                                step={lineHeightUnits && lineHeightUnits.desk === 'em' ? 0.1 : 1}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                                {resMode === 'Tablet' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LineHeights`]: {
                                                        ...lineHeights,
                                                        tab: ''
                                                    },
                                                    [`${PREFIX}${controlName}LineHeightUnits`]: {
                                                        ...lineHeightUnits,
                                                        tab: 'px'
                                                    }
                                                })
                                            }
                                            value={lineHeights && lineHeights.tab}
                                        >
                                            <RangeControl
                                                value={lineHeights && lineHeights.tab}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}LineHeights`]: {
                                                            ...lineHeights,
                                                            tab: value
                                                        }
                                                    })
                                                }
                                                min={0}
                                                max={100}
                                                step={lineHeightUnits && lineHeightUnits.tab === 'em' ? 0.1 : 1}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                                {resMode === 'Mobile' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LineHeights`]: {
                                                        ...lineHeights,
                                                        mob: ''
                                                    },
                                                    [`${PREFIX}${controlName}LineHeightUnits`]: {
                                                        ...lineHeightUnits,
                                                        mob: 'px'
                                                    }
                                                })
                                            }
                                            value={lineHeights && lineHeights.mob}
                                        >
                                            <RangeControl
                                                value={lineHeights && lineHeights.mob}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}LineHeights`]: {
                                                            ...lineHeights,
                                                            mob: value
                                                        }
                                                    })
                                                }
                                                min={0}
                                                max={100}
                                                step={lineHeightUnits && lineHeightUnits.mob === 'em' ? 0.1 : 1}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="alcb-mb-0">
                            <Flex align="flex-start">
                                <FlexBlock>
                                    <ResLabelControl
                                        id="letter-spacing-control"
                                        label={__('Letter Spacing', 'alcb-blocks')}
                                        requiredProps={{
                                            resMode,
                                            setAttributes,
                                            attributes
                                        }}
                                    />
                                </FlexBlock>
                                <FlexItem>
                                    {resMode === 'Desktop' && (
                                        <UnitsControl
                                            value={letterSpacingUnits && letterSpacingUnits.desk}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LetterSpacingUnits`]: {
                                                        ...letterSpacingUnits,
                                                        desk: value
                                                    }
                                                })
                                            }
                                            units={LHLS_UNITS}
                                        />
                                    )}
                                    {resMode === 'Tablet' && (
                                        <UnitsControl
                                            value={letterSpacingUnits && letterSpacingUnits.tab}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LetterSpacingUnits`]: {
                                                        ...letterSpacingUnits,
                                                        tab: value
                                                    }
                                                })
                                            }
                                            units={LHLS_UNITS}
                                        />
                                    )}
                                    {resMode === 'Mobile' && (
                                        <UnitsControl
                                            value={letterSpacingUnits && letterSpacingUnits.mob}
                                            onChange={value =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LetterSpacingUnits`]: {
                                                        ...letterSpacingUnits,
                                                        mob: value
                                                    }
                                                })
                                            }
                                            units={LHLS_UNITS}
                                        />
                                    )}
                                </FlexItem>
                            </Flex>
                            <div className="alcb-controls-body" id="letter-spacing-control">
                                {resMode === 'Desktop' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LetterSpacings`]: {
                                                        ...letterSpacings,
                                                        desk: ''
                                                    },
                                                    [`${PREFIX}${controlName}LetterSpacingUnits`]: {
                                                        ...letterSpacingUnits,
                                                        desk: 'px'
                                                    }
                                                })
                                            }
                                            value={letterSpacings && letterSpacings.desk}
                                        >
                                            <RangeControl
                                                value={letterSpacings && letterSpacings.desk}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}LetterSpacings`]: {
                                                            ...letterSpacings,
                                                            desk: value
                                                        }
                                                    })
                                                }
                                                min={0}
                                                max={100}
                                                step={letterSpacingUnits && letterSpacingUnits.desk === 'em' ? 0.1 : 1}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                                {resMode === 'Tablet' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LetterSpacings`]: {
                                                        ...letterSpacings,
                                                        tab: ''
                                                    },
                                                    [`${PREFIX}${controlName}LetterSpacingUnits`]: {
                                                        ...letterSpacingUnits,
                                                        tab: 'px'
                                                    }
                                                })
                                            }
                                            value={letterSpacings && letterSpacings.tab}
                                        >
                                            <RangeControl
                                                value={letterSpacings && letterSpacings.tab}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}LetterSpacings`]: {
                                                            ...letterSpacings,
                                                            tab: value
                                                        }
                                                    })
                                                }
                                                min={0}
                                                max={100}
                                                step={letterSpacingUnits && letterSpacingUnits.tab === 'em' ? 0.1 : 1}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                                {resMode === 'Mobile' && (
                                    <div className="single-rangle">
                                        <ResetButton
                                            onReset={() =>
                                                setAttributes({
                                                    [`${PREFIX}${controlName}LetterSpacings`]: {
                                                        ...letterSpacings,
                                                        mob: ''
                                                    },
                                                    [`${PREFIX}${controlName}LetterSpacingUnits`]: {
                                                        ...letterSpacingUnits,
                                                        mob: 'px'
                                                    }
                                                })
                                            }
                                            value={letterSpacings && letterSpacings.mob}
                                        >
                                            <RangeControl
                                                value={letterSpacings && letterSpacings.mob}
                                                onChange={value =>
                                                    setAttributes({
                                                        [`${PREFIX}${controlName}LetterSpacings`]: {
                                                            ...letterSpacings,
                                                            mob: value
                                                        }
                                                    })
                                                }
                                                min={0}
                                                max={100}
                                                step={letterSpacingUnits && letterSpacingUnits.mob === 'em' ? 0.1 : 1}
                                            />
                                        </ResetButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Popover>
            )}
        </div>
    );
};
export default TypographyControl;
