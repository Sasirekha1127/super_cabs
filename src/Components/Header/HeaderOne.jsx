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
                        <div className="row justify-content-center justify-content-xl-between align-items-center">
                            <div className="col-auto d-none d-md-block">
                                <div className="header-links">
                                    <ul>
                                        <li className="d-none d-xl-inline-block">
                                            <i className="fa-sharp fa-regular  fa-location-dot" />
                                            <span>{siteConfig.address}</span>
                                        </li>
                                        <li className="d-none d-xl-inline-block">
                                            <i className="fa-regular fa-clock" />
                                            <span>{siteConfig.hours}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-auto">
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
