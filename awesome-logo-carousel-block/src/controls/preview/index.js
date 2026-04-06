/**
 * WordPress dependencies
 */
import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const Preview = ({ url, id, alt = '', onSelect, onDelete, svgFormat = false }) => {
    return (
        <div className={`gutslider-image-preview ${svgFormat ? 'svg' : ''}`}>
            <img src={url} alt={alt || 'placeholder alt'} />
            <MediaUpload
                onSelect={media => onSelect(media)}
                allowedTypes={['image']}
                value={id}
                render={({ open }) => <Button onClick={open} className="edit-btn" icon="edit" />}
            />
            <Button className="remove-btn" icon="no-alt" onClick={onDelete} />
        </div>
    );
};

export default Preview;
