/**
 * WordPress dependencies
 */
import { Button, Flex, FlexBlock, FlexItem, Popover, TextControl, ToggleControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ResLabelControl from '../res-label-control';

const LinkControl = ({ instanceId, label, value, onChange, help = '', openInNewTab = true, addNoFollow = false, addSponsored = false }) => {
    const id = `link-control-${instanceId}`;
    const [linkExtra, setLinkExtra] = useState(false);

    return (
        <div className="alcb-control-container">
            <div className="alcb-mb-8">
                <ResLabelControl requiredProps={id} label={label} noResBtns={true} />
            </div>
            <div className="alcb-linked-control">
                <Flex>
                    <FlexBlock>
                        <TextControl
                            value={value && value.url}
                            onChange={url => {
                                onChange({
                                    ...value,
                                    url
                                });
                            }}
                        />
                    </FlexBlock>
                    {(openInNewTab || addNoFollow || addSponsored) && (
                        <FlexItem>
                            <Button
                                icon="admin-generic"
                                onClick={() => {
                                    setLinkExtra(true);
                                }}
                                className={`alcb-link-extra-btn ${linkExtra && 'alcb-le-active'}`}
                            />
                        </FlexItem>
                    )}
                </Flex>
                {help && <p className="svgib_custom__help">{help}</p>}
            </div>
            {linkExtra && (
                <Popover
                    position="bottom left"
                    className="alcb-link-extra-popover-container"
                    onClose={() => {
                        setLinkExtra(false);
                    }}
                    onFocusOutside={() => setLinkExtra(false)}
                    offset={8}
                >
                    <div className="alcb-link-extra-popover">
                        {openInNewTab && (
                            <ToggleControl
                                label={__('Open in new tab', 'awesome-logo-carousel-block')}
                                checked={value && value.openInNewTab}
                                onChange={() => {
                                    onChange({
                                        ...value,
                                        openInNewTab: !value.openInNewTab
                                    });
                                }}
                            />
                        )}
                        {addNoFollow && (
                            <ToggleControl
                                label={__('Add nofollow rel', 'awesome-logo-carousel-block')}
                                checked={value && value.addNoFollow}
                                onChange={() => {
                                    onChange({
                                        ...value,
                                        addNoFollow: !value.addNoFollow
                                    });
                                }}
                            />
                        )}
                        {addSponsored && (
                            <ToggleControl
                                label={__('Add sponsored rel', 'awesome-logo-carousel-block')}
                                checked={value && value.addSponsored}
                                onChange={() => {
                                    onChange({
                                        ...value,
                                        addSponsored: !value.addSponsored
                                    });
                                }}
                            />
                        )}
                    </div>
                </Popover>
            )}
        </div>
    );
};
export default withInstanceId(LinkControl);
