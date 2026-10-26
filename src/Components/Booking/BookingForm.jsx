import React, { useState, useEffect, useRef } from 'react';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import { createBooking } from '../../services/bookingService';

const styles = `
.bf-container {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
    overflow: visible;
    font-family: var(--body-font, 'Inter', system-ui, sans-serif);
    border: 1px solid #e2e8f0;
    max-width: 520px;
    margin: 0 auto;
}

/* Tabs Header */
.bf-tabs-nav {
    display: flex;
    background: #ffffff;
    border-bottom: 2px solid #e2e8f0;
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
.bf-tab-btn:last-child {
    border-right: none;
}
.bf-tab-btn i {
    font-size: 15px;
}
.bf-tab-btn:hover {
    background: #f8fafc;
}
.bf-tab-btn.active {
    background: #38bdf8;
    color: #ffffff;
}
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

/* Form Body */
.bf-body {
    padding: 24px 22px;
}
.bf-form-group {
    margin-bottom: 15px;
    position: relative;
}
.bf-label {
    display: block;
    font-size: 13.5px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 5px;
}
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
.bf-trip-btn.active {
    background: #ffffff;
    color: #0f172a;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
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
.bf-trip-btn.active .bf-radio-dot {
    border-color: #38bdf8;
}
.bf-trip-btn.active .bf-radio-dot::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #38bdf8;
}

/* Two Column Grid */
.bf-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 15px;
}

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
.bf-btn-wa-toggle:hover {
    background: #16a34a;
}

/* Custom Car Dropdown Selector (Matching user screenshot) */
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
.bf-car-selected-val {
    display: flex;
    align-items: center;
    gap: 12px;
}
.bf-car-selected-img {
    height: 28px;
    width: 52px;
    object-fit: contain;
}
.bf-car-selected-name {
    font-size: 15px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: 0.5px;
}
.bf-car-selected-sub {
    font-size: 12.5px;
    font-weight: 500;
    color: #64748b;
}
.bf-car-placeholder {
    font-size: 14px;
    color: #64748b;
}
.bf-car-chevron {
    font-size: 13px;
    color: #64748b;
    transition: transform 0.2s ease;
}
.bf-car-chevron.open {
    transform: rotate(180deg);
}

/* Car Options Dropdown Menu (Exact match to reference image - in-flow so never clipped) */
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
.bf-car-option:last-child {
    border-bottom: none;
}
.bf-car-option:hover, .bf-car-option.selected {
    background: #f4f4f5;
}
.bf-car-option-img {
    width: 54px;
    height: 30px;
    object-fit: contain;
}
.bf-car-option-name {
    font-size: 15px;
    font-weight: 800;
    color: #18181b;
    letter-spacing: 0.5px;
}
.bf-car-option-meta {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    margin-left: 8px;
}
@media (max-width: 480px) {
    .bf-car-option-meta {
        display: none;
    }
}

/* Return Date Card Animation */
.bf-return-date-wrap {
    animation: fadeIn 0.25s ease;
}

/* Bottom Action Row */
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
.bf-btn-submit:hover {
    background: #ca8a04;
    transform: translateY(-1px);
}
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
.bf-play-badge:hover {
    opacity: 0.88;
    color: #ffffff;
}
.bf-play-badge i {
    font-size: 22px;
    color: #38bdf8;
}
.bf-play-text-top {
    font-size: 9px;
    text-transform: uppercase;
    line-height: 1;
    display: block;
    color: #94a3b8;
}
.bf-play-text-bot {
    font-size: 13px;
    font-weight: 700;
    line-height: 1.1;
    display: block;
}

/* Fare Result Modal / Panel */
.bf-result-box {
    background: #f8fafc;
    border: 1.5px solid #38bdf8;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    animation: fadeIn 0.3s ease;
}
.bf-result-title {
    font-size: 16px;
    font-weight: 800;
    color: #0b2229;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.bf-result-fare {
    font-size: 24px;
    font-weight: 900;
    color: #0284c7;
}
.bf-result-details {
    font-size: 13px;
    color: #475569;
    margin-bottom: 16px;
    line-height: 1.6;
}
.bf-result-btn-wa {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: #22c55e;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    padding: 12px;
    border-radius: 6px;
    text-decoration: none;
    margin-bottom: 8px;
}
.bf-result-btn-wa:hover {
    background: #16a34a;
    color: #ffffff;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Pondicherry",
    "Bangalore"
];

// 3 Vehicle Categories: SEDAN, SUV, INNOVA
const carOptions = [
    {
        id: "SEDAN",
        name: "SEDAN",
        icon: "/assets/img/cabs/car-icon-sedan.png",
        rateOneWay: 15,
        rateRoundTrip: 14
    },
    {
        id: "SUV",
        name: "SUV",
        icon: "/assets/img/cabs/car-icon-suv.png",
        rateOneWay: 20,
        rateRoundTrip: 19
    },
    {
        id: "INNOVA",
        name: "INNOVA",
        icon: "/assets/img/cabs/car-icon-innova.png",
        rateOneWay: 21,
        rateRoundTrip: 20
    }
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
    
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [returnDate, setReturnDate] = useState("");
    
    // Car Selection state - empty by default unless initialVehicle is provided
    const [selectedCar, setSelectedCar] = useState(initialVehicle ? (carOptions.find(c => initialVehicle.toUpperCase().includes(c.id))?.id || "") : "");
    const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
    const carDropdownRef = useRef(null);

    const [errorMsg, setErrorMsg] = useState("");
    const [fareResult, setFareResult] = useState(null);

    // Sync if initial props change
    useEffect(() => {
        if (initialTab) setActiveTab(initialTab);
        if (initialVehicle) {
            const matched = carOptions.find(c => initialVehicle.toUpperCase().includes(c.id));
            if (matched) setSelectedCar(matched.id);
        }
        if (initialCity) {
            setFromCity(initialCity);
            setCity(initialCity);
        }
    }, [initialTab, initialVehicle, initialCity]);

    // Close car dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (carDropdownRef.current && !carDropdownRef.current.contains(event.target)) {
                setIsCarDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFareResult(null);
        setErrorMsg("");
        setIsCarDropdownOpen(false);
    };

    const currentCarObj = carOptions.find(c => c.id === selectedCar);

    const handleCalculateFare = (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!name.trim()) {
            setErrorMsg("Please enter your full name.");
            return;
        }
        const cleanMobile = mobile.replace(/[^0-9]/g, "");
        if (cleanMobile.length < 10) {
            setErrorMsg("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (activeTab === 'outstation') {
            if (!fromCity.trim() || !toCity.trim()) {
                setErrorMsg("Please enter both pickup (From) and destination (To) places.");
                return;
            }
        } else if (activeTab === 'rental') {
            if (!city) {
                setErrorMsg("Please select a city.");
                return;
            }
            if (!rentFor) {
                setErrorMsg("Please select rental hours & KM package.");
                return;
            }
        } else if (activeTab === 'airport') {
            if (!city) {
                setErrorMsg("Please select an airport city.");
                return;
            }
            if (!airportTrip) {
                setErrorMsg("Please select trip direction.");
                return;
            }
        }

        if (!pickupDate) {
            setErrorMsg("Please select a pick-up date.");
            return;
        }
        if (!pickupTime) {
            setErrorMsg("Please select a pick-up time.");
            return;
        }
        if (activeTab === 'outstation' && outstationTripType === 'round' && !returnDate) {
            setErrorMsg("Please select a return date.");
            return;
        }

        if (!selectedCar) {
            setErrorMsg("Please select a car (SEDAN, SUV, or INNOVA).");
            return;
        }

        // Calculate estimated fare
        let estFare = 0;
        let routeDesc = "";

        if (activeTab === "rental") {
            routeDesc = `City Rental (${city}) • ${rentFor}`;
            const isHeavy = selectedCar === "SUV" || selectedCar === "INNOVA";
            const kmMatch = rentFor.match(/(\d+)\s*KM/i);
            const km = kmMatch ? parseInt(kmMatch[1], 10) : 40;
            estFare = isHeavy ? (1200 + km * 25) : (800 + km * 18);
        } else if (activeTab === "airport") {
            routeDesc = `Airport Taxi (${city}) • ${airportTrip}`;
            const isHeavy = selectedCar === "SUV" || selectedCar === "INNOVA";
            estFare = isHeavy ? 1800 : 1100;
        } else {
            // Outstation
            const tripTitle = outstationTripType === "round" ? "Round Trip Outstation" : "One Way Outstation Trip";
            routeDesc = `${fromCity} to ${toCity} • ${tripTitle}`;
            
            // Baseline 250km minimum estimation
            const minKm = outstationTripType === "round" ? 250 : 130;
            const ratePerKm = outstationTripType === "round" ? (currentCarObj?.rateRoundTrip || 14) : (currentCarObj?.rateOneWay || 15);
            const driverBata = selectedCar === "SUV" || selectedCar === "INNOVA" ? 500 : 400;
            estFare = (minKm * ratePerKm) + driverBata;
        }

        const refId = `SC-${Math.floor(10000 + Math.random() * 90000)}`;
        const details = {
            referenceId: refId,
            tab: activeTab === "outstation" ? "Outstation" : activeTab === "rental" ? "Rental" : "Airport Taxi",
            tripType: outstationTripType === "round" ? "Round Trip" : "One Way",
            fromCity,
            toCity,
            city,
            pickupCity: fromCity || city,
            dropCity: toCity || (activeTab === "airport" ? airportTrip : city),
            routeDesc,
            customerName: name,
            customerPhone: cleanMobile,
            name,
            mobile: cleanMobile,
            whatsapp: whatsappNo || cleanMobile,
            pickupDate,
            pickupTime,
            returnDate: outstationTripType === "round" ? returnDate : null,
            vehicleType: currentCarObj?.name || selectedCar,
            car: currentCarObj?.name || selectedCar,
            carIcon: currentCarObj?.icon,
            estimatedFare: estFare,
            estFare
        };

        setFareResult(details);

        // Save booking to backend API asynchronously with graceful offline fallback
        createBooking(details).then((res) => {
            if (res && res.referenceId) {
                setFareResult((prev) => (prev ? { ...prev, referenceId: res.referenceId } : prev));
            }
        }).catch((err) => {
            console.info('[BookingForm] Backend sync info:', err.message);
        });

        if (onSubmitted) {
            onSubmitted(details);
        }
    };

    const getWhatsAppUrl = () => {
        if (!fareResult) return "#";
        const returnDateText = fareResult.returnDate ? `\n🔄 *Return Date:* ${fareResult.returnDate}` : '';
        const msg = `*Taxi Booking Enquiry - Super Cabs*\n\n` +
            `🆔 *Ref ID:* #${fareResult.referenceId}\n` +
            `🚖 *Service:* ${fareResult.tab} (${fareResult.tripType})\n` +
            `📍 *Route:* ${fareResult.routeDesc}\n` +
            `👤 *Customer:* ${fareResult.name}\n` +
            `📞 *Mobile:* +91 ${fareResult.mobile}\n` +
            `📅 *Pickup Date:* ${fareResult.pickupDate} at ${fareResult.pickupTime}` +
            returnDateText + `\n` +
            `🚗 *Vehicle:* ${fareResult.car}\n` +
            `💰 *Est. Fare:* ₹ ${fareResult.estFare.toLocaleString('en-IN')}\n\n` +
            `Please confirm availability and dispatch driver.`;
        return waHref(msg);
    };

    return (
        <div className="bf-container">
            <style>{styles}</style>

            {/* 1. Top Navigation Tabs */}
            <nav className="bf-tabs-nav" role="tablist">
                <button
                    type="button"
                    className={`bf-tab-btn ${activeTab === 'outstation' ? 'active' : ''}`}
                    onClick={() => handleTabChange('outstation')}
                >
                    <i className="fa-solid fa-route"></i>
                    <span>Outstation</span>
                </button>
                <button
                    type="button"
                    className={`bf-tab-btn ${activeTab === 'rental' ? 'active' : ''}`}
                    onClick={() => handleTabChange('rental')}
                >
                    <i className="fa-solid fa-car"></i>
                    <span>Rental</span>
                </button>
                <button
                    type="button"
                    className={`bf-tab-btn ${activeTab === 'airport' ? 'active' : ''}`}
                    onClick={() => handleTabChange('airport')}
                >
                    <i className="fa-solid fa-plane"></i>
                    <span>Airport Taxi</span>
                </button>
            </nav>

            {/* 2. Main Form Body */}
            <form onSubmit={handleCalculateFare} className="bf-body">

                {/* ================= OUTSTATION TAB ================= */}
                {activeTab === 'outstation' && (
                    <>
                        {/* Outstation Trip Type: One Way vs Round Trip */}
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

                        {/* Name & Mobile No (2 columns) */}
                        <div className="bf-row-2">
                            <div>
                                <label className="bf-label">Name</label>
                                <input
                                    type="text"
                                    className="bf-input"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="bf-label">Mobile No</label>
                                <input
                                    type="tel"
                                    className="bf-input"
                                    placeholder="Mobile Number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* + Add WhatsApp Number (optional) */}
                        <div>
                            {!showWhatsapp ? (
                                <button
                                    type="button"
                                    className="bf-btn-wa-toggle"
                                    onClick={() => setShowWhatsapp(true)}
                                >
                                    <i className="fab fa-whatsapp"></i> + Add WhatsApp Number (optional)
                                </button>
                            ) : (
                                <div className="bf-form-group">
                                    <label className="bf-label">WhatsApp Number :</label>
                                    <input
                                        type="tel"
                                        className="bf-input"
                                        placeholder="WhatsApp Number"
                                        value={whatsappNo}
                                        onChange={(e) => setWhatsappNo(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* From & To (2 columns - Places text input) */}
                        <div className="bf-row-2">
                            <div>
                                <label className="bf-label">From :</label>
                                <input
                                    type="text"
                                    className="bf-input"
                                    placeholder="Pickup place / area"
                                    value={fromCity}
                                    onChange={(e) => setFromCity(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="bf-label">To :</label>
                                <input
                                    type="text"
                                    className="bf-input"
                                    placeholder="Drop place / area"
                                    value={toCity}
                                    onChange={(e) => setToCity(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Pick-Up Date & Pick-Up Time (2 columns) */}
                        <div className="bf-row-2">
                            <div>
                                <label className="bf-label">Pick-Up Date</label>
                                <input
                                    type="date"
                                    className="bf-input"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="bf-label">Pick-Up Time</label>
                                <select
                                    className="bf-select"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                >
                                    <option value="">Select Time</option>
                                    {timeSlots.map((ts) => (
                                        <option key={ts} value={ts}>{ts}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Return Date (ONLY WHEN ROUND TRIP IS SELECTED) */}
                        {outstationTripType === 'round' && (
                            <div className="bf-form-group bf-return-date-wrap">
                                <label className="bf-label">
                                    <i className="fa-solid fa-calendar-check text-info me-1"></i>
                                    Return Date :
                                </label>
                                <input
                                    type="date"
                                    className="bf-input"
                                    value={returnDate}
                                    min={pickupDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </>
                )}

                {/* ================= RENTAL TAB ================= */}
                {activeTab === 'rental' && (
                    <>
                        <div className="bf-form-group">
                            <label className="bf-label">City :</label>
                            <select
                                className="bf-select"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">Select City</option>
                                {cities.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bf-form-group">
                            <label className="bf-label">Rent For :</label>
                            <select
                                className="bf-select"
                                value={rentFor}
                                onChange={(e) => setRentFor(e.target.value)}
                            >
                                <option value="">Select Hours &amp; KM Package</option>
                                {rentalDurations.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* Name & Mobile No (2 columns) */}
                        <div className="bf-row-2">
                            <div>
                                <label className="bf-label">Name</label>
                                <input
                                    type="text"
                                    className="bf-input"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="bf-label">Mobile No</label>
                                <input
                                    type="tel"
                                    className="bf-input"
                                    placeholder="Mobile Number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            {!showWhatsapp ? (
                                <button
                                    type="button"
                                    className="bf-btn-wa-toggle"
                                    onClick={() => setShowWhatsapp(true)}
                                >
                                    <i className="fab fa-whatsapp"></i> + Add WhatsApp Number (optional)
                                </button>
                            ) : (
                                <div className="bf-form-group">
                                    <label className="bf-label">WhatsApp Number :</label>
                                    <input
                                        type="tel"
                                        className="bf-input"
                                        placeholder="WhatsApp Number"
                                        value={whatsappNo}
                                        onChange={(e) => setWhatsappNo(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Pick-Up Date & Pick-Up Time (2 columns) */}
                        <div className="bf-row-2">
                            <div>
                                <label className="bf-label">Pick-Up Date</label>
                                <input
                                    type="date"
                                    className="bf-input"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="bf-label">Pick-Up Time</label>
                                <select
                                    className="bf-select"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                >
                                    <option value="">Select Time</option>
                                    {timeSlots.map((ts) => (
                                        <option key={ts} value={ts}>{ts}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {/* ================= AIRPORT TAXI TAB ================= */}
                {activeTab === 'airport' && (
                    <>
                        <div className="bf-form-group">
                            <label className="bf-label">City :</label>
                            <select
                                className="bf-select"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">Select Airport City</option>
                                {cities.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bf-form-group">
                            <label className="bf-label">Trip :</label>
                            <select
                                className="bf-select"
                                value={airportTrip}
                                onChange={(e) => setAirportTrip(e.target.value)}
                            >
                                <option value="">Select Trip Direction</option>
                                {airportTrips.map((at) => (
                                    <option key={at} value={at}>{at}</option>
                                ))}
                            </select>
                        </div>

                        {/* Name & Mobile No (2 columns) */}
                        <div className="bf-row-2">
                            <div>
                                <label className="bf-label">Name</label>
                                <input
                                    type="text"
                                    className="bf-input"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="bf-label">Mobile No</label>
                                <input
                                    type="tel"
                                    className="bf-input"
                                    placeholder="Mobile Number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            {!showWhatsapp ? (
                                <button
                                    type="button"
                                    className="bf-btn-wa-toggle"
                                    onClick={() => setShowWhatsapp(true)}
                                >
                                    <i className="fab fa-whatsapp"></i> + Add WhatsApp Number (optional)
                                </button>
                            ) : (
                                <div className="bf-form-group">
                                    <label className="bf-label">WhatsApp Number :</label>
                                    <input
                                        type="tel"
                                        className="bf-input"
                                        placeholder="WhatsApp Number"
                                        value={whatsappNo}
                                        onChange={(e) => setWhatsappNo(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Pick-Up Date & Pick-Up Time (2 columns) */}
                        <div className="bf-row-2">
                            <div>
                                <label className="bf-label">Pick-Up Date</label>
                                <input
                                    type="date"
                                    className="bf-input"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="bf-label">Pick-Up Time</label>
                                <select
                                    className="bf-select"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                >
                                    <option value="">Select Time</option>
                                    {timeSlots.map((ts) => (
                                        <option key={ts} value={ts}>{ts}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {/* ================= COMMON: SELECT CAR (MATCHING USER SCREENSHOT) ================= */}
                <div className="bf-form-group" ref={carDropdownRef}>
                    <label className="bf-label">
                        Select Car :
                        <span className="text-muted ms-2 fw-normal" style={{ fontSize: '12px' }}>(Click to change vehicle)</span>
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
                    >
                        {currentCarObj ? (
                            <div className="bf-car-selected-val">
                                <img
                                    src={currentCarObj.icon}
                                    alt={currentCarObj.name}
                                    className="bf-car-selected-img"
                                />
                                <span className="bf-car-selected-name">{currentCarObj.name}</span>
                            </div>
                        ) : (
                            <span className="bf-car-placeholder">Select Car</span>
                        )}
                        <i className={`fa-solid fa-chevron-down bf-car-chevron ${isCarDropdownOpen ? 'open' : ''}`}></i>
                    </div>

                    {/* Custom In-flow Menu with Clean Vehicle Categories */}
                    {isCarDropdownOpen && (
                        <div className="bf-car-menu" role="listbox">
                            {carOptions.map((opt) => (
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
                                    />
                                    <span className="bf-car-option-name">{opt.name}</span>
                                    {selectedCar === opt.id && (
                                        <i className="fa-solid fa-circle-check text-primary fw-bold ms-auto" style={{ fontSize: '16px' }}></i>
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

                {/* Action Buttons */}
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

                {/* Fare Result Display */}
                {fareResult && (
                    <div className="bf-result-box">
                        <div className="bf-result-title">
                            <span>Estimated Travel Fare</span>
                            <span className="bf-result-fare">₹ {fareResult.estFare.toLocaleString('en-IN')}*</span>
                        </div>
                        <div className="bf-result-details">
                            {fareResult.referenceId && (
                                <div style={{ color: '#0284c7', fontWeight: '700', marginBottom: '6px', fontSize: '13px' }}>
                                    <i className="fa-solid fa-receipt me-1"></i> Booking Ref: #{fareResult.referenceId}
                                </div>
                            )}
                            <div><strong>Service:</strong> {fareResult.tab} ({fareResult.routeDesc})</div>
                            <div><strong>Vehicle:</strong> {fareResult.car}</div>
                            <div><strong>Pickup:</strong> {fareResult.pickupDate} at {fareResult.pickupTime}</div>
                            {fareResult.returnDate && (
                                <div><strong>Return Date:</strong> {fareResult.returnDate}</div>
                            )}
                            <div className="text-muted mt-1" style={{ fontSize: '11.5px' }}>*Tolls &amp; Interstate permits as actuals. Driver bata included.</div>
                        </div>

                        <a 
                            href={getWhatsAppUrl()} 
                            target={siteConfig.whatsapp ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="bf-result-btn-wa"
                        >
                            <i className="fab fa-whatsapp"></i> Confirm Booking on WhatsApp
                        </a>

                        <a 
                            href={telHref()} 
                            className="btn btn-outline-secondary btn-sm w-100 text-center fw-bold py-2"
                            style={{ fontSize: '13px' }}
                        >
                            <i className="fa-solid fa-phone me-1"></i> Call 24/7 Dispatch ({siteConfig.phoneDisplay})
                        </a>
                    </div>
                )}
            </form>
        </div>
    );
}

export default BookingForm;
