import React from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from './menuItems';
import siteConfig, { telHref, waHref } from '../data/siteConfig';

import { useBookingModal } from '../Booking/BookingModalContext';

function MobileMenu({ isOpen, onClose }) {
    const { openBookingModal } = useBookingModal();

    return (
        <div className={`th-menu-wrapper onepage-nav ${isOpen ? "th-body-visible" : ""}`}
            style={{ visibility: isOpen ? "visible" : "hidden" }}>

            <div className="th-menu-area text-center">
                <button className="th-menu-toggle" onClick={onClose} aria-label="Close">
                    <i className="fal fa-times" />
                </button>

                <div className="mobile-logo">
                    <Link to="/" onClick={onClose}>
                        <img
                            className="brand-logo"
                            src="/assets/img/super-cabs-logo.png"
                            alt="Super Cabs - Best Outstation Taxi Provider"
                        />
                    </Link>
                </div>

                <div className="th-mobile-menu">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.to}><Link to={item.to} onClick={onClose}>{item.label}</Link></li>
                        ))}
                        <li><a href={telHref()} onClick={onClose}>Call Now: {siteConfig.phoneDisplay}</a></li>
                        <li><a href={waHref()} target={siteConfig.whatsapp ? "_blank" : undefined} rel="noopener noreferrer" onClick={onClose}>WhatsApp</a></li>
                    </ul>
                    <div style={{ padding: '16px 20px 0' }}>
                        <button
                            type="button"
                            onClick={() => { onClose(); openBookingModal(); }}
                            className="th-btn style3 w-100"
                            style={{ border: 'none', cursor: 'pointer', padding: '12px' }}
                        >
                            Book Now
                        </button>
                    </div>
                    <div style={{ padding: '16px 20px 10px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
                        <div style={{ fontWeight: '700', color: 'var(--theme-color, #1ca8cb)', marginBottom: '4px' }}>
                            <i className="fa-solid fa-car-side" /> Service Available:
                        </div>
                        <div style={{ fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                            * Tamilnadu &nbsp;* Karnataka &nbsp;* Pudhuchery
                        </div>
                        <div style={{ fontSize: '11px' }}>
                            <i className="fa-regular fa-location-dot" /> {siteConfig.address}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
