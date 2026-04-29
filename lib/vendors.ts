export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  location: string;
  featured?: boolean;
}

export const CATEGORIES = [
  "All",
  "Mortgage & Lending",
  "Home Inspection",
  "Title & Settlement",
  "Contractors & Renovation",
  "Moving Services",
  "Real Estate Attorney",
  "Interior Design",
  "Property Management",
];

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Capitol Mortgage Group",
    category: "Mortgage & Lending",
    description: "Full-service mortgage lender specializing in first-time buyers and jumbo loans across the DMV. Competitive rates and fast closings.",
    phone: "(202) 555-0210",
    email: "loans@capitolmortgage.com",
    website: "https://example.com",
    location: "Washington, DC",
    featured: true,
  },
  {
    id: "2",
    name: "DMV Home Inspections LLC",
    category: "Home Inspection",
    description: "Certified home inspectors with 20+ years of experience. Comprehensive reports delivered within 24 hours.",
    phone: "(301) 555-0187",
    email: "inspect@dmvhomeinspect.com",
    location: "Rockville, MD",
    featured: true,
  },
  {
    id: "3",
    name: "Old Dominion Title & Settlement",
    category: "Title & Settlement",
    description: "Streamlined title services and settlement coordination for residential and commercial transactions across Virginia.",
    phone: "(703) 555-0142",
    email: "title@olddominiontitle.com",
    location: "Arlington, VA",
  },
  {
    id: "4",
    name: "Renovate DMV",
    category: "Contractors & Renovation",
    description: "Full-service renovation and general contracting. Kitchens, baths, additions, and whole-home remodels.",
    phone: "(301) 555-0163",
    email: "hello@renovatedmv.com",
    location: "Silver Spring, MD",
    featured: true,
  },
  {
    id: "5",
    name: "Metro Movers DC",
    category: "Moving Services",
    description: "Licensed and insured movers serving the entire DMV. Local and long-distance moves with white-glove service.",
    phone: "(202) 555-0175",
    email: "move@metromoversdc.com",
    location: "Washington, DC",
  },
  {
    id: "6",
    name: "Beltway Real Estate Law",
    category: "Real Estate Attorney",
    description: "Experienced real estate attorneys handling purchases, sales, leases, and disputes throughout DC, MD, and VA.",
    phone: "(202) 555-0191",
    email: "contact@beltwaylaw.com",
    location: "Washington, DC",
  },
  {
    id: "7",
    name: "Capital Interiors Studio",
    category: "Interior Design",
    description: "Award-winning interior design firm specializing in staging, renovation design, and new home styling.",
    phone: "(703) 555-0223",
    email: "design@capitalinteriors.com",
    location: "McLean, VA",
    featured: true,
  },
  {
    id: "8",
    name: "Chesapeake Property Management",
    category: "Property Management",
    description: "Full-service property management for investors and landlords across the DMV. Tenant screening, maintenance, and accounting.",
    phone: "(301) 555-0134",
    email: "manage@chesapeakepm.com",
    location: "Bethesda, MD",
  },
];
