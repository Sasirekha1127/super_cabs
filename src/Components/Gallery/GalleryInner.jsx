import React, { useState } from 'react';
import Modal from './Modal';
import { galleryItems } from '../data/cabsData';
import usePublicContent from '../../services/usePublicContent';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import { Link } from 'react-router-dom';

const categories = [
    { key: "all", label: "All Photos" },
    { key: "vehicles", label: "Taxi & Vehicles" },
    { key: "tours", label: "Tour & Travel" },
    { key: "service", label: "Customer & Service" },
];

const styles = `
.gl-filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid #e2e8f0;
    background: #ffffff;
    color: #475569;
    cursor: pointer;
    transition: all 0.25s ease;
}
.gl-filter-btn:hover {
    border-color: var(--theme-color, #1ca8cb);
    color: var(--theme-color, #1ca8cb);
}
.gl-filter-btn.active {
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 6px 18px rgba(28, 168, 203, 0.25);
}
.gl-count-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.08);
}
.gl-filter-btn.active .gl-count-badge {
    background: rgba(255, 255, 255, 0.25);
    color: #ffffff;
}

/* Card */
.gl-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    background: #0b2229;
    height: 315px;
    box-shadow: 0 10px 30px rgba(11, 34, 41, 0.08);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.gl-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(11, 34, 41, 0.16);
}
.gl-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}
.gl-card:hover .gl-img {
    transform: scale(1.08);
}
.gl-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(11, 34, 41, 0.15) 0%, rgba(11, 34, 41, 0.5) 45%, rgba(11, 34, 41, 0.94) 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px;
    color: #ffffff;
    transition: background 0.3s ease;
}
.gl-card:hover .gl-overlay {
    background: linear-gradient(180deg, rgba(11, 34, 41, 0.25) 0%, rgba(11, 34, 41, 0.6) 45%, rgba(11, 34, 41, 0.98) 100%);
}
.gl-tag {
    align-self: flex-start;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
    padding: 5px 13px;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
}
.gl-zoom-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    color: #0b2229;
    display: grid;
    place-items: center;
    font-size: 14px;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: transform 0.2s ease, background 0.2s ease;
}
.gl-zoom-btn:hover {
    background: #ffffff;
    transform: scale(1.1);
    color: var(--theme-color, #1ca8cb);
}
.gl-title {
    font-size: 17.5px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 4px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.4);
}
.gl-subtitle {
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.88);
    margin: 0 0 14px;
    line-height: 1.45;
    text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}
.gl-bottom-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
.gl-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 7px 15px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    background: var(--theme-color, #1ca8cb);
    color: #ffffff !important;
    border: none;
    box-shadow: 0 4px 12px rgba(28, 168, 203, 0.45);
    transition: transform 0.2s ease, background 0.2s ease;
}
.gl-btn-primary:hover {
    background: #148ea8;
    color: #ffffff !important;
    transform: translateY(-2px);
}
.gl-btn-wa {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 7px 13px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    background: #25D366;
    color: #ffffff !important;
    border: none;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
    transition: transform 0.2s ease, background 0.2s ease;
}
.gl-btn-wa:hover {
    background: #1ea952;
    color: #ffffff !important;
    transform: translateY(-2px);
}
`;

function GalleryInner() {
    const dynamicGallery = usePublicContent('gallery', galleryItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState('all');
    const galleryCategories = [...categories, ...[...new Set(dynamicGallery.map(item => item.cat).filter(Boolean))]
        .filter(key => !categories.some(category => category.key === key))
        .map(key => ({ key, label: key.replace(/[-_]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase()) }))];

    const items = active === 'all' ? dynamicGallery : dynamicGallery.filter((g) => g.cat === active);

    const openModalAtIndex = (idx, event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        setCurrentIndex(idx);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const getCount = (key) => {
        if (key === 'all') return dynamicGallery.length;
        return dynamicGallery.filter((g) => g.cat === key).length;
    };

    const galleryHighlights = [
        { icon: "fa-taxi", title: "Modern Taxi Fleet", text: "Impeccably maintained hatchbacks, sedans, SUVs & tempo travellers" },
        { icon: "fa-mountain-sun", title: "Tour Destinations", text: "Scenic hill stations, sacred temple circuits, and coastal getaways" },
        { icon: "fa-user-tie", title: "Professional Chauffeurs", text: "Doorstep pickup, luggage assistance, and respectful drivers" },
        { icon: "fa-shield-heart", title: "100% Sanitised Cabs", text: "Clean interiors, chilled AC cabins, and reliable journeys" },
    ];

    return (
        <section className="space">
            <style>{styles}</style>
            <div className="container">
                {/* Header */}
                <div className="title-area text-center mb-4">
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
                        <i className="fa-solid fa-camera"></i> Photo Showcase
                    </span>
                    <h2 className="sec-title mb-2">Super Cabs Visual Gallery</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Browse our vehicle fleet, memorable customer journeys, and popular outstation tour destinations across Tamil Nadu and South India.
                    </p>
                </div>

                {/* Highlights Strip */}
                <div className="row g-3 mb-5">
                    {galleryHighlights.map((hl, i) => (
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
                                    style={{ width: '42px', height: '42px', background: 'rgba(28, 168, 203, 0.12)', color: 'var(--theme-color, #1ca8cb)' }}
                                >
                                    <i className={`fa-solid ${hl.icon}`} style={{ fontSize: '17px' }}></i>
                                </div>
                                <h6 className="mb-1" style={{ fontSize: '14.5px', fontWeight: '700' }}>{hl.title}</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '12px', lineHeight: '1.45' }}>{hl.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Category Filter Tabs */}
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                    {galleryCategories.map((c) => (
                        <button
                            key={c.key}
                            type="button"
                            className={`gl-filter-btn ${active === c.key ? 'active' : ''}`}
                            onClick={() => {
                                setActive(c.key);
                                setCurrentIndex(0);
                            }}
                        >
                            <span>{c.label}</span>
                            <span className="gl-count-badge">{getCount(c.key)}</span>
                        </button>
                    ))}
                </div>

                {/* Gallery Cards Grid */}
                <div className="row gy-4">
                    {items.map((g, index) => (
                        <div key={g.id || g.src} className="col-lg-4 col-md-6">
                            <div 
                                className="gl-card" 
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => openModalAtIndex(index, e)}
                            >
                                <img src={g.src} alt={g.alt || g.title || "Super Cabs gallery"} className="gl-img" />
                                <div className="gl-overlay">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <span className="gl-tag">{g.tag}</span>
                                        <button
                                            type="button"
                                            className="gl-zoom-btn"
                                            onClick={(e) => openModalAtIndex(index, e)}
                                            title="View Full Image & Details"
                                        >
                                            <i className="fa-solid fa-expand"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="gl-title">{g.title}</h4>
                                        <p className="gl-subtitle">{g.subtitle}</p>
                                        <div className="gl-bottom-actions" onClick={(e) => e.stopPropagation()}>
                                            <Link 
                                                to="/contact" 
                                                state={{ enquiry: { message: `Enquiry from gallery: ${g.title}` } }}
                                                className="gl-btn-primary"
                                            >
                                                Book / Enquire
                                            </Link>
                                            <a 
                                                href={waHref(`Hello Super Cabs, I saw the ${g.title} in your gallery and would like to enquire.`)}
                                                target={siteConfig.whatsapp ? "_blank" : undefined}
                                                rel="noopener noreferrer"
                                                className="gl-btn-wa"
                                                title="WhatsApp Enquiry"
                                            >
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Assistance Banner */}
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
                            <h4 className="text-white mb-1">Impressed by our fleet and customer service?</h4>
                            <p className="mb-0 text-white-50" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                                Book your ride in seconds. 24/7 airport transfers, outstation drops, and custom tour packages with verified chauffeurs.
                            </p>
                        </div>
                        <div className="col-lg-4 text-center text-lg-end">
                            <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
                                <Link 
                                    to={telHref()} 
                                    className="th-btn style4"
                                    style={{ padding: '10px 18px', fontSize: '13px' }}
                                >
                                    <i className="fa-solid fa-phone me-2"></i> Call Now
                                </Link>
                                <a 
                                    href={waHref("Hello Super Cabs, I would like to book a cab after viewing your gallery.")}
                                    target={siteConfig.whatsapp ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="th-btn style1"
                                    style={{ background: '#25D366', borderColor: '#25D366', padding: '10px 18px', fontSize: '13px' }}
                                >
                                    <i className="fab fa-whatsapp me-2"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Lightbox Modal */}
            <Modal 
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                items={items}
                currentIndex={currentIndex}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </section>
    );
}

export default GalleryInner;
