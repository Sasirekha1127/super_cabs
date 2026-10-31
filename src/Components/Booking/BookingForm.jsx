import React, { useState, useEffect, useRef } from 'react';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import { createBooking, fetchCabs } from '../../services/bookingService';
import { calculateFaresForVehicles, VEHICLE_CONFIGS, normalizeCabForBooking } from '../data/distanceHelper';
import GooglePlacesAutocompleteInput from './GooglePlacesAutocompleteInput';
import { calculateDrivingDistance, SOUTH_INDIA_CITIES } from '../../services/mapsService';

const styles = `
.bf-container {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
    overflow: visible;
    font-family: var(--body-font, 'Inter', system-ui, sans-serif);
    border: 1px solid #e2e8f0;
    max-width: 540px;
    margin: 0 auto;
}

/* Tabs Header (stays fixed at top while the form scrolls) */
.bf-tabs-nav {
    display: flex;
    background: #ffffff;
    border-bottom: 2px solid #e2e8f0;
    border-radius: 12px 12px 0 0;
}
.bf-tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 12px;
    font-size: 14.5px;
    font-weight: 700;
    color: #1e293b;
    background: #ffffff;
    border: none;
    border-right: 1px solid #e2e8f0;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    user-select: none;
}
.bf-tab-btn:first-child { border-top-left-radius: 11px; }
.bf-tab-btn:last-child { border-right: none; border-top-right-radius: 11px; }
.bf-tab-btn i { font-size: 15px; }
.bf-tab-btn:hover { background: #f8fafc; }
.bf-tab-btn.active { background: #38bdf8; color: #ffffff; }
.bf-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid #38bdf8;
    z-index: 3;
}

/* Form Body: scrolls inside the card */
.bf-body {
    padding: 24px 22px;
    max-height: min(72vh, 640px);
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
    border-radius: 0 0 12px 12px;
}
.bf-body::-webkit-scrollbar { width: 6px; }
.bf-body::-webkit-scrollbar-track { background: transparent; }
.bf-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }
.bf-body::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

.bf-form-group { margin-bottom: 15px; position: relative; }
.bf-label { display: block; font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 5px; }
.bf-select, .bf-input {
    width: 100%;
    height: 44px;
    border: 1.5px solid #cbd5e1;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    color: #1e293b;
    background-color: #ffffff;
    transition: border-color 0.2s ease;
    outline: none;
}
.bf-select:focus, .bf-input:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}
.bf-select.is-invalid, .bf-input.is-invalid {
    border-color: #ef4444 !important;
    background-color: #fef2f2 !important;
}
.bf-select.is-invalid:focus, .bf-input.is-invalid:focus {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
}
.bf-error-text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 600;
    color: #ef4444;
    margin-top: 4px;
    line-height: 1.3;
}

/* Outstation One Way / Round Trip Switcher */
.bf-trip-toggle {
    display: flex;
    background: #f1f5f9;
    border-radius: 8px;
    padding: 4px;
    gap: 6px;
    margin-bottom: 16px;
    border: 1px solid #e2e8f0;
}
.bf-trip-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 6px;
    border: none;
    font-size: 13.5px;
    font-weight: 700;
    color: #64748b;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
}
.bf-trip-btn.active { background: #ffffff; color: #0f172a; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08); }
.bf-radio-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}
.bf-trip-btn.active .bf-radio-dot { border-color: #38bdf8; }
.bf-trip-btn.active .bf-radio-dot::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #38bdf8;
}

/* Fields stacked vertically one by one */
.bf-row-2 { display: flex; flex-direction: column; gap: 15px; margin-bottom: 15px; }

/* Green WhatsApp Button */
.bf-btn-wa-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #22c55e;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    transition: background 0.2s ease;
}
.bf-btn-wa-toggle:hover { background: #16a34a; }

/* Custom Car Dropdown Selector */
.bf-car-trigger {
    width: 100%;
    height: 48px;
    border: 1.5px solid #cbd5e1;
    border-radius: 6px;
    padding: 6px 14px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;
}
.bf-car-trigger:focus, .bf-car-trigger.open {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}
.bf-car-selected-val { display: flex; align-items: center; gap: 12px; }
.bf-car-selected-img { height: 28px; width: 52px; object-fit: contain; }
.bf-car-selected-name { font-size: 15px; font-weight: 800; color: #0f172a; letter-spacing: 0.5px; }
.bf-car-placeholder { font-size: 14px; color: #64748b; }
.bf-car-chevron { font-size: 13px; color: #64748b; transition: transform 0.2s ease; }
.bf-car-chevron.open { transform: rotate(180deg); }

.bf-car-menu {
    margin-top: 8px;
    background: #ffffff;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    animation: fadeIn 0.2s ease;
}
.bf-car-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    cursor: pointer;
    background: #ffffff;
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s ease;
}
.bf-car-option:last-child { border-bottom: none; }
.bf-car-option:hover, .bf-car-option.selected { background: #f4f4f5; }
.bf-car-option-img { width: 54px; height: 30px; object-fit: contain; }
.bf-car-option-name { font-size: 15px; font-weight: 800; color: #18181b; letter-spacing: 0.5px; }
.bf-car-option-meta { font-size: 12px; font-weight: 500; color: #64748b; margin-left: 8px; }

.bf-return-date-wrap { animation: fadeIn 0.25s ease; }

/* Action Buttons Row */
.bf-actions-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    margin-top: 22px;
    flex-wrap: wrap;
}
.bf-btn-submit {
    background: #eab308;
    color: #ffffff;
    font-size: 15.5px;
    font-weight: 800;
    padding: 12px 28px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(234, 179, 8, 0.35);
}
.bf-btn-submit:hover { background: #ca8a04; transform: translateY(-1px); }
.bf-play-badge {
    height: 44px;
    display: inline-flex;
    align-items: center;
    background: #000000;
    color: #ffffff;
    border-radius: 6px;
    padding: 4px 14px;
    text-decoration: none;
    gap: 8px;
    font-size: 11px;
    transition: opacity 0.2s;
}
.bf-play-badge:hover { opacity: 0.88; color: #ffffff; }
.bf-play-badge i { font-size: 22px; color: #38bdf8; }
.bf-play-text-top { font-size: 9px; text-transform: uppercase; line-height: 1; display: block; color: #94a3b8; }
.bf-play-text-bot { font-size: 13px; font-weight: 700; line-height: 1.1; display: block; }

/* TRIP ESTIMATION VIEW */
.bf-estimation-card { background: #ffffff; border-radius: 10px; padding: 18px 0; animation: fadeIn 0.3s ease; }
.bf-est-header { text-align: center; margin-bottom: 20px; }
.bf-est-title-dark { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
.bf-est-title-fare { font-size: 28px; font-weight: 800; color: #38bdf8; margin-left: 8px; letter-spacing: -0.5px; }

.bf-est-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    margin-bottom: 22px;
}
.bf-est-table tr { border-bottom: 1px solid #cbd5e1; }
.bf-est-table tr:last-child { border-bottom: none; }
.bf-est-table td {
    padding: 11px 16px;
    font-size: 14.5px;
    font-weight: 600;
    color: #1e293b;
    border-right: 1px solid #cbd5e1;
}
.bf-est-table td:last-child { border-right: none; }
.bf-est-table td.label-col { width: 50%; color: #1e293b; }
.bf-est-table td.val-col { width: 50%; color: #0f172a; }

/* Select Payment Option Card */
.bf-payment-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 18px 16px;
    margin-bottom: 24px;
}
.bf-payment-title {
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 16px;
    padding-bottom: 6px;
    border-bottom: 2px solid #38bdf8;
    display: inline-block;
}
.bf-payment-list { display: flex; flex-direction: column; gap: 16px; }
.bf-payment-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    cursor: pointer;
    padding: 6px 4px;
    border-radius: 6px;
    user-select: none;
    transition: background 0.15s ease;
}
.bf-payment-item:hover { background: #f8fafc; }
.bf-payment-radio { margin-top: 2px; flex-shrink: 0; }
.bf-radio-outer-checked {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2.5px solid #f43f5e;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}
.bf-radio-inner-dot { width: 10px; height: 10px; border-radius: 50%; background: #f43f5e; }
.bf-radio-outer-unchecked {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #94a3b8;
    transition: all 0.2s ease;
}
.bf-payment-content { flex: 1; }
.bf-payment-opt-title { font-size: 14.5px; font-weight: 800; color: #0f172a; line-height: 1.3; }
.bf-payment-opt-sub { font-size: 12.5px; font-weight: 500; color: #475569; line-height: 1.35; margin-top: 2px; }

/* Yellow Confirm Booking Button */
.bf-confirm-wrap { text-align: center; margin-top: 10px; margin-bottom: 12px; }
.bf-btn-confirm {
    background: #eab308;
    color: #ffffff;
    font-size: 16px;
    font-weight: 800;
    padding: 12px 36px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(234, 179, 8, 0.35);
    transition: all 0.2s ease;
    text-transform: none;
    min-width: 200px;
}
.bf-btn-confirm:hover { background: #ca8a04; transform: translateY(-1px); }
.bf-btn-confirm:disabled { opacity: 0.7; cursor: not-allowed; }

.bf-btn-back {
    background: transparent;
    border: none;
    color: #64748b;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
    transition: color 0.15s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.bf-btn-back:hover { color: #0284c7; text-decoration: underline; }

/* BOOKING CONFIRMED SUCCESS VIEW */
.bf-success-box {
    background: #f0fdf4;
    border: 1.5px solid #22c55e;
    border-radius: 10px;
    padding: 24px 20px;
    text-align: center;
    animation: fadeIn 0.3s ease;
}
.bf-success-icon { font-size: 46px; color: #16a34a; margin-bottom: 12px; }
.bf-success-title { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
.bf-success-ref {
    display: inline-block;
    background: #dcfce7;
    color: #15803d;
    padding: 4px 14px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 13.5px;
    margin-bottom: 16px;
    border: 1px solid #86efac;
}
.bf-success-card {
    background: #ffffff;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    padding: 14px 16px;
    text-align: left;
    font-size: 13.5px;
    line-height: 1.6;
    color: #1e293b;
    margin-bottom: 18px;
}
.bf-success-actions { display: flex; flex-direction: column; gap: 10px; }
.bf-btn-wa-confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: #22c55e;
    color: #ffffff;
    font-size: 14.5px;
    font-weight: 700;
    padding: 12px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s ease;
}
.bf-btn-wa-confirm:hover { background: #16a34a; color: #ffffff; }

/* Instant UPI Demo Simulator */
.bf-upi-box {
    background: #ffffff;
    border: 1.5px dashed #38bdf8;
    border-radius: 8px;
    padding: 14px;
    margin-bottom: 16px;
    text-align: center;
}
.bf-upi-title { font-size: 13.5px; font-weight: 800; color: #0284c7; margin-bottom: 8px; }
.bf-upi-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f0f9ff;
    color: #0369a1;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
}
.bf-upi-apps { display: flex; justify-content: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.bf-upi-app-pill {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #334155;
    cursor: pointer;
}
.bf-upi-app-pill:hover { background: #e2e8f0; }

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Live Google Maps Distance Card */
.bf-distance-card {
    background: #f8fafc;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    padding: 12px 14px;
    margin-bottom: 16px;
    animation: fadeIn 0.25s ease;
}
.bf-distance-card.is-calculating {
    background: #f0f9ff;
    border-color: #7dd3fc;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #0369a1;
    font-size: 13px;
    font-weight: 700;
    padding: 14px;
}
.bf-distance-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
.bf-distance-main { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #0f172a; font-weight: 700; }
.bf-distance-val { font-size: 16px; font-weight: 800; color: #0284c7; }
.bf-distance-sub { font-size: 11.5px; font-weight: 600; color: #64748b; }
.bf-route-source-pill {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 12px;
    background: #e0f2fe;
    color: #0369a1;
    border: 1px solid #bae6fd;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}
.bf-distance-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12.5px;
    color: #475569;
    border-top: 1px dashed #e2e8f0;
    padding-top: 6px;
    flex-wrap: wrap;
}
.bf-text-min-km { font-size: 11px; font-weight: 700; color: #b45309; background: #fef3c7; padding: 2px 6px; border-radius: 4px; }
`;

const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Pondicherry",
    "Bangalore",
    "Tirunelveli",
    "Erode",
    "Tiruppur",
    "Vellore",
    "Dindigul",
    "Thanjavur",
    "Hosur",
    "Kanyakumari",
    "Nagercoil",
    "Tuticorin (Thoothukudi)",
    "Kumbakonam",
    "Karur",
    "Ooty",
    "Kodaikanal"
];

const rentalDurations = [
    "4 hrs 40 KM",
    "5 hrs 50 KM",
    "6 hrs 60 KM",
    "7 hrs 70 KM",
    "8 hrs 80 KM",
    "9 hrs 90 KM",
    "10 hrs 100 KM",
    "11 hrs 110 KM",
    "12 hrs 120 KM"
];

const airportTrips = [
    "Cabs From the Airport",
    "Cabs To the Airport"
];

const timeSlots = [
    "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM",
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

function BookingForm({ initialTab = "outstation", initialVehicle = "", initialCity = "", onSubmitted }) {
    const [activeTab, setActiveTab] = useState(initialTab); // "outstation" | "rental" | "airport"
    const [outstationTripType, setOutstationTripType] = useState("oneway"); // "oneway" | "round"
    const [fromCity, setFromCity] = useState(initialCity || "");
    const [toCity, setToCity] = useState("");
    const [city, setCity] = useState(initialCity || "");
    const [rentFor, setRentFor] = useState("");
    const [airportTrip, setAirportTrip] = useState("");

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const [whatsappNo, setWhatsappNo] = useState("");
    const [showEmail, setShowEmail] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");

    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [returnDate, setReturnDate] = useState("");

    // Vehicle Fleet: Dynamically loaded from backend/admin with fallback
    const [dynamicCabs, setDynamicCabs] = useState([]);

    const initialCarMatch = initialVehicle
        ? VEHICLE_CONFIGS.find(c => initialVehicle.toUpperCase().includes(c.id))?.id
        : "SEDAN";
    const [selectedCar, setSelectedCar] = useState(initialCarMatch || "SEDAN");
    const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
    const carDropdownRef = useRef(null);
    const initialCitySyncedRef = useRef(false);
    const bodyRef = useRef(null); // scrollable form body

    const [errorMsg, setErrorMsg] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const todayStr = new Date().toISOString().split('T')[0];

    const clearFieldError = (field) => {
        setFieldErrors(prev => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
        setErrorMsg("");
    };

    const renderFieldError = (field) => {
        if (!fieldErrors[field]) return null;
        return (
            <div className="bf-error-text">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{fieldErrors[field]}</span>
            </div>
        );
    };

    // Google Maps Autocomplete & Distance Calculation States
    const [pickupPlace, setPickupPlace] = useState(null);
    const [dropPlace, setDropPlace] = useState(null);
    const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
    const [calculatedDistance, setCalculatedDistance] = useState(null);
    const [calculatedDuration, setCalculatedDuration] = useState("");
    const [routeError, setRouteError] = useState("");
    const [routeSource, setRouteSource] = useState("");
    const [isGoogleApiConfigured, setIsGoogleApiConfigured] = useState(false);

    // Multi-car estimation state
    const [fareData, setFareData] = useState(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("driver");
    const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState(null);
    const [paidSimulated, setPaidSimulated] = useState(false);

    // Active fleet: dynamic cabs from API if available, else fallback
    const availableCabs = dynamicCabs.length > 0 ? dynamicCabs : VEHICLE_CONFIGS;
    const currentCarObj = availableCabs.find(c => c.id === selectedCar || c.name === selectedCar) || availableCabs[0];

    // Load active cabs dynamically from database
    useEffect(() => {
        let isMounted = true;
        fetchCabs().then((cabsList) => {
            if (!isMounted) return;
            if (Array.isArray(cabsList) && cabsList.length > 0) {
                const activeOnly = cabsList.filter(c => c.isActive !== false);
                const normalized = activeOnly.map(normalizeCabForBooking);
                if (normalized.length > 0) {
                    setDynamicCabs(normalized);
                    setSelectedCar((prev) => {
                        if (initialVehicle) {
                            const found = normalized.find(c =>
                                c.id.toUpperCase().includes(initialVehicle.toUpperCase()) ||
                                c.name.toUpperCase().includes(initialVehicle.toUpperCase())
                            );
                            if (found) return found.id;
                        }
                        if (prev && normalized.some(c => c.id === prev || c.name === prev)) {
                            return prev;
                        }
                        return normalized[0].id;
                    });
                }
            }
        }).catch((err) => {
            console.info('[BookingForm] Using fallback cab fleet:', err.message);
        });

        return () => { isMounted = false; };
    }, [initialVehicle]);

    // Sync initial props
    useEffect(() => {
        if (initialTab) setActiveTab(initialTab);
        if (initialVehicle) {
            const matched = availableCabs.find(c =>
                c.id.toUpperCase().includes(initialVehicle.toUpperCase()) ||
                c.name.toUpperCase().includes(initialVehicle.toUpperCase())
            );
            if (matched) setSelectedCar(matched.id);
        }
        if (initialCity) {
            setFromCity(initialCity);
            setCity(initialCity);
        }
    }, [initialTab, initialVehicle, initialCity, availableCabs]);

    // Close car dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (carDropdownRef.current && !carDropdownRef.current.contains(event.target)) {
                setIsCarDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Jump back to the top of the scrollable body when the view or tab changes
    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTo({ top: 0 });
    }, [fareData, confirmedBooking, activeTab]);

    // Sync initial city to pickupPlace once on mount if provided
    useEffect(() => {
        if (initialCity && !initialCitySyncedRef.current) {
            initialCitySyncedRef.current = true;
            const match = SOUTH_INDIA_CITIES.find(c => c.name.toLowerCase() === initialCity.toLowerCase());
            if (match) {
                setPickupPlace({
                    name: match.name,
                    fullName: match.fullName,
                    placeId: match.placeId,
                    lat: match.lat,
                    lng: match.lng
                });
            }
        }
    }, [initialCity]);

    // Automatic Driving Distance Calculation Effect (Google Maps Routes API)
    useEffect(() => {
        if (activeTab !== 'outstation') return;

        // Both locations must be selected from suggestions
        if (!pickupPlace || !dropPlace) {
            setCalculatedDistance(null);
            setCalculatedDuration("");
            setRouteError("");
            return;
        }

        const name1 = (pickupPlace.name || '').toLowerCase().trim();
        const name2 = (dropPlace.name || '').toLowerCase().trim();
        if (name1 && name2 && name1 === name2) {
            setRouteError("Pickup and Drop locations cannot be the same city.");
            setCalculatedDistance(null);
            setCalculatedDuration("");
            return;
        }

        let isCurrent = true;
        setIsCalculatingDistance(true);
        setRouteError("");

        calculateDrivingDistance(pickupPlace, dropPlace, outstationTripType)
            .then((res) => {
                if (!isCurrent) return;
                setCalculatedDistance(res.distanceKm);
                setCalculatedDuration(res.durationText);
                setRouteSource(res.routeSource);
                setIsGoogleApiConfigured(res.isGoogleApiConfigured);
                setRouteError("");
            })
            .catch((err) => {
                if (!isCurrent) return;
                console.warn('[BookingForm] Distance calculation notice:', err.message);
                setCalculatedDistance(null);
                setCalculatedDuration("");
                setRouteError(err.message || 'Unable to calculate distance. Please try again.');
            })
            .finally(() => {
                if (isCurrent) setIsCalculatingDistance(false);
            });

        return () => {
            isCurrent = false;
        };
    }, [pickupPlace, dropPlace, outstationTripType, activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFareData(null);
        setConfirmedBooking(null);
        setErrorMsg("");
        setRouteError("");
        setFieldErrors({});
        setIsCarDropdownOpen(false);
    };

    // Handle "Get Travel Fare" Submission with Comprehensive Form Validation
    const handleCalculateFare = (e) => {
        e.preventDefault();
        setErrorMsg("");
        const errs = {};

        // 1. Name validation
        const trimmedName = name.trim();
        if (!trimmedName) {
            errs.name = "Please enter your full name.";
        } else if (trimmedName.length < 2) {
            errs.name = "Full name must be at least 2 characters.";
        } else if (!/^[A-Za-z\s.'-]+$/.test(trimmedName)) {
            errs.name = "Name can only contain alphabets and spaces.";
        }

        // 2. Mobile validation (10-digit Indian mobile starting with 6-9)
        const cleanMobile = mobile.replace(/[^0-9]/g, "");
        if (!cleanMobile) {
            errs.mobile = "Please enter your 10-digit mobile number.";
        } else if (cleanMobile.length !== 10) {
            errs.mobile = "Mobile number must be exactly 10 digits.";
        } else if (!/^[6-9]/.test(cleanMobile)) {
            errs.mobile = "Mobile number must start with 6, 7, 8, or 9.";
        }

        // 3. Optional WhatsApp validation
        if (showWhatsapp && whatsappNo.trim()) {
            const cleanWa = whatsappNo.replace(/[^0-9]/g, "");
            if (cleanWa.length !== 10 || !/^[6-9]/.test(cleanWa)) {
                errs.whatsappNo = "Please enter a valid 10-digit WhatsApp number starting with 6-9.";
            }
        }

        // 4. Pickup Date validation
        if (!pickupDate) {
            errs.pickupDate = "Please select a pick-up date.";
        } else if (pickupDate < todayStr) {
            errs.pickupDate = "Pick-up date cannot be in the past.";
        }

        // 5. Pickup Time validation
        if (!pickupTime) {
            errs.pickupTime = "Please select a pick-up time.";
        }

        // 6. Tab-specific validations
        if (activeTab === 'outstation') {
            if (!fromCity.trim()) {
                errs.fromCity = "Please enter Pickup City.";
            } else if (!pickupPlace) {
                errs.fromCity = "Please select Pickup City from the Google suggestions list.";
            }

            if (!toCity.trim()) {
                errs.toCity = "Please enter Drop City.";
            } else if (!dropPlace) {
                errs.toCity = "Please select Drop City from the Google suggestions list.";
            }

            if (pickupPlace && dropPlace) {
                const name1 = (pickupPlace.name || '').toLowerCase().trim();
                const name2 = (dropPlace.name || '').toLowerCase().trim();
                if (name1 && name2 && name1 === name2) {
                    errs.toCity = "Pickup and Drop locations cannot be the same city.";
                }
            }

            if (outstationTripType === 'round') {
                if (!returnDate) {
                    errs.returnDate = "Please select a return date for round trip.";
                } else if (pickupDate && returnDate < pickupDate) {
                    errs.returnDate = "Return date cannot be earlier than pickup date.";
                }
            }

            if (isCalculatingDistance) {
                setErrorMsg("Calculating driving distance with Google Maps. Please wait...");
                setFieldErrors(errs);
                return;
            }

            if (routeError) {
                setErrorMsg(routeError);
                setFieldErrors(errs);
                return;
            }

            if (!errs.fromCity && !errs.toCity && (!calculatedDistance || Number(calculatedDistance) <= 0)) {
                setErrorMsg("Unable to calculate road distance between selected locations. Please re-select valid cities.");
                setFieldErrors(errs);
                return;
            }
        } else if (activeTab === 'rental') {
            if (!city) {
                errs.city = "Please select a pickup city.";
            }
            if (!rentFor) {
                errs.rentFor = "Please select rental hours & KM package.";
            }
        } else if (activeTab === 'airport') {
            if (!city) {
                errs.city = "Please select an airport city.";
            }
            if (!airportTrip) {
                errs.airportTrip = "Please select trip direction.";
            }
            if (!toCity.trim()) {
                errs.toCity = airportTrip === "Cabs To the Airport" ? "Please enter pickup city or area." : "Please enter drop city or area.";
            } else if (!dropPlace) {
                errs.toCity = "Please select location from Google suggestions.";
            }
        }

        // If validation errors exist, show errors and abort
        if (Object.keys(errs).length > 0) {
            setFieldErrors(errs);
            const firstMsg = Object.values(errs)[0];
            setErrorMsg(firstMsg);
            if (bodyRef.current) {
                bodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        setFieldErrors({});

        // Calculate fares for all vehicles using dynamic fleet & Google Maps road distance
        const results = calculateFaresForVehicles({
            tab: activeTab,
            tripType: outstationTripType,
            fromCity: pickupPlace?.name || fromCity,
            toCity: dropPlace?.name || toCity,
            city,
            rentFor,
            airportTrip,
            cabsList: availableCabs,
            overrideDistanceKm: calculatedDistance,
            overrideDurationText: calculatedDuration
        });

        if (activeTab === 'outstation' && !results) {
            setErrorMsg("Unable to calculate distance. Please try again.");
            return;
        }

        setFareData(results);
        setSelectedPaymentOption("driver");
        setConfirmedBooking(null);
        setPaidSimulated(false);
    };

    // Automatically recalculate fare whenever trip type, distance, route, or fleet changes
    useEffect(() => {
        if (!fareData) return;
        if (activeTab === 'outstation' && (!calculatedDistance || Number(calculatedDistance) <= 0)) {
            setFareData(null);
            return;
        }
        const results = calculateFaresForVehicles({
            tab: activeTab,
            tripType: outstationTripType,
            fromCity: pickupPlace?.name || fromCity,
            toCity: dropPlace?.name || toCity,
            city,
            rentFor,
            airportTrip,
            cabsList: availableCabs,
            overrideDistanceKm: calculatedDistance,
            overrideDurationText: calculatedDuration
        });
        setFareData(results);
    }, [calculatedDistance, calculatedDuration, outstationTripType, activeTab, city, rentFor, airportTrip, availableCabs]);

    // Active vehicle fare calculations
    const activeVehicleFare = fareData?.vehicleFares?.[selectedCar]
        || fareData?.vehicleFares?.[availableCabs[0]?.id]
        || Object.values(fareData?.vehicleFares || {})[0];

    // Handle "Confirm Booking"
    const handleConfirmBooking = async () => {
        if (!activeVehicleFare) return;
        setIsSubmittingBooking(true);

        const refId = `SC-${Math.floor(10000 + Math.random() * 90000)}`;
        const cleanMobile = mobile.replace(/[^0-9]/g, "");

        let paymentLabel = "Pay full amount to driver";
        let advanceAmount = 0;
        let remainingAmount = activeVehicleFare.totalFare;

        if (selectedPaymentOption === "advance_10") {
            paymentLabel = `Pay 10% advance (Rs. ${activeVehicleFare.advance10})`;
            advanceAmount = activeVehicleFare.advance10;
            remainingAmount = activeVehicleFare.remaining10;
        } else if (selectedPaymentOption === "advance_50") {
            paymentLabel = `Pay 50% advance (Rs. ${activeVehicleFare.advance50})`;
            advanceAmount = activeVehicleFare.advance50;
            remainingAmount = activeVehicleFare.remaining50;
        } else if (selectedPaymentOption === "full") {
            paymentLabel = `Pay full amount (Rs. ${activeVehicleFare.totalFare})`;
            advanceAmount = activeVehicleFare.totalFare;
            remainingAmount = 0;
        }

        const pCity = pickupPlace?.fullName || fromCity || city;
        const dCity = dropPlace?.fullName || toCity || (activeTab === "airport" ? airportTrip : city);
        const routeDesc = activeTab === "outstation"
            ? `${pickupPlace?.name || fromCity} to ${dropPlace?.name || toCity} (${outstationTripType === "round" ? "Round Trip" : "One Way"})`
            : activeTab === "rental"
            ? `${city} Rental (${rentFor})`
            : `${city} Airport Taxi (${airportTrip})`;

        const bookingDetails = {
            referenceId: refId,
            serviceType: activeTab === "outstation" ? "Outstation" : activeTab === "rental" ? "Rental" : "Airport Taxi",
            tripType: outstationTripType === "round" ? "Round Trip" : "One Way",
            pickupCity: pCity,
            dropCity: dCity,
            routeDesc,
            pickupDate,
            pickupTime,
            returnDate: outstationTripType === "round" ? returnDate : null,
            vehicleType: activeVehicleFare.name,
            car: activeVehicleFare.name,
            estimatedFare: activeVehicleFare.totalFare,
            estFare: activeVehicleFare.totalFare,
            distanceKm: activeVehicleFare.actualDistanceKm,
            actualDistanceKm: activeVehicleFare.actualDistanceKm,
            billingDistanceKm: activeVehicleFare.billingDistanceKm,
            minKmApplied: Boolean(activeVehicleFare.minKmApplied),
            duration: activeVehicleFare.durationText,
            ratePerKm: activeVehicleFare.ratePerKm,
            paymentOption: paymentLabel,
            advanceAmount,
            remainingAmount,
            customerName: name.trim(),
            customerPhone: cleanMobile,
            customerEmail: customerEmail.trim(),
            notes: `Payment: ${paymentLabel} | Advance: Rs. ${advanceAmount} | Remaining: Rs. ${remainingAmount} | Actual: ${activeVehicleFare.actualDistanceKm} KM | Billed: ${activeVehicleFare.billingDistanceKm} KM ${activeVehicleFare.minKmApplied ? '(Min KM applied)' : ''} | Duration: ${activeVehicleFare.durationText}`
        };

        try {
            const res = await createBooking(bookingDetails);
            if (res && res.referenceId) {
                bookingDetails.referenceId = res.referenceId;
            }
        } catch (err) {
            console.info('[BookingForm] Backend sync info:', err.message);
        }

        setConfirmedBooking(bookingDetails);
        setIsSubmittingBooking(false);

        if (onSubmitted) {
            onSubmitted(bookingDetails);
        }
    };

    const getWhatsAppUrl = (booking) => {
        const b = booking || confirmedBooking;
        if (!b) return "#";
        const returnDateText = b.returnDate ? `\n🔄 *Return Date:* ${b.returnDate}` : '';
        const distanceLine = `🛣️ *Total Distance:* ${b.billingDistanceKm || b.distanceKm} KM${b.minKmApplied ? ' (Min KM applied)' : ''} (${b.duration || ''})`;
        const msg = `*Taxi Booking Confirmation - Super Cabs*\n\n` +
            `🆔 *Ref ID:* #${b.referenceId}\n` +
            `🚖 *Service:* ${b.serviceType} (${b.tripType})\n` +
            `📍 *Pickup:* ${b.pickupCity}\n` +
            `🎯 *Drop:* ${b.dropCity}\n` +
            `👤 *Customer:* ${b.customerName} (+91 ${b.customerPhone})\n` +
            `📅 *Pickup Date:* ${b.pickupDate} at ${b.pickupTime}` +
            returnDateText + `\n` +
            `🚗 *Vehicle:* ${b.vehicleType} (Rate: Rs. ${b.ratePerKm || activeVehicleFare?.ratePerKm || 15}/KM)\n` +
            distanceLine + `\n` +
            `💰 *Trip Estimation:* Rs. ${b.estimatedFare.toLocaleString('en-IN')}\n` +
            `💳 *Payment Option:* ${b.paymentOption}\n\n` +
            `Please dispatch driver and send driver contact details.`;
        return waHref(msg);
    };

    // ---------- Shared form sections (plain render helpers, not components,
    // so inputs keep focus between keystrokes) ----------
    const renderContactFields = () => (
        <>
            <div className="bf-row-2">
                <div>
                    <label className="bf-label">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`bf-input ${fieldErrors.name ? 'is-invalid' : ''}`}
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            clearFieldError('name');
                        }}
                        required
                    />
                    {renderFieldError('name')}
                </div>
                <div>
                    <label className="bf-label">
                        Mobile No <span className="text-danger">*</span>
                    </label>
                    <input
                        type="tel"
                        className={`bf-input ${fieldErrors.mobile ? 'is-invalid' : ''}`}
                        placeholder="10-digit Mobile Number"
                        value={mobile}
                        maxLength={10}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                            setMobile(val);
                            clearFieldError('mobile');
                        }}
                        required
                    />
                    {renderFieldError('mobile')}
                </div>
            </div>

            <div>
                {!showWhatsapp ? (
                    <button
                        type="button"
                        className="bf-btn-wa-toggle"
                        onClick={() => setShowWhatsapp(true)}
                    >
                        <i className="fab fa-whatsapp"></i> Add WhatsApp number (optional)
                    </button>
                ) : (
                    <div className="bf-form-group">
                        <label className="bf-label">WhatsApp Number (Optional) :</label>
                        <input
                            type="tel"
                            className={`bf-input ${fieldErrors.whatsappNo ? 'is-invalid' : ''}`}
                            placeholder="10-digit WhatsApp Number"
                            value={whatsappNo}
                            maxLength={10}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                                setWhatsappNo(val);
                                clearFieldError('whatsappNo');
                            }}
                        />
                        {renderFieldError('whatsappNo')}
                    </div>
                )}
            </div>
        </>
    );

    const renderDateTimeFields = () => (
        <div className="bf-row-2">
            <div>
                <label className="bf-label">
                    Pick-Up Date <span className="text-danger">*</span>
                </label>
                <input
                    type="date"
                    className={`bf-input ${fieldErrors.pickupDate ? 'is-invalid' : ''}`}
                    value={pickupDate}
                    min={todayStr}
                    onChange={(e) => {
                        setPickupDate(e.target.value);
                        clearFieldError('pickupDate');
                    }}
                    required
                />
                {renderFieldError('pickupDate')}
            </div>
            <div>
                <label className="bf-label">
                    Pick-Up Time <span className="text-danger">*</span>
                </label>
                <select
                    className={`bf-select ${fieldErrors.pickupTime ? 'is-invalid' : ''}`}
                    value={pickupTime}
                    onChange={(e) => {
                        setPickupTime(e.target.value);
                        clearFieldError('pickupTime');
                    }}
                    required
                >
                    <option value="">Select Time</option>
                    {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                    ))}
                </select>
                {renderFieldError('pickupTime')}
            </div>
        </div>
    );

    // Payment options shown on the estimation screen
    const paymentOptions = activeVehicleFare ? [
        {
            id: "driver",
            title: "Pay full amount to driver",
            sub: `Pay Rs. ${activeVehicleFare.totalFare} to the driver in Cash/UPI at trip completion`
        },
        {
            id: "advance_10",
            title: `Pay 10% advance (Rs. ${activeVehicleFare.advance10}) - Razorpay / Cards`,
            sub: `Pay Rs. ${activeVehicleFare.advance10} online via Razorpay (Credit/Debit Card, UPI, NetBanking), remaining Rs. ${activeVehicleFare.remaining10} to driver`
        },
        {
            id: "advance_50",
            title: `Pay 50% advance (Rs. ${activeVehicleFare.advance50}) - Razorpay / Cards`,
            sub: `Pay Rs. ${activeVehicleFare.advance50} online via Razorpay (Credit/Debit Card, UPI, NetBanking), remaining Rs. ${activeVehicleFare.remaining50} to driver`
        },
        {
            id: "full",
            title: `Pay full amount (Rs. ${activeVehicleFare.totalFare}) - Razorpay / Cards`,
            sub: `Pay full amount Rs. ${activeVehicleFare.totalFare} online via Razorpay (Credit & Debit Cards, UPI, NetBanking)`
        }
    ] : [];

    const isMinKmApplied = Boolean(activeVehicleFare?.minKmApplied);

    return (
        <div className="bf-container">
            <style>{styles}</style>

            {/* 1. Top Navigation Tabs */}
            <nav className="bf-tabs-nav" role="tablist">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'outstation'}
                    className={`bf-tab-btn ${activeTab === 'outstation' ? 'active' : ''}`}
                    onClick={() => handleTabChange('outstation')}
                >
                    <i className="fa-solid fa-route"></i>
                    <span>Outstation</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'rental'}
                    className={`bf-tab-btn ${activeTab === 'rental' ? 'active' : ''}`}
                    onClick={() => handleTabChange('rental')}
                >
                    <i className="fa-solid fa-car"></i>
                    <span>Rental</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'airport'}
                    className={`bf-tab-btn ${activeTab === 'airport' ? 'active' : ''}`}
                    onClick={() => handleTabChange('airport')}
                >
                    <i className="fa-solid fa-plane"></i>
                    <span>Airport Taxi</span>
                </button>
            </nav>

            {/* 2. Main Form Body */}
            <div className="bf-body" ref={bodyRef}>

                {/* ================= VIEW 1: BOOKING CONFIRMED SCREEN ================= */}
                {confirmedBooking ? (
                    <div className="bf-success-box">
                        <i className="fa-solid fa-circle-check bf-success-icon"></i>
                        <h3 className="bf-success-title">Booking Registered Successfully!</h3>
                        <div className="bf-success-ref">Booking Ref: #{confirmedBooking.referenceId}</div>

                        <div className="bf-success-card">
                            <div><strong>Service:</strong> {confirmedBooking.serviceType} ({confirmedBooking.tripType})</div>
                            <div><strong>Route:</strong> {confirmedBooking.pickupCity} ➔ {confirmedBooking.dropCity}</div>
                            <div><strong>Vehicle:</strong> {confirmedBooking.vehicleType}</div>
                            <div><strong>Pickup:</strong> {confirmedBooking.pickupDate} at {confirmedBooking.pickupTime}</div>
                            {confirmedBooking.returnDate && <div><strong>Return:</strong> {confirmedBooking.returnDate}</div>}
                            <div>
                                <strong>Total Distance:</strong> {confirmedBooking.billingDistanceKm || confirmedBooking.distanceKm} KM
                                {confirmedBooking.minKmApplied && (
                                    <span style={{ fontSize: '11.5px', color: '#b45309', marginLeft: '6px', fontWeight: 700 }}>
                                        (Min KM applied)
                                    </span>
                                )}
                                {' '}({confirmedBooking.duration})
                            </div>
                            <div style={{ borderTop: '1px dashed #cbd5e1', marginTop: '8px', paddingTop: '8px' }}>
                                <strong>Trip Estimation:</strong>{' '}
                                <span style={{ color: '#0284c7', fontSize: '16px', fontWeight: 800 }}>
                                    Rs. {confirmedBooking.estimatedFare.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div>
                                <strong>Selected Payment:</strong>{' '}
                                <span style={{ color: '#f43f5e', fontWeight: 700 }}>{confirmedBooking.paymentOption}</span>
                            </div>
                        </div>

                        {/* Interactive Online Advance Payment Demo (if advance was selected) */}
                        {confirmedBooking.advanceAmount > 0 && (
                            <div className="bf-upi-box">
                                <div className="bf-upi-title">
                                    <i className="fa-solid fa-shield-halved me-1"></i>
                                    Online Advance Payable: Rs. {confirmedBooking.advanceAmount.toLocaleString('en-IN')}
                                </div>
                                <div className="bf-upi-badge">
                                    Instant UPI / GPay / PhonePe / Cards
                                </div>
                                <div className="bf-upi-apps">
                                    <span className="bf-upi-app-pill">GPay</span>
                                    <span className="bf-upi-app-pill">PhonePe</span>
                                    <span className="bf-upi-app-pill">Paytm</span>
                                    <span className="bf-upi-app-pill">UPI QR</span>
                                    <span className="bf-upi-app-pill">NetBanking</span>
                                </div>
                                {!paidSimulated ? (
                                    <button
                                        type="button"
                                        className="btn btn-dark btn-sm fw-bold px-3 py-1"
                                        onClick={() => setPaidSimulated(true)}
                                    >
                                        <i className="fa-solid fa-bolt me-1"></i> Simulate Pay Online (Rs. {confirmedBooking.advanceAmount})
                                    </button>
                                ) : (
                                    <div className="text-success fw-bold mt-1" style={{ fontSize: '13px' }}>
                                        <i className="fa-solid fa-check-double me-1"></i> Advance Payment of Rs. {confirmedBooking.advanceAmount} Received!
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="bf-success-actions">
                            <a
                                href={getWhatsAppUrl(confirmedBooking)}
                                target={siteConfig.whatsapp ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="bf-btn-wa-confirm"
                            >
                                <i className="fab fa-whatsapp"></i> Confirm &amp; Share on WhatsApp
                            </a>

                            <a
                                href={telHref()}
                                className="btn btn-outline-dark btn-sm w-100 py-2 fw-bold"
                            >
                                <i className="fa-solid fa-phone me-1"></i> Call 24/7 Dispatch ({siteConfig.phoneDisplay})
                            </a>

                            <button
                                type="button"
                                className="bf-btn-back mx-auto mt-2"
                                onClick={() => {
                                    setConfirmedBooking(null);
                                    setFareData(null);
                                }}
                            >
                                <i className="fa-solid fa-rotate-left me-1"></i> Book Another Trip
                            </button>
                        </div>
                    </div>
                ) : fareData ? (
                    /* ================= VIEW 2: TRIP ESTIMATION VIEW ================= */
                    <div className="bf-estimation-card">

                        {/* Fare header */}
                        <div className="bf-est-header">
                            <span className="bf-est-title-dark">Trip Estimation</span>
                            <span className="bf-est-title-fare">Rs.{activeVehicleFare.totalFare}</span>
                        </div>

                        {/* Trip details */}
                        <table className="bf-est-table">
                            <tbody>
                                <tr>
                                    <td className="label-col">Total Distance :</td>
                                    <td className="val-col">
                                        {activeVehicleFare.billingDistanceKm || activeVehicleFare.distanceKm} KM
                                        {activeVehicleFare.minKmApplied && (
                                            <span style={{ fontSize: '11.5px', color: '#b45309', marginLeft: '6px', fontWeight: 700 }}>
                                                (Min KM applied)
                                            </span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label-col">Total Duration</td>
                                    <td className="val-col">{activeVehicleFare.durationText}</td>
                                </tr>
                                <tr>
                                    <td className="label-col">Rate Per Km</td>
                                    <td className="val-col">Rs. {activeVehicleFare.ratePerKm}</td>
                                </tr>
                                <tr>
                                    <td className="label-col">Selected Car Type</td>
                                    <td className="val-col">{activeVehicleFare.name}</td>
                                </tr>
                                <tr>
                                    <td className="label-col">Driver Allowance :</td>
                                    <td className="val-col">{activeVehicleFare.driverAllowanceText}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Payment options */}
                        <div className="bf-payment-card">
                            <div className="bf-payment-title">Select Payment Option</div>

                            <div className="bf-payment-list" role="radiogroup" aria-label="Payment option">
                                {paymentOptions.map((opt) => {
                                    const checked = selectedPaymentOption === opt.id;
                                    return (
                                        <div
                                            key={opt.id}
                                            className="bf-payment-item"
                                            role="radio"
                                            aria-checked={checked}
                                            tabIndex={0}
                                            onClick={() => setSelectedPaymentOption(opt.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setSelectedPaymentOption(opt.id);
                                                }
                                            }}
                                        >
                                            <div className="bf-payment-radio">
                                                {checked ? (
                                                    <div className="bf-radio-outer-checked">
                                                        <div className="bf-radio-inner-dot"></div>
                                                    </div>
                                                ) : (
                                                    <div className="bf-radio-outer-unchecked"></div>
                                                )}
                                            </div>
                                            <div className="bf-payment-content">
                                                <div className="bf-payment-opt-title">{opt.title}</div>
                                                <div className="bf-payment-opt-sub">{opt.sub}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{
                                marginTop: '12px',
                                padding: '10px 14px',
                                background: 'rgba(28, 168, 203, 0.08)',
                                borderRadius: '10px',
                                border: '1px solid rgba(28, 168, 203, 0.22)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '12px',
                                color: '#0369a1'
                            }}>
                                <i className="fa-solid fa-credit-card" style={{ fontSize: '16px', color: '#0284c7', flexShrink: 0 }}></i>
                                <div>
                                    <strong style={{ color: '#0c4a6e', display: 'block', marginBottom: '2px' }}>
                                        Razorpay &amp; Card Payments Acceptable
                                    </strong>
                                    <span>All Credit Cards, Debit Cards (Visa, MasterCard, RuPay), UPI (GPay/PhonePe), &amp; NetBanking accepted.</span>
                                </div>
                            </div>
                        </div>

                        {/* Confirm */}
                        <div className="bf-confirm-wrap">
                            <button
                                type="button"
                                className="bf-btn-confirm"
                                onClick={handleConfirmBooking}
                                disabled={isSubmittingBooking}
                            >
                                {isSubmittingBooking ? "Confirming..." : "Confirm Booking"}
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                className="bf-btn-back"
                                onClick={() => setFareData(null)}
                            >
                                <i className="fa-solid fa-arrow-left"></i> Edit Trip Details
                            </button>
                        </div>
                    </div>
                ) : (
                    /* ================= VIEW 3: INPUT FORM VIEW ================= */
                    <form onSubmit={handleCalculateFare}>

                        {/* OUTSTATION TAB */}
                        {activeTab === 'outstation' && (
                            <>
                                <div className="bf-trip-toggle">
                                    <button
                                        type="button"
                                        className={`bf-trip-btn ${outstationTripType === 'oneway' ? 'active' : ''}`}
                                        onClick={() => setOutstationTripType('oneway')}
                                    >
                                        <span className="bf-radio-dot"></span>
                                        <span>One Way</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`bf-trip-btn ${outstationTripType === 'round' ? 'active' : ''}`}
                                        onClick={() => setOutstationTripType('round')}
                                    >
                                        <span className="bf-radio-dot"></span>
                                        <span>Round Trip</span>
                                    </button>
                                </div>

                                {renderContactFields()}

                                <div className="bf-form-group">
                                    <GooglePlacesAutocompleteInput
                                        id="pickup-city-autocomplete"
                                        label="Pickup City :"
                                        icon="fa-solid fa-location-dot text-success"
                                        value={fromCity}
                                        selectedPlace={pickupPlace}
                                        error={fieldErrors.fromCity}
                                        onChange={(val) => {
                                            setFromCity(val);
                                            clearFieldError('fromCity');
                                        }}
                                        onPlaceSelect={(place) => {
                                            setPickupPlace(place);
                                            clearFieldError('fromCity');
                                        }}
                                        required
                                    />
                                </div>

                                <div className="bf-form-group">
                                    <GooglePlacesAutocompleteInput
                                        id="drop-city-autocomplete"
                                        label="Drop City :"
                                        icon="fa-solid fa-location-crosshairs text-danger"
                                        value={toCity}
                                        selectedPlace={dropPlace}
                                        error={fieldErrors.toCity}
                                        onChange={(val) => {
                                            setToCity(val);
                                            clearFieldError('toCity');
                                        }}
                                        onPlaceSelect={(place) => {
                                            setDropPlace(place);
                                            clearFieldError('toCity');
                                        }}
                                        required
                                    />
                                </div>

                                {routeError && (
                                    <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: '13px' }}>
                                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                        {routeError}
                                    </div>
                                )}

                                {renderDateTimeFields()}

                                {outstationTripType === 'round' && (
                                    <div className="bf-form-group bf-return-date-wrap">
                                        <label className="bf-label">
                                            <i className="fa-solid fa-calendar-check me-1"></i>
                                            Return Date : <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className={`bf-input ${fieldErrors.returnDate ? 'is-invalid' : ''}`}
                                            value={returnDate}
                                            min={pickupDate || todayStr}
                                            onChange={(e) => {
                                                setReturnDate(e.target.value);
                                                clearFieldError('returnDate');
                                            }}
                                            required
                                        />
                                        {renderFieldError('returnDate')}
                                    </div>
                                )}
                            </>
                        )}

                        {/* RENTAL TAB */}
                        {activeTab === 'rental' && (
                            <>
                                <div className="bf-form-group">
                                    <label className="bf-label">
                                        <i className="fa-solid fa-location-dot text-success me-1"></i>
                                        Pickup City : <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`bf-select ${fieldErrors.city ? 'is-invalid' : ''}`}
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                            clearFieldError('city');
                                        }}
                                        required
                                    >
                                        <option value="">Select Pickup City</option>
                                        {cities.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    {renderFieldError('city')}
                                </div>

                                <div className="bf-form-group">
                                    <label className="bf-label">
                                        Rent For : <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`bf-select ${fieldErrors.rentFor ? 'is-invalid' : ''}`}
                                        value={rentFor}
                                        onChange={(e) => {
                                            setRentFor(e.target.value);
                                            clearFieldError('rentFor');
                                        }}
                                        required
                                    >
                                        <option value="">Select Hours &amp; KM Package</option>
                                        {rentalDurations.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    {renderFieldError('rentFor')}
                                </div>

                                {renderContactFields()}
                                {renderDateTimeFields()}
                            </>
                        )}

                        {/* AIRPORT TAXI TAB */}
                        {activeTab === 'airport' && (
                            <>
                                <div className="bf-form-group">
                                    <label className="bf-label">
                                        <i className="fa-solid fa-plane-departure me-1"></i>
                                        Airport City : <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`bf-select ${fieldErrors.city ? 'is-invalid' : ''}`}
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                            clearFieldError('city');
                                        }}
                                        required
                                    >
                                        <option value="">Select Airport City</option>
                                        {cities.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    {renderFieldError('city')}
                                </div>

                                <div className="bf-form-group">
                                    <label className="bf-label">
                                        <i className="fa-solid fa-arrows-up-down me-1"></i>
                                        Trip Direction : <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`bf-select ${fieldErrors.airportTrip ? 'is-invalid' : ''}`}
                                        value={airportTrip}
                                        onChange={(e) => {
                                            setAirportTrip(e.target.value);
                                            clearFieldError('airportTrip');
                                        }}
                                        required
                                    >
                                        <option value="">Select Trip Direction</option>
                                        {airportTrips.map((at) => (
                                            <option key={at} value={at}>{at}</option>
                                        ))}
                                    </select>
                                    {renderFieldError('airportTrip')}
                                </div>

                                <div className="bf-form-group">
                                    <GooglePlacesAutocompleteInput
                                        id="airport-area-autocomplete"
                                        label={airportTrip === "Cabs To the Airport" ? "Pickup City / Area :" : "Drop City / Area :"}
                                        icon="fa-solid fa-location-crosshairs text-danger"
                                        placeholder={airportTrip === "Cabs To the Airport" ? "Enter Pickup City / Area" : "Enter Drop City / Destination"}
                                        value={toCity}
                                        selectedPlace={dropPlace}
                                        error={fieldErrors.toCity}
                                        onChange={(val) => {
                                            setToCity(val);
                                            clearFieldError('toCity');
                                        }}
                                        onPlaceSelect={(place) => {
                                            setDropPlace(place);
                                            clearFieldError('toCity');
                                        }}
                                        required
                                    />
                                </div>

                                {renderContactFields()}
                                {renderDateTimeFields()}
                            </>
                        )}

                        {/* SELECT CAR (SEDAN, SUV, INNOVA) */}
                        <div className="bf-form-group" ref={carDropdownRef}>
                            <label className="bf-label">
                                Select Car :
                                <span className="ms-2 fw-normal" style={{ fontSize: '12px', color: '#6c757d' }}>(Click to change vehicle)</span>
                            </label>
                            <div
                                className={`bf-car-trigger ${isCarDropdownOpen ? 'open' : ''}`}
                                onClick={() => setIsCarDropdownOpen(!isCarDropdownOpen)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setIsCarDropdownOpen(!isCarDropdownOpen);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label="Select Car"
                                aria-expanded={isCarDropdownOpen}
                            >
                                {currentCarObj ? (
                                    <div className="bf-car-selected-val">
                                        <img
                                            src={currentCarObj.icon}
                                            alt={currentCarObj.name}
                                            className="bf-car-selected-img"
                                            onError={(e) => { e.currentTarget.src = '/assets/img/cabs/car-icon-sedan.png'; }}
                                        />
                                        <span className="bf-car-selected-name">{currentCarObj.name}</span>
                                    </div>
                                ) : (
                                    <span className="bf-car-placeholder">Select Car</span>
                                )}
                                <i className={`fa-solid fa-chevron-down bf-car-chevron ${isCarDropdownOpen ? 'open' : ''}`}></i>
                            </div>

                            {isCarDropdownOpen && (
                                <div className="bf-car-menu" role="listbox">
                                    {availableCabs.map((opt) => (
                                        <div
                                            key={opt.id}
                                            className={`bf-car-option ${selectedCar === opt.id ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedCar(opt.id);
                                                setIsCarDropdownOpen(false);
                                            }}
                                            role="option"
                                            aria-selected={selectedCar === opt.id}
                                        >
                                            <img
                                                src={opt.icon}
                                                alt={opt.name}
                                                className="bf-car-option-img"
                                                onError={(e) => { e.currentTarget.src = '/assets/img/cabs/car-icon-sedan.png'; }}
                                            />
                                            <span className="bf-car-option-name" style={{ flex: 1 }}>{opt.name}</span>
                                            {selectedCar === opt.id && (
                                                <i className="fa-solid fa-circle-check ms-auto" style={{ fontSize: '16px', color: '#0d6efd' }}></i>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {errorMsg && (
                            <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: '13px' }}>
                                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                {errorMsg}
                            </div>
                        )}

                        {/* Action Buttons: Get Travel Fare */}
                        <div className="bf-actions-row">
                            <button type="submit" className="bf-btn-submit">
                                Get Travel Fare
                            </button>

                            <a
                                href={telHref()}
                                className="bf-play-badge"
                                title="Direct 24/7 Booking Desk"
                            >
                                <i className="fa-brands fa-google-play"></i>
                                <div>
                                    <span className="bf-play-text-top">GET IT ON</span>
                                    <span className="bf-play-text-bot">Google Play</span>
                                </div>
                            </a>
                        </div>

                        <datalist id="supercabs-cities-list">
                            {cities.map((c) => (
                                <option key={c} value={c} />
                            ))}
                        </datalist>
                    </form>
                )}

            </div>
        </div>
    );
}

export default BookingForm;