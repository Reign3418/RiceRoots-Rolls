// ============================================================================
// RICE, ROOTS & ROLLS — AN ASIAN KITCHEN (100% VERIFIED LIVE MENU & STORY DATA)
// 1124 N Bragg Blvd, Spring Lake, NC 28390 • (910) 920-1159
// ============================================================================

export const BUSINESS_INFO = {
  name: "Rice, Roots & Rolls",
  subtitle: "An Asian Kitchen",
  tagline: "Fresh Ingredients, Family Recipes",
  heroDescription: "From timeless Chinese dishes to vibrant Southeast Asian specialties and hand-rolled sushi, every plate at Rice, Roots & Rolls is crafted to bring people together.",
  owner: "Chef A (Leakhena Ouk-Hester)",
  originStoryShort: "Born in a little red food truck called Far East Foodie in Lander, Wyoming — now planting deep family roots at 1124 N Bragg Blvd in Spring Lake, NC.",
  address: "1124 N Bragg Blvd, Spring Lake, NC 28390",
  streetAddress: "1124 N Bragg Blvd",
  cityStateZip: "Spring Lake, NC 28390",
  phone: "(910) 920-1159",
  phoneRaw: "9109201159",
  email: "fareastfoodiewy@gmail.com",
  coordinates: {
    lat: 35.1776006,
    lng: -78.9795992
  },
  googleMapsShortUrl: "https://maps.app.goo.gl/CQzkFrkVHxttnsVk6",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=35.1776006,-78.9795992&destination_place_id=ChIJQziVZmZp64kRN8Km6I6WwkE",
  appleMapsUrl: "https://maps.apple.com/?daddr=1124+N+Bragg+Blvd,+Spring+Lake,+NC+28390&dirflg=d",
  wazeUrl: "https://waze.com/ul?ll=35.1776006,-78.9795992&navigate=yes",
  facebookUrl: "https://www.facebook.com/profile.php?id=61586228547840",
  instagramUrl: "https://www.instagram.com/ricerootsrolls/",
  hoursSchedule: [
    { days: "Monday – Thursday", hours: "11:00 AM – 8:00 PM", open24: "11:00", close24: "20:00" },
    { days: "Friday – Saturday", hours: "11:00 AM – 8:30 PM", open24: "11:00", close24: "20:30" },
    { days: "Sunday", hours: "CLOSED (Family Day)", open24: null, close24: null }
  ],
  wayfindingLandmarks: [
    {
      direction: "Heading North on N Bragg Blvd (From Fort Bragg / Fayetteville)",
      cue: "Pass Odell Rd & Main St in Spring Lake. Keep in the right lane approaching the 1100 block of N Bragg Blvd — look for our brick-and-mortar storefront on the right before NC-210 / Lillington Hwy merges."
    },
    {
      direction: "Heading South on N Bragg Blvd / NC-87 (From Sanford / Spout Springs)",
      cue: "Driving south into Spring Lake past Bethel Baptist Rd, prepare to slow down entering the 1100 block commercial corridor — we are at 1124 N Bragg Blvd with dedicated front parking."
    },
    {
      direction: "5 Minutes from Fort Bragg Gates",
      cue: "Fast lunch & dinner turnaround for soldiers, civilian personnel, and families commuting along the Bragg Blvd / Hwy 87 corridor."
    }
  ]
};

export const MEANING_PILLARS = [
  {
    id: "rice",
    title: "RICE",
    subtitle: "Our Foundation & Heritage",
    image: "./images/story-rice.jpg",
    quote: "Rice isn't just food... it's everything. It's what my grandparents grew, what our parents cooked, and what brings us back home no matter how far we go. In many Asian homes, a meal isn't complete without rice. It's comfort, culture, and connection all in one bowl. From simple steamed rice to noodles, soups, and family recipes passed down for generations... this is our foundation. Every grain tells a story."
  },
  {
    id: "roots",
    title: "ROOTS",
    subtitle: "Generations of Khmer Recipes",
    image: "./images/story-roots.jpg",
    quote: "Serving food from generations of recipes, flavors I grew up on, and dishes that shaped who I am. No matter what cuisine I cook, it always comes back to recipes passed down from family and friends. This is more than food — it's my story, my upbringing, and everything that molded me, shared with you."
  },
  {
    id: "rolls",
    title: "ROLLS",
    subtitle: "For My Boys & Family Table",
    image: "./images/story-rolls-son.jpg",
    quote: "For a sweet little foodie who swears his momma's sushi rolls are the best. Made with love, just the way he likes them — and crafted fresh to order for every family that walks through our doors in Spring Lake."
  }
];

export const CHEF_STORY_PARAGRAPHS = [
  "Welcome to Rice, Roots & Rolls — where family tradition, bold Asian flavors, and heartfelt hospitality come together.",
  "For Chef A, cooking has always been more than a profession — it's a way of life. Growing up surrounded by the rich aromas of traditional Asian kitchens, she learned early on that the best meals are made from scratch, using fresh ingredients, time-honored techniques, and a whole lot of love. Those early moments cooking alongside family planted the roots for everything you taste on our menu today.",
  "Our journey began in Lander, Wyoming with a little red food truck called Far East Foodie and a big dream: to share authentic Cambodian and Asian comfort food with our community. What started on wheels quickly grew into a local favorite, fueled by loyal guests who became like family.",
  "Now, we're proud to plant new roots right here at 1124 N Bragg Blvd in Spring Lake, North Carolina — balancing a 45-minute daily commute with raising two wonderful young boys while bringing those same beloved family recipes, fresh hand-rolled sushi, and warm community spirit to a table near you. Every dish tells a piece of our story — and we're honored to share it with you."
];

// Featured Signature Spotlight Dishes (Editable in Chef A's Pocket Admin)
export const INITIAL_SPECIALS = [
  {
    id: "spec_kathiew",
    title: "Kathiew (Authentic Cambodian Pho)",
    price: "$15.95",
    singlePrice: 15.95,
    description: "Our signature slow-simmered aromatic Khmer bone broth with tender rice noodles, fresh herbs, thin-sliced beef, plump shrimp, and house meatballs.",
    badge: "Cambodian Signature",
    image: "./images/hero-khmer-beef.png",
    source: "Southeast Specials",
    inStock: true,
    hidden: false,
    isSushi: false,
    isWok: true
  },
  {
    id: "spec_crudo",
    title: "Khmer Crudo (Fresh Salmon Sashimi)",
    price: "$13.50",
    singlePrice: 13.50,
    description: "Silky sashimi-grade salmon topped with Chef A's signature mortar-and-pestled Cambodian garlic chili sauce and crisp herbs.",
    badge: "Chef A Creation",
    image: "./images/khmer-crudo.jpg",
    source: "Sushi Starters",
    inStock: true,
    hidden: false,
    isSushi: true,
    isWok: false
  },
  {
    id: "spec_cowboy",
    title: "The Wyoming Cowboy Roll",
    price: "$15.95",
    singlePrice: 15.95,
    description: "A tribute to our Lander, WY roots: tender stir-fried ribeye rolled with green onions, crisp asparagus, lettuce, chili pepper & house yum yum drizzle.",
    badge: "Lander WY Tribute",
    image: "./images/specialty-sushi-closeup.jpg",
    source: "Squad Leader Sushi",
    inStock: true,
    hidden: false,
    isSushi: true,
    isWok: true
  },
  {
    id: "spec_baisaik",
    title: "Bai Saik Chruk (Khmer Char-Grilled Pork)",
    price: "$15.95",
    singlePrice: 15.95,
    description: "Marinated Khmer-style pork char-grilled to caramelized perfection, served with house-pickled daikon & carrot, crisp cucumber, and famous Koh Kong dipping sauce.",
    badge: "5-Star Favorite",
    image: "./images/hero-khmer-beef.png",
    source: "Southeast Specials",
    inStock: true,
    hidden: false,
    isSushi: false,
    isWok: true
  }
];

export const MAIN_MENU = {
  southeastSpecials: {
    categoryName: "Southeast Asian & Khmer Specials",
    tagline: "Authentic Cambodian family recipes crafted with fresh herbs, kreung & house Koh Kong sauce",
    note: "Prepared fresh to order from generations of Chef A's family recipes.",
    items: [
      {
        id: "se_kathiew",
        name: "Kathiew (Cambodian Pho)",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Rich aromatic broth, rice noodles, fresh herbs with thin sliced beef, shrimp, and house meatballs.",
        badge: "House Signature",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "se_meekong",
        name: "Meekong River Noodles",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Stir-fried noodles with peppers, tomato, mushrooms & sweet basil tossed in our house sauce with choice of chicken, beef, or pork.",
        extraOption: "Substitute or Add Shrimp +$2.00",
        badge: "Wok Fired",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "se_noodle_bowl",
        name: "Chicken or Pork Noodle Bowl",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Fresh herbs, house-pickled veggies, mixed lettuce, and vermicelli rice noodles topped with Cambodian Vinaigrette, chopped Khmer egg roll, and crushed peanuts.",
        badge: "Fresh & Bright",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "se_bai_saik_chruk",
        name: "Bai Saik Chruk (Grilled Pork)",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Marinated Khmer-style pork, char-grilled and served over steamed jasmine rice with pickled daikon & carrot, cucumber, and a side of zesty Koh Kong sauce.",
        badge: "Cambodian Classic",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "se_bai_saik_maon",
        name: "Bai Saik Maon (Grilled Chicken Thigh)",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Marinated Khmer-style juicy chicken thigh, char-grilled and served with pickled daikon & carrot, cucumber, and a side of Koh Kong sauce.",
        badge: "Char-Grilled",
        inStock: true,
        hidden: false,
        isWok: true
      }
    ]
  },

  chefsSpecials: {
    categoryName: "Chef's Traditional Khmer Specials",
    tagline: "Served with warm steamed jasmine rice • Time-honored Cambodian comfort dishes",
    note: "Traditional slow-simmered curries, whole crispy fish, and authentic kreung sour soup.",
    items: [
      {
        id: "chef_curry",
        name: "Cambodian Country Curry",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Slow-simmered aromatic Cambodian curry with tender potatoes, carrots, and onions. Choice of chicken, pork, or shrimp served with steamed rice.",
        badge: "Family Recipe",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "chef_trey_chein",
        name: "Trey Chein (Whole Fried Tilapia)",
        price: "$24.95",
        numericPrice: 24.95,
        description: "Crispy golden fried whole tilapia served with bright Cambodian Vinaigrette on a fresh bed of sliced tomatoes and onions.",
        badge: "Showstopper",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "chef_somlah_machu",
        name: "Somlah Machu (Cambodian Beef Sour Soup)",
        price: "$17.95",
        numericPrice: 17.95,
        description: "Traditional Cambodian beef sour soup simmered with crisp celery, crunchy eggplant, and deep aromatic flavors of house-pounded lemongrass kreung.",
        badge: "Authentic Khmer",
        inStock: true,
        hidden: false,
        isWok: true
      }
    ]
  },

  squadLeaderSushi: {
    categoryName: "Squad Leader Specialty Sushi Rolls",
    tagline: "Hand-rolled to order • Honoring our Fort Bragg & Spring Lake community and Lander, WY roots",
    note: "Each specialty roll is hand-crafted to order at our sushi bar.",
    items: [
      {
        id: "sq_zero_dark",
        name: "Zero Dark Thirty",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Crispy tempura shrimp, cucumber, and creamy avocado topped with rich BBQ eel, house eel sauce, and tobiko.",
        badge: "Fort Bragg Favorite",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "sq_dreadnought",
        name: "The Dreadnought",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Spicy tuna, crispy shrimp tempura, and avocado topped with fresh salmon, spicy mayo, and sweet eel drizzle.",
        badge: "Chef's Pick",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "sq_afterburner",
        name: "The Afterburner",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Shrimp tempura, kani crab, and cucumber topped with spicy tuna and fresh jalapeño, then flame-torched for maximum heat.",
        badge: "🔥 Flame Torched",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "sq_stealth_burner",
        name: "The Stealth Burner",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Fresh salmon, tuna, jalapeño, a hidden chili pepper, and our habanero chili oil topped with spicy tuna, jalapeño slices, and tobiko — then flame-torched.",
        badge: "🌶️ Extreme Heat",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "sq_wilmington_wave",
        name: "Wilmington Wave",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Fresh salmon, ruby tuna, crispy shrimp tempura, cucumber, and avocado topped with bright thin lemon slices.",
        badge: "Coastal Fresh",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "sq_wyoming_cowboy",
        name: "The Wyoming Cowboy",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Stir-fried ribeye steak rolled with green onions, crisp asparagus, and lettuce, finished with a sprinkle of chili pepper and house yum yum sauce.",
        badge: "Cooked Steak Roll",
        inStock: true,
        hidden: false,
        isSushi: true
      }
    ]
  },

  sushiStartersAndStandard: {
    categoryName: "Sushi Starters & Standard Issue Rolls",
    tagline: "Sashimi crudo starters and classic hand-rolled maki (" + '"For a sweet little foodie who swears his momma\'s rolls are the best"' + ")",
    note: "Perfect for lunch combos, sharing at the table, or introducing young foodies to sushi.",
    items: [
      {
        id: "su_nachos",
        name: "Sushi Nachos (Starter)",
        price: "$15.50",
        numericPrice: 15.50,
        description: "Diced sashimi tuna and salmon tossed with yuzu soy, house yum yum, spicy mayo, and savory furikake over crispy wonton chips.",
        badge: "Crowd Pleaser",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_khmer_crudo",
        name: "Khmer Crudo (Starter)",
        price: "$13.50",
        numericPrice: 13.50,
        description: "Fresh sliced salmon sashimi topped with our mortar-and-pestled Cambodian garlic chili sauce and herbs.",
        badge: "Khmer Fusion",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_tuna_salmon_jalapeno",
        name: "Tuna or Salmon Jalapeño (Starter)",
        price: "$13.50",
        numericPrice: 13.50,
        description: "Chilled sashimi slices dressed in bright citrus yuzu soy and topped with crisp jalapeño.",
        badge: "Sushi Starter",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_flak_jacket",
        name: "Flak Jacket Roll",
        price: "$9.75",
        numericPrice: 9.75,
        description: "Crispy shrimp tempura, cucumber, and avocado finished with sweet eel sauce and crunchy golden panko.",
        badge: "Crunchy Roll",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_salmon_lover",
        name: "Salmon Lover Roll",
        price: "$9.75",
        numericPrice: 9.75,
        description: "Spicy salmon and crisp cucumber inside, draped with fresh salmon on top and spicy mayo.",
        badge: "Salmon Favorite",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_rainbow",
        name: "Rainbow Roll",
        price: "$8.50",
        numericPrice: 8.50,
        description: "Classic California base topped with colourful slices of fresh tuna, salmon, shrimp, and avocado.",
        badge: "Classic",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_eel_avocado",
        name: "Eel Avocado Roll",
        price: "$8.50",
        numericPrice: 8.50,
        description: "Warm roast BBQ eel and creamy avocado rolled with seasoned sushi rice and nori.",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_california",
        name: "California Roll",
        price: "$8.00",
        numericPrice: 8.00,
        description: "Kani crab, creamy avocado, and crisp cucumber topped with toasted sesame seeds.",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_philadelphia",
        name: "Philadelphia Roll",
        price: "$8.00",
        numericPrice: 8.00,
        description: "Fresh salmon, rich cream cheese, and crisp cucumber.",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_spicy_tuna",
        name: "Spicy Tuna Roll",
        price: "$8.00",
        numericPrice: 8.00,
        description: "Seasoned spicy sashimi tuna rolled with sushi rice and nori.",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_spicy_salmon",
        name: "Spicy Salmon Roll",
        price: "$8.00",
        numericPrice: 8.00,
        description: "Fresh chopped salmon tossed in house spicy seasoning.",
        inStock: true,
        hidden: false,
        isSushi: true
      },
      {
        id: "su_classic_maki",
        name: "Salmon, Tuna, Eel, or Crab Roll",
        price: "$7.85",
        numericPrice: 7.85,
        description: "Your choice of classic single-protein Standard Issue Roll: Salmon ($7.85), Tuna ($7.85), BBQ Eel ($7.85), or Kani Crab ($7.85).",
        extraOption: "Specify Salmon, Tuna, Eel, or Crab",
        inStock: true,
        hidden: false,
        isSushi: true
      }
    ]
  },

  chineseSpecials: {
    categoryName: "Timeless Chinese Specials",
    tagline: "Wok-seared comfort classics • All Chinese Specials served with steamed rice",
    note: "Crafted fresh in our wok with house-made sauces and crisp vegetables.",
    items: [
      {
        id: "ch_sweet_sour",
        name: "Sweet & Sour Chicken",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Lightly battered crispy chicken topped with our house-made sweet & sour sauce. Served with steamed rice.",
        badge: "House Sauce",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "ch_sesame",
        name: "Sesame Chicken",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Lightly battered chicken tossed in our sweet and savory sesame glaze with steamed broccoli and toasted sesame seeds. Served with rice.",
        badge: "Best Seller",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "ch_mandarin",
        name: "Mandarin Chicken",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Crispy chicken and mixed bell peppers wok-tossed in a bright sweet citrus glaze. Served with steamed rice.",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "ch_beef_broccoli",
        name: "Beef & Broccoli (or Chicken)",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Tender sliced beef (or chicken) wok-seared with fresh broccoli crowns in our rich savory brown sauce. Served with rice.",
        badge: "5-Star Reviewed",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "ch_combo_fried_rice",
        name: "Combination Fried Rice",
        price: "$15.95",
        numericPrice: 15.95,
        description: "Plump shrimp, tender chicken, beef, egg, carrots, and onions stir-fried to smoky wok perfection.",
        badge: "Loaded Wok Rice",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "ch_fried_rice",
        name: "House Fried Rice (Shrimp, Chicken, or Beef)",
        price: "$14.95",
        numericPrice: 14.95,
        description: "Choice of shrimp, chicken, or beef stir-fried with egg, diced carrots, and onions to perfection.",
        extraOption: "Choice of Shrimp, Chicken, or Beef",
        inStock: true,
        hidden: false,
        isWok: true
      }
    ]
  },

  appetizersAndDrinks: {
    categoryName: "Appetizers & Refreshing Drinks",
    tagline: "Hand-rolled Khmer egg rolls, golden tempura, pan-seared gyoza & cold beverages",
    note: "Start your meal with our scratch-made small plates.",
    items: [
      {
        id: "app_egg_rolls",
        name: "Khmer Pork Egg Rolls (2)",
        price: "$5.95",
        numericPrice: 5.95,
        description: "Two crispy hand-rolled Cambodian pork & vegetable egg rolls served with house dipping sauce.",
        badge: "Family Recipe",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "app_crab_rangoon",
        name: "Crab Rangoon (4)",
        price: "$8.95",
        numericPrice: 8.95,
        description: "Four golden crispy wontons filled with savory cream cheese and crab.",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "app_shrimp_tempura",
        name: "Shrimp Tempura (5)",
        price: "$8.95",
        numericPrice: 8.95,
        description: "Five jumbo shrimp lightly battered and fried to a delicate golden crunch.",
        badge: "Kid & Family Favorite",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "app_gyoza",
        name: "Chicken Gyoza (5)",
        price: "$6.75",
        numericPrice: 6.75,
        description: "Five pan-seared chicken dumplings served with savory dipping sauce — loved even by picky eaters!",
        badge: "Kids Love It",
        inStock: true,
        hidden: false,
        isWok: true
      },
      {
        id: "app_summer_rolls",
        name: "Summer Rolls (2) (Chicken)",
        price: "$8.00",
        numericPrice: 8.00,
        description: "Two chilled rice-paper rolls wrapped with tender chicken, crisp lettuce, fresh herbs, and vermicelli.",
        badge: "Fresh & Light",
        inStock: true,
        hidden: false,
        isWok: false
      },
      {
        id: "dr_fountain",
        name: "Fountain Drinks, Sweet Tea & Lemonade",
        price: "$2.75",
        numericPrice: 2.75,
        description: "Coke, Diet Coke, Coke Zero, Dr. Pepper, Sprite, Mountain Dew, Unsweet Iced Tea, Southern Sweet Tea, or Lemonade.",
        extraOption: "Specify beverage choice",
        inStock: true,
        hidden: false,
        isWok: false
      }
    ]
  }
};

export const CUSTOMER_REVIEWS = [
  {
    id: "rev_zedo",
    author: "Zedo F.",
    location: "Spring Lake, NC",
    date: "March 25, 2026",
    rating: 5,
    highlight: "Cambodian Pho, Hot & Sour Chicken & Pork Rice Plate",
    quote: "We were passing through Spring Lake during lunch, and saw a new sign up on the building. They had just opened for business this week. The food is INCREDIBLE. We ordered the Cambodian Pho, hot and sour chicken, and the pork rice plate. Service was amazing and inviting, and the interior was extremely clean. They really took care of us. This place is going to be our new spot."
  },
  {
    id: "rev_dustin",
    author: "Dustin S.",
    location: "Columbia, SC",
    date: "March 23, 2026",
    rating: 5,
    highlight: "Best Beef & Broccoli + Picky-Eater Approved Gyoza",
    quote: "Stopped by Rice Roots & Rolls today, and it was fantastic! I had the beef and broccoli, and it was the best! My son is a super picky eater, but he loved the Gyoza. The restaurant was extremely clean, and the staff was incredibly friendly. We can't wait to go back!"
  },
  {
    id: "rev_frank",
    author: "Frank R.",
    location: "Cary, NC",
    date: "March 25, 2026",
    rating: 5,
    highlight: "New Go-To Lunch Spot on N Bragg Blvd",
    quote: "The food was delicious. The restaurant was very clean. Staff was super friendly too. This spot is my new go to for lunch! Give it a try and this place will become your new favorite as well!"
  },
  {
    id: "rev_kd",
    author: "K D.",
    location: "Somerset, UK",
    date: "March 26, 2026",
    rating: 5,
    highlight: "Serene Botanical Dining Room & Amazing Staff",
    quote: "They are a good addition to the area! Amazing staff and amazing food. The location looks amazing — the ambience is so serene."
  }
];

export const CATERING_GALLERY = [
  {
    id: "cat_eggrolls",
    title: "Khmer Pork Egg Roll Party Wheel",
    subtitle: "Hand-rolled crispy Cambodian egg rolls arranged around house sweet-chili dipping sauce",
    image: "./images/catering-egg-rolls.jpg",
    pricePerPerson: 4.50
  },
  {
    id: "cat_buffet",
    title: "Full Hot Buffet Chafing Trays",
    subtitle: "Bai Saik Chruk grilled pork, Sesame Chicken, Meekong Noodles & Combination Fried Rice",
    image: "./images/catering-buffet.jpg",
    pricePerPerson: 16.50
  },
  {
    id: "cat_meatballs",
    title: "Glazed House Sesame Meatballs",
    subtitle: "Slow-simmered savory meatballs topped with toasted sesame seeds and fresh green onions",
    image: "./images/catering-meatballs.jpg",
    pricePerPerson: 5.50
  },
  {
    id: "cat_fruit",
    title: "Artisan Fresh Fruit & Garnish Displays",
    subtitle: "Hand-carved watermelon baskets with strawberries, pineapple, grapes & seasonal fruit",
    image: "./images/catering-fruit-basket.jpg",
    pricePerPerson: 4.00
  }
];

export const INITIAL_LIVE_STATUS = {
  mode: "open_normal", // 'open_normal' | 'commute_delay' | 'family_early' | 'catering_only' | 'closed_today'
  badgeText: "🟢 Kitchen & Sushi Bar Open Today",
  headline: "1124 N Bragg Blvd, Spring Lake, NC • Dine-In, Takeout & Catering",
  subtext: "Mon–Thu 11:00 AM – 8:00 PM • Fri–Sat 11:00 AM – 8:30 PM • Closed Sundays for Family Day",
  customHoursToday: "11:00 AM – 8:00 PM (Fri–Sat till 8:30 PM)",
  topMarquee: "🌾 Welcome to Rice, Roots & Rolls at 1124 N Bragg Blvd, Spring Lake! Authentic Cambodian Kathiew Pho, Khmer Grilled Pork & Hand-Rolled Sushi by Chef A.",
  wokOpen: true,
  sushiOpen: true,
  lastUpdated: "Synced with Google Maps & Apple Maps"
};
