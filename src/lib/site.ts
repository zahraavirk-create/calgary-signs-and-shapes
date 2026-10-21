import commercial from "@/assets/svc-commercial.jpg";
import cnc from "@/assets/hero-cnc.jpg";
import print from "@/assets/svc-print.jpg";
import acrylic from "@/assets/svc-acrylic.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  what: string;
  applications: string[];
  materials: string[];
  options: string[];
};

// Placeholder service list — awaiting owner confirmation of offered services & materials.
export const services: Service[] = [
  {
    slug: "commercial-signage",
    title: "Commercial & Business Signage",
    short: "Storefront, wayfinding and interior signage built to represent your brand.",
    image: commercial,
    what: "Custom signage for storefronts, offices, and commercial spaces — designed to your brand and site.",
    applications: ["Storefront signs", "Office & lobby signs", "Wayfinding", "Contractor site signs"],
    materials: ["To be confirmed by Signs Plus CNC"],
    options: ["Custom sizes", "Brand colours", "Indoor or outdoor use"],
  },
  {
    slug: "cnc-fabrication",
    title: "Custom CNC Cutting & Fabrication",
    short: "Precision-cut shapes, letters and parts from your files or our designs.",
    image: cnc,
    what: "Computer-controlled cutting for accurate, repeatable shapes, lettering and components.",
    applications: ["Cut letters & logos", "Panels & displays", "Custom parts", "Decor pieces"],
    materials: ["To be confirmed by Signs Plus CNC"],
    options: ["Custom shapes from vector files", "Single pieces or runs", "Finishing options on request"],
  },
  {
    slug: "large-format-printing",
    title: "Large-Format Printing",
    short: "Banners, posters, decals and graphics with crisp, vivid output.",
    image: print,
    what: "High-resolution printing for large graphics used indoors and outdoors.",
    applications: ["Banners", "Posters", "Window graphics", "Real estate signs"],
    materials: ["To be confirmed by Signs Plus CNC"],
    options: ["Custom dimensions", "Finish preferences", "Single or double-sided"],
  },
  {
    slug: "acrylic-signage",
    title: "Acrylic & Dimensional Signage",
    short: "Clean, modern acrylic panels and raised lettering with depth.",
    image: acrylic,
    what: "Polished acrylic and dimensional signs that add depth and a premium finish.",
    applications: ["Office name plates", "Reception signs", "Donor walls", "Gifts & awards"],
    materials: ["To be confirmed by Signs Plus CNC"],
    options: ["Clear, frosted or coloured", "Standoff mounting", "Layered designs"],
  },
  {
    slug: "event-signage",
    title: "Event & Promotional Signage",
    short: "Eye-catching signs for events, trade shows, and promotions.",
    image: print,
    what: "Temporary and reusable signage for events, launches, and campaigns.",
    applications: ["Welcome signs", "Trade show displays", "Promotional boards", "Directional signs"],
    materials: ["To be confirmed by Signs Plus CNC"],
    options: ["Personalization", "Reusable designs", "Quantity orders"],
  },
  {
    slug: "custom-projects",
    title: "Custom Projects",
    short: "Have something unique in mind? Let's figure out how to build it.",
    image: commercial,
    what: "One-off and specialty projects that don't fit a standard category.",
    applications: ["Feature pieces", "Personal projects", "Prototypes", "Specialty signage"],
    materials: ["Discussed per project"],
    options: ["Fully custom"],
  },
];

export const projectCategories = [
  "Business Signage",
  "CNC Fabrication",
  "Printing",
  "Acrylic",
  "Event Signage",
  "Other Custom Projects",
] as const;

export type Project = {
  slug: string;
  name: string;
  category: (typeof projectCategories)[number];
  materials: string;
  description: string;
  image: string;
};

// SAMPLE placeholders — replace with authentic completed projects.
export const projects: Project[] = [
  { slug: "sample-storefront", name: "Sample: Illuminated Storefront", category: "Business Signage", materials: "Sample — TBD", description: "Placeholder project. Replace with a real completed storefront sign.", image: commercial },
  { slug: "sample-cnc-panel", name: "Sample: CNC Cut Panel", category: "CNC Fabrication", materials: "Sample — TBD", description: "Placeholder project. Replace with a real CNC fabrication job.", image: cnc },
  { slug: "sample-banner", name: "Sample: Large Banner Print", category: "Printing", materials: "Sample — TBD", description: "Placeholder project. Replace with a real print job.", image: print },
  { slug: "sample-acrylic", name: "Sample: Acrylic Office Sign", category: "Acrylic", materials: "Sample — TBD", description: "Placeholder project. Replace with a real acrylic sign.", image: acrylic },
  { slug: "sample-event", name: "Sample: Event Welcome Sign", category: "Event Signage", materials: "Sample — TBD", description: "Placeholder project. Replace with a real event sign.", image: print },
  { slug: "sample-custom", name: "Sample: Custom Feature Piece", category: "Other Custom Projects", materials: "Sample — TBD", description: "Placeholder project. Replace with a real custom build.", image: cnc },
];
