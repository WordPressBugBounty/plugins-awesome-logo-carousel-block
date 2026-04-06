/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { PREFIX } from '../../constants';
import ButtonsGroupControl from '../buttons-group';
import ResLabelControl from '../res-label-control';

const ResButtonsGroupControl = ({ instanceId, label = '', controlName, objAttrs, options = [], hasIcons = true }) => {
    const { attributes, setAttributes } = objAttrs;
    const { resMode } = attributes;

    const {
        [`${PREFIX}${controlName}Desk`]: deskValue,
        [`${PREFIX}${controlName}Tab`]: tabValue,
        [`${PREFIX}${controlName}Mob`]: mobValue
    } = attributes;

    const id = `res-buttons-group-control-${instanceId}`;

    return (
        <div className="alcb-btns-group-alt">
            {label && (
                <div className="alcb-mb-8">
                    <ResLabelControl
                        id={id}
                        label={label}
                        requiredProps={{
                            id,
                            resMode,
                            setAttributes
                        }}
                    />
                </div>
            )}
            {resMode === 'Desktop' && (
                <ButtonsGroupControl
                    value={deskValue}
                    onChange={value =>
                        setAttributes({
                            [`${PREFIX}${controlName}Desk`]: value
                        })
                    }
                    options={options}
                    hasIcons={hasIcons}
                />
            )}
            {resMode === 'Tablet' && (
                <ButtonsGroupControl
                    value={tabValue}
                    onChange={value =>
                        setAttributes({
                            [`${PREFIX}${controlName}Tab`]: value
                        })
                    }
                    options={options}
                    hasIcons={hasIcons}
                />
            )}
            {resMode === 'Mobile' && (
                <ButtonsGroupControl
                    value={mobValue}
                    onChange={value =>
                        setAttributes({
                            [`${PREFIX}${controlName}Mob`]: value
                        })
                    }
                    options={options}
                    hasIcons={hasIcons}
                />
            )}
        </div>
    );
};

export default withInstanceId(ResButtonsGroupControl);
