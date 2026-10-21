import React from 'react';
import { useKitchen } from '../context/KitchenContext';
import {
  Palette,
  Leaf,
  Sun,
  LayoutGrid,
  ChefHat,
  Tv,
  SearchCode,
  Sparkles,
  FileImage
} from 'lucide-react';

export default function DesignSwitcherBar() {
  const {
    themeVersion,
    setThemeVersion,
    setIsChefAdminOpen,
    setIsSchemaWhitePageOpen,
    setIsTvMenuOpen,
    setIsPrintableMenuOpen,
    isSteamFxActive,
    setIsSteamFxActive
  } = useKitchen();

  const themes = [
    {
      id: 'sanctuary',
      name: 'Concept 1: Angkor Sanctuary & Teak',
      shortName: '🌿 Angkor Sanctuary',
      subtitle: 'Botanical Sage, Dark Teak & Burnished Gold',
      icon: Leaf,
      colorDot: 'bg-[#4A7C59]'
    },
    {
      id: 'jasmine',
      name: 'Concept 2: Jasmine & Silk Heritage',
      shortName: '🌾 Jasmine & Silk',
      subtitle: 'Warm Rice Paper, Khmer Terracotta & Family Table',
      icon: Sun,
      colorDot: 'bg-[#C89D54]'
    },
    {
      id: 'craftboard',
      name: 'Concept 3: Bragg Blvd Sushi & Craft Board',
      shortName: '🍣 Sushi & Craft Board',
      subtitle: 'Nori Slate, Side-by-Side Kitchen + Sushi Boards',
      icon: LayoutGrid,
      colorDot: 'bg-[#B84A39]'
    }
  ];

  return (
    <div className="bg-[#0D0B09] border-b border-[#2C2520] py-1.5 px-2.5 sm:py-2 sm:px-4 text-xs z-50 relative w-full max-w-full overflow-hidden">
      {/* ===================================================================== */}
      {/* iPHONE & MOBILE SLIM BAR (<768px): Zero Overflow, Big Thumb Targets   */}
      {/* ===================================================================== */}
      <div className="md:hidden flex items-center justify-between gap-1.5 w-full">
        <div className="flex items-center gap-1.5 min-w-0">
          <Palette className="w-3.5 h-3.5 text-[#C89D54] shrink-0" />
          <select
            value={themeVersion}
            onChange={(e) => setThemeVersion(e.target.value)}
            className="bg-[#1C1815] text-[#F5F0E6] border border-[#3D332B] text-xs font-bold py-1 px-2 rounded-none focus:outline-none focus:border-[#C89D54] max-w-[155px] truncate"
            aria-label="Select website design concept"
          >
            {themes.map(t => (
              <option key={t.id} value={t.id}>
                {t.shortName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Chef A On-The-Fly iPhone Edit Button */}
          <button
            onClick={() => setIsChefAdminOpen(true)}
            className="py-1 px-2 rounded-none bg-[#C89D54] text-[#14110F] font-extrabold text-[11px] flex items-center gap-1 cursor-pointer"
            title="Chef A On-the-Fly iPhone Admin"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Chef Edit</span>
          </button>

          {/* Schema & Google Maps Sync White Paper */}
          <button
            onClick={() => setIsSchemaWhitePageOpen(true)}
            className="py-1 px-2 rounded-none bg-[#1F2D24] border border-[#4A7C59]/60 text-[#D8E6DC] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
            title="Schema.org & Google Maps Sync Brief"
          >
            <SearchCode className="w-3.5 h-3.5 text-[#C89D54]" />
            <span>SEO</span>
          </button>

          {/* 1080p TV Menu */}
          <button
            onClick={() => setIsTvMenuOpen(true)}
            className="py-1 px-2 rounded-none bg-[#1C1815] border border-[#3D332B] text-[#E6DEC8] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
            title="1080p Dining Room TV Menu"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89D54]" />
            <span>TV</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* DESKTOP BAR (>=768px): 3-Site Switcher + Admin + White Paper + TV     */}
      {/* ===================================================================== */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-[#D5CCC0]">
          <Palette className="w-4 h-4 text-[#C89D54] shrink-0" />
          <span className="font-bold uppercase tracking-wider text-[11px] text-[#C89D54]">
            3 Custom Site Concepts for Chef A:
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-1.5 justify-center">
          {themes.map(t => {
            const isActive = themeVersion === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setThemeVersion(t.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-bold transition cursor-pointer border ${
                  isActive
                    ? 'bg-[#241E1A] text-[#F5F0E6] border-[#C89D54] shadow-sm'
                    : 'bg-[#14110F] text-[#A69B8D] hover:text-[#F5F0E6] border-[#2C2520] hover:border-[#4A3F37]'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-none ${t.colorDot} shrink-0`}></span>
                <span className="whitespace-nowrap">{t.name}</span>
                {isActive && (
                  <span className="text-[10px] bg-[#C89D54]/20 text-[#E5C17B] px-1.5 py-0.2 rounded-none font-mono-tech uppercase">
                    Active
                  </span>
                )}
              </button>
            );
          })}

          <div className="h-4 w-px bg-[#2C2520] mx-1"></div>

          {/* Toggle Subtle Botanical Aroma Steam */}
          <button
            onClick={() => setIsSteamFxActive(!isSteamFxActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-none text-xs font-bold transition cursor-pointer border ${
              isSteamFxActive
                ? 'bg-[#1F2D24] text-[#D8E6DC] border-[#4A7C59]/60'
                : 'bg-[#14110F] text-[#8C8275] border-[#2C2520]'
            }`}
            title="Toggle subtle aromatic pho steam & golden botanical particles"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C89D54]" />
            <span>{isSteamFxActive ? 'Atmosphere: ON' : 'Atmosphere: OFF'}</span>
          </button>

          {/* Original Printable Menu Boards */}
          <button
            onClick={() => setIsPrintableMenuOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none text-xs font-bold transition cursor-pointer bg-[#1C1815] hover:bg-[#28221E] text-[#E6DEC8] border border-[#3D332B]"
            title="View or download Chef A's original printable menu boards"
          >
            <FileImage className="w-3.5 h-3.5 text-[#C89D54]" />
            <span>Print Menus</span>
          </button>

          {/* Schema.org & Google Maps Sync White Page */}
          <button
            onClick={() => setIsSchemaWhitePageOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold transition cursor-pointer bg-[#F5F0E6] text-[#14110F] hover:bg-[#E6DEC8] border border-[#C89D54] shadow-sm"
            title="Read the Schema.org Discovery & Google Maps Hours Sync White Paper"
          >
            <SearchCode className="w-3.5 h-3.5 text-[#2E5A44] shrink-0" />
            <span className="whitespace-nowrap font-extrabold">🔍 Schema & Google Sync Brief</span>
          </button>

          {/* 1080p Dining Room TV Menu */}
          <button
            onClick={() => setIsTvMenuOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold transition cursor-pointer bg-[#1F2D24] hover:bg-[#283B2F] text-[#E6F0E9] border border-[#4A7C59]"
            title="Open 1080p Dining Room TV Menu & USB Image Exporter"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89D54]" />
            <span className="whitespace-nowrap font-bold">📺 TV Board</span>
          </button>

          {/* Chef A iPhone Pocket Admin */}
          <button
            onClick={() => setIsChefAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-extrabold transition cursor-pointer bg-[#C89D54] hover:bg-[#D6AD65] text-[#14110F] shadow-sm"
            title="Chef A's iPhone Pocket Admin: Update commute hours, 86 sold-out items, or edit prices on the fly"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">👩‍🍳 Chef A On-the-Fly Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
