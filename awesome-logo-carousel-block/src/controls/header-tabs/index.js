/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';

const HeaderTabs = ({ generalControls, styleControls }) => {
    return (
        <>
            <InspectorControls group="settings">
                <div className="alcb-panels">{generalControls}</div>
            </InspectorControls>
            <InspectorControls group="styles">
                <div className="alcb-panels">{styleControls}</div>
            </InspectorControls>
        </>
    );
};

export default HeaderTabs;
