import React, { useState, useRef, useEffect } from 'react';
import { useKitchen } from '../context/KitchenContext';
import {
  X,
  Download,
  Maximize2,
  Tv,
  Check,
  RefreshCw,
  Phone,
  Sparkles
} from 'lucide-react';

export default function TvMenuModal() {
  const {
    isTvMenuOpen,
    setIsTvMenuOpen,
    menu,
    liveStatus,
    businessInfo
  } = useKitchen();

  const boardRef = useRef(null);
  const containerRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [boardTheme, setBoardTheme] = useState('sanctuary'); // 'sanctuary' | 'jasmine'

  useEffect(() => {
    if (!isTvMenuOpen) return;
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        const availableHeight = containerRef.current.clientHeight;
        const scaleX = (availableWidth - 32) / 1920;
        const scaleY = (availableHeight - 80) / 1080;
        const fittedScale = Math.min(scaleX, scaleY, 1);
        setScale(Math.max(fittedScale, 0.18));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isTvMenuOpen]);

  if (!isTvMenuOpen) return null;

  const handleDownloadImage = async () => {
    if (!boardRef.current) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(boardRef.current, {
        scale: 1,
        width: 1920,
        height: 1080,
        useCORS: true,
        allowTaint: true,
        backgroundColor: boardTheme === 'sanctuary' ? '#14110F' : '#FAF6EE',
        logging: false
      });
      const image = canvas.toDataURL('image/jpeg', 0.96);
      const link = document.createElement('a');
      link.href = image;
      link.download = `RiceRootsRolls_TV_Menu_1080p_${boardTheme}_${new Date().toISOString().slice(0, 10)}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to export TV menu image:', err);
      alert('Error generating TV menu image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const isLight = boardTheme === 'jasmine';

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col overflow-hidden text-white font-sans animate-fadeIn">
      {/* Top Bar */}
      <div className="bg-[#181411] border-b border-[#332B24] px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-none bg-[#C89D54] text-[#14110F] font-black">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-[#253529] text-[#A5D6B5] px-2 py-0.5 rounded-none border border-[#4A7C59]">
                1080p Dining Room &amp; Sushi Bar TV Hub
              </span>
              <span className="text-xs text-[#A69B8D] hidden sm:inline">
                Syncs Live with Chef A’s iPhone 86 Toggles • Or Download JPG for USB Stick
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#F5F0E6] font-serif-editorial">
              Rice, Roots &amp; Rolls — 1920 × 1080 Digital Menu Board
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-[#241E1A] p-1 rounded-none border border-[#3D332B] text-xs">
            <button
              onClick={() => setBoardTheme('sanctuary')}
              className={`px-2.5 py-1 rounded-none font-bold cursor-pointer ${
                boardTheme === 'sanctuary' ? 'bg-[#C89D54] text-[#14110F]' : 'text-[#D5CCC0]'
              }`}
            >
              Dark Teak &amp; Gold
            </button>
            <button
              onClick={() => setBoardTheme('jasmine')}
              className={`px-2.5 py-1 rounded-none font-bold cursor-pointer ${
                boardTheme === 'jasmine' ? 'bg-[#C89D54] text-[#14110F]' : 'text-[#D5CCC0]'
              }`}
            >
              Warm Jasmine Paper
            </button>
          </div>

          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-[#2E5A44] hover:bg-[#3A7055] text-white text-xs font-extrabold cursor-pointer shadow"
          >
            {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>{isExporting ? 'Generating...' : '⬇️ Download 1080p JPG (USB)'}</span>
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-none bg-[#241E1A] hover:bg-[#332B24] text-[#D5CCC0] hover:text-white border border-[#3D332B] cursor-pointer"
            title="Fullscreen on Smart TV"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsTvMenuOpen(false)}
            className="p-2 rounded-none bg-[#241E1A] hover:bg-[#B84A39] text-[#D5CCC0] hover:text-white border border-[#3D332B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="bg-[#2E5A44] text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2 shrink-0">
          <Check className="w-4 h-4" />
          <span>Downloaded 1920 × 1080 TV Menu JPG! Ready for any Smart TV or USB thumb drive.</span>
        </div>
      )}

      {/* Scaled 1920x1080 Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center p-3 sm:p-6 bg-[#080706]"
      >
        <div
          style={{
            width: '1920px',
            height: '1080px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            boxShadow: '0 30px 100px rgba(0,0,0,0.95)'
          }}
          className="shrink-0 transition-transform duration-150"
        >
          <div
            ref={boardRef}
            className={`w-[1920px] h-[1080px] flex flex-col justify-between overflow-hidden select-none border-4 ${
              isLight
                ? 'bg-[#FAF6EE] border-[#C89D54] text-[#1C1815]'
                : 'bg-[#14110F] border-[#C89D54] text-[#F5F0E6]'
            }`}
          >
            {/* Header (110px) */}
            <div
              className={`h-[110px] px-10 flex items-center justify-between border-b-2 ${
                isLight ? 'bg-[#F1EAE0] border-[#D5C7AD]' : 'bg-[#1C1815] border-[#362E26]'
              }`}
            >
              <div className="flex items-center gap-5">
                <img
                  src="./images/chef-a-food-truck.jpg"
                  alt="Chef A"
                  className="w-18 h-18 object-cover border-2 border-[#C89D54]"
                />
                <div>
                  <span className="text-xs font-mono-tech uppercase tracking-widest text-[#C89D54] font-bold block">
                    Cambodian Heritage • Chinese Classics • Hand-Rolled Sushi
                  </span>
                  <h1 className="text-4xl font-bold font-serif-editorial tracking-wide">
                    Rice, Roots &amp; Rolls — An Asian Kitchen
                  </h1>
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-serif-editorial italic text-[#C89D54]">
                  "Fresh Ingredients, Family Recipes — Crafted with Love by Chef A"
                </div>
                <div className="text-xs font-mono-tech uppercase tracking-wider opacity-75">
                  1124 N Bragg Blvd, Spring Lake, NC • Dine-In, Takeout &amp; Catering
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold font-mono-tech text-[#C89D54]">
                  ORDER: {businessInfo.phone}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#4A7C59]">
                  {liveStatus.badgeText}
                </div>
              </div>
            </div>

            {/* 4-Column Menu Body (890px) */}
            <div className="h-[890px] px-8 py-5 grid grid-cols-4 gap-5">
              {/* Col 1: Southeast & Chef's Specials */}
              <div
                className={`p-5 border flex flex-col justify-between ${
                  isLight ? 'bg-white border-[#E0D6C3]' : 'bg-[#1A1613] border-[#2E2721]'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold font-serif-editorial text-[#C89D54] border-b border-[#C89D54]/40 pb-1 mb-2">
                      Southeast &amp; Khmer Specials
                    </h2>
                    <div className="space-y-2">
                      {menu.southeastSpecials?.items.filter(i => !i.hidden).map(item => (
                        <div key={item.id} className="flex justify-between items-baseline border-b border-current/10 pb-1.5">
                          <div className="pr-2">
                            <div className="text-[16px] font-bold">{item.name}</div>
                            <div className="text-[11px] opacity-70 line-clamp-1">{item.description}</div>
                          </div>
                          <span className="font-mono-tech font-bold text-[17px] text-[#C89D54] shrink-0">
                            {!item.inStock || !liveStatus.wokOpen ? 'SOLD OUT' : item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold font-serif-editorial text-[#C89D54] border-b border-[#C89D54]/40 pb-1 mb-2">
                      Chef’s Khmer Specials (w/ Rice)
                    </h2>
                    <div className="space-y-2">
                      {menu.chefsSpecials?.items.filter(i => !i.hidden).map(item => (
                        <div key={item.id} className="flex justify-between items-baseline border-b border-current/10 pb-1.5">
                          <div className="pr-2">
                            <div className="text-[16px] font-bold">{item.name}</div>
                            <div className="text-[11px] opacity-70 line-clamp-1">{item.description}</div>
                          </div>
                          <span className="font-mono-tech font-bold text-[17px] text-[#C89D54] shrink-0">
                            {!item.inStock || !liveStatus.wokOpen ? 'SOLD OUT' : item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-mono-tech uppercase text-center opacity-70 pt-2 border-t border-current/10">
                  House-Pounded Kreung &amp; Koh Kong Dipping Sauce
                </div>
              </div>

              {/* Col 2: Chinese Specials & Appetizers */}
              <div
                className={`p-5 border flex flex-col justify-between ${
                  isLight ? 'bg-white border-[#E0D6C3]' : 'bg-[#1A1613] border-[#2E2721]'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold font-serif-editorial text-[#C89D54] border-b border-[#C89D54]/40 pb-1 mb-2">
                      Chinese Specials (w/ Rice)
                    </h2>
                    <div className="space-y-2">
                      {menu.chineseSpecials?.items.filter(i => !i.hidden).map(item => (
                        <div key={item.id} className="flex justify-between items-baseline border-b border-current/10 pb-1.5">
                          <div className="pr-2">
                            <div className="text-[16px] font-bold">{item.name}</div>
                            <div className="text-[11px] opacity-70 line-clamp-1">{item.description}</div>
                          </div>
                          <span className="font-mono-tech font-bold text-[17px] text-[#C89D54] shrink-0">
                            {!item.inStock || !liveStatus.wokOpen ? 'SOLD OUT' : item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold font-serif-editorial text-[#C89D54] border-b border-[#C89D54]/40 pb-1 mb-2">
                      Appetizers &amp; Drinks
                    </h2>
                    <div className="space-y-1.5">
                      {menu.appetizersAndDrinks?.items.filter(i => !i.hidden).map(item => (
                        <div key={item.id} className="flex justify-between items-baseline border-b border-current/10 pb-1">
                          <span className="text-[15px] font-bold">{item.name}</span>
                          <span className="font-mono-tech font-bold text-[16px] text-[#C89D54]">
                            {!item.inStock ? 'SOLD OUT' : item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-mono-tech uppercase text-center opacity-70 pt-2 border-t border-current/10">
                  Scratch-Made Sauces • Wok-Fired To Order
                </div>
              </div>

              {/* Col 3: Sushi Starters & Standard Issue Rolls */}
              <div
                className={`p-5 border flex flex-col justify-between ${
                  isLight ? 'bg-white border-[#E0D6C3]' : 'bg-[#1A1613] border-[#2E2721]'
                }`}
              >
                <div>
                  <h2 className="text-2xl font-bold font-serif-editorial text-[#4A7C59] border-b border-[#4A7C59]/50 pb-1 mb-2">
                    Sushi Starters &amp; Standard Issue Rolls
                  </h2>
                  <div className="space-y-2">
                    {menu.sushiStartersAndStandard?.items.filter(i => !i.hidden).map(item => (
                      <div key={item.id} className="flex justify-between items-baseline border-b border-current/10 pb-1.5">
                        <div className="pr-2">
                          <div className="text-[15px] font-bold">{item.name}</div>
                          <div className="text-[11px] opacity-70 line-clamp-1">{item.description}</div>
                        </div>
                        <span className="font-mono-tech font-bold text-[16px] text-[#C89D54] shrink-0">
                          {!item.inStock || !liveStatus.sushiOpen ? 'SOLD OUT' : item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] font-mono-tech uppercase text-center opacity-70 pt-2 border-t border-current/10">
                  Hand-Rolled Fresh to Order
                </div>
              </div>

              {/* Col 4: Squad Leader Specialty Rolls */}
              <div
                className={`p-5 border flex flex-col justify-between ${
                  isLight ? 'bg-white border-[#E0D6C3]' : 'bg-[#1A1613] border-[#2E2721]'
                }`}
              >
                <div>
                  <h2 className="text-2xl font-bold font-serif-editorial text-[#C89D54] border-b border-[#C89D54]/40 pb-1 mb-2">
                    Squad Leader Specialty Rolls
                  </h2>
                  <div className="space-y-3">
                    {menu.squadLeaderSushi?.items.filter(i => !i.hidden).map(item => (
                      <div key={item.id} className="border-b border-current/10 pb-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[17px] font-extrabold">{item.name}</span>
                          <span className="font-mono-tech font-bold text-[18px] text-[#C89D54]">
                            {!item.inStock || !liveStatus.sushiOpen ? 'SOLD OUT' : item.price}
                          </span>
                        </div>
                        <div className="text-[11px] opacity-75 leading-snug mt-0.5">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#2E5A44]/20 border border-[#4A7C59]/40 text-center space-y-1">
                  <div className="text-xs font-bold text-[#C89D54] uppercase">
                    Need Party Platters or Unit Catering?
                  </div>
                  <div className="text-[11px] opacity-80">
                    Ask Chef A about Khmer Egg Roll Wheels, Sushi Platters &amp; Buffet Chafing Trays!
                  </div>
                </div>
              </div>
            </div>

            {/* Footer (80px) */}
            <div
              className={`h-[80px] px-10 flex items-center justify-between border-t-2 text-xs font-mono-tech ${
                isLight ? 'bg-[#F1EAE0] border-[#D5C7AD]' : 'bg-[#1C1815] border-[#362E26]'
              }`}
            >
              <div>
                <strong>HOURS:</strong> Mon–Thu 11:00 AM – 8:00 PM • Fri–Sat 11:00 AM – 8:30 PM • Closed Sunday
              </div>
              <div className="text-[#C89D54] font-bold">
                ★ RICE • ROOTS • ROLLS — 1124 N BRAGG BLVD, SPRING LAKE, NC ★
              </div>
              <div>
                Consumer Advisory: Consuming raw or undercooked seafood may increase risk of foodborne illness.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
