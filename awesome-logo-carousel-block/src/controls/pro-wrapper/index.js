import { __ } from '@wordpress/i18n';

const ProWrapper = ({ children }) => {
    return (
        <div className="pro-wrapper">
            <span className="pro-badge-text">{__('Pro', 'awesome-logo-carousel-block')}</span>
            {children}
        </div>
    );
};

export default ProWrapper;
