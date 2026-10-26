import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { telHref, waHref } from '../data/siteConfig';

const footerStyles = `
/* ========================================================
   Super Cabs – Executive Professional Footer System
   ======================================================== */
.sc-footer {
    position: relative;
    background: #07161c;
    color: #94a3b8;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.6;
    border-top: 3px solid var(--theme-color, #1ca8cb);
}

/* Subtle background glowing ambient orbs */
.sc-footer::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -100px;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(28, 168, 203, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}
.sc-footer::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: -100px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37, 211, 102, 0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}

.sc-footer-inner {
    position: relative;
    z-index: 1;
}

/* --------------------------------------------------------
   1. Pre-Footer Callout Banner (Action Oriented)
   -------------------------------------------------------- */
.sc-footer-cta-wrap {
    padding-top: 55px;
    margin-bottom: 36px;
}
.sc-footer-cta-card {
    background: linear-gradient(135deg, #0e2732 0%, #123341 50%, #0d2733 100%);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 20px;
    padding: 32px 38px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
}
.sc-footer-cta-card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(28, 168, 203, 0.06));
    pointer-events: none;
}
.sc-pulse-dot {
    width: 9px;
    height: 9px;
    background: #22c55e;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    animation: scPulse 2s infinite;
}
@keyframes scPulse {
    0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
.sc-cta-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #22c55e;
    text-transform: uppercase;
}
.sc-cta-title {
    color: #ffffff;
    font-size: 25px;
    font-weight: 800;
    margin: 4px 0 6px;
    letter-spacing: -0.3px;
}
.sc-cta-text {
    color: #94a3b8;
    margin: 0;
    font-size: 13.5px;
    max-width: 580px;
    line-height: 1.5;
}
.sc-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 12px 22px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.25s ease;
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}
.sc-cta-call {
    background: var(--theme-color, #1ca8cb);
    color: #ffffff !important;
}
.sc-cta-call:hover {
    background: #1791af;
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(28, 168, 203, 0.35);
}
.sc-cta-wa {
    background: #25D366;
    color: #ffffff !important;
}
.sc-cta-wa:hover {
    background: #20bd5a;
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(37, 211, 102, 0.35);
}

/* --------------------------------------------------------
   2. Trust Highlights Strip (4 Pillars)
   -------------------------------------------------------- */
.sc-trust-strip {
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    padding: 22px 0;
    margin-bottom: 48px;
}
.sc-trust-item {
    display: flex;
    align-items: center;
    gap: 14px;
}
.sc-trust-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(28, 168, 203, 0.12);
    border: 1px solid rgba(28, 168, 203, 0.25);
    color: var(--theme-color, #1ca8cb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
}
.sc-trust-heading {
    color: #ffffff;
    font-size: 13.5px;
    font-weight: 700;
    margin: 0 0 2px;
}
.sc-trust-sub {
    color: #64748b;
    font-size: 11.5px;
    display: block;
    line-height: 1.3;
}

/* --------------------------------------------------------
   3. Main Footer Columns
   -------------------------------------------------------- */
.sc-col-title {
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
}
.sc-col-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 32px;
    height: 2.5px;
    background: var(--theme-color, #1ca8cb);
    border-radius: 2px;
}

/* Brand Column */
.sc-footer-logo {
    display: inline-block;
    background: #ffffff;
    padding: 7px 16px;
    border-radius: 10px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.sc-footer-logo img {
    height: 40px;
    width: auto;
    display: block;
    object-fit: contain;
}
.sc-about-desc {
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.65;
    margin-bottom: 16px;
}
.sc-rating-box {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 9px 14px;
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 18px;
}
.sc-social-links {
    display: flex;
    align-items: center;
    gap: 9px;
}
.sc-social-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.25s ease;
}
.sc-social-btn:hover {
    background: var(--theme-color, #1ca8cb);
    border-color: var(--theme-color, #1ca8cb);
    color: #ffffff;
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(28, 168, 203, 0.35);
}

/* Footer Nav Links */
.sc-footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
}
.sc-footer-links li {
    margin-bottom: 10px;
}
.sc-footer-links a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 13.5px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}
.sc-footer-links a i {
    font-size: 9px;
    color: var(--theme-color, #1ca8cb);
    transition: transform 0.2s ease;
}
.sc-footer-links a:hover {
    color: #ffffff;
    transform: translateX(4px);
}
.sc-footer-links a:hover i {
    transform: translateX(2px);
    color: #22c55e;
}

/* Contact Details */
.sc-contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.sc-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 15px;
}
.sc-contact-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(28, 168, 203, 0.12);
    border: 1px solid rgba(28, 168, 203, 0.25);
    color: var(--theme-color, #1ca8cb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
    margin-top: 2px;
}
.sc-contact-label {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
}
.sc-contact-value {
    color: #e2e8f0;
    font-size: 13.5px;
    text-decoration: none;
    font-weight: 600;
    line-height: 1.4;
    display: block;
    transition: color 0.2s ease;
}
.sc-contact-value:hover {
    color: var(--theme-color, #1ca8cb);
}
.sc-hours-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #4ade80;
    padding: 3px 10px;
    border-radius: 14px;
    font-size: 11px;
    font-weight: 700;
    margin-top: 4px;
}

/* --------------------------------------------------------
   4. Bottom Copyright Bar
   -------------------------------------------------------- */
.sc-footer-bottom {
    background: #040e13;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 20px 0;
    margin-top: 50px;
    font-size: 12.5px;
}
.sc-bottom-links {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    justify-content: flex-end;
}
.sc-bottom-links a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.2s ease;
}
.sc-bottom-links a:hover {
    color: #cbd5e1;
}
.sc-payment-badge {
    color: #64748b;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

@media (max-width: 991px) {
    .sc-footer-cta-card {
        padding: 26px 22px;
        text-align: center;
    }
    .sc-cta-text {
        margin: 0 auto 16px;
    }
    .sc-bottom-links {
        justify-content: center;
        margin-top: 12px;
    }
    .sc-trust-item {
        justify-content: flex-start;
    }
}
@media (max-width: 575px) {
    .sc-footer-cta-wrap {
        padding-top: 35px;
    }
    .sc-cta-title {
        font-size: 21px;
    }
    .sc-cta-btn {
        width: 100%;
        justify-content: center;
    }
}
`;

function FooterFour() {
    return (
        <footer className="sc-footer">
            <style>{footerStyles}</style>

            <div className="container sc-footer-inner">
                {/* 1. Pre-Footer Callout Card */}
                <div className="sc-footer-cta-wrap">
                    <div className="sc-footer-cta-card">
                        <div className="row align-items-center gy-4">
                            <div className="col-lg-7">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <span className="sc-pulse-dot"></span>
                                    <span className="sc-cta-tag">24/7 Cab Dispatch Active</span>
                                </div>
                                <h3 className="sc-cta-title">Need a Reliable Cab Right Now?</h3>
                                <p className="sc-cta-text">
                                    Transparent pricing, clean AC vehicles, and polite highway-experienced chauffeurs at your doorstep in minutes.
                                </p>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex flex-wrap gap-3 justify-content-lg-end">
                                    <a href={telHref()} className="sc-cta-btn sc-cta-call">
                                        <i className="fa-solid fa-phone" style={{ fontSize: '18px' }}></i>
                                        <div className="text-start">
                                            <span className="d-block" style={{ fontSize: '10px', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                Call 24/7 Helpline
                                            </span>
                                            <strong style={{ fontSize: '14.5px' }}>{siteConfig.phoneDisplay}</strong>
                                        </div>
                                    </a>
                                    <a 
                                        href={waHref("Hello Super Cabs, I need to book a cab.")} 
                                        target={siteConfig.whatsapp ? "_blank" : undefined} 
                                        rel="noopener noreferrer" 
                                        className="sc-cta-btn sc-cta-wa"
                                    >
                                        <i className="fab fa-whatsapp" style={{ fontSize: '20px' }}></i>
                                        <div className="text-start">
                                            <span className="d-block" style={{ fontSize: '10px', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                Instant Chat
                                            </span>
                                            <strong style={{ fontSize: '14.5px' }}>WhatsApp Desk</strong>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Trust Highlights Strip (4 Pillars) */}
                <div className="sc-trust-strip">
                    <div className="row g-3">
                        <div className="col-6 col-lg-3">
                            <div className="sc-trust-item">
                                <div className="sc-trust-icon">
                                    <i className="fa-solid fa-car-side"></i>
                                </div>
                                <div>
                                    <h6 className="sc-trust-heading">Clean &amp; Sanitized Cabs</h6>
                                    <span className="sc-trust-sub">Hatchback, Sedan, SUV &amp; Tempo</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="sc-trust-item">
                                <div className="sc-trust-icon">
                                    <i className="fa-solid fa-user-shield"></i>
                                </div>
                                <div>
                                    <h6 className="sc-trust-heading">Verified Chauffeurs</h6>
                                    <span className="sc-trust-sub">Route Trained &amp; Police-checked</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="sc-trust-item">
                                <div className="sc-trust-icon">
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div>
                                    <h6 className="sc-trust-heading">On-Time Guaranteed</h6>
                                    <span className="sc-trust-sub">24/7 Airport &amp; Outstation Rides</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="sc-trust-item">
                                <div className="sc-trust-icon">
                                    <i className="fa-solid fa-receipt"></i>
                                </div>
                                <div>
                                    <h6 className="sc-trust-heading">Transparent Pricing</h6>
                                    <span className="sc-trust-sub">Zero Hidden Tolls or Surcharges</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Main Footer Columns (4 Columns) */}
                <div className="row g-4 justify-content-between">
                    {/* Col 1: About & Trust */}
                    <div className="col-lg-4 col-md-6">
                        <Link to="/" className="sc-footer-logo">
                            <img src="/assets/img/super-cabs-logo.png" alt="Super Cabs" />
                        </Link>
                        <p className="sc-about-desc">
                            Super Cabs is South India's premier chauffeur-driven cab and travel network. We deliver dependable city rides, outstation cabs, airport transfers, and curated holiday tour packages with uncompromised comfort and transparent billing.
                        </p>


                        <div className="sc-social-links">
                            {siteConfig.social.facebook && (
                                <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="sc-social-btn" title="Facebook">
                                    <i className="fab fa-facebook-f" />
                                </a>
                            )}
                            {siteConfig.social.instagram && (
                                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="sc-social-btn" title="Instagram">
                                    <i className="fab fa-instagram" />
                                </a>
                            )}
                            <a href={waHref()} target={siteConfig.whatsapp ? "_blank" : undefined} rel="noreferrer" className="sc-social-btn" title="WhatsApp">
                                <i className="fab fa-whatsapp" />
                            </a>
                            {siteConfig.social.twitter && (
                                <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" className="sc-social-btn" title="Twitter">
                                    <i className="fab fa-twitter" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Col 2: Our Cab Services */}
                    <div className="col-lg-2 col-md-3 col-6">
                        <h4 className="sc-col-title">Our Services</h4>
                        <ul className="sc-footer-links">
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> Local City Taxi</Link></li>
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> Outstation Cabs</Link></li>
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> Airport Transfers</Link></li>
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> One-Way Drop Taxi</Link></li>
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> Round-Trip Taxi</Link></li>
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> Corporate Transport</Link></li>
                            <li><Link to="/tariff"><i className="fa-solid fa-chevron-right"></i> Tariff &amp; Fare Chart</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Quick Links */}
                    <div className="col-lg-3 col-md-3 col-6">
                        <h4 className="sc-col-title">Quick Links</h4>
                        <ul className="sc-footer-links">
                            <li><Link to="/"><i className="fa-solid fa-chevron-right"></i> Home</Link></li>
                            <li><Link to="/about"><i className="fa-solid fa-chevron-right"></i> About Us</Link></li>
                            <li><Link to="/services"><i className="fa-solid fa-chevron-right"></i> Taxi Services</Link></li>
                            <li><Link to="/fleet"><i className="fa-solid fa-chevron-right"></i> Our Fleet</Link></li>
                            <li><Link to="/tariff"><i className="fa-solid fa-chevron-right"></i> Tariff &amp; Pricing</Link></li>
                            <li><Link to="/gallery"><i className="fa-solid fa-chevron-right"></i> Photo Gallery</Link></li>
                            <li><Link to="/contact"><i className="fa-solid fa-chevron-right"></i> Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: 24/7 Contact Desk */}
                    <div className="col-lg-3 col-md-6">
                        <h4 className="sc-col-title">24/7 Helpdesk</h4>
                        <ul className="sc-contact-list">
                            <li className="sc-contact-item">
                                <div className="sc-contact-icon">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <span className="sc-contact-label">Call 24/7 Anytime</span>
                                    <a href={telHref()} className="sc-contact-value">{siteConfig.phoneDisplay}</a>
                                </div>
                            </li>
                            <li className="sc-contact-item">
                                <div className="sc-contact-icon">
                                    <i className="fab fa-whatsapp"></i>
                                </div>
                                <div>
                                    <span className="sc-contact-label">WhatsApp Quick Quotes</span>
                                    <a href={waHref()} target={siteConfig.whatsapp ? "_blank" : undefined} rel="noopener noreferrer" className="sc-contact-value">
                                        {siteConfig.phoneDisplay}
                                    </a>
                                </div>
                            </li>
                            <li className="sc-contact-item">
                                <div className="sc-contact-icon">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <span className="sc-contact-label">Email Support</span>
                                    <a href={`mailto:${siteConfig.email}`} className="sc-contact-value">{siteConfig.email}</a>
                                </div>
                            </li>
                            <li className="sc-contact-item">
                                <div className="sc-contact-icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <span className="sc-contact-label">Our Office Address</span>
                                    <span className="sc-contact-value" style={{ fontWeight: '400', fontSize: '13px' }}>
                                        {siteConfig.address}
                                    </span>
                                    <div className="sc-hours-pill">
                                        <i className="fa-regular fa-clock"></i> 24/7 Booking Support Available
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 4. Bottom Sub-Footer & Copyright */}
            <div className="sc-footer-bottom">
                <div className="container">
                    <div className="row align-items-center justify-content-between gy-3">
                        <div className="col-md-6 text-center text-md-start">
                            <span>
                                &copy; {new Date().getFullYear()} <strong className="text-white">Super Cabs</strong>. All Rights Reserved. South India's Premier Taxi Service.
                            </span>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                                Developed by{' '}
                                <a 
                                    href="https://saitechnosolutions.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'var(--theme-color, #1ca8cb)',
                                        fontWeight: '700',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Sai Techno Solutions
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterFour;
