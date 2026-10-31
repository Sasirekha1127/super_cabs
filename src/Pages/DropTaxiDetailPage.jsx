import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import HeaderOne from '../Components/Header/HeaderOne';
import FooterFour from '../Components/Footer/FooterFour';
import ScrollToTop from '../Components/ScrollToTop';
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb';
import { dropTaxiCities, getCityAbout } from '../Components/data/dropTaxiData';
import siteConfig, { telHref, waHref } from '../Components/data/siteConfig';
import api from '../services/api';
import BookingForm from '../Components/Booking/BookingForm';

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
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
@media (min-width: 1200px) {
    .dtd-sidebar {
        position: sticky;
        top: 90px;
    }
}
.dtd-booking-form-wrap {
    width: 100%;
}
.dtd-booking-form-wrap .bf-container {
    max-width: 100%;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
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
`;

const resolveImg = (src) => {
    if (!src) return '/assets/img/cabs/svc-oneway.jpg';
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    const apiOrigin = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace(/\/api\/?$/, '') : '';
    if (src.startsWith('/uploads')) return `${apiOrigin}${src}`;
    return src.startsWith('/') ? src : `/${src}`;
};

function DropTaxiDetailPage() {
    const { id } = useParams();

    const [city, setCity] = useState(() => {
        return dropTaxiCities.find(
            (c) => c.id.toLowerCase() === (id || '').toLowerCase()
        ) || dropTaxiCities.find(c => c.id === 'thoothukudi') || dropTaxiCities[0];
    });

    useEffect(() => {
        if (!id) return;
        let mounted = true;
        api.get(`/drop-routes/${id}`)
            .then(res => {
                if (mounted && res && res.route) {
                    setCity(prev => ({
                        ...prev,
                        id: res.route.cityId || id,
                        name: res.route.cityName || res.route.title,
                        title: res.route.title || `${res.route.cityName} Drop Taxi`,
                        image: res.route.image || prev.image,
                        bannerImage: res.route.bannerImage || res.route.image || prev.bannerImage,
                        approxDistance: res.route.approxDistance || prev.approxDistance,
                        approxTime: res.route.approxTime || prev.approxTime,
                        sedanFare: res.route.sedanFare || prev.sedanFare,
                        suvFare: res.route.suvFare || prev.suvFare,
                        description: res.route.description || prev.description,
                        aboutText: res.route.aboutText || prev.aboutText,
                        routes: res.route.routes || prev.routes
                    }));
                }
            })
            .catch(() => {});
        return () => { mounted = false; };
    }, [id]);

    const aboutParagraphs = useMemo(() => {
        if (city.aboutText && city.aboutText.trim()) {
            return city.aboutText.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
        }
        if (city.description && city.description.trim()) {
            return [
                city.description,
                `Traveling to or from ${city.name} is made completely seamless with our professional one-way drop taxi service. Rather than paying double the fare for an empty return ride, our service charges only for the exact distance you ride, with doorstep pickup and verified polite drivers.`,
                `Whether you need an early morning pickup for train or flight connections, an urgent hospital visit, or a relaxed journey with family, our clean AC hatchbacks, sedans, and SUVs are available 24/7.`
            ];
        }
        return getCityAbout(city);
    }, [city]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    return (
        <>
            <style>{styles}</style>
            <HeaderOne />
            <Breadcrumb 
                title={city.title} 
                subtitle={`One-Way & Round-Trip Drop Taxi to/from ${city.name} • Starting from ${city.sedanFare || '₹ 14 / km'}`}
                bgImage={resolveImg(city.bannerImage || city.image)} 
            />

            <section className="dtd-section">
                <div className="container">
                    <div className="row g-4 g-lg-5">
                        {/* LEFT COLUMN: Main Content matching user screenshot */}
                        <div className="col-lg-7 col-xl-8">
                            {/* 1. About City Block */}
                            <div className="dtd-block">
                                <h3 className="dtd-title">About {city.name}</h3>
                                <div>
                                    <img 
                                        src={resolveImg(city.image)} 
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
                                    If you require additional legroom and luggage space, our comfortable Sedans, including the New Maruti Suzuki Swift Dzire and Hyundai Aura, provide an executive feel and smooth ride ideal for long-distance highway commutes. For larger families, group excursions, or corporate teams traveling together, we provide spacious and premium SUVs such as the Toyota Innova Crysta, Mahindra Xylo, and Ertiga, ensuring ample space for everyone and their belongings.
                                </p>

                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar with Booking Form & Need Assistance */}
                        <div className="col-lg-5 col-xl-4">
                            <div className="dtd-sidebar">
                                {/* Booking Form */}
                                <div className="dtd-booking-form-wrap" style={{ width: '100%' }}>
                                    <BookingForm 
                                        initialTab="outstation" 
                                        initialCity={city.name} 
                                    />
                                </div>

                                {/* Widget: Need Assistance? */}
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
