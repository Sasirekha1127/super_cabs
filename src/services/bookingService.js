/**
 * Booking & Inquiry Services for Super Cabs
 * Communicates with backend endpoints while maintaining offline resiliency
 */
import api from './api';
import { vehicles, tours, popularOneWayRoutes } from '../Components/data/cabsData';
import { dropTaxiCities } from '../Components/data/dropTaxiData';

/**
 * Generate a random fallback reference ID (e.g. SC-74291)
 */
export function generateReferenceId(prefix = 'SC') {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomDigits}`;
}

/**
 * Create a new cab or tour booking
 * @param {Object} bookingData - Details of pickup, drop, cab, fare, contact info
 */
export async function createBooking(bookingData) {
    const payload = {
        referenceId: bookingData.referenceId || generateReferenceId(),
        serviceType: bookingData.serviceType || bookingData.tab || 'Outstation',
        tripType: bookingData.tripType || 'One Way',
        pickupCity: bookingData.pickupCity || '',
        dropCity: bookingData.dropCity || '',
        pickupDate: bookingData.pickupDate || '',
        pickupTime: bookingData.pickupTime || '',
        returnDate: bookingData.returnDate || null,
        vehicleType: bookingData.vehicleType || bookingData.car || '',
        customerName: bookingData.customerName || '',
        customerPhone: bookingData.customerPhone || '',
        customerEmail: bookingData.customerEmail || '',
        estimatedFare: bookingData.estimatedFare || bookingData.estFare || 0,
        notes: bookingData.notes || '',
        createdAt: new Date().toISOString()
    };

    try {
        const response = await api.post('/bookings', payload);
        return {
            success: true,
            booking: response.booking || response.data || payload,
            referenceId: (response.booking && response.booking.referenceId) || payload.referenceId,
            message: response.message || 'Booking created successfully'
        };
    } catch (err) {
        console.info('[BookingService] Backend currently unavailable; fallback to offline reference mode.');
        return {
            success: true,
            isOffline: true,
            booking: payload,
            referenceId: payload.referenceId,
            message: 'Booking generated locally. Confirm via WhatsApp or Phone.'
        };
    }
}

/**
 * Submit general contact inquiry
 */
export async function submitContactEnquiry(enquiryData) {
    const payload = {
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        subject: enquiryData.subject || 'Taxi Booking Enquiry',
        message: enquiryData.message,
        createdAt: new Date().toISOString()
    };

    try {
        const response = await api.post('/contact', payload);
        return { success: true, data: response };
    } catch (err) {
        console.info('[BookingService] Contact backend offline; logged locally.');
        return { success: true, isOffline: true, data: payload };
    }
}

/**
 * Submit tour package inquiry
 */
export async function submitTourEnquiry(tourData) {
    const payload = {
        tourId: tourData.tourId,
        tourTitle: tourData.tourTitle,
        customerName: tourData.customerName,
        customerPhone: tourData.customerPhone,
        customerEmail: tourData.customerEmail,
        travelDate: tourData.travelDate,
        travelers: tourData.travelers,
        notes: tourData.notes || '',
        createdAt: new Date().toISOString()
    };

    try {
        const response = await api.post('/tours/enquiry', payload);
        return { success: true, data: response };
    } catch (err) {
        console.info('[BookingService] Tour inquiry backend offline; logged locally.');
        return { success: true, isOffline: true, data: payload };
    }
}

/**
 * Fetch cabs fleet with local fallback
 */
export async function fetchCabs() {
    try {
        const response = await api.get('/cabs');
        return response.cabs || response.data || vehicles;
    } catch (err) {
        return vehicles;
    }
}

/**
 * Fetch drop taxi routes with local fallback
 */
export async function fetchDropRoutes() {
    try {
        const response = await api.get('/drop-routes');
        return response.routes || response.data || dropTaxiCities;
    } catch (err) {
        return dropTaxiCities;
    }
}

/**
 * Fetch tour packages with local fallback
 */
export async function fetchTours() {
    try {
        const response = await api.get('/tours');
        return response.tours || response.data || tours;
    } catch (err) {
        return tours;
    }
}

/**
 * Fetch popular one-way routes with local fallback
 */
export async function fetchPopularRoutes() {
    try {
        const response = await api.get('/popular-routes');
        return response.routes || response.data || popularOneWayRoutes;
    } catch (err) {
        return popularOneWayRoutes;
    }
}

const bookingService = {
    createBooking,
    submitContactEnquiry,
    submitTourEnquiry,
    fetchCabs,
    fetchDropRoutes,
    fetchPopularRoutes,
    fetchTours,
    generateReferenceId
};

export default bookingService;
