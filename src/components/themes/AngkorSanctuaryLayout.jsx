import React, { useState } from 'react';
import { useKitchen } from '../../context/KitchenContext';
import BotanicalSteamCanvas from '../effects/BotanicalSteamCanvas';
import {
  Phone,
  MapPin,
  Clock,
  Navigation,
  Heart,
  Sparkles,
  Check,
  Plus,
  Search,
  Star,
  Utensils,
  FileImage,
  ChefHat,
  SearchCode,
  Compass,
  Car,
  ArrowUpRight,
  Flame
} from 'lucide-react';

// Map specific dish IDs to real high-res food photos in public/images/
const DISH_THUMBNAILS = {
  se_kathiew: './images/hero-khmer-beef.png',
  se_bai_saik_chruk: './images/hero-khmer-beef.png',
  se_noodle_bowl: './images/catering-egg-rolls.jpg',
  sq_wyoming_cowboy: './images/specialty-sushi-closeup.jpg',
  sq_screaming_eagle: './images/rainbow-roll-cutout.png',
  sq_24th_id: './images/specialty-sushi-closeup.jpg',
  sq_all_american: './images/rainbow-roll-cutout.png',
  ss_khmer_crudo: './images/khmer-crudo.jpg',
  ss_tempura_battered: './images/shrimp-tempura.jpg',
  cr_rainbow: './images/rainbow-roll-cutout.png',
  cr_dragon: './images/specialty-sushi-closeup.jpg',
  cr_shrimp_tempura: './images/shrimp-tempura.jpg',
  st_egg_rolls: './images/catering-egg-rolls.jpg',
  st_shrimp_tempura: './images/shrimp-tempura.jpg',
  ch_sesame_chicken: './images/catering-buffet.jpg'
};

const CATEGORY_META = {
  southeastSpecials: {
    label: 'Khmer & Southeast Asian',
    accent: 'From Chef A’s Cambodian Family Kitchen',
    heroImg: './images/hero-khmer-beef.png'
  },
  chefsSpecials: {
    label: "Chef's Khmer Traditions",
    accent: 'Slow-Simmered Curries, Whole Crispy Fish & Kreung Soup',
    heroImg: './images/story-roots.jpg'
  },
  squadLeaderSushi: {
    label: 'Squad Leader Specialty Rolls',
    accent: 'Hand-Rolled Tribute to Fort Bragg & Lander, WY',
    heroImg: './images/specialty-sushi-closeup.jpg'
  },
  sushiStarters: {
    label: 'Crudo & Sushi Starters',
    accent: 'Sashimi-Grade Salmon & Crispy Tempura',
    heroImg: './images/khmer-crudo.jpg'
  },
  classicRolls: {
    label: 'Classic Sushi Bar Rolls',
    accent: 'Rolled Fresh to Order with Warm Seasoned Rice',
    heroImg: './images/rainbow-roll-cutout.png'
  },
  startersAndSides: {
    label: 'Crispy Starters & Sides',
    accent: 'Hand-Rolled Khmer Egg Rolls, Crab Rangoon & Gyoza',
    heroImg: './images/catering-egg-rolls.jpg'
  },
  soups: {
    label: 'House-Simmered Soups',
    accent: 'Wonton, Egg Drop & Hot and Sour',
    heroImg: './images/story-rice.jpg'
  },
  chineseFavorites: {
    label: 'Wok-Fired Classics',
    accent: 'High-Heat Wok Favorites Served with Steamed Jasmine Rice',
    heroImg: './images/catering-buffet.jpg'
  }
};

export default function AngkorSanctuaryLayout() {
  const {
    businessInfo,
    meaningPillars,
    chefStoryParagraphs,
    customerReviews,
    cateringGallery,
    menu,
    specials,
    liveStatus,
    addToCart,
    setIsPrintableMenuOpen,
    setIsChefAdminOpen,
    setIsSchemaWhitePageOpen
  } = useKitchen();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState({});

  // Interactive Catering Calculator State
  const [guestCount, setGuestCount] = useState(25);
  const [selectedPackages, setSelectedPackages] = useState(['cat_eggrolls', 'cat_buffet']);
  const [cateringName, setCateringName] = useState('');
  const [cateringDate, setCateringDate] = useState('');
  const [cateringNotes, setCateringNotes] = useState('');

  const handleAdd = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [item.id]: false })), 1400);
  };

  const togglePackage = (id) => {
    setSelectedPackages(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const estimatedCateringTotal = selectedPackages.reduce((sum, id) => {
    const pkg = cateringGallery.find(p => p.id === id);
    return sum + (pkg ? pkg.pricePerPerson * guestCount : 0);
  }, 0);

  const handleSendCateringSms = (e) => {
    e.preventDefault();
    const chosenNames = cateringGallery
      .filter(p => selectedPackages.includes(p.id))
      .map(p => p.title)
      .join(', ');
    const msg = `Hi Chef A! Catering inquiry for Rice, Roots & Rolls:\n• Name: ${cateringName || 'Guest'}\n• Date: ${cateringDate || 'TBD'}\n• Headcount: ${guestCount} guests\n• Platters: ${chosenNames}\n• Est. Budget: ~$${estimatedCateringTotal.toFixed(0)}\n• Notes: ${cateringNotes || 'None'}`;
    window.open(`sms:${businessInfo.phoneRaw}?&body=${encodeURIComponent(msg)}`, '_blank');
  };

  const categories = [
    { key: 'all', label: 'All Dishes (36)' },
    { key: 'southeastSpecials', label: 'Khmer Specials' },
    { key: 'chefsSpecials', label: "Chef's Traditions" },
    { key: 'squadLeaderSushi', label: 'Squad Leader Rolls' },
    { key: 'sushiStarters', label: 'Crudo & Sushi Apps' },
    { key: 'classicRolls', label: 'Classic Rolls' },
    { key: 'startersAndSides', label: 'Egg Rolls & Starters' },
    { key: 'soups', label: 'Soups' },
    { key: 'chineseFavorites', label: 'Wok Classics' }
  ];

  const getStatusGlow = () => {
    switch (liveStatus.mode) {
      case 'commute_delay':
      case 'family_early':
        return 'bg-[#362612]/90 border-[#D99B26]/40 text-[#FDE68A]';
      case 'catering_only':
        return 'bg-[#2E1A16]/90 border-[#C87D55]/40 text-[#FCD5CE]';
      case 'closed_today':
        return 'bg-[#2D1515]/90 border-[#EF4444]/40 text-[#FECACA]';
      default:
        return 'bg-[#17281E]/90 border-[#4A7C59]/50 text-[#D8F3DC]';
    }
  };

  const visibleSpecials = specials.filter(s => !s.hidden);

  return (
    <div className="min-h-screen bg-[#0F0D0B] text-[#F5EFE6] relative selection:bg-[#C89D54] selection:text-[#0F0D0B] overflow-x-hidden">
      {/* Subtle Ambient Warm Glows & Botanical Steam */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-[#C89D54]/[0.07] blur-[140px]" />
        <div className="absolute top-[30%] -right-40 w-[500px] h-[500px] rounded-full bg-[#3A5A40]/[0.08] blur-[150px]" />
        <div className="absolute bottom-20 left-1/4 w-[600px] h-[600px] rounded-full bg-[#9E4734]/[0.06] blur-[160px]" />
      </div>
      <BotanicalSteamCanvas />

      {/* Live Status Top Pill Strip */}
      <div className="relative z-30 pt-3 px-4">
        <div className={`max-w-6xl mx-auto rounded-full border px-4 py-2 backdrop-blur-xl transition-all flex flex-wrap items-center justify-between gap-2 text-xs ${getStatusGlow()}`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            <span className="font-bold tracking-wide">{liveStatus.badgeText}</span>
            <span className="hidden md:inline opacity-80">• {liveStatus.headline}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline opacity-75">{liveStatus.customHoursToday}</span>
            <button
              onClick={() => setIsChefAdminOpen(true)}
              className="underline decoration-dotted opacity-85 hover:opacity-100 font-semibold cursor-pointer"
            >
              Chef A Status Sync
            </button>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Navigation Capsule */}
      <header className="sticky top-3 z-40 px-4 mt-3">
        <div className="max-w-6xl mx-auto rounded-full bg-[#181512]/85 backdrop-blur-2xl border border-white/10 px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C89D54] to-[#8C6528] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-[#14110F] flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-[#C89D54]">R</span>
              </div>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#F7F2E9] block leading-none">
                Rice, Roots &amp; Rolls
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#C89D54] font-semibold block mt-1">
                An Asian Kitchen • Spring Lake
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] rounded-full p-1 border border-white/5 text-xs font-medium text-[#D8CFC2]">
            <a href="#featured" className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition">
              Signatures
            </a>
            <a href="#menu" className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition">
              Full Menu
            </a>
            <a href="#roots" className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition">
              Chef A’s Story
            </a>
            <a href="#wayfinding" className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition">
              1124 N Bragg Blvd
            </a>
            <a href="#catering" className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition">
              Catering
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrintableMenuOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-white/12 border border-white/10 text-xs font-semibold text-[#E8DFD1] transition cursor-pointer"
            >
              <FileImage className="w-3.5 h-3.5 text-[#C89D54]" />
              <span>Menu Boards</span>
            </button>
            <a
              href={businessInfo.googleMapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/10 text-xs font-semibold text-white transition"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C89D54]" />
              <span className="hidden sm:inline">Directions</span>
            </a>
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#C89D54] to-[#B3863E] hover:from-[#D5AB63] hover:to-[#C89D54] text-[#120F0D] font-bold text-xs shadow-lg shadow-[#C89D54]/20 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{businessInfo.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION — 2026 MICHELIN BENTO & FLOATING CUTOUTS */}
      <section id="top" className="relative z-20 max-w-6xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Editorial Showcase Card (7 cols) */}
          <div className="lg:col-span-7 rounded-[2rem] bg-gradient-to-br from-[#1C1815] via-[#151210] to-[#110E0C] border border-white/10 p-7 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-[#C89D54]/10 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89D54]/15 border border-[#C89D54]/30 text-[#E5C17B] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cambodian Heritage • Wok Classics • Hand-Rolled Sushi</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF6EE] leading-[1.06]">
                Every grain tells a{' '}
                <span className="italic font-normal text-[#C89D54]">family story.</span>
              </h1>

              <p className="text-[#C6BCB0] text-base sm:text-lg leading-relaxed max-w-xl font-light">
                {businessInfo.heroDescription} Born in a little red food truck in Lander, Wyoming and now crafted fresh daily by <strong className="text-[#F5EFE6] font-medium">Chef A</strong> at <strong className="text-[#E5C17B] font-medium">1124 N Bragg Blvd</strong>.
              </p>

              {/* Action Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#menu"
                  className="px-7 py-3.5 rounded-full bg-[#C89D54] hover:bg-[#D7AE66] text-[#120F0D] font-bold text-sm transition shadow-[0_12px_30px_rgba(200,157,84,0.3)] inline-flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Explore the 36-Dish Menu</span>
                </a>
                <a
                  href="#wayfinding"
                  className="px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/12 border border-white/15 text-[#F5EFE6] font-semibold text-sm transition inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#C89D54]" />
                  <span>Easy Bragg Blvd Arrival</span>
                </a>
              </div>
            </div>

            {/* Bottom Trust & Kitchen Metrics inside Hero Bento */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10 relative z-10">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C89D54]">5.0 ★</div>
                <div className="text-xs text-[#9E9488] mt-0.5">Spring Lake Guests</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6EE]">36</div>
                <div className="text-xs text-[#9E9488] mt-0.5">Scratch Dishes &amp; Rolls</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#74C69D]">5 Min</div>
                <div className="text-xs text-[#9E9488] mt-0.5">From Fort Bragg Gates</div>
              </div>
            </div>
          </div>

          {/* Right Visual Culinary Showcase Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Visual Dish Card — Overhead Khmer Beef & Monstera */}
            <div className="relative rounded-[2rem] bg-gradient-to-b from-[#231E1A] to-[#151210] border border-white/10 p-6 flex-1 flex flex-col justify-between overflow-hidden group shadow-[0_25px_60px_rgba(0,0,0,0.6)] min-h-[310px]">
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-[#E5C17B]">
                  Chef A’s Khmer Signature
                </span>
                <span className="font-serif text-lg font-bold text-white bg-[#C89D54]/20 border border-[#C89D54]/40 px-3 py-1 rounded-full">
                  $15.95
                </span>
              </div>

              {/* Center Floating Dish Cutout */}
              <div className="my-2 flex items-center justify-center relative z-10">
                <img
                  src="./images/hero-khmer-beef.png"
                  alt="Khmer Char-Grilled Specialty"
                  className="w-60 sm:w-64 h-60 sm:h-64 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
                />
              </div>

              <div className="relative z-10 flex items-end justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl font-bold text-white">
                    Bai Saik Chruk &amp; Kathiew Pho
                  </h2>
                  <p className="text-xs text-[#B5ABA0] line-clamp-1 mt-0.5">
                    House-pickled daikon, aromatic kreung &amp; signature Koh Kong dipping sauce
                  </p>
                </div>
                <a
                  href="#menu"
                  className="w-10 h-10 rounded-full bg-[#C89D54] text-[#14110F] flex items-center justify-center shrink-0 hover:scale-105 transition shadow-md"
                  aria-label="View Khmer Menu"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Bottom Dual Mini Bento Cards (Sushi Cutout + Tempura Cutout) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-[#1A1614] border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden group hover:border-[#C89D54]/40 transition">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#C89D54]">
                  Sushi Bar
                </span>
                <img
                  src="./images/rainbow-roll-cutout.png"
                  alt="Hand-Rolled Rainbow Roll"
                  className="w-28 h-24 object-contain mx-auto my-2 drop-shadow-[0_14px_20px_rgba(0,0,0,0.75)] group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <div className="font-serif text-sm font-bold text-white">Squad Leader Rolls</div>
                  <div className="text-[11px] text-[#9E9488]">Hand-rolled to order</div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#1A1614] border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden group hover:border-[#C89D54]/40 transition">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#74C69D]">
                  Crispy Starters
                </span>
                <img
                  src="./images/shrimp-tempura-cutout.png"
                  alt="Golden Shrimp Tempura"
                  className="w-28 h-24 object-contain mx-auto my-2 drop-shadow-[0_14px_20px_rgba(0,0,0,0.75)] group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <div className="font-serif text-sm font-bold text-white">Golden Tempura</div>
                  <div className="text-[11px] text-[#9E9488]">5pc Shrimp • $9.95</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VISUAL SIGNATURES (EDITABLE IN CHEF A'S IPHONE POCKET ADMIN) */}
      <section id="featured" className="relative z-20 max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D54] block mb-2">
              Curated Plate Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6EE]">
              Chef A’s Signature Creations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A59B8F] max-w-md">
            Tap <strong className="text-[#E5C17B]">+ Add</strong> on any dish to build your pickup or dine-in order for quick phone or SMS checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleSpecials.map(item => {
            const isAdded = addedIds[item.id];
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-[#181512]/90 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#C89D54]/45 hover:-translate-y-1 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="relative h-48 bg-gradient-to-b from-[#25201B] to-[#181512] overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#E5C17B] border border-white/10">
                      {item.badge}
                    </span>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center">
                        <span className="px-4 py-1.5 rounded-full bg-[#9E4734] text-white text-xs font-bold uppercase">
                          Sold Out for Today
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-lg font-bold text-[#FAF6EE] leading-snug">
                        {item.title}
                      </h3>
                      <span className="font-serif text-base font-bold text-[#C89D54] shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#A89F93] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <button
                    disabled={!item.inStock}
                    onClick={() =>
                      handleAdd({
                        id: item.id,
                        name: item.title,
                        price: item.price,
                        numericPrice: item.singlePrice
                      })
                    }
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      !item.inStock
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : isAdded
                        ? 'bg-[#4A7C59] text-white'
                        : 'bg-white/[0.08] hover:bg-[#C89D54] text-[#F5EFE6] hover:text-[#120F0D]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Order</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order • {item.price}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULL 36-DISH INTERACTIVE MENU — MODERN ROUNDED BENTO CARDS */}
      <section id="menu" className="relative z-20 max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-[2.25rem] bg-[#161311]/90 border border-white/10 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
          {/* Header & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D54] block mb-2">
                Full Kitchen &amp; Sushi Bar Menu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6EE]">
                Crafted Fresh to Order
              </h2>
              <p className="text-xs sm:text-sm text-[#A59B8F] mt-1">
                Every dish and roll verified directly from Chef A’s Spring Lake kitchen boards.
              </p>
            </div>

            {/* Search Input + Official Menu Photos Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-[#9E9488] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search pho, ribeye roll, curry, tempura..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.06] border border-white/12 text-xs text-white placeholder-[#8A8075] focus:outline-none focus:border-[#C89D54]"
                />
              </div>
              <button
                onClick={() => setIsPrintableMenuOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#C89D54]/15 hover:bg-[#C89D54]/25 border border-[#C89D54]/35 text-[#E5C17B] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
              >
                <FileImage className="w-3.5 h-3.5" />
                <span>View High-Res Menu Boards</span>
              </button>
            </div>
          </div>

          {/* Smooth Pill Category Selector */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-5">
            {categories.map(cat => {
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? 'bg-[#C89D54] text-[#120F0D] font-bold shadow-md shadow-[#C89D54]/20'
                      : 'bg-white/[0.05] hover:bg-white/10 text-[#C6BCB0] border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Menu Categories & Modern Rounded Dish Cards */}
          <div className="space-y-12 mt-4">
            {Object.entries(menu).map(([catKey, categoryObj]) => {
              if (activeCategory !== 'all' && activeCategory !== catKey) return null;

              const filteredItems = (categoryObj.items || []).filter(item => {
                if (item.hidden) return null;
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase();
                return (
                  item.name.toLowerCase().includes(q) ||
                  (item.description && item.description.toLowerCase().includes(q)) ||
                  (item.badge && item.badge.toLowerCase().includes(q))
                );
              });

              if (filteredItems.length === 0) return null;
              const meta = CATEGORY_META[catKey] || {};

              return (
                <div key={catKey} className="space-y-5">
                  {/* Category Visual Banner */}
                  <div className="rounded-3xl bg-gradient-to-r from-[#221D19] via-[#1B1714] to-[#161311] border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {meta.heroImg && (
                        <img
                          src={meta.heroImg}
                          alt={categoryObj.categoryName}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-white/15 shrink-0"
                        />
                      )}
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89D54] block">
                          {meta.accent || 'Fresh to Order'}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#FAF6EE]">
                          {categoryObj.categoryName}
                        </h3>
                        <p className="text-xs text-[#A59B8F] mt-0.5">{categoryObj.tagline}</p>
                      </div>
                    </div>
                    {categoryObj.note && (
                      <span className="text-[11px] text-[#D8CFC2] bg-white/[0.05] px-3.5 py-1.5 rounded-full border border-white/10 self-start sm:self-center">
                        {categoryObj.note}
                      </span>
                    )}
                  </div>

                  {/* Dish Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map(item => {
                      const isAdded = addedIds[item.id];
                      const thumb = DISH_THUMBNAILS[item.id];
                      const stationClosed =
                        (item.isSushi && !liveStatus.sushiOpen) ||
                        (item.isWok && !liveStatus.wokOpen);
                      const available = item.inStock && !stationClosed;

                      return (
                        <div
                          key={item.id}
                          className={`rounded-2xl p-4 sm:p-5 border transition-all flex items-start justify-between gap-4 ${
                            available
                              ? 'bg-[#1D1916]/90 hover:bg-[#231E1A] border-white/8 hover:border-[#C89D54]/40 shadow-sm'
                              : 'bg-[#171412]/50 border-white/5 opacity-60'
                          }`}
                        >
                          {thumb && (
                            <img
                              src={thumb}
                              alt={item.name}
                              className="w-20 h-20 rounded-2xl object-cover border border-white/10 shrink-0 hidden sm:block"
                            />
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-serif text-base sm:text-lg font-bold text-[#FAF6EE]">
                                {item.name}
                              </h4>
                              {item.badge && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#C89D54]/15 text-[#E5C17B] text-[10px] font-semibold">
                                  {item.badge}
                                </span>
                              )}
                              {!available && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#9E4734] text-white text-[10px] font-bold">
                                  Sold Out Today
                                </span>
                              )}
                            </div>

                            {item.description && (
                              <p className="text-xs text-[#A89F93] leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            {item.extraOption && (
                              <p className="text-[11px] text-[#C89D54] font-medium mt-1.5">
                                ✦ {item.extraOption}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                            <span className="font-serif text-base sm:text-lg font-bold text-[#C89D54]">
                              {item.price}
                            </span>

                            <button
                              disabled={!available}
                              onClick={() => handleAdd(item)}
                              className={`mt-3 w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer ${
                                !available
                                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                  : isAdded
                                  ? 'bg-[#4A7C59] text-white scale-105'
                                  : 'bg-white/10 hover:bg-[#C89D54] text-white hover:text-[#120F0D]'
                              }`}
                              title={available ? `Add ${item.name}` : 'Currently unavailable'}
                            >
                              {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHEF A'S HERITAGE & THE MEANING OF RICE • ROOTS • ROLLS */}
      <section id="roots" className="relative z-20 max-w-6xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D54] block mb-2">
            From Lander, Wyoming to Spring Lake, North Carolina
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6EE]">
            The Heart Behind Our Name
          </h2>
          <p className="text-sm text-[#A89F93] mt-3">
            Every morning begins with a 45-minute drive, two wonderful young boys, and generations of Cambodian family recipes prepared from scratch.
          </p>
        </div>

        {/* Three Meaning Pillars — Modern Magazine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {meaningPillars.map(pillar => (
            <div
              key={pillar.id}
              className="rounded-[2rem] bg-[#181512] border border-white/10 overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <div>
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89D54] block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-white">{pillar.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-[#C6BCB0] leading-relaxed italic">
                    “{pillar.quote}”
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-2 flex items-center justify-between text-[11px] text-[#8E8478]">
                <span>Chef A (Leakhena Ouk-Hester)</span>
                <Heart className="w-3.5 h-3.5 text-[#C89D54]" />
              </div>
            </div>
          ))}
        </div>

        {/* Chef A & Far East Foodie Story Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-[2.25rem] bg-gradient-to-br from-[#1D1916] to-[#14110F] border border-white/10 p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <img
              src="./images/chef-a-food-truck.jpg"
              alt="Chef A in front of Far East Foodie red food truck"
              className="rounded-3xl w-full h-64 object-cover border border-white/10 col-span-2 shadow-lg"
            />
            <img
              src="./images/dining-room-interior.jpg"
              alt="Serene botanical dining room at 1124 N Bragg Blvd"
              className="rounded-2xl w-full h-36 object-cover border border-white/10"
            />
            <img
              src="./images/story-rolls-son.jpg"
              alt="Chef A's young son enjoying fresh rolls"
              className="rounded-2xl w-full h-36 object-cover border border-white/10"
            />
          </div>

          <div className="lg:col-span-7 space-y-4 sm:pl-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89D54]/15 text-[#E5C17B] text-xs font-semibold">
              <span>Meet Chef A • Leakhena Ouk-Hester</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF6EE] leading-tight">
              Started on wheels in Wyoming. Rooted for family in Spring Lake.
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#B8AEA2] leading-relaxed">
              {chefStoryParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EFFORTLESS BRAGG BLVD WAYFINDING & HOURS HUB */}
      <section id="wayfinding" className="relative z-20 max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-[2.25rem] bg-gradient-to-br from-[#19231C] via-[#151815] to-[#12100E] border border-[#4A7C59]/35 p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.65)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#74C69D] mb-2">
                  <Compass className="w-4 h-4" />
                  <span>Never Miss Our Turn on N Bragg Blvd</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  1124 N Bragg Blvd, Spring Lake
                </h2>
                <p className="text-xs sm:text-sm text-[#B7C4B9] mt-1">
                  Dedicated front parking • 5 minutes from Fort Bragg gates • Dine-In &amp; Fast Call-Ahead Pickup
                </p>
              </div>

              {/* 1-Tap Navigation Pill Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={businessInfo.appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-white text-[#12100E] font-bold text-xs flex items-center gap-2 hover:bg-[#E5C17B] transition shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Apple Maps</span>
                </a>
                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-[#C89D54] text-[#12100E] font-bold text-xs flex items-center gap-2 hover:bg-[#D7AE66] transition shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps Route</span>
                </a>
                <a
                  href={businessInfo.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-xs flex items-center gap-2 transition"
                >
                  <Car className="w-3.5 h-3.5 text-[#74C69D]" />
                  <span>Launch Waze</span>
                </a>
              </div>

              {/* Visual Approach Cues */}
              <div className="space-y-3 pt-2">
                {businessInfo.wayfindingLandmarks.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-black/30 border border-white/10 p-4 flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#4A7C59]/30 border border-[#74C69D]/40 text-[#74C69D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.direction}</div>
                      <p className="text-xs text-[#B5ABA0] mt-1 leading-relaxed">{item.cue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Hours & Direct Contact Card */}
            <div className="lg:col-span-5 rounded-3xl bg-[#141210]/90 border border-white/10 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#C89D54]" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Kitchen Hours</h3>
                    <p className="text-[11px] text-[#9E9488]">{liveStatus.lastUpdated}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#4A7C59]/25 text-[#74C69D] text-[10px] font-bold">
                  Live Status
                </span>
              </div>

              <div className="space-y-3">
                {businessInfo.hoursSchedule.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-none"
                  >
                    <span className="text-[#C6BCB0] font-medium">{row.days}</span>
                    <span className="font-bold text-white">{row.hours}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#C89D54]/10 border border-[#C89D54]/30 p-4 text-xs text-[#E5C17B]">
                <div className="font-bold mb-1">Today’s Live Note from Chef A:</div>
                <div className="text-[#F5EFE6]">{liveStatus.subtext}</div>
              </div>

              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="w-full py-3.5 rounded-full bg-[#C89D54] hover:bg-[#D7AE66] text-[#120F0D] font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Kitchen: {businessInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CATERING SHOWCASE & CALCULATOR + 5-STAR REVIEWS */}
      <section id="catering" className="relative z-20 max-w-6xl mx-auto px-4 py-16 space-y-16">
        <div className="rounded-[2.25rem] bg-[#181512] border border-white/10 p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D54] block mb-2">
              Fort Bragg Ceremonies • Office Lunches • Family Celebrations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Roots Catering &amp; Party Trays
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F93] mt-2">
              Select your favorite trays and guest count below to estimate your buffet and text Chef A directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cateringGallery.map(pkg => {
                const selected = selectedPackages.includes(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    onClick={() => togglePackage(pkg.id)}
                    className={`rounded-3xl overflow-hidden border transition cursor-pointer flex flex-col justify-between ${
                      selected
                        ? 'bg-[#241E19] border-[#C89D54] shadow-lg'
                        : 'bg-[#14110F] border-white/10 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="h-40 relative overflow-hidden">
                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 text-[#E5C17B] text-xs font-bold">
                          ${pkg.pricePerPerson.toFixed(2)} / guest
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-base font-bold text-white">{pkg.title}</h3>
                        <p className="text-xs text-[#A59B8F] mt-1">{pkg.subtitle}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div
                        className={`w-full py-2 rounded-full text-xs font-bold text-center ${
                          selected
                            ? 'bg-[#C89D54] text-[#120F0D]'
                            : 'bg-white/10 text-white/75'
                        }`}
                      >
                        {selected ? '✓ Included in Estimate' : '+ Select Platter'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleSendCateringSms}
              className="lg:col-span-5 rounded-3xl bg-[#120F0D] border border-white/10 p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C89D54]">
                    Instant Event Estimator
                  </span>
                  <span className="font-serif text-2xl font-bold text-white">
                    ~${estimatedCateringTotal.toFixed(0)}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#C6BCB0]">Estimated Guests:</span>
                    <span className="font-bold text-[#E5C17B]">{guestCount} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={guestCount}
                    onChange={e => setGuestCount(Number(e.target.value))}
                    className="w-full accent-[#C89D54] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name or Unit"
                    value={cateringName}
                    onChange={e => setCateringName(e.target.value)}
                    className="px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder-[#7D746B]"
                  />
                  <input
                    type="text"
                    placeholder="Event Date & Time"
                    value={cateringDate}
                    onChange={e => setCateringDate(e.target.value)}
                    className="px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder-[#7D746B]"
                  />
                </div>

                <textarea
                  rows="2"
                  placeholder="Any dietary notes, spice preferences, or delivery details?"
                  value={cateringNotes}
                  onChange={e => setCateringNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder-[#7D746B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#C89D54] hover:bg-[#D7AE66] text-[#120F0D] font-bold text-xs transition cursor-pointer shadow-lg"
              >
                Send Catering Inquiry to Chef A via Text
              </button>
            </form>
          </div>
        </div>

        {/* 5-Star Guest Reviews */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89D54]">
              Verified Spring Lake &amp; Fort Bragg Guests
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Why Neighbors Love Rice, Roots &amp; Rolls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerReviews.map(rev => (
              <div
                key={rev.id}
                className="rounded-3xl bg-[#181512] border border-white/10 p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#C89D54]">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-[#E5C17B]">{rev.highlight}</div>
                  <p className="text-xs text-[#C6BCB0] leading-relaxed">“{rev.quote}”</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8E8478]">
                  <span className="font-bold text-white">{rev.author}</span>
                  <span>{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODERN LUXURY FOOTER */}
      <footer className="relative z-20 border-t border-white/10 bg-[#0B0908] py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8E8478]">
          <div>
            <div className="font-serif text-lg font-bold text-white">
              Rice, Roots &amp; Rolls — An Asian Kitchen
            </div>
            <div className="mt-1">
              {businessInfo.address} • {businessInfo.phone}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsChefAdminOpen(true)}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#E5C17B] font-semibold cursor-pointer"
            >
              Chef A Pocket Admin
            </button>
            <button
              onClick={() => setIsSchemaWhitePageOpen(true)}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#C6BCB0] cursor-pointer"
            >
              Google Maps &amp; SEO Architecture
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
