/**
 * Central property data for Alpine Court Chalet
 * Single source of truth for all property information
 */

// =============================================================================
// Types
// =============================================================================

interface PropertyLocation {
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
}

interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareFootage?: number;
  levels: number;
}

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  role: "property_manager" | "owner";
}

interface CompanyInfo {
  name: string;
  contacts: ContactPerson[];
}

interface Amenity {
  name: string;
  icon?: string;
  schemaName?: string; // For schema.org amenityFeature
}

interface AmenityCategory {
  category: string;
  items: Amenity[];
}

interface BedConfiguration {
  room: string;
  beds: string;
  level: number;
}

interface PropertyImages {
  hero: string;
  ogImage: string;
  gallery: Array<{
    id: string;
    alt: string;
    category?: string;
  }>;
}

interface HouseRules {
  quietHours: {
    start: string;
    end: string;
  };
  maxGuests: number;
  noSmoking: boolean;
  noParties: boolean;
  noCommercialPhotography: boolean;
  generalRules: string[];
  sportsCourtRules: string[];
  safetyDevices: string[];
}

interface BookingTerms {
  securityDeposit: {
    amount: number;
    currency: string;
    refundDays: string;
  };
  paymentSchedule: {
    depositPercent: number;
    balanceDueDays: number;
  };
  cancellation: {
    standard: Array<{ daysOut: string; refund: string }>;
    peak: Array<{ daysOut: string; refund: string }>;
  };
  peakPeriods: string[];
}

// =============================================================================
// Property Data
// =============================================================================

export const property = {
  // Basic Info
  name: "Alpine Court Chalet",
  tagline: "Luxury Ski Chalet in Fernie, B.C.",
  description:
    "Welcome to Fernie Alpine Court Chalet, a one-of-a-kind mountain retreat where recreation and relaxation meet in perfect balance. As the only chalet at Fernie Alpine Resort with a full-size indoor squash court, this property redefines the ski-in, ski-out experience with thoughtful design, spectacular views, and an unmatched range of amenities.",
  shortDescription:
    "Luxury 5-bedroom ski chalet with indoor sports court, hot tub, and ski-in/ski-out access in Fernie, B.C.",
  fullDescription: `Welcome to Fernie Alpine Court Chalet, a one-of-a-kind mountain retreat where recreation and relaxation meet in perfect balance. As the only chalet at Fernie Alpine Resort with a full-size indoor squash court, this property redefines the ski-in, ski-out experience with thoughtful design, spectacular views, and an unmatched range of amenities.

Framed by the dramatic peaks of the Lizard Range, the chalet offers true ski-in access and expansive mountain views through floor-to-ceiling windows. After a day on the slopes, unwind in the outdoor hot tub, warm up by the fire, or simply take in the alpine glow from the Great Room's plush seating. Every space is crafted to connect modern comfort with mountain serenity.

The home's indoor court is its signature feature—professionally finished and fully equipped for squash, badminton, pickleball, volleyball, table tennis, and even indoor soccer. It can also be transformed into a yoga or fitness studio, or used as a small conference space for corporate retreats and workshops. On-site massage and yoga sessions can be arranged, bringing wellness directly to your stay.

The chef's kitchen features premium appliances, a five-burner gas range, and plenty of counter space for group cooking. The open-concept layout allows everyone to stay connected, whether preparing meals, sharing stories, or simply enjoying a drink by the fire. The dining table seats twelve, perfect for both celebratory dinners and casual mountain breakfasts. For special occasions, private chef services can be arranged to create an elevated dining experience right in the comfort of your chalet.

With five bedrooms and five bathrooms, the home provides a comfortable and flexible setup for families and groups. There are 14 individual sleeping spots, giving guests a variety of arrangements to sleep 10 people comfortably. The flexibility of bedding options makes it easy to accommodate couples, singles, and kids alike while ensuring everyone enjoys their own space.

Two gas fireplaces, high-speed fibre Wi-Fi, and multiple lounge areas make the chalet ideal for relaxing or working remotely. The heated garage accommodates two vehicles, with driveway parking for at least four more. Ski storage and easy entry points keep transitions from mountain to home effortless.

Whether you're planning a family ski trip, a corporate retreat, or a wellness getaway, Fernie Alpine Court Chalet offers a rare combination of sophistication, versatility, and adventure. From the private multi-sport court and hot tub to the personalized wellness and chef options, every detail invites you to make the most of your mountain time.

As your Fernie-based manager, Bo is always nearby to ensure everything runs smoothly—from arranging activities and services to providing local recommendations and support throughout your stay.

Fernie Alpine Court Chalet isn't just a place to stay—it's a mountain experience designed for connection, comfort, and play.

Guest Access

• Direct entry to 2 car garage via large, multi-vehicle driveway
• Downhill ski in trail access from rear yard
• Stunning mountain views at both front and back
• Kootenay Taxi services the ski resort and downtown quickly and affordably. They can provide a variety of 11-passenger, 6-passenger mini-vans, and larger vehicles that suit most group sizes, as well as a chartered shuttle to Cranbrook Airport (YXC) and Calgary Airport (YYC).

Comfort & Safety

Your comfort and safety are our priority. The chalet features a state-of-the-art air exchange system with HEPA filters that capture 99.97% of airborne particles, providing fresh, clean air throughout.

We follow a four-step cleaning protocol:
• Clean: sweeping, vacuuming, mopping, and washing dishes and laundry at high heat
• Sanitize: disinfecting high-touch surfaces and allowing them to air-dry
• Check: a room-by-room checklist ensures thorough cleaning between stays
• Reset: linens, guest supplies, and equipment are handled safely without re-entering sanitized rooms

Explore the Area

Fernie is a playground for outdoor and cultural adventures. Hike, ski, fly fish, horseback ride, or golf during the day. Explore art galleries, local shops, or nightlife in town. No matter where your day takes you, the breathtaking mountains are always there to greet you.`,

  // Identifiers
  identifier: "H182037990", // Provincial registration number
  propertyType: "Chalet" as const,

  // Location
  location: {
    address: {
      street: "5587 Currie Bowl Wy",
      city: "East Kootenay A",
      region: "British Columbia",
      postalCode: "V0B 1M6",
      country: "Canada",
    },
    coordinates: {
      latitude: 49.46029,
      longitude: -115.07936,
    },
    timezone: "America/Edmonton", // Mountain Time
  },

  // Property Specs
  specs: {
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    levels: 3,
  } satisfies PropertySpecs,

  // Check-in/Check-out (Mountain Time)
  checkIn: "16:00",
  checkOut: "10:00",

  // Bed Configuration (from floor plans)
  beds: [
    { room: "Bedroom 1", beds: "Queen", level: 2 },
    { room: "Bedroom 2", beds: "Twin XL or King", level: 2 },
    { room: "Bedroom 3 (Master)", beds: "Twin XL or King", level: 1 },
    { room: "Bedroom 4", beds: "Twin XL or King", level: 0 },
    { room: "Bedroom 5", beds: "Queen", level: 0 },
    { room: "Annex", beds: "Twin/Daybed", level: 0 },
    { room: "Living Room (Level 2)", beds: "Sofabed", level: 2 },
  ] satisfies BedConfiguration[],

  // Images (Cloudinary IDs)
  images: {
    hero: "exterior-front",
    ogImage: "exterior-front",
    gallery: [
      // Exterior
      {
        id: "exterior-winter",
        alt: "Chalet exterior with snow-covered mountains",
        category: "exterior",
      },

      // Main Living Spaces
      {
        id: "living-room-main",
        alt: "Main living room with fireplace and mountain views",
        category: "living",
      },
      {
        id: "kitchen",
        alt: "Main kitchen with large island seating 4",
        category: "kitchen",
      },
      {
        id: "dining-room",
        alt: "Dining area with mountain views",
        category: "dining",
      },

      // Recreation
      {
        id: "sports-court-1",
        alt: "Indoor sports court with volleyball net",
        category: "recreation",
      },
      {
        id: "sports-court-2",
        alt: "Indoor squash court with player",
        category: "recreation",
      },
      {
        id: "sports-court-3",
        alt: "Indoor sports court with table tennis setup",
        category: "recreation",
      },
      {
        id: "recreation-room",
        alt: "Recreation room with pool table",
        category: "recreation",
      },

      {
        id: "loft",
        alt: "Loft area for reading and games",
        category: "living",
      },

      // Suite (Separate Living Area)
      {
        id: "suite-living-room",
        alt: "Suite living room with fireplace",
        category: "suite",
      },
      {
        id: "suite-kitchen",
        alt: "Suite kitchen with full amenities",
        category: "suite",
      },

      {
        id: "sports-closet",
        alt: "Sports equipment storage with rackets and gear",
        category: "recreation",
      },

      // Hot Tub (placeholder)
      // {
      //   id: "hot-tub",
      //   alt: "Private hot tub on covered deck",
      //   category: "outdoor",
      // },

      // Views
      {
        id: "view-from-house",
        alt: "Mountain view from the chalet",
        category: "views",
      },
      {
        id: "mountain-view-1",
        alt: "Scenic mountain vista from Fernie Alpine Resort",
        category: "views",
      },
      {
        id: "mountain-view-2",
        alt: "Fernie Alpine Resort with Chair Lift",
        category: "views",
      },
      {
        id: "sundog",
        alt: "Stunning Sundog on the Mountain",
        category: "views",
      },
      {
        id: "kitchen-with-chef",
        alt: "Professional Chef preparing meal in kitchen",
        category: "kitchen",
      },

      // Outdoor & Amenities
      {
        id: "patio-bbq",
        alt: "Outdoor patio with mountain views",
        category: "outdoor",
      },

      // Bedrooms (placeholders - to be curated)
      { id: "bedroom-1", alt: "Bedroom 1", category: "bedroom" },
      { id: "bedroom-2", alt: "Bedroom 2", category: "bedroom" },
      { id: "bedroom-3-master", alt: "Master bedroom", category: "bedroom" },
      { id: "bedroom-4", alt: "Bedroom 4", category: "bedroom" },
      { id: "bedroom-5", alt: "Bedroom 5", category: "bedroom" },

      {
        id: "mudroom",
        alt: "Ski boot room and mudroom with built-in storage",
        category: "amenities",
      },
      {
        id: "garage",
        alt: "2-car garage with ski rack storage",
        category: "amenities",
      },
    ],
  } satisfies PropertyImages,

  videos: {
    hero: "hero-loop",
    skiing: "skiing-trees-video",
  },

  // Amenities (organized for display and SEO)
  amenities: [
    {
      category: "Recreation & Entertainment",
      items: [
        { name: "Indoor Sports Court", schemaName: "sportsCourt" },
        { name: "Squash Court", schemaName: "squashCourt" },
        {
          name: "Full Pickleball Court (coming soon)",
          schemaName: "pickleballCourt",
        },
        { name: "Sound System", schemaName: "soundSystem" },
        { name: "Pool Table", schemaName: "poolTable" },
        { name: "Table Tennis", schemaName: "tableTennis" },
        { name: "Walleyball/Volleyball", schemaName: "volleyballCourt" },
        { name: "Mini Padel", schemaName: "padelCourt" },
        { name: "Mini Pickleball", schemaName: "pickleballCourt" },
        { name: 'Multiple TVs (50", 60", 77")', schemaName: "television" },
        { name: "Board Games", schemaName: "boardGames" },
        { name: "Books & Reading Material", schemaName: "library" },
      ],
    },
    {
      category: "Skiing & Outdoors",
      items: [
        { name: "Ski-In/Ski-Out Access", schemaName: "skiInSkiOut" },
        { name: "Ski Storage & Boot Room", schemaName: "skiStorage" },
        { name: "Hot Tub", schemaName: "hotTub" },
        { name: "Garage (2 Cars)", schemaName: "parking" },
        { name: "BBQ Grill", schemaName: "barbecue" },
        { name: "Covered Patio & Balconies", schemaName: "patio" },
        { name: "Outdoor Dining Area", schemaName: "outdoorDining" },
        { name: "Outdoor Furniture", schemaName: "outdoorFurniture" },
      ],
    },
    {
      category: "Kitchen & Dining",
      items: [
        { name: "Two Full Kitchens", schemaName: "kitchen" },
        { name: "Wine Fridge", schemaName: "wineFridge" },
        { name: "Dining Table (Seats 12)", schemaName: "diningTable" },
        { name: "Premium Coffee Provided", schemaName: "coffee" },
        { name: "Dishwasher", schemaName: "dishwasher" },
        { name: "Microwave", schemaName: "microwave" },
        { name: "Stove & Oven", schemaName: "stove" },
        { name: "Coffee Maker", schemaName: "coffeeMaker" },
        { name: "Hot Water Kettle", schemaName: "kettle" },
        { name: "Toaster", schemaName: "toaster" },
        { name: "Blender", schemaName: "blender" },
        { name: "Trash Compactor", schemaName: "trashCompactor" },
      ],
    },
    {
      category: "Comfort & Convenience",
      items: [
        { name: "WiFi", schemaName: "wifi" },
        { name: "Air Conditioning", schemaName: "airConditioning" },
        { name: "Heating", schemaName: "heating" },
        { name: "Indoor Fireplace", schemaName: "fireplace" },
        { name: "Washer & Dryer", schemaName: "washerDryer" },
        { name: "Bed Linens", schemaName: "bedLinens" },
        { name: "Hair Dryer", schemaName: "hairDryer" },
        { name: "Dedicated Workspace", schemaName: "workspace" },
        { name: "Private Entrance", schemaName: "privateEntrance" },
      ],
    },
    {
      category: "Family Friendly",
      items: [
        { name: "Crib", schemaName: "crib" },
        { name: "Pack 'n Play Travel Crib", schemaName: "travelCrib" },
        { name: "High Chair", schemaName: "highChair" },
        { name: "Children's Books & Toys", schemaName: "childrensToys" },
      ],
    },
    {
      category: "Safety & Security",
      items: [
        { name: "Smoke Alarm", schemaName: "smokeAlarm" },
        { name: "Carbon Monoxide Alarm", schemaName: "carbonMonoxideAlarm" },
        { name: "Fire Extinguisher", schemaName: "fireExtinguisher" },
        { name: "First Aid Kit", schemaName: "firstAidKit" },
        { name: "Exterior Security Cameras", schemaName: "securityCameras" },
        { name: "Noise Decibel Monitors", schemaName: "noiseMonitor" },
      ],
    },
  ] satisfies AmenityCategory[],

  // Highlight amenities for hero/overview sections
  highlightAmenities: [
    "Ski-In/Ski-Out",
    "Indoor Sports Court",
    "Hot Tub",
    "5 Bedrooms",
    "2 Kitchens",
    "Sleeps 10",
  ],

  // Featured amenities for animated hero cycling (priority order, sports scattered)
  featuredAmenities: [
    "Ski-In/Ski-Out at Fernie Alpine Resort",
    "Full-Size Indoor Sports Court",
    "Stunning Rocky Mountain Views",
    "Private Outdoor Hot Tub",
    "Championship Squash Court",
    "Two Gourmet Kitchens",
    "Floor-to-Ceiling Windows",
    // "Pickleball & Volleyball",
    "Panoramic Mountain Balconies",
    "Pool Table & Table Tennis",
  ],

  // Links
  links: {
    airbnb: "https://airbnb.ca/h/alpinecourtchalet",
    vrbo: "TODO: VRBO listing URL (if applicable)",
  },

  // Company & Contact Info
  company: {
    name: "Sirrom Properties",
    contacts: [
      {
        name: "Bo Choroszewski",
        email: "crboleslaw@yahoo.com",
        phone: "+1 250 423 9093",
        role: "property_manager" as const,
      },
      {
        name: "Robyn Morris",
        email: "rmorris@sirromproperties.com",
        phone: "+1 647 971 2705",
        role: "owner" as const,
      },
    ],
  } satisfies CompanyInfo,

  // House Rules
  houseRules: {
    quietHours: {
      start: "22:00",
      end: "07:00",
    },
    maxGuests: 10, // Booking limit (property sleeps 10)
    noSmoking: true,
    noParties: true,
    noCommercialPhotography: true,
    generalRules: [
      "Treat the home with care and respect",
      "No smoking or vaping on the property",
      "No parties or events",
      "No commercial photography",
      "Quiet hours: 10:00 PM – 7:00 AM (Mountain Time)",
    ],
    sportsCourtRules: [
      "Recreational use by registered guests only",
      "Guests assume full responsibility for personal injury or damage",
      "No glass containers, food, or alcohol on the court",
      "Proper, non-marking athletic footwear required at all times",
      "No hanging, climbing, or tampering with nets, hoops, walls, or equipment",
      "Children must be supervised at all times",
      "Only equipment provided by the Owner may be used—hockey pucks, hard balls, and other non-approved items are strictly prohibited",
      "No reckless or unsafe behavior",
    ],
    safetyDevices: [
      "Exterior security cameras (front and back of house)",
      "No indoor cameras",
      "Carbon monoxide alarm installed",
      "Smoke alarm installed",
      "Noise decibel monitors on property",
    ],
  } satisfies HouseRules,

  // Booking Terms
  bookingTerms: {
    securityDeposit: {
      amount: 2000,
      currency: "CAD",
      refundDays: "7–14 days after departure",
    },
    paymentSchedule: {
      depositPercent: 30,
      balanceDueDays: 60,
    },
    cancellation: {
      standard: [
        { daysOut: "60+ days", refund: "Full refund minus $250 CAD admin fee" },
        { daysOut: "30–59 days", refund: "50% refund" },
        { daysOut: "Less than 30 days", refund: "No refund" },
      ],
      peak: [
        { daysOut: "90+ days", refund: "Full refund" },
        { daysOut: "60–89 days", refund: "50% refund" },
        { daysOut: "Less than 60 days", refund: "No refund" },
      ],
    },
    peakPeriods: [
      "Christmas week",
      "New Year's week",
      "Statutory holiday long weekends",
    ],
  } satisfies BookingTerms,

  // SEO
  seo: {
    title: "Alpine Court Chalet | Luxury Ski Chalet in Fernie, B.C.",
    description:
      "Book Alpine Court Chalet, a luxury 5-bedroom ski-in/ski-out chalet in Fernie, British Columbia. Features indoor sports court, hot tub, and stunning Rocky Mountain views. Sleeps 10.",
    keywords: [
      "Fernie ski chalet",
      "Fernie vacation rental",
      "luxury ski chalet B.C.",
      "ski-in ski-out Fernie",
      "Fernie accommodation",
      "Canadian Rockies chalet",
      "Fernie B.C. rental",
      "mountain chalet British Columbia",
    ],
  },
} as const;

// =============================================================================
// Helper Functions
// =============================================================================

/** Get all amenities as a flat list for schema.org */
export function getAllAmenities(): Amenity[] {
  return property.amenities.flatMap((category) => category.items);
}

/** Get amenities formatted for schema.org */
export function getSchemaAmenities(): Array<{
  "@type": "LocationFeatureSpecification";
  name: string;
  value: boolean;
}> {
  return getAllAmenities().map((amenity) => ({
    "@type": "LocationFeatureSpecification" as const,
    name: amenity.schemaName ?? amenity.name,
    value: true,
  }));
}

/** Get full address as a string */
export function getFullAddress(): string {
  const { street, city, region, postalCode, country } =
    property.location.address;
  return `${street}, ${city}, ${region} ${postalCode}, ${country}`;
}

/** Get primary contact (property manager) */
export function getPrimaryContact(): ContactPerson {
  const propertyManager = property.company.contacts.find(
    (c) => c.role === "property_manager"
  );
  if (propertyManager) {
    return propertyManager;
  }
  // Fallback to first contact - guaranteed to exist by data structure
  const firstContact = property.company.contacts[0];
  if (firstContact === undefined) {
    throw new Error("No contacts defined in property data");
  }
  return firstContact;
}

/** Get owner contact */
export function getOwnerContact(): ContactPerson | undefined {
  return property.company.contacts.find((c) => c.role === "owner");
}

// Export types for use in components
export type {
  Amenity,
  AmenityCategory,
  BedConfiguration,
  BookingTerms,
  CompanyInfo,
  ContactPerson,
  HouseRules,
  PropertyImages,
  PropertyLocation,
  PropertySpecs,
};
