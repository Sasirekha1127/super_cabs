import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import siteConfig from '../data/siteConfig'
import usePublicContent from '../../services/usePublicContent';
import { getApiOrigin } from '../../services/api';

const resolveImage = (img, fallback) => {
   if (!img) return fallback;
   if (img.startsWith('http')) return img;
   if (img.startsWith('/uploads')) return `${getApiOrigin()}${img}`;
   return img;
};

const features = [
   {
      title: 'Wide Range of Services',
      text: 'City rides, outstation, airport transfers and corporate packages.',
      img: '/assets/img/cabs/about-vision.jpg',
      icon: 'fa-route',
   },
   {
      title: 'Safety First Always',
      text: 'Thoroughly sanitized cars and responsible, defensive driving.',
      img: '/assets/img/cabs/about-2.jpg',
      icon: 'fa-shield-heart',
   },
   {
      title: 'Professional Drivers',
      text: 'Polite, verified chauffeurs who know every highway and city route.',
      img: '/assets/img/cabs/about-1.jpg',
      icon: 'fa-id-badge',
   },
]

// Counts up from 0 to `to` once the section scrolls into view
function useCountUp(to, start, duration = 1400) {
   const [val, setVal] = useState(0)
   useEffect(() => {
      if (!start) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
         setVal(to)
         return
      }
      let raf
      const t0 = performance.now()
      const tick = (now) => {
         const p = Math.min((now - t0) / duration, 1)
         const eased = 1 - Math.pow(1 - p, 3)
         setVal(Math.round(to * eased))
         if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
   }, [to, start, duration])
   return val
}

function AboutFour() {
   const about = usePublicContent('about', []).find(item => item.slug === 'company');
   const ref = useRef(null)
   const [inView, setInView] = useState(false)
   const years = useCountUp(parseInt(siteConfig.experienceYears, 10) || 10, inView)

   useEffect(() => {
      const el = ref.current
      if (!el) return
      const io = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setInView(true)
               io.disconnect()
            }
         },
         { threshold: 0.25 }
      )
      io.observe(el)
      return () => io.disconnect()
   }, [])

   return (
      <section ref={ref} id="about-sec" className={`sc-about ${inView ? 'is-in' : ''}`}>
         <style>{css}</style>

         <div className="sc-wrap">
            {/* ---------- Photos ---------- */}
            <div className="sc-photos">
               <figure className="sc-ph sc-ph--main">
                  <img src={resolveImage(about?.image, '/assets/img/cabs/about-1.jpg')} alt={about?.alt || 'Super Cabs Fleet'} />
               </figure>
               <figure className="sc-ph sc-ph--side">
                  <img src={resolveImage(about?.sideImage, '/assets/img/cabs/about-2.jpg')} alt="Toyota Innova Crysta MPV" />
               </figure>
               <figure className="sc-ph sc-ph--small">
                  <img src={resolveImage(about?.smallImage, '/assets/img/cabs/about-3.jpg')} alt="Super Cabs Fleet Lineup" />
               </figure>

               <div className="sc-badge">
                  <span>
                     <strong>{about?.experienceYears || years}+ Years</strong>
                     <small>{about?.badgeText || 'Safe & Trusted Trips'}</small>
                  </span>
               </div>
            </div>

            {/* ---------- Content ---------- */}
            <div className="sc-content">
               <p className="sc-kicker">{about?.subheading || 'Welcome to Super Cabs'}</p>
               <h2 className="sc-title">{about?.heading || 'Redefining Outstation Travel in South India'}</h2>

               <p className="sc-text">
                  {about?.description || "At Super Cabs, our mission is to redefine outstation travel by providing highly reliable, safe, and pocket-friendly one way drop taxi services. We believe that travelers shouldn't have to pay double fare for one-way journeys. By offering dedicated drop taxi services across Tamil Nadu, Bangalore, and Pondicherry, we ensure that you only pay for the distance you actually travel. Our service is designed to offer maximum comfort and flexibility, whether you are booking a quick trip or a long-distance ride."}
               </p>
               <p className="sc-text">
                  {about?.fleetDescription || 'We take pride in our diverse and well-maintained fleet, catering to all your travel requirements. From fuel-efficient hatchbacks and comfortable sedans like the New Swift Dzire and Aura, to spacious SUVs and premium vehicles like Innova and Crysta, we have the perfect ride for every occasion. We operate heavily across major routes, including the highly requested Chennai to Bangalore taxi, Chennai to Trichy taxi, Chennai to Madurai taxi, Chennai to Coimbatore taxi, Chennai to Salem taxi, and Chennai to Pondicherry taxi. Each ride is optimized for safety and convenience, ensuring a smooth travel experience.'}
               </p>
               <p className="sc-text">
                  {about?.secondaryDescription || 'Safety and transparency are the core pillars of Super Cabs. All our drivers are thoroughly verified, highly experienced, and familiar with highways across South India, guaranteeing a secure trip. We offer a 100% transparent billing system with absolutely zero hidden fees, GST, or driver beta surprises. With our round-the-clock 24/7 customer booking and dispatch support, we ensure that help is always just a phone call away. Choose us for your next journey and experience the premier standard in drop taxi travel.'}
               </p>

               <ul className="sc-list">
                  {features.map((f) => (
                     <li className="sc-item" key={f.title}>
                        <img src={f.img} alt={f.title} />
                        <div>
                           <h5>{f.title}</h5>
                           <p>{f.text}</p>
                        </div>
                     </li>
                  ))}
               </ul>

               <Link to="/contact" className="sc-btn">
                  <span>Contact Us</span>
                  <i className="fa-solid fa-taxi"></i>
               </Link>
            </div>
         </div>
      </section>
   )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

.sc-about{
  --asphalt:#16181d;
  --taxi:var(--theme-color, #1ca8cb);
  --taxi-deep:#168ba8;
  --taxi-glow:rgba(28, 168, 203, 0.35);
  --paper:#fbfaf6;
  --ink:#1d2026;
  --muted:#5d6470;
  position:relative; overflow:hidden;
  background:var(--paper);
  padding:100px 0 90px;
  font-family:'DM Sans',system-ui,sans-serif;
  color:var(--ink);
}
.sc-about *{box-sizing:border-box}
.sc-wrap{
  max-width:1200px; margin:0 auto; padding:0 20px;
  display:grid; grid-template-columns:1.05fr 1fr; gap:70px; align-items:center;
}

/* ---------- photos ---------- */
.sc-photos{position:relative; min-height:560px}
.sc-ph{margin:0; position:absolute; overflow:hidden; border-radius:22px;
  box-shadow:0 18px 40px -18px rgba(22,24,29,.45);
  opacity:0; transform:translateY(30px) rotate(var(--r,0deg));
  transition:opacity .7s ease, transform .9s cubic-bezier(.2,.8,.2,1);}
.sc-ph img{width:100%; height:100%; object-fit:cover; display:block; transition:transform .8s ease}
.sc-ph:hover img{transform:scale(1.07)}
.sc-ph--main{--r:-2deg; top:0; left:0; width:68%; height:420px; transition-delay:.05s}
.sc-ph--side{--r:3deg; top:90px; right:0; width:42%; height:300px; border:6px solid var(--paper); transition-delay:.2s}
.sc-ph--small{--r:-3deg; bottom:0; left:22%; width:40%; height:200px; border:6px solid var(--paper); transition-delay:.35s}
.is-in .sc-ph{opacity:1; transform:translateY(0) rotate(var(--r,0deg))}

.sc-badge{
  position:absolute; right:2%; bottom:30px; z-index:3;
  display:flex; align-items:center; gap:14px;
  background:var(--asphalt); color:#fff; padding:14px 22px 14px 14px; border-radius:60px;
  box-shadow:0 14px 30px -10px rgba(0,0,0,.5);
  animation:sc-float 4s ease-in-out infinite;
}
.sc-badge__icon{width:48px;height:48px;border-radius:50%;background:var(--taxi);color:#ffffff;
  display:grid;place-items:center;font-size:20px}
.sc-badge strong{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:20px;line-height:1.1}
.sc-badge small{opacity:.75;font-size:13px}
@keyframes sc-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

/* ---------- content ---------- */
.sc-content > *{opacity:0; transform:translateX(28px); transition:opacity .7s ease, transform .8s cubic-bezier(.2,.8,.2,1)}
.is-in .sc-content > *{opacity:1; transform:none}
.is-in .sc-content > *:nth-child(1){transition-delay:.1s}
.is-in .sc-content > *:nth-child(2){transition-delay:.2s}
.is-in .sc-content > *:nth-child(3){transition-delay:.3s}
.is-in .sc-content > *:nth-child(4){transition-delay:.4s}
.is-in .sc-content > *:nth-child(5){transition-delay:.5s}
.is-in .sc-content > *:nth-child(6){transition-delay:.6s}
.is-in .sc-content > *:nth-child(7){transition-delay:.7s}

.sc-kicker{
  display:inline-block; margin:0 0 14px; padding:6px 16px; border-radius:30px;
  background:var(--taxi); color:#ffffff; font-weight:600; font-size:14px;
}
.sc-title{
  font-family:'Bricolage Grotesque',sans-serif; font-weight:800;
  font-size:clamp(26px,3.2vw,36px); line-height:1.2; letter-spacing:-.02em; margin:0 0 22px;
}
.sc-text{color:var(--muted); line-height:1.75; margin:0 0 14px; max-width:56ch; font-size:15px}

.sc-list{list-style:none; margin:28px 0 34px; padding:0; display:grid; gap:14px}
.sc-item{
  position:relative; display:grid; grid-template-columns:64px 1fr; gap:16px; align-items:center;
  padding:12px 18px 12px 12px; background:#fff; border-radius:16px;
  border:1px solid #ece9df; overflow:hidden; cursor:default;
  transition:transform .35s ease, box-shadow .35s ease, border-color .35s ease;
}
.sc-item::before{
  content:''; position:absolute; inset:0; background:var(--taxi); transform:translateX(-101%);
  transition:transform .45s cubic-bezier(.2,.8,.2,1); z-index:0;
}
.sc-item > *{position:relative; z-index:1}
.sc-item:hover{transform:translateX(8px); border-color:var(--taxi-deep); box-shadow:0 14px 28px -16px var(--taxi-glow)}
.sc-item:hover::before{transform:translateX(0)}
.sc-item img{width:64px;height:64px;border-radius:12px;object-fit:cover}
.sc-item h5{margin:0 0 2px; font-family:'Bricolage Grotesque',sans-serif; font-size:18px; font-weight:600; transition:color .3s}
.sc-item:hover h5{color:#ffffff}
.sc-item p{margin:0; font-size:14px; color:var(--muted); line-height:1.45; transition:color .3s}
.sc-item:hover p{color:rgba(255,255,255,.92)}
.sc-item__icon{font-size:20px; opacity:.35; transition:transform .5s ease, opacity .3s, color .3s}
.sc-item:hover .sc-item__icon{opacity:1; color:#ffffff; transform:rotate(360deg) scale(1.15)}

.sc-btn{
  display:inline-flex; align-items:center; gap:12px; padding:16px 32px; border-radius:60px;
  background:var(--taxi); color:#ffffff !important; text-decoration:none; font-weight:600;
  position:relative; overflow:hidden; transition:transform .3s ease, box-shadow .3s ease;
  box-shadow:0 6px 20px -4px var(--taxi-glow);
}
.sc-btn::before{content:''; position:absolute; inset:0; background:var(--taxi-deep); transform:translateY(101%);
  transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.sc-btn > *{position:relative; z-index:1}
.sc-btn:hover{color:#ffffff !important; transform:translateY(-2px); box-shadow:0 10px 26px -4px var(--taxi-glow)}
.sc-btn:hover::before{transform:translateY(0)}
.sc-btn i{transition:transform .5s ease}
.sc-btn:hover i{transform:translateX(8px)}
.sc-btn:focus-visible{outline:3px solid var(--taxi-deep); outline-offset:3px}

/* ---------- responsive ---------- */
@media (max-width:991px){
  .sc-about{padding-top:70px}
  .sc-wrap{grid-template-columns:1fr; gap:50px}
  .sc-photos{min-height:480px; max-width:560px; margin:0 auto; width:100%}
  .sc-ph--main{height:340px}
  .sc-ph--side{height:250px; top:70px}
}
@media (max-width:520px){
  .sc-photos{min-height:420px}
  .sc-ph--main{height:290px}
  .sc-ph--side{height:210px}
  .sc-ph--small{height:150px}
  .sc-item{grid-template-columns:56px 1fr}
  .sc-item__icon{display:none}
  .sc-item img{width:56px;height:56px}
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
  .sc-about *,.sc-about *::before{animation:none !important; transition:none !important}
  .sc-content > *{opacity:1 !important; transform:none !important}
  .sc-ph{opacity:1 !important; transform:rotate(var(--r,0deg)) !important}
}
`

export default AboutFour
