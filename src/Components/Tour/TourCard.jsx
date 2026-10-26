import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { waHref } from '../data/siteConfig';

function TourCard({ tour }) {
    const { id, title, duration, places, text, highlights, tag, image } = tour;
    const imgSrc = image || `/assets/img/cabs/tour-${id}.jpg`;
    const waLink = waHref(`Hello Super Cabs, I would like to book / enquire about the ${title} (${duration}).`);

    const targetUrl = `/tours/${tour.slug || tour.id}`;

    return (
        <div 
            className="tour-box th-ani h-100 d-flex flex-column" 
            style={{ 
                borderRadius: '18px', 
                overflow: 'hidden', 
                border: '1px solid #eef2f5',
                background: '#ffffff',
                boxShadow: '0 10px 30px rgba(11, 34, 41, 0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
            }}
        >
            {/* Image Header with Badges */}
            <div className="tour-box_img global-img position-relative" style={{ height: '225px', overflow: 'hidden' }}>
                <Link to={targetUrl} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <img 
                        src={imgSrc} 
                        alt={tour.alt || tour.seo?.altText || title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    />
                </Link>
                {tag && (
                    <span 
                        style={{
                            position: 'absolute',
                            top: '14px',
                            left: '14px',
                            background: 'var(--theme-color, #1ca8cb)',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            zIndex: 2,
                            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                            pointerEvents: 'none'
                        }}
                    >
                        {tag}
                    </span>
                )}
                {duration && (
                    <span 
                        style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            background: 'rgba(15, 23, 42, 0.78)',
                            backdropFilter: 'blur(4px)',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '4px 11px',
                            borderRadius: '20px',
                            zIndex: 2,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            pointerEvents: 'none'
                        }}
                    >
                        <i className="fa-regular fa-clock" style={{ color: 'var(--theme-color, #1ca8cb)' }}></i>
                        {duration}
                    </span>
                )}
            </div>

            {/* Tour Content */}
            <div className="tour-content d-flex flex-column flex-grow-1 p-4">
                <h3 className="box-title mb-2" style={{ fontSize: '19px', lineHeight: '1.3' }}>
                    <Link to={targetUrl}>
                        {title}
                    </Link>
                </h3>

                {/* Places Covered Box */}
                {places && (
                    <div 
                        className="mb-3 p-2 rounded-3"
                        style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            fontSize: '12.5px',
                            lineHeight: '1.5',
                            color: '#334155'
                        }}
                    >
                        <div className="d-flex align-items-start gap-2">
                            <i className="fa-solid fa-location-dot text-theme mt-1 flex-shrink-0" style={{ fontSize: '13px' }}></i>
                            <div>
                                <strong className="text-dark">Places Covered:</strong> {places}
                            </div>
                        </div>
                    </div>
                )}

                {/* Description */}
                <p className="mb-3 text-muted" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    {text}
                </p>

                {/* Highlights */}
                {highlights && highlights.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        {highlights.map((h, idx) => (
                            <span 
                                key={idx}
                                style={{
                                    fontSize: '11.5px',
                                    fontWeight: '500',
                                    color: '#164e63',
                                    background: 'rgba(28, 168, 203, 0.08)',
                                    padding: '3px 9px',
                                    borderRadius: '12px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                {h}
                            </span>
                        ))}
                    </div>
                )}

                {/* Actions Footer */}
                <div className="mt-auto pt-3 border-top d-flex gap-2 align-items-center">
                    <Link 
                        to={targetUrl} 
                        className="th-btn style4 flex-grow-1 text-center justify-content-center"
                        style={{ padding: '10px 16px', fontSize: '13px', gap: '6px', display: 'inline-flex', alignItems: 'center' }}
                    >
                        <span>View Details</span>
                        <i className="fa-solid fa-arrow-right" style={{ fontSize: '12px' }}></i>
                    </Link>
                    <a 
                        href={waLink} 
                        target={siteConfig.whatsapp ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="th-btn style1 text-center justify-content-center"
                        style={{ padding: '10px 14px', fontSize: '13px', background: '#25D366', borderColor: '#25D366' }}
                        title="Enquire on WhatsApp"
                    >
                        <i className="fab fa-whatsapp" style={{ fontSize: '16px' }}></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TourCard;
