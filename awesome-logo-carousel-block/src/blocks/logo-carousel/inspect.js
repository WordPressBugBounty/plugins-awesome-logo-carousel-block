/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
import { InspectorControls } from '@wordpress/block-editor';
import {
    CardDivider,
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import {
    ACTIVE_PAGI_HEIGHT,
    ACTIVE_PAGI_WIDTH,
    BORDER_STYLES,
    HOVER_EFFECTS,
    INACRIVE_PAGI_WIDTH,
    INACTIVE_PAGI_HEIGHT,
    ITEM_PADDING,
    LOGO_BG,
    LOGO_MWIDTH,
    LOGO_PADDING,
    NAV_BG,
    NAV_BORDER,
    NAV_BRADIUS,
    NAV_HEIGHT,
    NAV_HOVER_BG,
    NAV_ICON_SIZE,
    NAV_MARGIN,
    NAV_POSITIONS,
    NAV_WIDTH,
    PAG_TYPES,
    PAGI_BORDER,
    PAGI_BRADIUS,
    // pagination
    PAGI_MARGIN,
    VISIBLES
} from './constants';
const { Fragment } = wp.element;

const {
    SingleRangeControl,
    ButtonsGroupControl,
    ColorControl,
    ResRangeControlAlt,
    ResBoxControl,
    BackgroundControl,
    ProControl,
    ResRangeControl,
    BorderControl,
    SwitcherControl,
    ProWrapper,
    UploadBtn,
    Preview
} = window?.alcbModules;

const Inspect = ({ attributes, setAttributes }) => {
    const {
        images,
        autoplay,
        autoplayDelay,
        pauseOnHover,
        reverseAutoplayDirection,
        slideDirection,
        speed,
        loop,
        autoHeight,
        keyboard,
        mousewheel,
        showNav,
        showPagination,
        showCaption,
        captionVisibility,
        captionColor,
        captionBg,
        logoHoverStyle,
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        // logo link
        enableLink,
        logoLinks,
        openInNewTab,
        //navigation
        iconColor,
        iconHoverColor,
        navPosition,
        customNavigation,
        prevNav,
        nextNav,
        // pagination
        pagiColor,
        paginationType,
        linkType
    } = attributes;

    const objAttrs = {
        attributes,
        setAttributes
    };

    return (
        <>
            <InspectorControls group="settings">
                <div className="alcb-panels">
                    <PanelBody>
                        <ToggleControl
                            label={__('Enable Logos link?', 'awesome-logo-carousel-block')}
                            checked={enableLink}
                            onChange={() => setAttributes({ enableLink: !enableLink })}
                            __nextHasNoMarginBottom={true}
                        />
                        <ToggleControl
                            label={__('Show Logo Caption', 'awesome-logo-carousel-block')}
                            checked={showCaption}
                            onChange={() => setAttributes({ showCaption: !showCaption })}
                            __nextHasNoMarginBottom={true}
                        />
                        <ToggleControl
                            label={__('Show Navigation', 'awesome-logo-carousel-block')}
                            __nextHasNoMarginBottom={true}
                            checked={showNav}
                            onChange={() =>
                                setAttributes({
                                    showNav: !showNav
                                })
                            }
                        />
                        <ToggleControl
                            label={__('Show Pagination', 'awesome-logo-carousel-block')}
                            __nextHasNoMarginBottom={true}
                            checked={showPagination}
                            onChange={() =>
                                setAttributes({
                                    showPagination: !showPagination
                                })
                            }
                        />
                    </PanelBody>
                    <PanelBody title={__('Layout', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <ResRangeControlAlt
                            label={__('Colunms', 'awesome-logo-carousel-block')}
                            controlName="ItemsPerView"
                            min={1}
                            max={10}
                            objAttrs={objAttrs}
                        />
                        {alcbData?.hasPro === '1' ? (
                            <ResRangeControlAlt
                                label={__('Rows', 'awesome-logo-carousel-block')}
                                controlName="Rows"
                                objAttrs={objAttrs}
                                min={1}
                                max={4}
                            />
                        ) : (
                            <ProWrapper>
                                <ResRangeControlAlt
                                    label={__('Rows', 'awesome-logo-carousel-block')}
                                    controlName="Rows"
                                    objAttrs={objAttrs}
                                    min={1}
                                    max={4}
                                />
                            </ProWrapper>
                        )}
                        <ResRangeControlAlt
                            label={__('Gap', 'awesome-logo-carousel-block')}
                            controlName="Space"
                            min={1}
                            max={100}
                            objAttrs={objAttrs}
                        />
                    </PanelBody>
                    <PanelBody title={__('Carousel Options', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <SingleRangeControl
                            label={__('Speed', 'awesome-logo-carousel-block')}
                            value={speed}
                            onChange={v =>
                                setAttributes({
                                    speed: v
                                })
                            }
                            min={100}
                            max={2000}
                            step={100}
                            onClickReset={() =>
                                setAttributes({
                                    speed: 400
                                })
                            }
                        />
                        <ToggleControl
                            label={__('Enable Autoplay', 'awesome-logo-carousel-block')}
                            checked={autoplay}
                            onChange={() => setAttributes({ autoplay: !autoplay })}
                        />
                        {autoplay && (
                            <>
                                <SingleRangeControl
                                    label={__('Autoplay Delay', 'awesome-logo-carousel-block')}
                                    value={autoplayDelay}
                                    onChange={autoplayDelay => setAttributes({ autoplayDelay })}
                                    min={100}
                                    max={10000}
                                    step={100}
                                    onClickReset={() => setAttributes({ autoplayDelay: 2000 })}
                                />
                                <ToggleControl
                                    label={__('Pause Autoplay On Hover', 'awesome-logo-carousel-block')}
                                    checked={pauseOnHover}
                                    onChange={() =>
                                        setAttributes({
                                            pauseOnHover: !pauseOnHover
                                        })
                                    }
                                />
                                <ToggleControl
                                    label={__('Reserve Autoplay Direction', 'awesome-logo-carousel-block')}
                                    checked={reverseAutoplayDirection}
                                    onChange={() =>
                                        setAttributes({
                                            reverseAutoplayDirection: !reverseAutoplayDirection
                                        })
                                    }
                                />
                            </>
                        )}
                        <ToggleControl
                            label={__('Enable Infinite Loop', 'awesome-logo-carousel-block')}
                            checked={loop}
                            onChange={() => setAttributes({ loop: !loop })}
                        />
                        <ToggleControl
                            label={__('Enable Auto Height', 'awesome-logo-carousel-block')}
                            checked={autoHeight}
                            onChange={() => setAttributes({ autoHeight: !autoHeight })}
                        />
                        <ToggleControl
                            label={__('Enable Keyboard Control', 'awesome-logo-carousel-block')}
                            checked={keyboard}
                            onChange={() => setAttributes({ keyboard: !keyboard })}
                        />
                        <ToggleControl
                            label={__('Enable Mouse Control', 'awesome-logo-carousel-block')}
                            checked={mousewheel}
                            onChange={() => setAttributes({ mousewheel: !mousewheel })}
                        />
                    </PanelBody>
                    {enableLink && (
                        <PanelBody title={__('Logo Links', 'awesome-logo-carousel-block')} initialOpen={false}>
                            {images && images.length > 0 ? (
                                <>
                                    <SelectControl
                                        label={__('Link Type', 'awesome-logo-carousel-block')}
                                        value={linkType}
                                        options={[
                                            { label: __('Index Based', 'awesome-logo-carousel-block'), value: '' },
                                            { label: __('Logo Based', 'awesome-logo-carousel-block'), value: 'logo-based' }
                                        ]}
                                        onChange={linkType => setAttributes({ linkType })}
                                        labelPosition="side"
                                        help={__(
                                            'In index based, if you change logo, links will be removed. In logo based, links will remain the same. But you have to set links for each logo in Media Library.',
                                            'awesome-logo-carousel-block'
                                        )}
                                    />
                                    {linkType === 'logo-based' && (
                                        <p className="alcb-info-text">
                                            {__(
                                                'Note: Make sure to set links in each logo settings in Media Library.',
                                                'awesome-logo-carousel-block'
                                            )}
                                            <a
                                                href="https://logocarousel.gutenbergkits.com/wp-content/uploads/2025/11/insert-logo-scaled.png"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {__('Learn More', 'awesome-logo-carousel-block')}
                                            </a>
                                        </p>
                                    )}
                                    <ToggleControl
                                        label={__('Open links in new tab?', 'awesome-logo-carousel-block')}
                                        checked={openInNewTab}
                                        onChange={() => setAttributes({ openInNewTab: !openInNewTab })}
                                    />
                                    {linkType !== 'logo-based' &&
                                        images.map((logo, index) => (
                                            <div key={index} className="alcb-logo-link-wrapper">
                                                <div className="logo">
                                                    <div className="logo-preview">
                                                        <img src={logo.url} alt={logo.alt} />
                                                    </div>
                                                    <img src={logo.url} alt={logo.alt} />
                                                </div>
                                                <TextControl
                                                    value={logoLinks[index]}
                                                    onChange={v => {
                                                        const newLinks = [...logoLinks];
                                                        newLinks[index] = v;
                                                        setAttributes({ logoLinks: newLinks });
                                                    }}
                                                    placeholder={__('Enter URL', 'awesome-logo-carousel-block')}
                                                />
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <>
                                    <p>{__('Please add logos to enable links.', 'awesome-logo-carousel-block')}</p>
                                </>
                            )}
                        </PanelBody>
                    )}
                    {showCaption && (
                        <PanelBody title={__('Caption', 'awesome-logo-carousel-block')} initialOpen={false}>
                            <ButtonsGroupControl
                                label={__('Visible On', 'awesome-logo-carousel-block')}
                                options={VISIBLES}
                                value={captionVisibility}
                                onChange={v =>
                                    setAttributes({
                                        captionVisibility: v
                                    })
                                }
                            />
                        </PanelBody>
                    )}
                    {showNav && (
                        <PanelBody title={__('Navigation', 'awesome-logo-carousel-block')} initialOpen={false}>
                            <SelectControl
                                label={__('Position', 'awesome-logo-carousel-block')}
                                value={navPosition}
                                options={applyFilters('alcb.navOptions', NAV_POSITIONS)}
                                onChange={navPosition => setAttributes({ navPosition })}
                                labelPosition="side"
                            />
                            {alcbData?.hasPro === '1' ? (
                                <ToggleControl
                                    label={__('Custom Navigation', 'awesome-logo-carousel-block')}
                                    checked={customNavigation}
                                    onChange={() => setAttributes({ customNavigation: !customNavigation })}
                                />
                            ) : (
                                <ProWrapper>
                                    <ToggleControl
                                        label={__('Custom Navigation', 'awesome-logo-carousel-block')}
                                        checked={customNavigation}
                                        onChange={() => setAttributes({ customNavigation: !customNavigation })}
                                    />
                                </ProWrapper>
                            )}
                            {customNavigation && (
                                <>
                                    <SwitcherControl
                                        normal={
                                            <>
                                                {prevNav && prevNav?.url ? (
                                                    <Preview
                                                        url={prevNav?.url}
                                                        id={prevNav?.id}
                                                        alt={prevNav?.alt}
                                                        onDelete={() =>
                                                            setAttributes({
                                                                prevNav: {
                                                                    id: '',
                                                                    url: '',
                                                                    alt: ''
                                                                }
                                                            })
                                                        }
                                                    />
                                                ) : (
                                                    <UploadBtn
                                                        title={__('Upload for Previous', 'awesome-logo-carousel-block')}
                                                        id={prevNav?.id}
                                                        onSelect={v =>
                                                            setAttributes({
                                                                prevNav: {
                                                                    id: v.id,
                                                                    url: v.url,
                                                                    alt: v.alt
                                                                }
                                                            })
                                                        }
                                                    />
                                                )}
                                            </>
                                        }
                                        hover={
                                            <>
                                                {nextNav && nextNav?.url ? (
                                                    <Preview
                                                        url={nextNav?.url}
                                                        id={nextNav?.id}
                                                        alt={nextNav?.alt}
                                                        onDelete={() =>
                                                            setAttributes({
                                                                nextNav: {
                                                                    id: '',
                                                                    url: '',
                                                                    alt: ''
                                                                }
                                                            })
                                                        }
                                                    />
                                                ) : (
                                                    <UploadBtn
                                                        title={__('Upload for Next', 'awesome-logo-carousel-block')}
                                                        id={nextNav?.id}
                                                        onSelect={v =>
                                                            setAttributes({
                                                                nextNav: {
                                                                    id: v.id,
                                                                    url: v.url,
                                                                    alt: v.alt
                                                                }
                                                            })
                                                        }
                                                    />
                                                )}
                                            </>
                                        }
                                        options={[
                                            {
                                                label: __('Previous', 'awesome-logo-carousel-block'),
                                                value: 'normal'
                                            },
                                            {
                                                label: __('Next', 'awesome-logo-carousel-block'),
                                                value: 'hover'
                                            }
                                        ]}
                                    />
                                </>
                            )}
                        </PanelBody>
                    )}
                    {showPagination && (
                        <PanelBody title={__('Pagination', 'awesome-logo-carousel-block')} initialOpen={false}>
                            {alcbData?.hasPro === '1' ? (
                                <SelectControl
                                    label={__('Type', 'awesome-logo-carousel-block')}
                                    value={paginationType}
                                    options={PAG_TYPES}
                                    onChange={paginationType => setAttributes({ paginationType })}
                                    labelPosition="side"
                                />
                            ) : (
                                <ProWrapper>
                                    <SelectControl
                                        label={__('Type', 'awesome-logo-carousel-block')}
                                        value={paginationType}
                                        options={PAG_TYPES}
                                        onChange={paginationType => setAttributes({ paginationType })}
                                        labelPosition="side"
                                    />
                                </ProWrapper>
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
                    <PanelBody title={__('Container', 'awesome-logo-carousel-block')} initialOpen={true}>
                        <ResBoxControl label={__('Padding', 'awesome-logo-carousel-block')} controlName={ITEM_PADDING} />
                    </PanelBody>
                    <PanelBody title={__('Logo Style', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <ResRangeControl
                            label={__('Max Width', 'awesome-logo-carousel-block')}
                            controlName={LOGO_MWIDTH}
                            objAttrs={objAttrs}
                            min={50}
                            max={500}
                            units={['px', '%']}
                        />
                        <SelectControl
                            label={__('Hover Effect', 'awesome-logo-carousel-block')}
                            value={logoHoverStyle}
                            options={HOVER_EFFECTS}
                            onChange={logoHoverStyle => {
                                setAttributes({ logoHoverStyle });
                            }}
                            labelPosition="side"
                        />
                        <SelectControl
                            label={__('Border Style', 'awesome-logo-carousel-block')}
                            value={borderStyle}
                            options={BORDER_STYLES}
                            onChange={borderStyle => {
                                setAttributes({ borderStyle });
                            }}
                            labelPosition="side"
                        />
                        {borderStyle !== 'none' && (
                            <>
                                <UnitControl
                                    label={__('Border Width', 'awesome-logo-carousel-block')}
                                    units={[]}
                                    onChange={borderWidth => setAttributes({ borderWidth })}
                                    value={borderWidth}
                                    min={0}
                                    type="number"
                                />
                                <ColorControl
                                    label={__('Border Color', 'awesome-logo-carousel-block')}
                                    value={borderColor}
                                    onChange={borderColor => setAttributes({ borderColor })}
                                />
                            </>
                        )}
                        <CardDivider />
                        <SingleRangeControl
                            label={__('Border Radius', 'awesome-logo-carousel-block')}
                            value={borderRadius}
                            onChange={v =>
                                setAttributes({
                                    borderRadius: v
                                })
                            }
                            min={0}
                            max={50}
                            step={1}
                            onClickReset={() =>
                                setAttributes({
                                    borderRadius: 0
                                })
                            }
                        />
                        <ResBoxControl label={__('Padding', 'awesome-logo-carousel-block')} controlName={LOGO_PADDING} />
                        <BackgroundControl label={__('Background', 'awesome-logo-carousel-block')} controlName={LOGO_BG} />
                    </PanelBody>
                    {showCaption && (
                        <PanelBody title={__('Caption', 'awesome-logo-carousel-block')} initialOpen={false}>
                            <ColorControl
                                label={__('Color', 'awesome-logo-carousel-block')}
                                value={captionColor}
                                onChange={V =>
                                    setAttributes({
                                        captionColor: V
                                    })
                                }
                            />
                            <ColorControl
                                label={__('Background', 'awesome-logo-carousel-block')}
                                value={captionBg}
                                onChange={V =>
                                    setAttributes({
                                        captionBg: V
                                    })
                                }
                            />
                        </PanelBody>
                    )}
                </div>
                {showNav && (
                    <PanelBody title={__('Navigation', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <ResRangeControl
                            label={__('Width', 'awesome-logo-carousel-block')}
                            controlName={NAV_WIDTH}
                            objAttrs={objAttrs}
                            min={1}
                            max={100}
                            units={['px', 'em', 'rem']}
                        />
                        <ResRangeControl
                            label={__('Height', 'awesome-logo-carousel-block')}
                            controlName={NAV_HEIGHT}
                            objAttrs={objAttrs}
                            min={1}
                            max={100}
                            units={['px', 'em', 'rem']}
                        />
                        <ResRangeControl
                            label={__('Icon Size', 'awesome-logo-carousel-block')}
                            controlName={NAV_ICON_SIZE}
                            objAttrs={objAttrs}
                            min={1}
                            max={100}
                            units={['px', 'em', 'rem']}
                        />

                        <BorderControl controlName={NAV_BORDER} objAttrs={objAttrs} />
                        <ResBoxControl
                            label={__('Border Radius', 'awesome-logo-carousel-block')}
                            controlName={NAV_BRADIUS}
                            min={0}
                            max={50}
                            units={['px', 'em', 'rem']}
                        />
                        <ResBoxControl label={__('Margin', 'awesome-logo-carousel-block')} controlName={NAV_MARGIN} min={-500} max={500} />
                        <SwitcherControl
                            normal={
                                <Fragment>
                                    <ColorControl
                                        label={__('Color', 'slider-blocks')}
                                        value={iconColor}
                                        onChange={v => {
                                            setAttributes({
                                                iconColor: v
                                            });
                                        }}
                                    />
                                    <BackgroundControl
                                        label={__('Background', 'awesome-logo-carousel-block')}
                                        controlName={NAV_BG}
                                        objAttrs={objAttrs}
                                    />
                                </Fragment>
                            }
                            hover={
                                <Fragment>
                                    <ColorControl
                                        label={__('Color', 'slider-blocks')}
                                        value={iconHoverColor}
                                        onChange={v => {
                                            setAttributes({
                                                iconHoverColor: v
                                            });
                                        }}
                                    />
                                    <BackgroundControl
                                        label={__('Background', 'awesome-logo-carousel-block')}
                                        controlName={NAV_HOVER_BG}
                                        objAttrs={objAttrs}
                                    />
                                </Fragment>
                            }
                        />
                    </PanelBody>
                )}

                {showPagination && (
                    <PanelBody title={__('Pagination', 'awesome-logo-carousel-block')} initialOpen={false}>
                        <ResBoxControl label={__('Margin', 'awesome-logo-carousel-block')} controlName={PAGI_MARGIN} min={-500} max={500} />
                        <SwitcherControl
                            options={[
                                {
                                    label: __('Normal', 'slider-blocks'),
                                    value: 'normal'
                                },
                                {
                                    label: __('Active', 'slider-blocks'),
                                    value: 'hover'
                                }
                            ]}
                            normal={
                                <Fragment>
                                    <ResRangeControl
                                        label={__('Width', 'awesome-logo-carousel-block')}
                                        controlName={INACRIVE_PAGI_WIDTH}
                                        objAttrs={objAttrs}
                                        min={1}
                                        max={100}
                                        units={['px', 'em', 'rem']}
                                    />
                                    <ResRangeControl
                                        label={__('Height', 'awesome-logo-carousel-block')}
                                        controlName={INACTIVE_PAGI_HEIGHT}
                                        objAttrs={objAttrs}
                                        min={1}
                                        max={100}
                                        units={['px', 'em', 'rem']}
                                    />
                                </Fragment>
                            }
                            hover={
                                <Fragment>
                                    <ResRangeControl
                                        label={__('Width', 'awesome-logo-carousel-block')}
                                        controlName={ACTIVE_PAGI_WIDTH}
                                        objAttrs={objAttrs}
                                        min={1}
                                        max={100}
                                        units={['px', 'em', 'rem']}
                                    />
                                    <ResRangeControl
                                        label={__('Height', 'awesome-logo-carousel-block')}
                                        controlName={ACTIVE_PAGI_HEIGHT}
                                        objAttrs={objAttrs}
                                        min={1}
                                        max={100}
                                        units={['px', 'em', 'rem']}
                                    />
                                </Fragment>
                            }
                        />
                        <ColorControl
                            label={__('Color', 'awesome-logo-carousel-block')}
                            value={pagiColor}
                            onChange={v => {
                                setAttributes({
                                    pagiColor: v
                                });
                            }}
                        />
                        <BorderControl controlName={PAGI_BORDER} objAttrs={objAttrs} />
                        <ResBoxControl
                            label={__('Border Radius', 'awesome-logo-carousel-block')}
                            controlName={PAGI_BRADIUS}
                            min={0}
                            max={50}
                            units={['px', 'em', 'rem']}
                        />
                    </PanelBody>
                )}
            </InspectorControls>
        </>
    );
};

export default Inspect;
