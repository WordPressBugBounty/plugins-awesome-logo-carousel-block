/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';

// constants
import { FLEX_HORIZONTAL_ALIGNS, FLEX_VERTICAL_ALIGNS, PREFIX, TEXT_ALIGNS } from '../../constants';

// Internal dependencies
import ButtonsGroupControl from '../buttons-group';
import ResLabelControl from '../res-label-control';

const AlignmentControl = ({ instanceId, label, controlName, objAttrs, flexAlign = false, flexVerticle = false }) => {
    const { attributes, setAttributes } = objAttrs;
    const { resMode } = attributes;

    const { [`${PREFIX}${controlName}Aligns`]: aligns } = attributes;

    const id = `alignment-control-${instanceId}`;

    const flexAlignOptions = flexVerticle ? FLEX_VERTICAL_ALIGNS : FLEX_HORIZONTAL_ALIGNS;
    const alignmentOptions = flexAlign ? flexAlignOptions : TEXT_ALIGNS;

    const getButtonGroupProps = mode => ({
        value: aligns && aligns[mode],
        onChange: value =>
            setAttributes({
                [`${PREFIX}${controlName}Aligns`]: {
                    ...aligns,
                    [mode]: value
                }
            }),
        options: alignmentOptions,
        hasIcons: true
    });

    const responsiveModes = {
        Desktop: 'desk',
        Tablet: 'tab',
        Mobile: 'mob'
    };

    return (
        <div className="alcb-control-container">
            <div className="alcb-mb-8">
                <ResLabelControl
                    id={id}
                    label={label}
                    requiredProps={{
                        id,
                        resMode,
                        setAttributes,
                        attributes
                    }}
                />
            </div>
            {resMode in responsiveModes && <ButtonsGroupControl {...getButtonGroupProps(responsiveModes[resMode])} />}
        </div>
    );
};

export default withInstanceId(AlignmentControl);
