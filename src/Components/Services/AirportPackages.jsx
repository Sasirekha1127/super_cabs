import React from 'react';
import siteConfig, { waHref } from '../data/siteConfig';
import usePublicContent from '../../services/usePublicContent';

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
    const tariffItems = usePublicContent('tariff');
    const apItem = tariffItems?.find(it => it.slug === 'airport-packages');

    const secSubtitle = apItem?.subtitle || "Airport Transfers";
    const secTitle = apItem?.title || "Airport Taxi Packages";
    const secDesc = apItem?.description || "Punctual, stress-free airport drop and pickup transfers. Fixed upfront tariff, round-the-clock availability, and complimentary flight delay tracking.";

    const card1 = apItem?.card1 || {
        badge: "Departure Transfer",
        icon: "fa-plane-departure",
        title: "City To Airport Drop",
        desc: "Never miss a flight. We schedule your doorstep pickup with an optimized travel buffer so you arrive at the airport with ample time for check-in and boarding security.",
        specs: [
            { icon: "fa-shield-halved", text: "Guaranteed on-time" },
            { icon: "fa-car", text: "Clean AC Sedan / SUV" },
            { icon: "fa-file-invoice", text: "Fastag toll included/clear" },
            { icon: "fa-clock", text: "24/7 Advance booking" }
        ],
        list: [
            "Doorstep pickup from any residential address, hotel, or office in the city.",
            "Direct drop at your terminal departure gate (Terminal 1 or Terminal 2).",
            "Driver contacts you 30 minutes before pickup time to ensure total peace of mind.",
            "Spacious clean boots suitable for domestic & international check-in baggage."
        ]
    };

    const card2 = apItem?.card2 || {
        badge: "Arrival Transfer",
        icon: "fa-plane-arrival",
        title: "Airport To City Pickup",
        desc: "Land relaxed knowing your verified chauffeur is waiting outside the arrival terminal. Complete with flight delay tracking and free waiting time at zero extra cost.",
        specs: [
            { icon: "fa-satellite-dish", text: "Flight tracking included" },
            { icon: "fa-hourglass-start", text: "45 Mins free waiting" },
            { icon: "fa-hand-holding-hand", text: "Terminal meet & greet" },
            { icon: "fa-snowflake", text: "Chilled AC ready cabin" }
        ],
        list: [
            "Share your flight number — we track departure, delays, and touchdown times.",
            "Driver arrives at the terminal pickup lane 15 minutes before your flight lands.",
            "Chauffeur assists with luggage and escorts you safely to the sanitized vehicle.",
            "Flat tariff with zero parking surprise or midnight surcharge."
        ]
    };

    return (
        <section className="ap-section space">
            <style>{styles}</style>
            <div className="container">
                <div className="title-area text-center mb-5">
                    <span className="sub-title">{secSubtitle}</span>
                    <h2 className="sec-title">{secTitle}</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        {secDesc}
                    </p>
                </div>

                <div className="row gy-4">
                    {/* Airport Drop Package */}
                    <div className="col-lg-6">
                        <div className="ap-card">
                            <span className="ap-badge">{card1.badge}</span>
                            <div className="ap-icon-header">
                                <i className={`fa-solid ${card1.icon || 'fa-plane-departure'}`}></i>
                            </div>
                            <h3 className="ap-title">{card1.title}</h3>
                            <p className="ap-desc">{card1.desc}</p>

                            <div className="ap-specs-grid">
                                {(card1.specs || []).map((sp, idx) => (
                                    <div key={idx} className="ap-spec-item">
                                        <i className={`fa-solid ${sp.icon || 'fa-check'}`}></i>
                                        <span>{sp.text}</span>
                                    </div>
                                ))}
                            </div>

                            <ul className="ap-list">
                                {(card1.list || []).map((item, idx) => (
                                    <li key={idx}>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="d-flex gap-2 mt-auto">
                                <a 
                                    href={waHref(`Hello Super Cabs, I would like to enquire about an ${card1.title} cab.`)}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1 w-100 text-center justify-content-center"
                                    style={{ 
                                        background: '#25D366', 
                                        borderColor: '#25D366', 
                                        padding: '12px 18px', 
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                    title="WhatsApp Airport Desk"
                                >
                                    <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
                                    <span>WhatsApp Enquire</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Airport Pickup Package */}
                    <div className="col-lg-6">
                        <div className="ap-card">
                            <span className="ap-badge">{card2.badge}</span>
                            <div className="ap-icon-header">
                                <i className={`fa-solid ${card2.icon || 'fa-plane-arrival'}`}></i>
                            </div>
                            <h3 className="ap-title">{card2.title}</h3>
                            <p className="ap-desc">{card2.desc}</p>

                            <div className="ap-specs-grid">
                                {(card2.specs || []).map((sp, idx) => (
                                    <div key={idx} className="ap-spec-item">
                                        <i className={`fa-solid ${sp.icon || 'fa-check'}`}></i>
                                        <span>{sp.text}</span>
                                    </div>
                                ))}
                            </div>

                            <ul className="ap-list">
                                {(card2.list || []).map((item, idx) => (
                                    <li key={idx}>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="d-flex gap-2 mt-auto">
                                <a 
                                    href={waHref(`Hello Super Cabs, I would like to enquire about an ${card2.title} cab.`)}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1 w-100 text-center justify-content-center"
                                    style={{ 
                                        background: '#25D366', 
                                        borderColor: '#25D366', 
                                        padding: '12px 18px', 
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                    title="WhatsApp Airport Desk"
                                >
                                    <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
                                    <span>WhatsApp Enquire</span>
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
