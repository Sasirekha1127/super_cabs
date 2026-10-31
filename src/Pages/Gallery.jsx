import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import PageHeroSlider from '../Components/Common/PageHeroSlider'
import GalleryInner from '../Components/Gallery/GalleryInner'

function Gallery() {
    return (
        <>
            <HeaderOne />
            <PageHeroSlider 
                page="gallery"
                pageTitle="Gallery" 
                pageSubtitle="Visual Showcase of Our Modern Fleet, Clean Interiors & Scenic Destinations"
                defaultBg="/assets/img/cabs/tour-temple.jpg" 
            />
            <GalleryInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Gallery
