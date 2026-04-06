/**
 * WordPress dependencies
 */
import { Button, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ResetButton = ({ children, onReset, value }) => {
    return (
        <div className="alcb-reset-control">
            <Flex
                justify={{
                    justifyContent: 'flex-start'
                }}
            >
                <FlexItem>
                    <Button
                        icon="image-rotate"
                        label={__('Reset', 'awesome-logo-carousel-block')}
                        onClick={() => onReset()}
                        className={`alcb-reset-button range-btn ${value && typeof value !== 'object' ? 'active' : 'disabled'}`}
                    />
                </FlexItem>
                {children && <FlexBlock>{children}</FlexBlock>}
            </Flex>
        </div>
    );
};

export default ResetButton;
