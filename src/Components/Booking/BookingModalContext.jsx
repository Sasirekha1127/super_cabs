import React, { createContext, useContext, useState } from 'react';

const BookingModalContext = createContext();

export function BookingModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        tab: 'outstation', // 'outstation' | 'rental' | 'airport'
        city: '',
        vehicle: '',
        from: '',
        to: '',
        tripType: ''
    });

    const openBookingModal = (initialData = {}) => {
        setModalData({
            tab: 'outstation',
            city: '',
            vehicle: '',
            from: '',
            to: '',
            tripType: '',
            ...initialData
        });
        setIsOpen(true);
    };

    const closeBookingModal = () => {
        setIsOpen(false);
    };

    return (
        <BookingModalContext.Provider value={{ isOpen, modalData, openBookingModal, closeBookingModal }}>
            {children}
        </BookingModalContext.Provider>
    );
}

export function useBookingModal() {
    const context = useContext(BookingModalContext);
    if (!context) {
        throw new Error('useBookingModal must be used within a BookingModalProvider');
    }
    return context;
}

export default BookingModalContext;
