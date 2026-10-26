import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig, { waHref } from '../data/siteConfig';
import { useBookingModal } from '../Booking/BookingModalContext';

const styles = `
.vc-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(11, 34, 41, 0.05);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    position: relative;
}
.vc-card:hover {
    transform: translateY(-6px);
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 20px 45px rgba(28, 168, 203, 0.16);
}
.vc-img-wrap {
    height: 220px;
    position: relative;
    overflow: hidden;
    background: #0b2229;
}
.vc-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}
.vc-card:hover .vc-img {
    transform: scale(1.06);
}
.vc-badge-seats {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(6px);
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 13px;
    border-radius: 20px;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}
.vc-body {
    padding: 22px 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.vc-title {
    font-size: 20px;
    font-weight: 800;
    margin: 0 0 5px;
    color: #0b2229;
    line-height: 1.3;
}
.vc-title a {
    color: #0b2229;
    text-decoration: none;
    transition: color 0.2s ease;
}
.vc-title a:hover {
    color: var(--theme-color, #1ca8cb);
}
.vc-models {
    font-size: 13px;
    color: #64748b;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
}
.vc-seating-bar {
    margin-top: 10px;
}
.vc-seating-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(28, 168, 203, 0.08);
    border: 1px solid rgba(28, 168, 203, 0.2);
    color: #0e4e5e;
    font-size: 12.5px;
    padding: 6px 12px;
    border-radius: 8px;
}
.vc-features-box {
    margin-top: 10px;
    flex-grow: 1;
}
.vc-features-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748b;
    margin: 0 0 8px;
}
.vc-features-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.vc-features-list li {
    font-size: 13px;
    color: #334155;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 7px;
    line-height: 1.45;
}
.vc-features-list li:last-child {
    margin-bottom: 0;
}
.vc-features-list li i {
    margin-top: 2px;
    flex-shrink: 0;
}
.vc-actions {
    margin-top: 20px;
    display: flex;
    gap: 8px;
}
`;

function VehicleCard({ vehicle }) {
    const { 
        slug, 
        name, 
        image, 
        altText,
        models, 
        seats, 
        features 
    } = vehicle;

    const imgSrc = image || `/assets/img/cabs/${slug}.jpg`;
    const waLink = waHref(`Hello Super Cabs, I would like to book / enquire about the ${name} (${seats}). Please share availability and details.`);
    const { openBookingModal } = useBookingModal();

    return (
        <div className="vc-card">
            <style>{styles}</style>
            
            {/* 1. Vehicle Image & Seating Capacity Badge */}
            <div className="vc-img-wrap">
                <img 
                    src={imgSrc} 
                    alt={altText || `${name} - Super Cabs`} 
                    className="vc-img" 
                    loading="lazy"
                />
                <span className="vc-badge-seats" title="Seating Capacity">
                    {seats}
                </span>
            </div>

            {/* 2. Vehicle Body */}
            <div className="vc-body">
                {/* Available Vehicle Type & Models */}
                <div className="mb-2">
                    <h3 className="vc-title">
                        <Link to="/contact" state={{ enquiry: { vehicle: name, seats: seats } }}>
                            {name}
                        </Link>
                    </h3>
                    {models && (
                        <p className="vc-models">
                            <span>{models}</span>
                        </p>
                    )}
                </div>

                {/* Seating Capacity Pill */}
                <div className="vc-seating-bar mb-3">
                    <span className="vc-seating-pill">
                        <span><strong>Seating Capacity:</strong> {seats}</span>
                    </span>
                </div>

                {/* Vehicle Features */}
                <div className="vc-features-box mb-3">
                    <h6 className="vc-features-title">Vehicle Features</h6>
                    <ul className="vc-features-list">
                        {(features || []).map((f, idx) => (
                            <li key={idx}>
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Booking / Enquiry CTA */}
                <div className="vc-actions">
                    <button 
                        type="button"
                        onClick={() => openBookingModal({ vehicle: name })} 
                        className="th-btn style4 flex-grow-1 text-center justify-content-center"
                        style={{ 
                            padding: '11px 16px', 
                            fontSize: '13.5px', 
                            border: 'none', 
                            cursor: 'pointer',
                            background: 'var(--theme-color, #1ca8cb)',
                            color: '#ffffff'
                        }}
                    >
                        Book Now <i className="fa-solid fa-arrow-right ms-1"></i>
                    </button>
                    <a 
                        href={waLink} 
                        target={siteConfig.whatsapp ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="th-btn style1 text-center justify-content-center"
                        style={{ padding: '11px 16px', fontSize: '13.5px', background: '#25D366', borderColor: '#25D366' }}
                        title="Enquire on WhatsApp"
                    >
                        <i className="fab fa-whatsapp me-1"></i> Enquiry
                    </a>
                </div>
            </div>
        </div>
    );
}

export default VehicleCard;
