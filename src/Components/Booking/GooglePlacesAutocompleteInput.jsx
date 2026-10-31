import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPlacePredictions, getPlaceDetails } from '../../services/mapsService';

const styles = `
.gpa-wrapper {
    position: relative;
    width: 100%;
}
.gpa-input-container {
    position: relative;
    display: flex;
    align-items: center;
}
.gpa-input {
    width: 100%;
    height: 44px;
    border: 1.5px solid #cbd5e1;
    border-radius: 6px;
    padding: 8px 36px 8px 12px;
    font-size: 14px;
    color: #1e293b;
    background-color: #ffffff;
    transition: all 0.2s ease;
    outline: none;
    font-family: inherit;
}
.gpa-input:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}
.gpa-input.is-invalid {
    border-color: #ef4444 !important;
    background-color: #fef2f2 !important;
}
.gpa-input.is-invalid:focus {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
}
.gpa-error-text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 600;
    color: #ef4444;
    margin-top: 4px;
}
.gpa-input.is-verified {
    border-color: #22c55e;
    background-color: #f0fdf4;
}
.gpa-input.is-verified:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}
.gpa-icons-right {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
}
.gpa-btn-clear {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    transition: color 0.15s ease;
}
.gpa-btn-clear:hover {
    color: #ef4444;
}
.gpa-spinner {
    color: #0284c7;
    font-size: 13px;
    animation: gpaSpin 0.8s linear infinite;
}
@keyframes gpaSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Google-style Autocomplete Dropdown matching user screenshot */
.gpa-dropdown {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-top: none;
    border-radius: 0 0 6px 6px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
    z-index: 1050;
    max-height: 290px;
    overflow-y: auto;
    padding: 0;
    animation: gpaFadeIn 0.15s ease-out;
}
@keyframes gpaFadeIn {
    from { opacity: 0; transform: translateY(-3px); }
    to { opacity: 1; transform: translateY(0); }
}
.gpa-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    cursor: pointer;
    transition: background 0.12s ease;
    border-bottom: 1px solid #ebebeb;
    background: #ffffff;
}
.gpa-item:hover, .gpa-item.is-highlighted {
    background: #f5f5f5;
}
.gpa-item-icon {
    font-size: 15px;
    color: #70757a;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
}
.gpa-item-text {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13.5px;
    line-height: 1.35;
    text-align: left;
}
.gpa-item-main {
    font-weight: 700;
    color: #202124;
    margin-right: 5px;
}
.gpa-item-sec {
    font-weight: 400;
    color: #70757a;
    font-size: 13px;
}

/* Google Brand Footer */
.gpa-powered-by {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 12px 6px 0;
    background: #ffffff;
    gap: 4px;
    user-select: none;
}
.gpa-powered-text {
    font-size: 10.5px;
    color: #70757a;
}
.gpa-google-logo {
    font-weight: 700;
    font-size: 12.5px;
    letter-spacing: -0.2px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
.gpa-loading-row {
    padding: 12px 14px;
    font-size: 13px;
    color: #0369a1;
    display: flex;
    align-items: center;
    background: #f0f9ff;
    gap: 8px;
}
.gpa-no-results {
    padding: 12px 14px;
    font-size: 13px;
    color: #64748b;
    text-align: center;
    background: #f8fafc;
}
.gpa-verified-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    margin-top: 4px;
    color: #16a34a;
    font-weight: 600;
}
.gpa-unverified-hint {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    margin-top: 4px;
    color: #d97706;
    font-weight: 500;
}
`;

function GooglePlacesAutocompleteInput({
    id,
    label,
    placeholder = 'Type city name...',
    icon = 'fa-solid fa-location-dot text-success',
    value = '',
    selectedPlace = null,
    onChange,
    onPlaceSelect,
    required = false,
    className = '',
    error = ''
}) {
    const [inputValue, setInputValue] = useState(value || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const wrapperRef = useRef(null);
    const debounceTimerRef = useRef(null);

    // Sync from outer value prop if updated from outside
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Perform debounced suggestion fetching
    const fetchSuggestions = useCallback((text) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        const trimmed = (text || '').trim();
        if (trimmed.length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setIsOpen(true);
        debounceTimerRef.current = setTimeout(async () => {
            try {
                const results = await getPlacePredictions(trimmed);
                setSuggestions(results || []);
                setIsOpen(true);
                setHighlightedIndex(-1);
            } catch (err) {
                console.warn('[Autocomplete] Suggestion error:', err.message);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 200);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);
        if (onChange) {
            onChange(val);
        }

        // When user types, clear previous selected place immediately
        if (onPlaceSelect) {
            onPlaceSelect(null);
        }

        fetchSuggestions(val);
    };

    const handleSelectSuggestion = async (item) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = null;
        }
        setIsOpen(false);
        setSuggestions([]);
        setIsLoading(true);

        try {
            // Fetch complete coordinates and details for distance calculation
            const placeDetails = await getPlaceDetails(item);
            const fullAddress = placeDetails?.fullName || item.description || (item.secondaryText ? `${item.mainText}, ${item.secondaryText}` : item.mainText);
            setInputValue(fullAddress);

            if (onChange) {
                onChange(fullAddress);
            }
            if (onPlaceSelect) {
                onPlaceSelect(placeDetails);
            }
        } catch (err) {
            console.warn('[Autocomplete] Selection detail error:', err.message);
            // Fallback selection with available data
            const fallbackAddress = item.description || (item.secondaryText ? `${item.mainText}, ${item.secondaryText}` : item.mainText);
            const fallbackObj = {
                name: item.mainText,
                fullName: fallbackAddress,
                placeId: item.placeId,
                lat: item.lat || null,
                lng: item.lng || null
            };
            setInputValue(fallbackAddress);
            if (onChange) onChange(fallbackAddress);
            if (onPlaceSelect) onPlaceSelect(fallbackObj);
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (!isOpen || suggestions.length === 0) {
            if (e.key === 'ArrowDown' && suggestions.length > 0) {
                setIsOpen(true);
                setHighlightedIndex(0);
                e.preventDefault();
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const targetIndex = highlightedIndex >= 0 && highlightedIndex < suggestions.length ? highlightedIndex : 0;
            if (suggestions[targetIndex]) {
                handleSelectSuggestion(suggestions[targetIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const handleClear = () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = null;
        }
        setInputValue('');
        setSuggestions([]);
        setIsOpen(false);
        if (onChange) onChange('');
        if (onPlaceSelect) onPlaceSelect(null);
    };

    const isVerified = Boolean(
        selectedPlace &&
        (selectedPlace.fullName || selectedPlace.name) &&
        inputValue &&
        (
            inputValue.trim().toLowerCase() === (selectedPlace.fullName || '').trim().toLowerCase() ||
            inputValue.trim().toLowerCase() === (selectedPlace.name || '').trim().toLowerCase() ||
            (selectedPlace.fullName && inputValue.trim().toLowerCase().includes(selectedPlace.fullName.trim().toLowerCase())) ||
            (selectedPlace.fullName && selectedPlace.fullName.trim().toLowerCase().includes(inputValue.trim().toLowerCase())) ||
            (selectedPlace.name && inputValue.trim().toLowerCase().includes(selectedPlace.name.trim().toLowerCase()))
        )
    );

    return (
        <div className={`gpa-wrapper ${className}`} ref={wrapperRef}>
            <style>{styles}</style>

            {label && (
                <label className="bf-label" htmlFor={id}>
                    {icon && <i className={`${icon} me-1`}></i>}
                    {label}
                </label>
            )}

            <div className="gpa-input-container">
                <input
                    type="text"
                    id={id}
                    className={`gpa-input ${isVerified ? 'is-verified' : ''} ${error ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (!isVerified) {
                            if (suggestions.length > 0) {
                                setIsOpen(true);
                            } else if (inputValue && inputValue.trim().length >= 2) {
                                fetchSuggestions(inputValue);
                            }
                        }
                    }}
                    required={required}
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-controls={`${id || 'gpa'}-listbox`}
                    aria-autocomplete="list"
                />

                <div className="gpa-icons-right">
                    {isLoading && (
                        <i className="fa-solid fa-circle-notch gpa-spinner" title="Loading suggestions..."></i>
                    )}
                    {isVerified && !isLoading && (
                        <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '14px' }} title="Verified Google Location"></i>
                    )}
                    {inputValue && (
                        <button
                            type="button"
                            className="gpa-btn-clear"
                            onClick={handleClear}
                            aria-label="Clear city input"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* Dropdown Suggestions matching Google Places design */}
            {isOpen && (
                <div 
                    id={`${id || 'gpa'}-listbox`} 
                    className="gpa-dropdown" 
                    role="listbox"
                    onMouseDown={(e) => {
                        // Prevent losing input focus before click completes
                        e.preventDefault();
                    }}
                >
                    {isLoading && suggestions.length === 0 ? (
                        <div className="gpa-loading-row">
                            <i className="fa-solid fa-circle-notch fa-spin"></i>
                            <span>Searching places across India...</span>
                        </div>
                    ) : suggestions.length > 0 ? (
                        <>
                            {suggestions.map((item, idx) => (
                                <div
                                    key={item.placeId || `${item.mainText}-${idx}`}
                                    className={`gpa-item ${highlightedIndex === idx ? 'is-highlighted' : ''}`}
                                    onClick={() => handleSelectSuggestion(item)}
                                    role="option"
                                    aria-selected={highlightedIndex === idx}
                                >
                                    <i className="fa-solid fa-location-dot gpa-item-icon"></i>
                                    <div className="gpa-item-text">
                                        <span className="gpa-item-main">{item.mainText}</span>
                                        {item.secondaryText && (
                                            <span className="gpa-item-sec">{item.secondaryText}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="gpa-powered-by">
                                <span className="gpa-powered-text">powered by</span>
                                <span className="gpa-google-logo">
                                    <span style={{ color: '#4285F4' }}>G</span>
                                    <span style={{ color: '#EA4335' }}>o</span>
                                    <span style={{ color: '#FBBC05' }}>o</span>
                                    <span style={{ color: '#4285F4' }}>g</span>
                                    <span style={{ color: '#34A853' }}>l</span>
                                    <span style={{ color: '#EA4335' }}>e</span>
                                </span>
                            </div>
                        </>
                    ) : inputValue.trim().length >= 2 ? (
                        <div className="gpa-no-results">
                            <i className="fa-solid fa-location-slash me-2" style={{ color: '#94a3b8' }}></i>
                            <span>No matching locations found for "{inputValue}"</span>
                        </div>
                    ) : null}
                </div>
            )}

            {/* Error or Status indicator underneath */}
            {error ? (
                <div className="gpa-error-text">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>{error}</span>
                </div>
            ) : isVerified ? (
                <div className="gpa-verified-status">
                    <i className="fa-solid fa-check"></i>
                    <span>Location confirmed: {selectedPlace.name || selectedPlace.fullName}</span>
                </div>
            ) : inputValue.trim().length >= 2 ? (
                <div className="gpa-unverified-hint">
                    <i className="fa-solid fa-arrow-pointer"></i>
                    <span>Please click a location from the dropdown suggestions</span>
                </div>
            ) : null}
        </div>
    );
}

export default GooglePlacesAutocompleteInput;
