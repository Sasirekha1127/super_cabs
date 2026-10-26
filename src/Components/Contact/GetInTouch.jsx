import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { telHref, waHref } from '../data/siteConfig';

const contactCards = [
    {
        icon: "fa-location-dot",
        btnIcon: "fa-solid fa-map-location-dot",
        badge: "Visit Our Office",
        title: "Office Address",
        primary: siteConfig.address,
        secondary: "Coverage: All major cities across Tamil Nadu & South India",
        actionText: "View on Map",
        actionLink: "#google-map",
        isAnchor: true,
        btnClass: "spc-c-btn-primary"
    },
    {
        icon: "fa-phone-volume",
        btnIcon: "fa-solid fa-phone",
        badge: "24/7 Booking Desk",
        title: "Phone Number",
        primary: siteConfig.phoneDisplay,
        secondary: "Available 24 hours / 365 days for instant cab booking",
        actionText: "Call Now",
        actionLink: telHref(),
        isAnchor: true,
        btnClass: "spc-c-btn-primary"
    },
    {
        icon: "fa-brands fa-whatsapp",
        btnIcon: "fab fa-whatsapp",
        badge: "Instant Chat",
        title: "WhatsApp Booking",
        primary: siteConfig.phoneDisplay,
        secondary: "Instant fare quotation, tariff sharing & live chauffeur status",
        actionText: "Chat on WhatsApp",
        actionLink: waHref("Hello Super Cabs, I would like to enquire about taxi booking."),
        isExternal: true,
        btnClass: "spc-c-btn-wa"
    },
    {
        icon: "fa-envelope-open-text",
        btnIcon: "fa-solid fa-envelope",
        badge: "Email Support",
        title: "Email Address",
        primary: siteConfig.email,
        secondary: "For corporate tariff, receipts & general queries",
        actionText: "Send Email",
        actionLink: `mailto:${siteConfig.email}`,
        isExternal: true,
        btnClass: "spc-c-btn-primary"
    }
];

const styles = `
.spc-contact-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 32px 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 30px rgba(11, 34, 41, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: hidden;
}
.spc-contact-card:hover {
    transform: translateY(-6px);
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 20px 40px rgba(11, 34, 41, 0.12);
}
.spc-contact-icon-wrap {
    width: 58px;
    height: 58px;
    border-radius: 16px;
    background: rgba(28, 168, 203, 0.1);
    color: var(--theme-color, #1ca8cb);
    display: grid;
    place-items: center;
    font-size: 24px;
    margin-bottom: 20px;
    transition: background 0.3s ease, color 0.3s ease;
}
.spc-contact-card:hover .spc-contact-icon-wrap {
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
}
.spc-c-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 4px 12px;
    border-radius: 20px;
    background: rgba(28, 168, 203, 0.1);
    color: var(--theme-color, #1ca8cb);
    margin-bottom: 12px;
}
.spc-c-title {
    font-size: 19px;
    font-weight: 700;
    color: var(--title-color, #0b2229);
    margin: 0 0 10px;
}
.spc-c-primary {
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 8px;
    line-height: 1.5;
}
.spc-c-secondary {
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 20px;
}
.spc-c-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff !important;
    border: none;
    box-shadow: 0 4px 12px rgba(28, 168, 203, 0.3);
    transition: all 0.2s ease;
    width: 100%;
}
.spc-c-btn-primary:hover {
    background: #148ea8;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(28, 168, 203, 0.45);
}
.spc-c-btn-wa {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    background: #25D366;
    color: #ffffff !important;
    border: none;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
    transition: all 0.2s ease;
    width: 100%;
}
.spc-c-btn-wa:hover {
    background: #1ea952;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.45);
}
.spc-c-btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    background: #f8fafc;
    color: #0b2229 !important;
    border: 1px solid #cbd5e1;
    transition: all 0.2s ease;
    width: 100%;
}
.spc-c-btn-outline:hover {
    border-color: var(--theme-color, #1ca8cb);
    color: var(--theme-color, #1ca8cb) !important;
    background: #ffffff;
    transform: translateY(-2px);
}
`;

function GetInTouch() {
    return (
        <section className="space">
            <style>{styles}</style>
            <div className="container">
                <div className="title-area text-center mb-5">
                    <span 
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'var(--theme-color, #1ca8cb)',
                            background: 'rgba(28, 168, 203, 0.1)',
                            padding: '6px 16px',
                            borderRadius: '30px',
                            marginBottom: '12px'
                        }}
                    >
                        Get In Touch
                    </span>
                    <h2 className="sec-title mb-2">Our Official Contact Information</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Connect with Super Cabs for local city rides, outstation one-way drops, round trips, airport transfers, and customized holiday tour packages.
                    </p>
                </div>

                <div className="row g-4 justify-content-center">
                    {contactCards.map((item, index) => (
                        <div key={index} className="col-xl-3 col-lg-6 col-md-6">
                            <div className="spc-contact-card">
                                <div>
                                    <span className="spc-c-badge">{item.badge}</span>
                                    <h3 className="spc-c-title">{item.title}</h3>
                                    <div className="spc-c-primary">{item.primary}</div>
                                    <p className="spc-c-secondary">{item.secondary}</p>
                                </div>
                                <div>
                                    {item.isExternal ? (
                                        <a
                                            href={item.actionLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={item.btnClass}
                                        >
                                            {item.btnIcon && <i className={item.btnIcon}></i>}
                                            <span>{item.actionText}</span>
                                        </a>
                                    ) : item.isAnchor ? (
                                        <a href={item.actionLink} className={item.btnClass}>
                                            {item.btnIcon && <i className={item.btnIcon}></i>}
                                            <span>{item.actionText}</span>
                                        </a>
                                    ) : (
                                        <Link to={item.actionLink} className={item.btnClass}>
                                            {item.btnIcon && <i className={item.btnIcon}></i>}
                                            <span>{item.actionText}</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GetInTouch;
