import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderOne from '../Components/Header/HeaderOne';
import FooterFour from '../Components/Footer/FooterFour';
import ScrollToTop from '../Components/ScrollToTop';
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb';
import TourDetailInner from '../Components/Tour/TourDetailInner';
import { tours } from '../Components/data/cabsData';
import usePublicContent from '../services/usePublicContent';
import { getApiOrigin } from '../services/api';
import ErrorPage from './Error';

const resolveImageUrl = (img, fallback = '/assets/img/cabs/banner-tours.jpg') => {
    if (!img) return fallback;
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    if (img.startsWith('/uploads') || img.startsWith('uploads')) {
        return `${getApiOrigin()}${img.startsWith('/') ? '' : '/'}${img}`;
    }
    return img;
};

function TourDetails() {
    const { id } = useParams();
    const publishedTours = usePublicContent('tour', tours);

    const currentTour = publishedTours.find(
        (t) => t.slug === id || String(t.id) === String(id) || String(t._id) === String(id)
    ) || (publishedTours.hasManagedItems ? null : tours.find((t) => t.slug === id || String(t.id) === String(id)) || tours[0]);

    if (!currentTour) return <ErrorPage />;

    const title = currentTour.title || currentTour.name || 'Tour Package Details';
    const duration = currentTour.duration || '2 Days / 1 Night';
    const places = currentTour.places || currentTour.destination || 'Curated Itinerary';
    const bgImage = resolveImageUrl(currentTour.image, '/assets/img/cabs/banner-tours.jpg');

    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title={title} 
                subtitle={`${duration} • ${places}`}
                bgImage={bgImage} 
            />
            <TourDetailInner tour={currentTour} allTours={publishedTours} />
            <FooterFour />
            <ScrollToTop />
        </>
    );
}

export default TourDetails;
