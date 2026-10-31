/**
 * Dynamic Fleet Tariffs & Fare Calculation Engine for Super Cabs
 * Google Maps API is the exclusive source for distance & duration.
 * Offline distance fallback tables have been removed.
 */
import siteConfig from './siteConfig';

/**
 * Robust number extractor from string values like "₹ 15 / km", "₹ 400 / day", "15"
 */
export function parseTariffNumber(val, defaultVal = 0) {
    if (typeof val === 'number') return val;
    if (!val) return defaultVal;
    const match = String(val).match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : defaultVal;
}

export function resolveCabImageUrl(img) {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (img.startsWith('/uploads') || img.startsWith('uploads')) {
        const path = img.startsWith('/') ? img : `/${img}`;
        const origin = process.env.REACT_APP_API_URL 
            ? process.env.REACT_APP_API_URL.replace(/\/api\/?$/, '') 
            : 'http://localhost:5001';
        return `${origin}${path}`;
    }
    return img;
}

/**
 * Normalizes a DB Cab document into a standardized booking vehicle object
 */
export function normalizeCabForBooking(cab) {
    const rawName = cab.name || cab.title || 'Vehicle';
    const rateOneWay = parseTariffNumber(cab.rateOneWay, 15);
    const rateRoundTrip = parseTariffNumber(cab.rateRoundTrip, 14);
    const globalAllowance = Number(siteConfig?.driverAllowance) || 400;
    const hasDriverBata = cab.hasDriverBata !== false;
    const cabAllowance = cab.driverBata ? parseTariffNumber(cab.driverBata, 0) : 0;
    const driverAllowance = hasDriverBata ? (cabAllowance || globalAllowance) : 0;
    const hourlyBase = parseTariffNumber(cab.rateHourly, 2200);

    // Resolve image or fallback icon
    let icon = resolveCabImageUrl(cab.image);
    if (!icon || icon.includes('placeholder')) {
        const cat = (cab.category || '').toLowerCase();
        const n = rawName.toLowerCase();
        if (n.includes('innova') || cat.includes('tempo')) {
            icon = '/assets/img/cabs/car-icon-innova.png';
        } else if (cat.includes('suv') || n.includes('suv') || n.includes('ertiga')) {
            icon = '/assets/img/cabs/car-icon-suv.png';
        } else {
            icon = '/assets/img/cabs/car-icon-sedan.png';
        }
    }

    const id = cab.slug || String(cab._id || rawName.toUpperCase().replace(/[^A-Z0-9]/g, '_'));

    return {
        id,
        _id: cab._id,
        name: rawName,
        displayName: `${rawName} (₹ ${rateOneWay}/KM)`,
        icon,
        models: cab.models || cab.seats || '',
        seats: cab.seats || `${cab.seatingCapacity || 4} Passengers`,
        rateOneWay,
        rateRoundTrip,
        hasDriverBata,
        driverAllowance,
        minKm: parseTariffNumber(cab.minKm, 130),
        hourlyBase,
        airportBase: parseTariffNumber(cab.rateAirport, 1200) || 1200,
        isActive: cab.isActive !== false,
        rawCab: cab
    };
}

/**
 * Default fleet configurations
 */
export const VEHICLE_CONFIGS = [
    {
        id: "SEDAN",
        name: "SEDAN",
        displayName: "Sedan (New Swift Dzire / Aura)",
        icon: "/assets/img/cabs/car-icon-sedan.png",
        models: "New Maruti Swift Dzire, Hyundai Aura, Honda Amaze",
        seats: "4 Passengers",
        rateOneWay: 15,
        rateRoundTrip: 14,
        driverAllowance: 400,
        hourlyBase: 2200,
        airportBase: 1100
    },
    {
        id: "SUV",
        name: "SUV",
        displayName: "SUV (Ertiga / Carens)",
        icon: "/assets/img/cabs/car-icon-suv.png",
        models: "Maruti Ertiga, Kia Carens, Renault Triber",
        seats: "6 Passengers",
        rateOneWay: 19,
        rateRoundTrip: 18,
        driverAllowance: 500,
        hourlyBase: 3200,
        airportBase: 1700
    },
    {
        id: "INNOVA",
        name: "INNOVA",
        displayName: "Innova (Crysta 7-Seater)",
        icon: "/assets/img/cabs/car-icon-innova.png",
        models: "Toyota Innova, Innova Crysta",
        seats: "7 Passengers",
        rateOneWay: 21,
        rateRoundTrip: 20,
        driverAllowance: 600,
        hourlyBase: 4000,
        airportBase: 2100
    }
];

/**
 * Calculate estimation details for vehicles strictly using Google Maps distance
 */
export function calculateFaresForVehicles({
    tab = 'outstation',
    tripType = 'oneway',
    fromCity = '',
    toCity = '',
    city = '',
    rentFor = '',
    airportTrip = '',
    cabsList = null,
    overrideDistanceKm = null,
    overrideDurationText = null
}) {
    let actualDistanceKm = 0;
    let durationText = '';

    const isRound = tab === 'outstation' && tripType === 'round';

    if (tab === 'outstation') {
        // Strict Requirement: Google Maps distance is required; no fallback tables
        if (!overrideDistanceKm || Number(overrideDistanceKm) <= 0) {
            return null;
        }
        const oneWayKm = Math.round(Number(overrideDistanceKm));
        actualDistanceKm = isRound ? oneWayKm * 2 : oneWayKm;
        durationText = overrideDurationText || '';
    } else if (tab === 'rental') {
        const kmMatch = rentFor.match(/(\d+)\s*KM/i);
        const hrsMatch = rentFor.match(/(\d+)\s*hrs?/i);
        actualDistanceKm = kmMatch ? parseInt(kmMatch[1], 10) : 80;
        const hrs = hrsMatch ? parseInt(hrsMatch[1], 10) : 8;
        durationText = `${hrs} hours`;
    } else {
        actualDistanceKm = 45;
        durationText = '1 hour 15 mins';
    }

    const minOneWay = Number(siteConfig?.minKmOneWay) || 130;
    const minRound = Number(siteConfig?.minKmRoundTrip) || 250;
    const minKmThreshold = isRound ? minRound : minOneWay;

    // Minimum kilometer pricing logic:
    // If actual distance is <= minKmThreshold (130 KM for one-way / 250 KM for round-trip),
    // calculate the fare using the minimum billing distance.
    // If actual distance exceeds minKmThreshold, calculate using actual distance.
    const billingDistanceKm = (tab === 'outstation')
        ? (actualDistanceKm <= minKmThreshold ? minKmThreshold : actualDistanceKm)
        : actualDistanceKm;

    const minKmApplied = (tab === 'outstation') && (billingDistanceKm > actualDistanceKm);

    const activeConfigs = (Array.isArray(cabsList) && cabsList.length > 0)
        ? cabsList
        : VEHICLE_CONFIGS;

    const results = {};

    activeConfigs.forEach((veh) => {
        let ratePerKm = isRound ? veh.rateRoundTrip : veh.rateOneWay;
        const globalAllowance = Number(siteConfig?.driverAllowance) || 400;
        const hasBata = veh.hasDriverBata !== false;
        const cabAllowance = veh.driverAllowance !== undefined ? veh.driverAllowance : (veh.driverBata ? parseTariffNumber(veh.driverBata, 0) : 0);
        let driverBata = hasBata ? (cabAllowance || globalAllowance) : 0;
        let totalFare = 0;

        if (tab === 'rental') {
            const isHeavy = veh.name?.toUpperCase().includes('SUV') || veh.name?.toUpperCase().includes('INNOVA');
            totalFare = isHeavy 
                ? (veh.hourlyBase + (actualDistanceKm - 80 > 0 ? (actualDistanceKm - 80) * ratePerKm : 0))
                : (veh.hourlyBase + (actualDistanceKm - 80 > 0 ? (actualDistanceKm - 80) * ratePerKm : 0));
        } else if (tab === 'airport') {
            totalFare = veh.airportBase || 1200;
        } else {
            // Outstation fare calculation: billing distance * ratePerKm + driver allowance
            totalFare = Math.round((billingDistanceKm * ratePerKm) + driverBata);
        }

        const advance10 = Math.round(totalFare * 0.10);
        const remaining10 = totalFare - advance10;
        const advance50 = Math.round(totalFare * 0.50);
        const remaining50 = totalFare - advance50;

        results[veh.id] = {
            id: veh.id,
            name: veh.name,
            displayName: veh.displayName || veh.name,
            icon: veh.icon,
            models: veh.models,
            seats: veh.seats,
            actualDistanceKm,
            billingDistanceKm,
            distanceKm: actualDistanceKm,
            chargeableKm: billingDistanceKm,
            minKmApplied,
            minKmThreshold,
            durationText,
            ratePerKm,
            hasDriverBata: hasBata,
            driverAllowanceText: hasBata ? `Included (Rs. ${driverBata})` : 'Not Applicable (Rs. 0)',
            driverAllowanceVal: driverBata,
            totalFare,
            advance10,
            remaining10,
            advance50,
            remaining50,
            fullAmount: totalFare
        };
    });

    return {
        actualDistanceKm,
        billingDistanceKm,
        distanceKm: actualDistanceKm,
        chargeableKm: billingDistanceKm,
        minKmApplied,
        minKmThreshold,
        durationText,
        vehicleFares: results
    };
}
