import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import usePublicCabs from '../../services/usePublicCabs';

const styles = `
.fi {
    --fi-ink: #0b2229;
    --fi-ink-soft: #16363f;
    --fi-accent: var(--theme-color, #1ca8cb);
    --fi-accent-light: rgba(28, 168, 203, 0.12);
    --fi-paper: #ffffff;
    --fi-bg-soft: #f8fafc;
    --fi-line: #e2e8f0;
    --fi-text: #475569;
    font-family: var(--body-font, 'Inter', system-ui, sans-serif);
    background: var(--fi-paper);
    color: var(--fi-text);
    padding: 60px 0 80px;
}

/* Header Section */
.fi-head {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 32px;
}
.fi-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--fi-accent-light);
    color: var(--fi-accent);
    border: 1px solid rgba(28, 168, 203, 0.25);
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 6px 16px;
    border-radius: 30px;
    margin-bottom: 14px;
}
.fi-title {
    font-family: var(--title-font, 'Manrope', sans-serif);
    font-weight: 800;
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    line-height: 1.25;
    color: var(--fi-ink);
    margin: 0 0 14px;
}
.fi-lead {
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--fi-text);
    margin: 0 0 10px;
}

/* Category Filter Tabs */
.fi-filter-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 36px;
}
.fi-tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 13.5px;
    font-weight: 700;
    border: 1.5px solid #e2e8f0;
    background: #ffffff;
    color: #475569;
    cursor: pointer;
    transition: all 0.25s ease;
    user-select: none;
}
.fi-tab-btn:hover {
    border-color: var(--fi-accent);
    color: var(--fi-accent);
    transform: translateY(-2px);
}
.fi-tab-btn.active {
    background: var(--fi-accent);
    border-color: var(--fi-accent);
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(28, 168, 203, 0.35);
}
.fi-tab-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 800;
    background: rgba(0, 0, 0, 0.08);
    color: inherit;
}
.fi-tab-btn.active .fi-tab-count {
    background: rgba(255, 255, 255, 0.25);
    color: #ffffff;
}

@media (max-width: 991px) {
    .fi { padding: 45px 0 60px; }
}
`;

function FleetInner() {
    const [activeCategory, setActiveCategory] = useState('all');
    const dynamicVehicles = usePublicCabs();

    // Filter categories with counts
    const categories = [
        { key: 'all', label: 'All Fleet', count: dynamicVehicles.length },
        { key: 'hatchback', label: 'Hatchbacks', count: dynamicVehicles.filter(v => v.category === 'hatchback').length },
        { key: 'sedan', label: 'Sedans', count: dynamicVehicles.filter(v => v.category === 'sedan').length },
        { key: 'suv', label: 'SUVs & 7-Seaters', count: dynamicVehicles.filter(v => v.category === 'suv').length },
        { key: 'tempo', label: 'Tempo Travellers', count: dynamicVehicles.filter(v => v.category === 'tempo').length },
    ];

    const filteredVehicles = activeCategory === 'all' 
        ? dynamicVehicles
        : dynamicVehicles.filter(v => v.category === activeCategory);

    return (
        <section className="fi">
            <style>{styles}</style>

            <div className="container">
                {/* 1. Header Section */}
                <header className="fi-head">
                    <span className="fi-badge">
                        <i className="fa-solid fa-taxi"></i> Available Vehicles
                    </span>
                    <h2 className="fi-title">Available Vehicle Types &amp; Fleet</h2>
                    <p className="fi-lead">
                        Select from our wide range of well-maintained, comfortable vehicles with verified seating capacity and dedicated chauffeur service.
                    </p>
                </header>

                {/* 2. Interactive Vehicle Category Filter Tabs */}
                <div className="fi-filter-tabs" role="tablist" aria-label="Available Vehicle Types">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            type="button"
                            className={`fi-tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            <span>{cat.label}</span>
                            <span className="fi-tab-count">{cat.count}</span>
                        </button>
                    ))}
                </div>

                {/* 3. Clean 3-Column Vehicle Cards Grid */}
                <div className="row gy-4">
                    {filteredVehicles.map((v) => (
                        <div key={v.slug} className="col-lg-4 col-md-6 col-12">
                            <VehicleCard vehicle={v} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FleetInner;
