import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import siteConfig from './data/siteConfig';

const defaults = {
  '/': ['Super Cabs - Taxi Service | Local, Outstation, Airport & Tour Packages', 'Reliable local, outstation, airport and corporate taxi services with tour packages. Call or WhatsApp to book your ride.'],
  '/about': ['About Super Cabs', 'Learn about Super Cabs taxi services, professional drivers, and customer support.'],
  '/services': ['Taxi Services | Super Cabs', 'Local, outstation, airport, and corporate taxi services from Super Cabs.'],
  '/fleet': ['Taxi Fleet & Tariff | Super Cabs', 'View Super Cabs vehicles, passenger capacity, and approved tariffs.'],
  '/tariff': ['Taxi Tariff | Super Cabs', 'Review Super Cabs taxi pricing and travel packages.'],
  '/tours': ['Tour Packages | Super Cabs', 'Explore chauffeur-driven tour packages from Super Cabs.'],
  '/gallery': ['Taxi & Tour Gallery | Super Cabs', 'Browse Super Cabs vehicles, tours, and travel gallery.'],
  '/contact': ['Contact Super Cabs', 'Contact Super Cabs for taxi bookings and travel enquiries.']
};
const cleanPath = path => path.replace(/\/+$/, '') || '/';
function upsertMeta(selector, attribute, key, content) {
  if (!content) return;
  const matches = [...document.head.querySelectorAll(selector)];
  let element = matches.shift();
  matches.forEach(node => node.remove());
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element); }
  element.setAttribute('content', content);
}

export default function SeoManager({ settingsVersion }) {
  const location = useLocation();
  useEffect(() => {
    let active = true;
    const pathname = cleanPath(location.pathname);
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
      document.title = 'Admin | Super Cabs';
      upsertMeta('meta[name="robots"]', 'name', 'robots', 'noindex,nofollow');
      return () => { active = false; };
    }
    (async () => {
      const [pages, services, tours] = await Promise.all(['page','service','tour'].map(type => api.get(`/content/public/${type}`).catch(() => ({ items: [] }))));
      if (!active) return;
      const all = [...(pages.items || []), ...(services.items || []), ...(tours.items || [])];
      const currentSlug = pathname.split('/').filter(Boolean).at(-1) || '';
      const isTourPath = pathname.startsWith('/tours/') || pathname.startsWith('/tour-details/');
      const record = all.find(item => item.slug === (pathname === '/' ? 'home' : currentSlug) && (isTourPath ? item.type === 'tour' : pathname.startsWith('/services/') ? item.type === 'service' : item.type === 'page'));
      const seo = record?.data?.seo || {};
      const base = defaults[pathname] || defaults[pathname.startsWith('/tours/') ? '/tours' : pathname.startsWith('/services/') ? '/services' : '/'];
      const title = seo.title || record?.data?.seoTitle || record?.title || base[0];
      const description = seo.description || record?.data?.metaDescription || record?.data?.description || base[1];
      document.title = title;
      upsertMeta('meta[name="description"]', 'name', 'description', description);
      upsertMeta('meta[name="robots"]', 'name', 'robots', `${seo.noindex ? 'noindex' : 'index'},${seo.nofollow ? 'nofollow' : 'follow'}`);
      const canonicalPath = record?.type === 'tour' ? `/tours/${record.slug}` : record?.type === 'service' ? `/services/${record.slug}` : pathname;
      const canonicalValue = seo.canonical || `${window.location.origin}${canonicalPath}`;
      document.head.querySelectorAll('link[rel="canonical"]').forEach(node => node.remove());
      const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = canonicalValue; document.head.appendChild(canonical);
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalValue);
      upsertMeta('meta[property="og:title"]', 'property', 'og:title', seo.ogTitle || title);
      upsertMeta('meta[property="og:description"]', 'property', 'og:description', seo.ogDescription || description);
      upsertMeta('meta[property="og:type"]', 'property', 'og:type', record?.type === 'tour' ? 'article' : 'website');
      if (seo.ogImage) upsertMeta('meta[property="og:image"]', 'property', 'og:image', new URL(seo.ogImage, window.location.origin).href);
      else document.head.querySelectorAll('meta[property="og:image"]').forEach(node => node.remove());
      if (seo.altText) upsertMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', seo.altText);
      else document.head.querySelectorAll('meta[property="og:image:alt"]').forEach(node => node.remove());
      if (seo.altText && seo.ogImage) {
        const hero = document.querySelector('main img, .th-hero-bg img, .tour-box img');
        if (hero) hero.alt = seo.altText;
      }
      const schema = {
        '@context': 'https://schema.org', '@type': 'TaxiService', name: siteConfig.brand,
        description: siteConfig.tagline, telephone: siteConfig.phoneDisplay || siteConfig.phone,
        email: siteConfig.email, address: { '@type': 'PostalAddress', streetAddress: siteConfig.address },
        url: window.location.origin, sameAs: Object.values(siteConfig.social || {}).filter(value => /^https:\/\//i.test(value))
      };
      let script = document.head.querySelector('script[data-supercabs-schema]');
      if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.supercabsSchema = 'true'; document.head.appendChild(script); }
      script.textContent = JSON.stringify(schema);
    })();
    return () => { active = false; };
  }, [location.pathname, settingsVersion]);
  return null;
}
