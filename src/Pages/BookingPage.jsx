import React from 'react';
import HeaderOne from '../Components/Header/HeaderOne';
import FooterFour from '../Components/Footer/FooterFour';
import ScrollToTop from '../Components/ScrollToTop';
import PageHeroSlider from '../Components/Common/PageHeroSlider';
import BookingForm from '../Components/Booking/BookingForm';
import siteConfig, { telHref, waHref } from '../Components/data/siteConfig';

const bookingPageStyles = `
.bp-section {
    padding: 70px 0 90px;
    background: #f8fafc;
}
.bp-form-card {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 15px 45px rgba(11, 34, 41, 0.08);
    border: 1px solid #e2e8f0;
    overflow: hidden;
    padding: 10px;
}
.bp-sidebar-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 28px 24px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px rgba(11, 34, 41, 0.05);
    margin-bottom: 24px;
}
.bp-card-title {
    font-size: 19px;
    font-weight: 800;
    color: #0b2229;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.bp-trust-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid #f1f5f9;
}
.bp-trust-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}
.bp-trust-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(28, 168, 203, 0.12);
    color: var(--theme-color, #1ca8cb);
    display: grid;
    place-items: center;
    font-size: 16px;
    flex-shrink: 0;
}
.bp-trust-heading {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 3px;
}
.bp-trust-text {
    font-size: 12.5px;
    color: #64748b;
    margin: 0;
    line-height: 1.45;
}
.bp-cta-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 20px;
    border-radius: 14px;
    font-size: 14.5px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.25s ease;
    margin-bottom: 12px;
}
.bp-cta-call {
    background: var(--theme-color, #1ca8cb);
    color: #ffffff !important;
}
.bp-cta-call:hover {
    background: #158da8;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(28, 168, 203, 0.35);
}
.bp-cta-wa {
    background: #25D366;
    color: #ffffff !important;
    margin-bottom: 0;
}
.bp-cta-wa:hover {
    background: #1ea952;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35);
}
`;

function BookingPage() {
    return (
        <>
            <HeaderOne />
            <PageHeroSlider 
                page="booking"
                pageTitle="Online Cab Booking" 
                pageSubtitle="Live Google Routes Calculation • Real-Time Kilometre Pricing • Instant Chauffeur Confirmation"
                defaultBg="/assets/img/cabs/hero-1.jpg" 
            />

            <section className="bp-section">
                <style>{bookingPageStyles}</style>
                <div className="container">
                    <div className="row g-4 align-items-start">
                        {/* Left / Main: The Full Interactive Booking & Distance Engine */}
                        <div className="col-lg-7 col-xl-8">
                            <div className="bp-form-card">
                                <BookingForm initialTab="outstation" />
                            </div>
                        </div>

                        {/* Right / Sidebar: 24/7 Helpline & Guarantees */}
                        <div className="col-lg-5 col-xl-4">
                            {/* Instant Contact Card */}
                            <div className="bp-sidebar-card">
                                <h3 className="bp-card-title">
                                    <i className="fa-solid fa-headset" style={{ color: 'var(--theme-color, #1ca8cb)' }} />
                                    24/7 Booking Helpline
                                </h3>
                                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px', lineHeight: '1.5' }}>
                                    Need immediate cab dispatch or custom travel assistance? Our control room is active round the clock.
                                </p>
                                <a href={telHref()} className="bp-cta-btn bp-cta-call">
                                    <i className="fa-solid fa-phone" /> Call: {siteConfig.phoneDisplay}
                                </a>
                                <a 
                                    href={waHref("Hello Super Cabs, I would like to book a cab right now.")}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="bp-cta-btn bp-cta-wa"
                                >
                                    <i className="fab fa-whatsapp" /> Chat on WhatsApp Desk
                                </a>
                            </div>

                            {/* Why Book with Super Cabs */}
                            <div className="bp-sidebar-card">
                                <h3 className="bp-card-title">
                                    <i className="fa-solid fa-shield-halved" style={{ color: '#22c55e' }} />
                                    Super Cabs Assurance
                                </h3>

                                <div className="bp-trust-item">
                                    <div className="bp-trust-icon">
                                        <i className="fa-solid fa-route" />
                                    </div>
                                    <div>
                                        <h5 className="bp-trust-heading">Google Maps Measured KM</h5>
                                        <p className="bp-trust-text">Authoritative road distance calculation via Google Routes v2 API.</p>
                                    </div>
                                </div>

                                <div className="bp-trust-item">
                                    <div className="bp-trust-icon">
                                        <i className="fa-solid fa-hand-holding-dollar" />
                                    </div>
                                    <div>
                                        <h5 className="bp-trust-heading">Zero Hidden Charges</h5>
                                        <p className="bp-trust-text">Transparent per-km rate, clear driver beta, and no empty return fare on one-way trips.</p>
                                    </div>
                                </div>

                                <div className="bp-trust-item">
                                    <div className="bp-trust-icon">
                                        <i className="fa-solid fa-pump-medical" />
                                    </div>
                                    <div>
                                        <h5 className="bp-trust-heading">100% Sanitised Fleet</h5>
                                        <p className="bp-trust-text">Clean, fresh AC sedans & SUVs prepared and vacuumed before every journey.</p>
                                    </div>
                                </div>

                                <div className="bp-trust-item">
                                    <div className="bp-trust-icon">
                                        <i className="fa-solid fa-user-check" />
                                    </div>
                                    <div>
                                        <h5 className="bp-trust-heading">Verified Chauffeurs</h5>
                                        <p className="bp-trust-text">Experienced highway and ghat-road drivers with thorough police verification.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterFour />
            <ScrollToTop />
        </>
    );
}

export default BookingPage;

