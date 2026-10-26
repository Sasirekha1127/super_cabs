import React from 'react';
import { useLocation } from 'react-router-dom';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import BookingForm from '../Booking/BookingForm';

const styles = `
.spc-booking-section {
    position: relative;
    padding: 85px 0;
    background: linear-gradient(135deg, rgba(8, 25, 31, 0.96) 0%, rgba(6, 19, 23, 0.98) 100%), url(/assets/img/bg/video_bg_1.jpg);
    background-size: cover;
    background-position: center;
    color: #ffffff;
}

/* Left CTA Column */
.spc-cta-box {
    padding-right: 25px;
}
.spc-cta-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 16px;
    border-radius: 30px;
    background: rgba(28, 168, 203, 0.15);
    color: var(--theme-color, #1ca8cb);
    margin-bottom: 18px;
    border: 1px solid rgba(28, 168, 203, 0.35);
}
.spc-cta-title {
    font-size: 34px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.25;
    margin-bottom: 16px;
}
.spc-cta-text {
    color: rgba(255, 255, 255, 0.82);
    font-size: 14.5px;
    line-height: 1.65;
    margin-bottom: 28px;
}
.spc-cta-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 32px;
}
.spc-cta-call-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff !important;
    box-shadow: 0 6px 20px rgba(28, 168, 203, 0.4);
    transition: all 0.25s ease;
}
.spc-cta-call-btn:hover {
    background: #148ea8;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(28, 168, 203, 0.55);
}
.spc-cta-wa-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    background: #25D366;
    color: #ffffff !important;
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
    transition: all 0.25s ease;
}
.spc-cta-wa-btn:hover {
    background: #1ea952;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
}
.spc-trust-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}
.spc-trust-pill {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 14px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
}
.spc-trust-pill i {
    color: var(--theme-color, #1ca8cb);
    font-size: 15px;
}

/* Right Form Card */
.spc-form-card {
    background: #ffffff;
    border-radius: 22px;
    padding: 32px 30px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
    color: #0b2229;
}
.spc-form-head {
    margin-bottom: 18px;
}
.spc-form-title {
    font-size: 22px;
    font-weight: 800;
    color: #0b2229;
    margin: 0 0 4px;
}
.spc-form-subtitle {
    font-size: 13px;
    color: #64748b;
    margin: 0;
}

/* Service Type Pills */
.spc-service-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}
.spc-service-pill {
    padding: 7px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    border: 1.5px solid #e2e8f0;
    background: #f8fafc;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    user-select: none;
}
.spc-service-pill:hover {
    border-color: var(--theme-color, #1ca8cb);
    color: var(--theme-color, #1ca8cb);
}
.spc-service-pill.active {
    background: var(--theme-color, #1ca8cb);
    border-color: var(--theme-color, #1ca8cb);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(28, 168, 203, 0.3);
}

/* Input Wrappers */
.spc-form-field {
    margin-bottom: 12px;
}
.spc-field-label {
    font-size: 12px;
    font-weight: 700;
    color: #334155;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.spc-field-label .req {
    color: #ef4444;
    margin-left: 2px;
}
.spc-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
}
.spc-input-icon {
    position: absolute;
    left: 14px;
    color: #94a3b8;
    font-size: 14px;
    pointer-events: none;
    z-index: 2;
}
.spc-input-field {
    width: 100%;
    height: 46px;
    padding: 0 14px 0 40px;
    border-radius: 10px;
    border: 1.5px solid #cbd5e1;
    background: #f8fafc;
    font-size: 13.5px;
    color: #0f172a;
    transition: all 0.2s ease;
    outline: none;
}
.spc-input-field:focus {
    background: #ffffff;
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 0 0 3px rgba(28, 168, 203, 0.15);
}
.spc-input-field.has-error {
    border-color: #ef4444;
    background: #fffafa;
}

/* Phone input with +91 prefix */
.spc-phone-prefix {
    position: absolute;
    left: 36px;
    font-size: 13.5px;
    font-weight: 700;
    color: #475569;
    pointer-events: none;
    z-index: 2;
}
.spc-input-field.with-phone {
    padding-left: 68px;
}

/* Select element */
.spc-select-field {
    width: 100%;
    height: 46px;
    padding: 0 32px 0 40px;
    border-radius: 10px;
    border: 1.5px solid #cbd5e1;
    background: #f8fafc url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat calc(100% - 12px) center;
    font-size: 13px;
    color: #0f172a;
    transition: all 0.2s ease;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
}
.spc-select-field:focus {
    background-color: #ffffff;
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 0 0 3px rgba(28, 168, 203, 0.15);
}

/* Error text slot */
.spc-error-msg {
    font-size: 11.5px;
    color: #ef4444;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    line-height: 1.2;
}

/* Submit button */
.spc-submit-btn {
    width: 100%;
    padding: 13px 20px;
    border-radius: 12px;
    font-size: 14.5px;
    font-weight: 700;
    color: #ffffff;
    background: #25D366;
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s ease;
    margin-top: 8px;
}
.spc-submit-btn:hover {
    background: #1ea952;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
}
.spc-btn-caption {
    text-align: center;
    font-size: 11.5px;
    color: #64748b;
    margin-top: 8px;
    margin-bottom: 0;
}

@media (max-width: 991px) {
    .spc-cta-box {
        padding-right: 0;
        margin-bottom: 40px;
        text-align: center;
    }
    .spc-cta-buttons {
        justify-content: center;
    }
    .spc-trust-grid {
        grid-template-columns: 1fr;
        max-width: 320px;
        margin: 0 auto;
        text-align: left;
    }
    .spc-cta-title {
        font-size: 28px;
    }
}
`;

function BookATour() {
    const { state } = useLocation();
    const enquiry = (state && state.enquiry) || {};

    const sName = (enquiry.service || "").toLowerCase();
    let initialTab = "outstation";
    if (sName.includes("airport")) {
        initialTab = "airport";
    } else if (sName.includes("rental") || sName.includes("hourly") || sName.includes("local")) {
        initialTab = "rental";
    }

    let initialVehicle = enquiry.vehicle || "";
    if (initialVehicle.toLowerCase().includes("innova")) {
        initialVehicle = "INNOVA";
    } else if (initialVehicle.toLowerCase().includes("suv") || initialVehicle.toLowerCase().includes("ertiga")) {
        initialVehicle = "SUV";
    } else if (initialVehicle.toLowerCase().includes("sedan") || initialVehicle.toLowerCase().includes("dzire") || initialVehicle.toLowerCase().includes("etios")) {
        initialVehicle = "SEDAN";
    }

    return (
        <section className="spc-booking-section">
            <style>{styles}</style>
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Column: Call / WhatsApp CTA */}
                    <div className="col-lg-5">
                        <div className="spc-cta-box">
                            <span className="spc-cta-badge">
                                <i className="fa-solid fa-headset"></i> 24/7 Dispatch Control Room
                            </span>
                            <h2 className="spc-cta-title">
                                Need A Taxi Urgently? Call Or WhatsApp Super Cabs
                            </h2>
                            <p className="spc-cta-text">
                                Get instant fare calculation, doorstep pickup in all cities across South India, and verified polite chauffeurs. Guaranteed transparent rates with zero surge pricing.
                            </p>

                            <div className="spc-cta-buttons">
                                <a href={telHref()} className="spc-cta-call-btn">
                                    <i className="fa-solid fa-phone"></i> Call: {siteConfig.phoneDisplay}
                                </a>
                                <a
                                    href={waHref("Hello Super Cabs, I would like to book a taxi immediately.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="spc-cta-wa-btn"
                                >
                                    <i className="fab fa-whatsapp"></i> WhatsApp Us
                                </a>
                            </div> 
                            <div className="spc-trust-grid">
                                <div className="spc-trust-pill">
                                    <i className="fa-solid fa-bolt"></i>
                                    <span>5-Min Confirmation</span>
                                </div>
                                <div className="spc-trust-pill">
                                    <i className="fa-solid fa-snowflake"></i>
                                    <span>Chilled AC Cabs</span>
                                </div>
                                <div className="spc-trust-pill">
                                    <i className="fa-solid fa-receipt"></i>
                                    <span>Transparent Tariffs</span>
                                </div>
                                <div className="spc-trust-pill">
                                    <i className="fa-solid fa-user-shield"></i>
                                    <span>Verified Chauffeurs</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Booking Form */}
                    <div className="col-lg-7">
                        <BookingForm 
                            initialTab={initialTab}
                            initialVehicle={initialVehicle}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookATour;
