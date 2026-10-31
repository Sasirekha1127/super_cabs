/**
 * Google Maps Places & Routes Integration Client Service
 *
 * Provides:
 * 1. Resilient Google Maps Places JavaScript SDK dynamic loader
 * 2. Autocomplete suggestions prioritized for cities/towns in South India & nationwide
 * 3. Fallback city directory when API key is missing or offline
 * 4. Driving distance & duration calculation via backend Routes API
 */
import api from './api';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

// Internal loader state
let scriptLoadPromise = null;
let googleAuthError = false;

// Client-Side In-Memory Cache for Autocomplete Predictions & Selected Place Details
const predictionsCache = new Map();
const placeDetailsCache = new Map();

// Listen for Google Maps authentication failures
if (typeof window !== 'undefined') {
    window.gm_authFailure = () => {
        console.warn('[Google Maps] Authentication failure: API key may be invalid, missing Places API activation, or referrer restricted.');
        googleAuthError = true;
    };
}

/**
 * Curated South India and regional city directory for offline resilience
 * Covers Tamil Nadu, Karnataka (Bangalore), Pondicherry, Kerala, Andhra Pradesh
 */
export const SOUTH_INDIA_CITIES = [
    // Coimbatore City & Interior Locations
    { name: 'Coimbatore', fullName: 'Coimbatore, Tamil Nadu, India', placeId: 'ChIJbU60qHAWrjsR4BmjiQIngAk_cbe', lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu' },
    { name: 'Tamil Nadu Agricultural University', fullName: 'Tamil Nadu Agricultural University P N Pudur, Coimbatore, Tamil Nadu', placeId: 'ChIJ_tnauP_1rjsRk3s0Z401aM', lat: 11.0125, lng: 76.9356, state: 'Tamil Nadu' },
    { name: 'Tamil Nadu Agricultural University', fullName: 'Tamil Nadu Agricultural University Lawley Rd, Tamil Nadu', placeId: 'ChIJ_tnauP_1rjsRk3s0Z402bM', lat: 11.0135, lng: 76.9380, state: 'Tamil Nadu' },
    { name: 'Hudco Colony', fullName: 'Hudco Colony, Vellakinar Village Coimbatore, Tamil Nadu', placeId: 'ChIJ_hudco_vellakinar_cbe', lat: 11.0825, lng: 76.9530, state: 'Tamil Nadu' },
    { name: 'Gandhipuram', fullName: 'Gandhipuram, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_gandhipuram_cbe', lat: 11.0183, lng: 76.9644, state: 'Tamil Nadu' },
    { name: 'RS Puram', fullName: 'R.S. Puram, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_rspuram_cbe', lat: 11.0089, lng: 76.9511, state: 'Tamil Nadu' },
    { name: 'Peelamedu', fullName: 'Peelamedu, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_peelamedu_cbe', lat: 11.0267, lng: 77.0120, state: 'Tamil Nadu' },
    { name: 'Saravanampatti', fullName: 'Saravanampatti, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_saravanampatti_cbe', lat: 11.0805, lng: 76.9959, state: 'Tamil Nadu' },
    { name: 'Singanallur', fullName: 'Singanallur, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_singanallur_cbe', lat: 10.9997, lng: 77.0255, state: 'Tamil Nadu' },
    { name: 'Thudiyalur', fullName: 'Thudiyalur, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_thudiyalur_cbe', lat: 11.0792, lng: 76.9377, state: 'Tamil Nadu' },
    { name: 'Ukkadam', fullName: 'Ukkadam, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_ukkadam_cbe', lat: 10.9902, lng: 76.9601, state: 'Tamil Nadu' },
    { name: 'Saibaba Colony', fullName: 'Saibaba Colony, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_saibaba_cbe', lat: 11.0338, lng: 76.9463, state: 'Tamil Nadu' },
    { name: 'Vadavalli', fullName: 'Vadavalli, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_vadavalli_cbe', lat: 11.0255, lng: 76.9042, state: 'Tamil Nadu' },
    { name: 'Kuniyamuthur', fullName: 'Kuniyamuthur, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_kuniyamuthur_cbe', lat: 10.9575, lng: 76.9472, state: 'Tamil Nadu' },
    { name: 'Kovaipudur', fullName: 'Kovaipudur, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_kovaipudur_cbe', lat: 10.9347, lng: 76.9405, state: 'Tamil Nadu' },
    { name: 'Karumathampatti', fullName: 'Karumathampatti, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_karumathampatti_cbe', lat: 11.1070, lng: 77.1770, state: 'Tamil Nadu' },
    { name: 'Karamadai', fullName: 'Karamadai, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_karamadai_cbe', lat: 11.2435, lng: 76.9582, state: 'Tamil Nadu' },
    { name: 'Koundampalayam', fullName: 'Koundampalayam, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_koundampalayam_cbe', lat: 11.0456, lng: 76.9360, state: 'Tamil Nadu' },
    { name: 'Kurichi', fullName: 'Kurichi, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_kurichi_cbe', lat: 10.9500, lng: 76.9700, state: 'Tamil Nadu' },
    { name: 'Kinathukadavu', fullName: 'Kinathukadavu, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_kinathukadavu_cbe', lat: 10.8202, lng: 77.0208, state: 'Tamil Nadu' },
    { name: 'Sulur', fullName: 'Sulur, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_sulur_cbe', lat: 11.0252, lng: 77.1264, state: 'Tamil Nadu' },
    { name: 'Perur', fullName: 'Perur, Coimbatore, Tamil Nadu, India', placeId: 'ChIJ_perur_cbe', lat: 10.9723, lng: 76.9142, state: 'Tamil Nadu' },
    { name: 'Coimbatore Airport', fullName: 'Coimbatore International Airport (CJB), Peelamedu, Coimbatore', placeId: 'ChIJ_cbe_airport', lat: 11.0300, lng: 77.0434, state: 'Tamil Nadu' },
    { name: 'Coimbatore Junction', fullName: 'Coimbatore Junction Railway Station, Gopalapuram, Coimbatore', placeId: 'ChIJ_cbe_junction', lat: 10.9979, lng: 76.9634, state: 'Tamil Nadu' },

    // Chennai City & Interior Locations
    { name: 'Chennai', fullName: 'Chennai, Tamil Nadu, India', placeId: 'ChIJ2V-iqOn1UjoR9TkqSSdpA20', lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
    { name: 'Anna Nagar', fullName: 'Anna Nagar, Chennai, Tamil Nadu, India', placeId: 'ChIJ_annanagar_chn', lat: 13.0850, lng: 80.2101, state: 'Tamil Nadu' },
    { name: 'T. Nagar', fullName: 'T. Nagar (Thyagaraya Nagar), Chennai, Tamil Nadu, India', placeId: 'ChIJ_tnagar_chn', lat: 13.0418, lng: 80.2341, state: 'Tamil Nadu' },
    { name: 'Velachery', fullName: 'Velachery, Chennai, Tamil Nadu, India', placeId: 'ChIJ_velachery_chn', lat: 12.9815, lng: 80.2180, state: 'Tamil Nadu' },
    { name: 'Guindy', fullName: 'Guindy, Chennai, Tamil Nadu, India', placeId: 'ChIJ_guindy_chn', lat: 13.0067, lng: 80.2025, state: 'Tamil Nadu' },
    { name: 'Adyar', fullName: 'Adyar, Chennai, Tamil Nadu, India', placeId: 'ChIJ_adyar_chn', lat: 13.0012, lng: 80.2565, state: 'Tamil Nadu' },
    { name: 'OMR Thoraipakkam', fullName: 'Thoraipakkam, OMR, Chennai, Tamil Nadu, India', placeId: 'ChIJ_omr_chn', lat: 12.9366, lng: 80.2335, state: 'Tamil Nadu' },
    { name: 'Tambaram', fullName: 'Tambaram, Chennai, Tamil Nadu, India', placeId: 'ChIJ_tambaram_chn', lat: 12.9249, lng: 80.1000, state: 'Tamil Nadu' },
    { name: 'Porur', fullName: 'Porur, Chennai, Tamil Nadu, India', placeId: 'ChIJ_porur_chn', lat: 13.0382, lng: 80.1565, state: 'Tamil Nadu' },
    { name: 'Chennai Airport', fullName: 'Chennai International Airport (MAA), Meenambakkam, Chennai', placeId: 'ChIJ_chn_airport', lat: 12.9941, lng: 80.1709, state: 'Tamil Nadu' },
    { name: 'Chennai Central', fullName: 'Puratchi Thalaivar Dr. M.G.R. Central Railway Station, Chennai', placeId: 'ChIJ_chn_central', lat: 13.0823, lng: 80.2755, state: 'Tamil Nadu' },

    // Bangalore City & Interior Locations
    { name: 'Bangalore', fullName: 'Bengaluru (Bangalore), Karnataka, India', placeId: 'ChIJbU60qHAWrjsR4BmjiQIngAk', lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
    { name: 'Bengaluru', fullName: 'Bengaluru, Karnataka, India', placeId: 'ChIJbU60qHAWrjsR4BmjiQIngAk', lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
    { name: 'Koramangala', fullName: 'Koramangala, Bengaluru, Karnataka, India', placeId: 'ChIJ_koramangala_blr', lat: 12.9352, lng: 77.6245, state: 'Karnataka' },
    { name: 'Indiranagar', fullName: 'Indiranagar, Bengaluru, Karnataka, India', placeId: 'ChIJ_indiranagar_blr', lat: 12.9784, lng: 77.6408, state: 'Karnataka' },
    { name: 'Whitefield', fullName: 'Whitefield, Bengaluru, Karnataka, India', placeId: 'ChIJ_whitefield_blr', lat: 12.9698, lng: 77.7500, state: 'Karnataka' },
    { name: 'Electronic City', fullName: 'Electronic City, Bengaluru, Karnataka, India', placeId: 'ChIJ_electroniccity_blr', lat: 12.8452, lng: 77.6602, state: 'Karnataka' },
    { name: 'HSR Layout', fullName: 'HSR Layout, Bengaluru, Karnataka, India', placeId: 'ChIJ_hsrlayout_blr', lat: 12.9121, lng: 77.6446, state: 'Karnataka' },
    { name: 'Bangalore Airport', fullName: 'Kempegowda International Airport Bengaluru (BLR), Devanahalli', placeId: 'ChIJ_blr_airport', lat: 13.1986, lng: 77.7066, state: 'Karnataka' },

    // Pondicherry, Madurai, Trichy, Salem & Other South India Hubs
    { name: 'Pondicherry', fullName: 'Pondicherry (Puducherry), India', placeId: 'ChIJV4qYy9A-UzoR5j1-h0zSrnU', lat: 11.9416, lng: 79.8083, state: 'Puducherry' },
    { name: 'Puducherry', fullName: 'Puducherry, India', placeId: 'ChIJV4qYy9A-UzoR5j1-h0zSrnU', lat: 11.9416, lng: 79.8083, state: 'Puducherry' },
    { name: 'Madurai', fullName: 'Madurai, Tamil Nadu, India', placeId: 'ChIJR_7oD975BzsR5b_4B8lJk2I', lat: 9.9252, lng: 78.1198, state: 'Tamil Nadu' },
    { name: 'Trichy', fullName: 'Tiruchirappalli (Trichy), Tamil Nadu, India', placeId: 'ChIJVz377y2_BzsReGk9v_d64oE', lat: 10.7905, lng: 78.7047, state: 'Tamil Nadu' },
    { name: 'Salem', fullName: 'Salem, Tamil Nadu, India', placeId: 'ChIJDfP5WwzPrjsR_v6u_P4k51I', lat: 11.6643, lng: 78.1460, state: 'Tamil Nadu' },
    { name: 'Tirunelveli', fullName: 'Tirunelveli, Tamil Nadu, India', placeId: 'ChIJQ-H7X-W-BzsRLg_Qv_y33yI', lat: 8.7139, lng: 77.7567, state: 'Tamil Nadu' },
    { name: 'Erode', fullName: 'Erode, Tamil Nadu, India', placeId: 'ChIJk7fFzI-prjsR9b0_z_l852M', lat: 11.3410, lng: 77.7172, state: 'Tamil Nadu' },
    { name: 'Tiruppur', fullName: 'Tiruppur, Tamil Nadu, India', placeId: 'ChIJD7d3oBf5rjsRMl79h_x022M', lat: 11.1085, lng: 77.3411, state: 'Tamil Nadu' },
    { name: 'Vellore', fullName: 'Vellore, Tamil Nadu, India', placeId: 'ChIJc5nLqB91UjoRI7qQv_c230M', lat: 12.9165, lng: 79.1325, state: 'Tamil Nadu' },
    { name: 'Hosur', fullName: 'Hosur, Tamil Nadu, India', placeId: 'ChIJQdC7T-UPrjsRb3j1_c342oM', lat: 12.7409, lng: 77.8253, state: 'Tamil Nadu' },
    { name: 'Dindigul', fullName: 'Dindigul, Tamil Nadu, India', placeId: 'ChIJm7_k3iR4BzsRL251_v201aM', lat: 10.3673, lng: 77.9803, state: 'Tamil Nadu' },
    { name: 'Thanjavur', fullName: 'Thanjavur, Tamil Nadu, India', placeId: 'ChIJu27v7CbfBzsR3m_qv_a771M', lat: 10.7870, lng: 79.1378, state: 'Tamil Nadu' },
    { name: 'Kanyakumari', fullName: 'Kanyakumari, Tamil Nadu, India', placeId: 'ChIJW_k6j_aIBzsRY518v_b220M', lat: 8.0883, lng: 77.5385, state: 'Tamil Nadu' },
    { name: 'Kappikadai', fullName: 'Kappikadai, Kanyakumari District, Tamil Nadu, India', placeId: 'kappikadai_tn', lat: 8.2435, lng: 77.2185, state: 'Tamil Nadu' },
    { name: 'Nagercoil', fullName: 'Nagercoil, Tamil Nadu, India', placeId: 'ChIJq303j_SIBzsRV827v_c551M', lat: 8.1833, lng: 77.4119, state: 'Tamil Nadu' },
    { name: 'Tuticorin', fullName: 'Thoothukudi (Tuticorin), Tamil Nadu, India', placeId: 'ChIJk_T1v_V_BzsR7v89v_a112M', lat: 8.7642, lng: 78.1348, state: 'Tamil Nadu' },
    { name: 'Thoothukudi', fullName: 'Thoothukudi, Tamil Nadu, India', placeId: 'ChIJk_T1v_V_BzsR7v89v_a112M', lat: 8.7642, lng: 78.1348, state: 'Tamil Nadu' },
    { name: 'Kumbakonam', fullName: 'Kumbakonam, Tamil Nadu, India', placeId: 'ChIJz2767AbcBzsR4v88v_d991M', lat: 10.9602, lng: 79.3845, state: 'Tamil Nadu' },
    { name: 'Karur', fullName: 'Karur, Tamil Nadu, India', placeId: 'ChIJp3377F7IrjsR6m_pv_e881M', lat: 10.9601, lng: 78.0766, state: 'Tamil Nadu' },
    { name: 'Ooty', fullName: 'Ooty (Udhagamandalam), Tamil Nadu, India', placeId: 'ChIJZ46Lg-j3rjsR1g2Tv_z998M', lat: 11.4102, lng: 76.6950, state: 'Tamil Nadu' },
    { name: 'Kodaikanal', fullName: 'Kodaikanal, Tamil Nadu, India', placeId: 'ChIJ037Vv8_3BzsR9w1Zv_x774M', lat: 10.2381, lng: 77.4892, state: 'Tamil Nadu' },
    { name: 'Yercaud', fullName: 'Yercaud, Tamil Nadu, India', placeId: 'ChIJr2_8xYzRrjsR8v_9v_a550M', lat: 11.7753, lng: 78.2093, state: 'Tamil Nadu' },
    { name: 'Munnar', fullName: 'Munnar, Kerala, India', placeId: 'ChIJz-7Lw8gCBzsR7b87v_y221M', lat: 10.0889, lng: 77.0595, state: 'Kerala' },
    { name: 'Kochi', fullName: 'Kochi (Cochin), Kerala, India', placeId: 'ChIJv8_v8_QDBzsR2x17v_m445M', lat: 9.9312, lng: 76.2673, state: 'Kerala' },
    { name: 'Mysore', fullName: 'Mysuru (Mysore), Karnataka, India', placeId: 'ChIJs8_8_bWTrjsR5w_8v_k112M', lat: 12.2958, lng: 76.6394, state: 'Karnataka' },
    { name: 'Rameshwaram', fullName: 'Rameswaram, Tamil Nadu, India', placeId: 'ChIJw111v7iOBzsR6v_9v_z887M', lat: 9.2876, lng: 79.3129, state: 'Tamil Nadu' },
    { name: 'Tirupati', fullName: 'Tirupati, Andhra Pradesh, India', placeId: 'ChIJk777v-NPUjoR7v_8v_y665M', lat: 13.6288, lng: 79.4192, state: 'Andhra Pradesh' },
    { name: 'Pollachi', fullName: 'Pollachi, Tamil Nadu, India', placeId: 'ChIJg_78v5j2rjsR9x_2v_e334M', lat: 10.6609, lng: 77.0048, state: 'Tamil Nadu' },
    { name: 'Namakkal', fullName: 'Namakkal, Tamil Nadu, India', placeId: 'ChIJu_89v0_MrjsR3w_7v_s556M', lat: 11.2189, lng: 78.1674, state: 'Tamil Nadu' },
    { name: 'Dharmapuri', fullName: 'Dharmapuri, Tamil Nadu, India', placeId: 'ChIJy_78v4fMrjsR2x_6v_d889M', lat: 12.1211, lng: 78.1582, state: 'Tamil Nadu' },
    { name: 'Krishnagiri', fullName: 'Krishnagiri, Tamil Nadu, India', placeId: 'ChIJw_67v1vPrjsR1w_5v_f778M', lat: 12.5186, lng: 78.2137, state: 'Tamil Nadu' },
    { name: 'Tiruvannamalai', fullName: 'Tiruvannamalai, Tamil Nadu, India', placeId: 'ChIJt_56v7fTUjoR4w_4v_c990M', lat: 12.2253, lng: 79.0747, state: 'Tamil Nadu' },
    { name: 'Cuddalore', fullName: 'Cuddalore, Tamil Nadu, India', placeId: 'ChIJs_45v-fAUjoR5w_3v_b112M', lat: 11.7480, lng: 79.7714, state: 'Tamil Nadu' },
    { name: 'Villupuram', fullName: 'Villupuram, Tamil Nadu, India', placeId: 'ChIJr_34v5jQUjoR6w_2v_a334M', lat: 11.9401, lng: 79.4861, state: 'Tamil Nadu' },
    { name: 'Mayiladuthurai', fullName: 'Mayiladuthurai, Tamil Nadu, India', placeId: 'ChIJq_23v4bZBzsR7w_1v_z556M', lat: 11.1075, lng: 79.6524, state: 'Tamil Nadu' },
    { name: 'Chidambaram', fullName: 'Chidambaram, Tamil Nadu, India', placeId: 'ChIJp_12v7fTBzsR8w_0v_y778M', lat: 11.3992, lng: 79.6934, state: 'Tamil Nadu' },
    { name: 'Theni', fullName: 'Theni, Tamil Nadu, India', placeId: 'ChIJo_01v9j5BzsR9w_9v_x990M', lat: 10.0104, lng: 77.4768, state: 'Tamil Nadu' },
    { name: 'Sivakasi', fullName: 'Sivakasi, Tamil Nadu, India', placeId: 'ChIJn_90v4b8BzsR0w_8v_w112M', lat: 9.4533, lng: 77.7942, state: 'Tamil Nadu' },
    { name: 'Tenkasi', fullName: 'Tenkasi, Tamil Nadu, India', placeId: 'ChIJm_89v1b-BzsR1w_7v_v334M', lat: 8.9594, lng: 77.3152, state: 'Tamil Nadu' },
    { name: 'Karaikudi', fullName: 'Karaikudi, Tamil Nadu, India', placeId: 'ChIJl_78v7bABzsR2w_6v_u556M', lat: 10.0735, lng: 78.7732, state: 'Tamil Nadu' },
    { name: 'Pudukkottai', fullName: 'Pudukkottai, Tamil Nadu, India', placeId: 'ChIJk_67v2fEBzsR3w_5v_t778M', lat: 10.3797, lng: 78.8208, state: 'Tamil Nadu' }
];

/**
 * Load Google Maps JavaScript API with Places library asynchronously
 */
export function loadGoogleMapsScript() {
    if (typeof window === 'undefined') {
        return Promise.resolve(null);
    }

    if (window.google && window.google.maps && window.google.maps.places) {
        return Promise.resolve(window.google.maps);
    }

    if (scriptLoadPromise) {
        return scriptLoadPromise;
    }

    const apiKey = GOOGLE_MAPS_API_KEY.trim();
    if (!apiKey || apiKey.includes('YOUR_') || apiKey.length < 15) {
        // No key configured; resolve with null so fallback directory is used
        return Promise.resolve(null);
    }

    scriptLoadPromise = new Promise((resolve) => {
        const existingScript = document.getElementById('supercabs-google-maps-sdk');
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(window.google?.maps || null));
            existingScript.addEventListener('error', () => resolve(null));
            return;
        }

        const script = document.createElement('script');
        script.id = 'supercabs-google-maps-sdk';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&loading=async`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (window.google && window.google.maps) {
                resolve(window.google.maps);
            } else {
                resolve(null);
            }
        };

        script.onerror = (e) => {
            console.warn('[Google Maps SDK] Failed to load external script:', e);
            resolve(null);
        };

        document.head.appendChild(script);
    });

    return scriptLoadPromise;
}

/**
 * Query autocomplete suggestions for an input string
 * Supports all interior locations, colonies, universities, landmarks, areas, and cities across India.
 *
 * @param {string} query - Typed text
 * @returns {Promise<Array>} List of { placeId, mainText, secondaryText, description, isGoogle }
 */
export async function getPlacePredictions(query = '') {
    const trimmed = String(query || '').trim();
    if (!trimmed || trimmed.length < 2) {
        return [];
    }

    // 1. Check in-memory prediction cache to eliminate repeated keystroke requests
    const cacheKey = trimmed.toLowerCase();
    if (predictionsCache.has(cacheKey)) {
        const cached = predictionsCache.get(cacheKey);
        // Valid for 1 hour
        if (cached && (Date.now() - cached.timestamp < 3600000)) {
            return cached.data;
        } else {
            predictionsCache.delete(cacheKey);
        }
    }

    // 2. Query Google Places API (New) via Backend Proxy
    try {
        const response = await api.get(`/routes/places/autocomplete?input=${encodeURIComponent(trimmed)}`);
        if (response && response.success && Array.isArray(response.predictions) && response.predictions.length > 0) {
            predictionsCache.set(cacheKey, {
                data: response.predictions,
                timestamp: Date.now()
            });
            return response.predictions;
        }
    } catch (proxyErr) {
        // Fall through to Client-Side SDK / OSM
    }

    // Try Google Places API Client SDK if loaded and no auth error
    if (!googleAuthError) {
        try {
            const maps = await loadGoogleMapsScript();
            if (maps && maps.places && maps.places.AutocompleteService) {
                const service = new maps.places.AutocompleteService();

                const predictions = await new Promise((resolve) => {
                    // Query across India without 'types' restriction to include all interior locations,
                    // areas, colonies, universities, landmarks, addresses, and cities.
                    service.getPlacePredictions(
                        {
                            input: trimmed,
                            componentRestrictions: { country: 'in' }
                        },
                        (results, status) => {
                            if (status === maps.places.PlacesServiceStatus.OK && Array.isArray(results) && results.length > 0) {
                                resolve(results);
                            } else {
                                resolve([]);
                            }
                        }
                    );
                });

                if (predictions && predictions.length > 0) {
                    const formatted = predictions.slice(0, 8).map((item) => ({
                        placeId: item.place_id,
                        mainText: item.structured_formatting?.main_text || item.description.split(',')[0],
                        secondaryText: item.structured_formatting?.secondary_text || item.description.substring(item.description.indexOf(',') + 1).trim(),
                        description: item.description,
                        isGoogle: true
                    }));

                    // Store in prediction cache
                    predictionsCache.set(cacheKey, {
                        data: formatted,
                        timestamp: Date.now()
                    });

                    // Track API usage stat asynchronously
                    api.post('/routes/places/track-api-call').catch(() => {});

                    return formatted;
                }
            }
        } catch (err) {
            console.warn('[Google Places Autocomplete] Service error:', err.message);
        }
    }

    // Live OpenStreetMap geocoding for all interior places, streets, colonies & villages across India
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const resp = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(trimmed)}&limit=8`,
            { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        if (resp.ok) {
            const data = await resp.json();
            if (data && Array.isArray(data.features) && data.features.length > 0) {
                const indianFeatures = data.features.filter(
                    (f) => !f.properties.countrycode || f.properties.countrycode.toLowerCase() === 'in'
                );
                const targetFeatures = indianFeatures.length > 0 ? indianFeatures : data.features;
                if (targetFeatures.length > 0) {
                    return targetFeatures.slice(0, 8).map((f) => {
                        const p = f.properties || {};
                        const coords = f.geometry?.coordinates || [0, 0];
                        const mainText = p.name || p.street || p.city || 'Location';
                        const secParts = [
                            p.street && p.street !== mainText ? p.street : null,
                            p.locality && p.locality !== mainText ? p.locality : null,
                            p.city && p.city !== mainText ? p.city : null,
                            p.district && p.district !== p.city ? p.district : null,
                            p.state,
                            p.country || 'India'
                        ].filter(Boolean);
                        const uniqueSec = secParts.filter((item, pos, arr) => arr.indexOf(item) === pos);
                        const secondaryText = uniqueSec.join(', ');
                        return {
                            placeId: `osm_${p.osm_type || 'N'}_${p.osm_id || Math.random().toString(36).substr(2, 8)}`,
                            mainText,
                            secondaryText,
                            description: `${mainText}, ${secondaryText}`,
                            lat: coords[1],
                            lng: coords[0],
                            isGoogle: false
                        };
                    });
                }
            }
        }
    } catch (osmErr) {
        // Non-blocking: fall through to offline curated directory
    }

    // Resilient Fallback: Search in curated South India & regional interior directory
    const lower = trimmed.toLowerCase();
    const queryParts = lower.split(/[\s,]+/).filter(Boolean);

    const scoredMatches = SOUTH_INDIA_CITIES.map((c) => {
        const nameLower = c.name.toLowerCase();
        const fullLower = c.fullName.toLowerCase();
        const stateLower = c.state.toLowerCase();

        let score = 0;
        if (queryParts.length > 1) {
            queryParts.forEach((part, pIdx) => {
                if (nameLower.startsWith(part)) {
                    score += pIdx === 0 ? 15 : 10;
                } else if (nameLower.includes(part)) {
                    score += 8;
                } else if (fullLower.includes(part)) {
                    score += 4;
                }
            });
        } else {
            if (nameLower.startsWith(lower)) score += 20;
            else if (nameLower.includes(lower)) score += 10;
            else if (fullLower.includes(lower)) score += 5;
            else if (stateLower.includes(lower)) score += 2;
        }

        return { item: c, score };
    }).filter(entry => entry.score > 0);

    // Sort by highest relevance score
    scoredMatches.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.item.name.localeCompare(b.item.name);
    });

    const matches = scoredMatches.slice(0, 8).map(entry => entry.item);

    return matches.slice(0, 8).map((item) => {
        const secText = item.fullName.includes(',')
            ? item.fullName.substring(item.fullName.indexOf(',') + 1).trim()
            : `${item.state}, India`;

        return {
            placeId: item.placeId,
            mainText: item.name,
            secondaryText: secText,
            description: item.fullName,
            lat: item.lat,
            lng: item.lng,
            isGoogle: false
        };
    });
}

/**
 * Fetch detailed coordinates and metadata for a selected place
 *
 * @param {Object} item - { placeId, mainText, description, lat, lng }
 * @returns {Promise<Object>} { name, fullName, placeId, lat, lng }
 */
export async function getPlaceDetails(item) {
    if (!item) return null;

    // 1. If coordinates already provided (fallback city item)
    if (item.lat && item.lng) {
        return {
            name: item.mainText || item.name,
            fullName: item.description || item.fullName || `${item.mainText}, India`,
            placeId: item.placeId,
            lat: Number(item.lat),
            lng: Number(item.lng),
            source: 'directory'
        };
    }

    const placeId = item.placeId;

    // 2. Check Client-Side In-Memory Place Cache
    if (placeId && placeDetailsCache.has(placeId)) {
        return placeDetailsCache.get(placeId);
    }

    // 3. Check Shared Backend MongoDB Place Cache or Fetch via Google Places API (New) Proxy
    if (placeId && !placeId.startsWith('osm_')) {
        try {
            const lookup = await api.get(`/routes/places/details?placeId=${encodeURIComponent(placeId)}`);
            if (lookup && lookup.success && lookup.place && lookup.place.lat && lookup.place.lng) {
                const fetchedPlace = {
                    name: lookup.place.name,
                    fullName: lookup.place.fullName,
                    placeId: lookup.place.placeId,
                    lat: Number(lookup.place.lat),
                    lng: Number(lookup.place.lng),
                    source: lookup.place.source || 'google_places_new'
                };
                placeDetailsCache.set(placeId, fetchedPlace);
                return fetchedPlace;
            }
        } catch (lookupErr) {
            // Non-blocking, continue to Google Places SDK
        }
    }

    // 4. Fetch details using Google PlacesService if available
    try {
        const maps = await loadGoogleMapsScript();
        if (maps && maps.places && placeId) {
            const dummyElem = document.createElement('div');
            const placesService = new maps.places.PlacesService(dummyElem);

            const details = await new Promise((resolve) => {
                placesService.getDetails(
                    {
                        placeId,
                        fields: ['geometry', 'name', 'formatted_address', 'address_components']
                    },
                    (place, status) => {
                        if (status === maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                            resolve(place);
                        } else {
                            resolve(null);
                        }
                    }
                );
            });

            if (details && details.geometry?.location) {
                let fullAddr = details.formatted_address || item.description;
                if (details.name && fullAddr && !fullAddr.toLowerCase().includes(details.name.toLowerCase())) {
                    fullAddr = `${details.name}, ${fullAddr}`;
                }
                const placeResult = {
                    name: details.name || item.mainText,
                    fullName: fullAddr || item.description,
                    placeId,
                    lat: details.geometry.location.lat(),
                    lng: details.geometry.location.lng(),
                    source: 'google_places'
                };

                // Store in client-side memory cache
                placeDetailsCache.set(placeId, placeResult);

                // Asynchronously store in shared backend MongoDB PlaceCache
                api.post('/routes/places/cache', placeResult).catch(() => {});
                api.post('/routes/places/track-api-call').catch(() => {});

                return placeResult;
            }
        }
    } catch (err) {
        console.warn('[Google Places Details] Failed to fetch coordinates:', err.message);
    }

    // Match against fallback directory by name if coordinates still missing
    const fallback = SOUTH_INDIA_CITIES.find(
        (c) => c.name.toLowerCase() === (item.mainText || '').toLowerCase()
    );
    if (fallback) {
        return {
            name: fallback.name,
            fullName: fallback.fullName,
            placeId: item.placeId || fallback.placeId,
            lat: fallback.lat,
            lng: fallback.lng,
            source: 'directory_match'
        };
    }

    // Last resort fallback
    return {
        name: item.mainText || item.description,
        fullName: item.description,
        placeId: item.placeId,
        lat: null,
        lng: null,
        source: 'unresolved'
    };
}

/**
 * Calculate driving distance between selected pickup & drop locations via backend Routes API
 *
 * @param {Object} pickup - Selected pickup place object
 * @param {Object} drop   - Selected drop place object
 * @param {string} tripType - 'oneway' or 'round'
 * @returns {Promise<Object>} Calculated distance, duration, and vehicle tariffs
 */
export async function calculateDrivingDistance(pickup, drop, tripType = 'oneway') {
    if (!pickup || !drop) {
        throw new Error('Both pickup and drop locations must be selected.');
    }

    const payload = {
        pickup: {
            name: pickup.name || pickup.fullName,
            fullName: pickup.fullName || pickup.name,
            placeId: pickup.placeId,
            lat: pickup.lat,
            lng: pickup.lng
        },
        drop: {
            name: drop.name || drop.fullName,
            fullName: drop.fullName || drop.name,
            placeId: drop.placeId,
            lat: drop.lat,
            lng: drop.lng
        },
        tripType
    };

    try {
        const response = await api.post('/routes/calculate-distance', payload);
        return {
            success: true,
            distanceKm: response.distanceKm,
            distanceMeters: response.distanceMeters,
            durationText: response.durationText,
            durationSeconds: response.durationSeconds,
            routeSource: response.routeSource,
            isGoogleApiConfigured: response.isGoogleApiConfigured,
            vehicleFares: response.vehicleFares || {},
            note: response.note
        };
    } catch (err) {
        const errorMsg = err.message || 'Failed to calculate driving distance.';
        const customErr = new Error(errorMsg);
        customErr.code = err.data?.code || (errorMsg.includes('same') ? 'IDENTICAL_LOCATIONS' : 'API_ERROR');
        throw customErr;
    }
}

const mapsService = {
    loadGoogleMapsScript,
    getPlacePredictions,
    getPlaceDetails,
    calculateDrivingDistance,
    SOUTH_INDIA_CITIES
};

export default mapsService;

