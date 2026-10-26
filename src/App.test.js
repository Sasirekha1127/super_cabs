import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomeOne from './Pages/HomeOne';
import About from './Pages/About';
import Service from './Pages/Service';
import Fleet from './Pages/Fleet';
import Pricing from './Pages/Pricing';
import Tour from './Pages/Tour';
import TourDetails from './Pages/TourDetails';
import Gallery from './Pages/Gallery';
import Contact from './Pages/Contact';


// Swiper ships ESM-only; stub it for the jsdom smoke test.
jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}), { virtual: true });
jest.mock('swiper/modules', () => ({ Pagination: {}, EffectFade: {}, Navigation: {}, Autoplay: {}, EffectCoverflow: {} }), { virtual: true });
jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });
jest.mock('swiper/css/scrollbar', () => ({}), { virtual: true });
jest.mock('swiper/css/pagination', () => ({}), { virtual: true });
jest.mock('swiper/css/effect-coverflow', () => ({}), { virtual: true });
jest.mock('swiper/swiper-bundle.css', () => ({}), { virtual: true });

const routes = [
  ['/', HomeOne], ['/about', About], ['/services', Service], ['/fleet', Fleet],
  ['/tariff', Pricing], ['/tours', Tour], ['/tours/hill-station', TourDetails],
  ['/gallery', Gallery], ['/contact', Contact],
];

beforeAll(() => {
  window.scrollTo = () => {};
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
});

test.each(routes)('route %s renders without crashing and has Super Cabs branding', (path, Page) => {
  const { container } = render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path={path} element={<Page />} /></Routes>
    </MemoryRouter>
  );
  expect(container.innerHTML).toContain('Super Cabs');
  expect(container.innerHTML).not.toMatch(/Tourm/i);
});
