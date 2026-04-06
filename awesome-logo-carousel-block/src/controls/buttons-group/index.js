/**
 * WordPress dependencies
 */
import { Button, ButtonGroup, Tooltip } from '@wordpress/components';

/**
 * Internal dependencies
 */
import classNames from 'classnames';
import ResLabelControl from '../res-label-control';

const ButtonsGroupControl = ({ label = '', value, onChange, options, hasIcons = false, labelPosition = '', width = '' }) => {
    return (
        <div className={classNames('alcb-control-container', 'alcb-btns-group', labelPosition)}>
            {label && (
                <div className={classNames(labelPosition === '' ? 'alcb-mb-8' : 'alcb-btn-group-label')}>
                    <ResLabelControl label={label} noResBtns={true} />
                </div>
            )}
            <ButtonGroup
                {...(width && {
                    style: {
                        width: width
                    }
                })}
            >
                {options &&
                    options.map((btn, index) => {
                        return (
                            <Tooltip key={index} text={btn.label}>
                                <Button
                                    className={`alcb-btn ${btn.value === value ? 'alcb-btn-active' : ''}`}
                                    aria-pressed={btn.value === value}
                                    onClick={() => onChange(btn.value)}
                                    disabled={btn.disabled}
                                    title={btn.label}
                                >
                                    {hasIcons ? btn.icon : btn.label}
                                </Button>
                            </Tooltip>
                        );
                    })}
            </ButtonGroup>
        </div>
    );
};

export default ButtonsGroupControl;
