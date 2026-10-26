import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { tours } from '../data/cabsData';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import { submitTourEnquiry } from '../../services/bookingService';
import usePublicContent from '../../services/usePublicContent';

const styles = `
.td-section {
    padding: 70px 0 90px;
    background: #fbfcfd;
}
.td-card {
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #eef2f5;
    box-shadow: 0 10px 30px rgba(11, 34, 41, 0.04);
    padding: 32px;
    margin-bottom: 28px;
}
.td-card-title {
    font-size: 20px;
    font-weight: 800;
    color: #0b2229;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.td-card-title i {
    color: var(--theme-color, #1ca8cb);
    font-size: 20px;
}
.td-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.td-badge-primary {
    background: rgba(28, 168, 203, 0.12);
    color: var(--theme-color, #1ca8cb);
}
.td-badge-dark {
    background: #0f172a;
    color: #ffffff;
}

/* Places Covered Grid */
.td-places-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px;
}
.td-place-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    transition: all 0.2s ease;
}
.td-place-item:hover {
    border-color: var(--theme-color, #1ca8cb);
    background: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(28, 168, 203, 0.08);
}
.td-place-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(28, 168, 203, 0.15);
    color: var(--theme-color, #1ca8cb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 2px;
}
.td-place-text {
    font-size: 13.5px;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.4;
}

/* Itinerary Timeline */
.td-itinerary-timeline {
    position: relative;
    padding-left: 24px;
}
.td-itinerary-timeline::before {
    content: '';
    position: absolute;
    top: 12px;
    bottom: 12px;
    left: 7px;
    width: 2px;
    background: #cbd5e1;
}
.td-itinerary-step {
    position: relative;
    margin-bottom: 24px;
}
.td-itinerary-step:last-child {
    margin-bottom: 0;
}
.td-itinerary-dot {
    position: absolute;
    left: -24px;
    top: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid var(--theme-color, #1ca8cb);
    box-shadow: 0 0 0 3px rgba(28, 168, 203, 0.15);
}
.td-itinerary-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px 18px;
    transition: all 0.2s ease;
}
.td-itinerary-box:hover {
    background: #ffffff;
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 4px 14px rgba(0,0,0,0.04);
}
.td-itinerary-time {
    display: inline-block;
    font-size: 11.5px;
    font-weight: 700;
    color: var(--theme-color, #1ca8cb);
    background: rgba(28, 168, 203, 0.1);
    padding: 3px 10px;
    border-radius: 12px;
    margin-bottom: 6px;
}
.td-itinerary-title {
    font-size: 15.5px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
}
.td-itinerary-desc {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.6;
    margin-bottom: 0;
}
.td-itinerary-points {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
}
.td-itinerary-points li {
    font-size: 13.5px;
    color: #334155;
    margin-bottom: 7px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.5;
}
.td-itinerary-points li:last-child {
    margin-bottom: 0;
}
.td-itinerary-bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--theme-color, #1ca8cb);
    margin-top: 7px;
    flex-shrink: 0;
}

/* Inclusions / Exclusions */
.td-inc-box {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 14px;
    padding: 20px;
    height: 100%;
}
.td-exc-box {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 14px;
    padding: 20px;
    height: 100%;
}
.td-inc-title {
    font-size: 15.5px;
    font-weight: 700;
    color: #166534;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.td-exc-title {
    font-size: 15.5px;
    font-weight: 700;
    color: #991b1b;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.td-inc-list, .td-exc-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.td-inc-list li {
    font-size: 13px;
    color: #15803d;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.45;
}
.td-inc-list li i {
    margin-top: 3px;
    flex-shrink: 0;
}
.td-exc-list li {
    font-size: 13px;
    color: #b91c1c;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.45;
}
.td-exc-list li i {
    margin-top: 3px;
    flex-shrink: 0;
}

/* Vehicle Grid */
.td-veh-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
}
.td-veh-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.td-veh-card:hover, .td-veh-card.active {
    background: #ffffff;
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 6px 18px rgba(28, 168, 203, 0.15);
    transform: translateY(-2px);
}
.td-veh-name {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
}
.td-veh-info {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 8px;
}

/* Sidebar Sticky CTA Card */
.td-sidebar {
    position: sticky;
    top: 95px;
}
.td-cta-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 16px 45px rgba(11, 34, 41, 0.08);
    padding: 28px 24px;
    color: #0b2229;
}
.td-cta-price-box {
    background: linear-gradient(135deg, #0b2229 0%, #16363f 100%);
    border-radius: 14px;
    padding: 18px 20px;
    color: #ffffff;
    margin-bottom: 20px;
}
.td-cta-duration-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: #5ad4f5;
    background: rgba(28, 168, 203, 0.18);
    border: 1px solid rgba(28, 168, 203, 0.35);
    padding: 4px 10px;
    border-radius: 12px;
    margin-bottom: 8px;
}
.td-cta-heading {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 4px;
    color: #ffffff;
}
.td-cta-sub {
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
}

/* Quick Action Buttons */
.td-btn-wa {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 13px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff !important;
    background: #25D366;
    border: none;
    text-decoration: none;
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
    transition: all 0.25s ease;
    cursor: pointer;
    margin-bottom: 10px;
}
.td-btn-wa:hover {
    background: #1ea952;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
}
.td-btn-call {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 13.5px;
    font-weight: 700;
    color: #ffffff !important;
    background: var(--theme-color, #1ca8cb);
    border: none;
    text-decoration: none;
    box-shadow: 0 6px 18px rgba(28, 168, 203, 0.35);
    transition: all 0.25s ease;
    cursor: pointer;
    margin-bottom: 20px;
}
.td-btn-call:hover {
    background: #148ea8;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(28, 168, 203, 0.5);
}

/* Form in Sidebar */
.td-form-title {
    font-size: 15.5px;
    font-weight: 800;
    color: #0b2229;
    margin-bottom: 4px;
}
.td-form-sub {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 14px;
}
.td-form-label {
    font-size: 11.5px;
    font-weight: 700;
    color: #334155;
    margin-bottom: 4px;
    display: block;
}
.td-form-input {
    width: 100%;
    height: 42px;
    padding: 0 12px;
    border-radius: 9px;
    border: 1.5px solid #cbd5e1;
    background: #f8fafc;
    font-size: 13px;
    color: #0f172a;
    transition: all 0.2s ease;
    outline: none;
    margin-bottom: 10px;
}
.td-form-input:focus {
    background: #ffffff;
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 0 0 3px rgba(28, 168, 203, 0.15);
}
.td-form-input.has-error {
    border-color: #ef4444;
    background: #fffafa;
}
.td-form-submit {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(135deg, #0b2229 0%, #16363f 100%);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}
.td-form-submit:hover {
    background: #000000;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.25);
}
.td-trust-strip {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px dashed #e2e8f0;
}
.td-trust-item {
    font-size: 11.5px;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 6px;
}
.td-trust-item i {
    color: var(--theme-color, #1ca8cb);
    font-size: 13px;
}

/* Related Tour Cards */
.td-related-card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #eef2f5;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: 0 4px 14px rgba(11, 34, 41, 0.04);
}
.td-related-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 32px rgba(11, 34, 41, 0.1);
    border-color: var(--theme-color, #1ca8cb);
}
.td-related-img-wrap {
    height: 200px;
    width: 100%;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background: #e2e8f0;
}
.td-related-img {
    height: 100% !important;
    max-height: 100% !important;
    width: 100% !important;
    object-fit: cover !important;
    display: block !important;
    transition: transform 0.5s ease;
}
.td-related-card:hover .td-related-img {
    transform: scale(1.06);
}
.td-related-body {
    padding: 18px 20px 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.td-related-title {
    font-size: 16px;
    font-weight: 700;
    color: #0b2229;
    margin-bottom: 6px;
    line-height: 1.35;
}
.td-related-dur {
    font-size: 12px;
    color: var(--theme-color, #1ca8cb);
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-flex;
    align-items: center;
}
.td-related-places {
    font-size: 12.5px;
    color: #64748b;
    margin: 0 0 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Vehicle-Wise Pricing Cards */
.td-vp-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 22px 14px 18px;
    text-align: center;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.25s ease;
    box-shadow: 0 4px 12px rgba(11, 34, 41, 0.03);
}
.td-vp-card:hover {
    transform: translateY(-4px);
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 12px 24px rgba(28, 168, 203, 0.12);
}
.td-vp-tag {
    position: absolute;
    top: -10px;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 2px 10px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.td-vp-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(28, 168, 203, 0.1);
    color: var(--theme-color, #1ca8cb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 12px;
}
.td-vp-title {
    font-size: 13.5px;
    font-weight: 700;
    color: #0b2229;
    margin: 0 0 4px;
    line-height: 1.3;
}
.td-vp-seats {
    font-size: 11.5px;
    color: #64748b;
    margin-bottom: 12px;
}
.td-vp-rate-wrap {
    margin-bottom: 14px;
}
.td-vp-price {
    font-size: 19px;
    font-weight: 800;
    color: #0b2229;
    display: block;
    line-height: 1.2;
}
.td-vp-sub {
    font-size: 11px;
    color: #94a3b8;
}
.td-vp-btn {
    margin-top: auto;
    width: 100%;
    padding: 8px 12px;
    background: #25D366;
    color: #ffffff !important;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}
.td-vp-btn:hover {
    background: #20bd5a;
    transform: scale(1.02);
}
`;

function TourDetailInner() {
    const { id } = useParams();
    const managedTours = usePublicContent('tour', tours);

    // Look up tour by slug or ID
    const currentTour = managedTours.find((t) => 
        t.slug === id || String(t.id) === String(id)
    ) || managedTours[0] || tours[0];

    const {
        title,
        duration,
        places,
        placesCovered,
        overview,
        itinerary,
        highlights,
        tag,
        image,
        suitableFor
    } = currentTour;

    const imgSrc = image || `/assets/img/cabs/tour-${currentTour.id}.jpg`;

    // WhatsApp Direct Link
    const waLink = waHref(
        `Hello Super Cabs, I would like to book / enquire about the "${title}" package (${duration}). Please share fare details and availability.`
    );

    // Form state
    const [formValues, setFormValues] = useState({
        name: "",
        phone: "",
        pickup: "",
        date: "",
        vehicle: "Comfort Sedan (Dzire / Etios • 4 Seater)",
        notes: ""
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleFormChange = (k, v) => {
        setFormValues((prev) => ({ ...prev, [k]: v }));
        if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const errs = {};
        if (!formValues.name.trim()) errs.name = "Full name required";
        const digits = formValues.phone.replace(/[^0-9]/g, "");
        if (digits.length < 10) errs.phone = "10-digit phone number required";
        if (!formValues.pickup.trim()) errs.pickup = "Pickup city required";

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        const msg = 
            `*Tour Package Booking Enquiry - Super Cabs*\n\n` +
            `📦 *Package:* ${title}\n` +
            `⏱️ *Duration:* ${duration}\n` +
            `👤 *Customer Name:* ${formValues.name}\n` +
            `📞 *Phone:* +91 ${digits.slice(-10)}\n` +
            `📍 *Pickup Location:* ${formValues.pickup}\n` +
            `📅 *Travel Date:* ${formValues.date || "Immediate / Flexible"}\n` +
            `🚘 *Vehicle Preference:* ${formValues.vehicle}\n` +
            (formValues.notes ? `💬 *Special Notes:* ${formValues.notes}\n` : '');

        submitTourEnquiry({
            tourId: currentTour.id,
            tourTitle: title,
            customerName: formValues.name,
            customerPhone: digits.slice(-10),
            travelDate: formValues.date || 'Immediate / Flexible',
            travelers: formValues.vehicle,
            notes: `Pickup: ${formValues.pickup}. ${formValues.notes || ''}`
        }).catch((err) => console.info('[TourDetail] Sync info:', err.message));

        window.open(waHref(msg), "_blank", "noopener");
        setSubmitted(true);
    };

    // Other tours for "Other Popular Packages"
    const otherTours = managedTours.filter((t) => t.id !== currentTour.id).slice(0, 3);

    return (
        <section className="td-section">
            <style>{styles}</style>
            <div className="container">
                {/* Back Link & Quick Nav */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <Link 
                        to="/tours" 
                        className="d-inline-flex align-items-center gap-2 text-decoration-none"
                        style={{ color: '#475569', fontSize: '13.5px', fontWeight: '600' }}
                    >
                        <i className="fa-solid fa-arrow-left" style={{ color: 'var(--theme-color, #1ca8cb)' }}></i>
                        <span>Back to All Tour Packages</span>
                    </Link>
                    <div className="d-flex align-items-center gap-2">
                        {tag && <span className="td-badge td-badge-primary">{tag}</span>}
                        {duration && (
                            <span className="td-badge td-badge-dark">
                                <i className="fa-regular fa-clock me-1 text-theme"></i>
                                {duration}
                            </span>
                        )}
                    </div>
                </div>

                <div className="row g-4">
                    {/* Left Column: Package Details & Places Covered */}
                    <div className="col-lg-8">
                        {/* Hero Image Box */}
                        <div 
                            className="td-card p-0 overflow-hidden position-relative mb-4" 
                            style={{ border: 'none', boxShadow: '0 12px 36px rgba(11, 34, 41, 0.08)' }}
                        >
                            <img 
                                src={imgSrc} 
                                alt={currentTour.alt || currentTour.seo?.altText || title} 
                                style={{ width: '100%', height: '360px', objectFit: 'cover' }} 
                            />
                            <div 
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '24px 28px',
                                    background: 'linear-gradient(180deg, transparent 0%, rgba(11, 34, 41, 0.88) 90%)',
                                    color: '#ffffff'
                                }}
                            >
                                <span className="badge bg-warning text-dark mb-2 px-3 py-1" style={{ fontSize: '11px', fontWeight: '700' }}>
                                    <i className="fa-solid fa-star me-1"></i> Top Rated Super Cabs Tour
                                </span>
                                <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px', lineHeight: '1.25' }}>
                                    {title}
                                </h1>
                                <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
                                    <i className="fa-regular fa-clock me-1 text-warning"></i> {duration} • Dedicated Private AC Vehicle &amp; Verified Highway Chauffeur
                                </p>
                            </div>
                        </div>

                        {/* Quick Spec Highlights Strip */}
                        <div className="row g-2 mb-4">
                            <div className="col-sm-4 col-6">
                                <div className="p-3 rounded-3 text-center" style={{ background: '#ffffff', border: '1px solid #eef2f5' }}>
                                    <i className="fa-regular fa-clock text-theme mb-1" style={{ fontSize: '20px' }}></i>
                                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Duration</div>
                                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{duration}</strong>
                                </div>
                            </div>
                            <div className="col-sm-4 col-6">
                                <div className="p-3 rounded-3 text-center" style={{ background: '#ffffff', border: '1px solid #eef2f5' }}>
                                    <i className="fa-solid fa-location-dot text-theme mb-1" style={{ fontSize: '20px' }}></i>
                                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Places Covered</div>
                                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{placesCovered ? `${placesCovered.length}+ Key Sights` : 'Curated Route'}</strong>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12">
                                <div className="p-3 rounded-3 text-center" style={{ background: '#ffffff', border: '1px solid #eef2f5' }}>
                                    <i className="fa-solid fa-shield-halved text-theme mb-1" style={{ fontSize: '20px' }}></i>
                                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Assurance</div>
                                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>Chauffeur &amp; AC Cab</strong>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 1: PLACES COVERED */}
                        <div className="td-card">
                            <h3 className="td-card-title">
                                <i className="fa-solid fa-map-location-dot"></i>
                                <span>Places Covered in this Package</span>
                            </h3>
                            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '18px' }}>
                                Below are the iconic landmarks, sightseeing spots, and key destinations included in the <strong>{title}</strong>:
                            </p>

                            {placesCovered && placesCovered.length > 0 ? (
                                <div className="td-places-grid">
                                    {placesCovered.map((place, idx) => (
                                        <div key={idx} className="td-place-item">
                                            <div className="td-place-icon">
                                                <i className="fa-solid fa-location-dot"></i>
                                            </div>
                                            <div className="td-place-text">{place}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '14px' }}>
                                    <i className="fa-solid fa-route text-theme me-2"></i> {places}
                                </div>
                            )}

                            {/* Route Summary Pill */}
                            <div 
                                className="mt-4 p-3 rounded-3 d-flex align-items-center gap-3"
                                style={{ background: 'rgba(28, 168, 203, 0.08)', border: '1px dashed rgba(28, 168, 203, 0.35)' }}
                            >
                                <i className="fa-solid fa-route text-theme" style={{ fontSize: '22px' }}></i>
                                <div style={{ fontSize: '13px', color: '#164e63', lineHeight: '1.5' }}>
                                    <strong>Flexible Route Control:</strong> Want to add a specific temple, viewpoint, or dining spot? Our private chauffeur accommodates custom stops along the route.
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: PACKAGE DETAILS & OVERVIEW */}
                        <div className="td-card">
                            <h3 className="td-card-title">
                                <i className="fa-solid fa-circle-info"></i>
                                <span>Package Details &amp; Overview</span>
                            </h3>
                            <p style={{ fontSize: '14.5px', lineHeight: '1.75', color: '#334155', marginBottom: '20px' }}>
                                {overview || currentTour.text}
                            </p>

                            {suitableFor && (
                                <div className="mb-4 p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <strong className="text-dark" style={{ fontSize: '13px' }}>
                                        <i className="fa-solid fa-users me-2 text-theme"></i> Recommended &amp; Ideal For:
                                    </strong>
                                    <span style={{ fontSize: '13px', color: '#475569', marginLeft: '6px' }}>{suitableFor}</span>
                                </div>
                            )}

                            {/* Highlights Checklist */}
                            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0b2229', marginBottom: '14px' }}>
                                Key Package Highlights
                            </h4>
                            <div className="row g-2 mb-2">
                                {highlights && highlights.map((h, i) => (
                                    <div key={i} className="col-md-6">
                                        <div 
                                            className="p-2 rounded-2 d-flex align-items-center gap-2"
                                            style={{ background: '#f8fafc', fontSize: '13px', color: '#334155' }}
                                        >
                                            <span>{h}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 3: STEP-BY-STEP ITINERARY */}
                        {itinerary && itinerary.length > 0 && (
                            <div className="td-card">
                                <h3 className="td-card-title">
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <span>Detailed Tour Itinerary</span>
                                </h3>
                                <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '24px' }}>
                                    Suggested itinerary designed for relaxed travel, photo stops, and unhurried sightseeing:
                                </p>

                                <div className="td-itinerary-timeline">
                                    {itinerary.map((step, idx) => (
                                        <div key={idx} className="td-itinerary-step">
                                            <div className="td-itinerary-dot"></div>
                                            <div className="td-itinerary-box">
                                                <span className="td-itinerary-time">
                                                    <i className="fa-solid fa-calendar-day me-1"></i> {step.timeOrDay}
                                                </span>
                                                <h4 className="td-itinerary-title">{step.title}</h4>
                                                {step.points && step.points.length > 0 ? (
                                                    <ul className="td-itinerary-points">
                                                        {step.points.map((pt, pIdx) => (
                                                            <li key={pIdx}>
                                                                <span className="td-itinerary-bullet"></span>
                                                                <span>{pt}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="td-itinerary-desc">{step.desc}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Vehicle-Wise Tour Package Pricing */}
                        {currentTour.vehiclePricing && currentTour.vehiclePricing.length > 0 && (
                            <div className="td-card">
                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                                    <h3 className="td-card-title mb-0">
                                        <i className="fa-solid fa-car-side"></i> Vehicle-Wise Package Pricing
                                    </h3>
                                    <span className="td-badge td-badge-primary">All-Inclusive</span>
                                </div>
                                <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 20px', lineHeight: '1.5' }}>
                                    Select your preferred vehicle for this tour. Rates include private sanitized AC cab, dedicated chauffeur, fuel charges, and standard itinerary sightseeing.
                                </p>

                                <div className="row g-3">
                                    {currentTour.vehiclePricing.map((vp, idx) => (
                                        <div key={idx} className="col-sm-6 col-xl-3">
                                            <div className="td-vp-card">
                                                {vp.tag && <span className="td-vp-tag">{vp.tag}</span>}
                                                <div className="td-vp-icon">
                                                    <i className={`fa-solid ${vp.icon || 'fa-car'}`}></i>
                                                </div>
                                                <h4 className="td-vp-title">{vp.vehicle}</h4>
                                                <div className="td-vp-seats">
                                                    <i className="fa-solid fa-users me-1"></i> {vp.seats}
                                                </div>
                                                <div className="td-vp-rate-wrap">
                                                    <span className="td-vp-price">{vp.price}</span>
                                                    <span className="td-vp-sub">/ full tour</span>
                                                </div>
                                                <a 
                                                    href={waHref(`Hello Super Cabs, I would like to book the ${title} with ${vp.vehicle} for ${vp.price}.`)}
                                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                                    rel="noopener noreferrer"
                                                    className="td-vp-btn"
                                                >
                                                    <i className="fab fa-whatsapp me-1"></i> Book Now
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 p-3 rounded-3 d-flex align-items-center gap-2" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12.5px', color: '#64748b' }}>
                                    <span><strong>Transparent Rate:</strong> Fuel, vehicle &amp; driver allowance (bata) included. Highway Fastag tolls &amp; parking billed at actuals.</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sticky Package Enquiry CTA Box */}
                    <div className="col-lg-4">
                        <div className="td-sidebar">
                            <div className="td-cta-card">
                                {/* Price / Package Header Box */}
                                <div className="td-cta-price-box">
                                    <div className="td-cta-duration-tag">
                                        <i className="fa-regular fa-clock"></i> {duration}
                                    </div>
                                    <h3 className="td-cta-heading">{title}</h3>
                                    <p className="td-cta-sub">
                                        All-inclusive transparent pricing with zero surprise charges.
                                    </p>
                                </div>

                                {/* Instant 1-Click WhatsApp CTA */}
                                <a 
                                    href={waLink}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="td-btn-wa"
                                >
                                    <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
                                    <span>Instant WhatsApp Enquiry</span>
                                </a>

                                {/* Instant Call CTA */}
                                <a href={telHref()} className="td-btn-call">
                                    <i className="fa-solid fa-phone"></i>
                                    <span>Call: {siteConfig.phoneDisplay}</span>
                                </a>

                                {/* Quick Package Enquiry Form */}
                                <div className="pt-3 border-top">
                                    <h4 className="td-form-title">
                                        <i className="fa-solid fa-paper-plane text-theme me-1"></i> Send Enquiry
                                    </h4>
                                    <p className="td-form-sub">
                                        Fill your details below to get an instant customized quote:
                                    </p>

                                    <form onSubmit={handleFormSubmit} noValidate>
                                        <div>
                                            <label className="td-form-label">Full Name *</label>
                                            <input 
                                                type="text" 
                                                className={`td-form-input ${errors.name ? 'has-error' : ''}`}
                                                placeholder="Your Full Name"
                                                value={formValues.name}
                                                onChange={(e) => handleFormChange("name", e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="td-form-label">Mobile Number *</label>
                                            <input 
                                                type="tel" 
                                                maxLength={10}
                                                className={`td-form-input ${errors.phone ? 'has-error' : ''}`}
                                                placeholder="10-digit mobile number"
                                                value={formValues.phone}
                                                onChange={(e) => handleFormChange("phone", e.target.value.replace(/[^0-9]/g, ''))}
                                            />
                                        </div>

                                        <div>
                                            <label className="td-form-label">Pickup City / Area *</label>
                                            <input 
                                                type="text" 
                                                className={`td-form-input ${errors.pickup ? 'has-error' : ''}`}
                                                placeholder="E.g. Coimbatore, Madurai, Chennai..."
                                                value={formValues.pickup}
                                                onChange={(e) => handleFormChange("pickup", e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="td-form-label">Date of Travel</label>
                                            <input 
                                                type="date" 
                                                className="td-form-input"
                                                min={new Date().toISOString().split('T')[0]}
                                                value={formValues.date}
                                                onChange={(e) => handleFormChange("date", e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="td-form-label">Vehicle Type</label>
                                            <select 
                                                className="td-form-input"
                                                value={formValues.vehicle}
                                                onChange={(e) => handleFormChange("vehicle", e.target.value)}
                                            >
                                                <option value="Comfort Sedan (Dzire / Etios • 4 Seater)">Comfort Sedan (Dzire / Etios • 4 Seater)</option>
                                                <option value="Executive Sedan (Ciaz / City • 4 Seater)">Executive Sedan (Ciaz / City • 4 Seater)</option>
                                                <option value="Family SUV (Ertiga / Brezza • 6 Seater)">Family SUV (Ertiga / Brezza • 6 Seater)</option>
                                                <option value="Luxury MPV (Innova Crysta • 7 Seater)">Luxury MPV (Innova Crysta • 7 Seater)</option>
                                                <option value="Tempo Traveller (12-Seater AC Luxury)">Tempo Traveller (12-Seater AC Luxury)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="td-form-label">Special Notes / Passengers (Optional)</label>
                                            <input 
                                                type="text" 
                                                className="td-form-input"
                                                placeholder="E.g. 4 Adults + 1 Child, Senior citizen..."
                                                value={formValues.notes}
                                                onChange={(e) => handleFormChange("notes", e.target.value)}
                                            />
                                        </div>

                                        <button type="submit" className="td-form-submit">
                                            <i className="fab fa-whatsapp" style={{ fontSize: '16px' }}></i>
                                            <span>Send Package Enquiry</span>
                                        </button>
                                    </form>

                                    {submitted && (
                                        <div className="alert alert-success mt-3 py-2 px-3" style={{ fontSize: '12.5px', borderRadius: '10px' }}>
                                            <i className="fa-solid fa-circle-check me-1"></i> Enquiry sent to Super Cabs WhatsApp desk!
                                        </div>
                                    )}

                                    {/* Trust Badges */}
                                    <div className="td-trust-strip">
                                        <div className="td-trust-item">
                                            <i className="fa-solid fa-bolt"></i>
                                            <span>Instant Quote</span>
                                        </div>
                                        <div className="td-trust-item">
                                            <i className="fa-solid fa-snowflake"></i>
                                            <span>100% AC Cabs</span>
                                        </div>
                                        <div className="td-trust-item">
                                            <i className="fa-solid fa-shield-halved"></i>
                                            <span>Verified Drivers</span>
                                        </div>
                                        <div className="td-trust-item">
                                            <i className="fa-solid fa-headset"></i>
                                            <span>24/7 Helpline</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Popular Tour Packages Section */}
                {otherTours.length > 0 && (
                    <div className="mt-5 pt-4">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                            <div>
                                <span className="sub-title">Explore More</span>
                                <h3 className="sec-title mb-0" style={{ fontSize: '24px' }}>Other Popular Tour Packages</h3>
                            </div>
                            <Link to="/tours" className="th-btn style4" style={{ padding: '8px 18px', fontSize: '13px' }}>
                                View All ({managedTours.length}) Packages <i className="fa-solid fa-arrow-right ms-1"></i>
                            </Link>
                        </div>

                        <div className="row g-4">
                            {otherTours.map((t) => (
                                <div key={t.id} className="col-md-4">
                                    <Link to={`/tours/${t.slug || t.id}`} className="td-related-card">
                                        <div className="td-related-img-wrap">
                                            <img 
                                                src={t.image || `/assets/img/cabs/tour-${t.id}.jpg`} 
                                                alt={t.alt || t.seo?.altText || t.title} 
                                                className="td-related-img" 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            />
                                            {t.tag && (
                                                <span 
                                                    style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        left: '12px',
                                                        background: 'var(--theme-color, #1ca8cb)',
                                                        color: '#ffffff',
                                                        fontSize: '11px',
                                                        fontWeight: '700',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        padding: '3px 10px',
                                                        borderRadius: '14px',
                                                        zIndex: 2,
                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
                                                    }}
                                                >
                                                    {t.tag}
                                                </span>
                                            )}
                                        </div>
                                        <div className="td-related-body">
                                            <div className="td-related-dur">
                                                <i className="fa-regular fa-clock me-1"></i> {t.duration}
                                            </div>
                                            <h4 className="td-related-title">{t.title}</h4>
                                            <p className="td-related-places">
                                                {t.places}
                                            </p>
                                            <div className="mt-auto text-theme" style={{ fontSize: '13px', fontWeight: '700' }}>
                                                Explore Package <i className="fa-solid fa-arrow-right ms-1"></i>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default TourDetailInner;
