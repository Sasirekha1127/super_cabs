import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderOne from '../Components/Header/HeaderOne';
import FooterFour from '../Components/Footer/FooterFour';
import ScrollToTop from '../Components/ScrollToTop';
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb';
import TourDetailInner from '../Components/Tour/TourDetailInner';
import { tours } from '../Components/data/cabsData';
import usePublicContent from '../services/usePublicContent';
import ErrorPage from './Error';

function TourDetails() {
    const { id } = useParams();
    const publishedTours = usePublicContent('tour', tours);
    const currentTour = publishedTours.find((t) => t.slug === id || String(t.id) === String(id)) || (publishedTours.hasManagedItems ? null : tours.find(t => t.slug === id || String(t.id) === String(id)) || tours[0]);
    if (!currentTour) return <ErrorPage />;

    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title={currentTour.title} 
                subtitle={`${currentTour.duration} • ${currentTour.places}`}
                bgImage={currentTour.image || "/assets/img/cabs/banner-tours.jpg"} 
            />
            <TourDetailInner />
            <FooterFour />
            <ScrollToTop />
        </>
    );
}

export default TourDetails;
