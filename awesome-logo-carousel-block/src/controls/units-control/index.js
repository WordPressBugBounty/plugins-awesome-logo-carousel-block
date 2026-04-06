import { Dropdown } from '@wordpress/components';

const UnitsControl = ({ value, onChange, units }) => {
    return (
        <Dropdown
            className="alcb-units-dropdown"
            contentClassName="alcb-units-content-wrapper"
            position="bottom right"
            renderToggle={({ isOpen, onToggle }) => (
                <button className="alcb-selected-unit" onClick={onToggle} aria-expanded={isOpen}>
                    {value}
                </button>
            )}
            renderContent={() => (
                <div className="alcb-units-wrapper">
                    {units &&
                        units.map((u, index) => {
                            return (
                                <button
                                    className={`unit-btn ${u === value ? 'alcb-active' : ''}`}
                                    key={index}
                                    onClick={() => {
                                        onChange(u);
                                    }}
                                >
                                    {u}
                                </button>
                            );
                        })}
                </div>
            )}
        />
    );
};

export default UnitsControl;
