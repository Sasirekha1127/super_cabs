import React from 'react'
import { Link } from 'react-router-dom'
import { whyChoose } from '../data/cabsData'
import usePublicContent from '../../services/usePublicContent';

function WhyChooseUs() {
    const managedHighlights = usePublicContent('highlight', whyChoose).map(item => ({ ...item, title: item.title || item.heading }));
    return (
        <section className="why-choose-area position-relative overflow-hidden space" id="why-sec">
            <div className="container shape-mockup-wrap">
                <div className="title-area text-center mb-50">
                    <span className="sub-title style1">Why Choose Us</span>
                    <h2 className="sec-title heading">Why Choose Super Cabs</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Safe rides, punctual pickups, transparent pricing and 24/7 dedicated customer support for all your travel needs.
                    </p>
                </div>

                <div className="row gy-4 justify-content-center">
                    {managedHighlights.map((w, index) => (
                        <div className="col-xl-3 col-lg-6 col-md-6 col-12" key={w.title}>
                            <div className="why-choose-card has-thumb h-100">
                                {w.image && (
                                    <div className="why-choose-thumb">
                                        <img src={w.image} alt={w.title} />
                                        <div className="why-choose-thumb-overlay"></div>
                                        {w.tag && <span className="why-choose-tag">{w.tag}</span>}
                                        <span className="why-choose-badge">0{index + 1}</span>
                                    </div>
                                )}
                                <div className="why-choose-body">
                                    <h3 className="box-title">{w.title}</h3>
                                    <p className="why-choose-text">{w.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-50">
                    <Link to="/contact" className="th-btn style1 th-icon">
                        Book Your Ride
                    </Link>
                </div>

                {/* Decorative background shapes */}
                <div
                    className="shape-mockup shape1 d-none d-xxl-block"
                    style={{ top: '10%', left: '-6%', opacity: 0.5 }}
                >
                    <img src="/assets/img/shape/shape_1.png" alt="shape" />
                </div>
                <div
                    className="shape-mockup jump d-none d-xxl-block"
                    style={{ top: '18%', right: '-6%', opacity: 0.5 }}
                >
                    <img src="/assets/img/shape/shape_2_2.png" alt="shape" />
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
