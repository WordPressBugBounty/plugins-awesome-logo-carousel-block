/**
 * WordPress dependencies
 */
import { BaseControl, Button, ColorIndicator, ColorPicker, Flex, FlexBlock, FlexItem, Popover } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { select } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

const ColorControl = ({ label, value, onChange, instanceId }) => {
    const [colorPanel, setColorPanel] = useState(false);

    const id = `color-control-${instanceId}`;

    // get colors from theme
    const COLORS = select('core/editor').getEditorSettings().colors;

    return (
        <div className="alcb-control-container alcb-color-control alcb-mb-0">
            <Flex>
                <FlexBlock>
                    <BaseControl id={id} label={label} />
                </FlexBlock>
                <FlexItem>
                    <Button
                        icon="image-rotate"
                        label={__('Reset', 'awesome-logo-carousel-block')}
                        onClick={() => onChange('')}
                        className={`alcb-reset-button ${value ? 'active' : 'disabled'}`}
                    />
                </FlexItem>
                <FlexItem>
                    <button className="color-indicator" onClick={() => setColorPanel(true)}>
                        <ColorIndicator colorValue={value} />
                    </button>
                    {colorPanel && (
                        <Popover position="bottom right" onFocusOutside={() => setColorPanel(false)} offset={10}>
                            <div className="alcb-color-panel">
                                <ColorPicker color={value} onChangeComplete={value => onChange(value.hex)} disableAlpha={false} />
                                <div className="alcb-colors-palette">
                                    <label className="alcb-label alcb-mb-8" htmlFor="alcb-colors-palette">
                                        {__('Theme Colors', 'awesome-logo-carousel-block')}
                                    </label>
                                    <div id="alcb-colors-palette">
                                        {COLORS &&
                                            COLORS.map((paletteColor, index) => {
                                                return (
                                                    <ColorIndicator
                                                        className={classNames(
                                                            'alcb-color-indicator',
                                                            `${value === `var(--wp--preset--color--${paletteColor.slug})` ? 'active' : ''}`
                                                        )}
                                                        title={paletteColor.name}
                                                        key={index}
                                                        colorValue={paletteColor.color}
                                                        onClick={() => onChange(`var(--wp--preset--color--${paletteColor.slug})`)}
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </Popover>
                    )}
                </FlexItem>
            </Flex>
        </div>
    );
};

export default withInstanceId(ColorControl);
