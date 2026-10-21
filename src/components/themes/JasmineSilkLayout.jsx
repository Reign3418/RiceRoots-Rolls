import React, { useState } from 'react';
import { useKitchen } from '../../context/KitchenContext';
import {
  Phone,
  MapPin,
  Clock,
  Navigation,
  Heart,
  Check,
  Plus,
  Search,
  Star,
  FileImage,
  ChefHat,
  SearchCode,
  Car
} from 'lucide-react';

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

  const [activeCategory, setActiveCategory] = useState('southeastSpecials');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [item.id]: false })), 1400);
  };

  const categories = [
    { key: 'southeastSpecials', label: 'Southeast & Khmer Specials' },
    { key: 'chefsSpecials', label: "Chef's Khmer Specials" },
    { key: 'squadLeaderSushi', label: 'Squad Leader Specialty Sushi' },
    { key: 'sushiStartersAndStandard', label: 'Sushi Starters & Rolls' },
    { key: 'chineseSpecials', label: 'Chinese Specials' },
    { key: 'appetizersAndDrinks', label: 'Appetizers & Drinks' },
    { key: 'all', label: 'View All 36 Dishes' }
  ];

  const getDisplayedItems = () => {
    let list = [];
    if (activeCategory === 'all') {
      Object.values(menu).forEach(cat => {
        cat.items.filter(i => !i.hidden).forEach(i => list.push({ ...i, catName: cat.categoryName }));
      });
    } else {
      const cat = menu[activeCategory];
      if (cat) {
        cat.items.filter(i => !i.hidden).forEach(i => list.push({ ...i, catName: cat.categoryName }));
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        i =>
          i.name.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }
    return list;
  };

  return (
    <div className="bg-[#FAF6EE] text-[#231F1C] w-full max-w-full overflow-x-hidden">
      {/* 1. Warm Heritage Welcome Banner */}
      <div className="bg-[#231F1C] text-[#F5F0E6] py-2 px-3 text-xs border-b border-[#3D352E]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#8C3B2B] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 font-mono-tech">
              {liveStatus.badgeText}
            </span>
            <span className="text-[#E6DEC8]">{liveStatus.topMarquee}</span>
          </div>
          <div className="flex items-center gap-3 font-mono-tech text-[11px]">
            <a href={`tel:${businessInfo.phoneRaw}`} className="text-[#E5C17B] font-bold hover:underline">
              {businessInfo.phone}
            </a>
            <span>•</span>
            <span>1124 N Bragg Blvd, Spring Lake</span>
          </div>
        </div>
      </div>

      {/* 2. Sunlit Editorial Header */}
      <header className="bg-[#FFFFFF] border-b border-[#E2D9C5] py-5 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src="./images/chef-a-food-truck.jpg"
              alt="Chef A"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-[#8C3B2B]"
            />
            <div>
              <span className="text-[#8C3B2B] text-xs font-extrabold uppercase tracking-widest block font-mono-tech">
                Chef A’s Family Kitchen &amp; Sushi Bar
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#14110F] font-serif-editorial tracking-tight leading-none mt-0.5">
                Rice, Roots &amp; Rolls
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5349] mt-1 italic font-serif-editorial">
                “From a little red food truck in Lander, Wyoming to our family table in Spring Lake, NC.”
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-2">
            <a
              href="#jasmine-menu"
              className="px-4 py-2.5 bg-[#FAF6EE] hover:bg-[#EFE7D6] border border-[#D8CEB8] text-[#231F1C] font-bold text-xs uppercase tracking-wider"
            >
              Explore Menu
            </a>
            <a
              href="#jasmine-wayfinding"
              className="px-4 py-2.5 bg-[#FAF6EE] hover:bg-[#EFE7D6] border border-[#D8CEB8] text-[#2E5A44] font-bold text-xs uppercase tracking-wider flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>1124 N Bragg Blvd</span>
            </a>
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="px-4 py-2.5 bg-[#8C3B2B] hover:bg-[#732F22] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {businessInfo.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero: The 3 Meaning Cards (RICE • ROOTS • ROLLS) Front & Center */}
      <section className="py-10 sm:py-14 px-4 max-w-7xl mx-auto space-y-10">
        <div className="bg-white border border-[#E2D9C5] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[#F5EBE6] border border-[#D9B8AE] text-[#8C3B2B] px-3 py-1 text-xs font-mono-tech font-bold uppercase">
                <Heart className="w-3.5 h-3.5 fill-[#8C3B2B]" />
                <span>Fresh Ingredients • Family Recipes • Cultured Spirit</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold text-[#14110F] font-serif-editorial leading-tight">
                Every Grain Tells a Story. <br />
                <span className="text-[#8C3B2B] italic">Every Roll is Made with Love.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#3D352E] leading-relaxed">
                {chefStoryParagraphs[1]} {chefStoryParagraphs[2]}
              </p>

              <div className="bg-[#FAF6EE] border-l-4 border-[#2E5A44] p-4 space-y-1">
                <div className="text-xs font-mono-tech uppercase text-[#2E5A44] font-bold">
                  {liveStatus.badgeText} • Today: {liveStatus.customHoursToday}
                </div>
                <p className="text-xs text-[#3D352E]">{liveStatus.headline}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={businessInfo.googleMapsShortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-[#2E5A44] hover:bg-[#234735] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Google Maps Directions</span>
                </a>
                <a
                  href={businessInfo.appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-[#FAF6EE] hover:bg-[#EFE7D6] border border-[#D8CEB8] text-[#231F1C] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-[#8C3B2B]" />
                  <span>iPhone Apple Maps</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#FAF6EE] border-2 border-[#D8CEB8] p-3 space-y-2">
                <img
                  src="./images/dining-room-interior.jpg"
                  alt="Rice, Roots & Rolls Dining Room"
                  className="w-full h-64 sm:h-72 object-cover border border-[#E2D9C5]"
                />
                <p className="text-xs text-[#5C5349] italic font-serif-editorial text-center text-sm">
                  Our serene botanical dining room at 1124 N Bragg Blvd in Spring Lake, NC.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The 3 Story Cards: Rice, Roots, Rolls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {meaningPillars.map(pillar => (
            <div key={pillar.id} className="bg-white border border-[#E2D9C5] shadow-xs flex flex-col justify-between">
              <div>
                <img src={pillar.image} alt={pillar.title} className="w-full h-60 object-cover border-b border-[#E2D9C5]" />
                <div className="p-5 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold font-serif-editorial text-[#8C3B2B] tracking-wide">
                      {pillar.title}
                    </h3>
                    <span className="text-[11px] font-mono-tech uppercase text-[#2E5A44] font-bold">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3D352E] leading-relaxed italic font-serif-editorial text-base">
                    “{pillar.quote}”
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 bg-[#FAF6EE] border-t border-[#E2D9C5] text-[11px] font-mono-tech text-[#5C5349]">
                Chef A’s Heritage • Spring Lake, NC
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Wayfinding Banner */}
      <section id="jasmine-wayfinding" className="py-6 px-4 max-w-7xl mx-auto">
        <div className="bg-[#231F1C] text-[#F5F0E6] p-6 sm:p-8 border-2 border-[#C89D54]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3D352E] pb-4 mb-5">
            <div>
              <span className="text-xs font-mono-tech uppercase text-[#C89D54] font-bold flex items-center gap-1.5">
                <Car className="w-4 h-4" />
                <span>Easy Turn-In Guide • 1124 N Bragg Blvd, Spring Lake, NC 28390</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white mt-0.5">
                How to Spot Our Storefront on N Bragg Blvd
              </h3>
            </div>
            <a
              href={businessInfo.googleMapsShortUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#C89D54] text-[#14110F] font-extrabold text-xs uppercase tracking-wider shrink-0 text-center"
            >
              Launch Turn-by-Turn GPS
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {businessInfo.wayfindingLandmarks.map((lm, i) => (
              <div key={i} className="bg-[#181512] border border-[#3D352E] p-4 space-y-1">
                <strong className="text-[#C89D54] block font-mono-tech uppercase">{lm.direction}</strong>
                <p className="text-[#D5CCC0]">{lm.cue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Warm Rice-Paper Menu Section */}
      <section id="jasmine-menu" className="py-12 px-4 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#8C3B2B] text-xs font-mono-tech font-bold uppercase tracking-widest block">
            The Family Kitchen &amp; Sushi Menu
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#14110F] font-serif-editorial">
            Explore Our Dishes &amp; Hand-Rolled Sushi
          </h2>
          <button
            onClick={() => setIsPrintableMenuOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E5A44] hover:underline cursor-pointer"
          >
            <FileImage className="w-4 h-4" />
            <span>View Original Printable Menu Boards</span>
          </button>
        </div>

        {/* Search + Category Tabs */}
        <div className="space-y-4">
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search dishes or sushi rolls..."
              className="w-full bg-white border border-[#D8CEB8] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#231F1C]"
            />
          </div>

          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-none text-xs font-bold transition cursor-pointer border whitespace-nowrap shrink-0 ${
                  activeCategory === cat.key
                    ? 'bg-[#8C3B2B] text-white border-[#8C3B2B]'
                    : 'bg-white text-[#3D352E] hover:bg-[#F3EDE0] border-[#E2D9C5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getDisplayedItems().map(item => {
            const isUnavailable =
              !item.inStock ||
              (item.isWok && !liveStatus.wokOpen) ||
              (item.isSushi && !liveStatus.sushiOpen);
            const isAdded = addedIds[item.id];

            return (
              <div
                key={item.id}
                className={`bg-white border p-5 flex flex-col justify-between transition ${
                  isUnavailable
                    ? 'border-[#E2D9C5] opacity-60'
                    : 'border-[#E2D9C5] hover:border-[#8C3B2B]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 border-b border-[#F2ECE1] pb-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono-tech uppercase text-[#2E5A44] font-bold block">
                        {item.badge || item.catName}
                      </span>
                      <h4 className="font-bold text-[#14110F] text-lg font-serif-editorial">
                        {item.name}
                      </h4>
                    </div>
                    <span className="text-base font-bold text-[#8C3B2B] font-mono-tech shrink-0">
                      {isUnavailable ? 'SOLD OUT' : item.price}
                    </span>
                  </div>
                  {item.extraOption && (
                    <p className="text-xs text-[#9A6B2F] font-semibold mb-1">{item.extraOption}</p>
                  )}
                  <p className="text-xs text-[#5C5349] leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                  <span className="text-[#8C8275] italic">Made fresh to order</span>
                  <button
                    onClick={() => handleAdd(item)}
                    disabled={isUnavailable}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer ${
                      isUnavailable
                        ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                        : isAdded
                        ? 'bg-[#2E5A44] text-white'
                        : 'bg-[#8C3B2B] hover:bg-[#732F22] text-white'
                    }`}
                  >
                    {isAdded ? '✓ Added' : isUnavailable ? 'Sold Out' : '+ Add to Order'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Reviews & Footer */}
      <section className="py-12 bg-[#F3EDE0] border-t border-[#E2D9C5] px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <h3 className="text-3xl font-bold font-serif-editorial text-center text-[#14110F]">
            5-Star Love from Our Guests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerReviews.map(r => (
              <div key={r.id} className="bg-white border border-[#E2D9C5] p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[#C89D54] text-xs font-bold mb-1">★★★★★ {r.date}</div>
                  <p className="text-xs text-[#3D352E] italic">“{r.quote}”</p>
                </div>
                <div className="text-xs font-bold text-[#14110F] border-t border-[#F2ECE1] pt-2">
                  {r.author} • <span className="font-normal text-[#5C5349]">{r.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#231F1C] text-[#D5CCC0] py-10 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white font-serif-editorial text-lg block">
              Rice, Roots &amp; Rolls — An Asian Kitchen
            </strong>
            <span>1124 N Bragg Blvd, Spring Lake, NC 28390 • {businessInfo.phone}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsChefAdminOpen(true)}
              className="text-[#E5C17B] hover:underline cursor-pointer font-bold"
            >
              👩‍🍳 Chef A iPhone Edit
            </button>
            <button
              onClick={() => setIsSchemaWhitePageOpen(true)}
              className="text-[#A5D6B5] hover:underline cursor-pointer font-bold"
            >
              🔍 Schema.org &amp; Google Sync Brief
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
