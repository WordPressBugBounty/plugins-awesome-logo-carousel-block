import { Modal, Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { parse } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
);

const InsertBtnContent = ({ isInserting, isLocked }) => {
    if (isInserting) return <Spinner />;
    if (isLocked) {
        return (
            <>
                <LockIcon />
                {__('Pro', 'awesome-logo-carousel-block')}
            </>
        );
    }
    return __('Insert', 'awesome-logo-carousel-block');
};

const PatternItem = ({ pattern, onInsert, isInserting }) => {
    const hasPro = window?.alcbData?.hasPro === '1' || window?.alcbData?.hasPro === true;
    const isLocked = pattern.is_pro && !hasPro;

    return (
        <div className={`alcb-pattern-item${isLocked ? ' is-locked' : ''}`}>
            <div className="alcb-pattern-preview">
                {pattern?.featured_image && <img src={pattern.featured_image} alt={pattern.title} />}
            </div>
            <div className="alcb-pattern-footer">
                <span className="alcb-pattern-title">{pattern.title}</span>
                <button
                    className="alcb-pattern-insert-btn"
                    disabled={isLocked || isInserting}
                    onClick={() => !isLocked && onInsert(pattern)}
                    title={isLocked ? __('Requires Pro', 'awesome-logo-carousel-block') : __('Insert Pattern', 'awesome-logo-carousel-block')}
                >
                    <InsertBtnContent isInserting={isInserting} isLocked={isLocked} />
                </button>
            </div>
        </div>
    );
};

const Patterns = props => {
    const { setAttributes, clientId } = props;
    const { replaceBlocks } = useDispatch('core/block-editor');

    const [patterns, setPatterns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [insertingId, setInsertingId] = useState(null);

    const fetchPatterns = (forceRefresh = false) => {
        setLoading(true);
        setError(null);

        const refreshParam = forceRefresh ? '?refresh=true' : '';
        const path = `/alcb/v1/patterns${refreshParam}`;

        apiFetch({ path })
            .then(data => {
                // If data comes in items/page format, use data.items, otherwise use data directly
                const items = data.items ? data.items : (Array.isArray(data) ? data : []);
                setPatterns(items);
            })
            .catch(() => {
                setError(__('Failed to load patterns. Please try again.', 'awesome-logo-carousel-block'));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPatterns();
    }, []);

    const handleInsert = pattern => {
        setInsertingId(pattern.id);
        try {
            const blocks = parse(pattern.content);
            replaceBlocks(clientId, blocks);
            setAttributes({ openModal: false });
        } catch {
            // parse failed
        } finally {
            setInsertingId(null);
        }
    };

    return (
        <Modal
            title={__('Logo Patterns', 'awesome-logo-carousel-block')}
            className="alcb-patterns-modal"
            onRequestClose={() => setAttributes({ openModal: false })}
        >
            <div className="alcb-patterns-toolbar">
                <p className="alcb-patterns-count">
                    {patterns.length}{' '}
                    {patterns.length === 1 ? __('pattern', 'awesome-logo-carousel-block') : __('patterns', 'awesome-logo-carousel-block')}
                </p>
                <button
                    className="alcb-patterns-refresh-btn"
                    onClick={() => fetchPatterns(true)}
                    disabled={loading}
                    title={__('Fetch latest patterns', 'awesome-logo-carousel-block')}
                >
                    <RefreshIcon />
                    {__('Refresh', 'awesome-logo-carousel-block')}
                </button>
            </div>

            {loading && (
                <div className="alcb-patterns-loading">
                    <Spinner />
                    <span>{__('Loading patterns…', 'awesome-logo-carousel-block')}</span>
                </div>
            )}

            {error && !loading && (
                <div className="alcb-patterns-error">
                    <p>{error}</p>
                    <button onClick={() => fetchPatterns(true)}>{__('Retry', 'awesome-logo-carousel-block')}</button>
                </div>
            )}

            {!loading && !error && patterns.length > 0 && (
                <div className="alcb_patterns_grid">
                    {patterns.map(pattern => (
                        <PatternItem
                            key={pattern.id}
                            pattern={pattern}
                            onInsert={handleInsert}
                            isInserting={insertingId === pattern.id}
                        />
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default Patterns;
