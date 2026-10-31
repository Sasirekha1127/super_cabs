import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import MobileMenu from './MobileMenu';
import siteConfig from '../data/siteConfig';
import { menuItems } from './menuItems';
import { useBookingModal } from '../Booking/BookingModalContext';

function HeaderOne() {
    const { openBookingModal } = useBookingModal();
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/*============================== Header Area ==============================*/}
            <header className="th-header header-layout1">
                <div className="header-top">
                    <div className="container th-container">
                        <div className="row justify-content-between align-items-center gy-2">
                            <div className="col-auto">
                                <div className="header-links">
                                    <ul className="d-flex align-items-center flex-wrap" style={{ gap: '14px', margin: 0, padding: 0, listStyle: 'none' }}>
                                        <li style={{ color: '#0f172a', fontWeight: '600' }}>
                                            <span style={{
                                                backgroundColor: 'rgba(28, 168, 203, 0.12)',
                                                color: 'var(--theme-color, #1ca8cb)',
                                                padding: '3px 9px',
                                                borderRadius: '16px',
                                                fontSize: '11.5px',
                                                fontWeight: '700',
                                                marginRight: '6px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <i className="fa-solid fa-car-side" /> Service Available :
                                            </span>
                                            <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: '700' }}>
                                                * Tamilnadu &nbsp;* Karnataka &nbsp;* Pudhuchery
                                            </span>
                                        </li>
                                        <li className="d-none d-xl-inline-flex align-items-center" style={{ fontSize: '12.5px', color: '#64748b' }}>
                                            <i className="fa-sharp fa-regular fa-location-dot" style={{ color: 'var(--theme-color, #1ca8cb)', marginRight: '6px' }} />
                                            <span>{siteConfig.address}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-auto d-none d-md-block">
                                <div className="header-right">
                                    <div className="header-social-wrap">
                                        <span className="social-title">Follow Us :</span>
                                        <div className="th-social">
                                            <a
                                                href={siteConfig.social.facebook || "https://facebook.com/"}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label="Facebook"
                                            >
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a
                                                href={siteConfig.social.instagram || "https://instagram.com/"}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label="Instagram"
                                            >
                                                <i className="fab fa-instagram" />
                                            </a>
                                            {siteConfig.social.twitter && (
                                                <a
                                                    href={siteConfig.social.twitter}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="Twitter"
                                                >
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            )}
                                            {siteConfig.social.linkedin && (
                                                <a
                                                    href={siteConfig.social.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label="LinkedIn"
                                                >
                                                    <i className="fab fa-linkedin-in" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`sticky-wrapper ${isSticky ? "sticky" : ""}`}>
                    {/* Main Menu Area */}
                    <div className="menu-area">
                        <div className="container th-container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto">
                                    <div className="header-logo">
                                        <Link to="/">
                                            <img
                                                className="brand-logo"
                                                src="/assets/img/super-cabs-logo.png"
                                                alt="Super Cabs - Best Outstation Taxi Provider"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-auto me-xl-auto">
                                    <nav className="main-menu d-none d-xl-inline-block">
                                        <ul>
                                            {menuItems.map((item) => (
                                                <li key={item.to}>
                                                    <NavLink to={item.to} end className={({ isActive }) => (isActive ? "active" : "")}>
                                                        {item.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                    <button
                                        type="button"
                                        className="th-menu-toggle d-block d-xl-none"
                                        onClick={() => setIsMobileMenuOpen(true)}
                                    >
                                        <i className="far fa-bars" />
                                    </button>
                                </div>
                                <div className="col-auto d-none d-xl-block">
                                    <div className="header-button">
                                        <button
                                            type="button"
                                            onClick={() => openBookingModal()}
                                            className="th-btn style3 th-icon"
                                            style={{ border: 'none', cursor: 'pointer' }}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="logo-bg bg-mask"
                            style={{
                                WebkitMaskImage: "url(/assets/img/logo_bg_mask.png)",
                                maskImage: "url(/assets/img/logo_bg_mask.png)"
                            }} />
                    </div>
                </div>
            </header>
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>

    )
}

export default HeaderOne
