import React, { useState } from 'react';
import { useKitchen } from '../context/KitchenContext';
import {
  Palette,
  Sparkles,
  ChefHat,
  Tv,
  SearchCode,
  FileImage,
  ChevronUp,
  ChevronDown,
  Layers
} from 'lucide-react';

export default function DesignSwitcherBar() {
  const {
    themeVersion,
    setThemeVersion,
    setIsChefAdminOpen,
    setIsSchemaWhitePageOpen,
    setIsTvMenuOpen,
    setIsPrintableMenuOpen
  } = useKitchen();

  const [isExpanded, setIsExpanded] = useState(false);

  const themes = [
    {
      id: 'sanctuary',
      name: '01 • Indochine Velvet',
      desc: 'Dark Michelin Editorial & Bento Grid',
      dot: 'bg-[#C89D54]'
    },
    {
      id: 'jasmine',
      name: '02 • Kinfolk Rice Paper',
      desc: 'Sunlit Minimalist Magazine Atelier',
      dot: 'bg-[#9E4734]'
    },
    {
      id: 'craftboard',
      name: '03 • Omakase Visual App',
      desc: 'Interactive Cutout Bento & Dual Bar',
      dot: 'bg-[#4A7C59]'
    }
  ];

  const currentTheme = themes.find(t => t.id === themeVersion) || themes[0];

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end">
      {/* Expanded Studio & Chef Control Popover */}
      {isExpanded && (
        <div className="mb-3 w-[310px] sm:w-[340px] rounded-3xl bg-[#161311]/95 backdrop-blur-2xl border border-white/15 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.75)] text-[#F5F0E6] animate-fadeIn space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#C89D54]" />
              <span className="text-xs font-bold tracking-wider uppercase text-[#C89D54]">
                3 Design Concepts &amp; Chef Suite
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-white/60 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* 3 Modern Site Concepts */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-white/50 font-medium block">
              Switch Live Website Look &amp; Feel:
            </span>
            {themes.map(t => {
              const active = themeVersion === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setThemeVersion(t.id)}
                  className={`w-full p-2.5 rounded-2xl text-left transition cursor-pointer flex items-center justify-between border ${
                    active
                      ? 'bg-white/12 border-[#C89D54] text-white shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 border-transparent text-white/75'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`}></span>
                    <div>
                      <div className="text-xs font-bold">{t.name}</div>
                      <div className="text-[10px] text-white/50">{t.desc}</div>
                    </div>
                  </div>
                  {active && (
                    <span className="text-[10px] font-bold bg-[#C89D54] text-[#14110F] px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Chef A's On-the-Fly Tools */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-[11px] text-white/50 font-medium block">
              Chef A’s iPhone &amp; Restaurant Tools:
            </span>
            <button
              onClick={() => {
                setIsExpanded(false);
                setIsChefAdminOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#C89D54] hover:bg-[#D5AB63] text-[#14110F] font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ChefHat className="w-4 h-4" />
              <span>Chef A iPhone Pocket Admin (Edit Live)</span>
            </button>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setIsSchemaWhitePageOpen(true);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-white/90 flex flex-col items-center gap-1 cursor-pointer"
              >
                <SearchCode className="w-3.5 h-3.5 text-[#C89D54]" />
                <span>SEO Brief</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  setIsTvMenuOpen(true);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-white/90 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5 text-[#C89D54]" />
                <span>1080p TV</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  setIsPrintableMenuOpen(true);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-white/90 flex flex-col items-center gap-1 cursor-pointer"
              >
                <FileImage className="w-3.5 h-3.5 text-[#C89D54]" />
                <span>Print Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Floating Pill Dock */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#161311]/90 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-white">
        {themes.map((t, idx) => {
          const active = themeVersion === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setThemeVersion(t.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                active
                  ? 'bg-[#C89D54] text-[#14110F] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={t.desc}
            >
              <span className={`w-2 h-2 rounded-full ${active ? 'bg-[#14110F]' : t.dot}`}></span>
              <span className="hidden sm:inline">{t.name.split('• ')[1]}</span>
              <span className="sm:hidden">0{idx + 1}</span>
            </button>
          );
        })}

        <div className="w-px h-4 bg-white/15 mx-0.5"></div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-[#C89D54] flex items-center gap-1 cursor-pointer"
          title="Open Chef Admin, TV Board & SEO Tools"
        >
          <ChefHat className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Chef &amp; Studio</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
