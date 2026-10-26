import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeaderOne from '../Components/Header/HeaderOne';
import FooterFour from '../Components/Footer/FooterFour';
import ScrollToTop from '../Components/ScrollToTop';
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb';
import { dropTaxiCities, getCityAbout, getCityRoutes } from '../Components/data/dropTaxiData';
import siteConfig, { telHref, waHref } from '../Components/data/siteConfig';

const styles = `
.dtd-section {
    background: #ffffff;
    padding: 60px 0 80px;
}
.dtd-block {
    margin-bottom: 42px;
}
.dtd-title {
    font-size: 21px;
    font-weight: 700;
    color: #0b2229;
    margin: 0 0 18px;
    letter-spacing: -0.3px;
}
.dtd-about-img {
    width: 250px;
    height: 175px;
    object-fit: cover;
    border-radius: 8px;
    float: left;
    margin: 0 22px 14px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}
.dtd-p {
    font-size: 14.5px;
    line-height: 1.75;
    color: #475569;
    margin-bottom: 16px;
    text-align: justify;
}

/* Sidebar */
.dtd-sidebar {
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* Widget 1: Need Assistance */
.dtd-help-widget {
    background: #111e2e;
    border-radius: 12px;
    padding: 26px 22px;
    color: #ffffff;
    text-align: center;
    box-shadow: 0 10px 25px rgba(17, 30, 46, 0.2);
}
.dtd-help-title {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 10px;
}
.dtd-help-desc {
    font-size: 12.5px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 20px;
}
.dtd-call-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: #eab308;
    color: #0f172a !important;
    font-size: 13.5px;
    font-weight: 700;
    padding: 11px 16px;
    border-radius: 25px;
    text-decoration: none;
    margin-bottom: 12px;
    transition: transform 0.2s ease, background 0.2s ease;
}
.dtd-call-btn:hover {
    background: #ca8a04;
    transform: translateY(-2px);
}
.dtd-wa-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: #25D366;
    color: #ffffff !important;
    font-size: 13.5px;
    font-weight: 700;
    padding: 11px 16px;
    border-radius: 25px;
    text-decoration: none;
    transition: transform 0.2s ease, background 0.2s ease;
}
.dtd-wa-btn:hover {
    background: #1ea952;
    transform: translateY(-2px);
}

/* Widget 2: City Routes */
.dtd-routes-widget {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 18px rgba(0,0,0,0.04);
}
.dtd-routes-header {
    padding: 16px 20px;
    font-size: 15px;
    font-weight: 700;
    color: #0b2229;
    border-bottom: 1px solid #e2e8f0;
    margin: 0;
    background: #ffffff;
}
.dtd-route-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 20px;
    font-size: 13px;
    font-weight: 500;
    color: #334155;
    text-decoration: none;
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s ease, color 0.15s ease;
}
.dtd-route-item:last-child {
    border-bottom: none;
}
.dtd-route-item:hover {
    background: #f8fafc;
    color: var(--theme-color, #1ca8cb);
}
.dtd-route-chevron {
    color: #94a3b8;
    font-size: 11px;
    transition: transform 0.2s ease;
}
.dtd-route-item:hover .dtd-route-chevron {
    transform: translateX(3px);
    color: var(--theme-color, #1ca8cb);
}
`;

function DropTaxiDetailPage() {
    const { id } = useParams();

    // Find city by id, default to thoothukudi or first item
    const city = dropTaxiCities.find(
        (c) => c.id.toLowerCase() === (id || '').toLowerCase()
    ) || dropTaxiCities.find(c => c.id === 'thoothukudi') || dropTaxiCities[0];

    const aboutParagraphs = getCityAbout(city);
    const routesList = getCityRoutes(city.name);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    return (
        <>
            <style>{styles}</style>
            <HeaderOne />
            <Breadcrumb 
                title={city.title} 
                subtitle={`One-Way & Round-Trip Drop Taxi to/from ${city.name} • Starting from ${city.sedanFare}`}
                bgImage={city.image || "/assets/img/cabs/svc-oneway.jpg"} 
            />

            <section className="dtd-section">
                <div className="container">
                    <div className="row g-4 g-lg-5">
                        {/* LEFT COLUMN: Main Content matching user screenshot */}
                        <div className="col-lg-8">
                            {/* 1. About City Block */}
                            <div className="dtd-block">
                                <h3 className="dtd-title">About {city.name}</h3>
                                <div>
                                    <img 
                                        src={city.image} 
                                        alt={city.title} 
                                        className="dtd-about-img" 
                                    />
                                    {aboutParagraphs.map((p, idx) => (
                                        <p key={idx} className="dtd-p">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                                <div style={{ clear: 'both' }}></div>
                            </div>

                            {/* 2. Explore South India Hassle-Free */}
                            <div className="dtd-block">
                                <h3 className="dtd-title">
                                    Explore South India Hassle-Free With Our One-Way Cabs
                                </h3>
                                <p className="dtd-p">
                                    Are you planning a trip out of town and looking for the most efficient, cost-effective way to commute? A premium outstation one-way <strong>{city.name} drop taxi</strong> is the ultimate solution for hassle-free travel. At <strong>Super Cabs</strong>, we specialize in providing dedicated one-way outstation cab services designed specifically for travellers who do not need a return ride. Traditionally, taxi operators charged passengers double the fare to cover the return distance of the vehicle. We have revolutionized this outdated practice by offering high-quality, professional drop taxi services where you only pay for the exact distance you travel.
                                </p>
                                <p className="dtd-p">
                                    By choosing our dedicated <strong>one-way drop taxi</strong> services, you can enjoy a comfortable and private ride to any destination across South India, including major hubs like Chennai, Coimbatore, Madurai, Trichy, Bangalore, and Pondicherry. Whether you are travelling for a business meeting, returning home to spend time with family, relocating, or planning a leisure trip to the mountains or beaches, our reliable services guarantee a stress-free experience. Forget the hassles of driving through heavy highway traffic or looking for parking spots; sit back, relax, and let our professional drivers navigate you safely to your destination.
                                </p>
                            </div>

                            {/* 3. Why Choose A One-Way Drop Taxi */}
                            <div className="dtd-block">
                                <h3 className="dtd-title">
                                    Why Choose A One-Way {city.name} Drop Taxi?
                                </h3>
                                <p className="dtd-p">
                                    Booking a dedicated outstation cab with <strong>Super Cabs</strong> comes with a multitude of benefits tailored to modern travellers. First and foremost is absolute affordability. By billing you only for the distance traveled from your pickup location in {city.name} to your drop-off destination, we immediately cut your travel expenses in half. This transparent model eliminates the unfair burden of paying for return empty runs, making private car travel comparable to public transport costs while offering ten times the comfort and privacy.
                                </p>
                                <p className="dtd-p">
                                    In addition to cost savings, convenience is at the heart of our service. Unlike fixed bus or train schedules, our one-way drop taxis operate entirely on your timeline. You choose the exact pickup time, the starting point, and the drop-off location. Our door-to-door service means you don't have to worry about carrying heavy luggage to terminals or hailing local transport to reach your final address. With 24/7 dispatch, strict safety guidelines, sanitised vehicles, and professional drivers who possess years of experience on South Indian highways, your security and comfort remain our top priorities throughout the journey.
                                </p>
                            </div>

                            {/* 4. Vehicle Fleet */}
                            <div className="dtd-block">
                                <h3 className="dtd-title">
                                    Our Diverse and Well-Maintained Vehicle Fleet
                                </h3>
                                <p className="dtd-p">
                                    Every traveller has unique requirements, and our extensive fleet of well-maintained vehicles is fully equipped to meet them all. For budget-conscious solo travelers or small families, we offer fuel-efficient and compact Hatchbacks such as the Swift and WagonR. These cars are perfect for quick runs and offer a cozy, air-conditioned ride at the lowest per-kilometer rates.
                                </p>
                                <p className="dtd-p">
                                    If you require additional legroom and luggage space, our comfortable Sedans, including the Toyota Etios and Maruti Suzuki Dzire, provide an executive feel and smooth ride ideal for long-distance highway commutes. For larger families, group excursions, or corporate teams traveling together, we provide spacious and premium SUVs such as the Toyota Innova Crysta, Mahindra Xylo, and Ertiga, ensuring ample space for everyone and their belongings.
                                </p>

                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar matching user screenshot */}
                        <div className="col-lg-4">
                            <div className="dtd-sidebar">
                                {/* Widget 1: Need Assistance? */}
                                <div className="dtd-help-widget">
                                    <h4 className="dtd-help-title">Need Assistance?</h4>
                                    <p className="dtd-help-desc">
                                        Our customer support and dispatch teams are available 24/7 to assist with your bookings.
                                    </p>

                                    <a href={telHref()} className="dtd-call-btn">
                                        <i className="fa-solid fa-phone"></i> Call Customer Support
                                    </a>

                                    <a 
                                        href={waHref(`Hello Super Cabs, I need assistance with a One-Way Drop Taxi to ${city.name}.`)}
                                        target={siteConfig.whatsapp ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="dtd-wa-btn"
                                    >
                                        <i className="fab fa-whatsapp"></i> WhatsApp Live Chat
                                    </a>
                                </div>

                                {/* Widget 2: City Drop Taxi Routes */}
                                <div className="dtd-routes-widget">
                                    <h5 className="dtd-routes-header">
                                        {city.name} Drop Taxi Routes
                                    </h5>
                                    <div>
                                        {routesList.map((route, i) => (
                                            <Link 
                                                key={i} 
                                                to="/contact" 
                                                state={{ enquiry: { service: "One-Way Drop Taxi", route: route } }}
                                                className="dtd-route-item"
                                            >
                                                <span>{route}</span>
                                                <i className="fa-solid fa-chevron-right dtd-route-chevron"></i>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterFour />
            <ScrollToTop />
        </>
    );
}

export default DropTaxiDetailPage;
