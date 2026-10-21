import React, { useState } from 'react';
import { useKitchen } from '../../context/KitchenContext';
import {
  Phone,
  MapPin,
  Navigation,
  Check,
  Plus,
  Image as ImageIcon,
  UtensilsCrossed,
  Fish,
  Heart,
  ChefHat,
  SearchCode
} from 'lucide-react';

export default function SushiCraftBoardLayout() {
  const {
    businessInfo,
    meaningPillars,
    chefStoryParagraphs,
    cateringGallery,
    menu,
    liveStatus,
    addToCart,
    setIsChefAdminOpen,
    setIsSchemaWhitePageOpen
  } = useKitchen();

  const [activeBoard, setActiveBoard] = useState('dualBoard'); // 'dualBoard' | 'storyPhotos' | 'originalBoards'
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [item.id]: false })), 1400);
  };

  return (
    <div className="bg-[#161917] text-[#F4F1EA] min-h-screen w-full max-w-full overflow-x-hidden">
      {/* 1. Top Nori Slate Bar */}
      <div className="bg-[#0F1210] border-b border-[#2A312D] py-2 px-3 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-[#D4AF37] uppercase font-bold text-[11px] bg-[#1F2622] px-2 py-0.5 border border-[#D4AF37]/40">
              {liveStatus.badgeText}
            </span>
            <span className="text-[#CBD2CE]">{liveStatus.headline}</span>
          </div>
          <div className="flex items-center gap-3 font-mono-tech text-xs">
            <a href={`tel:${businessInfo.phoneRaw}`} className="text-[#D4AF37] font-bold hover:underline">
              📞 {businessInfo.phone}
            </a>
            <span>•</span>
            <a href={businessInfo.googleMapsShortUrl} target="_blank" rel="noreferrer" className="text-[#8FB99E] hover:underline">
              📍 1124 N Bragg Blvd
            </a>
          </div>
        </div>
      </div>

      {/* 2. Craft Board Header */}
      <header className="bg-[#1C211E] border-b border-[#2E3631] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="./images/rainbow-roll-cutout.png"
              alt="Hand-Rolled Sushi"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-[#121513] border border-[#D4AF37]/50 p-1"
            />
            <div>
              <span className="text-[#8FB99E] font-mono-tech text-xs tracking-widest uppercase block font-bold">
                Side-by-Side Kitchen &amp; Sushi Craft Edition
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif-editorial tracking-wide">
                Rice, Roots &amp; Rolls
              </h1>
              <p className="text-xs text-[#A3ADA7] font-mono-tech mt-0.5">
                1124 N Bragg Blvd, Spring Lake, NC • Cambodian Kitchen, Chinese Classics &amp; Sushi Bar
              </p>
            </div>
          </div>

          {/* Board View Switcher */}
          <div className="flex items-center gap-1.5 bg-[#111412] p-1.5 border border-[#2E3631] overflow-x-auto max-w-full scrollbar-none">
            <button
              onClick={() => setActiveBoard('dualBoard')}
              className={`px-3.5 py-2 text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeBoard === 'dualBoard'
                  ? 'bg-[#D4AF37] text-[#14110F]'
                  : 'text-[#CBD2CE] hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>1. Kitchen + Sushi Dual Board</span>
            </button>
            <button
              onClick={() => setActiveBoard('storyPhotos')}
              className={`px-3.5 py-2 text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeBoard === 'storyPhotos'
                  ? 'bg-[#4A7C59] text-white'
                  : 'text-[#CBD2CE] hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>2. Rice • Roots • Rolls Story</span>
            </button>
            <button
              onClick={() => setActiveBoard('originalBoards')}
              className={`px-3.5 py-2 text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeBoard === 'originalBoards'
                  ? 'bg-[#B84A39] text-white'
                  : 'text-[#CBD2CE] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>3. Original Menu Boards &amp; Reviews</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* VIEW 1: DUAL BOARD (LEFT: MAIN KITCHEN | RIGHT: SUSHI BAR) */}
        {activeBoard === 'dualBoard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT BOARD: MAIN ASIAN & CAMBODIAN KITCHEN */}
            <div className="bg-[#1C211E] border-2 border-[#D4AF37]/50 p-5 sm:p-7 space-y-6">
              <div className="border-b-2 border-[#D4AF37] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono-tech uppercase text-[#D4AF37] font-bold">
                    Board I • Wok, Broth &amp; Grill
                  </span>
                  <h2 className="text-3xl font-bold font-serif-editorial text-white">
                    Main Kitchen Menu
                  </h2>
                </div>
                <img
                  src="./images/shrimp-tempura-cutout.png"
                  alt="Shrimp Tempura"
                  className="w-20 h-14 object-contain"
                />
              </div>

              {['southeastSpecials', 'chefsSpecials', 'chineseSpecials', 'appetizersAndDrinks'].map(catKey => {
                const cat = menu[catKey];
                if (!cat) return null;
                return (
                  <div key={catKey} className="space-y-3">
                    <h3 className="text-lg font-bold font-serif-editorial text-[#D4AF37] uppercase tracking-wider border-b border-[#2E3631] pb-1">
                      {cat.categoryName}
                    </h3>
                    <div className="space-y-2.5">
                      {cat.items.filter(i => !i.hidden).map(item => {
                        const isUnavailable = !item.inStock || (item.isWok && !liveStatus.wokOpen);
                        const isAdded = addedIds[item.id];
                        return (
                          <div
                            key={item.id}
                            className="bg-[#141816] border border-[#2A312D] p-3.5 flex items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5 flex-1">
                              <div className="flex items-baseline justify-between gap-2">
                                <h4 className="font-bold text-sm text-white">{item.name}</h4>
                                <span className="font-mono-tech font-bold text-sm text-[#D4AF37]">
                                  {isUnavailable ? 'SOLD OUT' : item.price}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-xs text-[#A3ADA7]">{item.description}</p>
                              )}
                            </div>
                            <button
                              onClick={() => handleAdd(item)}
                              disabled={isUnavailable}
                              className={`px-2.5 py-1.5 text-xs font-bold shrink-0 cursor-pointer ${
                                isUnavailable
                                  ? 'bg-[#262B28] text-[#66706A]'
                                  : isAdded
                                  ? 'bg-[#4A7C59] text-white'
                                  : 'bg-[#D4AF37] text-[#14110F]'
                              }`}
                            >
                              {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT BOARD: HAND-ROLLED SUSHI BAR */}
            <div className="bg-[#1C211E] border-2 border-[#4A7C59] p-5 sm:p-7 space-y-6">
              <div className="border-b-2 border-[#4A7C59] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono-tech uppercase text-[#8FB99E] font-bold">
                    Board II • Sashimi, Standard Issue &amp; Squad Leader Rolls
                  </span>
                  <h2 className="text-3xl font-bold font-serif-editorial text-white">
                    Hand-Rolled Sushi Menu
                  </h2>
                </div>
                <img
                  src="./images/khmer-crudo-cutout.png"
                  alt="Khmer Crudo"
                  className="w-20 h-14 object-contain"
                />
              </div>

              {['squadLeaderSushi', 'sushiStartersAndStandard'].map(catKey => {
                const cat = menu[catKey];
                if (!cat) return null;
                return (
                  <div key={catKey} className="space-y-3">
                    <h3 className="text-lg font-bold font-serif-editorial text-[#8FB99E] uppercase tracking-wider border-b border-[#2E3631] pb-1">
                      {cat.categoryName}
                    </h3>
                    <div className="space-y-2.5">
                      {cat.items.filter(i => !i.hidden).map(item => {
                        const isUnavailable = !item.inStock || !liveStatus.sushiOpen;
                        const isAdded = addedIds[item.id];
                        return (
                          <div
                            key={item.id}
                            className="bg-[#141816] border border-[#2A312D] p-3.5 flex items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5 flex-1">
                              <div className="flex items-baseline justify-between gap-2">
                                <h4 className="font-bold text-sm text-white">{item.name}</h4>
                                <span className="font-mono-tech font-bold text-sm text-[#D4AF37]">
                                  {isUnavailable ? 'SOLD OUT' : item.price}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-xs text-[#A3ADA7]">{item.description}</p>
                              )}
                            </div>
                            <button
                              onClick={() => handleAdd(item)}
                              disabled={isUnavailable}
                              className={`px-2.5 py-1.5 text-xs font-bold shrink-0 cursor-pointer ${
                                isUnavailable
                                  ? 'bg-[#262B28] text-[#66706A]'
                                  : isAdded
                                  ? 'bg-[#4A7C59] text-white'
                                  : 'bg-[#4A7C59] hover:bg-[#5B946C] text-white'
                              }`}
                            >
                              {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: RICE, ROOTS & ROLLS STORY + CATERING */}
        {activeBoard === 'storyPhotos' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {meaningPillars.map(pillar => (
                <div key={pillar.id} className="bg-[#1C211E] border border-[#2E3631] p-4 space-y-3">
                  <img src={pillar.image} alt={pillar.title} className="w-full h-60 object-cover" />
                  <h3 className="text-2xl font-bold font-serif-editorial text-[#D4AF37]">
                    {pillar.title} — {pillar.subtitle}
                  </h3>
                  <p className="text-xs text-[#CBD2CE] italic leading-relaxed">“{pillar.quote}”</p>
                </div>
              ))}
            </div>

            <div className="bg-[#1C211E] border border-[#2E3631] p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <img
                  src="./images/chef-a-food-truck.jpg"
                  alt="Chef A"
                  className="w-full h-72 object-cover border border-[#D4AF37]"
                />
              </div>
              <div className="lg:col-span-8 space-y-3 text-xs sm:text-sm text-[#CBD2CE]">
                <h3 className="text-2xl font-bold font-serif-editorial text-white">
                  Chef A’s Journey: From Far East Foodie in Lander, WY to Spring Lake, NC
                </h3>
                {chefStoryParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ORIGINAL MENU BOARDS & REAL YELP PROOF */}
        {activeBoard === 'originalBoards' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1C211E] border border-[#2E3631] p-4 space-y-2">
                <h3 className="font-bold text-sm text-[#D4AF37]">Original Main Kitchen Menu Board</h3>
                <img src="./images/menu-board-main.png" alt="Main Menu Board" className="w-full h-auto" />
              </div>
              <div className="bg-[#1C211E] border border-[#2E3631] p-4 space-y-2">
                <h3 className="font-bold text-sm text-[#8FB99E]">Original Sushi Menu Board</h3>
                <img src="./images/menu-board-sushi.png" alt="Sushi Menu Board" className="w-full h-auto" />
              </div>
            </div>
            <div className="bg-[#1C211E] border border-[#2E3631] p-4 space-y-2">
              <h3 className="font-bold text-sm text-[#D4AF37]">Verified 5-Star Customer Reviews</h3>
              <img src="./images/yelp-reviews-proof.png" alt="Verified Reviews" className="w-full h-auto" />
            </div>
          </div>
        )}

        {/* Wayfinding Footer Strip */}
        <div className="bg-[#1C211E] border-2 border-[#2E3631] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono-tech text-[#D4AF37] uppercase font-bold block">
              Brick-and-Mortar Location • Easy Bragg Blvd Access
            </span>
            <h3 className="text-2xl font-bold font-serif-editorial text-white">
              {businessInfo.address} • {businessInfo.phone}
            </h3>
            <p className="text-xs text-[#A3ADA7] mt-0.5">
              Mon–Thu 11:00 AM – 8:00 PM • Fri–Sat 11:00 AM – 8:30 PM • Closed Sunday
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={businessInfo.googleMapsShortUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#D4AF37] text-[#14110F] font-extrabold text-xs uppercase tracking-wider"
            >
              Google Maps Pin
            </a>
            <a
              href={businessInfo.appleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#262B28] border border-[#3B423E] text-white font-bold text-xs uppercase tracking-wider"
            >
              Apple Maps
            </a>
            <button
              onClick={() => setIsChefAdminOpen(true)}
              className="px-4 py-2.5 bg-[#4A7C59] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              👩‍🍳 Chef Edit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
