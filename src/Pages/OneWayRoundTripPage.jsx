import React from 'react';
import { Link } from 'react-router-dom';
import HeaderOne from '../Components/Header/HeaderOne';
import FooterFour from '../Components/Footer/FooterFour';
import ScrollToTop from '../Components/ScrollToTop';
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb';
import DropTaxiGrid from '../Components/Services/DropTaxiGrid';
import siteConfig, { telHref, waHref } from '../Components/data/siteConfig';

function OneWayRoundTripPage() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title="One-Way Drop Taxi" 
                subtitle="Pay Strictly For Single Direction Travel • Zero Return Fare Across All Tamil Nadu & South India Districts"
                bgImage="/assets/img/cabs/svc-oneway.jpg" 
            />

            {/* Value Proposition Highlights Banner */}
            <section className="py-4 bg-white" style={{ borderBottom: '1px solid #e2e8f0' }}>
                <div className="container">
                    <div className="row g-3 text-center">
                        <div className="col-md-3 col-6">
                            <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <i className="fa-solid fa-arrow-right-long text-theme mb-2" style={{ fontSize: '22px' }}></i>
                                <h6 className="mb-1" style={{ fontSize: '14px', fontWeight: '700' }}>Zero Return Fare</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>Pay only for 1-way drop km</p>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <i className="fa-solid fa-location-dot text-theme mb-2" style={{ fontSize: '22px' }}></i>
                                <h6 className="mb-1" style={{ fontSize: '14px', fontWeight: '700' }}>Doorstep Pickup</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>Direct pickup &amp; drop anywhere</p>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <i className="fa-solid fa-calculator text-theme mb-2" style={{ fontSize: '22px' }}></i>
                                <h6 className="mb-1" style={{ fontSize: '14px', fontWeight: '700' }}>Transparent Km Rate</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>Clear pricing before booking</p>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <i className="fa-solid fa-clock-rotate-left text-theme mb-2" style={{ fontSize: '22px' }}></i>
                                <h6 className="mb-1" style={{ fontSize: '14px', fontWeight: '700' }}>24/7 Cab Dispatch</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>Instant confirmation day or night</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Drop Taxi Grid matching user's image */}
            <DropTaxiGrid />

            {/* Bottom Support Banner */}
            <section 
                className="py-5" 
                style={{ 
                    background: 'linear-gradient(135deg, #0b2229 0%, #16363f 100%)', 
                    color: '#ffffff' 
                }}
            >
                <div className="container text-center">
                    <h3 className="text-white mb-2">Need a Drop Taxi to Any Other Town or Village?</h3>
                    <p className="text-white-50 mx-auto mb-4" style={{ maxWidth: '620px', fontSize: '14px' }}>
                        Super Cabs operates across all taluks and districts in Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh. Call or WhatsApp our 24/7 desk for instant booking.
                    </p>
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                        <Link 
                            to="/contact" 
                            state={{ enquiry: { service: "One-Way Drop Taxi" } }} 
                            className="th-btn style1"
                        >
                            Book Online Now
                        </Link>
                        <a 
                            href={telHref()} 
                            className="th-btn style4"
                        >
                            <i className="fa-solid fa-phone me-2"></i> {siteConfig.phone}
                        </a>
                        <a 
                            href={waHref("Hello Super Cabs, I would like to book a One-Way Drop Taxi.")} 
                            target={siteConfig.whatsapp ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="th-btn style1"
                            style={{ background: '#25D366', borderColor: '#25D366' }}
                        >
                            <i className="fab fa-whatsapp me-2"></i> WhatsApp Booking
                        </a>
                    </div>
                </div>
            </section>

            <FooterFour />
            <ScrollToTop />
        </>
    );
}

export default OneWayRoundTripPage;
