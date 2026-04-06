import { Button, Modal, RangeControl, TextareaControl } from '@wordpress/components';
import { RawHTML, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const CustomSVGModal = ({ customSVGPanel, setCustomSVGPanel, onInsert, value }) => {
    const [code, setCode] = useState(value || '');
    const [size, setSize] = useState(30);
    return (
        <div className="alcb-icon-picker">
            {customSVGPanel && (
                <Modal
                    className="svgib__modal custom-svg"
                    title={__('Custom SVG', 'awesome-logo-carousel-block')}
                    onRequestClose={() => setCustomSVGPanel(false)}
                >
                    <style>
                        {`.svg-preview svg{
                            width: ${size}px;
                            height: ${size}px;
                        }`}
                    </style>
                    <div className="svg-controls">
                        <RangeControl
                            label={__('SVG Preview Size', 'awesome-logo-carousel-block')}
                            value={size}
                            onChange={v => setSize(v)}
                            min={1}
                            max={150}
                        />
                    </div>
                    <div className="alcb-modal__wrapper">
                        <div className="svg-code">
                            <TextareaControl
                                help={__('Paste your SVG code here.', 'awesome-logo-carousel-block')}
                                value={code}
                                onChange={v => setCode(v)}
                                placeholder={__('Paste your SVG code here.', 'awesome-logo-carousel-block')}
                            />
                        </div>
                        <div className="svg-preview">
                            {code ? (
                                <RawHTML>{code}</RawHTML>
                            ) : (
                                <div className="preview-text">{__('SVG Preview', 'awesome-logo-carousel-block')}</div>
                            )}
                        </div>
                    </div>
                    <div className="insert-svg">
                        <Button variant="primary" onClick={() => onInsert(code)}>
                            {__('Insert SVG', 'awesome-logo-carousel-block')}
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CustomSVGModal;
