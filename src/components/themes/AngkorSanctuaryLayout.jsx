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
  Car
} from 'lucide-react';

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
    { key: 'all', label: 'All Menu (36 Dishes)' },
    { key: 'southeastSpecials', label: 'Southeast & Khmer Specials' },
    { key: 'chefsSpecials', label: "Chef's Khmer Specials" },
    { key: 'squadLeaderSushi', label: 'Squad Leader Specialty Sushi' },
    { key: 'sushiStartersAndStandard', label: 'Sushi Starters & Rolls' },
    { key: 'chineseSpecials', label: 'Chinese Specials' },
    { key: 'appetizersAndDrinks', label: 'Appetizers & Drinks' }
  ];

  const getFilteredCategories = () => {
    const entries =
      activeCategory === 'all'
        ? Object.entries(menu)
        : [[activeCategory, menu[activeCategory]]];

    if (!searchQuery.trim()) return entries;
    const q = searchQuery.toLowerCase();
    return entries
      .map(([k, cat]) => {
        const filteredItems = cat.items.filter(
          i =>
            !i.hidden &&
            (i.name.toLowerCase().includes(q) ||
              (i.description && i.description.toLowerCase().includes(q)))
        );
        return [k, { ...cat, items: filteredItems }];
      })
      .filter(([, cat]) => cat.items.length > 0);
  };

  return (
    <div className="bg-[#14110F] text-[#F5F0E6] w-full max-w-full overflow-x-hidden">
      {/* 1. LIVE MARQUEE & COMMUTE STATUS BAR */}
      <div className="bg-[#1B2A21] border-b border-[#344E3E] py-2 px-3 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="bg-[#C89D54] text-[#14110F] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-none shrink-0 font-mono-tech">
              {liveStatus.badgeText}
            </span>
            <span className="text-[#E6F0E9] font-medium">{liveStatus.topMarquee}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 font-mono-tech text-[11px] text-[#C89D54]">
            <a href={`tel:${businessInfo.phoneRaw}`} className="hover:underline font-bold">
              📞 {businessInfo.phone}
            </a>
            <span>•</span>
            <button
              onClick={() => setIsChefAdminOpen(true)}
              className="underline hover:text-white cursor-pointer"
            >
              Chef Update ({liveStatus.lastUpdated})
            </button>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION HEADER */}
      <header className="bg-[#181411]/95 backdrop-blur-md border-b border-[#2E2721] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <img
              src="./images/chef-a-food-truck.jpg"
              alt="Chef A — Rice, Roots & Rolls"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover border-2 border-[#C89D54]"
            />
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#C89D54] block font-bold">
                Cambodian • Chinese • Hand-Rolled Sushi
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#F5F0E6] tracking-wide leading-none">
                Rice, Roots &amp; Rolls
              </h1>
              <p className="text-[11px] text-[#A69B8D] mt-0.5">
                1124 N Bragg Blvd, Spring Lake, NC • Minutes from Fort Bragg
              </p>
            </div>
          </div>

          <nav className="flex items-center flex-wrap justify-center gap-2 text-xs font-bold">
            <a
              href="#wayfinding"
              className="px-3 py-2 bg-[#211C18] hover:bg-[#2C2520] border border-[#382F28] text-[#E6DEC8] flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-[#C89D54]" />
              <span>Find Us on Bragg Blvd</span>
            </a>
            <a
              href="#menu-section"
              className="px-3 py-2 bg-[#211C18] hover:bg-[#2C2520] border border-[#382F28] text-[#E6DEC8]"
            >
              Full Menu
            </a>
            <a
              href="#meaning-story"
              className="px-3 py-2 bg-[#211C18] hover:bg-[#2C2520] border border-[#382F28] text-[#E6DEC8]"
            >
              Our Story &amp; Roots
            </a>
            <a
              href="#catering-section"
              className="px-3 py-2 bg-[#211C18] hover:bg-[#2C2520] border border-[#382F28] text-[#E6DEC8]"
            >
              Catering
            </a>
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="px-4 py-2 bg-[#2E5A44] hover:bg-[#3A7055] text-white border border-[#4A7C59] flex items-center gap-1.5 shadow"
            >
              <Phone className="w-3.5 h-3.5 text-[#C89D54]" />
              <span>Call {businessInfo.phone}</span>
            </a>
          </nav>
        </div>
      </header>

      {/* 3. HERO & "NEVER MISS THE TURN ON N BRAGG BLVD" WAYFINDING */}
      <section className="relative py-8 sm:py-14 border-b border-[#2E2721] overflow-hidden">
        <BotanicalSteamCanvas />

        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: Cultural Vibe & Live Status */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#1F2D24] border border-[#4A7C59] px-3 py-1 text-xs font-mono-tech text-[#D8E6DC]">
                <span className="w-2 h-2 bg-[#C89D54]"></span>
                <span>FRESH INGREDIENTS • FAMILY RECIPES • SPRING LAKE, NC</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif-editorial text-[#F5F0E6] leading-[1.08]">
                Where Cambodian Roots, <br />
                <span className="text-[#C89D54] italic">Hand-Rolled Sushi &amp; Family</span> <br />
                Meet on Bragg Blvd.
              </h2>

              <p className="text-sm sm:text-base text-[#D5CCC0] leading-relaxed max-w-2xl">
                {businessInfo.heroDescription} Born in a little red food truck called{' '}
                <strong className="text-[#F5F0E6]">Far East Foodie</strong> in Lander, Wyoming and now proudly rooted at{' '}
                <strong className="text-[#C89D54]">1124 N Bragg Blvd</strong> in Spring Lake, NC.
              </p>

              {/* Live Kitchen Status Box */}
              <div className="bg-[#1C1815] border-l-4 border-[#C89D54] border-y border-r border-[#332B24] p-4 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#C89D54]">
                    {liveStatus.badgeText}
                  </span>
                  <span className="text-xs font-mono-tech text-[#A69B8D]">
                    Today: {liveStatus.customHoursToday}
                  </span>
                </div>
                <p className="text-sm font-bold text-white">{liveStatus.headline}</p>
                <p className="text-xs text-[#A69B8D]">{liveStatus.subtext}</p>
              </div>

              {/* 1-Tap iPhone Wayfinding & Order Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={businessInfo.googleMapsShortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#C89D54] hover:bg-[#D6AD65] text-[#14110F] font-extrabold px-5 py-3.5 rounded-none text-xs sm:text-sm uppercase tracking-wider transition shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                  <span>1-Tap Google Maps (1124 N Bragg Blvd)</span>
                </a>

                <a
                  href={businessInfo.appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#211C18] hover:bg-[#2E2721] border border-[#4A3F35] text-[#F5F0E6] font-bold px-4 py-3.5 rounded-none text-xs sm:text-sm uppercase tracking-wider transition"
                >
                  <MapPin className="w-4 h-4 text-[#C89D54]" />
                  <span>iPhone Apple Maps</span>
                </a>

                <a
                  href={`tel:${businessInfo.phoneRaw}`}
                  className="flex items-center justify-center gap-2 bg-[#2E5A44] hover:bg-[#3A7055] text-white font-bold px-4 py-3.5 rounded-none text-xs sm:text-sm uppercase tracking-wider transition"
                >
                  <Phone className="w-4 h-4 text-[#C89D54]" />
                  <span>Call {businessInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Real Overhead Hero Dish + Serene Dining Room */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-[#1C1815] border-2 border-[#382F28] p-3 shadow-2xl space-y-3">
                <div className="relative">
                  <img
                    src="./images/hero-khmer-beef.png"
                    alt="Khmer Char-Grilled Beef & Koh Kong Dipping Sauce at Rice, Roots & Rolls"
                    className="w-full h-72 sm:h-80 object-cover border border-[#2E2721]"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#14110F]/90 backdrop-blur-sm border border-[#C89D54]/50 p-3">
                    <span className="text-[10px] font-mono-tech uppercase text-[#C89D54] block font-bold">
                      Authentic Khmer &amp; Asian Kitchen
                    </span>
                    <p className="text-xs text-[#F5F0E6] font-medium">
                      Char-grilled Cambodian meats, house-pounded kreung, and zesty Koh Kong dipping sauce.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <img
                    src="./images/khmer-crudo.jpg"
                    alt="Khmer Crudo Salmon"
                    className="w-full h-24 object-cover border border-[#2E2721]"
                  />
                  <img
                    src="./images/specialty-sushi-closeup.jpg"
                    alt="Hand-Rolled Specialty Sushi"
                    className="w-full h-24 object-cover border border-[#2E2721]"
                  />
                  <img
                    src="./images/dining-room-interior.jpg"
                    alt="Serene Botanical Dining Room at 1124 N Bragg Blvd"
                    className="w-full h-24 object-cover border border-[#2E2721]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* "NEVER MISS OUR TURN ON N BRAGG BLVD" WAYFINDING GUIDE */}
          <div id="wayfinding" className="bg-[#1A1613] border-2 border-[#382F28] p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2E2721] pb-4 mb-4">
              <div>
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#C89D54] font-bold flex items-center gap-1.5">
                  <Car className="w-4 h-4" />
                  <span>Brick-and-Mortar Wayfinding Guide • Don’t Miss the Turn!</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white mt-0.5">
                  How to Spot 1124 N Bragg Blvd Without Driving Past
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={businessInfo.googleMapsShortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#C89D54] text-[#14110F] font-extrabold text-xs uppercase tracking-wider"
                >
                  Open Google Maps Pin
                </a>
                <a
                  href={businessInfo.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#25201B] border border-[#3D332B] text-[#E6DEC8] font-bold text-xs uppercase tracking-wider"
                >
                  Open in Waze
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {businessInfo.wayfindingLandmarks.map((lm, i) => (
                <div key={i} className="bg-[#14110F] border border-[#2E2721] p-4 space-y-1.5">
                  <strong className="text-[#C89D54] block font-mono-tech uppercase text-[11px]">
                    {lm.direction}
                  </strong>
                  <p className="text-[#D5CCC0] leading-relaxed">{lm.cue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED SIGNATURE DISHES SPOTLIGHT */}
      <section className="py-10 sm:py-12 bg-[#181411] border-b border-[#2E2721]">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#C89D54] font-bold">
                Chef A’s Signature Creations
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif-editorial text-white mt-0.5">
                Four Must-Try Dishes from Our Kitchen &amp; Sushi Bar
              </h2>
            </div>
            <button
              onClick={() => setIsPrintableMenuOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C89D54] hover:underline cursor-pointer"
            >
              <FileImage className="w-4 h-4" />
              <span>View Original Printable Menu Boards</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {specials.filter(s => !s.hidden).map(spec => {
              const isUnavailable =
                !spec.inStock ||
                (spec.isWok && !liveStatus.wokOpen) ||
                (spec.isSushi && !liveStatus.sushiOpen);
              const isAdded = addedIds[spec.id];

              return (
                <div
                  key={spec.id}
                  className="bg-[#14110F] border border-[#332B24] hover:border-[#C89D54]/60 flex flex-col justify-between transition"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden border-b border-[#2E2721]">
                      <img
                        src={spec.image}
                        alt={spec.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#14110F]/90 border border-[#C89D54] text-[#C89D54] text-[10px] font-mono-tech font-bold uppercase px-2 py-0.5">
                        {spec.badge}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg font-bold font-serif-editorial text-white leading-snug">
                          {spec.title}
                        </h3>
                        <span className="text-base font-bold font-mono-tech text-[#C89D54] shrink-0">
                          {spec.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#A69B8D] leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleAdd(spec)}
                      disabled={isUnavailable}
                      className={`w-full py-2.5 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition ${
                        isUnavailable
                          ? 'bg-[#25201B] text-[#6E655B] cursor-not-allowed'
                          : isAdded
                          ? 'bg-[#2E5A44] text-white'
                          : 'bg-[#241E1A] hover:bg-[#C89D54] text-[#F5F0E6] hover:text-[#14110F] border border-[#3D332B]'
                      }`}
                    >
                      {isUnavailable ? (
                        <span>Currently Sold Out</span>
                      ) : isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Tray</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Takeout Tray</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COMPLETE INTERACTIVE SEARCHABLE MENU (ALL 36 REAL ITEMS) */}
      <section id="menu-section" className="py-12 sm:py-16 bg-[#14110F] border-b border-[#2E2721]">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#C89D54] font-bold">
              Complete Searchable Kitchen &amp; Sushi Menu
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-white">
              Authentic Khmer Dishes, Chinese Classics &amp; Hand-Rolled Sushi
            </h2>
            <p className="text-xs sm:text-sm text-[#A69B8D]">
              Every dish is indexed with <code className="font-mono-tech text-[#C89D54]">Schema.org</code> for Google discovery and synced live with Chef A’s iPhone.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="space-y-4">
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-[#A69B8D] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Kathiew Pho, Bai Saik Chruk, Cowboy Roll, Tempura..."
                className="w-full bg-[#1C1815] border border-[#382F28] focus:border-[#C89D54] focus:outline-none pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#8C8275]"
              />
            </div>

            <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-none text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 border ${
                    activeCategory === cat.key
                      ? 'bg-[#C89D54] text-[#14110F] border-[#C89D54]'
                      : 'bg-[#1C1815] text-[#D5CCC0] hover:text-white border-[#332B24]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Categories */}
          <div className="space-y-12">
            {getFilteredCategories().map(([catKey, categoryData]) => {
              if (!categoryData) return null;
              return (
                <div key={catKey} className="space-y-4">
                  <div className="border-b-2 border-[#C89D54]/40 pb-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#F5F0E6]">
                      {categoryData.categoryName}
                    </h3>
                    <span className="text-xs text-[#C89D54] italic">
                      {categoryData.tagline}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryData.items.filter(i => !i.hidden).map(item => {
                      const isUnavailable =
                        !item.inStock ||
                        (item.isWok && !liveStatus.wokOpen) ||
                        (item.isSushi && !liveStatus.sushiOpen);
                      const isAdded = addedIds[item.id];

                      return (
                        <div
                          key={item.id}
                          className={`p-4 sm:p-5 border flex flex-col justify-between transition ${
                            isUnavailable
                              ? 'bg-[#181412] border-[#2C2520] opacity-60'
                              : 'bg-[#1B1714] border-[#332B24] hover:border-[#C89D54]/60'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                {item.badge && (
                                  <span className="inline-block text-[10px] font-mono-tech uppercase bg-[#253529] text-[#A5D6B5] border border-[#4A7C59]/50 px-2 py-0.5 mb-1">
                                    {item.badge}
                                  </span>
                                )}
                                <h4 className="text-base font-bold text-white leading-snug">
                                  {item.name}
                                </h4>
                              </div>
                              <span className="text-base font-bold font-mono-tech text-[#C89D54] shrink-0">
                                {isUnavailable ? 'SOLD OUT' : item.price}
                              </span>
                            </div>

                            {item.extraOption && (
                              <p className="text-[11px] font-mono-tech text-[#C89D54]">
                                {item.extraOption}
                              </p>
                            )}

                            {item.description && (
                              <p className="text-xs text-[#A69B8D] leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="pt-4 mt-3 border-t border-[#2A231D] flex items-center justify-between">
                            <span className="text-[11px] text-[#8C8275] font-mono-tech">
                              {item.isSushi ? '🍣 Hand-Rolled Sushi' : '🔥 Kitchen Scratch'}
                            </span>
                            <button
                              onClick={() => handleAdd(item)}
                              disabled={isUnavailable}
                              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition ${
                                isUnavailable
                                  ? 'bg-[#25201B] text-[#6E655B] cursor-not-allowed'
                                  : isAdded
                                  ? 'bg-[#2E5A44] text-white'
                                  : 'bg-[#28211B] hover:bg-[#C89D54] text-[#F5F0E6] hover:text-[#14110F] border border-[#3D332B]'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added</span>
                                </>
                              ) : isUnavailable ? (
                                <span>Unavailable</span>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add to Order</span>
                                </>
                              )}
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

      {/* 6. THE MEANING OF "RICE • ROOTS • ROLLS" & CHEF A'S FAMILY JOURNEY */}
      <section id="meaning-story" className="py-12 sm:py-16 bg-[#181411] border-b border-[#2E2721]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Top 3 Pillars: RICE, ROOTS, ROLLS (With Her Real Photos & Her Young Son!) */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#C89D54] font-bold">
                Heart, Culture &amp; Family Legacy
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-white">
                The Meaning Behind Rice, Roots &amp; Rolls
              </h2>
              <p className="text-xs sm:text-sm text-[#A69B8D]">
                Every word in our name carries a piece of Chef A’s heritage, her grandparents’ harvest, and her two young boys.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {meaningPillars.map(pillar => (
                <div
                  key={pillar.id}
                  className="bg-[#14110F] border-2 border-[#332B24] flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="h-64 overflow-hidden border-b border-[#2E2721] relative">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-3 left-3 bg-[#14110F]/90 border border-[#C89D54] px-3 py-1">
                        <span className="text-lg font-bold font-serif-editorial text-[#C89D54] tracking-widest">
                          {pillar.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-2.5">
                      <span className="text-xs font-mono-tech uppercase text-[#4A7C59] font-bold block">
                        {pillar.subtitle}
                      </span>
                      <p className="text-xs sm:text-sm text-[#E6DEC8] italic font-serif-editorial text-base leading-relaxed">
                        “{pillar.quote}”
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-[#1B1714] border-t border-[#2A231D] text-[11px] text-[#C89D54] font-mono-tech">
                    — Chef A • Rice, Roots &amp; Rolls
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chef A's Story: From Lander, WY Red Food Truck to Spring Lake, NC */}
          <div className="bg-[#14110F] border-2 border-[#382F28] p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <img
                  src="./images/chef-a-food-truck.jpg"
                  alt="Chef A in front of her red Far East Foodie food truck in Lander, Wyoming"
                  className="w-full h-80 sm:h-96 object-cover border-2 border-[#C89D54]"
                />
                <p className="text-xs text-[#A69B8D] italic text-center">
                  Chef A in her traditional Cambodian krama headscarf in front of the original Far East Foodie truck in Lander, Wyoming.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#253529] border border-[#4A7C59] px-3 py-1 text-xs font-mono-tech text-[#A5D6B5]">
                  <Heart className="w-3.5 h-3.5 text-[#C89D54] fill-[#C89D54]" />
                  <span>FROM LANDER, WYOMING TO SPRING LAKE, NORTH CAROLINA</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold font-serif-editorial text-white leading-tight">
                  A Little Red Food Truck, Two Young Boys, and a Big Family Dream
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#D5CCC0] leading-relaxed">
                  {chefStoryParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL 5-STAR CUSTOMER REVIEWS */}
      <section className="py-12 sm:py-16 bg-[#14110F] border-b border-[#2E2721]">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#C89D54] font-bold">
              5.0 ★ Verified Guest Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-white">
              What Spring Lake &amp; Travelers Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {customerReviews.map(rev => (
              <div
                key={rev.id}
                className="bg-[#1B1714] border border-[#332B24] p-5 sm:p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#C89D54]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C89D54]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono-tech text-[#8C8275]">{rev.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#C89D54]">{rev.highlight}</h4>
                  <p className="text-xs sm:text-sm text-[#E6DEC8] leading-relaxed italic">
                    “{rev.quote}”
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2A231D] flex items-center justify-between text-xs">
                  <strong className="text-white">{rev.author}</strong>
                  <span className="text-[#A69B8D] font-mono-tech">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CATERING GALLERY & INTERACTIVE FORT BRAGG / EVENT ESTIMATOR */}
      <section id="catering-section" className="py-12 sm:py-16 bg-[#181411] border-b border-[#2E2721]">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#C89D54] font-bold">
              Roots Catering • Fort Bragg Ceremonies, Office Lunches &amp; Family Celebrations
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-white">
              Bring Chef A’s Catering Platters to Your Next Gathering
            </h2>
            <p className="text-xs sm:text-sm text-[#A69B8D]">
              From crispy Khmer Pork Egg Roll party wheels to full hot chafing buffets and hand-rolled sushi platters.
            </p>
          </div>

          {/* Real Catering Photography Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cateringGallery.map(item => (
              <div key={item.id} className="bg-[#14110F] border border-[#332B24] overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <span className="text-xs font-mono-tech text-[#C89D54] shrink-0">
                      ~${item.pricePerPerson.toFixed(2)}/guest
                    </span>
                  </div>
                  <p className="text-xs text-[#A69B8D]">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Catering Calculator */}
          <form
            onSubmit={handleSendCateringSms}
            className="bg-[#14110F] border-2 border-[#C89D54]/60 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-2xl font-bold font-serif-editorial text-white">
                Interactive Event &amp; Platter Estimator
              </h3>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#D5CCC0] uppercase">Estimated Guest Count:</span>
                  <span className="text-[#C89D54] font-mono-tech text-base">{guestCount} Guests</span>
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
                <div className="flex justify-between text-[10px] font-mono-tech text-[#8C8275] mt-1">
                  <span>10 Guests (Small Team)</span>
                  <span>50 Guests (Unit / Party)</span>
                  <span>150 Guests (Banquet)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-[#D5CCC0]">
                  Select Platters &amp; Trays to Include:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cateringGallery.map(pkg => {
                    const selected = selectedPackages.includes(pkg.id);
                    return (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => togglePackage(pkg.id)}
                        className={`p-3 border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                          selected
                            ? 'bg-[#253529] border-[#4A7C59] text-white font-bold'
                            : 'bg-[#1C1815] border-[#332B24] text-[#A69B8D]'
                        }`}
                      >
                        <span>{pkg.title}</span>
                        <span className="font-mono-tech text-[#C89D54]">+${pkg.pricePerPerson.toFixed(2)}/pp</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name or Organization"
                  value={cateringName}
                  onChange={e => setCateringName(e.target.value)}
                  className="bg-[#1C1815] border border-[#382F28] px-3 py-2.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Event Date & Time"
                  value={cateringDate}
                  onChange={e => setCateringDate(e.target.value)}
                  className="bg-[#1C1815] border border-[#382F28] px-3 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#1B1714] border border-[#382F28] p-6 space-y-4 text-center">
              <span className="text-xs font-mono-tech uppercase text-[#C89D54] block font-bold">
                Instant Catering Estimate
              </span>
              <div className="text-4xl font-bold font-mono-tech text-white">
                ~${estimatedCateringTotal.toFixed(0)}
              </div>
              <p className="text-xs text-[#A69B8D]">
                Estimated for <strong>{guestCount} guests</strong> ({selectedPackages.length} platter tiers selected). Custom sushi platters &amp; whole trays tailored to your budget!
              </p>
              <button
                type="submit"
                className="w-full py-3 bg-[#C89D54] hover:bg-[#D6AD65] text-[#14110F] font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow"
              >
                Text Catering Inquiry to Chef A
              </button>
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="block text-xs text-[#C89D54] hover:underline font-mono-tech"
              >
                Or Call Directly: {businessInfo.phone}
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#0F0C0A] text-[#A69B8D] py-12 px-4 text-xs border-t border-[#2C2520]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#241E1A]">
          <div className="space-y-2">
            <h4 className="text-xl font-bold font-serif-editorial text-[#F5F0E6]">
              Rice, Roots &amp; Rolls — An Asian Kitchen
            </h4>
            <p className="text-xs text-[#A69B8D]">
              Authentic Cambodian comfort food, timeless Chinese specials, and hand-rolled sushi crafted with love by Chef A.
            </p>
            <p className="text-xs text-[#C89D54] font-mono-tech pt-1">
              📍 {businessInfo.address}
            </p>
          </div>

          <div className="space-y-1.5">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-2">
              Hours of Operation
            </h5>
            {businessInfo.hoursSchedule.map((h, i) => (
              <div key={i} className="flex justify-between max-w-xs">
                <span>{h.days}:</span>
                <span className="font-mono-tech text-[#E6DEC8]">{h.hours}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-2">
              Chef &amp; Platform Tools
            </h5>
            <div className="flex flex-col gap-1.5 items-start">
              <button
                onClick={() => setIsChefAdminOpen(true)}
                className="text-[#C89D54] hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Chef A iPhone Pocket Admin (On-the-Fly Edit)</span>
              </button>
              <button
                onClick={() => setIsSchemaWhitePageOpen(true)}
                className="text-[#A5D6B5] hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <SearchCode className="w-3.5 h-3.5" />
                <span>Schema.org Discovery &amp; Google Maps Sync White Paper</span>
              </button>
              <button
                onClick={() => setIsPrintableMenuOpen(true)}
                className="text-[#E6DEC8] hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <FileImage className="w-3.5 h-3.5" />
                <span>Download Printable Main &amp; Sushi Menus</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6E655B]">
          <span>© {new Date().getFullYear()} Rice, Roots &amp; Rolls. All rights reserved.</span>
          <span>1124 N Bragg Blvd, Spring Lake, NC 28390 • {businessInfo.phone}</span>
        </div>
      </footer>
    </div>
  );
}
