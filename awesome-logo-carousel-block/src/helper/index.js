/**
 * WordPress Dependencies
 */
import { store as BlockEditorStore } from '@wordpress/block-editor';
import { select, useDispatch, useSelect } from '@wordpress/data';
import { useCallback, useMemo } from '@wordpress/element';

// Handle Unique ID
export const handleUniqueId = ({ sliderId, setAttributes, clientId }) => {
    const generateUniqueId = `alcb-block-${Math.random().toString(36).substr(2, 8)}`;

    if (!sliderId) {
        setAttributes({ sliderId: generateUniqueId });
        return;
    }

    const allBlocks = select('core/block-editor').getBlocks();
    let duplicateFound = false;

    const fixDuplicateUniqueId = blocks => {
        if (duplicateFound) return;
        for (const {
            attributes: { sliderId: id },
            clientId: idClient,
            innerBlocks
        } of blocks) {
            if (id === sliderId) {
                if (idClient !== clientId) {
                    setAttributes({ sliderId: generateUniqueId });
                    duplicateFound = true;
                    return;
                }
            }
            if (innerBlocks.length > 0) {
                fixDuplicateUniqueId(innerBlocks);
            }
        }
    };

    fixDuplicateUniqueId(allBlocks);
};

// Style Generator
export const styleGenerator = ($selector, $styles = []) => {
    let styles = '';
    $styles.forEach($style => {
        if ($style?.v !== '' && $style?.v !== undefined) {
            if ($style?.p) {
                styles += `${$style.p}:${$style.v};`;
            } else {
                styles += `${$style.v}`;
            }
        }
    });
    // Only return the full selector + styles if we actually have styles
    return styles ? `${$selector}{${styles}}` : '';
};

// Soft Minify CSS Strings
export const softMinifyCssStrings = (cssString = ' ') =>
    cssString.replace(/\s+/g, ' ').replace(/\.zb\-[\w\-\s\.\,\:\>\(\)\d\+\[\]\#\>]+\{[\s]+\}/g, '');

// Array to String
export const classArrToString = classess => {
    if (typeof classess !== 'object') {
        return '';
    }
    const uniqueClassess = [...new Set(classess)];

    return uniqueClassess.join(' ');
};

// Generate link props
export const generateLinkProps = btnLink => {
    const linkRel = [
        btnLink?.openInNewTab && 'noopener noreferrer',
        btnLink?.addNoFollow && 'nofollow',
        btnLink?.addSponsored && 'sponsored'
    ]
        .filter(Boolean)
        .join(' ');

    return {
        ...(linkRel && { rel: linkRel }),
        ...(btnLink?.openInNewTab && { target: '_blank' })
    };
};

// extract icon name
export const extractIconName = icon => {
    // replace - and space with _
    const iconName = icon.replace(/-/g, '_').replace(/\s/g, '_');
    // remove fab_fa_ or fa_brands_fa_ from icon name
    const iconClass = iconName.replace('fab_fa_', '').replace('fa_brands_fa_', '');

    return iconClass;
};

// usePanelProps
export const usePanelProps = () => {
    const { attributes, clientId } = useSelect(select => {
        const { getSelectedBlock } = select(BlockEditorStore);
        const selectedBlock = getSelectedBlock();
        return {
            attributes: selectedBlock ? selectedBlock.attributes : {},
            clientId: selectedBlock ? selectedBlock.clientId : ''
        };
    }, []);

    const { updateBlockAttributes } = useDispatch(BlockEditorStore);

    const setAttributes = useCallback(
        newAttributes => {
            updateBlockAttributes(clientId, newAttributes);
        },
        [clientId, updateBlockAttributes]
    );

    return useMemo(() => ({ attributes, setAttributes }), [attributes, setAttributes]);
};
