import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api, { getApiOrigin } from '../services/api';
import siteConfig from './data/siteConfig';

const defaults = {
  '/': [
    'Super Cabs - Taxi Service | Local, Outstation, Airport & Tour Packages',
    'Reliable local, outstation, airport and corporate taxi services with transparent tariffs across South India. Book your ride 24/7.'
  ],
  '/about': [
    'About Super Cabs | Reliable Chauffeur Taxi Across South India',
    'Learn about Super Cabs - over 10+ years providing trusted one-way drop taxis, professional verified drivers, and 24/7 customer care.'
  ],
  '/booking': [
    'Online Cab Booking & Outstation Fare Calculator | Super Cabs',
    'Calculate live Google Maps road distance, real-time taxi fares, and book verified AC outstation and local cabs in seconds.'
  ],
  '/services': [
    'Taxi Services & Outstation Cabs | Super Cabs',
    'Explore our comprehensive cab services: one-way drop taxi, round-trip outstation, airport transfers, city rentals, and corporate travel.'
  ],
  '/services/one-way-round-trip': [
    'One-Way Drop Taxi & Round-Trip Outstation Cabs | Super Cabs',
    'Pay only for the single-direction drop with zero return fare charges, or retain a dedicated cab & chauffeur throughout your tour.'
  ],
  '/fleet': [
    'Taxi Fleet & Passenger Vehicles | Super Cabs',
    'Browse our clean, chilled AC vehicles: compact hatchbacks, modern comfort sedans (New Swift Dzire/Aura), family SUVs (Ertiga), Innova Crysta, and luxury tempo travellers.'
  ],
  '/tariff': [
    'Taxi Tariff Card & Per-KM Rates | Super Cabs',
    'Transparent taxi pricing across South India with zero hidden driver fees, clear per-km rates, and upfront fare calculations.'
  ],
  '/tours': [
    'South India Tour & Holiday Packages | Super Cabs',
    'Handcrafted private road trips to Ooty, Kodaikanal, Munnar, sacred temple circuits, and coastal beach getaways with courteous chauffeurs.'
  ],
  '/gallery': [
    'Vehicle Fleet & Travel Photo Gallery | Super Cabs',
    'Explore our verified fleet of sanitized cabs, comfortable interiors, scenic tour viewpoints, and happy customer moments.'
  ],
  '/contact': [
    'Contact Super Cabs | 24/7 Cab Booking & Customer Support',
    'Reach Super Cabs anytime via phone or WhatsApp for immediate cab dispatch, trip quotes, or customized tour enquiries.'
  ]
};

const cleanPath = (path) => path.replace(/\/+$/, '') || '/';

function upsertMeta(selector, attribute, key, content) {
  if (!content) return;
  const matches = [...document.head.querySelectorAll(selector)];
  let element = matches.shift();
  matches.forEach((node) => node.remove());
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function resolveAssetUrl(img) {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  if (img.startsWith('/uploads') || img.startsWith('uploads')) {
    return `${getApiOrigin()}${img.startsWith('/') ? '' : '/'}${img}`;
  }
  return `${window.location.origin}${img.startsWith('/') ? '' : '/'}${img}`;
}

export default function SeoManager({ settingsVersion }) {
  const location = useLocation();

  useEffect(() => {
    let active = true;
    const pathname = cleanPath(location.pathname);

    // Prevent search engine indexing of admin or private pages
    if (pathname === '/admin' || pathname.startsWith('/admin')) {
      document.title = 'Admin Portal | Super Cabs';
      upsertMeta('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
      return () => {
        active = false;
      };
    }

    (async () => {
      const [pagesRes, servicesRes, toursRes] = await Promise.all(
        ['page', 'service', 'tour'].map((type) =>
          api.get(`/content/public/${type}`).catch(() => ({ items: [] }))
        )
      );

      if (!active) return;

      const pages = pagesRes.items || [];
      const services = servicesRes.items || [];
      const tours = toursRes.items || [];

      // Determine page slug and matching record
      let record = null;
      let matchedType = 'page';

      if (pathname === '/') {
        record = pages.find((p) => p.slug === 'home');
      } else if (pathname === '/about') {
        record = pages.find((p) => p.slug === 'about');
      } else if (pathname === '/services') {
        record = pages.find((p) => p.slug === 'services');
      } else if (pathname === '/services/one-way-round-trip') {
        record = pages.find((p) => p.slug === 'oneway-roundtrip' || p.slug === 'one-way-round-trip') || pages.find((p) => p.slug === 'services');
      } else if (pathname.startsWith('/services/')) {
        matchedType = 'service';
        const serviceSlug = pathname.replace('/services/', '').replace(/\/$/, '');
        record = services.find((s) => s.slug === serviceSlug);
      } else if (pathname === '/fleet') {
        record = pages.find((p) => p.slug === 'fleet');
      } else if (pathname === '/tariff') {
        record = pages.find((p) => p.slug === 'tariff');
      } else if (pathname === '/tours') {
        record = pages.find((p) => p.slug === 'tours');
      } else if (pathname.startsWith('/tours/') || pathname.startsWith('/tour-details/')) {
        matchedType = 'tour';
        const tourSlug = pathname.replace(/^\/(?:tours|tour-details)\//, '').replace(/\/$/, '');
        record = tours.find((t) => t.slug === tourSlug || String(t._id) === tourSlug || String(t.id) === tourSlug);
      } else if (pathname === '/gallery') {
        record = pages.find((p) => p.slug === 'gallery');
      } else if (pathname === '/contact') {
        record = pages.find((p) => p.slug === 'contact');
      }

      // Extract SEO fields from data.seo or fallback
      const seo = record?.data?.seo || {};
      const base = defaults[pathname] || defaults['/'];

      const title =
        seo.title ||
        record?.data?.metaTitle ||
        record?.data?.seoTitle ||
        (record?.title && matchedType !== 'page' ? `${record.title} | Super Cabs` : null) ||
        base[0];

      const description =
        seo.description ||
        record?.data?.metaDescription ||
        record?.data?.description ||
        record?.data?.text ||
        base[1];

      const keywords =
        seo.keywords ||
        record?.data?.keywords ||
        'super cabs, taxi service, outstation taxi, one way drop taxi, airport cabs, round trip taxi, chennai drop taxi, coimbatore taxi';

      const isNoindex = seo.noindex === true || (record?.data?.robots || '').toLowerCase().includes('noindex');
      const isNofollow = seo.nofollow === true || (record?.data?.robots || '').toLowerCase().includes('nofollow');
      const robotsValue = isNoindex
        ? isNofollow ? 'noindex, nofollow' : 'noindex, follow'
        : 'index, follow';

      // 1. Title & Meta Description & Robots & Keywords
      document.title = title;
      upsertMeta('meta[name="description"]', 'name', 'description', description);
      upsertMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
      upsertMeta('meta[name="robots"]', 'name', 'robots', robotsValue);

      // 2. Canonical URL
      const defaultCanonical = `${window.location.origin}${pathname}`;
      const canonicalValue = seo.canonical || record?.data?.canonical || defaultCanonical;

      document.head.querySelectorAll('link[rel="canonical"]').forEach((node) => node.remove());
      const canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      canonicalEl.href = canonicalValue;
      document.head.appendChild(canonicalEl);

      // 3. Open Graph (Facebook, WhatsApp, LinkedIn)
      const ogTitle = seo.ogTitle || record?.data?.ogTitle || title;
      const ogDesc = seo.ogDescription || record?.data?.ogDescription || description;
      const rawOgImg = seo.ogImage || record?.data?.ogImage || record?.data?.image || '/assets/img/cabs/hero-1.jpg';
      const ogImageUrl = resolveAssetUrl(rawOgImg);

      upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalValue);
      upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.brand || 'Super Cabs');
      upsertMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle);
      upsertMeta('meta[property="og:description"]', 'property', 'og:description', ogDesc);
      upsertMeta('meta[property="og:type"]', 'property', 'og:type', matchedType === 'tour' ? 'article' : 'website');
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImageUrl);
      upsertMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', seo.altText || `${title} - Super Cabs`);
      upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');

      // 4. Twitter / X Cards
      upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
      upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitle);
      upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', ogDesc);
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImageUrl);

      // 5. Structured Data (Schema.org JSON-LD TaxiService & LocalBusiness)
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        name: siteConfig.brand || 'Super Cabs',
        description: siteConfig.tagline || description,
        url: window.location.origin,
        telephone: siteConfig.phoneDisplay || siteConfig.phone || '+91-9787541723',
        email: siteConfig.email || 'contact@supercabs.in',
        priceRange: '₹₹',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Razorpay',
        areaServed: [
          { '@type': 'State', name: 'Tamil Nadu' },
          { '@type': 'State', name: 'Kerala' },
          { '@type': 'State', name: 'Karnataka' },
          { '@type': 'State', name: 'Puducherry' },
          { '@type': 'State', name: 'Andhra Pradesh' }
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.address || '4/150, East Street, TAMILNADU -606707',
          postalCode: '606707',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN'
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ],
          opens: '00:00',
          closes: '23:59'
        },
        sameAs: Object.values(siteConfig.social || {}).filter((v) => typeof v === 'string' && /^https?:\/\//i.test(v))
      };

      let script = document.head.querySelector('script[data-supercabs-schema]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.supercabsSchema = 'true';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaData);
    })();

    return () => {
      active = false;
    };
  }, [location.pathname, settingsVersion]);

  return null;
}
