import React, { useState } from 'react';
import { useKitchen } from '../context/KitchenContext';
import {
  Phone,
  MapPin,
  Navigation,
  Utensils,
  Heart,
  Sparkles,
  Plus,
  Check,
  Search,
  Clock,
  ChefHat,
  ShoppingBag,
  FileImage,
  Star,
  Car,
  Compass,
  Flame,
  Fish,
  X
} from 'lucide-react';

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

export default function MobileAppView() {
  const {
    themeVersion,
    setThemeVersion,
    businessInfo,
    meaningPillars,
    chefStoryParagraphs,
    customerReviews,
    cateringGallery,
    menu,
    specials,
    liveStatus,
    addToCart,
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    setIsChefAdminOpen,
    setIsPrintableMenuOpen,
    setIsSchemaWhitePageOpen
  } = useKitchen();

  // Main Mobile Bottom Tab: 'menu' | 'find' | 'story' | 'catering'
  const [activeTab, setActiveTab] = useState('menu');

  // Default to Khmer Specials so mobile users see a clean, short list immediately, with 'all' right next to it
  const [activeCategory, setActiveCategory] = useState('southeastSpecials');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [addedIds, setAddedIds] = useState({});

  // Catering state
  const [guestCount, setGuestCount] = useState(25);
  const [selectedPackages, setSelectedPackages] = useState(['cat_eggrolls', 'cat_buffet']);
  const [cateringName, setCateringName] = useState('');

  const handleAdd = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [item.id]: false })), 1200);
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
    const msg = `Hi Chef A! Catering inquiry for Rice, Roots & Rolls:\n• Name: ${cateringName || 'Guest'}\n• Headcount: ${guestCount} guests\n• Platters: ${chosenNames}\n• Est. Budget: ~$${estimatedCateringTotal.toFixed(0)}`;
    window.open(`sms:${businessInfo.phoneRaw}?&body=${encodeURIComponent(msg)}`, '_blank');
  };

  // Theme-adaptive tokens (01 Dark Velvet, 02 Light Rice Paper, 03 Omakase Slate)
  const isLight = themeVersion === 'jasmine';
  const isSlate = themeVersion === 'craftboard';

  const bgMain = isLight
    ? 'bg-[#FAF7F2] text-[#1C1815]'
    : isSlate
    ? 'bg-[#121614] text-[#F2EFE9]'
    : 'bg-[#0F0D0B] text-[#F5EFE6]';

  const bgHeader = isLight
    ? 'bg-[#FAF7F2]/90 border-[#E6DEC8]'
    : isSlate
    ? 'bg-[#121614]/90 border-white/10'
    : 'bg-[#0F0D0B]/90 border-white/10';

  const bgCard = isLight
    ? 'bg-white border-[#EAE0D0] shadow-[0_8px_24px_rgba(28,24,21,0.05)]'
    : isSlate
    ? 'bg-[#1A201D] border-white/10'
    : 'bg-[#181512] border-white/10';

  const bgSubtle = isLight
    ? 'bg-[#F2ECE1] text-[#5C5248]'
    : isSlate
    ? 'bg-white/[0.06] text-[#A3B0A8]'
    : 'bg-white/[0.06] text-[#B5ABA0]';

  const textMuted = isLight ? 'text-[#6E6358]' : isSlate ? 'text-[#95A39B]' : 'text-[#A59B8F]';
  const accentBg = isLight
    ? 'bg-[#9E4734] text-white'
    : isSlate
    ? 'bg-[#D4A359] text-[#121614]'
    : 'bg-[#C89D54] text-[#120F0D]';
  const accentText = isLight ? 'text-[#9E4734]' : isSlate ? 'text-[#D4A359]' : 'text-[#C89D54]';

  const categories = [
    { key: 'southeastSpecials', label: 'Khmer Specials' },
    { key: 'squadLeaderSushi', label: 'Specialty Rolls' },
    { key: 'classicRolls', label: 'Classic Sushi' },
    { key: 'sushiStarters', label: 'Crudo & Apps' },
    { key: 'chefsSpecials', label: "Chef's Khmer" },
    { key: 'startersAndSides', label: 'Egg Rolls & Sides' },
    { key: 'chineseFavorites', label: 'Wok Classics' },
    { key: 'soups', label: 'Soups' },
    { key: 'all', label: 'All (36)' }
  ];

  const visibleSpecials = specials.filter(s => !s.hidden);

  return (
    <div className={`min-h-screen flex flex-col pb-28 ${bgMain}`}>
      {/* ================================================================= */}
      {/* MINIMAL STICKY TOP BAR (BRAND + 1-TAP CONCEPT SWITCHER + ADMIN)   */}
      {/* ================================================================= */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b px-4 py-3 ${bgHeader}`}>
        <div className="flex items-center justify-between gap-2">
          {/* Brand Title & Live Open Dot */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm shrink-0 ${accentBg}`}>
              R
            </div>
            <div className="truncate">
              <div className="font-serif text-base font-bold leading-tight truncate">
                Rice, Roots &amp; Rolls
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
                <span className={`truncate ${textMuted}`}>1124 N Bragg Blvd</span>
              </div>
            </div>
          </div>

          {/* Right Controls: 1-Tap Style Switcher (01 | 02 | 03) + Search + Chef */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className={`flex items-center rounded-full p-0.5 border ${isLight ? 'bg-[#EFE9DE] border-[#E0D6C3]' : 'bg-white/5 border-white/10'}`}>
              {[
                { id: 'sanctuary', label: '01' },
                { id: 'jasmine', label: '02' },
                { id: 'craftboard', label: '03' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setThemeVersion(t.id)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold transition ${
                    themeVersion === t.id ? accentBg : textMuted
                  }`}
                  title={`Switch to Concept ${t.label}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'menu' && (
              <button
                onClick={() => setShowSearch(prev => !prev)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                  isLight ? 'bg-white border-[#E2D9C8]' : 'bg-white/8 border-white/10'
                }`}
                aria-label="Search menu"
              >
                {showSearch ? <X className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={() => setIsChefAdminOpen(true)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                isLight ? 'bg-white border-[#E2D9C8]' : 'bg-white/8 border-white/10'
              }`}
              aria-label="Chef A Pocket Admin"
            >
              <ChefHat className={`w-3.5 h-3.5 ${accentText}`} />
            </button>
          </div>
        </div>

        {/* Collapsible Instant Search Bar */}
        {activeTab === 'menu' && showSearch && (
          <div className="pt-2.5">
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) setActiveCategory('all');
                }}
                placeholder="Search pho, cowboy roll, curry, gyoza..."
                className={`w-full pl-9 pr-8 py-2 rounded-full text-xs border focus:outline-none ${
                  isLight
                    ? 'bg-white border-[#D8CBB8] text-[#1C1815]'
                    : 'bg-black/40 border-white/15 text-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] opacity-70"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sticky Horizontal Category Pills (Only on Menu Tab) */}
        {activeTab === 'menu' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 -mx-4 px-4">
            {categories.map(cat => {
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    active ? `${accentBg} font-bold shadow-xs` : bgSubtle
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ================================================================= */}
      {/* TAB 1: MINIMAL, THUMB-FRIENDLY MENU VIEW                          */}
      {/* ================================================================= */}
      {activeTab === 'menu' && (
        <main className="px-4 pt-3 space-y-5">
          {/* Compact Hero Card with 1-Tap Call & Directions */}
          <div className={`rounded-3xl p-4 border ${bgCard}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${accentText}`}>
                  Cambodian Kitchen &amp; Sushi Bar
                </span>
                <h1 className="font-serif text-xl font-bold leading-snug">
                  Fresh family recipes, rolled &amp; wok-fired to order.
                </h1>
                <p className={`text-xs ${textMuted}`}>
                  {liveStatus.customHoursToday}
                </p>
              </div>
              <img
                src="./images/hero-khmer-beef.png"
                alt="Khmer Specialty"
                className="w-20 h-20 object-contain drop-shadow-xl shrink-0"
              />
            </div>

            {/* Quick Action Pills */}
            <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-current/10">
              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className={`py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 ${accentBg}`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className={`py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 ${bgSubtle}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {businessInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Horizontal Swipeable Chef Signatures Strip */}
          {!searchQuery && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-0.5">
                <h2 className="font-serif text-base font-bold">Chef A’s Signatures</h2>
                <span className={`text-[11px] ${textMuted}`}>Swipe →</span>
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-1 -mx-4 px-4">
                {visibleSpecials.map(item => {
                  const isAdded = addedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`snap-start shrink-0 w-[230px] rounded-2xl p-3 border flex flex-col justify-between ${bgCard}`}
                    >
                      <div>
                        <div className="relative h-28 rounded-xl overflow-hidden mb-2.5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[9px] font-bold text-[#E5C17B]">
                            {item.badge}
                          </span>
                        </div>
                        <div className="font-serif text-sm font-bold leading-snug line-clamp-1">
                          {item.title}
                        </div>
                        <p className={`text-[11px] line-clamp-2 mt-0.5 ${textMuted}`}>
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-current/10">
                        <span className={`font-serif text-sm font-bold ${accentText}`}>
                          {item.price}
                        </span>
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
                          className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                            isAdded ? 'bg-[#4A7C59] text-white' : accentBg
                          }`}
                        >
                          {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          <span>{isAdded ? 'Added' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Category Dish List (Compact, Minimal, Fast) */}
          <div className="space-y-5">
            {Object.entries(menu).map(([catKey, categoryObj]) => {
              if (activeCategory !== 'all' && activeCategory !== catKey) return null;

              const filteredItems = (categoryObj.items || []).filter(item => {
                if (item.hidden) return false;
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase();
                return (
                  item.name.toLowerCase().includes(q) ||
                  (item.description && item.description.toLowerCase().includes(q))
                );
              });

              if (filteredItems.length === 0) return null;

              return (
                <div key={catKey} className="space-y-2.5">
                  <div className="px-0.5">
                    <h3 className="font-serif text-lg font-bold">{categoryObj.categoryName}</h3>
                    <p className={`text-[11px] ${textMuted}`}>{categoryObj.tagline}</p>
                  </div>

                  <div className="space-y-2">
                    {filteredItems.map(item => {
                      const isAdded = addedIds[item.id];
                      const thumb = DISH_THUMBNAILS[item.id];
                      const available = item.inStock;

                      return (
                        <div
                          key={item.id}
                          className={`rounded-2xl p-3.5 border flex items-center justify-between gap-3 ${bgCard}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-serif text-sm font-bold leading-snug">
                                {item.name}
                              </h4>
                              {item.badge && (
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${bgSubtle}`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            {item.description && (
                              <p className={`text-[11px] line-clamp-2 mt-1 leading-relaxed ${textMuted}`}>
                                {item.description}
                              </p>
                            )}

                            <div className="flex items-center gap-2 mt-1.5">
                              <span className={`font-serif text-sm font-bold ${accentText}`}>
                                {item.price}
                              </span>
                              {item.extraOption && (
                                <span className={`text-[10px] ${textMuted}`}>
                                  • {item.extraOption}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right Thumbnail + Circular Add Button */}
                          <div className="flex items-center gap-2 shrink-0">
                            {thumb && (
                              <img
                                src={thumb}
                                alt={item.name}
                                className="w-14 h-14 rounded-xl object-cover"
                              />
                            )}
                            <button
                              disabled={!available}
                              onClick={() => handleAdd(item)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                                !available
                                  ? 'opacity-30 cursor-not-allowed bg-gray-500/20'
                                  : isAdded
                                  ? 'bg-[#4A7C59] text-white'
                                  : accentBg
                              }`}
                              aria-label={`Add ${item.name}`}
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

          {/* Quick Button to View Official High-Res Menu Boards */}
          <button
            onClick={() => setIsPrintableMenuOpen(true)}
            className={`w-full py-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 ${bgCard}`}
          >
            <FileImage className={`w-4 h-4 ${accentText}`} />
            <span>View Official Printed Menu Boards</span>
          </button>
        </main>
      )}

      {/* ================================================================= */}
      {/* TAB 2: FIND US (1124 N BRAGG BLVD WAYFINDING & LIVE HOURS)        */}
      {/* ================================================================= */}
      {activeTab === 'find' && (
        <main className="px-4 pt-4 space-y-4">
          <div className={`rounded-3xl p-5 border space-y-4 ${bgCard}`}>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${accentText}`}>
                5 Minutes from Fort Bragg Gates
              </span>
              <h1 className="font-serif text-2xl font-bold mt-0.5">
                1124 N Bragg Blvd
              </h1>
              <p className={`text-xs ${textMuted}`}>
                Spring Lake, NC 28390 • Dedicated Front Parking
              </p>
            </div>

            {/* 1-Tap GPS App Buttons */}
            <div className="grid grid-cols-1 gap-2.5">
              <a
                href={businessInfo.appleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 ${accentBg}`}
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Apple Maps</span>
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 ${bgSubtle}`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={businessInfo.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 ${bgSubtle}`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Launch Waze</span>
                </a>
              </div>
            </div>
          </div>

          {/* Kitchen Hours Card */}
          <div className={`rounded-3xl p-5 border space-y-3 ${bgCard}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${accentText}`} />
                <h2 className="font-serif text-base font-bold">Kitchen Hours</h2>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#4A7C59]/20 text-[#52B788] font-bold">
                {liveStatus.badgeText}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {businessInfo.hoursSchedule.map((row, idx) => (
                <div key={idx} className="flex justify-between py-1.5 border-b border-current/10 last:border-none">
                  <span className={textMuted}>{row.days}</span>
                  <span className="font-bold">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Turn-by-Turn Bragg Blvd Approach Cues */}
          <div className={`rounded-3xl p-5 border space-y-3 ${bgCard}`}>
            <div className="flex items-center gap-2">
              <Compass className={`w-4 h-4 ${accentText}`} />
              <h2 className="font-serif text-base font-bold">Don’t Miss Our Turn</h2>
            </div>
            <div className="space-y-2.5">
              {businessInfo.wayfindingLandmarks.map((w, i) => (
                <div key={i} className={`rounded-2xl p-3.5 text-xs ${bgSubtle}`}>
                  <div className="font-bold mb-1">{w.direction}</div>
                  <p className="opacity-85 leading-relaxed">{w.cue}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ================================================================= */}
      {/* TAB 3: OUR STORY (CHEF A & RICE • ROOTS • ROLLS)                  */}
      {/* ================================================================= */}
      {activeTab === 'story' && (
        <main className="px-4 pt-4 space-y-4">
          {/* Chef A Hero Story Card */}
          <div className={`rounded-3xl overflow-hidden border ${bgCard}`}>
            <img
              src="./images/chef-a-food-truck.jpg"
              alt="Chef A in front of Far East Foodie red truck"
              className="w-full h-52 object-cover"
            />
            <div className="p-5 space-y-2.5">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${accentText}`}>
                Meet Chef A • Leakhena Ouk-Hester
              </span>
              <h1 className="font-serif text-2xl font-bold leading-snug">
                From a little red truck in Wyoming to Spring Lake, NC.
              </h1>
              <p className={`text-xs leading-relaxed ${textMuted}`}>
                {chefStoryParagraphs[2]}
              </p>
              <p className={`text-xs leading-relaxed ${textMuted}`}>
                {chefStoryParagraphs[3]}
              </p>
            </div>
          </div>

          {/* RICE • ROOTS • ROLLS Meaning Cards */}
          <div className="space-y-3">
            {meaningPillars.map(pillar => (
              <div
                key={pillar.id}
                className={`rounded-3xl p-4 border flex items-start gap-3.5 ${bgCard}`}
              >
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-20 h-24 rounded-2xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${accentText}`}>
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold">{pillar.title}</h3>
                  <p className={`text-xs mt-1 leading-relaxed line-clamp-4 ${textMuted}`}>
                    “{pillar.quote}”
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 5-Star Guest Reviews */}
          <div className="space-y-2.5">
            <h2 className="font-serif text-lg font-bold px-1">5-Star Neighbor Reviews</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-2 -mx-4 px-4">
              {customerReviews.map(rev => (
                <div
                  key={rev.id}
                  className={`snap-start shrink-0 w-[260px] rounded-2xl p-4 border flex flex-col justify-between ${bgCard}`}
                >
                  <div className="space-y-2">
                    <div className={`flex gap-0.5 ${accentText}`}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs font-bold">{rev.highlight}</div>
                    <p className={`text-xs line-clamp-4 leading-relaxed ${textMuted}`}>
                      “{rev.quote}”
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-current/10 text-[11px] font-bold">
                    {rev.author} • <span className="font-normal opacity-75">{rev.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ================================================================= */}
      {/* TAB 4: CATERING & PARTY TRAYS                                     */}
      {/* ================================================================= */}
      {activeTab === 'catering' && (
        <main className="px-4 pt-4 space-y-4">
          <div className={`rounded-3xl p-5 border space-y-4 ${bgCard}`}>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${accentText}`}>
                Fort Bragg Events &amp; Family Gatherings
              </span>
              <h1 className="font-serif text-2xl font-bold mt-0.5">
                Roots Catering Estimator
              </h1>
              <p className={`text-xs mt-1 ${textMuted}`}>
                Tap platters below to estimate your event and text Chef A directly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {cateringGallery.map(pkg => {
                const selected = selectedPackages.includes(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    onClick={() => togglePackage(pkg.id)}
                    className={`rounded-2xl overflow-hidden border p-2.5 flex flex-col justify-between cursor-pointer transition ${
                      selected ? 'border-[#C89D54] ring-1 ring-[#C89D54]' : 'border-current/10 opacity-80'
                    }`}
                  >
                    <div>
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-24 rounded-xl object-cover mb-2"
                      />
                      <div className="font-serif text-xs font-bold leading-snug">{pkg.title}</div>
                      <div className={`text-[10px] mt-0.5 ${accentText}`}>
                        ${pkg.pricePerPerson.toFixed(2)} / guest
                      </div>
                    </div>
                    <div
                      className={`mt-2 py-1 rounded-full text-[10px] font-bold text-center ${
                        selected ? accentBg : bgSubtle
                      }`}
                    >
                      {selected ? '✓ Selected' : '+ Select'}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendCateringSms} className="space-y-3 pt-2 border-t border-current/10">
              <div className="flex items-center justify-between text-xs">
                <span className={textMuted}>Headcount: <strong className="text-current">{guestCount} guests</strong></span>
                <span className={`font-serif text-lg font-bold ${accentText}`}>
                  Est. ~${estimatedCateringTotal.toFixed(0)}
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#C89D54]"
              />

              <input
                type="text"
                placeholder="Your Name or Unit"
                value={cateringName}
                onChange={e => setCateringName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-full text-xs border ${
                  isLight ? 'bg-[#FAF7F2] border-[#E0D6C3]' : 'bg-black/30 border-white/15'
                }`}
              />

              <button
                type="submit"
                className={`w-full py-3 rounded-full text-xs font-bold ${accentBg}`}
              >
                Text Catering Quote to Chef A
              </button>
            </form>
          </div>

          <button
            onClick={() => setIsSchemaWhitePageOpen(true)}
            className={`w-full py-3 rounded-2xl border text-xs font-semibold ${bgCard}`}
          >
            View Google Maps &amp; SEO Discovery Architecture
          </button>
        </main>
      )}

      {/* ================================================================= */}
      {/* FLOATING ORDER BAG BAR (ABOVE BOTTOM TAB BAR WHEN ITEMS ADDED)    */}
      {/* ================================================================= */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className={`w-full py-3.5 px-5 rounded-full font-bold text-xs flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${accentBg}`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>View Order Bag ({cartItemCount} {cartItemCount === 1 ? 'dish' : 'dishes'})</span>
            </div>
            <span className="font-serif text-sm font-extrabold">
              ${cartTotal.toFixed(2)} →
            </span>
          </button>
        </div>
      )}

      {/* ================================================================= */}
      {/* NATIVE iOS 4-TAB BOTTOM NAVIGATION BAR                            */}
      {/* ================================================================= */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-2xl px-2 py-1.5 flex items-center justify-around ${
          isLight
            ? 'bg-white/95 border-[#E6DEC8] text-[#6E6358]'
            : 'bg-[#14110F]/95 border-white/10 text-[#9E9488]'
        }`}
      >
        {[
          { id: 'menu', label: 'Menu', icon: Utensils },
          { id: 'find', label: 'Find Us', icon: MapPin },
          { id: 'story', label: 'Our Story', icon: Heart },
          { id: 'catering', label: 'Catering', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition ${
                active ? accentText : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
