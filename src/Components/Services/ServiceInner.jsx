import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import { services as defaultServices } from '../data/cabsData';
import usePublicContent from '../../services/usePublicContent';
import ServiceCard from './ServiceCard';

const css = `
.sv-section {
    position: relative;
    background: #fdfdfd;
}

/* Featured One-Way / Round-Trip Card */
.sv-featured-card {
    background: #ffffff;
    border: 2px solid var(--theme-color, #1ca8cb);
    border-radius: 22px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 16px 45px rgba(28, 168, 203, 0.12);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
}
.sv-featured-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 55px rgba(28, 168, 203, 0.22);
}
.sv-featured-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 5px 14px;
    border-radius: 20px;
    z-index: 3;
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
}
.sv-featured-img-wrap {
    height: 100%;
    min-height: 240px;
    position: relative;
    overflow: hidden;
    background: #0b2229;
}
.sv-featured-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}
.sv-featured-card:hover .sv-featured-img {
    transform: scale(1.06);
}
.sv-featured-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(11, 34, 41, 0.1) 0%, rgba(11, 34, 41, 0.7) 100%);
    display: flex;
    align-items: flex-end;
    padding: 16px 20px;
}
.sv-route-ticker {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    color: #0b2229;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.25);
}
.sv-featured-body {
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
.sv-pill-feature {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #244b55;
    background: rgba(28, 168, 203, 0.1);
    padding: 5px 12px;
    border-radius: 14px;
}

/* Service Enquiry CTA Card (Dark Obsidian Gradient) */
.sv-cta-card {
    background: linear-gradient(145deg, #0b2229 0%, #16363f 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 22px;
    padding: 24px 22px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;
    box-shadow: 0 16px 45px rgba(11, 34, 41, 0.16);
    position: relative;
    overflow: hidden;
}
.sv-cta-card::after {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: rgba(28, 168, 203, 0.16);
    filter: blur(40px);
    pointer-events: none;
}
.sv-cta-icon-circle {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(28, 168, 203, 0.2);
    color: #38bdf8;
    display: grid;
    place-items: center;
    font-size: 22px;
    margin-bottom: 18px;
}

/* Standard Service Cards (Local, Outstation, Airport) */
.sv-standard-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(11, 34, 41, 0.05);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    position: relative;
}
.sv-standard-card:hover {
    transform: translateY(-6px);
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 20px 45px rgba(11, 34, 41, 0.12);
}
.sv-img-holder {
    height: 200px;
    position: relative;
    overflow: hidden;
    background: #0b2229;
}
.sv-img-holder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}
.sv-standard-card:hover .sv-img-holder img {
    transform: scale(1.08);
}
.sv-badge-tag {
    position: absolute;
    top: 14px;
    left: 14px;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 4px 12px;
    border-radius: 20px;
    z-index: 2;
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
}
.sv-badge-icon {
    position: absolute;
    bottom: 12px;
    right: 14px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ffffff;
    color: var(--theme-color, #1ca8cb);
    display: grid;
    place-items: center;
    font-size: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 2;
}
.sv-card-content {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.sv-micro-strip {
    font-size: 11.5px;
    font-weight: 700;
    color: var(--theme-color, #1ca8cb);
    background: rgba(28, 168, 203, 0.08);
    padding: 4px 10px;
    border-radius: 8px;
    margin-bottom: 12px;
    align-self: flex-start;
}
.sv-card-title {
    font-size: 19px;
    font-weight: 700;
    margin: 0 0 8px;
    color: #0b2229;
}
.sv-card-title a {
    color: #0b2229;
    text-decoration: none;
    transition: color 0.2s ease;
}
.sv-card-title a:hover {
    color: var(--theme-color, #1ca8cb);
}
.sv-card-desc {
    font-size: 13.5px;
    color: #64748b;
    line-height: 1.55;
    margin-bottom: 16px;
}
.sv-features-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 18px;
}

/* Corporate Taxi Wide Banner Card */
.sv-corporate-card {
    background: linear-gradient(135deg, #0b2229 0%, #13333b 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 16px 45px rgba(11, 34, 41, 0.12);
    color: #ffffff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.sv-corporate-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 24px 55px rgba(11, 34, 41, 0.2);
}
.sv-corp-perk {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 7px 14px;
    border-radius: 12px;
    font-size: 12.5px;
    font-weight: 600;
    color: #e2e8f0;
}
.sv-corp-perk i {
    color: #38bdf8;
    font-size: 14px;
}
`;

function ServiceInner() {
    const managedServices = usePublicContent('service', defaultServices);
    const getService = slug => managedServices.find(item => item.slug === slug);
    const oneWay = getService('oneway-roundtrip');
    const local = getService('local');
    const outstation = getService('outstation');
    const airport = getService('airport');
    const corporate = getService('corporate');
    const otherServices = managedServices.filter(item => !['oneway-roundtrip', 'local', 'outstation', 'airport', 'corporate'].includes(item.slug));
    return (
        <section className="position-relative overflow-hidden space sv-section" id="taxi-services-sec">
            <style>{css}</style>

            <div className="container">
                {/* Section Title Area */}
                <div className="title-area text-center mb-5">
                    <span 
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
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
                        <i className="fa-solid fa-taxi"></i> What We Offer
                    </span>
                    <h2 className="sec-title mb-2">Our Specialized Taxi Services</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        From hourly city rides and punctual airport transfers to single-drop highway trips and executive corporate mobility — discover comfortable travel with transparent billing.
                    </p>
                </div>

                {/* ROW 1: Featured One-Way / Round-Trip Card (col-lg-8) + Service Enquiry CTA Card (col-lg-4) */}
                <div className="row gy-4 mb-4">
                    {/* 1. ONE-WAY / ROUND TRIP (SPECIAL FEATURED CARD - CLICKS TO NEW PAGE) */}
                    <div className="col-lg-8" style={!oneWay ? { display: 'none' } : undefined}>
                        <div className="sv-featured-card">
                            <span className="sv-featured-badge">
                                <i className="fa-solid fa-star me-1"></i> Featured Route Service • Save Up To 40%
                            </span>

                            <div className="row g-0 h-100">
                                <div className="col-md-5 position-relative" style={{ minHeight: '220px' }}>
                                    <div className="sv-featured-img-wrap">
                                        <Link to="/services/one-way-round-trip" className="d-block w-100 h-100">
                                            <img 
                                                src={oneWay?.image || "/assets/img/cabs/svc-oneway.jpg"} 
                                                alt={oneWay?.title || "One-Way and Round-Trip Outstation Taxi"} 
                                                className="sv-featured-img" 
                                            />
                                            <div className="sv-featured-overlay">
                                                <div className="sv-route-ticker">
                                                    <i className="fa-solid fa-route text-theme"></i>
                                                    <span>Coimbatore ⇄ Major Cities</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-md-7 d-flex flex-column justify-content-center">
                                    <div className="sv-featured-body">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span 
                                                style={{ 
                                                    fontSize: '11px', 
                                                    fontWeight: '700', 
                                                    textTransform: 'uppercase', 
                                                    color: 'var(--theme-color, #1ca8cb)',
                                                    background: 'rgba(28, 168, 203, 0.1)',
                                                    padding: '3px 10px',
                                                    borderRadius: '12px'
                                                }}
                                            >
                                                {oneWay?.tag || 'Pay Single or Return'}
                                            </span>
                                            <span className="text-muted" style={{ fontSize: '12px' }}>
                                                • Instant Confirmation
                                            </span>
                                        </div>

                                        <h3 className="sv-card-title mb-2" style={{ fontSize: '22px' }}>
                                        <Link to="/services/one-way-round-trip" className="text-dark">
                                                {oneWay?.title || 'One-Way / Round Trip Taxi'}
                                            </Link>
                                        </h3>

                                        <p className="sv-card-desc mb-3">
                                            {oneWay?.description || oneWay?.text || 'Pay strictly for the one-way distance with zero return charges, or retain the dedicated vehicle and chauffeur throughout your multi-day family tour.'}
                                        </p>

                                        <div className="d-flex flex-wrap gap-2 pt-1">
                                            <Link 
                                                to="/services/one-way-round-trip" 
                                                className="th-btn style1 flex-grow-1 text-center justify-content-center"
                                                style={{ padding: '11px 20px', fontSize: '13px' }}
                                            >
                                                Explore One-Way &amp; Round-Trip Details <i className="fa-solid fa-arrow-right ms-2"></i>
                                            </Link>
                                            <a 
                                                href={waHref("Hello Super Cabs, I would like to get a quote for a One-Way / Round-Trip cab.")}
                                                target={siteConfig.whatsapp ? "_blank" : undefined}
                                                rel="noopener noreferrer"
                                                className="th-btn style1 text-center justify-content-center"
                                                style={{ background: '#25D366', borderColor: '#25D366', padding: '11px 16px', fontSize: '13px' }}
                                                title="WhatsApp Enquiry"
                                            >
                                                <i className="fab fa-whatsapp"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. SERVICE ENQUIRY CTA CARD (24/7 INSTANT DISPATCH DESK) */}
                    <div className="col-lg-4">
                        <div className="sv-cta-card">
                            <div>
                                <div className="d-flex justify-content-end mb-3">
                                    <span 
                                        style={{ 
                                            fontSize: '11px', 
                                            fontWeight: '700', 
                                            textTransform: 'uppercase', 
                                            background: 'rgba(28, 168, 203, 0.25)', 
                                            color: '#38bdf8',
                                            padding: '4px 12px',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        24/7 Live Desk
                                    </span>
                                </div>

                                <h4 className="text-white mb-2" style={{ fontSize: '20px', fontWeight: '700' }}>
                                    Service Enquiry &amp; Quick Dispatch
                                </h4>
                                <p className="text-white-50 mb-4" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                                    Need an urgent airport drop, a custom multi-city package, or wedding fleet assistance? Our control desk responds in under 60 seconds.
                                </p>
                            </div>

                            <div>
                                <a 
                                    href={telHref()} 
                                    className="th-btn style4 w-100 justify-content-center mb-2"
                                    style={{ padding: '10px 16px', fontSize: '13px' }}
                                >
                                    <i className="fa-solid fa-phone me-2"></i> Call {siteConfig.phone}
                                </a>

                                <a 
                                    href={waHref("Hello Super Cabs, I need an immediate cab booking / custom enquiry.")}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1 w-100 justify-content-center mb-3"
                                    style={{ background: '#25D366', borderColor: '#25D366', padding: '10px 16px', fontSize: '13px' }}
                                >
                                    <i className="fab fa-whatsapp me-2"></i> WhatsApp Instant Quote
                                </a>

                                <div className="text-center">
                                    <Link 
                                        to="/contact" 
                                        state={{ enquiry: { service: "General Taxi Service Enquiry" } }}
                                        className="text-white-50"
                                        style={{ fontSize: '12.5px', textDecoration: 'underline' }}
                                    >
                                        Or submit detailed enquiry form →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 2: Drop Taxi & One Way Taxi + Local Rental Cabs + Airport Transfers (Matching Reference Image) */}
                <div className="row gy-4 mb-4">
                    {/* 1. DROP TAXI & ONE WAY TAXI (Outstation) */}
                    <div className="col-lg-4 col-md-6" style={!outstation ? { display: 'none' } : undefined}>
                        <div className="sv-standard-card">
                            <div className="sv-img-holder">
                                <Link to="/contact" state={{ enquiry: { service: outstation?.title || "Drop Taxi & One Way Taxi" } }}>
                                    <img src={outstation?.image || "/assets/img/cabs/svc-outstation.jpg"} alt={outstation?.title || "Drop Taxi & One Way Taxi"} />
                                </Link>
                                <span className="sv-badge-tag" style={{ background: '#059669' }}>{outstation?.tag || 'Intercity & Drop Taxi'}</span>
                            </div>

                            <div className="sv-card-content">
                                <div className="sv-micro-strip" style={{ color: '#059669', background: 'rgba(5, 150, 105, 0.09)' }}>
                                    <i className="fa-solid fa-mountain me-1"></i> Ooty • Kodai • Bangalore • Chennai
                                </div>

                                <h4 className="sv-card-title">
                                    <Link to="/contact" state={{ enquiry: { service: outstation?.title || "Drop Taxi & One Way Taxi" } }}>
                                        {outstation?.title || 'DROP TAXI & ONE WAY TAXI'}
                                    </Link>
                                </h4>

                                <p className="sv-card-desc">
                                    {outstation?.description || 'Book a premium one way taxi or drop taxi for your outstation travel. We specialize in providing reliable point-to-point drop services across South India. Save money by paying only for the distance traveled.'}
                                </p>

                                <div className="mt-auto pt-2">
                                    <Link 
                                        to="/contact" 
                                        state={{ enquiry: { service: "Drop Taxi & One Way Taxi" } }}
                                        className="th-btn style4 w-100 justify-content-center"
                                        style={{ padding: '9px 18px', fontSize: '12.5px' }}
                                    >
                                        Enquire Drop Taxi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. LOCAL RENTAL CABS (Local Taxi) */}
                    <div className="col-lg-4 col-md-6">
                        <div className="sv-standard-card">
                            <div className="sv-img-holder">
                                <Link to="/contact" state={{ enquiry: { service: "Local Rental Cabs" } }}>
                                    <img src={local?.image || '/assets/img/cabs/svc-local.jpg'} alt={local?.alt || local?.title || 'Local Rental Cabs'} />
                                </Link>
                                <span className="sv-badge-tag">{local?.tag || 'City Rides & Rentals'}</span>
                            </div>

                            <div className="sv-card-content">
                                <div className="sv-micro-strip">
                                    <i className="fa-regular fa-clock me-1"></i> Hourly: 4h / 40km • 8h / 80km
                                </div>

                                <h4 className="sv-card-title">
                                    <Link to="/contact" state={{ enquiry: { service: "Local Rental Cabs" } }}>
                                        {local?.title || 'LOCAL RENTAL CABS'}
                                    </Link>
                                </h4>

                                <p className="sv-card-desc">
                                    {local?.description || local?.text || 'Our local rental services provide a convenient and flexible way to explore cities at your own pace. Choose from our wide range of well-maintained vehicles driven by experienced, professional drivers.'}
                                </p>

                                <div className="mt-auto pt-2">
                                    <Link 
                                        to="/contact" 
                                        state={{ enquiry: { service: "Local Rental Cabs" } }}
                                        className="th-btn style4 w-100 justify-content-center"
                                        style={{ padding: '9px 18px', fontSize: '12.5px' }}
                                    >
                                        Enquire Local Taxi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. AIRPORT TRANSFERS (Airport Taxi) */}
                    <div className="col-lg-4 col-md-6" style={!airport ? { display: 'none' } : undefined}>
                        <div className="sv-standard-card">
                            <div className="sv-img-holder">
                                <Link to="/contact" state={{ enquiry: { service: "Airport Transfers" } }}>
                                    <img src={airport?.image || '/assets/img/cabs/svc-airport.jpg'} alt={airport?.alt || airport?.title || 'Airport Transfers'} />
                                </Link>
                                <span className="sv-badge-tag" style={{ background: '#0284c7' }}>{airport?.tag || 'Punctual Transfers'}</span>
                            </div>

                            <div className="sv-card-content">
                                <div className="sv-micro-strip" style={{ color: '#0284c7', background: 'rgba(2, 132, 199, 0.09)' }}>
                                    <i className="fa-solid fa-shield-halved me-1"></i> Flight Delay Guarantee • 24/7 Desk
                                </div>

                                <h4 className="sv-card-title">
                                    <Link to="/contact" state={{ enquiry: { service: "Airport Transfers" } }}>
                                        {airport?.title || 'AIRPORT TRANSFERS'}
                                    </Link>
                                </h4>

                                <p className="sv-card-desc">
                                    {airport?.description || airport?.text || 'Get premium, on-time airport transfer services with zero delays. Easily book a drop taxi to major airports in Chennai, Coimbatore, and Bangalore with our dedicated 24/7 customer booking support.'}
                                </p>

                                <div className="mt-auto pt-2">
                                    <Link 
                                        to="/contact" 
                                        state={{ enquiry: { service: "Airport Transfers" } }}
                                        className="th-btn style4 w-100 justify-content-center"
                                        style={{ padding: '9px 18px', fontSize: '12.5px' }}
                                    >
                                        Enquire Airport Cab
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 3: Corporate Taxi Services (Full-width Executive Suite Banner) */}
                <div className="row" style={!corporate ? { display: 'none' } : undefined}>
                    <div className="col-12">
                        <div className="sv-corporate-card p-4 p-lg-5">
                            <div className="row align-items-center g-4">
                                <div className="col-lg-8">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span 
                                            style={{ 
                                                fontSize: '11px', 
                                                fontWeight: '700', 
                                                textTransform: 'uppercase', 
                                                letterSpacing: '0.6px',
                                                background: 'rgba(56, 189, 248, 0.2)', 
                                                color: '#38bdf8',
                                                padding: '4px 12px',
                                                borderRadius: '20px'
                                            }}
                                        >
                                            <i className="fa-solid fa-briefcase me-1"></i> Executive &amp; Enterprise Fleet
                                        </span>
                                        <span className="text-white-50" style={{ fontSize: '12px' }}>
                                            • Monthly GST Billing
                                        </span>
                                    </div>

                                    <h3 className="text-white mb-2" style={{ fontSize: '24px', fontWeight: '700' }}>
                                        {corporate?.title || 'Corporate Taxi Services & Business Travel'}
                                    </h3>
                                    <p className="text-white-50 mb-4" style={{ fontSize: '14px', lineHeight: '1.6', maxWidth: '720px' }}>
                                        {corporate?.description || corporate?.text || 'Reliable chauffeur solutions for visiting clients, daily employee transport, executive airport transfers, and corporate event logistics with transparent consolidated invoicing.'}
                                    </p>

                                    <div className="d-flex flex-wrap gap-2">
                                        <span className="sv-corp-perk">
                                            <i className="fa-solid fa-file-invoice-dollar"></i> Monthly GST Invoicing
                                        </span>
                                        <span className="sv-corp-perk">
                                            <i className="fa-solid fa-user-tie"></i> Uniformed Professional Chauffeurs
                                        </span>
                                        <span className="sv-corp-perk">
                                            <i className="fa-solid fa-shield-halved"></i> Priority Fleet Allocation
                                        </span>
                                        <span className="sv-corp-perk">
                                            <i className="fa-solid fa-car-side"></i> Sedans, Innova &amp; Travellers
                                        </span>
                                    </div>
                                </div>

                                <div className="col-lg-4 text-lg-end">
                                    <div className="d-flex flex-column gap-2 align-items-lg-end">
                                        <Link 
                                            to="/contact" 
                                            state={{ enquiry: { service: "Corporate Taxi Services" } }}
                                            className="th-btn style1 text-center justify-content-center"
                                            style={{ minWidth: '220px', padding: '12px 24px', fontSize: '13.5px' }}
                                        >
                                            Request Corporate Tariff
                                        </Link>
                                        <a 
                                            href={waHref("Hello Super Cabs, I would like to enquire about Corporate Taxi and enterprise billing.")}
                                            target={siteConfig.whatsapp ? "_blank" : undefined}
                                            rel="noopener noreferrer"
                                            className="th-btn style4 text-center justify-content-center"
                                            style={{ 
                                                minWidth: '220px', 
                                                padding: '11px 24px', 
                                                fontSize: '13px', 
                                                background: 'rgba(255,255,255,0.08)', 
                                                color: '#ffffff',
                                                borderColor: 'rgba(255,255,255,0.18)' 
                                            }}
                                        >
                                            <i className="fab fa-whatsapp me-2"></i> Chat with Corporate Desk
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Services Dynamic Grid */}
                {otherServices.length > 0 && (
                    <div className="row gy-4 mt-2 mb-4">
                        {otherServices.map((svc) => (
                            <div key={svc.slug || svc.id} className="col-lg-4 col-md-6">
                                <ServiceCard 
                                    slug={svc.slug}
                                    title={svc.title}
                                    text={svc.description || svc.text}
                                    image={svc.image}
                                    tag={svc.tag}
                                    icon={svc.icon}
                                    features={svc.features}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ServiceInner;
