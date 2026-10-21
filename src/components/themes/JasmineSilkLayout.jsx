import React, { useState } from 'react';
import { useKitchen } from '../../context/KitchenContext';
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
  Compass,
  Car,
  ArrowUpRight
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

export default function JasmineSilkLayout() {
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

  const handleAdd = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [item.id]: false })), 1300);
  };

  const categories = [
    { key: 'all', label: 'Complete Menu (36)' },
    { key: 'southeastSpecials', label: 'Khmer Specials' },
    { key: 'chefsSpecials', label: "Chef's Traditions" },
    { key: 'squadLeaderSushi', label: 'Squad Leader Rolls' },
    { key: 'sushiStarters', label: 'Crudo & Sushi Apps' },
    { key: 'classicRolls', label: 'Classic Rolls' },
    { key: 'startersAndSides', label: 'Crispy Starters' },
    { key: 'soups', label: 'Soups' },
    { key: 'chineseFavorites', label: 'Wok Classics' }
  ];

  const visibleSpecials = specials.filter(s => !s.hidden);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1815] selection:bg-[#9E4734] selection:text-white overflow-x-hidden">
      {/* Live Status Sunlit Pill Banner */}
      <div className="pt-3 px-4">
        <div className="max-w-6xl mx-auto rounded-full bg-[#EFEAE1] border border-[#E2D9C8] px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#3D352E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3A5A40] animate-ping" />
            <span className="font-bold text-[#1C1815]">{liveStatus.badgeText}</span>
            <span className="hidden md:inline text-[#6E6358]">• {liveStatus.headline}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[#6E6358]">{liveStatus.customHoursToday}</span>
            <button
              onClick={() => setIsChefAdminOpen(true)}
              className="font-semibold text-[#9E4734] hover:underline cursor-pointer"
            >
              Chef A Live Hours
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sunlit Alabaster Header Pill */}
      <header className="sticky top-3 z-40 px-4 mt-3">
        <div className="max-w-6xl mx-auto rounded-full bg-white/85 backdrop-blur-2xl border border-[#E6DEC8] px-6 py-3.5 shadow-[0_15px_40px_rgba(28,24,21,0.06)] flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9E4734] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              R
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#1C1815] block leading-none">
                Rice, Roots &amp; Rolls
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E4734] font-semibold block mt-1">
                An Asian Kitchen • Spring Lake, NC
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 bg-[#F4EFE6] rounded-full p-1 text-xs font-medium text-[#5C5248]">
            <a href="#signatures" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1C1815] transition">
              Signatures
            </a>
            <a href="#menu" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1C1815] transition">
              Full Menu
            </a>
            <a href="#atelier-story" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1C1815] transition">
              Our Story
            </a>
            <a href="#visit" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1C1815] transition">
              Find Us on Bragg Blvd
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrintableMenuOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F4EFE6] hover:bg-[#EAE2D3] text-[#1C1815] text-xs font-semibold transition cursor-pointer"
            >
              <FileImage className="w-3.5 h-3.5 text-[#9E4734]" />
              <span>Menu Boards</span>
            </button>
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#9E4734] hover:bg-[#873B2B] text-white font-bold text-xs shadow-md shadow-[#9E4734]/20 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{businessInfo.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* KINFOLK MAGAZINE EDITORIAL HERO */}
      <section id="top" className="max-w-6xl mx-auto px-4 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2ECE1] text-[#9E4734] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Ingredients • Family Recipes • 1124 N Bragg Blvd</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#1C1815] leading-[1.04] tracking-tight">
              Warm jasmine rice,{' '}
              <span className="italic font-normal text-[#9E4734]">Khmer heritage</span> &amp; hand-rolled sushi.
            </h1>

            <p className="text-[#5C5248] text-base sm:text-lg leading-relaxed">
              {businessInfo.heroDescription} From our humble beginnings in Lander, Wyoming’s <em className="text-[#1C1815]">Far East Foodie</em> truck to our serene botanical dining room in Spring Lake, NC.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="px-7 py-3.5 rounded-full bg-[#1C1815] hover:bg-[#9E4734] text-white font-bold text-sm transition shadow-lg inline-flex items-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>Browse Full Menu (36 Dishes)</span>
              </a>
              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F2ECE1] border border-[#E2D9C8] text-[#1C1815] font-semibold text-sm transition inline-flex items-center gap-2 shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#9E4734]" />
                <span>Directions to 1124 N Bragg Blvd</span>
              </a>
            </div>
          </div>

          {/* Right Editorial Photo & Cutout Collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7 rounded-[2rem] bg-white p-4 shadow-[0_25px_60px_rgba(28,24,21,0.08)] border border-[#EFE8DC]">
              <img
                src="./images/dining-room-interior.jpg"
                alt="Serene botanical dining room at Rice, Roots & Rolls"
                className="w-full h-72 sm:h-80 object-cover rounded-3xl"
              />
              <div className="pt-3 px-2 flex items-center justify-between">
                <div>
                  <div className="font-serif text-base font-bold text-[#1C1815]">
                    Our Spring Lake Sanctuary
                  </div>
                  <div className="text-xs text-[#786D61]">1124 N Bragg Blvd • Dine-In &amp; Takeout</div>
                </div>
                <span className="text-xs font-bold text-[#3A5A40] bg-[#E8F0E8] px-3 py-1 rounded-full">
                  5.0 ★
                </span>
              </div>
            </div>

            <div className="col-span-5 space-y-4">
              <div className="rounded-3xl bg-[#F2ECE1] p-4 text-center shadow-sm">
                <img
                  src="./images/khmer-crudo-cutout.png"
                  alt="Khmer Salmon Crudo"
                  className="w-32 h-32 object-contain mx-auto drop-shadow-xl"
                />
                <div className="font-serif text-sm font-bold text-[#1C1815] mt-2">Khmer Crudo</div>
                <div className="text-[11px] text-[#9E4734] font-semibold">$13.50</div>
              </div>

              <div className="rounded-3xl bg-white p-4 text-center shadow-[0_15px_35px_rgba(28,24,21,0.06)] border border-[#EFE8DC]">
                <img
                  src="./images/rainbow-roll-cutout.png"
                  alt="Rainbow Sushi Roll"
                  className="w-32 h-28 object-contain mx-auto drop-shadow-xl"
                />
                <div className="font-serif text-sm font-bold text-[#1C1815] mt-2">Fresh Sushi Bar</div>
                <div className="text-[11px] text-[#6E6358]">Rolled to Order</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUNLIT SIGNATURE DISH GALLERY */}
      <section id="signatures" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E4734] block mb-1.5">
              Chef A’s Curated Table
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1815]">
              House Signatures &amp; Local Favorites
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6358] max-w-md">
            Prepared from scratch with fresh lemongrass kreung, house-pickled vegetables, and sashimi-grade fish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleSpecials.map(item => {
            const isAdded = addedIds[item.id];
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-white border border-[#EDE5D8] p-4 shadow-[0_20px_50px_rgba(28,24,21,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-[#F5F0E6] mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#9E4734]">
                      {item.badge}
                    </span>
                  </div>

                  <div className="px-1">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-serif text-lg font-bold text-[#1C1815] leading-snug">
                        {item.title}
                      </h3>
                      <span className="font-serif text-base font-bold text-[#9E4734] shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6358] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

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
                  className={`mt-4 w-full py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    !item.inStock
                      ? 'bg-[#F2ECE1] text-[#A59B8F] cursor-not-allowed'
                      : isAdded
                      ? 'bg-[#3A5A40] text-white'
                      : 'bg-[#F4EFE6] hover:bg-[#9E4734] text-[#1C1815] hover:text-white'
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
            );
          })}
        </div>
      </section>

      {/* EDITORIAL RICE-PAPER MENU SPREAD */}
      <section id="menu" className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-[2.5rem] bg-white border border-[#EAE0D0] p-6 sm:p-12 shadow-[0_25px_70px_rgba(28,24,21,0.06)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#EFE8DC]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E4734] block mb-2">
                Spring Lake Culinary Index
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1815]">
                Complete Kitchen &amp; Sushi Menu
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-[#8C8073] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search any dish or sushi roll..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#1C1815] placeholder-[#8C8073] focus:outline-none focus:border-[#9E4734]"
                />
              </div>
              <button
                onClick={() => setIsPrintableMenuOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#F4EFE6] hover:bg-[#E8DFD1] text-[#1C1815] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <FileImage className="w-3.5 h-3.5 text-[#9E4734]" />
                <span>Official Menu Boards</span>
              </button>
            </div>
          </div>

          {/* Pill Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-6">
            {categories.map(cat => {
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? 'bg-[#9E4734] text-white font-bold shadow-sm'
                      : 'bg-[#FAF7F2] hover:bg-[#F0E9DC] text-[#5C5248]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Menu Categories */}
          <div className="space-y-12 mt-2">
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
                <div key={catKey} className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EFE8DC] pb-3">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#1C1815]">
                        {categoryObj.categoryName}
                      </h3>
                      <p className="text-xs text-[#6E6358] mt-0.5">{categoryObj.tagline}</p>
                    </div>
                    {categoryObj.note && (
                      <span className="text-xs italic text-[#9E4734]">{categoryObj.note}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map(item => {
                      const isAdded = addedIds[item.id];
                      const thumb = DISH_THUMBNAILS[item.id];
                      const available = item.inStock;

                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#EDE4D5] p-4 sm:p-5 transition flex items-start justify-between gap-4"
                        >
                          {thumb && (
                            <img
                              src={thumb}
                              alt={item.name}
                              className="w-20 h-20 rounded-2xl object-cover shrink-0 hidden sm:block"
                            />
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1815]">
                                {item.name}
                              </h4>
                              {item.badge && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#9E4734]/10 text-[#9E4734] text-[10px] font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-[#5C5248] leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            {item.extraOption && (
                              <p className="text-[11px] text-[#3A5A40] font-semibold mt-1.5">
                                + {item.extraOption}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                            <span className="font-serif text-base sm:text-lg font-bold text-[#9E4734]">
                              {item.price}
                            </span>
                            <button
                              disabled={!available}
                              onClick={() => handleAdd(item)}
                              className={`mt-3 w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer ${
                                !available
                                  ? 'bg-[#E6DEC8] text-[#9E9488] cursor-not-allowed'
                                  : isAdded
                                  ? 'bg-[#3A5A40] text-white'
                                  : 'bg-white hover:bg-[#9E4734] text-[#1C1815] hover:text-white border border-[#E2D9C8]'
                              }`}
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

      {/* MAGAZINE SPREAD: RICE • ROOTS • ROLLS & CHEF A */}
      <section id="atelier-story" className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E4734] block mb-2">
            Family Heritage &amp; Meaning
          </span>
          <h2 className="font-serif text-4xl font-bold text-[#1C1815]">
            Rice • Roots • Rolls
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {meaningPillars.map(pillar => (
            <div
              key={pillar.id}
              className="rounded-3xl bg-white border border-[#EAE0D0] overflow-hidden shadow-[0_20px_50px_rgba(28,24,21,0.05)] flex flex-col justify-between"
            >
              <div>
                <img src={pillar.image} alt={pillar.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#9E4734]">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1815] mt-1 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed italic">
                    “{pillar.quote}”
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 text-[11px] font-semibold text-[#8C8073]">
                — Chef A (Leakhena Ouk-Hester)
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRAGG BLVD WAYFINDING & VISIT CARD */}
      <section id="visit" className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-[2.25rem] bg-[#F2ECE1] border border-[#E2D9C8] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3A5A40]">
              Easy Bragg Blvd Wayfinding
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1C1815]">
              Visit Us at 1124 N Bragg Blvd
            </h2>
            <div className="space-y-2.5">
              {businessInfo.wayfindingLandmarks.map((w, i) => (
                <div key={i} className="rounded-2xl bg-white/80 p-4 border border-[#E5DEC9]">
                  <div className="text-xs font-bold text-[#1C1815]">{w.direction}</div>
                  <div className="text-xs text-[#5C5248] mt-1">{w.cue}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-white p-6 border border-[#E5DEC9] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1C1815]">Kitchen Hours &amp; GPS</h3>
            {businessInfo.hoursSchedule.map((h, i) => (
              <div key={i} className="flex justify-between text-xs py-2 border-b border-[#F2ECE1]">
                <span className="text-[#5C5248]">{h.days}</span>
                <span className="font-bold text-[#1C1815]">{h.hours}</span>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={businessInfo.appleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-full bg-[#1C1815] text-white text-xs font-bold text-center"
              >
                Apple Maps
              </a>
              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-full bg-[#9E4734] text-white text-xs font-bold text-center"
              >
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E6DEC8] bg-[#F4EFE6] py-10 px-4 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6358]">
          <div>
            <strong className="text-[#1C1815]">Rice, Roots &amp; Rolls – An Asian Kitchen</strong> • {businessInfo.address} • {businessInfo.phone}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsChefAdminOpen(true)}
              className="px-4 py-2 rounded-full bg-white border border-[#E2D9C8] text-[#9E4734] font-semibold cursor-pointer"
            >
              Chef A Pocket Admin
            </button>
            <button
              onClick={() => setIsSchemaWhitePageOpen(true)}
              className="px-4 py-2 rounded-full bg-white border border-[#E2D9C8] text-[#1C1815] cursor-pointer"
            >
              SEO &amp; Schema White Paper
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
