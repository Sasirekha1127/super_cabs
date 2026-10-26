import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Core Swiper styles
import { Pagination, EffectFade, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { telHref } from '../data/siteConfig';
import { useBookingModal } from '../Booking/BookingModalContext';
import usePublicContent from '../../services/usePublicContent';
const originalBanners = [
    { heading: 'Super Cabs – Your Trusted Taxi Partner', description: 'Safe, comfortable & on-time taxi service', image: '/assets/img/cabs/hero-1.jpg' },
    { heading: 'Book Your Ride Anytime, Anywhere', description: 'Local, outstation & airport taxi', image: '/assets/img/cabs/hero-2.jpg' },
    { heading: 'Travel Comfortably with Super Cabs', description: 'Corporate travel & tour packages', image: '/assets/img/cabs/hero-3.jpg' },
];
function BannerOne() {
    const { openBookingModal } = useBookingModal();
    const swiperRef = useRef(null);
    const banners = usePublicContent('banner', originalBanners);

    useEffect(() => {
        // Function to add animation classes
        const animationProperties = () => {
            document.querySelectorAll('[data-ani]').forEach((element) => {
                const animationName = element.getAttribute('data-ani');
                element.classList.add(animationName);
            });

            document.querySelectorAll('[data-ani-delay]').forEach((element) => {
                const delayTime = element.getAttribute('data-ani-delay');
                element.style.animationDelay = delayTime;
            });
        };

        animationProperties();
    }, []);

    // Event handler for custom navigation arrows
    const handleSliderNavigation = (direction) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiper = swiperRef.current.swiper;
            if (direction === "prev") {
                swiper.slidePrev();
            } else {
                swiper.slideNext();
            }
        }
    };

    return (
        <div className="th-hero-wrapper hero-1" id="hero">

            <Swiper
                modules={[Navigation, Pagination, EffectFade]} // Initialize necessary modules
                effect="fade" // Use fade effect
                loop={true} // Enable loop
                speed={1000}
                pagination={{
                    el: ".swiper-pagination", // Custom pagination container
                    clickable: true, // Enable clickable pagination
                }}
                navigation={{
                    nextEl: ".slider-next", // Custom next button
                    prevEl: ".slider-prev", // Custom prev button
                }}
                className="th-slider hero-slider-1"
                id="heroSlide1"
            >
                <div className="swiper-wrapper">
                    {banners[0] && <SwiperSlide>
                        <div className="hero-inner">
                            <div
                                className="th-hero-bg"
                                style={{
                                    backgroundImage: `url(${banners[0]?.image || originalBanners[0].image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            >

                            </div>
                            <div className="container">
                                <div className="hero-style1">
                                    <span
                                        className="sub-title style1"
                                        data-ani="slideinup"
                                        data-ani-delay="0.2s"
                                    >
                                        {banners[0]?.description || banners[0]?.subtitle || originalBanners[0].description}
                                    </span>
                                    <h1
                                        className="hero-title"
                                        data-ani="slideinup"
                                        data-ani-delay="0.4s"
                                    >
                                        {banners[0]?.heading || banners[0]?.title || originalBanners[0].heading}
                                    </h1>
                                    <div
                                        className="btn-group"
                                        data-ani="slideinup"
                                        data-ani-delay="0.6s"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => banners[0]?.buttonLink ? window.location.assign(banners[0].buttonLink) : openBookingModal()}
                                            className="th-btn th-icon"
                                            style={{ border: 'none', cursor: 'pointer' }}
                                        >
                                            {banners[0]?.buttonLabel || 'Book Now'}
                                        </button>
                                        <a href={telHref()} className="th-btn style2 th-icon">
                                            Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>}
                    {banners[1] && <SwiperSlide>
                        <div className="hero-inner">
                            <div
                                className="th-hero-bg"
                                style={{
                                    backgroundImage: `url(${banners[1]?.image || originalBanners[1].image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                            <div className="container">
                                <div className="hero-style1">
                                    <span
                                        className="sub-title style1"
                                        data-ani="slideinup"
                                        data-ani-delay="0.2s"
                                    >
                                        {banners[1]?.description || banners[1]?.subtitle || originalBanners[1].description}
                                    </span>
                                    <h1
                                        className="hero-title"
                                        data-ani="slideinup"
                                        data-ani-delay="0.4s"
                                    >
                                        {banners[1]?.heading || banners[1]?.title || originalBanners[1].heading}
                                    </h1>
                                    <div
                                        className="btn-group"
                                        data-ani="slideinup"
                                        data-ani-delay="0.6s"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => banners[1]?.buttonLink ? window.location.assign(banners[1].buttonLink) : openBookingModal()}
                                            className="th-btn th-icon"
                                            style={{ border: 'none', cursor: 'pointer' }}
                                        >
                                            {banners[1]?.buttonLabel || 'Book Now'}
                                        </button>
                                        <a href={telHref()} className="th-btn style2 th-icon">
                                            Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>}
                    {banners[2] && <SwiperSlide>
                        <div className="hero-inner">
                            <div
                                className="th-hero-bg"
                                style={{
                                    backgroundImage: `url(${banners[2]?.image || originalBanners[2].image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            ></div>
                            <div className="container">
                                <div className="hero-style1">
                                    <span
                                        className="sub-title style1"
                                        data-ani="slideinup"
                                        data-ani-delay="0.2s"
                                    >
                                        {banners[2]?.description || banners[2]?.subtitle || originalBanners[2].description}
                                    </span>
                                    <h1
                                        className="hero-title"
                                        data-ani="slideinup"
                                        data-ani-delay="0.4s"
                                    >
                                        {banners[2]?.heading || banners[2]?.title || originalBanners[2].heading}
                                    </h1>
                                    <div
                                        className="btn-group"
                                        data-ani="slideinup"
                                        data-ani-delay="0.6s"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => banners[2]?.buttonLink ? window.location.assign(banners[2].buttonLink) : openBookingModal()}
                                            className="th-btn th-icon"
                                            style={{ border: 'none', cursor: 'pointer' }}
                                        >
                                            {banners[2]?.buttonLabel || 'Book Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>}
                    {banners.slice(3).map((banner, offset) => <SwiperSlide key={banner.id || `managed-${offset + 3}`}>
                        <div className="hero-inner">
                            <div className="th-hero-bg" style={{ backgroundImage: `url(${banner.image || originalBanners[(offset + 3) % originalBanners.length].image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                            <div className="container"><div className="hero-style1">
                                <span className="sub-title style1" data-ani="slideinup" data-ani-delay="0.2s">{banner.description || banner.subtitle}</span>
                                <h1 className="hero-title" data-ani="slideinup" data-ani-delay="0.4s">{banner.heading || banner.title}</h1>
                                <div className="btn-group" data-ani="slideinup" data-ani-delay="0.6s">
                                    <button type="button" onClick={() => banner.buttonLink ? window.location.assign(banner.buttonLink) : openBookingModal()} className="th-btn th-icon" style={{ border: 'none', cursor: 'pointer' }}>{banner.buttonLabel || 'Book Now'}</button>
                                </div>
                            </div></div>
                        </div>
                    </SwiperSlide>)}
                </div>
                <div className="th-swiper-custom">
                    <button
                        className="slider-arrow slider-prev"
                        onClick={() => handleSliderNavigation("prev")}
                    >
                        <img src="/assets/img/icon/right-arrow.svg" alt="Prev" />
                    </button>
                    <div className="swiper-pagination" /> {/* Pagination container */}
                    <button
                        className="slider-arrow slider-next"
                        onClick={() => handleSliderNavigation("next")}
                    >
                        <img src="/assets/img/icon/left-arrow.svg" alt="Next" />
                    </button>
                </div>
            </Swiper>
        </div>

    )
}

export default BannerOne
