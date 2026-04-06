/**
 * WordPress dependencies
 */
import { BaseControl, Button, ButtonGroup, Flex, FlexBlock, FlexItem, GradientPicker } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { select } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import ColorControl from '../color-control';
import Preview from '../preview';
import UploadBtn from '../upload-btn';

const customGradientOptions = [
    { name: 'JShine', gradient: 'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)', slug: 'jshine' },
    { name: 'Moonlit Asteroid', gradient: 'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)', slug: 'moonlit-asteroid' },
    { name: 'Rastafarie', gradient: 'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)', slug: 'rastafari' },
    { name: 'Frozen', gradient: 'linear-gradient(135deg,#403B4A 0%, #E7E9BB 100%)', slug: 'frozen' },
    { name: 'Mango Pulp', gradient: 'linear-gradient(135deg,#F09819 0%, #EDDE5D 100%)', slug: 'mango-pulp' }
];

const BackgroundControl = ({ instanceId, label, controlName, noImage = true }) => {
    const { usePanelProps } = window?.alcbModules?.Helpers;
    const { attributes, setAttributes } = usePanelProps();
    const [overlayColorPanel, setOverlayColorPanel] = useState(false);
    const [bgPanel, setBgPanel] = useState(false);
    const id = `color-control-${instanceId}`;
    const COLORS = select('core/editor')?.getEditorSettings()?.colors;
    const gradientOptions = select('core/editor')?.getEditorSettings()?.gradients;

    const updateAttribute = (key, value) => {
        setAttributes({ [`${controlName}${key}`]: value });
    };

    const {
        [`${controlName}bgType`]: bgType,
        [`${controlName}bgColor`]: bgColor,
        [`${controlName}bgGradient`]: bgGradient,
        [`${controlName}bgImage`]: bgImage
    } = attributes;

    return (
        <div className="alcb-control-container background-control">
            <Flex>
                <FlexBlock>
                    <BaseControl id={id} label={label} />
                </FlexBlock>
                <FlexItem>
                    <Button
                        className={classnames('alcb-editor-icon', 'alcb-reset-button', `${bgColor || bgGradient ? 'active' : 'disabled'}`)}
                        icon="image-rotate"
                        label={__('Reset', 'awesome-logo-carousel-block')}
                        onClick={() => updateAttribute('bgType', '') || updateAttribute('bgColor', '') || updateAttribute('bgGradient', '')}
                    />
                </FlexItem>
                <FlexItem>
                    <ButtonGroup>
                        {['classic', 'gradient'].map(type => (
                            <Button
                                key={type}
                                className={classnames('alcb-editor-icon', 'bg-btn', {
                                    active: bgType === type
                                })}
                                onClick={() => updateAttribute('bgType', type)}
                            >
                                {type === 'classic' ? '🎨' : '🌈'}
                            </Button>
                        ))}
                    </ButtonGroup>
                </FlexItem>
            </Flex>
            {bgType === 'classic' && (
                <ColorControl
                    label={__('Color', 'awesome-logo-carousel-block')}
                    value={bgColor}
                    onChange={color => updateAttribute('bgColor', color)}
                />
            )}
            {bgType === 'gradient' && (
                <GradientPicker
                    value={bgGradient || customGradientOptions[0].gradient}
                    onChange={v => updateAttribute('bgGradient', v)}
                    gradients={gradientOptions || customGradientOptions}
                    clearable={false}
                />
            )}
            {!noImage &&
                (bgImage?.url ? (
                    <Preview
                        url={bgImage.url}
                        id={bgImage.id}
                        onSelect={media => updateAttribute('bgImage', { id: media.id, url: media.url })}
                        onDelete={() => updateAttribute('bgImage', { id: null, url: null })}
                    />
                ) : (
                    <UploadBtn
                        title={__('Background Image', 'awesome-logo-carousel-block')}
                        onSelect={media => updateAttribute('bgImage', { id: media.id, url: media.url })}
                    />
                ))}
        </div>
    );
};

export default withInstanceId(BackgroundControl);
