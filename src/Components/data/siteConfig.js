// ============================================================
// Super Cabs – editable business details.
// Replace every PLACEHOLDER value below with real information.
// Leave a value empty ("") to hide its Call / WhatsApp link.
// ============================================================
const siteConfig = {
  brand: "Super Cabs",
  tagline: "Reliable taxi & travel service across Tamil Nadu & South India",
  phone: "+919787541723",                       // digits with country code
  phoneDisplay: "+91-9787541723",              // displayed on website
  whatsapp: "919787541723",                    // digits with country code (no + sign)
  email: "supercabs.in@gmail.com",             // official contact email
  address: "4/150, East Street, TAMILNADU -606707", 
  hours: "24/7 Booking Support Available", 
  experienceYears: "10+",                      // years in business
  mapEmbedUrl: "https://www.google.com/maps?q=4/150,+East+Street,+TAMILNADU+-606707&output=embed",
  social: { facebook: "https://facebook.com/", instagram: "https://instagram.com/", twitter: "", linkedin: "" },
  minKmOneWay: 130,
  minKmRoundTrip: 250,
  driverAllowance: 400,
};

export const DEFAULT_REQUIREMENTS_TEMPLATE = `SUPERCABS
Call : 9787541723

PLEASE SHARE YOUR REQUIREMENTS:

NAME: 
CONTACT NUMBER: 

DATE: 

TIME: 

PICKUP CITY: 

DROP CITY: 

HOW MANY PERSON TRAVELLING: 

ONE WAY: 

ROUND TRIP: `;

export const telHref = () => (siteConfig.phone ? `tel:${siteConfig.phone}` : "/contact");
export const waHref = (text = DEFAULT_REQUIREMENTS_TEMPLATE) =>
  siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text || DEFAULT_REQUIREMENTS_TEMPLATE)}` : "/contact";
export const isExternal = (href) => /^(tel:|https?:|mailto:)/.test(href);
export default siteConfig;
