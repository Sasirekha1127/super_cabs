import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeOne from './HomeOne'
import About from './About'
import LoadTop from '../Components/LoadTop'
import Service from './Service'
import Fleet from './Fleet'
import Pricing from './Pricing'
import Tour from './Tour'
import TourDetails from './TourDetails'
import Gallery from './Gallery'
import Contact from './Contact'
import OneWayRoundTripPage from './OneWayRoundTripPage'
import DropTaxiDetailPage from './DropTaxiDetailPage'
import Error from './Error'
import { BookingModalProvider } from '../Components/Booking/BookingModalContext'
import BookingModal from '../Components/Booking/BookingModal'
import AdminDashboard from './AdminDashboard'
import SeoManager from '../Components/SeoManager'
import api from '../services/api'
import siteConfig from '../Components/data/siteConfig'

function RouterPage() {
  const [settingsVersion, setSettingsVersion] = useState(0);
  useEffect(() => {
    let active = true;
    api.get('/content/public/setting').then(({ items = [] }) => {
      if (!active || !items[0]?.data) return;
      const data = items[0].data;
      ['brand','tagline','phone','phoneDisplay','whatsapp','email','address','hours','experienceYears','mapEmbedUrl'].forEach(key => { if (typeof data[key] === 'string') siteConfig[key] = data[key]; });
      if (data.social && typeof data.social === 'object') siteConfig.social = { ...siteConfig.social, ...data.social };
      setSettingsVersion(version => version + 1);
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return (
    <BookingModalProvider>
      <Router>
        <LoadTop />
        <SeoManager settingsVersion={settingsVersion} />
        <BookingModal />
        <Routes>
          <Route path="/" element={<HomeOne />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/services/one-way-round-trip" element={<OneWayRoundTripPage />} />
          <Route path="/one-way-round-trip" element={<OneWayRoundTripPage />} />
          <Route path="/one-way-trip" element={<OneWayRoundTripPage />} />
          <Route path="/one-way" element={<OneWayRoundTripPage />} />
          <Route path="/drop-taxi" element={<OneWayRoundTripPage />} />
          <Route path="/drop-taxi/:id" element={<DropTaxiDetailPage />} />
          <Route path="/one-way-taxi/:id" element={<DropTaxiDetailPage />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/tariff" element={<Pricing />} />
          <Route path="/tours" element={<Tour />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/tour-details/:id" element={<TourDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </BookingModalProvider>
  )
}

export default RouterPage
