import {
    BlockControls,
    MediaPlaceholder,
    MediaUpload,
    MediaUploadCheck,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import PatternsModal from '../pattern';
import BlockPlaceholder from '../../controls/block-placeholder';
import blockIcon from './icon';
import classnames from 'classnames';

const { handleUniqueId } = window?.alcbModules?.Helpers || {};
const { DynamicTag } = window?.alcbModules || {};

// editor style
import './editor.scss';
import Inspect from './inspect';

// dynamic style
import DynamicStyle from './style';

export default function Edit(props) {
    const { attributes, setAttributes, clientId, isSelected, context } = props;
    const { sliderId, showPagination, images, enableLink, patternMode, openModal } = attributes;

    // Get dispatch functions
    const { replaceInnerBlocks } = useDispatch('core/block-editor');

    // Get current inner blocks
    const currentInnerBlocks = useSelect(select => select('core/block-editor').getBlocks(clientId), [clientId]);

    const isEmpty = (!images || images.length === 0) && currentInnerBlocks.length === 0;

    // Block ID
    useEffect(() => {
        handleUniqueId({ sliderId, setAttributes, clientId });
    }, []);

    // Smart update of inner blocks when images change
    useEffect(() => {
        if (images && images.length > 0) {
            // Create a map of existing blocks by their photo ID for quick lookup
            const existingBlocksMap = {};
            currentInnerBlocks.forEach(block => {
                if (block.attributes.photo && block.attributes.photo.id) {
                    existingBlocksMap[block.attributes.photo.id] = block;
                }
            });

            // Create or update inner blocks based on current images
            const newInnerBlocks = images.map(img => {
                // If we already have a block with this image, preserve it (and its attributes)
                if (existingBlocksMap[img.id]) {
                    const existingBlock = existingBlocksMap[img.id];
                    // Update only the photo attribute if necessary
                    if (JSON.stringify(existingBlock.attributes.photo) !== JSON.stringify(img)) {
                        return {
                            ...existingBlock,
                            attributes: {
                                ...existingBlock.attributes,
                                photo: img
                            }
                        };
                    }
                    return existingBlock;
                }

                // Otherwise create a new block
                return window.wp.blocks.createBlock('lcb/logo', {
                    photo: img
                });
            });

            // Only replace inner blocks if there are actual changes
            if (
                JSON.stringify(newInnerBlocks.map(block => block.attributes.photo?.id)) !==
                JSON.stringify(currentInnerBlocks.map(block => block.attributes.photo?.id))
            ) {
                replaceInnerBlocks(clientId, newInnerBlocks, false);
            }
        }
    }, [images, currentInnerBlocks]); // Run when images or inner blocks change

    const innerBlocksPros = useInnerBlocksProps(
        {
            className: 'gallery-inner'
        },
        {
            templateLock: false,
            allowedBlocks: ['lcb/logo']
        }
    );

    return (
        <Fragment>
            {images && (
                <BlockControls>
                    <ToolbarGroup>
                        <MediaUploadCheck>
                            <MediaUpload
                                multiple={true}
                                onSelect={media =>
                                    setAttributes({
                                        images: media
                                    })
                                }
                                gallery={true}
                                allowedTypes={['image']}
                                value={images.map(logo => logo.id)}
                                render={({ open }) => {
                                    return (
                                        <ToolbarButton label={__('Edit Logos', 'awesome-logo-carousel-block')} onClick={open} icon="edit" />
                                    );
                                }}
                            />
                        </MediaUploadCheck>
                    </ToolbarGroup>
                </BlockControls>
            )}

            {isSelected && <Inspect {...props} />}
            <DynamicStyle {...props} />
            {openModal && <PatternsModal {...props} />}
            <div
                {...useBlockProps({
                    className: classnames(sliderId, {
                        alcb__active_pagination: showPagination
                    })
                })}
            >
                {/*
                  * `isEmpty` also checks inner blocks, not just `images`. A grid
                  * that already holds lcb/logo children but has no `images`
                  * attribute — which is what a hand-authored or pattern-inserted
                  * grid looks like — would otherwise render the empty-state
                  * placeholder on top of real content.
                  */}
                {patternMode && isEmpty && (
                    <BlockPlaceholder
                        icon={blockIcon}
                        title={__('Logo Grid', 'awesome-logo-carousel-block')}
                        description={__(
                            'Display client and partner logos in a responsive grid. Start from a ready-made layout, or add your own logos straight away.',
                            'awesome-logo-carousel-block'
                        )}
                        primaryLabel={__('Choose a pattern', 'awesome-logo-carousel-block')}
                        onPrimary={() => setAttributes({ openModal: true })}
                        secondaryLabel={__('Add logos manually', 'awesome-logo-carousel-block')}
                        onSecondary={() => setAttributes({ patternMode: false, openModal: false })}
                        footnote={__('You can change the layout and styling at any time.', 'awesome-logo-carousel-block')}
                    />
                )}

                {!patternMode && isEmpty && (
                    <MediaPlaceholder
                        onSelect={v => {
                            setAttributes({ images: v });
                        }}
                        allowedTypes={['image']}
                        multiple={true}
                        labels={{ title: __('Upload Logos', 'awesome-logo-carousel-block') }}
                    />
                )}

                {images && images.length > 0 && (
                    <div {...innerBlocksPros} />
                )}
            </div>
        </Fragment>
    );
}
