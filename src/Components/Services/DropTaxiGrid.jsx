import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dropTaxiCities as fallbackCities } from '../data/dropTaxiData';
import api from '../../services/api';

const styles = `
.dt-section {
    background: #f8fafc;
    position: relative;
}
.dt-search-box {
    max-width: 580px;
    margin: 0 auto 30px;
    position: relative;
}
.dt-search-input {
    width: 100%;
    padding: 14px 20px 14px 48px;
    border-radius: 30px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    font-size: 15px;
    color: #1e293b;
    box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    outline: none;
    transition: all 0.25s ease;
}
.dt-search-input:focus {
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 6px 20px rgba(28, 168, 203, 0.2);
}
.dt-search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 16px;
    pointer-events: none;
}
.dt-filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 40px;
}
.dt-pill {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 7px 18px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}
.dt-pill:hover, .dt-pill.active {
    background: var(--theme-color, #1ca8cb);
    color: #ffffff;
    border-color: var(--theme-color, #1ca8cb);
    box-shadow: 0 4px 12px rgba(28, 168, 203, 0.25);
}

/* Card matching user screenshot */
.dt-card {
    background: #ffffff;
    border: 1px solid #eef2f6;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.dt-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
}
.dt-img-wrap {
    height: 200px;
    width: 100%;
    overflow: hidden;
    background: #e2e8f0;
    position: relative;
}
.dt-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}
.dt-card:hover .dt-img-wrap img {
    transform: scale(1.06);
}
.dt-body {
    padding: 24px 20px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex-grow: 1;
}
.dt-title {
    font-size: 19px;
    font-weight: 700;
    color: #172436;
    margin: 0 0 16px;
    letter-spacing: -0.2px;
}
.dt-btn {
    display: inline-block;
    background: #172436;
    color: #ffffff !important;
    font-size: 13.5px;
    font-weight: 600;
    padding: 8px 26px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.2s ease;
}
.dt-btn:hover {
    background: var(--theme-color, #1ca8cb);
    transform: translateY(-1px);
}

/* Modal */
.dt-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(11, 34, 41, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.dt-modal-content {
    background: #ffffff;
    max-width: 640px;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.3);
    animation: dtModalIn 0.28s ease-out;
}
@keyframes dtModalIn {
    from { opacity: 0; transform: scale(0.94) translateY(12px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}
.dt-modal-img {
    height: 220px;
    width: 100%;
    object-fit: cover;
}
.dt-modal-body {
    padding: 26px 28px;
}
`;

const resolveImg = (src) => {
    if (!src) return '/assets/img/cabs/svc-oneway.jpg';
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    const apiOrigin = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace(/\/api\/?$/, '') : '';
    if (src.startsWith('/uploads')) return `${apiOrigin}${src}`;
    return src.startsWith('/') ? src : `/${src}`;
};

function DropTaxiGrid() {
    const [cities, setCities] = useState(fallbackCities);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCat, setSelectedCat] = useState('all');

    useEffect(() => {
        let mounted = true;
        api.get('/drop-routes')
            .then(res => {
                if (mounted && res && res.routes && res.routes.length > 0) {
                    const mapped = res.routes.map(r => ({
                        id: r.cityId || r._id,
                        name: r.cityName || r.title,
                        title: r.title || `${r.cityName} Drop Taxi`,
                        image: r.image || '/assets/img/cabs/svc-oneway.jpg',
                        category: r.category === 'hill' ? 'hillstation' : r.category || 'major',
                        approxDistance: r.approxDistance || '',
                        approxTime: r.approxTime || '',
                        sedanFare: r.sedanFare || '',
                        suvFare: r.suvFare || '',
                        description: r.description || ''
                    }));
                    setCities(mapped);
                }
            })
            .catch(() => {
                // Keep fallbackCities on error
            });
        return () => { mounted = false; };
    }, []);

    const filteredCities = useMemo(() => {
        return cities.filter((city) => {
            const name = city.name || '';
            const title = city.title || '';
            const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  title.toLowerCase().includes(searchTerm.toLowerCase());
            const cat = city.category === 'hill' ? 'hillstation' : (city.category || 'major');
            const targetCat = selectedCat === 'hill' ? 'hillstation' : selectedCat;
            const matchesCategory = targetCat === 'all' || cat === targetCat;
            return matchesSearch && matchesCategory;
        });
    }, [cities, searchTerm, selectedCat]);

    return (
        <section className="dt-section space">
            <style>{styles}</style>
            <div className="container">
                {/* Search Box */}
                <div className="dt-search-box">
                    <i className="fa-solid fa-magnifying-glass dt-search-icon"></i>
                    <input 
                        type="text" 
                        className="dt-search-input"
                        placeholder="Search Drop Taxi City (e.g. Chennai, Coimbatore, Madurai, Ooty...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filter Pills */}
                <div className="dt-filter-pills">
                    <button 
                        type="button" 
                        className={`dt-pill ${selectedCat === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCat('all')}
                    >
                        All Routes ({cities.length})
                    </button>
                    <button 
                        type="button" 
                        className={`dt-pill ${selectedCat === 'major' ? 'active' : ''}`}
                        onClick={() => setSelectedCat('major')}
                    >
                        Major Cities
                    </button>
                    <button 
                        type="button" 
                        className={`dt-pill ${selectedCat === 'hillstation' ? 'active' : ''}`}
                        onClick={() => setSelectedCat('hillstation')}
                    >
                        Hill Stations
                    </button>
                    <button 
                        type="button" 
                        className={`dt-pill ${selectedCat === 'temple' ? 'active' : ''}`}
                        onClick={() => setSelectedCat('temple')}
                    >
                        Heritage &amp; Temple Towns
                    </button>
                    <button 
                        type="button" 
                        className={`dt-pill ${selectedCat === 'coastal' ? 'active' : ''}`}
                        onClick={() => setSelectedCat('coastal')}
                    >
                        Coastal Cities
                    </button>
                </div>

                {/* Cities Grid matching user's reference image */}
                <div className="row g-4">
                    {filteredCities.map((city) => (
                        <div key={city.id} className="col-lg-6 col-md-6">
                            <div className="dt-card">
                                <Link to={`/drop-taxi/${city.id}`} className="dt-img-wrap d-block">
                                    <img src={resolveImg(city.image)} alt={city.title} />
                                </Link>
                                <div className="dt-body">
                                    <h4 className="dt-title">
                                        <Link to={`/drop-taxi/${city.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {city.title}
                                        </Link>
                                    </h4>
                                    <Link 
                                        to={`/drop-taxi/${city.id}`}
                                        className="dt-btn"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCities.length === 0 && (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-car-tunnel text-muted mb-3" style={{ fontSize: '42px' }}></i>
                        <h5>No cities found matching "{searchTerm}"</h5>
                        <p className="text-muted">We provide drop taxis to all towns across Tamil Nadu, Kerala &amp; Karnataka!</p>
                        <button 
                            type="button" 
                            className="th-btn style1" 
                            onClick={() => { setSearchTerm(''); setSelectedCat('all'); }}
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default DropTaxiGrid;
