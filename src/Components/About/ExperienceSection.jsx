import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import siteConfig, { telHref } from '../data/siteConfig'

// `to` = number that counts up. Items without `to` show `big` as plain text.
const experienceStats = [
    {
        icon: 'fa-shield-halved',
        to: 5, suffix: 'M+', decimals: 0,
        title: 'Million+ Safe KMs',
        desc: 'Navigated local city streets, hill stations, and state highways with zero tolerance for rash driving.'
    },
    {
        icon: 'fa-user-check',
        big: 'Verified',
        title: 'Route Chauffeurs',
        desc: 'Experienced drivers with thorough background verification, courteous demeanor, and deep route expertise.'
    },
    {
        icon: 'fa-stopwatch',
        to: 99.4, suffix: '%', decimals: 1,
        title: 'On-Time Arrival',
        desc: 'Strict punctuality protocol for airport pickups, railway connections, and critical corporate meetings.'
    },
    {
        icon: 'fa-headset',
        big: '24/7',
        title: 'Route Monitoring',
        desc: 'Live operations desk monitoring every ongoing ride to ensure complete safety and instant support.'
    }
]

// true while in view, false after leaving -> animations replay on every scroll
function useInView(threshold = 0.25) {
    const ref = useRef(null)
    const [seen, setSeen] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && e.intersectionRatio >= threshold) setSeen(true)
                else if (!e.isIntersecting) setSeen(false)
            },
            { threshold: [0, threshold] }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [threshold])
    return [ref, seen]
}

function useCountUp(to, run, decimals = 0, duration = 1500) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        if (to == null) return
        if (!run) {
            setVal(0)
            return
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVal(to)
            return
        }
        let raf
        const t0 = performance.now()
        const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1)
            setVal(to * (1 - Math.pow(1 - p, 3)))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [to, run, duration])
    return val.toFixed(decimals)
}

function Pillar({ item, run, index }) {
    const n = useCountUp(item.to, run, item.decimals)
    return (
        <li className="scx-step" style={{ '--i': index }}>
            <span className="scx-step__node">
                <i className={`fa-solid ${item.icon}`}></i>
            </span>
            <div className="scx-step__body">
                <div className="scx-step__big">
                    {item.to != null ? `${n}${item.suffix}` : item.big}
                </div>
                <h4 className="scx-step__title">{item.title}</h4>
                <p className="scx-step__desc">{item.desc}</p>
            </div>
        </li>
    )
}

function ExperienceSection() {
    const [ref, seen] = useInView()
    const expYears = parseInt(siteConfig.experienceYears, 10) || 10
    const years = useCountUp(expYears, seen)

    return (
        <section ref={ref} className={`scx-sec space ${seen ? 'is-in' : ''}`} id="experience-sec">
            <style>{experienceCss}</style>

            <div className="container">
                <div className="row align-items-center gy-5">
                    {/* ---------- Content (left) ---------- */}
                    <div className="col-lg-7 order-2 order-lg-1">
                        <div className="scx-content">
                            <div className="title-area mb-25">
                                <span className="sub-title style1">Our Experience &amp; Track Record</span>
                                <h2 className="sec-title heading">
                                    Over {expYears}+ Years of Safe &amp; Dependable Travel
                                </h2>
                                <p className="sec-text">
                                    Founded with a commitment to reliable mobility, Super Cabs has grown into a trusted travel partner. Over the years, we have mastered city transit, interstate highway journeys, airport connectivity, and tailored tour packages.
                                </p>
                            </div>

                            {/* vertical route line that fills as the section opens */}
                            <ol className="scx-steps">
                                <span className="scx-steps__line" aria-hidden="true"></span>
                                {experienceStats.map((item, i) => (
                                    <Pillar item={item} run={seen} index={i} key={item.title} />
                                ))}
                            </ol>

                            <div className="scx-cta mt-35 d-flex flex-wrap align-items-center gap-3">
                                <Link to="/contact" className="th-btn style1 th-icon">
                                    Book Experienced Ride
                                </Link>
                                <a href={telHref()} className="scx-call">
                                    <i className="fa-solid fa-phone-volume me-2 text-theme"></i>
                                    <span>Call for Inquiry: <strong>{siteConfig.phoneDisplay}</strong></span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ---------- Visual (right) ---------- */}
                    <div className="col-lg-5 order-1 order-lg-2">
                        <div className="scx-visual">
                            <div className="scx-arch">
                                <img src="/assets/img/cabs/about-1.jpg" alt="Experienced Chauffeur" />
                                <span className="scx-arch__curtain"></span>
                            </div>

                            <div className="scx-circle">
                                <img src="/assets/img/cabs/cat-outstation.jpg" alt="Highway Road Experience" />
                            </div>

                            {/* spinning ring badge with years counter */}
                            <div className="scx-seal">
                                <span className="scx-seal__ring"></span>
                                <div className="scx-seal__core">
                                    <strong>{years}+</strong>
                                    <span>Years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const experienceCss = `
.scx-sec{
    --scx-theme: var(--theme-color, #1ca8cb);
    --scx-title: var(--title-color, #113d48);
    --scx-body: var(--body-color, #6e7070);
    background:#f8fbfb; position:relative; overflow:hidden;
}
.scx-sec *{box-sizing:border-box}

/* ---------- content ---------- */
.scx-content .title-area > *{opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .8s cubic-bezier(.2,.8,.2,1)}
.is-in .scx-content .title-area > *{opacity:1; transform:none}
.is-in .scx-content .title-area > *:nth-child(2){transition-delay:.12s}
.is-in .scx-content .title-area > *:nth-child(3){transition-delay:.24s}

.scx-steps{list-style:none; margin:30px 0 0; padding:0; position:relative; display:grid; gap:10px}
.scx-steps__line{
    position:absolute; left:27px; top:28px; bottom:28px; width:3px; border-radius:3px;
    background:#dbe6e8; overflow:hidden;
}
.scx-steps__line::after{
    content:''; position:absolute; inset:0; background:var(--scx-theme);
    transform:scaleY(0); transform-origin:top; transition:transform 1.8s cubic-bezier(.5,0,.2,1) .3s;
}
.is-in .scx-steps__line::after{transform:scaleY(1)}

.scx-step{
    position:relative; display:flex; gap:22px; align-items:flex-start;
    padding:14px 18px 14px 0; border-radius:18px;
    opacity:0; transform:translateX(-30px);
    transition:opacity .6s ease calc(.35s + var(--i) * .25s), transform .7s cubic-bezier(.2,.8,.2,1) calc(.35s + var(--i) * .25s), background .3s, padding .3s;
}
.is-in .scx-step{opacity:1; transform:none}
.scx-step:hover{background:#fff; padding-left:6px; box-shadow:0 14px 30px -18px rgba(17,61,72,.35)}

.scx-step__node{
    position:relative; z-index:1; flex:none; width:56px; height:56px; border-radius:50%;
    display:grid; place-items:center; font-size:20px;
    background:#fff; color:var(--scx-theme); border:3px solid var(--scx-theme);
    transition:background .35s, color .35s, transform .5s;
}
.scx-step:hover .scx-step__node{background:var(--scx-theme); color:#fff; transform:rotate(360deg)}
.is-in .scx-step__node{animation:scx-pulse 2.4s ease-out calc(1s + var(--i) * .25s) 1}
@keyframes scx-pulse{
    0%{box-shadow:0 0 0 0 color-mix(in srgb, var(--scx-theme) 45%, transparent)}
    100%{box-shadow:0 0 0 18px transparent}
}

.scx-step__big{
    font-size:clamp(26px,3vw,36px); font-weight:800; line-height:1.05; color:var(--scx-theme);
    font-variant-numeric:tabular-nums;
}
.scx-step__title{font-size:17px; font-weight:700; color:var(--scx-title); margin:2px 0 6px}
.scx-step__desc{font-size:14px; line-height:1.6; color:var(--scx-body); margin:0; max-width:52ch}

.scx-cta{opacity:0; transform:translateY(18px); transition:opacity .7s ease 1.3s, transform .7s ease 1.3s}
.is-in .scx-cta{opacity:1; transform:none}
.scx-call{
    display:inline-flex; align-items:center; padding:12px 20px; border-radius:50px;
    background:#fff; border:1px solid #d8e5e7; color:var(--scx-title); font-size:14px; text-decoration:none;
    transition:all .3s ease;
}
.scx-call:hover{border-color:var(--scx-theme); color:var(--scx-theme); background:#f0f8fa}

/* ---------- visual ---------- */
.scx-visual{position:relative; max-width:460px; margin:0 auto; padding:0 0 70px}
.scx-arch{
    position:relative; overflow:hidden; width:82%; height:480px; margin-left:auto;
    border-radius:999px 999px 28px 28px; box-shadow:0 26px 50px -26px rgba(17,61,72,.5);
}
.scx-arch img{
    width:100%; height:100%; object-fit:cover; display:block;
    transform:scale(1.3); transition:transform 1.8s cubic-bezier(.2,.8,.2,1);
}
.is-in .scx-arch img{transform:scale(1)}
.scx-arch:hover img{transform:scale(1.07)}
.scx-arch__curtain{
    position:absolute; inset:0; background:var(--scx-theme);
    transform-origin:bottom; transition:transform 1.1s cubic-bezier(.77,0,.18,1) .1s;
}
.is-in .scx-arch__curtain{transform:scaleY(0)}

.scx-circle{
    position:absolute; left:0; bottom:20px; width:46%; aspect-ratio:1; border-radius:50%;
    overflow:hidden; border:7px solid #f8fbfb; z-index:2;
    box-shadow:0 18px 36px -16px rgba(17,61,72,.5);
    transform:scale(0); transition:transform .8s cubic-bezier(.34,1.56,.64,1) .9s;
}
.is-in .scx-circle{transform:scale(1)}
.scx-circle img{width:100%; height:100%; object-fit:cover; display:block}

.scx-seal{
    position:absolute; top:26px; left:4px; width:112px; height:112px; z-index:3;
    display:grid; place-items:center;
    opacity:0; transform:scale(.4); transition:opacity .6s ease 1.1s, transform .8s cubic-bezier(.34,1.56,.64,1) 1.1s;
}
.is-in .scx-seal{opacity:1; transform:scale(1)}
.scx-seal__ring{
    position:absolute; inset:0; border-radius:50%;
    background:conic-gradient(var(--scx-theme), #fff 30%, var(--scx-theme) 60%, #fff 85%, var(--scx-theme));
    animation:scx-spin 9s linear infinite;
}
.scx-seal__core{
    position:relative; width:90px; height:90px; border-radius:50%; background:var(--scx-title); color:#fff;
    display:grid; place-content:center; text-align:center;
}
.scx-seal__core strong{font-size:26px; line-height:1; font-weight:800; font-variant-numeric:tabular-nums}
.scx-seal__core span{font-size:12px; opacity:.85}
@keyframes scx-spin{to{transform:rotate(360deg)}}

.scx-rating{
    position:absolute; right:0; bottom:0; z-index:4; display:flex; align-items:center; gap:10px;
    background:#113d48; color:#fff; padding:10px 18px; border-radius:30px; font-size:13px;
    box-shadow:0 10px 25px rgba(0,0,0,.2);
    opacity:0; transform:translateY(20px); transition:opacity .6s ease 1.4s, transform .7s ease 1.4s;
}
.is-in .scx-rating{opacity:1; transform:none; animation:scx-float 4s ease-in-out 2.2s infinite}
.scx-rating__stars{color:#ffc400; font-size:12px; display:flex; gap:2px}
@keyframes scx-float{0%,100%{translate:0 0}50%{translate:0 -7px}}

/* ---------- responsive ---------- */
@media (max-width:991px){
    .scx-visual{max-width:420px}
    .scx-arch{height:420px}
}
@media (max-width:575px){
    .scx-arch{height:340px; width:86%}
    .scx-seal{width:92px; height:92px; top:14px}
    .scx-seal__core{width:74px; height:74px}
    .scx-seal__core strong{font-size:21px}
    .scx-rating{font-size:12px; padding:8px 14px; right:-4px}
    .scx-step{gap:16px}
    .scx-step__node{width:48px; height:48px; font-size:17px}
    .scx-steps__line{left:23px}
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
    .scx-sec *, .scx-sec *::after{animation:none !important; transition:none !important}
    .scx-content .title-area > *, .scx-step, .scx-cta, .scx-seal, .scx-rating{opacity:1 !important; transform:none !important}
    .scx-circle{transform:scale(1) !important}
    .scx-arch__curtain{display:none}
    .scx-arch img{transform:none !important}
    .scx-steps__line::after{transform:scaleY(1) !important}
}
`

export default ExperienceSection