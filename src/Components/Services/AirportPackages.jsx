import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { waHref } from '../data/siteConfig';

const styles = `
.ap-section {
    position: relative;
    background: var(--white-color, #ffffff);
}
.ap-card {
    background: var(--smoke-color, #f8fafc);
    border: 1px solid var(--th-border-color, #e2e8f0);
    border-radius: 20px;
    padding: 36px 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.ap-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px -20px rgba(11, 34, 41, 0.15);
}
.ap-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 5px 12px;
    border-radius: 20px;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
}
.ap-icon-header {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--theme-color, #1ca8cb) 15%, transparent);
    color: var(--theme-color, #1ca8cb);
    display: grid;
    place-items: center;
    font-size: 20px;
    margin-bottom: 20px;
}
.ap-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--title-color, #0b2229);
    margin: 0 0 10px;
}
.ap-desc {
    font-size: 14px;
    line-height: 1.6;
    color: var(--body-color, #4a5568);
    margin-bottom: 20px;
}
.ap-specs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
    padding: 16px;
    background: var(--white-color, #ffffff);
    border: 1px solid var(--th-border-color, #e2e8f0);
    border-radius: 12px;
}
.ap-spec-item {
    font-size: 13px;
    color: var(--title-color, #0b2229);
    display: flex;
    align-items: center;
    gap: 8px;
}
.ap-spec-item i {
    color: var(--theme-color, #1ca8cb);
    font-size: 14px;
}
.ap-list {
    list-style: none;
    padding: 0;
    margin: 0 0 28px;
    flex-grow: 1;
}
.ap-list li {
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--body-color, #4a5568);
    margin-bottom: 9px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
}
.ap-list li i {
    color: var(--theme-color, #1ca8cb);
    font-size: 13px;
    margin-top: 3px;
    flex-shrink: 0;
}
@media (max-width: 767px) {
    .ap-specs-grid { grid-template-columns: 1fr; }
}
`;

function AirportPackages() {
    return (
        <section className="ap-section space">
            <style>{styles}</style>
            <div className="container">
                <div className="title-area text-center mb-5">
                    <span className="sub-title">Airport Transfers</span>
                    <h2 className="sec-title">Airport Taxi Packages</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Punctual, stress-free airport drop and pickup transfers. Fixed upfront tariff, round-the-clock availability, and complimentary flight delay tracking.
                    </p>
                </div>

                <div className="row gy-4">
                    {/* Airport Drop Package */}
                    <div className="col-lg-6">
                        <div className="ap-card">
                            <span className="ap-badge">Departure Transfer</span>
                            <div className="ap-icon-header">
                                <i className="fa-solid fa-plane-departure"></i>
                            </div>
                            <h3 className="ap-title">City To Airport Drop</h3>
                            <p className="ap-desc">
                                Never miss a flight. We schedule your doorstep pickup with an optimized travel buffer so you arrive at the airport with ample time for check-in and boarding security.
                            </p>

                            <div className="ap-specs-grid">
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-shield-halved"></i>
                                    <span>Guaranteed on-time</span>
                                </div>
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-car"></i>
                                    <span>Clean AC Sedan / SUV</span>
                                </div>
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-file-invoice"></i>
                                    <span>Fastag toll included/clear</span>
                                </div>
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-clock"></i>
                                    <span>24/7 Advance booking</span>
                                </div>
                            </div>

                            <ul className="ap-list">
                                <li>
                                    <span>Doorstep pickup from any residential address, hotel, or office in the city.</span>
                                </li>
                                <li>
                                    <span>Direct drop at your terminal departure gate (Terminal 1 or Terminal 2).</span>
                                </li>
                                <li>
                                    <span>Driver contacts you 30 minutes before pickup time to ensure total peace of mind.</span>
                                </li>
                                <li>
                                    <span>Spacious clean boots suitable for domestic &amp; international check-in baggage.</span>
                                </li>
                            </ul>

                            <div className="d-flex gap-2 mt-auto">
                                <Link 
                                    to="/contact" 
                                    state={{ enquiry: { service: "Airport Taxi", package: "Airport Drop" } }} 
                                    className="th-btn style4 flex-grow-1 text-center justify-content-center"
                                >
                                    Book Airport Drop
                                </Link>
                                <a 
                                    href={waHref("Hello Super Cabs, I would like to book an Airport Drop cab.")}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1 text-center justify-content-center"
                                    style={{ background: '#25D366', borderColor: '#25D366', padding: '12px 18px' }}
                                    title="WhatsApp Airport Desk"
                                >
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Airport Pickup Package */}
                    <div className="col-lg-6">
                        <div className="ap-card">
                            <span className="ap-badge">Arrival Transfer</span>
                            <div className="ap-icon-header">
                                <i className="fa-solid fa-plane-arrival"></i>
                            </div>
                            <h3 className="ap-title">Airport To City Pickup</h3>
                            <p className="ap-desc">
                                Land relaxed knowing your verified chauffeur is waiting outside the arrival terminal. Complete with flight delay tracking and free waiting time at zero extra cost.
                            </p>

                            <div className="ap-specs-grid">
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-satellite-dish"></i>
                                    <span>Flight tracking included</span>
                                </div>
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-hourglass-start"></i>
                                    <span>45 Mins free waiting</span>
                                </div>
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-hand-holding-hand"></i>
                                    <span>Terminal meet &amp; greet</span>
                                </div>
                                <div className="ap-spec-item">
                                    <i className="fa-solid fa-snowflake"></i>
                                    <span>Chilled AC ready cabin</span>
                                </div>
                            </div>

                            <ul className="ap-list">
                                <li>
                                    <span>Share your flight number — we track departure, delays, and touchdown times.</span>
                                </li>
                                <li>
                                    <span>Driver arrives at the terminal pickup lane 15 minutes before your flight lands.</span>
                                </li>
                                <li>
                                    <span>Chauffeur assists with luggage and escorts you safely to the sanitized vehicle.</span>
                                </li>
                                <li>
                                    <span>Flat tariff with zero parking surprise or midnight surcharge.</span>
                                </li>
                            </ul>

                            <div className="d-flex gap-2 mt-auto">
                                <Link 
                                    to="/contact" 
                                    state={{ enquiry: { service: "Airport Taxi", package: "Airport Pickup" } }} 
                                    className="th-btn style4 flex-grow-1 text-center justify-content-center"
                                >
                                    Book Airport Pickup
                                </Link>
                                <a 
                                    href={waHref("Hello Super Cabs, I would like to book an Airport Pickup cab.")}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1 text-center justify-content-center"
                                    style={{ background: '#25D366', borderColor: '#25D366', padding: '12px 18px' }}
                                    title="WhatsApp Airport Desk"
                                >
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default AirportPackages;
