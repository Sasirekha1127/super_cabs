import React from "react";
import { Link } from "react-router-dom";
import siteConfig, { telHref, waHref } from "../data/siteConfig";
import usePublicContent from '../../services/usePublicContent';

const Cta = () => {
  const cta = usePublicContent('cta', [{ title: 'Need a taxi? Book your ride with Super Cabs', image: '/assets/img/cabs/cta-bg.jpg', primaryLabel: 'Call Now', secondaryLabel: 'WhatsApp', tertiaryLabel: 'Send Enquiry' }])[0];
  return (
    <section
      className="cta-area"
      data-overlay="title"
      data-opacity={8}
      style={{ backgroundImage: `url(${cta?.image || '/assets/img/cabs/cta-bg.jpg'})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-7 px-xl-4 text-center">
            <div className="title-area mb-30 mt-n3">
              <h2 className="sec-title text-white text-capitalize">
                {cta?.title || ''}
              </h2>
            </div>
            <div className="btn-group justify-content-center">
              <a href={cta?.primaryLink || telHref()} className="th-btn style1">
                {cta?.primaryLabel || 'Call Now'} <i className="fa-regular fa-phone ms-2" />
              </a>
              <a href={cta?.secondaryLink || waHref()} target={siteConfig.whatsapp ? "_blank" : undefined} rel="noopener noreferrer" className="th-btn style1">
                {cta?.secondaryLabel || 'WhatsApp'} <i className="fab fa-whatsapp ms-2" />
              </a>
              <Link to={cta?.tertiaryLink?.startsWith('/') ? cta.tertiaryLink : '/contact'} className="th-btn style1">
                {cta?.tertiaryLabel || 'Send Enquiry'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
