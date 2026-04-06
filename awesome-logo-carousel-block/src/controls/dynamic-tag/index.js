const DynamicTag = props => {
    const { tagName, children, ...attr } = props;
    const Tag = tagName || 'h2';
    return <Tag {...attr}>{children}</Tag>;
};
export default DynamicTag;
