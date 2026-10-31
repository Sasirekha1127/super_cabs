import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useBookingModal } from '../Booking/BookingModalContext';
import usePublicContent from '../../services/usePublicContent';
import { getApiOrigin } from '../../services/api';

// Fallback slides for each page if nothing in DB yet
const PAGE_FALLBACKS = {
  about: [
    {
      title: 'Your Trusted Chauffeur & Taxi Partner',
      subtitle: 'Over 15+ Years of Dedicated Service Across South India',
      badge: 'Pioneer in South India Travel',
      description: 'Experience unmatched comfort, punctual doorstep pickups, transparent billing, and professionally trained chauffeurs on every journey.',
      image: '/assets/img/cabs/about-1.jpg',
      primaryBtnText: 'Explore Fleet',
      primaryBtnLink: '/fleet',
      secondaryBtnText: 'Contact Us',
      secondaryBtnLink: '/contact'
    },
    {
      title: 'Committed to Passenger Safety & Excellence',
      subtitle: 'Clean Air-Conditioned Fleet with Verified Drivers',
      badge: 'Safe & Certified Travels',
      description: 'Whether it is a late-night airport drop, an outstation family vacation, or daily corporate transit, Super Cabs is by your side 24/7.',
      image: '/assets/img/cabs/hero-1.jpg',
      primaryBtnText: 'Book Taxi Now',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'View Tariff',
      secondaryBtnLink: '/tariff'
    }
  ],
  services: [
    {
      title: 'Outstation Drop, Round-Trip & Airport Cabs',
      subtitle: 'Transparent Per-Kilometer Pricing with Zero Hidden Fees',
      badge: '24/7 Cab Services',
      description: 'From one-way outstation drops to round-trip vacations and urgent airport pickups, choose from our versatile service packages.',
      image: '/assets/img/cabs/banner-default.jpg',
      primaryBtnText: 'Book Outstation Taxi',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Check Fares',
      secondaryBtnLink: '/tariff'
    },
    {
      title: 'Guaranteed On-Time Airport Transfers',
      subtitle: 'Flight Tracking & Meet-and-Greet Pickup Service',
      badge: 'Zero Flight Delays',
      description: 'Never miss a flight with our dedicated airport taxi network. Reliable, sanitized sedans and SUVs waiting for you upon landing.',
      image: '/assets/img/cabs/hero-2.jpg',
      primaryBtnText: 'Book Airport Cab',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Our Fleet',
      secondaryBtnLink: '/fleet'
    }
  ],
  fleet: [
    {
      title: 'Hatchbacks, Sedans, SUVs & Tempo Travellers',
      subtitle: 'Top-Conditioned Vehicles Tailored to Every Passenger Group',
      badge: 'Premium Fleet',
      description: 'Travel comfortably in our clean, chilled AC vehicles inspected regularly for safety, hygiene, and superior road performance.',
      image: '/assets/img/cabs/hero-2.jpg',
      primaryBtnText: 'Choose Vehicle',
      primaryBtnLink: '/fleet',
      secondaryBtnText: 'Call Chauffeur',
      secondaryBtnLink: 'tel:+919787541723'
    },
    {
      title: 'Innova Crysta, Ertiga & Tempo Travellers',
      subtitle: 'Ample Luggage Capacity & Reclining Push-Back Seats',
      badge: 'Group & Luxury Travel',
      description: 'Planning a family pilgrimage or corporate group retreat? Ride in spacious 7-seater SUVs and 12-to-17 seater Tempo Travellers.',
      image: '/assets/img/cabs/suv.jpg',
      primaryBtnText: 'Book SUV Now',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Check Tariff',
      secondaryBtnLink: '/tariff'
    }
  ],
  tariff: [
    {
      title: 'Clear Per-KM Billing & Flat Outstation Rates',
      subtitle: 'No Hidden Driver Fees • No Night Surge Gouging',
      badge: 'Transparent Pricing',
      description: 'We believe in 100% honesty. Pay only for the kilometers you travel with zero surprise charges and complete upfront estimates.',
      image: '/assets/img/cabs/svc-roundtrip.jpg',
      primaryBtnText: 'Calculate Fare',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Call for Quote',
      secondaryBtnLink: 'tel:+919787541723'
    },
    {
      title: 'Pay Only for One-Way - Zero Return Fare',
      subtitle: 'The Smartest Way to Commute Between Major Cities',
      badge: 'Save up to 40%',
      description: 'Why pay two-way charges for a single drop? Enjoy affordable one-way cab fares across all popular South Indian routes.',
      image: '/assets/img/cabs/hero-3.jpg',
      primaryBtnText: 'Book One-Way Drop',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Browse Fleet',
      secondaryBtnLink: '/fleet'
    }
  ],
  tours: [
    {
      title: 'Explore Scenic Hill Stations & Heritage Sites',
      subtitle: 'Ooty, Kodaikanal, Munnar, Wayanad, Coorg & Beyond',
      badge: 'Custom Holiday Packages',
      description: 'Handcrafted sightseeing itineraries, flexible halt durations, and knowledgeable drivers who know every scenic viewpoint.',
      image: '/assets/img/cabs/banner-tours.jpg',
      primaryBtnText: 'Explore Tour Packages',
      primaryBtnLink: '/tours',
      secondaryBtnText: 'Enquire Custom Tour',
      secondaryBtnLink: '/contact'
    },
    {
      title: 'Peaceful Temple Yatras with Courteous Drivers',
      subtitle: 'Madurai, Rameshwaram, Tirupati, Kanyakumari & Thanjavur',
      badge: 'Spiritual Circuits',
      description: 'Travel hassle-free on spiritual journeys. Convenient temple timings, senior-citizen friendly halts, and smooth highway transit.',
      image: '/assets/img/cabs/tour-temple.jpg',
      primaryBtnText: 'Book Temple Tour',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Call Us Now',
      secondaryBtnLink: 'tel:+919787541723'
    }
  ],
  gallery: [
    {
      title: 'Explore Our Modern Fleet & Scenic Journeys',
      subtitle: 'Spotted Across Highways, Airports, Mountains & Monuments',
      badge: 'Photo Showcase',
      description: 'Browse through our real-world gallery showcasing sanitized cab interiors, happy passenger moments, and scenic South Indian landscapes.',
      image: '/assets/img/cabs/tour-temple.jpg',
      primaryBtnText: 'View Gallery Photos',
      primaryBtnLink: '/gallery',
      secondaryBtnText: 'Book Your Ride',
      secondaryBtnLink: '/contact'
    },
    {
      title: 'See the Super Cabs Quality Standard',
      subtitle: 'Every Car Deep Cleaned & Prepped Before Each Trip',
      badge: 'Spotless Cleanliness',
      description: 'Take a closer look at our spotless interiors, plush leatherette seats, spacious boots, and pristine vehicle exteriors.',
      image: '/assets/img/cabs/about-1.jpg',
      primaryBtnText: 'Book Sanitized Cab',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Our Vehicles',
      secondaryBtnLink: '/fleet'
    }
  ]
};

const resolveImage = (img) => {
  if (!img) return '/assets/img/cabs/banner-default.jpg';
  if (img.startsWith('http')) return img;
  if (img.startsWith('/uploads')) return `${getApiOrigin()}${img}`;
  return img;
};

export default function PageHeroSlider({
  page = 'about',
  pageTitle = 'Page Title',
  pageSubtitle = '',
  defaultBg = ''
}) {
  const { openBookingModal } = useBookingModal();
  const swiperRef = useRef(null);

  // Fetch dynamic sliders from backend
  const rawSliders = usePublicContent('slider', []);

  // Filter slides for this specific page
  const filteredLiveSlides = (rawSliders || []).filter(
    (s) => (s.page || s.data?.page || '').toLowerCase() === page.toLowerCase()
  );

  const fallbackSlides = PAGE_FALLBACKS[page] || [
    {
      title: pageTitle,
      subtitle: pageSubtitle,
      badge: 'Super Cabs Service',
      description: 'Reliable, comfortable & punctual taxi services across South India.',
      image: defaultBg || '/assets/img/cabs/banner-default.jpg',
      primaryBtnText: 'Book Taxi Now',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Explore Fleet',
      secondaryBtnLink: '/fleet'
    }
  ];

  const activeSlides = filteredLiveSlides.length > 0 ? filteredLiveSlides : fallbackSlides;

  const handleActionClick = (link, e) => {
    if (!link) return;
    if (link.startsWith('tel:') || link.startsWith('mailto:')) {
      return; // allow browser default
    }
    if (link === '/contact' || link.includes('book')) {
      e.preventDefault();
      openBookingModal();
    }
  };

  const isMultiSlide = activeSlides.length > 1;

  return (
    <div
      className="page-hero-slider-wrapper"
      style={{
        position: 'relative',
        background: '#07151b',
        overflow: 'hidden'
      }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={isMultiSlide}
        speed={1000}
        autoplay={
          isMultiSlide
            ? {
                delay: 5500,
                disableOnInteraction: false
              }
            : false
        }
        pagination={
          isMultiSlide
            ? {
                clickable: true,
                bulletClass: 'page-slider-dot',
                bulletActiveClass: 'page-slider-dot-active'
              }
            : false
        }
        className="page-hero-swiper"
      >
        {activeSlides.map((slide, index) => {
          const title = slide.title || slide.heading || pageTitle;
          const subtitle = slide.subtitle || pageSubtitle || '';
          const badge = slide.badge || 'Super Cabs';
          const description = slide.description || '';
          const bgImg = resolveImage(slide.image || defaultBg);
          const pBtnText = slide.primaryBtnText || 'Book Taxi Now';
          const pBtnLink = slide.primaryBtnLink || '/contact';
          const sBtnText = slide.secondaryBtnText || '';
          const sBtnLink = slide.secondaryBtnLink || '';

          return (
            <SwiperSlide key={slide.id || slide._id || index}>
              <div
                className="breadcumb-wrapper"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7, 21, 27, 0.72) 0%, rgba(9, 28, 35, 0.90) 100%), url(${bgImg})`,
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  position: 'relative',
                  padding: '135px 0 105px',
                  minHeight: '420px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                  <div className="breadcumb-content text-center" style={{ maxWidth: '860px', margin: '0 auto' }}>
                    {/* Badge Pill */}
                    {badge && (
                      <div style={{ marginBottom: '14px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(28, 168, 203, 0.18)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            padding: '6px 18px',
                            borderRadius: '30px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          <i className="fa-solid fa-taxi" style={{ fontSize: '0.8rem' }}></i>
                          {badge}
                        </span>
                      </div>
                    )}

                    {/* Main Headline */}
                    <h1
                      className="breadcumb-title text-white"
                      style={{
                        fontSize: 'clamp(30px, 4.4vw, 50px)',
                        fontWeight: 800,
                        lineHeight: 1.22,
                        marginBottom: '14px',
                        textShadow: '0 2px 12px rgba(0,0,0,0.45)'
                      }}
                    >
                      {title}
                    </h1>

                    {/* Subtitle / Tagline */}
                    {subtitle && (
                      <p
                        style={{
                          fontSize: 'clamp(15px, 1.8vw, 19px)',
                          color: '#e2e8f0',
                          fontWeight: 500,
                          maxWidth: '740px',
                          margin: '0 auto 12px',
                          lineHeight: 1.45
                        }}
                      >
                        {subtitle}
                      </p>
                    )}

                    {/* Description Paragraph */}
                    {description && (
                      <p
                        style={{
                          fontSize: '15px',
                          color: 'rgba(255, 255, 255, 0.78)',
                          maxWidth: '680px',
                          margin: '0 auto 22px',
                          lineHeight: 1.6
                        }}
                      >
                        {description}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '14px',
                        flexWrap: 'wrap',
                        marginBottom: '24px'
                      }}
                    >
                      {pBtnText && (
                        <a
                          href={pBtnLink}
                          className="th-btn"
                          style={{
                            background: 'var(--theme-color, #1ca8cb)',
                            color: '#fff',
                            padding: '12px 28px',
                            borderRadius: '30px',
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(28, 168, 203, 0.4)',
                            transition: 'all 0.25s ease'
                          }}
                          onClick={(e) => handleActionClick(pBtnLink, e)}
                        >
                          <i className="fa-solid fa-calendar-check"></i>
                          <span>{pBtnText}</span>
                        </a>
                      )}

                      {sBtnText && (
                        <a
                          href={sBtnLink}
                          style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            padding: '11px 26px',
                            borderRadius: '30px',
                            fontWeight: 600,
                            fontSize: '0.92rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            backdropFilter: 'blur(6px)',
                            transition: 'all 0.25s ease'
                          }}
                          onClick={(e) => handleActionClick(sBtnLink, e)}
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                          <span>{sBtnText}</span>
                        </a>
                      )}
                    </div>

                    {/* Breadcrumb Menu Links */}
                    <ul
                      className="breadcumb-menu justify-content-center"
                      style={{
                        margin: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '6px 20px',
                        borderRadius: '20px',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <li>
                        <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem' }}>
                          <i className="fa-solid fa-house" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i>
                          Home
                        </Link>
                      </li>
                      <li style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>/</li>
                      <li style={{ color: 'var(--theme-color, #38bdf8)', fontWeight: 600, fontSize: '0.85rem' }}>
                        {pageTitle}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Prev / Next Slider Arrows (shown when multiple slides) */}
      {isMultiSlide && (
        <>
          <button
            type="button"
            className="page-slider-nav-btn page-slider-prev"
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
            aria-label="Previous Slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            type="button"
            className="page-slider-nav-btn page-slider-next"
            onClick={() => swiperRef.current?.swiper?.slideNext()}
            aria-label="Next Slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </>
      )}

      {/* Slider Custom Styling */}
      <style>{`
        .page-hero-slider-wrapper {
          position: relative;
        }
        .page-slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(7, 21, 27, 0.65);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(6px);
        }
        .page-slider-nav-btn:hover {
          background: var(--theme-color, #1ca8cb);
          color: #fff;
          border-color: var(--theme-color, #1ca8cb);
          transform: translateY(-50%) scale(1.08);
        }
        .page-slider-prev {
          left: 20px;
        }
        .page-slider-next {
          right: 20px;
        }
        .page-slider-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          margin: 0 5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .page-slider-dot-active {
          width: 26px;
          border-radius: 8px;
          background: var(--theme-color, #1ca8cb);
          box-shadow: 0 0 10px rgba(28, 168, 203, 0.6);
        }
        .page-hero-swiper .swiper-pagination {
          bottom: 18px !important;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .page-slider-nav-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
