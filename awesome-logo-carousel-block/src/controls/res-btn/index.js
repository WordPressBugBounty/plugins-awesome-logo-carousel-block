/**
 * WordPress dependencies
 */
import { Button, ButtonGroup, Dropdown } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

// Internal dependencies
import { RES_DEVICES } from '../../constants';

const ResBtn = () => {
    const { usePanelProps } = window?.alcbModules?.Helpers;
    const { attributes, setAttributes } = usePanelProps();
    const { resMode } = attributes;

    const previewMode = wp.data.select('core/editor').getDeviceType(); // get current device type

    useEffect(() => {
        // set the default device type
        if (!previewMode) {
            wp.data.dispatch('core/editor').setDeviceType('Desktop');
        }
        setAttributes({ resMode: previewMode });
    }, [previewMode]);

    return (
        <Dropdown
            className="alcb-units-dropdown"
            contentClassName="alcb-units-content-wrapper"
            position="bottom right"
            renderToggle={({ isOpen, onToggle }) => (
                <button className="alcb-selected-unit" onClick={onToggle} aria-expanded={isOpen}>
                    {RES_DEVICES.find(device => device.value === previewMode).icon}
                </button>
            )}
            renderContent={() => (
                <div className="alcb-res-btn">
                    <ButtonGroup>
                        {RES_DEVICES &&
                            RES_DEVICES.map((device, index) => {
                                return (
                                    <Button
                                        key={index}
                                        className={`alcb-device-btn ${previewMode === device.value ? 'alcb-active' : ''}`}
                                        onClick={() => {
                                            setAttributes({ resMode: device.value });
                                            wp.data.dispatch('core/editor').setDeviceType(device.value);
                                        }}
                                        title={device.label}
                                    >
                                        {device.icon}
                                    </Button>
                                );
                            })}
                    </ButtonGroup>
                </div>
            )}
        />
    );
};

export default ResBtn;
