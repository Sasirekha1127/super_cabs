import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ title, subtitle, bgImage }) {
    const defaultBg = '/assets/img/cabs/banner-default.jpg';
    const activeBg = bgImage || defaultBg;

    return (
        <div
            className="breadcumb-wrapper"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(7, 21, 27, 0.72) 0%, rgba(9, 28, 35, 0.88) 100%), url(${activeBg})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative",
                padding: "140px 0 115px"
            }}
        >
            <div className="container">
                <div className="breadcumb-content text-center">
                    <h1 className="breadcumb-title text-white" style={{ fontSize: '42px', fontWeight: '800', marginBottom: '14px' }}>
                        {title}
                    </h1>
                    <ul className="breadcumb-menu justify-content-center">
                        <li>
                            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Home</Link>
                        </li>
                        <li style={{ color: 'var(--theme-color, #1ca8cb)', fontWeight: '600' }}>
                            {title}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;
