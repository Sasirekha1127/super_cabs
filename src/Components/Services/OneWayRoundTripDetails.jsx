import React from 'react';
import siteConfig, { waHref } from '../data/siteConfig';
import usePublicContent from '../../services/usePublicContent';

const styles = `
.ow-section {
    background: var(--smoke-color, #f8fafc);
    position: relative;
}
.ow-card {
    background: var(--white-color, #ffffff);
    border: 1px solid var(--th-border-color, #e2e8f0);
    border-radius: 20px;
    padding: 38px 32px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 16px 45px -24px rgba(11, 34, 41, 0.12);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.ow-card:hover {
    transform: translateY(-6px);
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 24px 55px -20px rgba(11, 34, 41, 0.18);
}
.ow-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 5px 14px;
    border-radius: 20px;
    background: color-mix(in srgb, var(--theme-color, #1ca8cb) 14%, transparent);
    color: var(--theme-color, #1ca8cb);
    margin-bottom: 16px;
}
.ow-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
}
.ow-icon-wrap {
    width: 58px;
    height: 58px;
    border-radius: 16px;
    background: color-mix(in srgb, var(--theme-color, #1ca8cb) 12%, transparent);
    color: var(--theme-color, #1ca8cb);
    display: grid;
    place-items: center;
    font-size: 22px;
    flex-shrink: 0;
}
.ow-title {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: var(--title-color, #0b2229);
}
.ow-desc {
    font-size: 14.5px;
    line-height: 1.65;
    color: var(--body-color, #4a5568);
    margin-bottom: 22px;
}
.ow-list {
    list-style: none;
    padding: 0;
    margin: 0 0 28px;
    flex-grow: 1;
}
.ow-list li {
    position: relative;
    padding-left: 0;
    margin-bottom: 11px;
    font-size: 14px;
    line-height: 1.55;
    color: var(--body-color, #4a5568);
}
.ow-actions {
    display: flex;
    gap: 12px;
    margin-top: auto;
}
.ow-terms-strip {
    background: var(--white-color, #ffffff);
    border: 1px dashed var(--th-border-color, #cbd5e1);
    border-radius: 16px;
    padding: 24px 28px;
    margin-top: 40px;
}
.ow-term-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}
.ow-term-item i {
    color: var(--theme-color, #1ca8cb);
    font-size: 18px;
    margin-top: 2px;
    flex-shrink: 0;
}
.ow-term-item h6 {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 700;
    color: var(--title-color, #0b2229);
}
.ow-term-item p {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--body-color, #64748b);
}
`;

function OneWayRoundTripDetails() {
    const tariffItems = usePublicContent('tariff');
    const owItem = tariffItems?.find(it => it.slug === 'outstation-details');

    const secSubtitle = owItem?.subtitle || "Outstation Tariff Comparison";
    const secTitle = owItem?.title || "One-Way vs. Round-Trip Details";
    const secDesc = owItem?.description || "Understand the clear difference between single-drop outstation transfers and multi-day round-trip packages to choose the most cost-effective option for your travel.";

    const card1 = owItem?.card1 || {
        tag: "Pay For Single Journey Only",
        title: "One-Way Drop Taxi",
        subtitle: "Point A to Point B Direct Highway Travel",
        desc: "Traveling one way to another city? Don't pay for the cab's empty return trip. Our one-way taxi package charges strictly for the single-direction distance, saving you up to 40% on overall travel costs.",
        points: [
            "No Return Fare: Pay only for the one-way kilometers traveled from your pickup address to your destination.",
            "Doorstep Pickup & Drop: Direct pickup from your home or office and drop right at your final address.",
            "Zero Return Waiting: The driver drops you off and departs. No hourly waiting charges or return commitments.",
            "Ideal For: City relocation, university visits, single-way business meetings, and one-sided airport transfers.",
            "Dedicated AC Vehicles: Clean hatchbacks, sedans, and SUVs available on short notice."
        ]
    };

    const card2 = owItem?.card2 || {
        tag: "Dedicated Cab At Your Disposal",
        title: "Round-Trip Outstation Taxi",
        subtitle: "Multi-Day Tours, Vacations & Temple Circuits",
        desc: "Need a dedicated vehicle throughout your vacation or business tour? The vehicle and chauffeur stay exclusively with you, providing complete freedom to explore attractions and make impromptu stops.",
        points: [
            "Dedicated Chauffeur & Cab: Vehicle remains with you for local sightseeing, shopping, dining, and return journey.",
            "Flexible Multiple Stops: Stop anytime for scenic viewpoints, roadside restaurants, and temple darshans.",
            "Fair Km Calculation: Standard minimum 250 km/day billing ensures the lowest per-km rate.",
            "Ideal For: Family holiday getaways, hill station weekend trips, wedding guest transfers, and multi-day tours.",
            "Highway Trained Drivers: Experienced on long hill station curves, ghat roads, and national expressways."
        ]
    };

    return (
        <section className="ow-section space">
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
                    {/* One-Way Drop Taxi Card */}
                    <div className="col-lg-6">
                        <div className="ow-card">
                            <div>
                                <span className="ow-tag">{card1.tag}</span>
                                <div className="ow-header">
                                    <div className="ow-icon-wrap">
                                        <i className={`fa-solid ${card1.icon || 'fa-arrow-right-long'}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="ow-title">{card1.title}</h3>
                                        {card1.subtitle && <span className="text-muted" style={{ fontSize: '13px' }}>{card1.subtitle}</span>}
                                    </div>
                                </div>
                                <p className="ow-desc">{card1.desc}</p>
                            </div>

                            <ul className="ow-list">
                                {(card1.points || []).map((pt, idx) => {
                                    const parts = typeof pt === 'string' ? pt.split(':') : [pt];
                                    return (
                                        <li key={idx}>
                                            {parts.length > 1 ? (
                                                <><strong>{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                            ) : (
                                                <span>{pt}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="ow-actions">
                                <a 
                                    href={waHref(`Hello Super Cabs, I would like to enquire about a ${card1.title}.`)}
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
                                    title="Enquire on WhatsApp"
                                >
                                    <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
                                    <span>WhatsApp Enquire</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Round-Trip Outstation Card */}
                    <div className="col-lg-6">
                        <div className="ow-card">
                            <div>
                                <span className="ow-tag">{card2.tag}</span>
                                <div className="ow-header">
                                    <div className="ow-icon-wrap">
                                        <i className={`fa-solid ${card2.icon || 'fa-arrows-rotate'}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="ow-title">{card2.title}</h3>
                                        {card2.subtitle && <span className="text-muted" style={{ fontSize: '13px' }}>{card2.subtitle}</span>}
                                    </div>
                                </div>
                                <p className="ow-desc">{card2.desc}</p>
                            </div>

                            <ul className="ow-list">
                                {(card2.points || []).map((pt, idx) => {
                                    const parts = typeof pt === 'string' ? pt.split(':') : [pt];
                                    return (
                                        <li key={idx}>
                                            {parts.length > 1 ? (
                                                <><strong>{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                            ) : (
                                                <span>{pt}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="ow-actions">
                                <a 
                                    href={waHref(`Hello Super Cabs, I would like to enquire about a ${card2.title}.`)}
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
                                    title="Enquire on WhatsApp"
                                >
                                    <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
                                    <span>WhatsApp Enquire</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Important Tariff Notes Strip */}
                <div className="ow-terms-strip">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="ow-term-item">
                                <i className="fa-solid fa-user-tie"></i>
                                <div>
                                    <h6>Driver Allowance (Bata)</h6>
                                    <p>Standard per-calendar-day driver bata covers meals and driver expenses. No surprise tips or demands.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ow-term-item">
                                <i className="fa-solid fa-road-barrier"></i>
                                <div>
                                    <h6>Tolls, Parking &amp; Permits</h6>
                                    <p>Toll plazas (via Fastag), parking tickets, and interstate permits are billed at actuals with receipts.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ow-term-item">
                                <i className="fa-solid fa-moon"></i>
                                <div>
                                    <h6>Night Driving Charges</h6>
                                    <p>A modest night driving allowance applies only if travel extends between 10:00 PM and 6:00 AM.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OneWayRoundTripDetails;
