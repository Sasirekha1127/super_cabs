import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { waHref } from '../data/siteConfig';
import { getApiOrigin } from '../../services/api';

const resolveImageUrl = (img, fallback = '/assets/img/cabs/sedan.jpg') => {
    if (!img) return fallback;
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    if (img.startsWith('/uploads') || img.startsWith('uploads')) {
        return `${getApiOrigin()}${img.startsWith('/') ? '' : '/'}${img}`;
    }
    return img;
};

const styles = `
.spc-lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(6, 20, 26, 0.88);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    padding: 20px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.spc-lightbox-overlay.show {
    opacity: 1;
    visibility: visible;
}
.spc-lightbox-dialog {
    position: relative;
    max-width: 880px;
    width: 100%;
    max-height: 92vh;
    background: #0b2229;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 20px;
    box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(28, 168, 203, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: scale(0.92) translateY(12px);
    opacity: 0;
    transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease;
}
.spc-lightbox-overlay.show .spc-lightbox-dialog {
    transform: scale(1) translateY(0);
    opacity: 1;
}

/* Header */
.spc-lb-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: rgba(11, 34, 41, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    color: #ffffff;
    z-index: 2;
}
.spc-lb-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(28, 168, 203, 0.35);
}
.spc-lb-counter {
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 600;
    margin-left: 12px;
}
.spc-lb-close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 15px;
    transition: all 0.2s ease;
}
.spc-lb-close-btn:hover {
    background: #e11d48;
    border-color: #e11d48;
    color: #ffffff;
    transform: rotate(90deg) scale(1.08);
}

/* Image Stage */
.spc-lb-body {
    position: relative;
    background: #06151a;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 260px;
    max-height: 58vh;
    overflow: hidden;
    padding: 10px;
}
.spc-lb-img {
    max-width: 100%;
    max-height: 56vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transition: opacity 0.25s ease;
    user-select: none;
}

/* Nav arrows */
.spc-lb-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(11, 34, 41, 0.78);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ffffff;
    display: grid;
    place-items: center;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 5;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.spc-lb-nav:hover {
    background: var(--theme-color, #1ca8cb);
    border-color: var(--theme-color, #1ca8cb);
    color: #ffffff;
    transform: translateY(-50%) scale(1.1);
}
.spc-lb-nav.prev {
    left: 16px;
}
.spc-lb-nav.next {
    right: 16px;
}

/* Footer Details & CTAs */
.spc-lb-footer {
    padding: 16px 22px;
    background: rgba(11, 34, 41, 0.98);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
}
.spc-lb-title {
    color: #ffffff;
    font-size: 17.5px;
    font-weight: 700;
    margin: 0 0 3px;
}
.spc-lb-subtitle {
    color: rgba(255, 255, 255, 0.72);
    font-size: 12.5px;
    margin: 0;
}
.spc-lb-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}
.spc-lb-book-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    border-radius: 25px;
    font-size: 12.5px;
    font-weight: 700;
    text-decoration: none;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff !important;
    border: none;
    box-shadow: 0 4px 14px rgba(28, 168, 203, 0.4);
    transition: all 0.2s ease;
}
.spc-lb-book-btn:hover {
    background: #148ea8;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(28, 168, 203, 0.5);
}
.spc-lb-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 16px;
    border-radius: 25px;
    font-size: 12.5px;
    font-weight: 700;
    text-decoration: none;
    background: #25D366;
    color: #ffffff !important;
    border: none;
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
    transition: all 0.2s ease;
}
.spc-lb-wa-btn:hover {
    background: #1ea952;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .spc-lightbox-overlay {
        padding: 12px;
    }
    .spc-lb-header {
        padding: 12px 16px;
    }
    .spc-lb-body {
        min-height: 220px;
        max-height: 48vh;
        padding: 6px;
    }
    .spc-lb-img {
        max-height: 46vh;
    }
    .spc-lb-nav {
        width: 38px;
        height: 38px;
        font-size: 14px;
    }
    .spc-lb-nav.prev {
        left: 8px;
    }
    .spc-lb-nav.next {
        right: 8px;
    }
    .spc-lb-footer {
        padding: 12px 16px;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }
    .spc-lb-actions {
        width: 100%;
    }
    .spc-lb-book-btn, .spc-lb-wa-btn {
        flex: 1;
        justify-content: center;
        text-align: center;
    }
}
`;

const Modal = ({
    isOpen,
    closeModal,
    imageSrc,
    items,
    currentIndex = 0,
    onPrev,
    onNext
}) => {
    const [visible, setVisible] = useState(false);

    // Sync visibility with isOpen for smooth fade/scale
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setVisible(true), 15);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    // Keyboard handlers (Esc, Left, Right)
    const handleKeyDown = useCallback(
        (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft' && onPrev) {
                onPrev();
            } else if (e.key === 'ArrowRight' && onNext) {
                onNext();
            }
        },
        [isOpen, closeModal, onPrev, onNext]
    );

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    // Determine current item info
    const currentItem = items && items[currentIndex] ? items[currentIndex] : null;
    const rawSrc = currentItem ? (currentItem.src || currentItem.image) : imageSrc;
    const currentSrc = resolveImageUrl(rawSrc, '/assets/img/cabs/sedan.jpg');
    const title = currentItem?.title || "Super Cabs Visual Showcase";
    const subtitle = currentItem?.subtitle || currentItem?.description || "Comfortable and sanitized taxi service across South India";
    const tag = currentItem?.tag || "Gallery";
    const totalCount = items ? items.length : 1;
    const hasNav = items && items.length > 1;

    return (
        <div className={`spc-lightbox-overlay ${visible ? 'show' : ''}`} onClick={closeModal}>
            <style>{styles}</style>
            <div className="spc-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="spc-lb-header">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="spc-lb-badge">
                            <i className="fa-solid fa-camera me-1"></i> {tag}
                        </span>
                        {currentItem?.regNo && (
                            <span 
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: '#facc15',
                                    color: '#000000',
                                    padding: '3px 9px',
                                    borderRadius: '4px',
                                    fontWeight: '800',
                                    fontSize: '11.5px',
                                    letterSpacing: '0.6px',
                                    border: '1.5px solid #000000',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                                    textTransform: 'uppercase'
                                }}
                                title="Tamil Nadu Commercial Taxi Registration"
                            >
                                <span style={{ fontSize: '8.5px', fontWeight: '900', borderRight: '1px solid #000', paddingRight: '4px', opacity: 0.85 }}>IND</span>
                                <span>{currentItem.regNo}</span>
                            </span>
                        )}
                        {items && (
                            <span className="spc-lb-counter">
                                {currentIndex + 1} / {totalCount}
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        className="spc-lb-close-btn"
                        onClick={closeModal}
                        title="Close (Esc)"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body / Image Stage */}
                <div className="spc-lb-body">
                    {hasNav && onPrev && (
                        <button
                            type="button"
                            className="spc-lb-nav prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrev();
                            }}
                            title="Previous Photo (Left Arrow)"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    )}

                    <img 
                        src={currentSrc} 
                        alt={title} 
                        className="spc-lb-img" 
                        onError={(e) => {
                            e.target.src = '/assets/img/cabs/sedan.jpg';
                        }}
                    />

                    {hasNav && onNext && (
                        <button
                            type="button"
                            className="spc-lb-nav next"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext();
                            }}
                            title="Next Photo (Right Arrow)"
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    )}
                </div>

                {/* Footer Details & CTAs */}
                <div className="spc-lb-footer">
                    <div>
                        <h4 className="spc-lb-title">{title}</h4>
                        <p className="spc-lb-subtitle">{subtitle}</p>
                    </div>
                    <div className="spc-lb-actions">
                        <Link
                            to="/contact"
                            state={{ enquiry: { message: `Enquiry from gallery showcase: ${title}` } }}
                            className="spc-lb-book-btn"
                            onClick={closeModal}
                        >
                            Book Cab
                        </Link>
                        <a
                            href={waHref(`Hello Super Cabs, I saw the photo of ${title} (${tag}) in your gallery and would like to enquire.`)}
                            target={siteConfig.whatsapp ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="spc-lb-wa-btn"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
