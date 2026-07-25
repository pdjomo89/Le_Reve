/**
 * Static content for Le Rêve. Kept in one module so pages stay presentational —
 * swap this file for a CMS/API fetch later without touching the components.
 */

export const BRAND = {
  name: "Le Rêve",
  tagline: "Arizona Wedding Planning & Design",
  phone: "(385) 313-2344",
  phoneHref: "tel:+13853132344",
  email: "hello@lereveweddings.com",
  studio: "7014 E Camelback Rd, Suite 210 · Scottsdale, AZ 85251",
  hours: "Tuesday – Saturday, 9am – 6pm MST",
  instagram: "@lereve.az",
  /**
   * Cal.com booking link, in "<username>/<event-type>" form — the tail of your
   * public cal.com URL. Availability (and therefore which slots appear blocked)
   * is managed in the Cal.com dashboard, not here.
   */
  calLink: "lereve-az/consultation",
  facebookUrl: "https://www.facebook.com/lereve.az",
  instagramUrl: "https://www.instagram.com/lereve.az",
  tiktokUrl: "https://www.tiktok.com/@lereve.az",
};

export const REGIONS = [
  { city: "Phoenix", note: "Downtown lofts & desert botanical gardens" },
  { city: "Scottsdale", note: "Resort ballrooms and Old Town courtyards" },
  { city: "Sedona", note: "Red rock ceremonies at golden hour" },
  { city: "Tucson", note: "Historic haciendas and saguaro estates" },
  { city: "Flagstaff", note: "Pine forests and mountain lodges" },
  { city: "Prescott", note: "Vineyards and Territorial-era venues" },
  { city: "Lake Havasu", note: "Waterfront celebrations on the Colorado" },
  { city: "Grand Canyon", note: "Elopements on the South Rim" },
];

export const SERVICES = [
  {
    slug: "day-of-coordination",
    name: "Day-Of Coordination",
    price: "$1,000 – $1,800",
    duration: "Final weeks",
    summary:
      "You planned it — we make sure it runs. We take the handoff in the final stretch, tie off the loose ends, and manage the wedding day start to finish.",
    includes: [
      "Final venue walkthrough",
      "Vendor confirmations",
      "Wedding timeline creation",
      "Rehearsal coordination",
      "8–10 hours wedding day management",
    ],
  },
  {
    slug: "partial-planning",
    name: "Partial Planning",
    price: "$2,500 – $4,500",
    duration: "Mid-planning support",
    summary:
      "A steady hand once you're underway. We help you choose the right vendors, shape the design and budget, and carry the logistics through the day itself.",
    includes: [
      "Vendor recommendations",
      "Budget assistance",
      "Timeline management",
      "Design consultation",
      "Day-of coordination",
    ],
  },
  {
    slug: "full-service-planning",
    name: "Full-Service Planning",
    price: "$5,000 – $10,000+",
    duration: "Start to finish",
    summary:
      "End-to-end partnership from the first idea to the last dance. We build the vision, assemble the team, and carry every detail so you never touch a spreadsheet.",
    includes: [
      "Budget creation",
      "Venue sourcing",
      "Vendor management",
      "Design & styling",
      "RSVP tracking",
      "Rehearsal coordination",
      "Full wedding day management",
    ],
    featured: true,
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    body: "A relaxed hour together — in the studio or over video — to hear your story, your guest list, and the feeling you want the day to have.",
  },
  {
    step: "02",
    title: "Blueprint",
    body: "We deliver a budget architecture, a curated venue shortlist across Arizona, and a design direction built around the two of you.",
  },
  {
    step: "03",
    title: "Curation",
    body: "Vendor introductions, tastings, contract review and design development. Everything lives in one shared planning portal.",
  },
  {
    step: "04",
    title: "The Day",
    body: "Our team arrives before sunrise and leaves after the last chair is stacked. Your only job is to be present for it.",
  },
];

export const STATS = [
  { value: "210+", label: "Weddings produced" },
  { value: "5", label: "Years in Arizona" },
  { value: "60+", label: "Venue partners" },
  { value: "4.9", label: "Average client rating" },
];

export const TESTIMONIALS = [
  {
    quote:
      "We planned a 220-person wedding in Sedona from three time zones away. Le Rêve made it feel like we were down the street the entire time.",
    name: "Amara & Josh",
    detail: "L'Auberge de Sedona · November 2025",
  },
  {
    quote:
      "A monsoon rolled in ninety minutes before the ceremony. They moved 180 guests indoors and rebuilt the entire room. Nobody knew anything had changed.",
    name: "Priya & Daniel",
    detail: "The Phoenician, Scottsdale · August 2025",
  },
  {
    quote:
      "Three days, two cultures, four events, and not one moment where I had to make a decision. That was the whole gift.",
    name: "Sofia & Ravi",
    detail: "Hacienda del Sol, Tucson · March 2026",
  },
];

export const TEAM = [
  {
    name: "Camille Ortega",
    photo: "team-camille",
    role: "Founder & Principal Planner",
    bio: "Five years and two hundred weddings in the Sonoran desert. Camille built Le Rêve after a decade running events for resort properties across Scottsdale.",
  },
  {
    name: "Noor Haddad",
    photo: "team-noor",
    role: "Design Director",
    bio: "Trained in interior architecture, Noor leads every design book — palette, floral specification, lighting plots and the renderings couples fall in love with.",
  },
  {
    name: "Tessa Lindqvist",
    photo: "team-tessa",
    role: "Northern Arizona Lead",
    bio: "Based in Sedona, Tessa handles red rock permits, mountain logistics and every couple saying vows above 4,000 feet.",
  },
  {
    name: "Marcus Bell",
    photo: "team-marcus",
    role: "Production Manager",
    bio: "Marcus runs load-in, staffing and the wedding-day floor. If a generator fails at 6pm, he already has the second one running.",
  },
];

export const VALUES = [
  {
    title: "Desert-native",
    body: "We plan for 112° afternoons, August monsoons and 40° swings after sunset — with shade plans, backup builds and hydration stations written in from day one.",
  },
  {
    title: "Transparent numbers",
    body: "Flat planning fees, no vendor kickbacks, and a live budget you can open at any hour. What you see is what it costs.",
  },
  {
    title: "A limited calendar",
    body: "We take twenty-two weddings a year. That ceiling exists so your date always has a principal planner, not a coordinator you've never met.",
  },
];

export const NEWS = [
  {
    slug: "sonoran-color-2026",
    photo: "table-candlelight",
    title: "The 2026 Sonoran Palette: Turquoise, Bone and Antique Gold",
    category: "Design",
    date: "2026-07-08",
    readTime: "6 min read",
    excerpt:
      "Arizona couples are trading blush and greenery for something that actually belongs to this landscape. Here is how we are building the palette this season.",
    body: [
      "For most of the last decade, desert weddings borrowed their color story from somewhere else — Napa greenery, Charleston blush, Tulum terracotta. In 2026 our couples are finally looking at what is already outside the window.",
      "The palette we keep returning to starts with a desaturated turquoise pulled from oxidized copper and old Navajo silverwork. Against bone linen and unbleached raw silk it reads calm rather than coastal, which is exactly the distinction that matters at a Scottsdale resort in October.",
      "Gold is the second half of the story, but antique rather than bright — brushed brass candlesticks, hammered chargers, and a warm amber glass that catches low-angle light around 6:40pm. Skip the mirror finishes; polished gold flares hard in desert sun and photographs poorly.",
      "For florals, we specify desert milkweed, pale garden roses, dried palm and a single note of ocotillo for height. It survives heat far better than hydrangea and it looks like it grew where it is standing.",
    ],
    featured: true,
  },
  {
    slug: "monsoon-season-planning",
    photo: "ceremony-shoreline",
    title: "Planning Around Monsoon Season Without Fearing It",
    category: "Planning",
    date: "2026-06-19",
    readTime: "8 min read",
    excerpt:
      "July through September brings real risk to outdoor Arizona weddings — and some of the most spectacular light of the year. A working playbook.",
    body: [
      "Monsoon season runs roughly June 15 to September 30, and every year couples ask whether they should simply avoid it. Our answer is no. Rates drop, venues open up, and the sky at 7pm after a storm cell passes is genuinely unmatched.",
      "What it does require is a real Plan B, decided at contract signing rather than at 3pm on the wedding day. That means a covered or indoor space that can hold your full guest count, already included in the venue agreement — not a tent quoted as an emergency add-on.",
      "We set a firm call time, typically four hours before the ceremony, and the decision is made by the planner using the National Weather Service radar. Handing that decision to the couple on the day is unkind; handing it to a committee is worse.",
      "Practical details that matter: weighted linens, no loose paper programs, a backup generator for anything running off exterior power, and 200 white cotton towels staged near every entrance.",
    ],
  },
  {
    slug: "sedona-permits-guide",
    photo: "couple-desert-green",
    title: "A Straight Answer on Sedona Ceremony Permits",
    category: "Venues",
    date: "2026-05-30",
    readTime: "5 min read",
    excerpt:
      "Red Rock overlooks are federal land, and the permitting rules surprise nearly everyone. Here is the actual process and timeline.",
    body: [
      "Most of the iconic Sedona overlooks sit on Coconino National Forest land, administered by the Red Rock Ranger District. A special-use permit is required for any ceremony with a commercial photographer or more than a handful of guests.",
      "Applications open well in advance and the district caps group size at most sites — commonly 30 people, sometimes fewer. Submit at least 60 days out; 90 is safer during the March–May and September–November peaks.",
      "Chairs, arches, aisle runners and amplified sound are generally not permitted at dispersed sites. Couples wanting a built ceremony structure should look at private red rock estates instead, where we hold relationships with about a dozen properties.",
      "One thing nobody mentions: parking. Several trailheads require a Red Rock Pass per vehicle, and lots fill by 9am on weekends. We build shuttle logistics into every Sedona ceremony over twelve guests.",
    ],
  },
  {
    slug: "vendor-contracts-red-flags",
    photo: "stationery-wax-seal",
    title: "Six Clauses We Refuse to Let a Couple Sign",
    category: "Advice",
    date: "2026-05-02",
    readTime: "7 min read",
    excerpt:
      "We review roughly 300 vendor contracts a year. These are the terms that come back to hurt couples most often.",
    body: [
      "Unlimited substitution rights. If the contract lets a studio send 'a photographer of equivalent skill,' you did not book the photographer whose portfolio you loved. Name the shooter in the agreement.",
      "Force majeure that only protects one side. A vendor who can cancel for any 'circumstance beyond reasonable control' while you forfeit a non-refundable retainer is not sharing risk with you.",
      "Overtime that compounds. Watch for hourly overage billed in full-hour increments per staff member. A four-person band running twenty minutes long should not cost four hours.",
      "Exclusive vendor lists disguised as recommendations. Some venues require their preferred caterer without saying so until after the deposit clears.",
      "Image licensing that gives you nothing. You should get a print release at minimum, in writing, with delivery timeline stated in weeks.",
      "Payment schedules with no deliverable attached. Money should move when something is due, not on arbitrary dates.",
    ],
  },
  {
    slug: "lereve-joins-tucson",
    photo: "place-setting-terracotta",
    title: "Le Rêve Opens a Southern Arizona Studio in Tucson",
    category: "Studio News",
    date: "2026-04-11",
    readTime: "3 min read",
    excerpt:
      "After four years of driving down I-10 every other week, we are putting down roots in the Old Pueblo.",
    body: [
      "Southern Arizona has quietly become a third of our calendar. Hacienda estates, historic missions and saguaro-forest ranches are drawing couples who want warmth without a resort footprint.",
      "The new studio sits just off Broadway in the Sam Hughes neighborhood and opens for consultations in August 2026. It gives our Tucson couples the same sample tablescape and design-book sessions our Scottsdale clients have had for years.",
      "Tessa continues to lead northern Arizona from Sedona, and Camille will split her weeks between both studios through the end of the year.",
    ],
  },
  {
    slug: "budget-reality-2026",
    photo: "long-table-dusk",
    title: "What an Arizona Wedding Actually Costs in 2026",
    category: "Advice",
    date: "2026-03-14",
    readTime: "9 min read",
    excerpt:
      "Real numbers from 41 weddings we produced last year, broken down by region and guest count. No national averages.",
    body: [
      "National wedding cost averages are close to useless — they blend Manhattan with rural Ohio. Here is what our own book looked like across 41 Arizona weddings in 2025.",
      "Median all-in spend for a 120-guest Scottsdale resort wedding landed at $87,000. The same guest count at a Phoenix industrial venue with an outside caterer came in near $58,000, largely because food-and-beverage minimums disappear.",
      "Sedona runs high for its size. A 60-guest red rock wedding frequently reaches $64,000 once you account for lodging blocks, shuttles, permits and the premium every vendor charges for the drive.",
      "Across every region, catering plus bar accounted for 41% of total spend, photography and video 14%, florals and décor 13%, venue 12%, music 7%, planning 8%, and everything else the remainder.",
      "The single largest lever is guest count, not vendor selection. Cutting twenty guests saves more than any negotiation we can run on your behalf.",
    ],
  },
];

export const FAQS = [
  {
    q: "Do you travel throughout all of Arizona?",
    a: "Yes — the entire state. Phoenix and Scottsdale are our home base, and we regularly produce weddings in Sedona, Tucson, Flagstaff, Prescott, Lake Havasu and on the Grand Canyon South Rim. Travel within Arizona is included in every package.",
  },
  {
    q: "How far in advance should we book?",
    a: "Most couples engage us 12 to 16 months out. Peak dates in October, November, March and April typically fill 14+ months ahead. That said, we hold a few dates each year for shorter timelines — ask.",
  },
  {
    q: "What does the consultation cost?",
    a: "Nothing. The first conversation is a complimentary 60 minutes, in our Scottsdale studio or over video, and there is no obligation afterward.",
  },
  {
    q: "Can you work with vendors we've already booked?",
    a: "Absolutely. We audit what you have signed, fold those vendors into the timeline, and fill the remaining gaps. Partial Planning exists exactly for this.",
  },
  {
    q: "How many weddings do you take at once?",
    a: "Twenty-two per year, with never more than one per weekend. Every wedding gets a principal planner and a production team, not a handoff.",
  },
];

export const BUDGET_RANGES = [
  "Under $30,000",
  "$30,000 – $50,000",
  "$50,000 – $80,000",
  "$80,000 – $120,000",
  "$120,000+",
  "Still figuring it out",
];

export const GUEST_RANGES = [
  "Elopement (2 – 20)",
  "Intimate (20 – 60)",
  "Mid-size (60 – 120)",
  "Large (120 – 200)",
  "200+",
];

export const HOW_HEARD = [
  "Instagram",
  "Google search",
  "A venue referred us",
  "Friend or family",
  "Past Le Rêve couple",
  "Other",
];
