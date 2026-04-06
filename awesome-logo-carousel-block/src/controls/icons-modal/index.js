import { Button, Modal, SearchControl } from '@wordpress/components';
import { RawHTML, useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { FixedSizeGrid as Grid } from 'react-window';

import icons from './icons.json';

const iconCategories = [
    {
        label: __('All Icons', 'awesome-logo-carousel-block'),
        value: 'all',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H21" stroke="#454552" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7.1875 12H17.8125" stroke="#454552" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10.375 17H14.625" stroke="#454552" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        label: __('Font Awesome - Regular', 'awesome-logo-carousel-block'),
        value: 'regular',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.58824 3.5H19.4118C19.9827 3.5 20.5 4.01732 20.5 4.58824V19.4118C20.5 19.9827 19.9827 20.5 19.4118 20.5H4.58824C4.01732 20.5 3.5 19.9827 3.5 19.4118V4.58824C3.5 4.01732 4.01732 3.5 4.58824 3.5Z"
                    stroke="#454552"
                />
                <path
                    d="M7.8999 6.39998C8.1999 6.39998 8.3999 6.59998 8.3999 6.89998L8.3999 18.1C8.3999 18.4 8.1999 18.6 7.8999 18.6C7.5999 18.6 7.3999 18.4 7.3999 18.1L7.3999 6.79998C7.4999 6.59998 7.6999 6.39998 7.8999 6.39998Z"
                    fill="#454552"
                />
                <path
                    d="M7.9 7.8C8.39706 7.8 8.8 7.39706 8.8 6.9C8.8 6.40294 8.39706 6 7.9 6C7.40294 6 7 6.40294 7 6.9C7 7.39706 7.40294 7.8 7.9 7.8Z"
                    fill="#454552"
                />
                <path
                    d="M8.3 14.4C11.4 12.9 14.4 16.3 17.5 14.6C17.6 14.6 17.6 14.5 17.6 14.4V8.70004C17.6 8.50004 17.4 8.40004 17.3 8.50004C14.3 10 11.2 6.60004 8.2 8.30004C8.1 8.30004 8 8.40004 8 8.50004V14.2C8 14.3 8.2 14.4 8.3 14.4Z"
                    fill="#454552"
                />
            </svg>
        )
    },
    {
        label: __('Font Awesome - Solid', 'awesome-logo-carousel-block'),
        value: 'solid',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.58824 3H19.4118C20.2588 3 21 3.74118 21 4.58824V19.4118C21 20.2588 20.2588 21 19.4118 21H4.58824C3.74118 21 3 20.2588 3 19.4118V4.58824C3 3.74118 3.74118 3 4.58824 3Z"
                    fill="#454552"
                />
                <path
                    d="M7.8999 6.39998C8.1999 6.39998 8.3999 6.59998 8.3999 6.89998L8.3999 18.1C8.3999 18.4 8.1999 18.6 7.8999 18.6C7.5999 18.6 7.3999 18.4 7.3999 18.1L7.3999 6.79998C7.4999 6.59998 7.6999 6.39998 7.8999 6.39998Z"
                    fill="white"
                />
                <path
                    d="M7.9 7.8C8.39706 7.8 8.8 7.39706 8.8 6.9C8.8 6.40294 8.39706 6 7.9 6C7.40294 6 7 6.40294 7 6.9C7 7.39706 7.40294 7.8 7.9 7.8Z"
                    fill="white"
                />
                <path
                    d="M8.3 14.4C11.4 12.9 14.4 16.3 17.5 14.6C17.6 14.6 17.6 14.5 17.6 14.4V8.70004C17.6 8.50004 17.4 8.40004 17.3 8.50004C14.3 10 11.2 6.60004 8.2 8.30004C8.1 8.30004 8 8.40004 8 8.50004V14.2C8 14.3 8.2 14.4 8.3 14.4Z"
                    fill="white"
                />
            </svg>
        )
    },
    {
        label: __('Font Awesome - Brand', 'awesome-logo-carousel-block'),
        value: 'brands',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.2856 3.57147C5.71417 3.57147 5.99988 3.85718 5.99988 4.28576L5.99988 20.2857C5.99988 20.7143 5.71416 21 5.28559 21C4.85702 21 4.57131 20.7143 4.57131 20.2857L4.57131 4.1429C4.63775 3.57147 4.99988 3.57147 5.2856 3.57147Z"
                    fill="#454552"
                />
                <path
                    d="M5.28571 5.57142C5.99579 5.57142 6.57142 4.99579 6.57142 4.28571C6.57142 3.57563 5.99579 3 5.28571 3C4.57563 3 4 3.57563 4 4.28571C4 4.99579 4.57563 5.57142 5.28571 5.57142Z"
                    fill="#454552"
                />
                <path
                    d="M5.85716 15.0001C10.2857 12.8572 14.5714 17.7143 19 15.2858C19.1428 15.2858 19.1428 15.1429 19.1428 15.0001V6.85723C19.1428 6.57151 18.8571 6.42866 18.7143 6.57151C14.4286 8.71437 10 3.85724 5.7143 6.2858C5.57145 6.2858 5.42859 6.42866 5.42859 6.57151V14.7144C5.42859 14.8572 5.7143 15.0001 5.85716 15.0001Z"
                    fill="#454552"
                />
            </svg>
        )
    }
];

const IconPicker = ({ iconsPanel = false, setIconsPanel, value, onChange }) => {
    // const [iconsPanel, setIconsPanel] = useState(false);
    const [category, setCategory] = useState('all');
    const [filterIcons, setFilterIcons] = useState([]);
    const [searchText, setSearchText] = useState('');

    const allSvgItems = useMemo(() => {
        return Object.keys(icons).map(key => ({
            label: icons[key].label,
            svg: icons[key].svg
        }));
    }, []);

    const solidCategory = useMemo(() => allSvgItems.filter(item => item.svg.solid), [allSvgItems]);
    const brandCategory = useMemo(() => allSvgItems.filter(item => item.svg.brands), [allSvgItems]);
    const regularCategory = useMemo(() => allSvgItems.filter(item => item.svg.regular), [allSvgItems]);

    useEffect(() => {
        let displayIcons = [];
        if (category === 'solid') {
            displayIcons = solidCategory;
        } else if (category === 'brands') {
            displayIcons = brandCategory;
        } else if (category === 'regular') {
            displayIcons = regularCategory;
        } else {
            displayIcons = allSvgItems;
        }

        if (searchText) {
            displayIcons = displayIcons.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));

            if (displayIcons.length === 0) {
                displayIcons = [
                    {
                        label: __('No Icons Found', 'awesome-logo-carousel-block'),
                        svg: {
                            solid: {
                                raw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm0 480C132.48 480 32 379.52 32 256S132.48 32 256 32s224 100.48 224 224-100.48 224-224 224z"/><path d="M336 192H176a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm-16 64H192v-32h128z"/></svg>`
                            }
                        }
                    }
                ];
            }
        }

        setFilterIcons(displayIcons);
    }, [category, solidCategory, brandCategory, regularCategory, allSvgItems, searchText]);

    // Define gap between columns and rows
    const columnWidthWithGap = 80; // Column width
    const rowHeightWithGap = 80; // Row height
    const gapSize = 15; // Gap between items

    return (
        <div className="alcb-icon-picker">
            {iconsPanel && (
                <Modal
                    className="svgib__modal"
                    title={__('Font Awesome SVG Icons', 'awesome-logo-carousel-block')}
                    onRequestClose={() => setIconsPanel(false)}
                >
                    <div className="alcb-modal__wrapper">
                        <div className="alcb-categories__sidebar">
                            <div className="alcb-category-item">
                                {iconCategories &&
                                    iconCategories.map((item, index) => (
                                        <Button
                                            className={`category__button ${category === item.value ? 'active' : ''}`}
                                            key={index}
                                            onClick={() => setCategory(item.value)}
                                        >
                                            {item.icon && <span className="category__icon">{item.icon}</span>}
                                            {item.label}
                                        </Button>
                                    ))}
                            </div>
                        </div>
                        <div className="modal__content">
                            <div className="search__input">
                                <SearchControl
                                    __nextHasNoMarginBottom
                                    placeholder="Search Icon"
                                    onChange={e => setSearchText(e)}
                                    value={searchText}
                                />
                            </div>
                            <div className="alcb-icons-wrap">
                                <div className="svgib__icons-container">
                                    <Grid
                                        columnCount={9}
                                        columnWidth={columnWidthWithGap}
                                        height={400}
                                        rowCount={Math.ceil(filterIcons.length / 9)}
                                        rowHeight={rowHeightWithGap}
                                        width={(columnWidthWithGap + gapSize) * 9} // Adjust the total width
                                    >
                                        {({ columnIndex, rowIndex, style }) => {
                                            const index = rowIndex * 9 + columnIndex;
                                            if (index >= filterIcons.length) return null;
                                            const item = filterIcons[index];
                                            let iconCat;
                                            if (item.svg.solid) {
                                                iconCat = 'solid';
                                            } else if (item.svg.brands) {
                                                iconCat = 'brands';
                                            } else if (item.svg.regular) {
                                                iconCat = 'regular';
                                            }

                                            return (
                                                <Button
                                                    key={index}
                                                    className={`single__icon ${value === item.svg[iconCat].raw ? 'active' : ''}`}
                                                    onClick={() => {
                                                        onChange(item.svg[iconCat].raw);
                                                        setIconsPanel(false);
                                                    }}
                                                    title={item.label}
                                                    style={{
                                                        ...style,
                                                        left: parseFloat(style.left) + gapSize, // Add gap between columns
                                                        top: parseFloat(style.top) + gapSize, // Add gap between rows
                                                        width: style.width - gapSize, // Reduce the width for the gap
                                                        height: style.height - gapSize // Reduce the height for the gap
                                                    }}
                                                >
                                                    <RawHTML className="single__icon_svg" children={item.svg[iconCat].raw} />
                                                </Button>
                                            );
                                        }}
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default IconPicker;
