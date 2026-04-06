/**
 * Internal dependencies
 */
import ResBtn from '../res-btn';

const ResLabelControl = ({ label, noResBtns = false }) => {
    const { usePanelProps } = window?.alcbModules?.Helpers;
    const { attributes, setAttributes } = usePanelProps();

    return (
        <div className="alcb-res-label-control">
            <label className="alcb-label">{label}</label>
            {!noResBtns && <ResBtn setAttributes={setAttributes} attributes={attributes} />}
        </div>
    );
};

export default ResLabelControl;
