import React, { useState } from 'react';
import { useKitchen } from '../../context/KitchenContext';
import {
  Phone,
  MapPin,
  Navigation,
  Sparkles,
  Check,
  Plus,
  Search,
  Utensils,
  FileImage,
  Flame,
  Fish,
  Clock,
  Compass
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

export default function SushiCraftBoardLayout() {
  const {
    businessInfo,
    meaningPillars,
    menu,
    specials,
    liveStatus,
    addToCart,
    setIsPrintableMenuOpen,
    setIsChefAdminOpen,
    setIsSchemaWhitePageOpen
  } = useKitchen();

  // Station filter: 'all' | 'wok' | 'sushi'
  const [stationMode, setStationMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [item.id]: false })), 1300);
  };

  const sushiCategories = ['squadLeaderSushi', 'sushiStarters', 'classicRolls'];
  const wokCategories = ['southeastSpecials', 'chefsSpecials', 'startersAndSides', 'soups', 'chineseFavorites'];

  return (
    <div className="min-h-screen bg-[#121614] text-[#F2EFE9] selection:bg-[#D4A359] selection:text-[#121614] overflow-x-hidden">
      {/* Top App Pill Bar */}
      <header className="sticky top-3 z-40 px-4 pt-2">
        <div className="max-w-6xl mx-auto rounded-full bg-[#1B211E]/90 backdrop-blur-2xl border border-white/10 px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-white flex items-center justify-center font-serif font-bold text-lg">
              R
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-white block leading-none">
                Rice, Roots &amp; Rolls
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#84B593] font-semibold block mt-1">
                Interactive Kitchen &amp; Sushi Bar
              </span>
            </div>
          </div>

          {/* Interactive Station Switcher Pill inside Navbar */}
          <div className="hidden md:flex items-center bg-black/35 p-1 rounded-full border border-white/10">
            <button
              onClick={() => setStationMode('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                stationMode === 'all'
                  ? 'bg-[#D4A359] text-[#121614]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              All Stations (36)
            </button>
            <button
              onClick={() => setStationMode('wok')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                stationMode === 'wok'
                  ? 'bg-[#D4A359] text-[#121614]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Hot Khmer &amp; Wok</span>
            </button>
            <button
              onClick={() => setStationMode('sushi')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                stationMode === 'sushi'
                  ? 'bg-[#D4A359] text-[#121614]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Fish className="w-3.5 h-3.5" />
              <span>Sushi &amp; Crudo Bar</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrintableMenuOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/8 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer"
            >
              <FileImage className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>Menu Boards</span>
            </button>
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="px-4 py-2 rounded-full bg-[#D4A359] hover:bg-[#E0B26B] text-[#121614] font-bold text-xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{businessInfo.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* VISUAL CUTOUT BENTO HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Visual App Card (6 cols) */}
          <div className="lg:col-span-6 rounded-[2rem] bg-gradient-to-br from-[#1E2622] to-[#161B18] border border-white/10 p-7 sm:p-9 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/25 border border-[#4A7C59]/40 text-[#95D5B2] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#95D5B2] animate-ping" />
                <span>{liveStatus.badgeText}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-[1.08]">
                Two Culinary Stations.{' '}
                <span className="text-[#D4A359] italic font-normal">One Family Table.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#B8C2BC] leading-relaxed">
                Toggle between Chef A’s <strong className="text-white">Cambodian &amp; Wok Kitchen</strong> and our <strong className="text-white">Hand-Rolled Sushi Bar</strong> at 1124 N Bragg Blvd in Spring Lake.
              </p>
            </div>

            {/* Mobile/Tablet Station Switcher Pills */}
            <div className="flex flex-wrap gap-2 pt-6">
              <button
                onClick={() => setStationMode('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  stationMode === 'all'
                    ? 'bg-[#D4A359] text-[#121614]'
                    : 'bg-white/8 text-white hover:bg-white/15'
                }`}
              >
                All 36 Dishes
              </button>
              <button
                onClick={() => setStationMode('wok')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  stationMode === 'wok'
                    ? 'bg-[#D4A359] text-[#121614]'
                    : 'bg-white/8 text-white hover:bg-white/15'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-[#D4A359]" />
                <span>Khmer &amp; Wok Kitchen</span>
              </button>
              <button
                onClick={() => setStationMode('sushi')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  stationMode === 'sushi'
                    ? 'bg-[#D4A359] text-[#121614]'
                    : 'bg-white/8 text-white hover:bg-white/15'
                }`}
              >
                <Fish className="w-3.5 h-3.5 text-[#84B593]" />
                <span>Sushi &amp; Crudo Bar</span>
              </button>
            </div>
          </div>

          {/* 3 Floating Cutout Bento Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setStationMode('wok')}
              className="rounded-3xl bg-[#1B211E] border border-white/10 hover:border-[#D4A359]/50 p-5 flex flex-col justify-between cursor-pointer group transition"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A359]">
                Khmer Wok
              </span>
              <img
                src="./images/hero-khmer-beef.png"
                alt="Khmer Beef & Herbs"
                className="w-36 h-36 object-contain mx-auto my-2 drop-shadow-2xl group-hover:scale-105 transition"
              />
              <div>
                <div className="font-serif text-base font-bold text-white">Kathiew &amp; Grill</div>
                <div className="text-xs text-[#95A39B] mt-0.5">Cambodian Pho &amp; Pork</div>
              </div>
            </div>

            <div
              onClick={() => setStationMode('sushi')}
              className="rounded-3xl bg-[#1B211E] border border-white/10 hover:border-[#D4A359]/50 p-5 flex flex-col justify-between cursor-pointer group transition"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84B593]">
                Sushi Bar
              </span>
              <img
                src="./images/rainbow-roll-cutout.png"
                alt="Hand-Rolled Sushi"
                className="w-36 h-36 object-contain mx-auto my-2 drop-shadow-2xl group-hover:scale-105 transition"
              />
              <div>
                <div className="font-serif text-base font-bold text-white">Specialty Rolls</div>
                <div className="text-xs text-[#95A39B] mt-0.5">Cowboy &amp; Eagle Rolls</div>
              </div>
            </div>

            <div
              onClick={() => setStationMode('sushi')}
              className="rounded-3xl bg-[#1B211E] border border-white/10 hover:border-[#D4A359]/50 p-5 flex flex-col justify-between cursor-pointer group transition"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C17B]">
                Sashimi &amp; Tempura
              </span>
              <img
                src="./images/shrimp-tempura-cutout.png"
                alt="Shrimp Tempura"
                className="w-36 h-36 object-contain mx-auto my-2 drop-shadow-2xl group-hover:scale-105 transition"
              />
              <div>
                <div className="font-serif text-base font-bold text-white">Crudo &amp; Starters</div>
                <div className="text-xs text-[#95A39B] mt-0.5">Khmer Crudo &amp; Tempura</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE APP MENU BOARD */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white">
              {stationMode === 'wok'
                ? '🔥 Hot Khmer & Wok Kitchen'
                : stationMode === 'sushi'
                ? '🍣 Hand-Rolled Sushi & Crudo Bar'
                : 'Complete Interactive Menu (36 Dishes)'}
            </h2>
            <p className="text-xs text-[#95A39B] mt-1">
              1124 N Bragg Blvd, Spring Lake, NC • Tap + to add dishes to your order bag
            </p>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#84948B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter dishes, rolls, ingredients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#1B211E] border border-white/10 text-xs text-white placeholder-[#84948B] focus:outline-none focus:border-[#D4A359]"
            />
          </div>
        </div>

        <div className="space-y-10">
          {Object.entries(menu).map(([catKey, categoryObj]) => {
            if (stationMode === 'sushi' && !sushiCategories.includes(catKey)) return null;
            if (stationMode === 'wok' && !wokCategories.includes(catKey)) return null;

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
              <div
                key={catKey}
                className="rounded-3xl bg-[#181D1A] border border-white/10 p-5 sm:p-8 space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {categoryObj.categoryName}
                    </h3>
                    <p className="text-xs text-[#95A39B]">{categoryObj.tagline}</p>
                  </div>
                  {categoryObj.note && (
                    <span className="px-3.5 py-1 rounded-full bg-white/5 text-xs text-[#D4A359]">
                      {categoryObj.note}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map(item => {
                    const isAdded = addedIds[item.id];
                    const thumb = DISH_THUMBNAILS[item.id];
                    const available = item.inStock;

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[#202623] hover:bg-[#262D29] border border-white/8 p-4 flex flex-col justify-between transition"
                      >
                        <div className="space-y-2.5">
                          {thumb && (
                            <img
                              src={thumb}
                              alt={item.name}
                              className="w-full h-36 rounded-xl object-cover mb-2"
                            />
                          )}
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-base font-bold text-white">
                              {item.name}
                            </h4>
                            <span className="font-serif text-base font-bold text-[#D4A359] shrink-0">
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-[#A3B0A8] leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <button
                          disabled={!available}
                          onClick={() => handleAdd(item)}
                          className={`mt-4 w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            !available
                              ? 'bg-white/5 text-white/30 cursor-not-allowed'
                              : isAdded
                              ? 'bg-[#4A7C59] text-white'
                              : 'bg-white/10 hover:bg-[#D4A359] text-white hover:text-[#121614]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add • {item.price}</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK WAYFINDING & STORY BENTO */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl bg-[#1B211E] border border-white/10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4">
            <img
              src="./images/chef-a-food-truck.jpg"
              alt="Chef A in front of Far East Foodie truck"
              className="w-full h-60 object-cover rounded-2xl"
            />
          </div>
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
              Chef A • From Lander, WY to 1124 N Bragg Blvd
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Crafted with love for our boys &amp; our Spring Lake community.
            </h3>
            <p className="text-xs sm:text-sm text-[#A3B0A8] leading-relaxed">
              {businessInfo.originStoryShort} Find us right at 1124 N Bragg Blvd with dedicated front parking just 5 minutes from Fort Bragg.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#D4A359] text-[#121614] text-xs font-bold"
              >
                Google Maps Directions
              </a>
              <button
                onClick={() => setIsChefAdminOpen(true)}
                className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold cursor-pointer"
              >
                Chef A Pocket Admin
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
