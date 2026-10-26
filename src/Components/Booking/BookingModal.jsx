import React, { useEffect } from 'react';
import { useBookingModal } from './BookingModalContext';
import BookingForm from './BookingForm';

const modalStyles = `
.bm-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(11, 34, 41, 0.75);
    backdrop-filter: blur(6px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 16px;
    animation: bmFadeIn 0.25s ease;
    overflow-y: auto;
}
.bm-modal-wrapper {
    position: relative;
    width: 100%;
    max-width: 520px;
    animation: bmSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    margin: auto;
}
.bm-close-btn {
    position: absolute;
    top: -16px;
    right: -16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #0b2229;
    color: #ffffff;
    border: 2px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 14px rgba(0,0,0,0.3);
    transition: all 0.2s ease;
}
.bm-close-btn:hover {
    background: #ef4444;
    transform: rotate(90deg);
}
@keyframes bmFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes bmSlideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (max-width: 575px) {
    .bm-close-btn {
        top: 6px;
        right: 6px;
        background: rgba(15, 23, 42, 0.8);
    }
}
`;

function BookingModal() {
    const { isOpen, modalData, closeBookingModal } = useBookingModal();

    // Lock background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeBookingModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeBookingModal]);

    if (!isOpen) return null;

    return (
        <div className="bm-backdrop" onClick={closeBookingModal}>
            <style>{modalStyles}</style>
            <div className="bm-modal-wrapper" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="bm-close-btn"
                    onClick={closeBookingModal}
                    aria-label="Close Booking Modal"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <BookingForm
                    initialTab={modalData.tab || 'outstation'}
                    initialVehicle={modalData.vehicle || ''}
                    initialCity={modalData.city || ''}
                />
            </div>
        </div>
    );
}

export default BookingModal;
