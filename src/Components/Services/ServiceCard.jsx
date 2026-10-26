import React from 'react'
import { Link } from 'react-router-dom';
import { useBookingModal } from '../Booking/BookingModalContext';

function ServiceCard({ slug, title, text, image, tag, icon, features }) {
    const { openBookingModal } = useBookingModal();
    const imgSrc = image || `/assets/img/cabs/${slug}.jpg`;

    return (
        <div className="destination-item th-ani h-100 d-flex flex-column">
            <div className="destination-item_img global-img position-relative" style={{ height: '240px', overflow: 'hidden' }}>
                <img src={imgSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {tag && (
                    <span 
                        className="service-tag-badge"
                        style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            background: 'var(--theme-color, #1ca8cb)',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '700',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            zIndex: 2,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                        }}
                    >
                        {tag}
                    </span>
                )}
            </div>
            <div className="destination-content d-flex flex-column flex-grow-1">
                <h3 className="box-title">
                    <Link to="/contact" state={{ enquiry: { service: title } }}>{title}</Link>
                </h3>
                <p className="destination-text">{text}</p>
                {features && features.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 my-3">
                        {features.map((f, idx) => (
                            <span 
                                key={idx} 
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    color: '#244b55',
                                    background: 'rgba(28, 168, 203, 0.1)',
                                    padding: '3px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                {f}
                            </span>
                        ))}
                    </div>
                )}
                <div className="mt-auto pt-2">
                    <button 
                        type="button"
                        onClick={() => openBookingModal({
                            tab: title.toLowerCase().includes('airport') ? 'airport' : title.toLowerCase().includes('rental') || title.toLowerCase().includes('local') ? 'rental' : 'outstation'
                        })} 
                        className="th-btn style4 th-icon w-100 justify-content-center"
                        style={{ border: 'none', cursor: 'pointer' }}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
