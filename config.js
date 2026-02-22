// Fixlify Appliance Services — Site Configuration
const BUSINESS = {
  name: "Fixlify Appliance Services",
  longName: "Fixlify Appliance Services — Toronto & GTA",
  phone: "(437) 524-1053",
  tel: "tel:+14375241053",
  booking: "https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce",
  bookingEmbed: "https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true",
  rating: "4.9",
  reviews: "5,200+",
  reviewCount: 5200,
  warranty: "90-day",
  experience: "6+",
  hours: "Mon–Sat 8am–8pm, Sun 9am–6pm",
  domain: "fixlifyservices.com",
  address: "Toronto, Ontario, Canada",
  email: "care@fixlifyservices.com",
  schemaAddress: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "Ontario",
    addressCountry: "CA"
  }
};

if (typeof module !== 'undefined') module.exports = BUSINESS;
