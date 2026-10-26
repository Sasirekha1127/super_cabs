import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { waHref } from '../data/siteConfig';
import { useBookingModal } from '../Booking/BookingModalContext';
import usePublicCabs from '../../services/usePublicCabs';

const styles = `
.tp-section {
    background: #fdfdfd;
    position: relative;
}

/* Heading */
.tp-subtitle-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--theme-color, #1ca8cb);
    background: rgba(28, 168, 203, 0.1);
    padding: 6px 16px;
    border-radius: 30px;
    margin-bottom: 12px;
}

/* Cards */
.tp-grid {
    align-items: stretch;
}
.tp-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 34px 28px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 10px 30px rgba(11, 34, 41, 0.05);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
}
.tp-card:hover {
    transform: translateY(-6px);
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 20px 45px rgba(11, 34, 41, 0.12);
}

/* Featured card style */
.tp-card.is-featured {
    border: 2px solid var(--theme-color, #1ca8cb);
    box-shadow: 0 16px 40px rgba(28, 168, 203, 0.14);
}
.tp-card-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 16px;
    align-self: flex-start;
}
.tp-card-badge-soft {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    background: rgba(28, 168, 203, 0.1);
    color: var(--theme-color, #1ca8cb);
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 16px;
    align-self: flex-start;
}

/* Card Header */
.tp-card-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
}
.tp-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(28, 168, 203, 0.1);
    color: var(--theme-color, #1ca8cb);
    display: grid;
    place-items: center;
    font-size: 20px;
    flex-shrink: 0;
}
.tp-card.is-featured .tp-icon {
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
}
.tp-title {
    margin: 0;
    font-size: 21px;
    font-weight: 700;
    color: #0b2229;
}
.tp-lead {
    font-size: 13.5px;
    line-height: 1.55;
    color: #64748b;
    margin-bottom: 18px;
}

/* Pricing Highlight Strip */
.tp-rate-pill {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tp-rate-main {
    font-size: 16px;
    font-weight: 700;
    color: #0b2229;
}
.tp-rate-sub {
    font-size: 12px;
    font-weight: 600;
    color: var(--theme-color, #1ca8cb);
    background: #ffffff;
    padding: 3px 8px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}

/* Checklist */
.tp-list {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    flex-grow: 1;
}
.tp-list li {
    font-size: 13.5px;
    line-height: 1.5;
    color: #334155;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    gap: 9px;
}
.tp-list li i {
    color: var(--theme-color, #1ca8cb);
    font-size: 13px;
    margin-top: 3px;
    flex-shrink: 0;
}

/* Buttons */
.tp-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid #f1f5f9;
}

/* Corporate Strip */
.tp-corp-banner {
    background: #0b2229;
    border-radius: 16px;
    padding: 28px 34px;
    color: #ffffff;
    margin-top: 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

/* Exact Reference Tariff Table (from user image) */
.pt-tariff-section {
    padding-bottom: 70px;
}
.pt-tariff-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 28px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.03);
}
.pt-tariff-table {
    width: 100%;
    margin: 0;
    border-collapse: collapse;
}
.pt-tariff-table thead th {
    background: linear-gradient(135deg, #0b2229 0%, #113d48 100%);
    color: #ffffff;
    font-size: 13.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 16px 24px;
    border-bottom: 3.5px solid var(--theme-color, #1ca8cb);
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    white-space: nowrap;
    text-align: left;
}
.pt-tariff-table thead th:last-child {
    border-right: none;
}
.pt-tariff-table tbody td {
    padding: 16px 24px;
    font-size: 14px;
    color: #334155;
    border-bottom: 1px solid #e2e8f0;
    border-right: 1px solid #f1f5f9;
    vertical-align: middle;
}
.pt-tariff-table tbody td:last-child {
    border-right: none;
}
.pt-tariff-table tbody tr:last-child td {
    border-bottom: none;
}
.pt-tariff-table tbody tr:hover {
    background-color: rgba(28, 168, 203, 0.04);
}
.pt-v-name {
    font-weight: 800;
    color: #0b2229;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}
.pt-v-rate {
    font-weight: 700;
    color: var(--theme-color, #1ca8cb);
}
.pt-v-add {
    color: #475569;
    font-size: 13.5px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.pt-v-add i {
    color: var(--theme-color, #1ca8cb);
    font-size: 14.5px;
}

/* Travel Guidelines */
.pt-guide-wrap {
    margin-top: 28px;
    padding: 24px 28px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
}
.pt-guide-title {
    font-size: 15px;
    font-weight: 800;
    color: #0b2229;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.pt-guide-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.pt-guide-list li {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
}
.pt-guide-list li:last-child {
    margin-bottom: 0;
}
.pt-guide-list li i {
    color: var(--theme-color, #1ca8cb);
    font-size: 7px;
    margin-top: 8px;
    flex-shrink: 0;
}
.pt-guide-list li strong {
    color: #0b2229;
}

@media (max-width: 991px) {
    .tp-card { padding: 26px 20px; }
}
`;

function PricingPlan({ className }) {
    const vehicles = usePublicCabs();
    const packages = [
        {
            title: "Local City Rental",
            tag: "Hourly City Packages",
            icon: "fa-city",
            featured: false,
            desc: "Hourly packages for city shopping, business visits, medical errands, and family functions.",
            rateMain: "Hourly / Day Slabs",
            rateSub: "4h / 8h / 12h Slabs",
            list: [
                "4 Hrs / 40 Kms (Quick city errand & meetings)",
                "8 Hrs / 80 Kms (Full day city travel & sightseeing)",
                "12 Hrs / 120 Kms (Extended full day & suburbs)",
                "AC clean sedans, hatchbacks & SUVs",
                "Zero peak-hour surge charges guaranteed"
            ],
            service: "Local Taxi"
        },
        {
            title: "Outstation Trips",
            tag: "One-Way & Round-Trip",
            icon: "fa-route",
            featured: true,
            badge: "⭐ Most Popular For Travel",
            desc: "Single-direction drops with zero return charges, and multi-day round trips with dedicated chauffeur.",
            rateMain: "Per-KM Tariff",
            rateSub: "One-Way & Round-Trip",
            list: [
                "One-Way Drop (Pay strictly for single direction)",
                "Round-Trip (Dedicated cab stays for entire tour)",
                "250 Kms/day standard calculation on round trips",
                "Highway-trained, verified & polite chauffeurs",
                "Transparent Fastag tolls & driver bata"
            ],
            service: "Outstation Taxi"
        },
        {
            title: "Airport Transfers",
            tag: "Punctual Drops & Pickups",
            icon: "fa-plane-departure",
            featured: false,
            desc: "Guaranteed on-time doorstep drops and flight-tracked terminal pickups at transparent flat fares.",
            rateMain: "Fixed Flat Rate",
            rateSub: "24/7 Flight Tracking",
            list: [
                "City to Airport Drop (Buffer-optimized pickup)",
                "Airport to City Pickup (Meet & greet at arrival)",
                "45 Mins complimentary flight delay waiting",
                "Dedicated boot space for domestic & overseas bags",
                "Round-the-clock early morning & midnight service"
            ],
            service: "Airport Taxi"
        }
    ];

    const { openBookingModal } = useBookingModal();

    return (
        <section className={`tp-section ${className || 'space'}`}>
            <style>{styles}</style>
            <div className="container">
                {/* Clean Header */}
                <div className="title-area text-center mb-5">
                    <span className="tp-subtitle-pill">
                        <i className="fa-solid fa-tags"></i> Transparent Tariff &amp; Packages
                    </span>
                    <h2 className="sec-title mb-2">Choose Your Cab Package</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Upfront, transparent quotes with zero surge pricing, no return charges on one-way drops, and reliable per-km billing across Tamil Nadu and South India.
                    </p>
                </div>

                {/* 3 Spacious Cards Grid */}
                <div className="row gy-4 tp-grid">
                    {packages.map((pkg, idx) => (
                        <div key={idx} className="col-lg-4 col-md-6">
                            <div className={`tp-card ${pkg.featured ? 'is-featured' : ''}`}>
                                {pkg.featured ? (
                                    <span className="tp-card-badge">
                                        {pkg.badge}
                                    </span>
                                ) : (
                                    <span className="tp-card-badge-soft">
                                        {pkg.tag}
                                    </span>
                                )}

                                <div className="tp-card-header">
                                    <div className="tp-icon">
                                        <i className={`fa-solid ${pkg.icon}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="tp-title">{pkg.title}</h3>
                                        <span className="text-muted" style={{ fontSize: '12.5px' }}>{pkg.tag}</span>
                                    </div>
                                </div>

                                <p className="tp-lead">{pkg.desc}</p>

                                <div className="tp-rate-pill">
                                    <span className="tp-rate-main">{pkg.rateMain}</span>
                                    <span className="tp-rate-sub">{pkg.rateSub}</span>
                                </div>

                                <ul className="tp-list">
                                    {pkg.list.map((item, i) => (
                                        <li key={i}>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="tp-actions">
                                    <button 
                                        type="button"
                                        onClick={() => openBookingModal({
                                            tab: pkg.service.toLowerCase().includes('airport') ? 'airport' : pkg.service.toLowerCase().includes('rental') || pkg.service.toLowerCase().includes('local') ? 'rental' : 'outstation'
                                        })}
                                        className="th-btn style4 flex-grow-1 text-center justify-content-center"
                                        style={{ padding: '11px 18px', fontSize: '13.5px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Book Now
                                    </button>
                                    <a 
                                        href={waHref(`Hello Super Cabs, I would like to enquire about the ${pkg.title}.`)}
                                        target={siteConfig.whatsapp ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="th-btn style1 text-center justify-content-center"
                                        style={{ background: '#25D366', borderColor: '#25D366', padding: '11px 16px', fontSize: '14px' }}
                                        title="Enquire on WhatsApp"
                                    >
                                        <i className="fab fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Corporate Highlight Banner */}
                <div className="tp-corp-banner">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mb-3 mb-lg-0 text-center text-lg-start">
                            <div className="d-flex align-items-center gap-3 justify-content-center justify-content-lg-start mb-2">
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-circle"
                                    style={{ width: '40px', height: '40px', background: 'rgba(28, 168, 203, 0.2)', color: 'var(--theme-color, #1ca8cb)' }}
                                >
                                    <i className="fa-solid fa-briefcase"></i>
                                </div>
                                <h4 className="text-white mb-0" style={{ fontSize: '19px' }}>Corporate &amp; Monthly Cab Rentals</h4>
                            </div>
                            <p className="mb-0 text-white-50" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                                Customized corporate transport solutions with monthly consolidated GST invoicing, dedicated executive chauffeurs, priority dispatch, and emergency vehicle backup.
                            </p>
                        </div>
                        <div className="col-lg-4 text-center text-lg-end">
                            <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
                                <Link 
                                    to="/contact" 
                                    state={{ enquiry: { service: "Corporate Taxi" } }}
                                    className="th-btn style4"
                                    style={{ padding: '10px 18px', fontSize: '13px' }}
                                >
                                    Corporate Enquiry
                                </Link>
                                <a 
                                    href={waHref("Hello Super Cabs, I would like to enquire about corporate cab tie-ups.")}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1"
                                    style={{ background: '#25D366', borderColor: '#25D366', padding: '10px 16px', fontSize: '13px' }}
                                >
                                    <i className="fab fa-whatsapp me-1"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function VehicleTariffTable() {
    const { openBookingModal } = useBookingModal();
    const vehicles = usePublicCabs();

    return (
        <section className="pt-tariff-section space-bottom">
            <style>{styles}</style>
            <div className="container">
                <div className="title-area text-center mb-5">
                    <span className="tp-subtitle-pill">
                        <i className="fa-solid fa-car"></i> Detailed Tariff Card
                    </span>
                    <h2 className="sec-title mb-2">Tariff by Vehicle Category</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Transparent one-way and round-trip per-km tariffs with verified drivers and no hidden charges.
                    </p>
                </div>

                {/* 4-Column Tariff Table (Exact match to user reference screenshot) */}
                <div className="pt-tariff-card table-responsive">
                    <table className="pt-tariff-table">
                        <thead>
                            <tr>
                                <th>VEHICLE TYPE</th>
                                <th>ONE WAY</th>
                                <th>ROUND TRIP</th>
                                <th>ADDITIONAL CHARGE</th>
                            </tr>
                        </thead>
                        <tbody>{vehicles.map(vehicle => <tr key={vehicle._id || vehicle.slug}>
                            <td className="pt-v-name">{vehicle.name}</td>
                            <td className="pt-v-rate">{vehicle.rateOneWay}</td>
                            <td className="pt-v-rate">{vehicle.rateRoundTrip}</td>
                            <td><span className="pt-v-add"><i className="fa-solid fa-circle-info"></i> Toll, Permit &amp; Parking</span></td>
                        </tr>)}</tbody>
                    </table>
                </div>

                <div className="text-center my-4">
                    <button 
                        type="button" 
                        onClick={() => openBookingModal()} 
                        className="th-btn style1"
                        style={{ border: 'none', cursor: 'pointer', padding: '14px 34px', fontSize: '15px' }}
                    >
                        <i className="fa-solid fa-car me-2"></i> Book Your Cab Now
                    </button>
                </div>

                {/* TRAVEL GUIDELINES */}
                <div className="pt-guide-wrap">
                    <h4 className="pt-guide-title">
                        <i className="fa-solid fa-file-shield text-theme"></i>
                        TRAVEL GUIDELINES
                    </h4>
                    <ul className="pt-guide-list">
                        <li>
                            <i className="fa-solid fa-circle"></i>
                            <span><strong>One Way Trips:</strong> Minimum distance charged is 130 km per trip.</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-circle"></i>
                            <span><strong>Round Trips:</strong> Minimum distance charged is 250 km per calendar day.</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-circle"></i>
                            <span><strong>Driver Bata:</strong> ₹400/day for Sedan, ₹500/day for SUV &amp; Innova.</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-circle"></i>
                            <span><strong>Additional Charges:</strong> Toll gate charges, Inter-state permits, Hill station charges &amp; parking fees are payable directly by passenger as per actual receipts.</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-circle"></i>
                            <span><strong>Calendar Day Calculation:</strong> 1 Day is calculated from 12:00 AM (midnight) to 11:59 PM (midnight).</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-circle"></i>
                            <span><strong>Air Conditioning:</strong> AC will operate throughout the ride except on steep hill climbs / ghat roads for vehicle safety.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default PricingPlan;
