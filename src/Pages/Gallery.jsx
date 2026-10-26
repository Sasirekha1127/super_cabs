import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import GalleryInner from '../Components/Gallery/GalleryInner'

function Gallery() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title="Gallery" 
                subtitle="Visual Showcase of Our Modern Fleet, Clean Interiors & Scenic Destinations"
                bgImage="/assets/img/cabs/tour-temple.jpg" 
            />
            <GalleryInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Gallery
