import React, { useEffect, useRef, useState } from 'react'
import usePublicContent from '../../services/usePublicContent';

const items = [
    {
        tag: "Our Vision",
        title: "Safe, Punctual & Inspiring Travel",
        text: "To be the most preferred and trusted taxi and travel partner, setting the benchmark for passenger safety, punctuality, and comfort on every road we navigate.",
        image: "/assets/img/cabs/about-vision.jpg",
        icon: "/assets/img/icon/map3.svg",
        points: [
            "GPS-monitored safe highway and city journeys",
            "Zero compromise on vehicle hygiene and safety standards",
            "Forward-thinking, comfortable and dependable travel"
        ]
    },
    {
        tag: "Our Mission",
        title: "Customer-First Taxi Hospitality",
        text: "To deliver prompt, transparent, and affordable cab rides with courteous professional chauffeurs, on-time pickups, and 24/7 dedicated support for every journey.",
        image: "/assets/img/cabs/about-mission.jpg",
        icon: "/assets/img/icon/guide.svg",
        points: [
            "Polite, background-verified route-expert drivers",
            "100% transparent pricing without hidden or surge fees",
            "Guaranteed on-time doorstep pickup & 24/7 live assistance"
        ]
    }
];

// true while the element is in view, false once it leaves -> animation replays on every scroll
function useInView(threshold = 0.3) {
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

function Row({ it, index }) {
    const [ref, seen] = useInView()
    return (
        <article ref={ref} className={`vmx-row ${index % 2 ? 'is-flip' : ''} ${seen ? 'is-in' : ''}`}>
            {/* photo with curtain reveal */}
            <div className="vmx-photo">
                <div className="vmx-photo__frame">
                    <img src={it.image} alt={it.title} />
                    <span className="vmx-curtain"></span>
                </div>
                <span className="vmx-ring"></span>
                <span className="vmx-tag">{it.tag}</span>
            </div>

            {/* text */}
            <div className="vmx-body">
                <h3 className="vmx-title">{it.title}</h3>
                <p className="vmx-text">{it.text}</p>

                <ul className="vmx-points">
                    {it.points.map((pt, i) => (
                        <li key={i} style={{ '--d': `${0.55 + i * 0.18}s` }}>
                            <span>{pt}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

function VisionMission() {
    const [headRef, headSeen] = useInView(0.4)
    const managedAbout = usePublicContent('about', []);
    const dynamicItems = items.map((item, index) => {
        const match = managedAbout.find(entry => entry.slug === (index === 0 ? 'vision' : 'mission'));
        return match ? { ...item, tag: match.tag || item.tag, title: match.heading || match.title || item.title, text: match.text || match.description || item.text, image: match.image || item.image, points: match.points?.length ? match.points : item.points } : item;
    });

    return (
        <section className="space-bottom position-relative overflow-hidden vmx-section" id="vision-mission-sec">
            <style>{css}</style>

            <div className="container">
                <div ref={headRef} className={`title-area text-center mb-50 vmx-head ${headSeen ? 'is-in' : ''}`}>
                    <span className="sub-title style1">Core Purpose</span>
                    <h2 className="sec-title heading">Our Vision &amp; Mission</h2>
                    <p className="sec-text mx-auto" style={{ maxWidth: '640px' }}>
                        Guided by a clear vision for highway safety and a steadfast mission to deliver world-class taxi hospitality on every ride.
                    </p>
                </div>

                <div className="vmx-flow">
                    {/* dashed road joining the two rows, with a dot travelling along it */}
                    <div className="vmx-road" aria-hidden="true">
                        <span className="vmx-road__dot"></span>
                    </div>

                    {dynamicItems.map((it, i) => (
                        <Row it={it} index={i} key={it.tag} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const css = `
.vmx-section{
  /* uses your site's own theme colors; fallbacks only apply if a variable is missing */
  --vmx-theme: var(--theme-color, #1ca8cb);
  --vmx-title: var(--title-color, #1d2026);
  --vmx-body: var(--body-color, #5d6470);
  --vmx-soft: var(--smoke-color, #f5f5f5);
}
.vmx-section *{box-sizing:border-box}

/* heading */
.vmx-head > *{opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .8s cubic-bezier(.2,.8,.2,1)}
.vmx-head.is-in > *{opacity:1; transform:none}
.vmx-head.is-in > *:nth-child(2){transition-delay:.12s}
.vmx-head.is-in > *:nth-child(3){transition-delay:.24s}

/* flow wrapper + road */
.vmx-flow{position:relative; display:grid; gap:90px}
.vmx-road{
  position:absolute; left:50%; top:60px; bottom:60px; width:0; transform:translateX(-50%);
  border-left:3px dashed var(--vmx-theme); opacity:.45; pointer-events:none;
}
.vmx-road__dot{
  position:absolute; left:-9px; top:0; width:15px; height:15px; border-radius:50%;
  background:var(--vmx-theme); box-shadow:0 0 0 6px color-mix(in srgb, var(--vmx-theme) 25%, transparent);
  animation:vmx-travel 5s ease-in-out infinite;
}
@keyframes vmx-travel{0%{top:0}50%{top:calc(100% - 15px)}100%{top:0}}

/* row */
.vmx-row{
  position:relative; z-index:1;
  display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;
}
.vmx-row > *{min-width:0}
.vmx-photo{grid-column:1; grid-row:1}
.vmx-body{grid-column:2; grid-row:1; text-align:left}
.vmx-row.is-flip .vmx-photo{grid-column:2}
.vmx-row.is-flip .vmx-body{grid-column:1}

/* photo */
.vmx-photo{position:relative; max-width:520px; width:100%; justify-self:center}
.vmx-photo__frame{
  position:relative; overflow:hidden; border-radius:28px 110px 28px 110px; aspect-ratio:5/4;
  box-shadow:0 26px 50px -26px rgba(0,0,0,.45);
}
.vmx-row.is-flip .vmx-photo__frame{border-radius:110px 28px 110px 28px}
.vmx-photo__frame img{
  width:100%; height:100%; object-fit:cover; display:block;
  transform:scale(1.25); transition:transform 1.6s cubic-bezier(.2,.8,.2,1);
}
.vmx-row.is-in .vmx-photo__frame img{transform:scale(1)}
.vmx-photo:hover .vmx-photo__frame img{transform:scale(1.06)}
.vmx-curtain{
  position:absolute; inset:0; background:var(--vmx-theme);
  transform-origin:left; transition:transform 1s cubic-bezier(.77,0,.18,1) .1s;
}
.vmx-row.is-flip .vmx-curtain{transform-origin:right}
.vmx-row.is-in .vmx-curtain{transform:scaleX(0)}

.vmx-ring{
  position:absolute; width:100%; height:100%; left:18px; top:18px; z-index:-1;
  border:3px solid var(--vmx-theme); border-radius:28px 110px 28px 110px; opacity:.5;
  transition:transform .6s ease;
}
.vmx-row.is-flip .vmx-ring{left:-18px; border-radius:110px 28px 110px 28px}
.vmx-photo:hover .vmx-ring{transform:translate(8px,8px)}
.vmx-row.is-flip .vmx-photo:hover .vmx-ring{transform:translate(-8px,8px)}

.vmx-icon{
  position:absolute; bottom:-24px; right:30px; width:84px; height:84px; border-radius:50%;
  background:var(--vmx-theme); display:grid; place-items:center; z-index:2;
  box-shadow:0 14px 28px -10px rgba(0,0,0,.35); border:4px solid #fff;
  transform:scale(0); transition:transform .7s cubic-bezier(.34,1.56,.64,1) .9s;
}
.vmx-row.is-flip .vmx-icon{right:auto; left:30px}
.vmx-row.is-in .vmx-icon{transform:scale(1); animation:vmx-bob 3.6s ease-in-out 1.8s infinite}
.vmx-icon img{width:40px; height:40px; object-fit:contain}
@keyframes vmx-bob{0%,100%{translate:0 0}50%{translate:0 -8px}}

/* text */
.vmx-body > *{opacity:0; transform:translateX(34px); transition:opacity .7s ease, transform .8s cubic-bezier(.2,.8,.2,1)}
.vmx-row.is-flip .vmx-body > *{transform:translateX(-34px)}
.vmx-row.is-in .vmx-body > *{opacity:1; transform:none}
.vmx-row.is-in .vmx-body > *:nth-child(1){transition-delay:.25s}
.vmx-row.is-in .vmx-body > *:nth-child(2){transition-delay:.35s}
.vmx-row.is-in .vmx-body > *:nth-child(3){transition-delay:.45s}

.vmx-tag{
  position:absolute; top:22px; left:22px; z-index:3;
  padding:8px 20px; border-radius:30px; font-weight:600; font-size:14px; line-height:1.2;
  background:var(--vmx-theme); color:#fff; box-shadow:0 10px 22px -10px rgba(0,0,0,.5);
  opacity:0; transform:translateY(-14px) scale(.9);
  transition:opacity .5s ease, transform .6s cubic-bezier(.34,1.56,.64,1);
}
.vmx-row.is-flip .vmx-tag{left:auto; right:22px}
.vmx-row.is-in .vmx-tag{opacity:1; transform:none; transition-delay:.9s}
.vmx-title{
  display:block; width:fit-content;
  color:var(--vmx-title); font-size:clamp(26px,3vw,38px); line-height:1.15; margin:0 0 16px;
  padding-bottom:8px;
  background:linear-gradient(var(--vmx-theme),var(--vmx-theme)) 0 100%/0 4px no-repeat;
  transition:opacity .7s ease, transform .8s cubic-bezier(.2,.8,.2,1), background-size 1s ease .8s;
}
.vmx-row.is-in .vmx-title{background-size:100% 4px}
.vmx-text{color:var(--vmx-body); line-height:1.8; margin:0 0 22px; max-width:54ch; overflow-wrap:break-word}

/* points */
.vmx-points{list-style:none; margin:0; padding:0; display:grid; gap:12px}
.vmx-points li{
  display:flex; align-items:center; gap:14px; padding:14px 18px; border-radius:14px;
  background:var(--vmx-soft); color:var(--vmx-title); font-weight:500;
  opacity:0; transform:translateY(16px);
  transition:opacity .6s ease var(--d), transform .6s cubic-bezier(.2,.8,.2,1) var(--d), box-shadow .3s, background .3s;
}
.vmx-row.is-in .vmx-points li{opacity:1; transform:none}
.vmx-check{
  flex:none; width:30px; height:30px; border-radius:50%; display:grid; place-items:center;
  background:var(--vmx-theme); color:#fff; font-size:13px; transition:transform .4s ease;
}
.vmx-points li:hover{background:#fff; box-shadow:0 12px 26px -14px rgba(0,0,0,.35); transform:translateX(8px)}
.vmx-points li:hover .vmx-check{transform:rotate(360deg) scale(1.12)}

/* responsive */
@media (max-width:991px){
  .vmx-flow{gap:70px}
  .vmx-road{display:none}
  .vmx-row{grid-template-columns:1fr; gap:46px}
  .vmx-photo, .vmx-body, .vmx-row.is-flip .vmx-photo, .vmx-row.is-flip .vmx-body{grid-column:1}
  .vmx-photo{grid-row:1}
  .vmx-body{grid-row:2}
  .vmx-body > *, .vmx-row.is-flip .vmx-body > *{transform:translateY(24px)}
  .vmx-row.is-in .vmx-body > *{transform:none}
}
@media (max-width:480px){
  .vmx-photo__frame, .vmx-row.is-flip .vmx-photo__frame, .vmx-ring, .vmx-row.is-flip .vmx-ring{border-radius:22px 70px 22px 70px}
  .vmx-icon{width:68px; height:68px; right:20px}
  .vmx-row.is-flip .vmx-icon{left:20px}
  .vmx-icon img{width:32px; height:32px}
}

/* reduced motion */
@media (prefers-reduced-motion:reduce){
  .vmx-section *{animation:none !important; transition:none !important}
  .vmx-head > *, .vmx-body > *, .vmx-points li{opacity:1 !important; transform:none !important}
  .vmx-curtain{display:none}
  .vmx-tag{opacity:1 !important; transform:none !important}
  .vmx-icon{transform:scale(1) !important}
  .vmx-photo__frame img{transform:none !important}
  .vmx-title{background-size:100% 4px !important}
}
`

export default VisionMission
