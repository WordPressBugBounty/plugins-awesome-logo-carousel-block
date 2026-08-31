import { Button } from '@wordpress/components';

/**
 * The empty state shown when a logo block is first inserted.
 *
 * Uses core's `Button` rather than bare `<button>` elements so the actions
 * inherit the admin UI's sizing, focus rings, disabled handling and the user's
 * admin colour scheme. The plugin's brand colour is applied by re-scoping
 * `--wp-admin-theme-color` on the wrapper (see block-placeholder.scss), which
 * keeps all of that behaviour while still looking like this plugin.
 *
 * @param {Object}   props
 * @param {Element}  props.icon           Block icon, rendered decoratively.
 * @param {string}   props.title          Block name.
 * @param {string}   props.description    One line on what the block does.
 * @param {string}   props.primaryLabel   Primary action label.
 * @param {Function} props.onPrimary      Primary action handler.
 * @param {string}   props.secondaryLabel Secondary action label.
 * @param {Function} props.onSecondary    Secondary action handler.
 * @param {string}   [props.footnote]     Optional reassurance line.
 * @return {Element} The placeholder.
 */
const BlockPlaceholder = ({
    icon,
    title,
    description,
    primaryLabel,
    onPrimary,
    secondaryLabel,
    onSecondary,
    footnote
}) => (
    <div className="alcb-placeholder">
        <span className="alcb-placeholder__icon">{icon}</span>

        <span className="alcb-placeholder__title">{title}</span>

        {description && <span className="alcb-placeholder__description">{description}</span>}

        <div className="alcb-placeholder__actions">
            <Button variant="primary" onClick={onPrimary}>
                {primaryLabel}
            </Button>
            <Button variant="secondary" onClick={onSecondary}>
                {secondaryLabel}
            </Button>
        </div>

        {footnote && <span className="alcb-placeholder__footnote">{footnote}</span>}
    </div>
);

export default BlockPlaceholder;
