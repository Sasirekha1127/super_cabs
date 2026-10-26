import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// progress = how far the gauge ring fills (0 to 1) - purely visual
const counters = [
    { value: 24, suffix: "/7", title: "Booking Support", icon: "fa-headset", progress: 1 },
    { value: 6, suffix: "", title: "Taxi Services", icon: "fa-taxi", progress: 0.75 },
    { value: 6, suffix: "", title: "Vehicle Types", icon: "fa-car-side", progress: 0.75 },
    { value: 8, suffix: "", title: "Tour Packages", icon: "fa-map-location-dot", progress: 0.9 }
];

const R = 54;
const CIRC = 2 * Math.PI * R;

const CounterOne = () => {
    // triggerOnce is false so everything replays each time the section scrolls into view
    const { ref, inView } = useInView({ threshold: 0.3 });

    return (
        <div
            className={`counter-area space scc-sec ${inView ? "is-in" : ""}`}
            ref={ref}
            style={{
                backgroundImage:
                    "linear-gradient(135deg, rgba(17, 61, 72, 0.94) 0%, rgba(9, 36, 43, 0.96) 100%), url(/assets/img/cabs/cta-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <style>{css}</style>

            <div className="container position-relative">
                <div className="scc-head text-center">
                    <span className="scc-pill">Company Highlights</span>
                    <h2 className="scc-title">Our Fleet &amp; Service Milestones</h2>
                    <span className="scc-bar"></span>
                </div>

                <div className="scc-grid">
                    {counters.map((c, i) => (
                        <div className="scc-card" key={c.title} style={{ "--i": i }}>
                            <div className="scc-gauge">
                                <svg viewBox="0 0 120 120" className="scc-svg" aria-hidden="true">
                                    <circle className="scc-track" cx="60" cy="60" r={R} />
                                    <circle
                                        className="scc-fill"
                                        cx="60"
                                        cy="60"
                                        r={R}
                                        style={{
                                            strokeDasharray: CIRC,
                                            strokeDashoffset: inView ? CIRC * (1 - c.progress) : CIRC
                                        }}
                                    />
                                </svg>
                                <span className="scc-ticks"></span>
                                <div className="scc-num">
                                    <strong>
                                        {inView ? (
                                            <CountUp key="on" start={0} end={c.value} duration={2} />
                                        ) : (
                                            0
                                        )}
                                        {c.suffix}
                                    </strong>
                                </div>
                                <span className="scc-icon">
                                    <i className={`fa-solid ${c.icon}`}></i>
                                </span>
                            </div>
                            <h6 className="scc-label">{c.title}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const css = `
.scc-sec{position:relative; overflow:hidden}
.scc-sec *{box-sizing:border-box}

/* heading */
.scc-head{margin-bottom:60px}
.scc-head > *{opacity:0; transform:translateY(20px); transition:opacity .7s ease, transform .8s cubic-bezier(.2,.8,.2,1)}
.is-in .scc-head > *{opacity:1; transform:none}
.is-in .scc-head > *:nth-child(2){transition-delay:.12s}
.is-in .scc-head > *:nth-child(3){transition-delay:.24s}
.scc-pill{
    display:inline-block; padding:7px 20px; border-radius:30px; font-weight:600; font-size:14px;
    background:rgba(28,168,203,.2); color:var(--theme-color, #1ca8cb); margin-bottom:14px;
}
.scc-title{color:#fff; margin:0 0 18px; font-size:clamp(28px,4vw,44px)}
.scc-bar{display:block; width:0; height:4px; border-radius:4px; margin:0 auto; background:var(--theme-color, #1ca8cb);
    transition:width 1s ease .5s !important}
.is-in .scc-bar{width:90px}

/* grid */
.scc-grid{position:relative; display:grid; grid-template-columns:repeat(4,1fr); gap:30px}

/* card */
.scc-card{
    position:relative; z-index:1; text-align:center; padding:0 10px 10px;
    opacity:0; transform:translateY(40px) scale(.9);
    transition:opacity .6s ease, transform .8s cubic-bezier(.34,1.56,.64,1);
}
.is-in .scc-card{
    opacity:1; transform:none;
    transition-delay:calc(.3s + var(--i) * .18s);
}

/* gauge */
.scc-gauge{position:relative; width:170px; height:170px; margin:0 auto 20px; display:grid; place-items:center;
    transition:transform .4s ease}
.scc-card:hover .scc-gauge{transform:translateY(-8px) scale(1.05)}
.scc-svg{position:absolute; inset:0; width:100%; height:100%; transform:rotate(-90deg)}
.scc-track{fill:rgba(255,255,255,.05); stroke:rgba(255,255,255,.14); stroke-width:6}
.scc-fill{
    fill:none; stroke:var(--theme-color, #1ca8cb); stroke-width:6; stroke-linecap:round;
    transition:stroke-dashoffset 2s cubic-bezier(.3,.7,.2,1) .4s, filter .3s;
    filter:drop-shadow(0 0 6px rgba(28,168,203,.55));
}
.scc-card:hover .scc-fill{filter:drop-shadow(0 0 14px rgba(28,168,203,.95))}

/* speedometer tick ring, slowly turning */
.scc-ticks{
    position:absolute; inset:-12px; border-radius:50%;
    background:repeating-conic-gradient(rgba(255,255,255,.28) 0 1.2deg, transparent 1.2deg 9deg);
    -webkit-mask:radial-gradient(circle, transparent 0 calc(100% - 7px), #000 calc(100% - 6px));
            mask:radial-gradient(circle, transparent 0 calc(100% - 7px), #000 calc(100% - 6px));
    animation:scc-spin 40s linear infinite;
}
@keyframes scc-spin{to{transform:rotate(360deg)}}

.scc-num{position:relative; z-index:1; color:#fff}
.scc-num strong{font-size:40px; font-weight:800; line-height:1; font-variant-numeric:tabular-nums}

.scc-icon{
    position:absolute; bottom:-6px; left:50%; width:42px; height:42px; margin-left:-21px; border-radius:50%;
    display:grid; place-items:center; background:var(--theme-color, #1ca8cb); color:#ffffff; font-size:17px;
    box-shadow:0 8px 18px -6px rgba(0,0,0,.6);
    transition:transform .5s ease;
}
.scc-card:hover .scc-icon{transform:rotate(360deg) scale(1.12)}

.scc-label{color:#fff; font-size:18px; font-weight:600; margin:0; position:relative; display:inline-block; padding-bottom:6px}
.scc-label::after{
    content:''; position:absolute; left:0; bottom:0; height:2px; width:100%; background:var(--theme-color, #1ca8cb);
    transform:scaleX(0); transform-origin:left; transition:transform .45s ease;
}
.scc-card:hover .scc-label::after{transform:scaleX(1)}

/* responsive */
@media (max-width:1199px){
    .scc-grid{grid-template-columns:repeat(2,1fr); row-gap:50px}
}
@media (max-width:480px){
    .scc-gauge{width:140px; height:140px}
    .scc-num strong{font-size:32px}
    .scc-label{font-size:16px}
}

/* reduced motion */
@media (prefers-reduced-motion:reduce){
    .scc-sec *{animation:none !important; transition:none !important}
    .scc-head > *, .scc-card{opacity:1 !important; transform:none !important}
    .scc-bar{width:90px !important}
}
`;

export default CounterOne;