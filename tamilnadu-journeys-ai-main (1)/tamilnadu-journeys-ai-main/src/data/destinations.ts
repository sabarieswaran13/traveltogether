// Tamil Nadu destinations: each city has 4 underrated + 3 popular places
// Amounts in INR (₹). Maps use Google Maps search URLs.

export interface Hotel {
  name: string;
  pricePerNight: number; // INR
  rating: number;
}

export interface Place {
  slug: string;
  name: string;
  city: string;
  category: "underrated" | "popular";
  shortDesc: string;
  description: string;
  image: string;
  bestTime: string;
  entryFee: number; // INR, 0 if free
  hotels: Hotel[];
  // Google Maps URL — works without an API key
  mapsUrl: string;
}

export interface City {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
}

const gmaps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Image URLs (Unsplash — free, royalty-free)
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const cities: City[] = [
  { slug: "chennai", name: "Chennai", tagline: "Gateway to the South", image: img("photo-1582510003544-4d00b7f74220"), description: "A coastal metropolis blending colonial heritage, Tamil culture, and Marina Beach sunsets." },
  { slug: "madurai", name: "Madurai", tagline: "Temple City of the South", image: img("photo-1561361398-a8a86e93b990"), description: "The 2,500-year-old temple city, home to the magnificent Meenakshi Amman Temple." },
  { slug: "kanyakumari", name: "Kanyakumari", tagline: "Land's End of India", image: img("photo-1605649487212-47bdab064df7"), description: "Where three seas meet — witness sunrise and sunset over the ocean from one spot." },
  { slug: "ooty", name: "Ooty", tagline: "Queen of Hill Stations", image: img("photo-1591018653069-c0d7c61c30b1"), description: "Rolling tea estates, pine forests, and the mountain railway through the Nilgiris." },
  { slug: "kodaikanal", name: "Kodaikanal", tagline: "Princess of Hills", image: img("photo-1605649487212-47bdab064df7"), description: "Misty lakes, granite cliffs, and shola forests in the Palani Hills." },
  { slug: "thanjavur", name: "Thanjavur", tagline: "Cradle of Chola Heritage", image: img("photo-1582510003544-4d00b7f74220"), description: "Home to the UNESCO Brihadeeswarar Temple and the birthplace of Bharatanatyam." },
  { slug: "rameshwaram", name: "Rameshwaram", tagline: "Sacred Island of the South", image: img("photo-1609920658906-8223bd289001"), description: "A coral island linked by the Pamban Bridge, sacred to both Shiva and Rama legends." },
  { slug: "pondicherry", name: "Pondicherry", tagline: "French Riviera of the East", image: img("photo-1582972236019-ea4af5ffe587"), description: "Cobbled streets, French colonial mansions, and the spiritual energy of Auroville nearby." },
  { slug: "mahabalipuram", name: "Mahabalipuram", tagline: "Stone Poetry by the Sea", image: img("photo-1604423043492-41303b89ec79"), description: "7th-century rock-cut temples and the iconic Shore Temple by the Bay of Bengal." },
  { slug: "yercaud", name: "Yercaud", tagline: "Jewel of the South", image: img("photo-1591018653069-c0d7c61c30b1"), description: "A quiet hill retreat in the Shevaroy Hills with coffee plantations and orchid gardens." },
  { slug: "coimbatore", name: "Coimbatore", tagline: "Manchester of South India", image: img("photo-1582510003544-4d00b7f74220"), description: "Industrial powerhouse and the gateway to the Nilgiris and Western Ghats hill stations." },
  { slug: "tiruchirappalli", name: "Tiruchirappalli", tagline: "City of the Rock Fort", image: img("photo-1561361398-a8a86e93b990"), description: "Ancient island temples, a towering rock fort, and the cradle of the Cauvery delta." },
  { slug: "tirunelveli", name: "Tirunelveli", tagline: "City of Paddy Fields", image: img("photo-1604423043492-41303b89ec79"), description: "Famed for its halwa, the Nellaiappar Temple, and the lush waterfalls of the Western Ghats." },
  { slug: "vellore", name: "Vellore", tagline: "The Fort City", image: img("photo-1582510003544-4d00b7f74220"), description: "Home to a 16th-century granite fortress and the all-gold Sripuram Lakshmi Narayani Temple." },
];

export const places: Place[] = [
  // CHENNAI
  { slug: "marina-beach", name: "Marina Beach", city: "chennai", category: "popular", shortDesc: "World's second-longest urban beach", description: "Stretching 13 km along the Bay of Bengal, Marina Beach is Chennai's beating heart. Walk the promenade at dawn, watch fishermen haul in the night's catch, and end the day with steaming sundal from the stalls. The lighthouse offers panoramic city views.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Nov–Feb, early morning or evening", entryFee: 0, hotels: [{ name: "ITC Grand Chola", pricePerNight: 12500, rating: 4.8 }, { name: "Marina Bay Inn", pricePerNight: 2200, rating: 4.1 }], mapsUrl: gmaps("Marina Beach Chennai") },
  { slug: "kapaleeshwarar-temple", name: "Kapaleeshwarar Temple", city: "chennai", category: "popular", shortDesc: "Ancient Dravidian temple in Mylapore", description: "A 7th-century Shiva temple with a towering gopuram covered in vibrant sculptures. The Mylapore neighborhood around it is a treasure of flower markets, filter coffee shops, and traditional silk weavers.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Year-round, mornings", entryFee: 0, hotels: [{ name: "Hyatt Regency Chennai", pricePerNight: 9800, rating: 4.6 }, { name: "Mylapore Lodge", pricePerNight: 1500, rating: 4.0 }], mapsUrl: gmaps("Kapaleeshwarar Temple Mylapore") },
  { slug: "fort-st-george", name: "Fort St. George", city: "chennai", category: "popular", shortDesc: "First English fortress in India (1644)", description: "The birthplace of modern Chennai. Inside the fort: St. Mary's Church (oldest Anglican church east of Suez), the Fort Museum's colonial weapons, and the Tamil Nadu Legislative Assembly.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Oct–Mar", entryFee: 25, hotels: [{ name: "The Park Chennai", pricePerNight: 7500, rating: 4.5 }], mapsUrl: gmaps("Fort St George Chennai") },
  { slug: "dakshinachitra", name: "DakshinaChitra Heritage Village", city: "chennai", category: "underrated", shortDesc: "Living museum of South Indian crafts", description: "A 10-acre open-air village showcasing reconstructed Tamil, Kerala, Karnataka, and Andhra homes. Watch live pottery, weaving, and folk performances. Perfect for understanding the region's craft traditions.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Oct–Mar", entryFee: 120, hotels: [{ name: "Radisson Blu ECR", pricePerNight: 6800, rating: 4.4 }, { name: "ECR Beach Lodge", pricePerNight: 1800, rating: 3.9 }], mapsUrl: gmaps("DakshinaChitra Museum Chennai") },
  { slug: "pulicat-lake", name: "Pulicat Lake", city: "chennai", category: "underrated", shortDesc: "India's second-largest brackish lagoon", description: "Two hours north of Chennai, Pulicat is a paradise for birdwatchers — flamingos, pelicans, and painted storks gather here Nov–Feb. Take a coracle ride at dawn for the best sightings.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Nov–Feb", entryFee: 50, hotels: [{ name: "Pulicat Eco Stay", pricePerNight: 1600, rating: 4.0 }], mapsUrl: gmaps("Pulicat Lake Bird Sanctuary") },
  { slug: "cholamandal-village", name: "Cholamandal Artists' Village", city: "chennai", category: "underrated", shortDesc: "India's largest self-supporting artist commune", description: "Founded in 1966, this seaside community is home to working painters and sculptors. Wander the gardens, browse the gallery, and meet artists in their open studios.", image: img("photo-1582972236019-ea4af5ffe587"), bestTime: "Year-round", entryFee: 50, hotels: [{ name: "Sea Breeze Resort ECR", pricePerNight: 3200, rating: 4.2 }], mapsUrl: gmaps("Cholamandal Artists Village Chennai") },
  { slug: "broken-bridge", name: "Broken Bridge", city: "chennai", category: "underrated", shortDesc: "Cinematic ruin where backwater meets sea", description: "An abandoned bridge over the Adyar estuary that's become Chennai's favorite sunset photo spot. Weathered concrete, distant fishing boats, and birds wheeling above the water.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Year-round, sunset", entryFee: 0, hotels: [{ name: "Vivanta Chennai", pricePerNight: 8500, rating: 4.5 }], mapsUrl: gmaps("Broken Bridge Besant Nagar Chennai") },

  // MADURAI
  { slug: "meenakshi-temple", name: "Meenakshi Amman Temple", city: "madurai", category: "popular", shortDesc: "33,000 painted sculptures, 14 gopurams", description: "The beating heart of Madurai. This 6th-century temple complex covers 14 acres, with towering gateways covered in thousands of brightly painted figures. The Hall of a Thousand Pillars is unmissable.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Oct–Mar", entryFee: 50, hotels: [{ name: "Heritage Madurai", pricePerNight: 6500, rating: 4.6 }, { name: "Hotel Supreme", pricePerNight: 2400, rating: 4.1 }], mapsUrl: gmaps("Meenakshi Amman Temple Madurai") },
  { slug: "thirumalai-nayakkar-palace", name: "Thirumalai Nayakkar Palace", city: "madurai", category: "popular", shortDesc: "17th-century Indo-Saracenic marvel", description: "A grand palace of stuccoed columns and arched halls built in 1636. Catch the evening sound-and-light show that brings Madurai's history to life.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Oct–Mar", entryFee: 50, hotels: [{ name: "GRT Regency Madurai", pricePerNight: 4800, rating: 4.4 }], mapsUrl: gmaps("Thirumalai Nayakkar Mahal Madurai") },
  { slug: "gandhi-museum-madurai", name: "Gandhi Memorial Museum", city: "madurai", category: "popular", shortDesc: "Houses the blood-stained dhoti Gandhi wore at his assassination", description: "One of seven Gandhi museums in India. Housed in a 17th-century palace, it traces India's freedom struggle through photographs, manuscripts, and Gandhi's personal belongings.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Hotel Sangam Madurai", pricePerNight: 5200, rating: 4.3 }], mapsUrl: gmaps("Gandhi Memorial Museum Madurai") },
  { slug: "samanar-hills", name: "Samanar Hills", city: "madurai", category: "underrated", shortDesc: "2,000-year-old Jain rock-cut beds", description: "Climb the rocky hill outside Madurai to find ancient Jain monastic shelters carved into stone, with weathered inscriptions in Tamil-Brahmi. Quiet, atmospheric, and utterly unvisited.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "JC Residency", pricePerNight: 3200, rating: 4.2 }], mapsUrl: gmaps("Samanar Hills Madurai") },
  { slug: "athisayam", name: "Vaigai Dam Vista Point", city: "madurai", category: "underrated", shortDesc: "Sunset viewpoint over Vaigai reservoir", description: "60 km from the city, the Vaigai Dam offers cool breezes, gardens, and dramatic sunsets over the water. A favorite local picnic spot completely off the tourist trail.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Aug–Feb", entryFee: 20, hotels: [{ name: "Vaigai Lodge", pricePerNight: 1400, rating: 3.9 }], mapsUrl: gmaps("Vaigai Dam Madurai") },
  { slug: "thiruparankundram", name: "Thiruparankundram Temple", city: "madurai", category: "underrated", shortDesc: "Rock-cut Murugan shrine in a sacred hill", description: "One of the six abodes of Lord Murugan, carved directly into a hillside. The dimly lit cave shrines and pillared halls feel like stepping into another century.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Madurai Residency", pricePerNight: 2800, rating: 4.2 }], mapsUrl: gmaps("Thiruparankundram Murugan Temple") },
  { slug: "alagar-koil", name: "Alagar Koil", city: "madurai", category: "underrated", shortDesc: "Forest temple of Vishnu in the hills", description: "21 km north of Madurai, set in a forested hill, this Vishnu temple is the legendary 'brother' of Meenakshi. Quiet courtyards, sacred ponds, and almost no crowds.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Forest View Lodge", pricePerNight: 1700, rating: 4.0 }], mapsUrl: gmaps("Alagar Kovil Madurai") },

  // KANYAKUMARI
  { slug: "vivekananda-rock", name: "Vivekananda Rock Memorial", city: "kanyakumari", category: "popular", shortDesc: "Island shrine where Swami Vivekananda meditated", description: "A short ferry ride into the sea takes you to two granite rocks: one with a memorial to Vivekananda, the other crowned by the 133-foot Thiruvalluvar statue.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Oct–Mar", entryFee: 50, hotels: [{ name: "The Seashore Hotel", pricePerNight: 4800, rating: 4.4 }, { name: "Sparsa Resort", pricePerNight: 6200, rating: 4.5 }], mapsUrl: gmaps("Vivekananda Rock Memorial Kanyakumari") },
  { slug: "sunset-point-kk", name: "Triveni Sangam Sunset Point", city: "kanyakumari", category: "popular", shortDesc: "Where Bay of Bengal, Arabian Sea & Indian Ocean meet", description: "The southern tip of mainland India. Watch the sun rise and set over the same horizon — a phenomenon possible only here on certain days.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Apr–May & Oct, full moon nights", entryFee: 0, hotels: [{ name: "Singaar International", pricePerNight: 3800, rating: 4.3 }], mapsUrl: gmaps("Triveni Sangam Kanyakumari") },
  { slug: "thiruvalluvar-statue", name: "Thiruvalluvar Statue", city: "kanyakumari", category: "popular", shortDesc: "133-foot tribute to the Tamil poet-saint", description: "Standing tall on a small rock island, this 38-storey statue honors Thiruvalluvar, author of the Tirukkural. The 133 feet represent the 133 chapters of his work.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Oct–Mar", entryFee: 50, hotels: [{ name: "Hotel Tamil Nadu", pricePerNight: 2400, rating: 4.0 }], mapsUrl: gmaps("Thiruvalluvar Statue Kanyakumari") },
  { slug: "thirparappu-falls", name: "Thirparappu Falls", city: "kanyakumari", category: "underrated", shortDesc: "Wide curtain waterfall on the Kodayar river", description: "55 km from Kanyakumari, this 50-foot waterfall flows over a wide rock face. You can swim at the base. A 12th-century Shiva temple sits nearby, almost forgotten by tourists.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Jun–Jan", entryFee: 30, hotels: [{ name: "Kodayar Eco Lodge", pricePerNight: 1900, rating: 4.1 }], mapsUrl: gmaps("Thirparappu Falls Kanyakumari") },
  { slug: "padmanabhapuram-palace", name: "Padmanabhapuram Palace", city: "kanyakumari", category: "underrated", shortDesc: "Largest wooden palace complex in Asia", description: "Built in the 16th century, every floor and ceiling is intricately carved teak and rosewood. The medicinal-oil-treated black floor still glistens after 400 years.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Oct–Mar", entryFee: 35, hotels: [{ name: "Hotel Sea View", pricePerNight: 2900, rating: 4.2 }], mapsUrl: gmaps("Padmanabhapuram Palace") },
  { slug: "chitharal-jain-temple", name: "Chitharal Jain Temple", city: "kanyakumari", category: "underrated", shortDesc: "9th-century rock-cut Jain shrine", description: "Climb a small hill to reach this hidden Jain monument carved into a granite outcrop. Bas-relief sculptures of Tirthankaras line the rock walls.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Chitharal Stay", pricePerNight: 1500, rating: 3.9 }], mapsUrl: gmaps("Chitharal Jain Monuments") },
  { slug: "muttom-beach", name: "Muttom Beach & Lighthouse", city: "kanyakumari", category: "underrated", shortDesc: "Black-rock beach with a 19th-century lighthouse", description: "Dramatic black volcanic rocks meeting turquoise water. Climb the colonial lighthouse for sweeping coastal views. Mostly visited by locals at sunset.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Oct–Mar", entryFee: 20, hotels: [{ name: "Coastal Lodge Muttom", pricePerNight: 1800, rating: 4.0 }], mapsUrl: gmaps("Muttom Beach Lighthouse") },

  // OOTY
  { slug: "ooty-lake", name: "Ooty Lake", city: "ooty", category: "popular", shortDesc: "Boating in a colonial-era artificial lake", description: "Built by John Sullivan in 1824, this 65-acre lake is ringed by eucalyptus and pine. Hire a paddle boat or take the toy train along its edge.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Mar–Jun, Sep–Nov", entryFee: 30, hotels: [{ name: "Taj Savoy Ooty", pricePerNight: 11500, rating: 4.7 }, { name: "Hotel Lakeview", pricePerNight: 2800, rating: 4.1 }], mapsUrl: gmaps("Ooty Lake") },
  { slug: "doddabetta-peak", name: "Doddabetta Peak", city: "ooty", category: "popular", shortDesc: "Highest point in the Nilgiris (2,637 m)", description: "On a clear day you can see Mysore plateau and the Mukurthi range. A telescope house at the top brings distant peaks within reach.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Apr–Jun", entryFee: 30, hotels: [{ name: "Sterling Ooty Elk Hill", pricePerNight: 5800, rating: 4.4 }], mapsUrl: gmaps("Doddabetta Peak Ooty") },
  { slug: "nilgiri-mountain-railway", name: "Nilgiri Mountain Railway", city: "ooty", category: "popular", shortDesc: "UNESCO World Heritage steam railway", description: "The 'toy train' from Mettupalayam to Ooty climbs 1,800 m over 46 km of switchbacks, tunnels, and bridges. The world's only rack railway still pulled by steam.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Year-round", entryFee: 270, hotels: [{ name: "Fortune Resort Sullivan Court", pricePerNight: 7800, rating: 4.5 }], mapsUrl: gmaps("Nilgiri Mountain Railway Ooty") },
  { slug: "avalanche-lake", name: "Avalanche Lake", city: "ooty", category: "underrated", shortDesc: "Hidden lake inside a shola forest reserve", description: "28 km from Ooty, accessible only by forest department jeep. Pristine grasslands, rhododendron blooms, and a clear lake — feels untouched.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Apr–Jun", entryFee: 75, hotels: [{ name: "Avalanche Forest Lodge", pricePerNight: 2200, rating: 4.0 }], mapsUrl: gmaps("Avalanche Lake Ooty") },
  { slug: "pykara-falls", name: "Pykara Falls & Lake", city: "ooty", category: "underrated", shortDesc: "Twin waterfalls in a sacred Toda valley", description: "21 km from Ooty, the Pykara river drops in two cascades surrounded by toda buffalo pastures. A boathouse offers quiet rides on the lake above.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Aug–Mar", entryFee: 50, hotels: [{ name: "Pykara River Resort", pricePerNight: 3500, rating: 4.3 }], mapsUrl: gmaps("Pykara Falls Ooty") },
  { slug: "emerald-lake", name: "Emerald Lake", city: "ooty", category: "underrated", shortDesc: "Tranquil reservoir in the Silent Valley", description: "Named for its color, this lake is part of a hydro project but feels wild — surrounded by tea plantations with snow-capped peaks visible on cold mornings.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Emerald Valley Stay", pricePerNight: 2400, rating: 4.1 }], mapsUrl: gmaps("Emerald Lake Ooty") },
  { slug: "kalhatti-falls", name: "Kalhatti Falls", city: "ooty", category: "underrated", shortDesc: "120-foot cascade on the way down to Mysore", description: "A short trek brings you to this waterfall with a small Shiva shrine at its base, said to have been visited by sage Agastya. Rarely on tourist itineraries.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Jul–Feb", entryFee: 20, hotels: [{ name: "Kalhatti Hill Lodge", pricePerNight: 1800, rating: 3.9 }], mapsUrl: gmaps("Kalhatti Falls Ooty") },

  // KODAIKANAL
  { slug: "kodai-lake", name: "Kodaikanal Lake", city: "kodaikanal", category: "popular", shortDesc: "Star-shaped lake in the Palani Hills", description: "The heart of Kodai. Cycle around its 5-km perimeter, paddle a boat, or just sit on a bench and watch the mist roll in.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Apr–Jun, Sep–Oct", entryFee: 0, hotels: [{ name: "The Carlton Kodaikanal", pricePerNight: 9500, rating: 4.6 }, { name: "Hotel JC Residency", pricePerNight: 3400, rating: 4.2 }], mapsUrl: gmaps("Kodaikanal Lake") },
  { slug: "coakers-walk", name: "Coaker's Walk", city: "kodaikanal", category: "popular", shortDesc: "Cliff-edge promenade with valley views", description: "A 1-km paved path along the edge of a steep slope offering panoramic views of the plains 2,000 m below. On clear days you can see Madurai.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Apr–Jun", entryFee: 10, hotels: [{ name: "Hilltop Towers Kodaikanal", pricePerNight: 4200, rating: 4.3 }], mapsUrl: gmaps("Coakers Walk Kodaikanal") },
  { slug: "bryant-park", name: "Bryant Park", city: "kodaikanal", category: "popular", shortDesc: "20-acre botanical garden by the lake", description: "Home to thousands of rose varieties, exotic conifers, and a glasshouse of orchids. The annual horticultural show in May draws crowds from across the south.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Apr–Jun", entryFee: 30, hotels: [{ name: "Sterling Kodai Valley", pricePerNight: 5400, rating: 4.4 }], mapsUrl: gmaps("Bryant Park Kodaikanal") },
  { slug: "dolphin-nose", name: "Dolphin's Nose", city: "kodaikanal", category: "underrated", shortDesc: "Flat rock jutting out over a 6,500-ft drop", description: "A 30-minute trek from Vattakanal village. Sit on the rocky outcrop with your legs dangling over the edge — clouds often rise up the cliff to meet you.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Sep–Mar", entryFee: 0, hotels: [{ name: "Vattakanal Resort", pricePerNight: 2600, rating: 4.2 }], mapsUrl: gmaps("Dolphins Nose Kodaikanal") },
  { slug: "pillar-rocks", name: "Pillar Rocks", city: "kodaikanal", category: "underrated", shortDesc: "Three 400-foot granite pillars side by side", description: "These vertical rock columns rise from a deep valley. A small flower garden in front makes for striking photos when mist clears.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Apr–Jun", entryFee: 20, hotels: [{ name: "Hotel Greenlands Youth Hostel", pricePerNight: 1600, rating: 4.0 }], mapsUrl: gmaps("Pillar Rocks Kodaikanal") },
  { slug: "berijam-lake", name: "Berijam Lake", city: "kodaikanal", category: "underrated", shortDesc: "Pristine reserve lake — limited daily entries", description: "Inside a protected forest 21 km from town. Only 50 vehicles allowed daily — apply for a permit at the Forest Office. Sloth bears and gaur are sometimes spotted.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Oct–Mar", entryFee: 100, hotels: [{ name: "Forest Eco Cottage", pricePerNight: 2800, rating: 4.3 }], mapsUrl: gmaps("Berijam Lake Kodaikanal") },
  { slug: "mannavanur", name: "Mannavanur Sheep Farm", city: "kodaikanal", category: "underrated", shortDesc: "Sheep meadows and a hidden lake at 6,200 ft", description: "A government sheep research station turned scenic spot — rolling green pastures, grazing sheep and rabbits, and a small lake. 35 km from Kodai.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Year-round", entryFee: 25, hotels: [{ name: "Mannavanur Farm Stay", pricePerNight: 2100, rating: 4.2 }], mapsUrl: gmaps("Mannavanur Lake Kodaikanal") },

  // THANJAVUR
  { slug: "brihadeeswarar-temple", name: "Brihadeeswarar Temple", city: "thanjavur", category: "popular", shortDesc: "UNESCO Chola masterpiece (1010 CE)", description: "Built by Raja Raja Chola I, this granite temple's 216-foot vimana was the tallest in the world for a century. The single 80-ton capstone on top remains a mystery.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Svatma Heritage Hotel", pricePerNight: 9800, rating: 4.7 }, { name: "Hotel Gnanam", pricePerNight: 3200, rating: 4.2 }], mapsUrl: gmaps("Brihadeeswarar Temple Thanjavur") },
  { slug: "thanjavur-palace", name: "Thanjavur Maratha Palace", city: "thanjavur", category: "popular", shortDesc: "16th-century palace with the Saraswati Mahal Library", description: "Built by the Nayaks and expanded by the Marathas. Houses an art gallery, royal armory, and one of Asia's oldest libraries with palm-leaf manuscripts.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Year-round", entryFee: 50, hotels: [{ name: "Sangam Hotel Thanjavur", pricePerNight: 4600, rating: 4.3 }], mapsUrl: gmaps("Thanjavur Maratha Palace") },
  { slug: "art-gallery-thanjavur", name: "Thanjavur Art Gallery", city: "thanjavur", category: "popular", shortDesc: "Bronze Chola sculptures, finest collection in India", description: "Housed inside the palace, this gallery holds the world's best collection of Chola bronze idols — including the iconic Nataraja that defined Indian sculpture.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 70, hotels: [{ name: "Ideal River View Resort", pricePerNight: 5200, rating: 4.5 }], mapsUrl: gmaps("Thanjavur Art Gallery") },
  { slug: "gangaikondacholapuram", name: "Gangaikonda Cholapuram", city: "thanjavur", category: "underrated", shortDesc: "Forgotten Chola capital with a magnificent temple", description: "Built by Rajendra Chola in 1035 to commemorate his Ganga conquest. The temple rivals Brihadeeswarar in scale but sees a fraction of the visitors.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Hotel Annamalai", pricePerNight: 2200, rating: 4.0 }], mapsUrl: gmaps("Gangaikonda Cholapuram Temple") },
  { slug: "darasuram-temple", name: "Airavatesvara Temple, Darasuram", city: "thanjavur", category: "underrated", shortDesc: "UNESCO temple with chariot-shaped stone wheels", description: "A 12th-century gem with intricate carvings — the front mandapa is shaped like a horse-drawn chariot. Musical stone steps that produce different notes.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Kumbakonam Lakeview", pricePerNight: 2600, rating: 4.1 }], mapsUrl: gmaps("Airavatesvara Temple Darasuram") },
  { slug: "thiruvaiyaru", name: "Thiruvaiyaru", city: "thanjavur", category: "underrated", shortDesc: "Birthplace of saint-composer Tyagaraja", description: "13 km from Thanjavur on the banks of the Cauvery. Every January, Carnatic musicians from across the world gather here for the Tyagaraja Aradhana festival.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Jan (festival)", entryFee: 0, hotels: [{ name: "Cauvery River Stay", pricePerNight: 1900, rating: 4.0 }], mapsUrl: gmaps("Thiruvaiyaru") },
  { slug: "thanjavur-painting-village", name: "Thanjavur Painting Workshops", city: "thanjavur", category: "underrated", shortDesc: "Watch gold-leaf paintings being made", description: "Several family workshops in the old town welcome visitors to see the centuries-old technique of Thanjavur paintings — gold leaf, gemstones, and natural pigments.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Hotel Parisutham", pricePerNight: 4400, rating: 4.3 }], mapsUrl: gmaps("Thanjavur Painting Old Town") },

  // RAMESHWARAM
  { slug: "ramanathaswamy-temple", name: "Ramanathaswamy Temple", city: "rameshwaram", category: "popular", shortDesc: "Longest temple corridor in the world (1,200 m)", description: "One of the 12 Jyotirlingas. The corridor of carved pillars seems to stretch infinitely. Bathing in the 22 sacred wells inside is the central ritual.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Hyatt Place Rameswaram", pricePerNight: 6800, rating: 4.5 }, { name: "Daiwik Hotels Rameswaram", pricePerNight: 4200, rating: 4.3 }], mapsUrl: gmaps("Ramanathaswamy Temple Rameswaram") },
  { slug: "pamban-bridge", name: "Pamban Bridge", city: "rameshwaram", category: "popular", shortDesc: "India's first sea bridge, opened 1914", description: "A 2-km cantilever bridge over the Palk Strait. Trains slow as they cross — gaze down at turquoise water on both sides. The new Pamban Vertical Lift Bridge runs alongside.", image: img("photo-1609920658906-8223bd289001"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Hotel Tamil Nadu Rameswaram", pricePerNight: 2800, rating: 4.0 }], mapsUrl: gmaps("Pamban Bridge Rameswaram") },
  { slug: "dhanushkodi-popular", name: "Dhanushkodi Beach", city: "rameshwaram", category: "popular", shortDesc: "Ghost town at the tip of the island", description: "A town destroyed by the 1964 cyclone, left as ruins on a thin strip of sand between two seas. The drive there along the dune road is unforgettable.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Vinayaga Hotel by Poppys", pricePerNight: 3600, rating: 4.2 }], mapsUrl: gmaps("Dhanushkodi Beach") },
  { slug: "kothandaramaswamy-temple", name: "Kothandaramaswamy Temple", city: "rameshwaram", category: "underrated", shortDesc: "Lone temple that survived the 1964 cyclone", description: "Standing on a sandbar near Dhanushkodi, this temple where Vibhishana is said to have surrendered to Rama is the only structure that survived the great storm.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Sea Lord Hotel", pricePerNight: 2400, rating: 4.0 }], mapsUrl: gmaps("Kothandaramaswamy Temple Rameswaram") },
  { slug: "agni-theertham", name: "Agni Theertham Beach", city: "rameshwaram", category: "underrated", shortDesc: "Sacred sunrise bathing beach", description: "Just east of the main temple, this calm beach is where pilgrims bathe before entering the shrine. Empty by 8 am — perfect for a quiet morning walk.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Year-round, sunrise", entryFee: 0, hotels: [{ name: "Jiwan Residency", pricePerNight: 2200, rating: 4.1 }], mapsUrl: gmaps("Agni Theertham Rameswaram") },
  { slug: "abdul-kalam-memorial", name: "APJ Abdul Kalam Memorial", city: "rameshwaram", category: "underrated", shortDesc: "Tribute to India's Missile Man, Rameshwaram's son", description: "Built where Dr. Kalam was buried, this memorial showcases his life, ISRO models, and personal belongings. Quietly moving and beautifully designed.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Blue Coral Resort", pricePerNight: 3800, rating: 4.4 }], mapsUrl: gmaps("APJ Abdul Kalam Memorial Rameswaram") },
  { slug: "olaikuda-beach", name: "Olaikuda Beach", city: "rameshwaram", category: "underrated", shortDesc: "Coral-clear shallows for snorkeling", description: "5 km from town, this shallow beach has crystal water perfect for spotting starfish and sea cucumbers. Local boats run short coral-viewing trips.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Olaikuda Beach Lodge", pricePerNight: 1800, rating: 4.0 }], mapsUrl: gmaps("Olaikuda Beach Rameswaram") },

  // PONDICHERRY
  { slug: "promenade-beach", name: "Promenade (Rock) Beach", city: "pondicherry", category: "popular", shortDesc: "1.5-km seafront with Gandhi statue & old pier", description: "Vehicle-free in the evenings. The black rock embankment, French-era buildings, and the towering Gandhi statue make this the city's social heart.", image: img("photo-1582972236019-ea4af5ffe587"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Le Pondy Beach Resort", pricePerNight: 7200, rating: 4.5 }, { name: "Hotel de l'Orient", pricePerNight: 5800, rating: 4.4 }], mapsUrl: gmaps("Promenade Beach Pondicherry") },
  { slug: "auroville", name: "Auroville", city: "pondicherry", category: "popular", shortDesc: "Experimental township and the golden Matrimandir", description: "Founded in 1968 as a universal community. Visit the Matrimandir for silent meditation, browse the visitor center, or stay at one of Auroville's many guest houses.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Auroville Guest House", pricePerNight: 2800, rating: 4.3 }], mapsUrl: gmaps("Auroville Matrimandir") },
  { slug: "french-quarter", name: "French Quarter (White Town)", city: "pondicherry", category: "popular", shortDesc: "Mustard-yellow villas, bougainvillea, and cafés", description: "The grid of streets between the canal and the sea — every corner is a photograph. Stop at Café des Arts, Baker Street, and the Notre Dame des Anges church.", image: img("photo-1582972236019-ea4af5ffe587"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Palais de Mahe", pricePerNight: 9200, rating: 4.7 }], mapsUrl: gmaps("White Town Pondicherry") },
  { slug: "paradise-beach", name: "Paradise Beach (Plage Paradiso)", city: "pondicherry", category: "underrated", shortDesc: "Boat-only sandbar beach across the backwaters", description: "Reached by a 20-minute ferry from Chunnambar. Soft white sand, casuarina trees, and almost no development. Pack your own food.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Sep–Apr", entryFee: 200, hotels: [{ name: "Chunnambar Boat House Cottages", pricePerNight: 3400, rating: 4.2 }], mapsUrl: gmaps("Paradise Beach Pondicherry") },
  { slug: "arikamedu", name: "Arikamedu Ruins", city: "pondicherry", category: "underrated", shortDesc: "2,000-year-old Indo-Roman trading port", description: "Excavations uncovered Roman pottery, glass, and amphorae here. The riverside ruins of a Jesuit chapel sit atop the ancient warehouses.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Villa Shanti", pricePerNight: 6200, rating: 4.6 }], mapsUrl: gmaps("Arikamedu Pondicherry") },
  { slug: "serenity-beach", name: "Serenity Beach", city: "pondicherry", category: "underrated", shortDesc: "Pondy's surf beach, mostly locals", description: "8 km north of town. Consistent waves attract a small surf school crowd. Quieter than the Promenade and good for actual swimming.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Sep–Mar", entryFee: 0, hotels: [{ name: "Kailash Beach Resort", pricePerNight: 4400, rating: 4.3 }], mapsUrl: gmaps("Serenity Beach Pondicherry") },
  { slug: "bharathi-park", name: "Bharathi Park & Aayi Mandapam", city: "pondicherry", category: "underrated", shortDesc: "Colonial garden square in the heart of the old town", description: "A French-laid-out park around a white Greco-Roman monument. Locals come for morning yoga and evening chai from the corner stalls.", image: img("photo-1582972236019-ea4af5ffe587"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Maison Perumal", pricePerNight: 7800, rating: 4.6 }], mapsUrl: gmaps("Bharathi Park Pondicherry") },

  // MAHABALIPURAM
  { slug: "shore-temple", name: "Shore Temple", city: "mahabalipuram", category: "popular", shortDesc: "8th-century temple right on the beach", description: "A UNESCO site, this is one of the oldest stone temples in South India. Best at sunrise when the granite glows pink and the sea is calm.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Nov–Feb", entryFee: 40, hotels: [{ name: "Radisson Blu Resort Temple Bay", pricePerNight: 8400, rating: 4.6 }, { name: "Sea Bird Resort", pricePerNight: 2900, rating: 4.1 }], mapsUrl: gmaps("Shore Temple Mahabalipuram") },
  { slug: "pancha-rathas", name: "Pancha Rathas", city: "mahabalipuram", category: "popular", shortDesc: "Five chariot-shaped monolithic temples", description: "Each ratha carved from a single granite boulder, each in a different architectural style. A textbook of early Dravidian design in one open-air gallery.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Nov–Feb", entryFee: 40, hotels: [{ name: "Ideal Beach Resort", pricePerNight: 6500, rating: 4.4 }], mapsUrl: gmaps("Pancha Rathas Mahabalipuram") },
  { slug: "arjuna-penance", name: "Arjuna's Penance", city: "mahabalipuram", category: "popular", shortDesc: "World's largest open-air bas-relief (96 ft × 43 ft)", description: "An entire epic carved across two boulders — gods, sages, animals, and a life-sized elephant family. The detail repays an hour of slow looking.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "GRT Temple Bay", pricePerNight: 7800, rating: 4.5 }], mapsUrl: gmaps("Arjuna Penance Mahabalipuram") },
  { slug: "krishnas-butter-ball", name: "Krishna's Butter Ball", city: "mahabalipuram", category: "underrated", shortDesc: "250-ton boulder balanced on a slope", description: "A massive granite ball that has rested at an impossible angle for 1,200 years — surviving every cyclone and an attempt by a 7-elephant team to dislodge it.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Hotel Mamalla Heritage", pricePerNight: 2400, rating: 4.0 }], mapsUrl: gmaps("Krishnas Butter Ball Mahabalipuram") },
  { slug: "tiger-cave", name: "Tiger Cave", city: "mahabalipuram", category: "underrated", shortDesc: "Forest shrine with a ring of carved lion heads", description: "5 km north of town, this 7th-century rock-cut shrine sits in a casuarina grove right by the sea. The 11 yali (lion) heads carved around the entrance are unique.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Chariot Beach Resort", pricePerNight: 5400, rating: 4.4 }], mapsUrl: gmaps("Tiger Cave Mahabalipuram") },
  { slug: "varaha-cave", name: "Varaha Cave Temple", city: "mahabalipuram", category: "underrated", shortDesc: "7th-century cave with exquisite Vishnu reliefs", description: "Often missed by groups rushing to the Shore Temple. Inside, the panel of Vishnu lifting the earth as Varaha is one of India's finest sculptures.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Mamalla Inn", pricePerNight: 1800, rating: 4.0 }], mapsUrl: gmaps("Varaha Cave Mahabalipuram") },
  { slug: "sculpture-museum-mb", name: "Mahabalipuram Sculpture Museum", city: "mahabalipuram", category: "underrated", shortDesc: "Open workshop where modern stone-carvers work", description: "Walk past hundreds of artists chiseling granite into temple statues for buyers worldwide. Many will let you watch and explain their tools.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 30, hotels: [{ name: "Beach Heritage Mahabalipuram", pricePerNight: 3600, rating: 4.2 }], mapsUrl: gmaps("Mahabalipuram Sculpture Museum") },

  // YERCAUD
  { slug: "yercaud-lake", name: "Emerald Lake (Yercaud Lake)", city: "yercaud", category: "popular", shortDesc: "Heart-shaped lake at the centre of town", description: "A small but lovely lake where you can boat, walk, or just buy roasted corn from the stalls. Mist often hangs over it in early morning.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Oct–Jun", entryFee: 10, hotels: [{ name: "GRT Nature Trails Sterling", pricePerNight: 5800, rating: 4.4 }, { name: "Hotel Shevaroys", pricePerNight: 2600, rating: 4.0 }], mapsUrl: gmaps("Yercaud Lake") },
  { slug: "pagoda-point", name: "Pagoda Point", city: "yercaud", category: "popular", shortDesc: "Sunset viewpoint with stone cairns", description: "On a clear evening you can see the plains of Salem 1,500 m below. Locals build stone pagodas here as wishes — add yours to the collection.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "The Grange Resort", pricePerNight: 4400, rating: 4.3 }], mapsUrl: gmaps("Pagoda Point Yercaud") },
  { slug: "lady-seat", name: "Lady's Seat & Gent's Seat", city: "yercaud", category: "popular", shortDesc: "Twin viewpoints with telescope view of Salem", description: "A natural rock formation arranged like a bench. Time your visit for sunset — the lights of Salem city come on just as the sky turns red.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Hotel Tamil Nadu Yercaud", pricePerNight: 2200, rating: 4.0 }], mapsUrl: gmaps("Ladys Seat Yercaud") },
  { slug: "shevaroyan-temple", name: "Shevaroyan Temple", city: "yercaud", category: "underrated", shortDesc: "Cave temple at the highest peak (5,326 ft)", description: "Climb to the highest point of the Shevaroy hills to a small tribal shrine inside a cave. The Malayali tribe holds a major festival here every May.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "May (festival), Year-round", entryFee: 0, hotels: [{ name: "Sterling Yercaud", pricePerNight: 5200, rating: 4.4 }], mapsUrl: gmaps("Shevaroyan Temple Yercaud") },
  { slug: "kiliyur-falls", name: "Kiliyur Falls", city: "yercaud", category: "underrated", shortDesc: "300-ft cascade reached by a forest trek", description: "A 3-km trek through coffee plantations brings you to the foot of this waterfall. Best after the monsoon when the flow is full.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Aug–Jan", entryFee: 30, hotels: [{ name: "Coffee County Resort", pricePerNight: 3600, rating: 4.3 }], mapsUrl: gmaps("Kiliyur Falls Yercaud") },
  { slug: "bear-cave", name: "Bear Cave", city: "yercaud", category: "underrated", shortDesc: "Granite cave once home to sloth bears", description: "Not far from Norton Bungalow. The deep cave is now empty of bears but the surrounding forest is wonderful for slow walks among orchids and ferns.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Norton Bungalow Heritage", pricePerNight: 4800, rating: 4.5 }], mapsUrl: gmaps("Bear Cave Yercaud") },
  { slug: "anna-park", name: "Anna Park & Orchidarium", city: "yercaud", category: "underrated", shortDesc: "Botanical garden with rare native orchids", description: "A small but well-maintained garden run by the Horticultural Department. Over 200 orchid species, including some endangered to the Shevaroys.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Apr–Jun, Sep–Oct", entryFee: 20, hotels: [{ name: "Yercaud Rock Perch", pricePerNight: 2900, rating: 4.2 }], mapsUrl: gmaps("Anna Park Yercaud") },

  // COIMBATORE
  { slug: "adiyogi-statue", name: "Adiyogi Shiva Statue", city: "coimbatore", category: "popular", shortDesc: "112-ft steel bust of Shiva at Isha Yoga Center", description: "Designed by Sadhguru and unveiled in 2017, the Adiyogi is the world's largest bust sculpture. The evening light show set to chants is a powerful experience.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Oct–Mar, evenings", entryFee: 0, hotels: [{ name: "Vivanta Coimbatore", pricePerNight: 7800, rating: 4.6 }, { name: "Isha Yoga Center Stay", pricePerNight: 2200, rating: 4.3 }], mapsUrl: gmaps("Adiyogi Shiva Statue Coimbatore") },
  { slug: "marudhamalai-temple", name: "Marudhamalai Hill Temple", city: "coimbatore", category: "popular", shortDesc: "Hilltop Murugan temple with herbal forests", description: "A 12th-century shrine atop a 500-ft hill on the city's western edge. The slopes are covered in marudham (Arjuna) trees with rare medicinal herbs.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Le Meridien Coimbatore", pricePerNight: 8400, rating: 4.5 }], mapsUrl: gmaps("Marudhamalai Temple Coimbatore") },
  { slug: "gedee-car-museum", name: "Gedee Car Museum", city: "coimbatore", category: "popular", shortDesc: "South India's only vintage and concept car museum", description: "Houses over 70 cars including Ford Model T, Fiat 500 Topolino, and the futuristic Stout Scarab. Run by the GD Naidu Charity Trust.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 100, hotels: [{ name: "The Residency Coimbatore", pricePerNight: 5400, rating: 4.4 }], mapsUrl: gmaps("Gedee Car Museum Coimbatore") },
  { slug: "siruvani-dam", name: "Siruvani Dam & Falls", city: "coimbatore", category: "underrated", shortDesc: "Source of the world's second-sweetest water", description: "37 km from the city in the Western Ghats. The dam supplies Coimbatore's famously sweet water; the nearby falls and tribal Irular hamlets feel a world away.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Aug–Feb", entryFee: 30, hotels: [{ name: "Siruvani Forest Lodge", pricePerNight: 1900, rating: 4.0 }], mapsUrl: gmaps("Siruvani Dam Coimbatore") },
  { slug: "baralikkadu", name: "Baralikkadu Eco-Tourism", city: "coimbatore", category: "underrated", shortDesc: "Coracle rides through bamboo-lined backwaters", description: "An eco-tourism initiative on the Bhavani river — coracle (parisal) rides, bamboo rafting, and dorm-style forest stays. Run by the local tribal community.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Sep–Mar", entryFee: 100, hotels: [{ name: "Baralikkadu Eco Cottage", pricePerNight: 2400, rating: 4.2 }], mapsUrl: gmaps("Baralikkadu Eco Tourism") },
  { slug: "kovai-kutralam", name: "Kovai Kutralam Falls", city: "coimbatore", category: "underrated", shortDesc: "Multi-tiered waterfall in the Siruvani forests", description: "A short trek inside the reserve forest brings you to a series of pools you can bathe in. Less crowded than its more famous namesake near Tirunelveli.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Aug–Jan", entryFee: 30, hotels: [{ name: "Western Ghats Stay", pricePerNight: 1700, rating: 4.0 }], mapsUrl: gmaps("Kovai Kutralam Falls") },
  { slug: "gass-forest-museum", name: "Gass Forest Museum", city: "coimbatore", category: "underrated", shortDesc: "Colonial-era forestry museum (1902)", description: "Inside the Forest College campus. Houses one of the largest collections of timber samples, taxidermied wildlife, and a 600-year-old teak slab from the Anaimalai forests.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Year-round", entryFee: 25, hotels: [{ name: "Hotel City Tower", pricePerNight: 2200, rating: 4.1 }], mapsUrl: gmaps("Gass Forest Museum Coimbatore") },

  // TIRUCHIRAPPALLI (TRICHY)
  { slug: "rockfort-temple", name: "Rockfort Temple", city: "tiruchirappalli", category: "popular", shortDesc: "Ucchi Pillayar shrine atop a 273-ft rock", description: "Climb 437 rock-cut steps to reach the cliffside Ganesha temple. The 360° view of Trichy, the Cauvery river, and Srirangam temple from the top is unforgettable.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Nov–Feb", entryFee: 5, hotels: [{ name: "Sangam Hotel Trichy", pricePerNight: 4800, rating: 4.4 }, { name: "Ramyas Hotel", pricePerNight: 3200, rating: 4.2 }], mapsUrl: gmaps("Rockfort Temple Trichy") },
  { slug: "srirangam-temple", name: "Sri Ranganathaswamy Temple, Srirangam", city: "tiruchirappalli", category: "popular", shortDesc: "Largest functioning Hindu temple in the world (156 acres)", description: "A self-contained temple-city with 7 concentric walls and 21 gopurams. The 236-ft Rajagopuram is the tallest temple tower in Asia. UNESCO recognized.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Dec–Jan (Vaikunta Ekadasi)", entryFee: 10, hotels: [{ name: "Femina Hotel", pricePerNight: 3600, rating: 4.3 }], mapsUrl: gmaps("Sri Ranganathaswamy Temple Srirangam") },
  { slug: "jambukeswarar-temple", name: "Jambukeswarar Temple, Thiruvanaikaval", city: "tiruchirappalli", category: "popular", shortDesc: "One of the five sacred Pancha Bhoota Stalas (Water)", description: "Dedicated to Shiva as the element of water — the sanctum has a perpetual underground spring. The 5-prakara complex contains over 1,000 pillars.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Hotel Royal Sathyam", pricePerNight: 2800, rating: 4.1 }], mapsUrl: gmaps("Jambukeswarar Temple Thiruvanaikaval") },
  { slug: "pachamalai-hills", name: "Pachamalai Hills", city: "tiruchirappalli", category: "underrated", shortDesc: "Untouched trekking range east of Trichy", description: "Home to the Malayali tribe, with waterfalls, banana groves, and viewpoints almost no tourists know. The Mannarai and Top Sengattupatti settlements welcome respectful visitors.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Sep–Feb", entryFee: 0, hotels: [{ name: "Pachamalai Forest Lodge", pricePerNight: 1900, rating: 4.0 }], mapsUrl: gmaps("Pachamalai Hills Trichy") },
  { slug: "puliyancholai-falls", name: "Puliyancholai Falls", city: "tiruchirappalli", category: "underrated", shortDesc: "Tamarind-grove waterfall on the Kollimalai foothills", description: "A series of clear pools fed by a spring inside a tamarind forest. Locals come for natural bathing — water is said to be medicinal due to herbs upstream.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Jul–Feb", entryFee: 25, hotels: [{ name: "Kollimalai Forest Stay", pricePerNight: 1800, rating: 4.0 }], mapsUrl: gmaps("Puliyancholai Falls Trichy") },
  { slug: "butterfly-park-trichy", name: "Butterfly Park (Tropical Butterfly Conservatory)", city: "tiruchirappalli", category: "underrated", shortDesc: "Asia's largest butterfly conservatory (27 acres)", description: "Inside a forest at Srirangam, this conservatory is home to over 100 butterfly species in walk-through enclosures. Surprisingly few visitors despite its scale.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Sep–Mar", entryFee: 50, hotels: [{ name: "Trichy Heritage Inn", pricePerNight: 2200, rating: 4.1 }], mapsUrl: gmaps("Butterfly Park Srirangam Trichy") },
  { slug: "st-lourdes-church", name: "St. Lourdes Church", city: "tiruchirappalli", category: "underrated", shortDesc: "French Gothic basilica (1840) modeled on Lourdes, France", description: "An exact replica of the basilica at Lourdes, with twin spires rising 200 ft. Pilgrims arrive year-round — the August feast draws thousands.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Year-round, Aug feast", entryFee: 0, hotels: [{ name: "Hotel Breeze Residency", pricePerNight: 2600, rating: 4.2 }], mapsUrl: gmaps("St Lourdes Church Trichy") },

  // TIRUNELVELI
  { slug: "nellaiappar-temple", name: "Nellaiappar Temple", city: "tirunelveli", category: "popular", shortDesc: "Twin temple with the famed musical pillars", description: "A 7th-century Shiva-Parvati temple covering 14 acres. Its mandapa contains 161 pillars carved from single granite blocks that produce different musical notes when struck.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Hotel Janakiram", pricePerNight: 3200, rating: 4.2 }, { name: "Aryaas Park Hotel", pricePerNight: 2400, rating: 4.0 }], mapsUrl: gmaps("Nellaiappar Temple Tirunelveli") },
  { slug: "papanasam-falls", name: "Papanasam Falls", city: "tirunelveli", category: "popular", shortDesc: "Sin-washing waterfall in the Agasthiyar Hills", description: "A sacred bathing waterfall on the Tamiraparani river. The name means 'destroyer of sins' — pilgrims and trekkers share the cold pools at the base.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Jul–Jan", entryFee: 25, hotels: [{ name: "Papanasam Forest Lodge", pricePerNight: 2100, rating: 4.1 }], mapsUrl: gmaps("Papanasam Falls Tirunelveli") },
  { slug: "courtallam-falls", name: "Courtallam Falls (Kutralam)", city: "tirunelveli", category: "popular", shortDesc: "Spa of the South — nine medicinal waterfalls", description: "A cluster of falls believed to flow over medicinal herbs. Main Falls, Five Falls, and Old Courtallam all reopen each monsoon to massive crowds.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Jun–Sep", entryFee: 30, hotels: [{ name: "Courtallam Heritage Resort", pricePerNight: 3800, rating: 4.3 }], mapsUrl: gmaps("Courtallam Falls Tirunelveli") },
  { slug: "manjolai-hills", name: "Manjolai Hills", city: "tirunelveli", category: "underrated", shortDesc: "Tea estate plateau called 'the Poor Man's Ooty'", description: "A drive up from Manimuthar dam climbs into mist and tea gardens at 3,500 ft. Three estate villages — Manjolai, Manimutharu, and Kuttiyar — feel time-frozen.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Oct–Mar", entryFee: 0, hotels: [{ name: "Manjolai Tea Estate Stay", pricePerNight: 2800, rating: 4.3 }], mapsUrl: gmaps("Manjolai Hills Tirunelveli") },
  { slug: "uvari-church", name: "Uvari Kappal Matha Church", city: "tirunelveli", category: "underrated", shortDesc: "Coastal church shaped like a ship (Kappal)", description: "Built in 1976 in the form of a wooden ship to commemorate Portuguese sailors saved from a storm in 1644 — they vowed to build a church if they survived.", image: img("photo-1582972236019-ea4af5ffe587"), bestTime: "Year-round, Aug feast", entryFee: 0, hotels: [{ name: "Uvari Beach Lodge", pricePerNight: 1800, rating: 4.0 }], mapsUrl: gmaps("Uvari Kappal Matha Church") },
  { slug: "koonthankulam-sanctuary", name: "Koonthankulam Bird Sanctuary", city: "tirunelveli", category: "underrated", shortDesc: "Largest reserve for migratory birds in South India", description: "Painted storks, white ibis, and pelicans nest in the village trees themselves — protected for generations by the Koonthankulam villagers as community guardians.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Dec–May", entryFee: 30, hotels: [{ name: "Koonthankulam Eco Stay", pricePerNight: 1600, rating: 4.0 }], mapsUrl: gmaps("Koonthankulam Bird Sanctuary") },
  { slug: "kalugumalai-temple", name: "Kalugumalai Rock-Cut Temple", city: "tirunelveli", category: "underrated", shortDesc: "8th-century unfinished monolithic temple", description: "An entire Pandya-era temple carved top-down from a single granite hill. Work was abandoned mid-way, freezing the construction process in stone — rare in India.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Nov–Feb", entryFee: 0, hotels: [{ name: "Kalugumalai Heritage Inn", pricePerNight: 1900, rating: 4.0 }], mapsUrl: gmaps("Kalugumalai Rock cut Temple") },

  // VELLORE
  { slug: "vellore-fort", name: "Vellore Fort", city: "vellore", category: "popular", shortDesc: "16th-century granite fortress with a wide moat", description: "Built by Vijayanagara kings, captured by the British, and home to India's first major rebellion against the Crown (1806). The Jalakandeswarar Temple sits inside.", image: img("photo-1582510003544-4d00b7f74220"), bestTime: "Nov–Feb", entryFee: 25, hotels: [{ name: "Hotel Darling Residency", pricePerNight: 4200, rating: 4.4 }, { name: "Hotel River View", pricePerNight: 2400, rating: 4.0 }], mapsUrl: gmaps("Vellore Fort") },
  { slug: "sripuram-golden-temple", name: "Sripuram Golden Temple", city: "vellore", category: "popular", shortDesc: "1,500 kg of pure gold sheeting", description: "Built in 2007 in the form of a star, this temple to Lakshmi Narayani is wrapped in hand-engraved gold foil. The illuminated path leading to it is a sight at dusk.", image: img("photo-1604423043492-41303b89ec79"), bestTime: "Nov–Feb, evenings", entryFee: 0, hotels: [{ name: "Fortune Park Vellore", pricePerNight: 5400, rating: 4.5 }], mapsUrl: gmaps("Sripuram Golden Temple Vellore") },
  { slug: "jalakandeswarar-temple", name: "Jalakandeswarar Temple", city: "vellore", category: "popular", shortDesc: "Vijayanagara-era temple inside Vellore Fort", description: "Once turned into an arsenal by Tipu Sultan, this 16th-century Shiva temple is famed for its delicately carved monolithic pillars and the surrounding water tank.", image: img("photo-1561361398-a8a86e93b990"), bestTime: "Year-round", entryFee: 0, hotels: [{ name: "Hotel Aaryaas", pricePerNight: 2600, rating: 4.1 }], mapsUrl: gmaps("Jalakandeswarar Temple Vellore") },
  { slug: "amirthi-zoo", name: "Amirthi Zoological Park", city: "vellore", category: "underrated", shortDesc: "Forest zoo with a stream and waterfall", description: "25 km from Vellore inside a reserve forest. A rare zoo where you walk along a stream past sambar, deer, and birds in semi-natural enclosures.", image: img("photo-1591018653069-c0d7c61c30b1"), bestTime: "Sep–Feb", entryFee: 50, hotels: [{ name: "Amirthi Forest Lodge", pricePerNight: 1700, rating: 4.0 }], mapsUrl: gmaps("Amirthi Zoological Park Vellore") },
  { slug: "vainu-bappu-observatory", name: "Vainu Bappu Observatory, Kavalur", city: "vellore", category: "underrated", shortDesc: "Asia's second-largest optical telescope (2.34 m)", description: "Operated by the Indian Institute of Astrophysics. Public visits are arranged on select Saturdays — a chance to look through one of the most powerful eyes in Asia.", image: img("photo-1582972236019-ea4af5ffe587"), bestTime: "Year-round (book ahead)", entryFee: 50, hotels: [{ name: "Kavalur Hill Stay", pricePerNight: 2200, rating: 4.2 }], mapsUrl: gmaps("Vainu Bappu Observatory Kavalur") },
  { slug: "palamathi-hills", name: "Palamathi Hills", city: "vellore", category: "underrated", shortDesc: "Trekking ridge overlooking Vellore city", description: "A 4-km moderate trek to the top reveals views over the fort and the Palar river plain. Best at dawn — the city wakes up under a thin mist.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Oct–Feb, dawn", entryFee: 0, hotels: [{ name: "Vellore Trekkers Stay", pricePerNight: 1500, rating: 3.9 }], mapsUrl: gmaps("Palamathi Hills Vellore") },
  { slug: "kaigal-falls", name: "Kaigal Falls", city: "vellore", category: "underrated", shortDesc: "Year-round waterfall on the AP–TN border", description: "A perennial 40-ft cascade in the Koundinya forest. Reached via a short walk from Palamaner road — quiet, swimmable, and locally called 'Dumukurallu'.", image: img("photo-1605649487212-47bdab064df7"), bestTime: "Year-round", entryFee: 20, hotels: [{ name: "Forest Edge Cottage", pricePerNight: 1900, rating: 4.0 }], mapsUrl: gmaps("Kaigal Falls Vellore") },
];

// ──────────────────────────────────────────────────────────────────────────
// Curated, place-specific images. Wikimedia Commons for landmarks (accurate),
// Unsplash for generic scenery (beaches/falls/hills) when no free landmark
// photo exists. Each URL is a direct image (jpg/png) and CORS-safe.
// ──────────────────────────────────────────────────────────────────────────
const wm = (file: string, w = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;

const PLACE_IMAGES: Record<string, string> = {
  // CHENNAI
  "marina-beach": wm("Marina Beach Chennai (October 2019).jpg"),
  "kapaleeshwarar-temple": wm("Kapaleeshwarar Temple gopuram.jpg"),
  "fort-st-george": wm("Fort St. George, Chennai.jpg"),
  "dakshinachitra": wm("DakshinaChitra Heritage Museum.jpg"),
  "pulicat-lake": wm("Pulicat Lake Bird Sanctuary.jpg"),
  "cholamandal-village": wm("Cholamandal Artists Village entrance.jpg"),
  "broken-bridge": img("photo-1602002418082-a4443e081dd1"),

  // MADURAI
  "meenakshi-temple": wm("Madurai Meenakshi Temple Gopuram.jpg"),
  "thirumalai-nayakkar-palace": wm("Thirumalai Nayakkar Mahal Madurai.jpg"),
  "gandhi-museum-madurai": wm("Gandhi Memorial Museum, Madurai.jpg"),
  "samanar-hills": wm("Samanar Hills Madurai.jpg"),
  "athisayam": wm("Vaigai Dam.jpg"),
  "thiruparankundram": wm("Thiruparankundram Murugan Temple.jpg"),
  "alagar-koil": wm("Azhagar Kovil Madurai.jpg"),

  // KANYAKUMARI
  "vivekananda-rock": wm("Vivekananda Rock Memorial Kanyakumari.jpg"),
  "sunset-point-kk": wm("Kanyakumari Sunset.jpg"),
  "thiruvalluvar-statue": wm("Thiruvalluvar Statue Kanyakumari.jpg"),
  "thirparappu-falls": wm("Thirparappu Falls.jpg"),
  "padmanabhapuram-palace": wm("Padmanabhapuram Palace.jpg"),
  "chitharal-jain-temple": wm("Chitharal Jain Monuments.jpg"),
  "muttom-beach": wm("Muttom Lighthouse.jpg"),

  // OOTY
  "ooty-lake": wm("Ooty Lake (1).jpg"),
  "doddabetta-peak": wm("Doddabetta peak Ooty.jpg"),
  "nilgiri-mountain-railway": wm("Nilgiri Mountain Railway 06.jpg"),
  "avalanche-lake": wm("Avalanche Lake Ooty.jpg"),
  "pykara-falls": wm("Pykara Falls Ooty.jpg"),
  "emerald-lake": wm("Emerald Lake Ooty.jpg"),
  "kalhatti-falls": wm("Kalhatti Falls.jpg"),

  // KODAIKANAL
  "kodai-lake": wm("Kodaikanal Lake View.jpg"),
  "coakers-walk": wm("Coakers Walk Kodaikanal.jpg"),
  "bryant-park": wm("Bryant Park Kodaikanal.jpg"),
  "dolphin-nose": wm("Dolphins Nose Kodaikanal.jpg"),
  "pillar-rocks": wm("Pillar Rocks, Kodaikanal.jpg"),
  "berijam-lake": wm("Berijam Lake Kodaikanal.jpg"),
  "mannavanur": img("photo-1500382017468-9049fed747ef"),

  // THANJAVUR
  "brihadeeswarar-temple": wm("Brihadeeswara Temple 12.jpg"),
  "thanjavur-palace": wm("Thanjavur Maratha Palace.jpg"),
  "art-gallery-thanjavur": wm("Nataraja Chola Bronze.jpg"),
  "gangaikondacholapuram": wm("Gangaikonda Cholapuram Temple.jpg"),
  "darasuram-temple": wm("Airavatesvara Temple, Darasuram.jpg"),
  "thiruvaiyaru": wm("Thyagaraja Aradhana Thiruvaiyaru.jpg"),
  "thanjavur-painting-village": wm("Tanjore Painting of Krishna.jpg"),

  // RAMESHWARAM
  "ramanathaswamy-temple": wm("Ramanathaswamy Temple Corridor.jpg"),
  "pamban-bridge": wm("Pamban Bridge Rameswaram.jpg"),
  "dhanushkodi-popular": wm("Dhanushkodi Beach.jpg"),
  "kothandaramaswamy-temple": wm("Kothandaramaswamy Temple Rameswaram.jpg"),
  "agni-theertham": wm("Agni Theertham Rameshwaram.jpg"),
  "abdul-kalam-memorial": wm("APJ Abdul Kalam Memorial Rameswaram.jpg"),
  "olaikuda-beach": img("photo-1507525428034-b723cf961d3e"),

  // PONDICHERRY
  "promenade-beach": wm("Promenade Beach Pondicherry.jpg"),
  "auroville": wm("Matrimandir Auroville.jpg"),
  "french-quarter": wm("White Town Pondicherry.jpg"),
  "paradise-beach": wm("Paradise Beach Pondicherry.jpg"),
  "arikamedu": wm("Arikamedu Pondicherry.jpg"),
  "serenity-beach": img("photo-1519046904884-53103b34b206"),
  "bharathi-park": wm("Aayi Mandapam Pondicherry.jpg"),

  // MAHABALIPURAM
  "shore-temple": wm("Shore Temple Mahabalipuram.jpg"),
  "pancha-rathas": wm("Pancha Rathas Mahabalipuram.jpg"),
  "arjuna-penance": wm("Descent of the Ganges Mahabalipuram.jpg"),
  "krishnas-butter-ball": wm("Krishna's Butter Ball, Mahabalipuram.jpg"),
  "tiger-cave": wm("Tiger Cave Mahabalipuram.jpg"),
  "varaha-cave": wm("Varaha Cave Temple Mahabalipuram.jpg"),
  "sculpture-museum-mb": wm("Mahabalipuram stone carving.jpg"),

  // YERCAUD
  "yercaud-lake": wm("Yercaud Lake.jpg"),
  "pagoda-point": wm("Pagoda Point Yercaud.jpg"),
  "lady-seat": wm("Lady's Seat Yercaud.jpg"),
  "shevaroyan-temple": wm("Shevaroyan Temple Yercaud.jpg"),
  "kiliyur-falls": wm("Kiliyur Falls Yercaud.jpg"),
  "bear-cave": img("photo-1448375240586-882707db888b"),
  "anna-park": wm("Anna Park Yercaud.jpg"),

  // COIMBATORE
  "adiyogi-statue": wm("Adiyogi Shiva statue.jpg"),
  "marudhamalai-temple": wm("Marudhamalai Murugan Temple.jpg"),
  "gedee-car-museum": img("photo-1492144534655-ae79c964c9d7"),
  "siruvani-dam": wm("Siruvani Dam.jpg"),
  "baralikkadu": wm("Coracle Bhavani.jpg"),
  "kovai-kutralam": img("photo-1432405972618-c60b0225b8f9"),
  "gass-forest-museum": img("photo-1564399579883-451a5d44ec08"),

  // TIRUCHIRAPPALLI
  "rockfort-temple": wm("Rockfort Temple Trichy.jpg"),
  "srirangam-temple": wm("Sri Ranganathaswamy Temple Srirangam.jpg"),
  "jambukeswarar-temple": wm("Jambukeswarar Temple Thiruvanaikaval.jpg"),
  "pachamalai-hills": img("photo-1464822759023-fed622ff2c3b"),
  "puliyancholai-falls": img("photo-1468581264429-2548ef9eb732"),
  "butterfly-park-trichy": img("photo-1559131325-eee9d3d0c3f9"),
  "st-lourdes-church": wm("St Lourdes Church Trichy.jpg"),

  // TIRUNELVELI
  "nellaiappar-temple": wm("Nellaiappar Temple Tirunelveli.jpg"),
  "papanasam-falls": wm("Papanasam Falls Tirunelveli.jpg"),
  "courtallam-falls": wm("Courtallam Main Falls.jpg"),
  "manjolai-hills": img("photo-1470770841072-f978cf4d019e"),
  "uvari-church": wm("Uvari Church Tirunelveli.jpg"),
  "koonthankulam-sanctuary": img("photo-1471201892039-d0fdb191d44c"),
  "kalugumalai-temple": wm("Kalugumalai Jain Beds.jpg"),

  // VELLORE
  "vellore-fort": wm("Vellore Fort entrance.jpg"),
  "sripuram-golden-temple": wm("Sripuram Golden Temple Vellore.jpg"),
  "jalakandeswarar-temple": wm("Jalakandeswarar Temple Vellore.jpg"),
  "amirthi-zoo": img("photo-1474511320723-9a56873867b5"),
  "vainu-bappu-observatory": img("photo-1419242902214-272b3f66ee7a"),
  "palamathi-hills": img("photo-1454496522488-7a8e488e8606"),
  "kaigal-falls": img("photo-1437482078695-73f5ca6c96e2"),
};

const CITY_IMAGES: Record<string, string> = {
  chennai: wm("Marina Beach Chennai (October 2019).jpg"),
  madurai: wm("Madurai Meenakshi Temple Gopuram.jpg"),
  kanyakumari: wm("Vivekananda Rock Memorial Kanyakumari.jpg"),
  ooty: wm("Nilgiri Mountain Railway 06.jpg"),
  kodaikanal: wm("Kodaikanal Lake View.jpg"),
  thanjavur: wm("Brihadeeswara Temple 12.jpg"),
  rameshwaram: wm("Pamban Bridge Rameswaram.jpg"),
  pondicherry: wm("White Town Pondicherry.jpg"),
  mahabalipuram: wm("Shore Temple Mahabalipuram.jpg"),
  yercaud: wm("Yercaud Lake.jpg"),
  coimbatore: wm("Adiyogi Shiva statue.jpg"),
  tiruchirappalli: wm("Rockfort Temple Trichy.jpg"),
  tirunelveli: wm("Courtallam Main Falls.jpg"),
  vellore: wm("Sripuram Golden Temple Vellore.jpg"),
};

// Apply overrides at module load
for (const p of places) {
  if (PLACE_IMAGES[p.slug]) p.image = PLACE_IMAGES[p.slug];
}
for (const c of cities) {
  if (CITY_IMAGES[c.slug]) c.image = CITY_IMAGES[c.slug];
}

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
export const getPlace = (slug: string) => places.find((p) => p.slug === slug);
export const getPlacesByCity = (citySlug: string) => places.filter((p) => p.city === citySlug);
export const formatINR = (amount: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

// All hotels/lodges in a city, deduped by name and sorted by rating desc
export interface CityHotel extends Hotel { placeName: string; placeSlug: string; }
export const getHotelsByCity = (citySlug: string): CityHotel[] => {
  const seen = new Set<string>();
  const out: CityHotel[] = [];
  for (const p of places) {
    if (p.city !== citySlug) continue;
    for (const h of p.hotels) {
      if (seen.has(h.name)) continue;
      seen.add(h.name);
      out.push({ ...h, placeName: p.name, placeSlug: p.slug });
    }
  }
  return out.sort((a, b) => b.rating - a.rating);
};

// Generate deterministic bus options for a from→to pair sorted by price asc
export interface BusOption {
  id: string;
  operator: string;
  type: string; // Sleeper / Seater / Volvo AC etc.
  departure: string;
  arrival: string;
  duration: string;
  pricePerSeat: number;
  rating: number;
  seatsLeft: number;
}
const OPERATORS = [
  { name: "KPN Travels", type: "Volvo AC Sleeper", base: 1.0 },
  { name: "SETC Tamil Nadu", type: "Govt. Express", base: 0.55 },
  { name: "Parveen Travels", type: "AC Semi-Sleeper", base: 0.85 },
  { name: "SRM Transports", type: "Non-AC Sleeper", base: 0.75 },
  { name: "ARS Travels", type: "AC Seater", base: 0.7 },
  { name: "YBM Travels", type: "Non-AC Seater", base: 0.5 },
  { name: "Universal Travels", type: "Volvo Multi-Axle", base: 1.1 },
  { name: "National Travels", type: "AC Sleeper", base: 0.9 },
];
const TIMES = [
  { dep: "06:30", arr: "12:00", dur: "5h 30m" },
  { dep: "08:45", arr: "15:30", dur: "6h 45m" },
  { dep: "10:15", arr: "17:00", dur: "6h 45m" },
  { dep: "13:00", arr: "19:30", dur: "6h 30m" },
  { dep: "15:30", arr: "22:00", dur: "6h 30m" },
  { dep: "19:00", arr: "01:30", dur: "6h 30m" },
  { dep: "21:15", arr: "04:45", dur: "7h 30m" },
  { dep: "23:30", arr: "06:00", dur: "6h 30m" },
];
// Approx fare map per pair using city distance buckets (₹/km baseline ~3)
const cityKm = (a: string, b: string): number => {
  // Rough static distances between TN cities — keeps prices consistent
  const k = [a, b].sort().join("|");
  const m: Record<string, number> = {
    "chennai|madurai": 460, "chennai|kanyakumari": 700, "chennai|ooty": 555,
    "chennai|kodaikanal": 525, "chennai|thanjavur": 350, "chennai|rameshwaram": 570,
    "chennai|pondicherry": 160, "chennai|mahabalipuram": 60, "chennai|yercaud": 360,
    "kanyakumari|madurai": 250, "madurai|ooty": 290, "kodaikanal|madurai": 120,
    "madurai|thanjavur": 190, "madurai|rameshwaram": 175, "madurai|pondicherry": 330,
    "kodaikanal|ooty": 250, "ooty|thanjavur": 480, "pondicherry|thanjavur": 195,
    "mahabalipuram|pondicherry": 95, "rameshwaram|thanjavur": 240, "yercaud|chennai": 360,
    // Coimbatore
    "chennai|coimbatore": 500, "coimbatore|madurai": 215, "coimbatore|ooty": 85,
    "coimbatore|kodaikanal": 170, "coimbatore|thanjavur": 290, "coimbatore|kanyakumari": 460,
    "coimbatore|rameshwaram": 380, "coimbatore|pondicherry": 410, "coimbatore|yercaud": 200,
    // Tiruchirappalli (Trichy)
    "chennai|tiruchirappalli": 320, "tiruchirappalli|madurai": 145, "tiruchirappalli|thanjavur": 55,
    "tiruchirappalli|coimbatore": 210, "tiruchirappalli|ooty": 290, "tiruchirappalli|kodaikanal": 180,
    "tiruchirappalli|rameshwaram": 240, "tiruchirappalli|kanyakumari": 380, "tiruchirappalli|pondicherry": 195,
    "tiruchirappalli|yercaud": 145,
    // Tirunelveli
    "chennai|tirunelveli": 615, "madurai|tirunelveli": 160, "tirunelveli|kanyakumari": 90,
    "tirunelveli|rameshwaram": 230, "tirunelveli|thanjavur": 305, "tirunelveli|coimbatore": 365,
    "tirunelveli|tiruchirappalli": 290, "tirunelveli|ooty": 460, "tirunelveli|kodaikanal": 230,
    "tirunelveli|pondicherry": 490,
    // Vellore
    "chennai|vellore": 140, "vellore|madurai": 415, "vellore|thanjavur": 320,
    "vellore|coimbatore": 380, "vellore|tiruchirappalli": 240, "vellore|pondicherry": 175,
    "vellore|mahabalipuram": 175, "vellore|yercaud": 220, "vellore|tirunelveli": 545,
    "vellore|kanyakumari": 645, "vellore|rameshwaram": 500, "vellore|ooty": 450,
    "vellore|kodaikanal": 390,
  };
  return m[k] ?? 300;
};
export const getBusOptions = (from: string, to: string): BusOption[] => {
  if (!from || !to || from === to) return [];
  const km = cityKm(from, to);
  const list: BusOption[] = OPERATORS.map((op, i) => {
    const t = TIMES[i % TIMES.length];
    const price = Math.round((km * 2.2 * op.base) / 10) * 10; // round to ₹10
    return {
      id: `${from}-${to}-${i}`,
      operator: op.name,
      type: op.type,
      departure: t.dep,
      arrival: t.arr,
      duration: t.dur,
      pricePerSeat: price,
      rating: Math.round((3.8 + ((i * 17) % 10) / 10) * 10) / 10, // 3.8–4.7
      seatsLeft: 4 + ((i * 7) % 30),
    };
  });
  return list.sort((a, b) => a.pricePerSeat - b.pricePerSeat);
};
