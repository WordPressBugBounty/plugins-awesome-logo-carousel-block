/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ResLabelControl from '../res-label-control';
import ResetButton from '../reset-btn';
const SingleRangeControl = ({ label, value, onChange, onClickReset, min = 0, max = 100, step = 1 }) => {
    return (
        <div className="alcb-control-container">
            <ResLabelControl label={label} noResBtns={true} />
            <div className="alcb-controls-body">
                <ResetButton onReset={onClickReset} value={value}>
                    <RangeControl value={value} onChange={v => onChange(v)} min={min} max={max} step={step} />
                </ResetButton>
            </div>
        </div>
    );
};

export default SingleRangeControl;
