import React from 'react';
import TourCard from './TourCard';
import { tours } from '../data/cabsData';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import usePublicContent from '../../services/usePublicContent';

function TourInner() {
    const dynamicTours = usePublicContent('tour', tours);
    const tourBenefits = [
        { icon: "fa-car-side", title: "Dedicated Private Cab", text: "Vehicle stays exclusively with you throughout the journey" },
        { icon: "fa-camera-retro", title: "Flexible Sightseeing", text: "Stop whenever you wish for photos, viewpoints & restaurants" },
        { icon: "fa-shield-halved", title: "Verified Highway Drivers", text: "Ghat-road trained, polite & route-experienced chauffeurs" },
        { icon: "fa-file-invoice-dollar", title: "Transparent Pricing", text: "Clear upfront quotes with zero surprise surcharges" },
    ];

    return (
        <section className="space">
            <div className="container shape-mockup-wrap">
                {/* Header Section */}
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
                        <i className="fa-solid fa-map-location-dot"></i> Curated Road Trips &amp; Tours
                    </span>
                    <h2 className="sec-title mb-2">Explore Our Tour Packages</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '680px' }}>
                        Private chauffeur-driven tour packages for families, couples, and groups. Explore hill stations, coastal getaways, sacred temple circuits, and nature retreats in air-conditioned comfort.
                    </p>
                </div>

                {/* Tour Assurances Strip */}
                <div className="row g-3 mb-5">
                    {tourBenefits.map((b, i) => (
                        <div key={i} className="col-lg-3 col-sm-6">
                            <div 
                                className="p-3 text-center h-100 rounded-3"
                                style={{ 
                                    background: '#f8fafc', 
                                    border: '1px solid #e2e8f0',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }}
                            >
                                <div 
                                    className="d-inline-flex align-items-center justify-content-center mb-2 rounded-circle"
                                    style={{ width: '44px', height: '44px', background: 'rgba(28, 168, 203, 0.12)', color: 'var(--theme-color, #1ca8cb)' }}
                                >
                                    <i className={`fa-solid ${b.icon}`} style={{ fontSize: '18px' }}></i>
                                </div>
                                <h6 className="mb-1" style={{ fontSize: '14.5px', fontWeight: '700' }}>{b.title}</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '12px', lineHeight: '1.45' }}>{b.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tour Cards Grid */}
                <div className="row gy-24 gx-24">
                    {dynamicTours.map((t) => (
                        <div key={t.id} className="col-xl-4 col-md-6">
                            <TourCard tour={t} />
                        </div>
                    ))}
                </div>

                {/* Custom Tour Banner */}
                <div 
                    className="mt-5 p-4 rounded-4"
                    style={{
                        background: 'linear-gradient(135deg, #0b2229 0%, #16363f 100%)',
                        color: '#ffffff',
                        boxShadow: '0 12px 36px rgba(0,0,0,0.1)'
                    }}
                >
                    <div className="row align-items-center">
                        <div className="col-lg-8 text-center text-lg-start mb-3 mb-lg-0">
                            <span 
                                style={{
                                    display: 'inline-block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.8px',
                                    background: 'rgba(28, 168, 203, 0.2)',
                                    color: '#5ad4f5',
                                    border: '1px solid rgba(28, 168, 203, 0.35)',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    marginBottom: '8px'
                                }}
                            >
                                Custom Itineraries
                            </span>
                            <h4 className="text-white mb-1">Want a custom tour planned for your family?</h4>
                            <p className="mb-0 text-white-50" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                                Tell us the places you want to visit, travel dates, and passenger count. We will curate the best route, assign a dedicated vehicle, and provide an all-inclusive transparent quote.
                            </p>
                        </div>
                        <div className="col-lg-4 text-center text-lg-end">
                            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-end">
                                <a 
                                    href={telHref()} 
                                    className="th-btn"
                                    style={{ 
                                        background: 'var(--theme-color, #1ca8cb)', 
                                        color: '#ffffff', 
                                        borderColor: 'transparent',
                                        padding: '10px 20px', 
                                        fontSize: '13px',
                                        borderRadius: '30px',
                                        boxShadow: '0 4px 14px rgba(28, 168, 203, 0.4)'
                                    }}
                                >
                                    <i className="fa-solid fa-phone me-2"></i> Call: 9787541723
                                </a>
                                <a 
                                    href={waHref()}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1"
                                    style={{ background: '#25D366', borderColor: '#25D366', padding: '10px 18px', fontSize: '13px' }}
                                    title="Send your travel requirements on WhatsApp"
                                >
                                    <i className="fab fa-whatsapp me-2"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TourInner;
