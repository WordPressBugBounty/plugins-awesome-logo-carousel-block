import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
const { LinkControl, ProControl } = window?.alcbModules;

const Inspect = ({ attributes, setAttributes }) => {
    const { showDesc, link, enableLink, captionVisibility, caption, logoHoverStyle, description } = attributes;
    return (
        <>
            <InspectorControls>
                <div className="alcb-panels">
                    <PanelBody>
                        {enableLink && (
                            <LinkControl
                                label={__('Link', 'awesome-logo-carousel-block')}
                                value={link}
                                onChange={link => setAttributes({ link })}
                            />
                        )}
                        {captionVisibility && (
                            <TextControl
                                label={__('Caption', 'awesome-logo-carousel-block')}
                                value={caption}
                                onChange={caption => setAttributes({ caption })}
                            />
                        )}
                        {showDesc && (
                            <TextareaControl
                                label={__('Description', 'awesome-logo-carousel-block')}
                                value={description}
                                onChange={description => setAttributes({ description })}
                            />
                        )}
                    </PanelBody>
                    <ProControl>
                        <p>{__('Unlock more features with the Pro version.', 'awesome-logo-carousel-block')}</p>
                        <a href="https://logocarousel.gutenbergkits.com/" target="_blank" rel="noopener noreferrer">
                            {__('Upgrade to Pro', 'awesome-logo-carousel-block')}
                            <span className="dashicons dashicons-external"></span>
                        </a>
                    </ProControl>
                </div>
            </InspectorControls>
        </>
    );
};

export default Inspect;
