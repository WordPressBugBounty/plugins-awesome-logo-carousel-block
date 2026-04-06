/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

const tabOptions = [
    {
        label: __('Normal', 'awesome-logo-carousel-block'),
        value: 'normal'
    },
    {
        label: __('Hover', 'awesome-logo-carousel-block'),
        value: 'hover'
    }
];
const SwitcherControl = ({ normal, hover, options = [], className }) => {
    const [tab, setTab] = useState('normal');

    const Tabs = options.length > 0 ? options : tabOptions;

    return (
        <div className={classNames('alcb-control-container', 'alcb-switcher', 'alcb-mb-24', className)}>
            <ButtonGroup>
                {Tabs &&
                    Tabs.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                className={`switcher-button ${tab === item.value ? 'alcb-active' : ''}`}
                                onClick={() => setTab(item.value)}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
            </ButtonGroup>
            <div className="alcb-switcher-content">
                {tab === 'normal' && <div className="alcb-normal-content">{normal}</div>}
                {tab === 'hover' && <div className="alcb-hover-content">{hover}</div>}
            </div>
        </div>
    );
};

export default SwitcherControl;
