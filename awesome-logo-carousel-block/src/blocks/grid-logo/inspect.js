import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
    ALIGN,
    // caption
    CAPTION_MARGIN,
    CAPTION_TITLE_TYPO,
    // content
    CONTENT_BG,
    CONTENT_BORDER,
    CONTENT_BRADIUS,
    CONTENT_EFFECT,
    CONTENT_PADDING,
    CONTENT_POSITIONS,
    DESC_MARGIN,
    DESC_TITLE_TYPO,
    GAP,
    // grid
    GRID_COL,
    GRID_GAP,
    // hover effect
    HOVER_EFFECTS,
    // logo style
    LOGO_BORDER,
    LOGO_BRADIUS,
    LOGO_HOVER_BG,
    LOGO_PADDING,
    LOGO_SIZE,
    OVERLAY,
    VALIGN,
    VC_POSITIONS,
    VISIBLES
} from './constants';

const {
    ResBoxControl,
    ResRangeControl,
    BorderControl,
    BackgroundControl,
    ColorControl,
    ButtonsGroupControl,
    TypographyControl,
    ProControl,
    ProWrapper,
    AlignmentControl
} = window?.alcbModules;

const Inspect = ({ attributes, setAttributes }) => {
    const {
        enableLink,
        captionVisibility,
        captionTitleColor,
        contentVisiblity,
        showDesc,
        descColor,
        logoHoverStyle,
        hoverOverlay,
        hoverEffect,
        contentPosition,
        visibleContentPosition
    } = attributes;
    const objAttrs = {
        attributes,
        setAttributes
    };

    return (
        <>
            <InspectorControls group="settings">
                <div className="alcb-panels">
                    <PanelBody title={__('General', 'awesome-logo-carousel-block')} initialOpen={true}>
                        <ToggleControl
                            label={__('Enable Link', 'awesome-logo-carousel-block')}
                            checked={enableLink}
                            onChange={() => setAttributes({ enableLink: !enableLink })}
                        />
                        <ToggleControl
                            label={__('Show Caption', 'awesome-logo-carousel-block')}
                            checked={captionVisibility}
                            onChange={() => setAttributes({ captionVisibility: !captionVisibility })}
                        />
                        <ToggleControl
                            label={__('Show Description', 'awesome-logo-carousel-block')}
                            checked={showDesc}
                            onChange={() => setAttributes({ showDesc: !showDesc })}
                        />
                    </PanelBody>
                    <PanelBody title={__('Layout', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <ResRangeControl
                            label={__('Columns', 'awesome-logo-carousel-block')}
                            controlName={GRID_COL}
                            objAttrs={objAttrs}
                            min={1}
                            max={12}
                            noUnits={true}
                        />
                        <ResRangeControl
                            label={__('Gap', 'awesome-logo-carousel-block')}
                            controlName={GRID_GAP}
                            objAttrs={objAttrs}
                            min={0}
                            max={100}
                            units={['px', 'em', 'rem']}
                        />
                    </PanelBody>
                    <PanelBody title={__('Hover Effect', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <SelectControl
                            label={__('Select effect', 'awesome-logo-carousel-block')}
                            value={logoHoverStyle}
                            options={HOVER_EFFECTS}
                            labelPosition="side"
                            onChange={logoHoverStyle => setAttributes({ logoHoverStyle })}
                        />
                    </PanelBody>
                    {(captionVisibility || showDesc) && (
                        <PanelBody title={__('Content Visibility', 'awesome-logo-carousel-block')} initialOpen={false}>
                            <AlignmentControl
                                label={__('Alignment', 'awesome-logo-carousel-block')}
                                controlName={ALIGN}
                                objAttrs={objAttrs}
                            />
                            <ButtonsGroupControl
                                label={__('Visible On', 'awesome-logo-carousel-block')}
                                options={VISIBLES}
                                value={contentVisiblity}
                                onChange={v =>
                                    setAttributes({
                                        contentVisiblity: v
                                    })
                                }
                            />
                            {contentVisiblity === 'cv_always' && (
                                <>
                                    <SelectControl
                                        label={__('Position', 'awesome-logo-carousel-block')}
                                        value={visibleContentPosition}
                                        options={VC_POSITIONS}
                                        onChange={v => {
                                            setAttributes({
                                                visibleContentPosition: v
                                            });
                                        }}
                                        labelPosition="side"
                                    />
                                    {(visibleContentPosition === 'vc_left' || visibleContentPosition === 'vc_right') && (
                                        <>
                                            <AlignmentControl
                                                label={__('Vertical Alignment', 'awesome-logo-carousel-block')}
                                                controlName={VALIGN}
                                                objAttrs={objAttrs}
                                                flexAlign={true}
                                                flexVerticle={true}
                                            />
                                            <ResRangeControl
                                                label={__('Gap', 'awesome-logo-carousel-block')}
                                                controlName={GAP}
                                                objAttrs={objAttrs}
                                                min={0}
                                                max={100}
                                                units={['px', 'em', 'rem']}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                            {contentVisiblity === 'cv_hover' && (
                                <>
                                    {contentVisiblity === 'cv_hover' && (
                                        <>
                                            <SelectControl
                                                label={__('Type', 'awesome-logo-carousel-block')}
                                                value={hoverOverlay}
                                                options={OVERLAY}
                                                labelPosition="side"
                                                onChange={hoverOverlay => setAttributes({ hoverOverlay })}
                                            />
                                            {hoverOverlay === 'auto' && (
                                                <SelectControl
                                                    label={__('Position', 'awesome-logo-carousel-block')}
                                                    value={contentPosition}
                                                    options={CONTENT_POSITIONS}
                                                    labelPosition="side"
                                                    onChange={contentPosition => setAttributes({ contentPosition })}
                                                />
                                            )}
                                        </>
                                    )}
                                    <SelectControl
                                        label={__('Animation', 'awesome-logo-carousel-block')}
                                        value={hoverEffect}
                                        options={CONTENT_EFFECT}
                                        labelPosition="side"
                                        onChange={hoverEffect => setAttributes({ hoverEffect })}
                                    />
                                </>
                            )}
                        </PanelBody>
                    )}
                    {alcbData?.hasPro !== '1' && (
                        <ProControl>
                            <p>{__('Unlock more features with the Pro version.', 'awesome-logo-carousel-block')}</p>
                            <a href="https://logocarousel.gutenbergkits.com/" target="_blank" rel="noopener noreferrer">
                                {__('Upgrade to Pro', 'awesome-logo-carousel-block')}
                                <span className="dashicons dashicons-external"></span>
                            </a>
                        </ProControl>
                    )}
                </div>
            </InspectorControls>
            <InspectorControls group="styles">
                <div className="alcb-panels">
                    <PanelBody title={__('Item', 'awesome-logo-carousel-block')} initialOpen={true}>
                        <BorderControl controlName={LOGO_BORDER} objAttrs={objAttrs} noHover={true} />
                        <ResBoxControl
                            label={__('Border Radius', 'awesome-logo-carousel-block')}
                            controlName={LOGO_BRADIUS}
                            min={0}
                            max={50}
                            units={['px', 'em', 'rem']}
                        />
                        <ResBoxControl label={__('Padding', 'awesome-logo-carousel-block')} controlName={LOGO_PADDING} />
                        <BackgroundControl
                            label={__(' Background', 'awesome-logo-carousel-block')}
                            controlName={LOGO_HOVER_BG}
                            objAttrs={objAttrs}
                        />
                    </PanelBody>
                    <PanelBody title={__('Logo', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <ResRangeControl
                            label={__('Size', 'awesome-logo-carousel-block')}
                            controlName={LOGO_SIZE}
                            objAttrs={objAttrs}
                            min={1}
                            max={1000}
                            units={['px', 'em', 'rem', '%']}
                        />
                    </PanelBody>
                    {(captionVisibility || showDesc) && (
                        <PanelBody title={__('Content', 'awesome-logo-carousel-block')} initialOpen={false}>
                            <BorderControl controlName={CONTENT_BORDER} objAttrs={objAttrs} />
                            <ResBoxControl
                                label={__('Border Radius', 'awesome-logo-carousel-block')}
                                controlName={CONTENT_BRADIUS}
                                min={0}
                                max={50}
                                units={['px', 'em', 'rem']}
                            />
                            <ResBoxControl
                                label={__('Padding', 'awesome-logo-carousel-block')}
                                controlName={CONTENT_PADDING}
                                min={0}
                                units={['px', 'em', 'rem']}
                            />
                            <BackgroundControl
                                label={__(' Background', 'awesome-logo-carousel-block')}
                                controlName={CONTENT_BG}
                                objAttrs={objAttrs}
                            />
                        </PanelBody>
                    )}
                    {captionVisibility && (
                        <PanelBody title={__('Caption', 'awesome-logo-carousel-block')} initialOpen={false}>
                            <TypographyControl
                                label={__('Typography', 'awesome-logo-carousel-block')}
                                objAttrs={objAttrs}
                                controlName={CAPTION_TITLE_TYPO}
                            />

                            <ColorControl
                                label={__('Color', 'awesome-logo-carousel-block')}
                                value={captionTitleColor}
                                onChange={V =>
                                    setAttributes({
                                        captionTitleColor: V
                                    })
                                }
                            />
                            <ResBoxControl label={__('Margin', 'awesome-logo-carousel-block')} controlName={CAPTION_MARGIN} />
                        </PanelBody>
                    )}
                    {showDesc && (
                        <PanelBody title={__('Description', 'awesome-logo-carousel-block')} initialOpen={false}>
                            <TypographyControl
                                label={__('Typography', 'awesome-logo-carousel-block')}
                                objAttrs={objAttrs}
                                controlName={DESC_TITLE_TYPO}
                            />
                            <ColorControl
                                label={__('Color', 'awesome-logo-carousel-block')}
                                value={descColor}
                                onChange={V =>
                                    setAttributes({
                                        descColor: V
                                    })
                                }
                            />
                            <ResBoxControl label={__('Margin', 'awesome-logo-carousel-block')} controlName={DESC_MARGIN} />
                        </PanelBody>
                    )}
                </div>
            </InspectorControls>
        </>
    );
};

export default Inspect;
