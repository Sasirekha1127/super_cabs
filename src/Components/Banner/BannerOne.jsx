import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { telHref } from '../data/siteConfig';
import { useBookingModal } from '../Booking/BookingModalContext';
import usePublicContent from '../../services/usePublicContent';
import { getApiOrigin } from '../../services/api';

const originalBanners = [
    { 
        heading: 'Super Cabs – Your Trusted Taxi Partner', 
        description: 'Safe, comfortable & on-time taxi service across South India', 
        image: '/assets/img/cabs/hero-1.jpg',
        buttonLabel: 'Book Now',
        buttonLink: '',
        secondaryLabel: 'Call Now',
        secondaryLink: ''
    },
    { 
        heading: 'Book Your Ride Anytime, Anywhere', 
        description: 'Local, outstation & airport taxi with transparent flat tariffs', 
        image: '/assets/img/cabs/hero-2.jpg',
        buttonLabel: 'Book Now',
        buttonLink: '',
        secondaryLabel: 'Call Now',
        secondaryLink: ''
    },
    { 
        heading: 'Travel Comfortably with Super Cabs', 
        description: 'Corporate travel & tour packages with dedicated highway chauffeurs', 
        image: '/assets/img/cabs/hero-3.jpg',
        buttonLabel: 'Book Now',
        buttonLink: '',
        secondaryLabel: 'Call Now',
        secondaryLink: ''
    },
];

const resolveBannerImage = (img, fallback = '/assets/img/cabs/hero-1.jpg') => {
    if (!img) return fallback;
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    if (img.startsWith('/uploads') || img.startsWith('uploads')) {
        return `${getApiOrigin()}${img.startsWith('/') ? '' : '/'}${img}`;
    }
    return img;
};

function BannerOne() {
    const { openBookingModal } = useBookingModal();
    const swiperRef = useRef(null);
    const banners = usePublicContent('banner', originalBanners);

    const activeBanners = (banners || []).filter((b) => b.isActive !== false);
    const displayBanners = activeBanners.length > 0 ? activeBanners : originalBanners;

    useEffect(() => {
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
    }, [displayBanners]);

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

    const swiperKey = displayBanners
        .map((b) => b.id || b._id || b.slug || b.heading)
        .join('-');

    return (
        <div className="th-hero-wrapper hero-1" id="hero">
            <Swiper
                key={swiperKey}
                ref={swiperRef}
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                effect="fade"
                loop={displayBanners.length > 1}
                speed={1000}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                observer={true}
                observeParents={true}
                pagination={{
                    el: ".hero-slider-pagination",
                    clickable: true,
                }}
                navigation={{
                    nextEl: ".hero-slider-next",
                    prevEl: ".hero-slider-prev",
                }}
                className="th-slider hero-slider-1"
                id="heroSlide1"
            >
                {displayBanners.map((banner, index) => {
                    const bgUrl = resolveBannerImage(
                        banner.image, 
                        originalBanners[index % originalBanners.length].image
                    );
                    const headingText = banner.heading || banner.title || originalBanners[index % originalBanners.length].heading;
                    const descText = banner.description || banner.subtitle || originalBanners[index % originalBanners.length].description;
                    const btnLabel = banner.buttonLabel || 'Book Now';
                    const btnLink = banner.buttonLink || '';
                    const secLabel = banner.secondaryLabel || 'Call Now';
                    const secLink = banner.secondaryLink || telHref();

                    return (
                        <SwiperSlide key={banner.id || banner._id || `banner-${index}`}>
                            <div className="hero-inner">
                                <div
                                    className="th-hero-bg"
                                    style={{
                                        backgroundImage: `url(${bgUrl})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center"
                                    }}
                                ></div>
                                <div className="container">
                                    <div className="hero-style1">
                                        <span
                                            className="sub-title style1"
                                            data-ani="slideinup"
                                            data-ani-delay="0.2s"
                                        >
                                            {descText}
                                        </span>
                                        <h1
                                            className="hero-title"
                                            data-ani="slideinup"
                                            data-ani-delay="0.4s"
                                        >
                                            {headingText}
                                        </h1>
                                        <div
                                            className="btn-group"
                                            data-ani="slideinup"
                                            data-ani-delay="0.6s"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (btnLink) {
                                                        if (btnLink.startsWith('http')) {
                                                            window.location.assign(btnLink);
                                                        } else {
                                                            window.location.href = btnLink;
                                                        }
                                                    } else {
                                                        openBookingModal();
                                                    }
                                                }}
                                                className="th-btn th-icon"
                                                style={{ border: 'none', cursor: 'pointer' }}
                                            >
                                                {btnLabel}
                                            </button>
                                            <a 
                                                href={secLink} 
                                                className="th-btn style2 th-icon"
                                            >
                                                {secLabel}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <div className="th-swiper-custom">
                    <button
                        className="slider-arrow slider-prev hero-slider-prev"
                        onClick={() => handleSliderNavigation("prev")}
                        aria-label="Previous Slide"
                        type="button"
                    >
                        <img src="/assets/img/icon/right-arrow.svg" alt="Prev" />
                    </button>
                    <div className="swiper-pagination hero-slider-pagination" />
                    <button
                        className="slider-arrow slider-next hero-slider-next"
                        onClick={() => handleSliderNavigation("next")}
                        aria-label="Next Slide"
                        type="button"
                    >
                        <img src="/assets/img/icon/left-arrow.svg" alt="Next" />
                    </button>
                </div>
            </Swiper>
        </div>
    );
}

export default BannerOne;
