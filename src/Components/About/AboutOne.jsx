import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usePublicContent from '../../services/usePublicContent';

const SLIDE_TIME = 3000 // ms - speed maatha inga change pannunga

/* CSS ellam inge-ye irukku, vera file la add panna thevai illa */
const sliderCss = `
.about-slider {
    position: relative;
}

.about-slider_main {
    position: relative;
    width: 100%;
    height: 460px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.about-slider_main .slide-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.12);
    transition: opacity 1s ease, transform 4s ease;
}

.about-slider_main .slide-img.active {
    opacity: 1;
    transform: scale(1);
}

.about-slider_badge {
    position: absolute;
    left: 20px;
    bottom: 20px;
    padding: 8px 18px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.9);
    color: #111;
    font-weight: 600;
    font-size: 14px;
    backdrop-filter: blur(6px);
}

.about-slider_thumbs {
    display: flex;
    gap: 14px;
    margin-top: 16px;
}

.about-slider_thumbs .thumb {
    position: relative;
    flex: 1;
    height: 90px;
    padding: 0;
    border: 0;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.55;
    transform: translateY(0);
    transition: all 0.4s ease;
}

.about-slider_thumbs .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.about-slider_thumbs .thumb.active {
    opacity: 1;
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.about-slider_thumbs .thumb:focus-visible {
    outline: 3px solid var(--theme-color, #1ca8cb);
    outline-offset: 2px;
}

.about-slider_thumbs .thumb-progress {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: 0;
    background: var(--theme-color, #1ca8cb);
}

.about-slider_thumbs .thumb.active .thumb-progress {
    animation: thumbProgress ${SLIDE_TIME}ms linear forwards;
}

@keyframes thumbProgress {
    from { width: 0; }
    to   { width: 100%; }
}

.about-area .sec-title.heading {
    font-size: 32px !important;
    line-height: 1.3 !important;
    font-weight: 700;
}

.about-area .sec-text {
    font-size: 15px !important;
    line-height: 1.65 !important;
}

@media (max-width: 991px) {
    .about-area .sec-title.heading {
        font-size: 26px !important;
    }
}

@media (max-width: 575px) {
    .about-area .sec-title.heading {
        font-size: 23px !important;
    }
}

@media (max-width: 767px) {
    .about-slider_main { height: 300px; }
    .about-slider_thumbs .thumb { height: 65px; }
}

@media (prefers-reduced-motion: reduce) {
    .about-slider_main .slide-img { transition: opacity 0.3s ease; transform: none; }
    .about-slider_thumbs .thumb.active .thumb-progress { animation: none; width: 100%; }
}
`

function AboutOne() {
    const [active, setActive] = useState(0)
    const aboutEntries = usePublicContent('about', []);
    const about = aboutEntries.find(item => item.slug === 'main') || aboutEntries.find(item => !['vision', 'mission'].includes(item.slug));

    const defaultSlides = [
        { src: "/assets/img/cabs/about-1.jpg", alt: "Super Cabs Comfort Sedan" },
        { src: "/assets/img/cabs/about-2.jpg", alt: "Spacious Innova Crysta MPV" },
        { src: "/assets/img/cabs/about-3.jpg", alt: "Super Cabs Clean Fleet Lineup" },
    ];

    const dynamicSlides = [
        { src: about?.image || defaultSlides[0].src, alt: about?.alt || about?.imageAlt || defaultSlides[0].alt },
        { src: about?.image2 || defaultSlides[1].src, alt: about?.image2Alt || defaultSlides[1].alt },
        { src: about?.image3 || defaultSlides[2].src, alt: about?.image3Alt || defaultSlides[2].alt }
    ];

    // active maarum bodhu timer reset aagum (thumbnail click pannaalum correct-aa odum)
    useEffect(() => {
        const timer = setTimeout(() => {
            setActive((prev) => (prev + 1) % dynamicSlides.length)
        }, SLIDE_TIME)
        return () => clearTimeout(timer)
    }, [active, dynamicSlides.length])

    return (
        <div
            className="about-area position-relative overflow-hidden space"
            id="about-sec"
        >
            <style>{sliderCss}</style>

            <div className="container shape-mockup-wrap">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-slider">
                            {/* Main auto-changing image */}
                            <div className="about-slider_main">
                                {dynamicSlides.map((slide, i) => (
                                    <img
                                        key={slide.src + i}
                                        src={slide.src}
                                        alt={slide.alt}
                                        className={i === active ? "slide-img active" : "slide-img"}
                                    />
                                ))}
                                <div className="about-slider_badge">
                                    {about?.badge || dynamicSlides[active]?.alt}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="about-slider_thumbs">
                                {dynamicSlides.map((slide, i) => (
                                    <button
                                        type="button"
                                        key={slide.src + i}
                                        className={i === active ? "thumb active" : "thumb"}
                                        onClick={() => setActive(i)}
                                        aria-label={`Show ${slide.alt}`}
                                    >
                                        <img src={slide.src} alt={slide.alt || "Super Cabs Fleet"} />
                                        <span className="thumb-progress" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6">
                        <div className="ps-xl-4 ms-xl-2">
                            <div className="title-area mb-20">
                                <span className="sub-title style1">{about?.subheading || 'About Super Cabs'}</span>
                                <h2 className="sec-title mb-20 heading">
                                    {about?.heading || 'Redefining Outstation Travel Across South India'}
                                </h2>
                                <p className="sec-text mb-30">
                                    {about?.description || <>At <strong>Super Cabs</strong>, we make outstation travel simple, safe, and affordable with our reliable <strong>one-way drop taxi services</strong> across Tamil Nadu, Bangalore, and Pondicherry. Enjoy comfortable long-distance journeys without paying unnecessary return-trip fares. Whether it's a business trip, family vacation, or personal travel, we're here to make every journey smooth, convenient, and budget-friendly.</>}
                                </p>
                            </div>
                            <div className="about-item-wrap">
                                <div className="about-item">
                                    <div className="about-item_img">
                                        <img src={about?.feature1Icon || "/assets/img/icon/map3.svg"} alt="Taxi route map" />
                                    </div>
                                    <div className="about-item_centent">
                                        <h5 className="box-title">{about?.feature1Title || "Wide Range of Taxi Services"}</h5>
                                        <p className="about-item_text">
                                            {about?.feature1Text || "Local, outstation, airport, one-way, round-trip and corporate taxis."}
                                        </p>
                                    </div>
                                </div>
                                <div className="about-item">
                                    <div className="about-item_img">
                                        <img src={about?.feature2Icon || "/assets/img/icon/guide.svg"} alt="Route chauffeur guide" />
                                    </div>
                                    <div className="about-item_centent">
                                        <h5 className="box-title">{about?.feature2Title || "Professional Drivers"}</h5>
                                        <p className="about-item_text">
                                            {about?.feature2Text || "Courteous, experienced drivers who know the routes well."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-35">
                                <Link to={about?.buttonLink || "/about"} className="th-btn style1 th-icon">
                                    {about?.buttonText || "Learn More"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="shape-mockup shape1 d-none d-xl-block"
                    style={{ top: "12%", left: "-16%" }}
                >
                    <img src="/assets/img/shape/shape_1.png" alt="shape" />
                </div>
                <div
                    className="shape-mockup shape2 d-none d-xl-block"
                    style={{ top: "20%", left: "-16%" }}
                >
                    <img src="/assets/img/shape/shape_2.png" alt="shape" />
                </div>
                <div
                    className="shape-mockup shape3 d-none d-xl-block"
                    style={{ top: "14%", left: "-10%" }}
                >
                    <img src="/assets/img/shape/shape_3.png" alt="shape" />
                </div>

                <div
                    className="shape-mockup about-rating d-none d-xxl-block"
                    style={{ bottom: "50%", right: "-20%" }}
                >
                    <i className="fa-sharp fa-solid fa-star" />
                    <span>24/7</span>
                </div>
                <div
                    className="shape-mockup about-emoji d-none d-xxl-block"
                    style={{ bottom: "25%", right: "5%" }}
                >
                    <img src="/assets/img/icon/emoji.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default AboutOne
