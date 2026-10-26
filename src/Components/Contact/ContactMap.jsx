import React from 'react';
import siteConfig from '../data/siteConfig';

const styles = `
.spc-map-section {
    padding: 70px 0 0;
    background: #f8fafc;
}
.spc-map-container {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 45px rgba(11, 34, 41, 0.08);
    border: 1px solid #e2e8f0;
    background: #ffffff;
}
.spc-map-iframe {
    width: 100%;
    height: 480px;
    border: 0;
    display: block;
}
.spc-map-overlay-card {
    position: absolute;
    bottom: 24px;
    left: 24px;
    background: rgba(11, 34, 41, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ffffff;
    padding: 18px 22px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.12);
    max-width: 380px;
}
.spc-map-overlay-title {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.spc-map-overlay-title i {
    color: var(--theme-color, #1ca8cb);
}
.spc-map-overlay-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 10px;
    line-height: 1.45;
}
.spc-map-dir-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--theme-color, #1ca8cb);
    text-decoration: none;
    transition: color 0.2s ease;
}
.spc-map-dir-btn:hover {
    color: #ffffff;
}
@media (max-width: 768px) {
    .spc-map-iframe {
        height: 380px;
    }
    .spc-map-overlay-card {
        position: relative;
        bottom: auto;
        left: auto;
        max-width: 100%;
        border-radius: 0 0 20px 20px;
    }
}
`;

function ContactMap() {
    const src = siteConfig.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;
    const googleMapsDirUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;

    return (
        <section id="google-map" className="spc-map-section">
            <style>{styles}</style>
            <div className="container">
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
                        <i className="fa-solid fa-map-location-dot"></i> Google Map Navigation
                    </span>
                    <h2 className="sec-title mb-2">Find Our Office On Google Map</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Visit our central dispatch hub or navigate directly using Google Maps. Serving all major districts and outstation routes across Tamil Nadu.
                    </p>
                </div>

                <div className="spc-map-container mb-5">
                    <iframe
                        title="Super Cabs location map"
                        src={src}
                        className="spc-map-iframe"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="spc-map-overlay-card">
                        <h4 className="spc-map-overlay-title">
                            <i className="fa-solid fa-location-dot"></i> {siteConfig.brand} Central Office
                        </h4>
                        <p className="spc-map-overlay-text">{siteConfig.address}</p>
                        <a 
                            href={googleMapsDirUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="spc-map-dir-btn"
                        >
                            <i className="fa-solid fa-diamond-turn-right"></i> Get Driving Directions <i className="fa-solid fa-arrow-up-right-from-square ms-1" style={{ fontSize: '11px' }}></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactMap;
