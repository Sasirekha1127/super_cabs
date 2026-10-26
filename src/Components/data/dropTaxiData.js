// Drop Taxi destinations across Tamil Nadu and neighbouring hubs
export const dropTaxiCities = [
  {
    id: "coimbatore",
    name: "Coimbatore",
    title: "Coimbatore Drop Taxi",
    image: "/assets/img/cabs/drop-coimbatore.jpg",
    category: "major",
    approxDistance: "Local & Outstation Hub",
    approxTime: "Fast Dispatch",
    sedanFare: "₹ 14 / km",
    suvFare: "₹ 18 / km",
    description: "Direct doorstep pickup and drop across Coimbatore city, railway station, Coimbatore Airport (CJB), Gandhipuram and Peelamedu."
  },
  {
    id: "chennai",
    name: "Chennai",
    title: "Chennai Drop Taxi",
    image: "/assets/img/cabs/drop-chennai.jpg",
    category: "major",
    approxDistance: "510 km",
    approxTime: "8.5 hrs",
    sedanFare: "₹ 7,650",
    suvFare: "₹ 9,690",
    description: "Most popular highway drop route. 24/7 doorstep pickup to anywhere in Chennai (Central, Airport, OMR, Tambaram, Anna Nagar)."
  },
  {
    id: "madurai",
    name: "Madurai",
    title: "Madurai Drop Taxi",
    image: "/assets/img/cabs/tour-temple.jpg",
    category: "temple",
    approxDistance: "215 km",
    approxTime: "4.5 hrs",
    sedanFare: "₹ 3,450",
    suvFare: "₹ 4,300",
    description: "Popular drop service to the Temple City of Madurai, Meenakshi Amman Temple, and Madurai Airport (IXM)."
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    title: "Kodaikanal Drop Taxi",
    image: "/assets/img/cabs/tour-hillstation.jpg",
    category: "hillstation",
    approxDistance: "175 km",
    approxTime: "4.5 hrs",
    sedanFare: "₹ 3,850",
    suvFare: "₹ 4,850",
    description: "Princess of Hill Stations drop taxi with skilled mountain drivers experienced on Silver Cascade curves."
  },
  {
    id: "thoothukudi",
    name: "Thoothukudi",
    title: "Thoothukudi Drop Taxi",
    image: "/assets/img/cabs/tour-beach.jpg",
    category: "coastal",
    approxDistance: "345 km",
    approxTime: "6.5 hrs",
    sedanFare: "₹ 5,175",
    suvFare: "₹ 6,555",
    description: "Pearl City port drop taxi to Thoothukudi, VOC port, and Hare Island with fixed transparent billing."
  },
  {
    id: "bangalore",
    name: "Bangalore",
    title: "Bangalore Drop Taxi",
    image: "/assets/img/cabs/svc-outstation.jpg",
    category: "major",
    approxDistance: "365 km",
    approxTime: "6.5 hrs",
    sedanFare: "₹ 5,475",
    suvFare: "₹ 6,935",
    description: "High-demand interstate drop to Bengaluru (Electronic City, Whitefield, Kempegowda Airport BLR, Majestic)."
  }
];

export const getCityAbout = (city) => {
  const name = city.name || "This City";
  if (city.id === "thoothukudi") {
    return [
      "Thoothukudi (formerly called Tuticorin) is a port industrial city in Thoothukudi district in the Indian state of Tamil Nadu. It lies on the Coromandel Coast of the Bay of Bengal. The city is capital and headquarters of the district. According to the Confederation of Indian Industry, Thoothukudi has the second highest Human Development Index in Tamil Nadu, next to Chennai. Thoothukudi City serves as the headquarters of Tamilnad Mercantile Bank, which is one of the leading private sector banks in India.",
      "Major educational establishments in the city include the Government Thoothukudi Medical College, Fisheries College and Research Institute, Tamil Nadu Agricultural University (TNAU) Thoothukudi Campus, and Government Polytechnic College. The V.O. Chidambaranar Port Trust (formerly Tuticorin Port Trust) in Thoothukudi is an emerging energy and industrial hub of South India. Thoothukudi is known as 'Pearl City' due to the pearl fishing carried out in the town. It is a commercial seaport that serves the inland cities of southern India and is one of the sea gateways of Tamil Nadu. It is also one of the major seaports in India, with a history dating back to the 6th century CE.",
      "The city is believed to be of significant antiquity and has been ruled, at different times, by the Early Pandyas, Medieval Cholas, Later Cholas, Later Pandyas, Madurai Sultanate, Tirunelveli Sultanate, Vijayanagar Empire, Madurai Nayaks, Chanda Sahib, Carnatic Kingdom, Portuguese, Dutch, and the British. Thoothukudi was settled by the Portuguese, Dutch, and later the British East India Company. Roadways are the major mode of transport to Thoothukudi, while the city also has rail, air, and sea transport."
    ];
  }

  if (city.id === "chennai") {
    return [
      "Chennai, the capital of Tamil Nadu, is one of the major economic, cultural, and educational powerhouses of South India. Located on the Coromandel Coast off the Bay of Bengal, Chennai is renowned as the 'Detroit of Asia' for its booming automotive industry, along with thriving software technology parks and world-class healthcare centers.",
      "With a history steeped in colonial heritage and classical arts, Chennai is home to iconic landmarks such as Marina Beach, Fort St. George, San Thome Basilica, Kapaleeshwarar Temple, and Chennai Central Railway Station. Whether you are traveling for business, healthcare appointments at Apollo or Fortis, or visiting family, an outstation drop taxi provides the most stress-free doorstep travel.",
      "National expressways and well-engineered multi-lane highways connect Chennai seamlessly with all districts across Tamil Nadu, Karnataka, and Andhra Pradesh, making one-way drop cabs the top choice for commuters."
    ];
  }

  if (city.id === "coimbatore") {
    return [
      "Coimbatore, famously known as the 'Manchester of South India', is the second largest city in Tamil Nadu. Nestled along the banks of the Noyyal River and surrounded by the scenic Western Ghats, Coimbatore is a premier textile, manufacturing, engineering, and educational hub.",
      "The city attracts visitors from all over the world for the world-renowned Isha Yoga Center and its colossal Adiyogi Shiva Statue, the sacred Marudhamalai Murugan Temple, Perur Pateeswarar Temple, and its proximity to serene hill stations such as Ooty, Coonoor, and Valparai.",
      "Super Cabs operates 24/7 one-way drop taxis connecting Coimbatore to all districts of Tamil Nadu, Kerala, and Karnataka with professional chauffeurs and guaranteed clean AC vehicles."
    ];
  }

  return [
    `${name} is a vibrant destination in Tamil Nadu with rich historical heritage, cultural landmarks, and thriving local trade. Well-connected by state and national highways, it attracts thousands of travelers daily for business, family functions, pilgrimage, and leisure trips.`,
    `Traveling to or from ${name} is made completely seamless with our professional one-way drop taxi service. Rather than paying double the fare for an empty return ride, our service charges only for the exact distance you ride, with doorstep pickup and verified polite drivers.`,
    `Whether you need an early morning pickup for train or flight connections, an urgent hospital visit, or a relaxed journey with family, our clean AC hatchbacks, sedans, and SUVs are available 24/7.`
  ];
};

export const getCityRoutes = (cityName) => {
  if (cityName.toLowerCase().includes("thoothukudi")) {
    return [
      "Thoothukudi to Adirampattinam",
      "Thoothukudi to Aduthurai",
      "Thoothukudi to Alanganallur",
      "Thoothukudi to Alangayam",
      "Thoothukudi to Alangudi",
      "Thoothukudi to Aliyar",
      "Thoothukudi to Ambasamudram",
      "Thoothukudi to Ambur",
      "Thoothukudi to Chennai",
      "Thoothukudi to Coimbatore",
      "Thoothukudi to Madurai",
      "Thoothukudi to Tirunelveli",
      "Thoothukudi to Bangalore",
      "Thoothukudi to Trichy",
      "Thoothukudi to Salem"
    ];
  }

  const hubs = ["Chennai", "Coimbatore", "Bangalore", "Madurai", "Trichy", "Salem", "Ooty", "Kodaikanal", "Pondicherry", "Vellore", "Erode", "Tirunelveli"];
  return hubs
    .filter(h => h.toLowerCase() !== cityName.toLowerCase())
    .map(h => `${cityName} to ${h}`);
};
