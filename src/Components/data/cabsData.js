// Content data for Super Cabs. Prices are PLACEHOLDERS – edit "PRICE_TBD" values.
export const PRICE = "₹ XXX";

export const services = [
  { 
    slug: "local", 
    title: "LOCAL RENTAL CABS", 
    image: "/assets/img/cabs/svc-local.jpg",
    tag: "City Rides & Rentals",
    icon: "fa-location-dot",
    text: "Our local rental services provide a convenient and flexible way to explore cities at your own pace. Choose from our wide range of well-maintained vehicles driven by experienced, professional drivers.",
    features: ["Within city limits", "Hourly rental options", "AC clean sedans"],
    microBadge: "Hourly: 4 Hrs / 40 Km • 8 Hrs / 80 Km"
  },
  { 
    slug: "outstation", 
    title: "DROP TAXI & ONE WAY TAXI", 
    image: "/assets/img/cabs/svc-outstation.jpg",
    tag: "Intercity & Drop Taxi",
    icon: "fa-route",
    text: "Book a premium one way taxi or drop taxi for your outstation travel. We specialize in providing reliable point-to-point drop services across South India. Save money by paying only for the distance traveled.",
    features: ["Highway trained drivers", "Interstate permits", "Transparent toll breakdown"],
    microBadge: "Popular: Ooty • Kodaikanal • Bangalore • Chennai"
  },
  { 
    slug: "airport", 
    title: "AIRPORT TRANSFERS", 
    image: "/assets/img/cabs/svc-airport.jpg",
    tag: "Punctual 24/7 Transfers",
    icon: "fa-plane-departure",
    text: "Get premium, on-time airport transfer services with zero delays. Easily book a drop taxi to major airports in Chennai, Coimbatore, and Bangalore with our dedicated 24/7 customer booking support.",
    features: ["Flight tracking support", "Doorstep luggage help", "Zero flight delay penalty"],
    microBadge: "Zero Delay Guarantee • 24/7 Control Room"
  },
  { 
    slug: "oneway-roundtrip", 
    title: "One-Way / Round Trip", 
    image: "/assets/img/cabs/svc-oneway.jpg",
    tag: "Pay Single / Return",
    icon: "fa-arrows-split-up-and-left",
    text: "Pay only for the single-direction drop with zero return charges, or retain the dedicated cab & chauffeur throughout your tour.",
    features: ["No empty return fare on one-way", "Dedicated chauffeur for round-trips", "Instant highway confirmation"],
    link: "/services/one-way-round-trip",
    isSpecialPage: true,
    microBadge: "Save Up To 40% On Return Fares"
  },
  { 
    slug: "corporate", 
    title: "Corporate Taxi Services", 
    image: "/assets/img/cabs/svc-corporate.jpg",
    tag: "Executive & Business",
    icon: "fa-briefcase",
    text: "Dependable executive employee transport, VIP client pickups and official corporate business travel with GST invoicing.",
    features: ["Monthly GST billing", "Uniformed chauffeurs", "Executive fleet"],
    microBadge: "Monthly Invoicing • VIP Chauffeur Fleet"
  },
];

export const popularOneWayRoutes = [
  { from: "Coimbatore", to: "Chennai", distance: "510 km", time: "8.5 hrs", sedanFare: "₹ 7,650", suvFare: "₹ 9,690", popular: true },
  { from: "Coimbatore", to: "Bangalore", distance: "365 km", time: "6.5 hrs", sedanFare: "₹ 5,475", suvFare: "₹ 6,935", popular: true },
  { from: "Coimbatore", to: "Ooty", distance: "86 km", time: "3 hrs", sedanFare: "₹ 2,499", suvFare: "₹ 3,499", popular: true },
  { from: "Coimbatore", to: "Madurai", distance: "215 km", time: "4.5 hrs", sedanFare: "₹ 3,450", suvFare: "₹ 4,300", popular: false },
  { from: "Coimbatore", to: "Salem", distance: "165 km", time: "3 hrs", sedanFare: "₹ 2,650", suvFare: "₹ 3,300", popular: false },
  { from: "Coimbatore", to: "Kodaikanal", distance: "175 km", time: "4.5 hrs", sedanFare: "₹ 3,850", suvFare: "₹ 4,850", popular: true },
  { from: "Coimbatore", to: "Trichy", distance: "218 km", time: "4.5 hrs", sedanFare: "₹ 3,499", suvFare: "₹ 4,350", popular: false },
  { from: "Coimbatore", to: "Kochi / Ernakulam", distance: "190 km", time: "4.5 hrs", sedanFare: "₹ 3,800", suvFare: "₹ 4,750", popular: false },
];

export const vehicles = [
  { 
    slug: "hatchback", 
    category: "hatchback",
    name: "Compact Hatchback", 
    image: "/assets/img/cabs/hatchback.jpg",
    tag: "Economy Choice",
    models: "Maruti Swift, WagonR, Tata Tiago or equivalent",
    seats: "4 Passengers + 1 Driver", 
    seatingCapacity: 4,
    luggage: "2 Bags + Handbags",
    ac: "Chilled AC",
    rateHourly: "₹ 1,800",
    rateHourlySub: "8 Hrs / 80 Km",
    rateOneWay: "₹ 14 / km",
    rateRoundTrip: "₹ 11 / km",
    rateAirport: "₹ 799",
    driverBata: "₹ 400 / day",
    features: [
      "Chilled AC cabin & sanitised seats", 
      "Compact & fuel-efficient for quick transit", 
      "Suitable for solo, couples & small families",
      "FASTag toll enabled & polite chauffeur"
    ] 
  },
  { 
    slug: "sedan", 
    category: "sedan",
    name: "Comfort Sedan", 
    image: "/assets/img/cabs/sedan.jpg",
    tag: "Most Popular",
    models: "New Maruti Swift Dzire, Hyundai Aura, Honda Amaze",
    seats: "4 Passengers + 1 Driver", 
    seatingCapacity: 4,
    luggage: "3 Large Bags + Handbags",
    ac: "Chilled AC",
    rateHourly: "₹ 2,200",
    rateHourlySub: "8 Hrs / 80 Km",
    rateOneWay: "₹ 15 / km",
    rateRoundTrip: "₹ 12 / km",
    rateAirport: "₹ 999",
    driverBata: "₹ 400 / day",
    features: [
      "Large 400L+ boot space for outstation bags", 
      "Generous legroom & comfortable rear seating", 
      "Smooth highway ride for long distance drops",
      "GPS tracking & verified experienced driver"
    ] 
  },
  { 
    slug: "premium-sedan", 
    category: "sedan",
    name: "Executive Luxury Sedan", 
    image: "/assets/img/cabs/premium-sedan.jpg",
    tag: "Executive Luxury",
    models: "Maruti Ciaz, Honda City, Hyundai Verna",
    seats: "4 Passengers + 1 Driver", 
    seatingCapacity: 4,
    luggage: "3 Large Suitcases",
    ac: "Climate Control",
    rateHourly: "₹ 2,800",
    rateHourlySub: "8 Hrs / 80 Km",
    rateOneWay: "₹ 17 / km",
    rateRoundTrip: "₹ 15 / km",
    rateAirport: "₹ 1,399",
    driverBata: "₹ 500 / day",
    features: [
      "Automatic digital climate control", 
      "Plush leather upholstery & rear armrest", 
      "Silent cabin for business calls & VIP transit",
      "Uniformed corporate-trained chauffeur"
    ] 
  },
  { 
    slug: "suv", 
    category: "suv",
    name: "Family SUV (6-Seater)", 
    image: "/assets/img/cabs/suv.jpg",
    tag: "Family Comfort",
    models: "Maruti Ertiga, Renault Triber, Kia Carens",
    seats: "6 Passengers + 1 Driver", 
    seatingCapacity: 6,
    luggage: "4 Bags + Roof Carrier Option",
    ac: "Dual AC Vents",
    rateHourly: "₹ 3,200",
    rateHourlySub: "8 Hrs / 80 Km",
    rateOneWay: "₹ 18 / km",
    rateRoundTrip: "₹ 16 / km",
    rateAirport: "₹ 1,499",
    driverBata: "₹ 500 / day",
    features: [
      "Dual AC with dedicated rear air vents", 
      "Flexible 3rd row seating for extra bags", 
      "High ground clearance for hill station trips",
      "Spacious & comfortable for family tours"
    ] 
  },
  { 
    slug: "mpv", 
    category: "suv",
    name: "Prime SUV / Innova Crysta", 
    image: "/assets/img/cabs/mpv.jpg",
    tag: "Spacious 7-Seater",
    models: "Toyota Innova, Innova Crysta 7-Seater",
    seats: "7 Passengers + 1 Driver", 
    seatingCapacity: 7,
    luggage: "5 Large Bags",
    ac: "Multi-Zone AC",
    rateHourly: "₹ 4,000",
    rateHourlySub: "8 Hrs / 80 Km",
    rateOneWay: "₹ 22 / km",
    rateRoundTrip: "₹ 19 / km",
    rateAirport: "₹ 1,899",
    driverBata: "₹ 600 / day",
    features: [
      "Individual captain seats & recliner comfort", 
      "Multi-row chilled AC with blower controls", 
      "Superior highway stability & suspension",
      "Ample luggage space for vacation & wedding travel"
    ] 
  },
  { 
    slug: "tempo-traveller", 
    category: "tempo",
    name: "Luxury Tempo Traveller", 
    image: "/assets/img/cabs/tempo-traveller.jpg",
    tag: "Large Group Tours",
    models: "Force Traveller 12-Seater Luxury AC",
    seats: "12 Passengers + 1 Driver", 
    seatingCapacity: 12,
    luggage: "8+ Large Bags & Boot",
    ac: "Ducted Roof AC",
    rateHourly: "₹ 5,200",
    rateHourlySub: "8 Hrs / 80 Km",
    rateOneWay: "₹ 28 / km",
    rateRoundTrip: "₹ 24 / km",
    rateAirport: "₹ 2,499",
    driverBata: "₹ 700 / day",
    features: [
      "Individual push-back reclining seats & high roof", 
      "Ducted AC vents for every passenger seat", 
      "Sound system, TV screen & mobile charging points",
      "Dedicated spacious rear luggage compartment"
    ] 
  },
];

export const whyChoose = [
  { 
    image: "/assets/img/cabs/about-2.jpg", 
    tag: "Safety First",
    icon: "/assets/img/icon/about_1_1.svg", 
    title: "Safe & Reliable Rides", 
    text: "Well-maintained vehicles, sanitised cabins and responsible verified drivers for every journey." 
  },
  { 
    image: "/assets/img/cabs/cat-airport.jpg", 
    tag: "Zero Delay",
    icon: "/assets/img/icon/about_1_2.svg", 
    title: "On-Time Pickup", 
    text: "Punctual pickups for airport transfers, train connections, and urgent city meetings." 
  },
  { 
    image: "/assets/img/cabs/cat-oneway.jpg", 
    tag: "Fair Tariff",
    icon: "/assets/img/icon/about_1_3.svg", 
    title: "Transparent Pricing", 
    text: "Clear, all-inclusive tariff details shared before confirmation — zero surprise fees." 
  },
  { 
    image: "/assets/img/cabs/about-3.jpg", 
    tag: "24/7 Live Desk",
    icon: "/assets/img/icon/guide.svg", 
    title: "24/7 Booking Support", 
    text: "Call or WhatsApp us anytime for immediate cab dispatch, trip quotes, or booking changes." 
  },
];

export const tours = [
  {
    id: 1,
    slug: "local-sightseeing",
    image: "/assets/img/cabs/tour-sightseeing.jpg",
    tag: "City Day Tour",
    title: "Local City Sightseeing Tour",
    duration: "1 Day (8 - 10 Hours)",
    places: "Historic Temples, Museum, Botanical Park & Artisan Bazaars",
    placesCovered: [
      "Perur Pateeswarar Temple & Sacred Shrines",
      "Government Museum & Regional Heritage Art Gallery",
      "VOC Botanical Gardens & Children's Park",
      "Town Hall & Traditional Handloom Bazaars",
      "Famous Authentic South Indian Food Street",
      "Singanallur Scenic Sunset Lake & Bird Viewpoint"
    ],
    text: "Experience the vibrant heart of the city in air-conditioned comfort. Flexible stops for photography, lunch, and souvenir shopping with a dedicated local driver.",
    overview: "Experience the rich culture, heritage temples, and bustling vibrant markets of the city without the hassle of navigation, traffic, or finding parking. Our polite, local-route knowledgeable chauffeur will pick you up directly from your doorstep at your preferred morning hour. Enjoy an air-conditioned, relaxed journey with total freedom to spend as much time as you like at each attraction, take souvenir shopping breaks, and dine at iconic traditional restaurants.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "1 Day Local City Sightseeing Tour",
        points: [
          "Pickup and Drop from Coimbatore / your doorstep",
          "Visit Historic Temples, Museum, Botanical Garden, Singanallur Lake",
          "Private AC Sedan / SUV / Tempo Traveller available",
          "Ideal for quick day outings, temple visits & shopping"
        ]
      }
    ],
    highlights: ["Doorstep pickup & drop", "Flexible 8-10 hrs package", "Chilled AC Sedan or SUV", "Fuel & driver bata included", "Zero parking or route hassles"],
    inclusions: [
      "Dedicated private AC cab throughout the tour (8-10 Hours / 80-100 Km)",
      "Fuel charges and driver bata included",
      "Doorstep pickup and return drop at your residence or hotel",
      "Flexible itinerary stops and photo breaks",
      "Luggage assistance & 24/7 dispatch control room support"
    ],
    exclusions: [
      "Monument, park and museum entry tickets",
      "Meals, refreshments, and personal shopping expenses",
      "Special temple pooja charges"
    ],
    suitableFor: "Families, Senior Citizens, Couples, Solo Travelers, Day Visitors",
        startingFare: "₹ 2,499 (Sedan All-Inclusive)",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "₹ 2,499",
                "tag": "Most Popular",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "₹ 3,499",
                "tag": "Family Comfort",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "₹ 4,299",
                "tag": "Supreme Comfort",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "₹ 5,999",
                "tag": "Large Groups",
                "icon": "fa-bus"
          }
    ]
  },
  {
    id: 2,
    slug: "hill-station",
    image: "/assets/img/cabs/tour-hillstation.jpg",
    tag: "Mountain Escape",
    title: "Hill Station Weekend Getaway",
    duration: "2 Days / 1 Night",
    places: "Misty Mountain Peaks, Tea Estates, Botanical Gardens & Boating Lake",
    placesCovered: [
      "Scenic Hairpin Bends & Ghat-Road Viewpoints",
      "Vast Emerald Tea & Spice Valley Plantations",
      "Famous Botanical Gardens & Centenary Rose Garden",
      "Pykara Cascading Waterfalls & Serene Boating Lake",
      "Doddabetta High Peak & Telescope Observatory",
      "Homemade Chocolate & Essential Oils Factory"
    ],
    text: "Escape city heat to scenic hill stations (Ooty / Kodaikanal / Munnar). Travel safely through scenic hairpin bends with our experienced ghat-road chauffeurs.",
    overview: "Leave the sweltering plains behind and escape to cool, misty hill stations (Ooty, Kodaikanal, Yercaud, or Coonoor). Traveling through winding mountain ghat roads requires expert, patient driving — our certified ghat-road chauffeurs ensure your family travels in 100% safety and supreme comfort. Take photo breaks at panoramic valleys, inhale fresh pine-scented mountain air, cruise on calm lakes, and unwind amidst lush tea gardens.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "1 Day Ooty Hill Sightseeing Tour",
        points: [
          "Pickup and Drop from Coimbatore / doorstep",
          "Visit Doddabetta Peak, Tea Factory, Botanical Garden, Ooty Lake",
          "Private AC Sedan / SUV / Tempo Traveller available",
          "Ideal for quick getaways & scenic hill photography"
        ]
      },
      {
        timeOrDay: "Day 2",
        title: "Pykara Waterfalls, Pine Forest & Return Journey",
        points: [
          "Visit Pykara Cascading Waterfalls, Boating Lake & Pine Forest",
          "Scenic mountain viewpoints, tea estates & chocolate shopping",
          "Chauffeur-driven comfortable mountain ghat-road ride",
          "Safe descent and doorstep drop back home"
        ]
      }
    ],
    highlights: ["Ghat-road certified drivers", "Flexible sightseeing stops", "Safe mountain driving", "Scenic route photo stops", "Spacious luggage room for warm clothes"],
    inclusions: [
      "Private AC vehicle reserved exclusively for your group for 2 full days",
      "Chauffeur allowance (Day & Night Bata)",
      "Fuel charges for the scheduled tour itinerary",
      "Doorstep pickup & drop at your home or hotel",
      "Interstate permits & hill station entry assistance"
    ],
    exclusions: [
      "Hotel accommodation & meals",
      "Lake boating, camera passes & garden entry tickets",
      "Personal shopping & room service"
    ],
    suitableFor: "Families, Couples, Nature Lovers, Weekend Getaways",
        startingFare: "₹ 5,499 (Sedan 2 Days)",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "₹ 5,499",
                "tag": "Most Popular",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "₹ 7,499",
                "tag": "Family Comfort",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "₹ 8,999",
                "tag": "Ghat-Road Special",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "₹ 12,499",
                "tag": "Group Getaway",
                "icon": "fa-bus"
          }
    ]
  },
  {
    id: 3,
    slug: "temple-circuit",
    image: "/assets/img/cabs/tour-temple.jpg",
    tag: "Pilgrimage Circuit",
    title: "Sacred Temple Circuit Tour",
    duration: "2 Days / 1 Night",
    places: "Meenakshi Temple, Rameswaram Pamban Bridge & Thanjavur Big Temple",
    placesCovered: [
      "Madurai Meenakshi Sundareswarar Temple",
      "Thirumalai Nayakkar Mahal Historic Palace",
      "Engineering Marvel Pamban Sea Bridge",
      "Rameswaram Ramanathaswamy Temple & 22 Sacred Theerthams",
      "Dhanushkodi Border Point & Vibhishana Temple",
      "Thanjavur Brihadisvara UNESCO World Heritage Temple"
    ],
    text: "Spiritual pilgrimage designed especially for families and elderly travelers. Relaxed darshan timings, temple town navigation, and clean AC sanitized cabins.",
    overview: "Embark on a spiritually enriching pilgrimage across South India's most venerated temples. Tailored especially for families, elderly parents, and devotees seeking a comfortable, unhurried divine experience. Our respectful, experienced chauffeurs assist with elder boarding, temple town navigation, early morning darshan timings, and luggage security while you worship.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "Madurai Meenakshi Temple & Pamban Sea Bridge",
        points: [
          "Pickup and Drop from Coimbatore / doorstep",
          "Visit Madurai Meenakshi Amman Temple & historic Thirumalai Palace",
          "Scenic ocean drive across engineering marvel Pamban Sea Bridge to Rameswaram",
          "Private AC Sedan / SUV / Tempo Traveller available",
          "Senior citizen friendly with relaxed darshan timings"
        ]
      },
      {
        timeOrDay: "Day 2",
        title: "Ramanathaswamy Theerthams, Dhanushkodi & Return",
        points: [
          "Holy bath at 22 sacred theerthams & morning darshan of Ramanathaswamy Jyotirlinga",
          "Drive to dramatic coastal land's end of Dhanushkodi & Rama Setu viewpoint",
          "Comfortable highway return journey with polite verified chauffeur",
          "Doorstep drop back at your residence"
        ]
      }
    ],
    highlights: ["Senior-friendly travel pace", "Early morning darshan drops", "Comfortable halts", "Luggage assistance", "Courteous verified chauffeur"],
    inclusions: [
      "Dedicated private AC cab for 2 full days",
      "Chauffeur food & night accommodation allowances",
      "Fuel charges for the entire pilgrimage route",
      "Doorstep pickup and return drop",
      "Temple dress code and darshan timing guidance"
    ],
    exclusions: [
      "Special VIP darshan tickets & priest dakshina",
      "Hotel accommodation & personal meals",
      "Theertham bathing assistance fee"
    ],
    suitableFor: "Senior Citizens, Families, Spiritual Pilgrims & Devotees",
        startingFare: "₹ 6,999 (Sedan 2 Days)",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "₹ 6,999",
                "tag": "Most Popular",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "₹ 9,299",
                "tag": "Family Pilgrim",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "₹ 11,499",
                "tag": "Senior-Friendly",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "₹ 15,999",
                "tag": "Pilgrim Group",
                "icon": "fa-bus"
          }
    ]
  },
  {
    id: 4,
    slug: "nature-wildlife",
    image: "/assets/img/cabs/tour-nature.jpg",
    tag: "Nature & Adventure",
    title: "Waterfalls & Nature Wildlife Tour",
    duration: "2 Days / 1 Night",
    places: "Lush Waterfalls, Wildlife Sanctuary, Forest Drive & Spice Plantations",
    placesCovered: [
      "Athirappilly & Vazhachal Roaring Waterfalls",
      "Anamalai Tiger Reserve & Rainforest Canopy Drive",
      "Sholayar Majestic Hydroelectric Dam Viewpoint",
      "Aromatic Cardamom & Organic Vanilla Plantations",
      "Aliyar Reservoir Park & Monkey Falls",
      "Sunset Valley Viewpoints with Mist Covered Peaks"
    ],
    text: "Recharge your soul surrounded by dense green forest valleys and roaring waterfalls. Complete freedom to customize stops for elephant spotting and bamboo rafting.",
    overview: "Immerse yourself in lush greenery, misty evergreen forest canopies, and thunderous waterfalls. Ideal for nature lovers, wildlife enthusiasts, and photographers. Our drivers know every scenic pullover, safe animal viewing spot, and fresh mountain stream crossing.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "Forest Canopy Drive & Roaring Waterfalls",
        points: [
          "Pickup and Drop from Coimbatore / doorstep",
          "Visit Athirappilly & Vazhachal roaring cascades & rainforest canopy",
          "Explore Sholayar Dam reservoir sunset viewpoint",
          "Private AC Sedan / SUV / Tempo Traveller available",
          "Ideal for nature getaways, birdwatching & photography"
        ]
      },
      {
        timeOrDay: "Day 2",
        title: "Wildlife Sanctuary Safari, Spice Plantations & Return",
        points: [
          "Morning wildlife reserve drive with elephant & deer spotting",
          "Guided walk through aromatic cardamom, clove & vanilla estates",
          "Fresh mountain stream photo halts & Aliyar park visit",
          "Scenic and safe return drop back home"
        ]
      }
    ],
    highlights: ["Scenic jungle routes", "Zero rush travel", "Safe night halts", "Spacious boot for gear", "Experienced eco-route driver"],
    inclusions: [
      "Private AC cab for 2 full days",
      "Fuel, driver allowance & parking assistance",
      "Doorstep pickup & drop",
      "Custom stops for wildlife photography",
      "Safe sanitized vehicle cabin"
    ],
    exclusions: [
      "Forest department entry & vehicle toll permits",
      "Safari tickets & camera passes",
      "Food and resort accommodation"
    ],
    suitableFor: "Nature Enthusiasts, Photographers, Friends & Adventure Lovers",
        startingFare: "₹ 5,799 (Sedan 2 Days)",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "₹ 5,799",
                "tag": "Most Popular",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "₹ 7,899",
                "tag": "Family Comfort",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "₹ 9,499",
                "tag": "Forest Safari",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "₹ 13,299",
                "tag": "Adventure Group",
                "icon": "fa-bus"
          }
    ]
  },
  {
    id: 5,
    slug: "beach-coastal",
    image: "/assets/img/cabs/tour-beach.jpg",
    tag: "Coastal Gateway",
    title: "Coastal Beaches & Heritage Tour",
    duration: "3 Days / 2 Nights",
    places: "French Colony Promenade, Ancient Shore Temples & Sunrise Beach",
    placesCovered: [
      "Mahabalipuram UNESCO Shore Temple & 5 Rathas",
      "Scenic East Coast Road (ECR) Ocean Highway",
      "Pondicherry French Quarter (White Town) Heritage Mansions",
      "Promenade Beach & Rock Beach Seashore",
      "Auroville Universal Township & Matrimandir Sphere",
      "Paradise Beach Golden Sand Island via Speedboat"
    ],
    text: "Cruise along breathtaking coastal highways to seaside towns (Pondicherry, Mahabalipuram, Kanyakumari). Enjoy beach strolls, seaside cafes, and coastal sunsets.",
    overview: "Breathe in the salty ocean breeze and drive along the scenic East Coast Road. This package combines centuries-old UNESCO rock architecture with the charming colonial lanes of Pondicherry and sun-kissed golden sand beaches. Perfect for romantic getaways, group weekenders, and family beach holidays.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "East Coast Road & Mahabalipuram Heritage Sights",
        points: [
          "Pickup and Drop from your city / doorstep",
          "Visit UNESCO Shore Temple, Pancha Rathas & Arjuna's Penance",
          "Drive along East Coast Road to Pondicherry & sunset at Promenade Beach",
          "Private AC Sedan / SUV / Tempo Traveller available"
        ]
      },
      {
        timeOrDay: "Day 2",
        title: "Auroville Matrimandir & Paradise Beach Speedboat",
        points: [
          "Visit Auroville international township & iconic golden Matrimandir",
          "Speedboat ride across backwaters to golden-sand Paradise Beach",
          "Relax at White Town French cafes, boutique bakeries & seaside",
          "Flexible halts for photography and beach leisure"
        ]
      },
      {
        timeOrDay: "Day 3",
        title: "French Colony Heritage Walk & Safe Return Drive",
        points: [
          "Morning stroll through pastel French colonial villas & Aurobindo Ashram",
          "Shopping for handmade paper, candles, ceramic crafts & souvenirs",
          "Smooth highway return cruise with doorstep return drop"
        ]
      }
    ],
    highlights: ["East Coast Road highway cruise", "Beachside drops", "Air-conditioned comfort", "24/7 dedicated cab", "Luggage safety during stops"],
    inclusions: [
      "Private AC vehicle for full 3-day tour",
      "Driver day & night bata and highway fuel",
      "Doorstep pickup & drop",
      "Assistance with interstate permits (TN & Puducherry)",
      "Unlimited local sightseeing stops"
    ],
    exclusions: [
      "Hotel stay & meals",
      "Chunnambar boat tickets to Paradise Beach",
      "Monument entrance passes"
    ],
    suitableFor: "Couples, Friends, Families & Beach Lovers",
        startingFare: "₹ 10,499 (Sedan 3 Days)",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "₹ 10,499",
                "tag": "Most Popular",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "₹ 13,499",
                "tag": "Family Comfort",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "₹ 16,299",
                "tag": "Highway Cruise",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "₹ 22,999",
                "tag": "Group Holiday",
                "icon": "fa-bus"
          }
    ]
  },
  {
    id: 6,
    slug: "heritage-culture",
    image: "/assets/img/cabs/tour-heritage.jpg",
    tag: "Royal Heritage",
    title: "Royal Heritage & Palaces Tour",
    duration: "3 Days / 2 Nights",
    places: "Royal Palaces, Ancient Stone Forts, Silk Markets & Cultural Monuments",
    placesCovered: [
      "Grand Mysore Palace (Amba Vilas) & Durbar Hall",
      "Chamundeshwari Hilltop Temple & Giant Nandi Monolith",
      "Brindavan Musical Dancing Fountain Gardens",
      "Historic Tipu Sultan Summer Palace & Srirangapatna Fort",
      "Belur & Halebidu Hoysala Marvel Temples",
      "Authentic Mysore Silk & Pure Sandalwood Oil Emporiums"
    ],
    text: "Journey through historical dynasties and royal monuments. Chauffeur guides you to iconic palace illumination views, historic forts, and authentic local cuisine spots.",
    overview: "Travel back in time to the golden eras of the Wodeyars and Hoysala dynasties. Marvel at intricate stone carvings, royal durbar halls with stained glass ceilings, dancing musical fountains, and legendary warrior forts. Travel in air-conditioned royal comfort with a courteous Super Cabs chauffeur.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "Chamundi Hill Darshan & Brindavan Musical Gardens",
        points: [
          "Pickup and Drop from Coimbatore / doorstep",
          "Visit Chamundi Hilltop Temple & panoramic aerial city view",
          "Evening visit to world-famous Brindavan illuminated musical fountain show",
          "Private AC Sedan / SUV / Tempo Traveller available"
        ]
      },
      {
        timeOrDay: "Day 2",
        title: "Grand Mysore Palace & Heritage Silk Markets",
        points: [
          "Full day tour of iconic Grand Mysore Palace & royal Durbar Hall",
          "Explore heritage art gallery collections & royal monuments",
          "Shop for GI-tagged Mysore silk sarees & pure sandalwood oil",
          "Evening Palace illumination view and local cuisine dining"
        ]
      },
      {
        timeOrDay: "Day 3",
        title: "Srirangapatna River Fortress & Return Journey",
        points: [
          "Visit Tipu Sultan's river island fortress, summer palace & Gumbaz",
          "Explore ancient Hoysala architecture temples along Kaveri river",
          "Comfortable highway return journey with safe doorstep drop"
        ]
      }
    ],
    highlights: ["Interstate permit guidance", "Palace & fort drop", "Local cuisine recommendations", "Luggage safety", "Chauffeur on-call throughout"],
    inclusions: [
      "Dedicated private AC cab for 3 full days",
      "Driver night bata and outstation fuel included",
      "Doorstep pickup and drop",
      "Complete interstate permit handling",
      "Chauffeur on-call throughout the tour"
    ],
    exclusions: [
      "Palace & garden entrance tickets",
      "Hotel stay & meals",
      "Professional monument guide fees"
    ],
    suitableFor: "History Buffs, Families with Kids, Art & Culture Admirers",
        startingFare: "₹ 9,899 (Sedan 3 Days)",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "₹ 9,899",
                "tag": "Most Popular",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "₹ 12,799",
                "tag": "Family Comfort",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "₹ 15,199",
                "tag": "Royal Travel",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "₹ 21,499",
                "tag": "Heritage Group",
                "icon": "fa-bus"
          }
    ]
  },
  {
    id: 7,
    slug: "family-holiday",
    image: "/assets/img/cabs/tour-family.jpg",
    tag: "Family Special",
    title: "Grand Family Holiday Package",
    duration: "4 Days / 3 Nights",
    places: "Multi-Destination Itinerary: Hill Station + Waterfalls + Wildlife Safari",
    placesCovered: [
      "Misty Hill Valleys & Endless Tea Gardens",
      "Wildlife Lake Boat Safari at Periyar Tiger Reserve",
      "Traditional Kerala Backwater Cruise & Alleppey Canals",
      "Thunderous Forest Waterfalls & River Rafting Point",
      "Elephant Bathing & Spice Plantation Eco-Walk",
      "Scenic Hill Viewpoints & Sunset Peaks"
    ],
    text: "The ultimate stress-free holiday for families traveling with kids and elders. Spacious Innova Crysta or Tempo Traveller with ample luggage room and private chauffeur.",
    overview: "The quintessential family road holiday designed for multi-generational travel! Whether you have energetic kids or elderly parents who need a gentle pace, our spacious SUVs (Innova Crysta) and luxury Tempo Travellers provide supreme legroom, plush seats, dual AC, and abundant boot space for all luggage.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "Misty Hill Valleys Arrival & Tea Garden Sunset",
        points: [
          "Pickup and Drop from Coimbatore / doorstep",
          "Scenic mountain drive with roadside waterfall photo halts",
          "Check in amidst mist-covered rolling green tea slopes",
          "Spacious Innova Crysta / Tempo Traveller with ample luggage room"
        ]
      },
      {
        timeOrDay: "Day 2",
        title: "Wildlife Lake Boat Safari & Spice Plantations",
        points: [
          "Morning wildlife lake boat safari spotting wild elephants & birds",
          "Guided aromatic eco-walk through spice & cardamom plantations",
          "Evening traditional Kathakali dance & martial arts show",
          "Kid and elder friendly pace with zero rush"
        ]
      },
      {
        timeOrDay: "Day 3",
        title: "Backwaters Cruise & Houseboat Canal Ride",
        points: [
          "Scenic drive to backwaters & boarding private houseboat / day cruiser",
          "Cruise through palm-fringed canals, lagoons & local fishing hamlets",
          "Traditional Kerala lunch freshly prepared on board",
          "Dedicated verified chauffeur handles all luggage & vehicle safety"
        ]
      },
      {
        timeOrDay: "Day 4",
        title: "Local Souvenir Shopping & Safe Return Journey",
        points: [
          "Sunrise view by the serene backwaters & breakfast",
          "Shopping for fresh spices, banana chips & traditional wooden crafts",
          "Comfortable return highway drive with doorstep drop back home"
        ]
      }
    ],
    highlights: ["Spacious 7-seater or 12-seater", "Kid & elder friendly pace", "Doorstep pickup", "All toll & parking transparent", "Family certified chauffeur"],
    inclusions: [
      "Dedicated premium vehicle (Innova Crysta / Tempo Traveller)",
      "Chauffeur food and lodging allowance (All 4 Days)",
      "All interstate vehicle road taxes and permits",
      "Doorstep pickup and return drop",
      "24/7 dedicated dispatch manager"
    ],
    exclusions: [
      "Hotel / houseboat accommodation and meals",
      "Safari, boat ride and cultural show tickets",
      "Personal shopping expenses"
    ],
    suitableFor: "Large Families, Multi-Generational Groups, Vacationers",
        startingFare: "₹ 13,999 (Sedan 4 Days)",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "₹ 13,999",
                "tag": "Economy",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "₹ 17,999",
                "tag": "Family Comfort",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "₹ 21,499",
                "tag": "Recommended",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "₹ 29,999",
                "tag": "Joint Family",
                "icon": "fa-bus"
          }
    ]
  },
  {
    id: 8,
    slug: "custom-tour",
    image: "/assets/img/cabs/tour-custom.jpg",
    tag: "Custom Itinerary",
    title: "Customized Tailor-Made Tour",
    duration: "Flexible / As Desired",
    places: "Any Destinations Across Tamil Nadu, Kerala, Karnataka & Andhra Pradesh",
    placesCovered: [
      "Your Hand-Picked Hill Stations (Ooty, Munnar, Kodaikanal, Coorg)",
      "Sacred Temple Towns (Tirupati, Madurai, Rameswaram, Thanjavur, Palani)",
      "Coastal Retreats (Pondicherry, Kanyakumari, Varkala, Gokarna)",
      "Wildlife Sanctuaries & Nature Parks (Bandipur, Topslip, Mudumalai)",
      "Business, Wedding & Multi-City Family Circuits"
    ],
    text: "Design your own road trip! Pick your destinations, preferred cab category, and travel dates. Our 24/7 team will curate the optimal route and best package price.",
    overview: "Have a unique dream itinerary in mind? Want to combine a family pilgrimage with a hill station break or plan wedding guest transportation across South India? Tell us your vision! Super Cabs will plan the most efficient route, suggest the best vehicle category, and give you an all-inclusive transparent quote with no surprises.",
    itinerary: [
      {
        timeOrDay: "Day 1",
        title: "Personalized Departure & Hand-Picked Attractions",
        points: [
          "Pickup and Drop from Coimbatore / your city",
          "Visit your chosen destinations with 100% schedule flexibility",
          "Private AC Sedan / SUV / Tempo Traveller available",
          "Ideal for quick getaways, family trips & pilgrimage circuits"
        ]
      },
      {
        timeOrDay: "Day 2",
        title: "Curated Destinations & Local Sightseeing",
        points: [
          "Explore hill stations, temple towns or beaches at your own pace",
          "Stop wherever you wish for photography, dining & relaxation",
          "Polite verified chauffeur dedicated exclusively to your group"
        ]
      },
      {
        timeOrDay: "Day 3+",
        title: "Extended Route & Safe Doorstep Drop",
        points: [
          "Custom multi-city travel across South India as desired",
          "Transparent all-inclusive fare quote with zero hidden surcharges",
          "Smooth return highway journey with safe doorstep drop"
        ]
      }
    ],
    highlights: ["100% custom itinerary", "Choice of vehicle model", "Instant customized quote", "Flexible payment options", "Dedicated trip manager"],
    inclusions: [
      "Customized private vehicle as per your group size",
      "Fuel charges, driver allowances & highway tolls guidance",
      "Doorstep pickup and drop from any South Indian city",
      "Total freedom to modify sightseeing stops on the go",
      "Dedicated 24/7 phone and WhatsApp concierge support"
    ],
    exclusions: [
      "Hotel stays and entrance tickets (can be arranged upon request)",
      "Personal expenses and meals"
    ],
    suitableFor: "Groups, Custom Family Vacations, Corporate Retreats & Weddings",
        startingFare: "Custom Quote",
    vehiclePricing: [
          {
                "vehicle": "AC Sedan (New Swift Dzire / Aura)",
                "seats": "4 Passengers",
                "price": "Custom Quote",
                "tag": "Economy",
                "icon": "fa-car"
          },
          {
                "vehicle": "AC SUV (Ertiga / Carens)",
                "seats": "6 Passengers",
                "price": "Custom Quote",
                "tag": "Family",
                "icon": "fa-van-shuttle"
          },
          {
                "vehicle": "Prime SUV (Innova Crysta)",
                "seats": "7 Passengers",
                "price": "Custom Quote",
                "tag": "Premium",
                "icon": "fa-car-side"
          },
          {
                "vehicle": "Tempo Traveller (Luxury AC)",
                "seats": "12 - 16 Passengers",
                "price": "Custom Quote",
                "tag": "Large Group",
                "icon": "fa-bus"
          }
    ]
  }
];

export const testimonials = [
  { name: "Rajesh Kumar", designation: "Airport Transfer", image: "/assets/img/testimonial/avatar-1.svg", text: "Super Cabs provided an excellent service for my early morning airport trip. The driver arrived on time and the car was clean and comfortable." },
  { name: "Priya Sundaram", designation: "Outstation Trip", image: "/assets/img/testimonial/avatar-2.svg", text: "Booked an outstation cab for our family vacation. Smooth driving, polite chauffeur, and completely transparent tariff with no hidden fees." },
  { name: "Karthik Venkat", designation: "Corporate Client", image: "/assets/img/testimonial/avatar-3.svg", text: "We regularly use Super Cabs for our executive client pickups. Extremely dependable, professional service and always punctual." },
];

export const galleryItems = [
  // Taxi / Vehicle Photos with TN Commercial Registration Numbers
  { 
    id: 1, 
    cat: "vehicles", 
    tag: "Sedan", 
    regNo: "TN 38 BT 4723",
    title: "New Maruti Swift Dzire", 
    subtitle: "TN 38 BT 4723 • Latest Model • Chilled AC & Sanitised Cabin", 
    src: "/assets/img/cabs/sedan.jpg" 
  },
  { 
    id: 2, 
    cat: "vehicles", 
    tag: "SUV", 
    regNo: "TN 66 AX 2026",
    title: "Toyota Innova Crysta Luxury", 
    subtitle: "TN 66 AX 2026 • 7-Seater Luxury AC • Outstation & Hill Tours", 
    src: "/assets/img/cabs/suv.jpg" 
  },
  { 
    id: 3, 
    cat: "vehicles", 
    tag: "Family MPV", 
    regNo: "TN 99 CJ 9876",
    title: "Maruti Ertiga Prime", 
    subtitle: "TN 99 CJ 9876 • 6-Seater Family Comfort • Smooth Highway Ride", 
    src: "/assets/img/cabs/fleet-mpv.jpg" 
  },
  { 
    id: 4, 
    cat: "vehicles", 
    tag: "Hatchback", 
    regNo: "TN 38 CJ 1723",
    title: "Compact Swift Hatchback", 
    subtitle: "TN 38 CJ 1723 • Economical & Swift City / Airport Rides", 
    src: "/assets/img/cabs/hatchback.jpg" 
  },
  { 
    id: 5, 
    cat: "vehicles", 
    tag: "Tempo Traveller", 
    regNo: "TN 01 BK 5417",
    title: "Luxury Tempo Traveller", 
    subtitle: "TN 01 BK 5417 • 14-Seater AC • Pushback Seats for Family Tours", 
    src: "/assets/img/cabs/tempo-traveller.jpg" 
  },
  { 
    id: 6, 
    cat: "vehicles", 
    tag: "Executive", 
    regNo: "TN 37 DH 1122",
    title: "Executive Luxury Sedan", 
    subtitle: "TN 37 DH 1122 • Corporate & VIP Airport Chauffeur Service", 
    src: "/assets/img/cabs/premium-sedan.jpg" 
  },

  // Tour Photos
  { 
    id: 7, 
    cat: "tours", 
    tag: "Hill Station", 
    regNo: "TN 38 BT 4723",
    title: "Misty Mountain Getaway", 
    subtitle: "TN 38 BT 4723 • Ooty & Kodaikanal Scenic Ghat-Road Drives", 
    src: "/assets/img/cabs/tour-hillstation.jpg" 
  },
  { 
    id: 8, 
    cat: "tours", 
    tag: "Pilgrimage", 
    regNo: "TN 66 AX 2026",
    title: "Sacred Temple Circuit", 
    subtitle: "TN 66 AX 2026 • Madurai Meenakshi & Rameswaram Coastal Shrines", 
    src: "/assets/img/cabs/tour-temple.jpg" 
  },

  // Customer / Service Photos
  { 
    id: 9, 
    cat: "service", 
    tag: "Sanitised Cab", 
    title: "100% Cleaned & Sanitised Cabin", 
    subtitle: "Deep Cleaned, Odour-Free AC Interiors Prepared Before Every Trip", 
    src: "/assets/img/cabs/about-2.jpg" 
  },
  { 
    id: 10, 
    cat: "service", 
    tag: "Airport Service", 
    regNo: "TN 38 BT 4723",
    title: "On-Time Airport Terminal Drop", 
    subtitle: "TN 38 BT 4723 • Punctual 24/7 Doorstep Transfers to Airports", 
    src: "/assets/img/cabs/cat-airport.jpg" 
  },
];
