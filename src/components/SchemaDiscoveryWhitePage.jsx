import React, { useState } from 'react';
import { useKitchen } from '../context/KitchenContext';
import {
  X,
  Printer,
  Search,
  MapPin,
  Clock,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Heart,
  Navigation,
  Code2,
  RefreshCw
} from 'lucide-react';

export default function SchemaDiscoveryWhitePage() {
  const {
    isSchemaWhitePageOpen,
    setIsSchemaWhitePageOpen,
    setIsChefAdminOpen,
    businessInfo
  } = useKitchen();

  const [simMode, setSimMode] = useState('after'); // 'before' | 'after'
  const [syncSimState, setSyncSimState] = useState('normal'); // 'normal' | 'commute' | 'family'

  if (!isSchemaWhitePageOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-2 sm:p-6 flex justify-center items-start print:p-0 print:bg-white print:static animate-fadeIn">
      <div
        className="bg-[#FAF6EE] text-[#1C1815] rounded-none shadow-2xl max-w-4xl w-full my-4 border-2 border-[#C89D54] overflow-hidden print:shadow-none print:border-none print:m-0"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-[#14110F] text-[#F5F0E6] px-4 sm:px-6 py-3 flex items-center justify-between gap-2 print:hidden border-b border-[#2C2520]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-[#C89D54] text-[#14110F] font-extrabold text-[11px] px-2 py-0.5 rounded-none font-mono-tech uppercase shrink-0">
              Discovery & Sync White Paper
            </span>
            <span className="text-xs text-[#D5CCC0] truncate">
              Prepared for Chef A • Rice, Roots &amp; Rolls (1124 N Bragg Blvd)
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#241E1A] hover:bg-[#332B24] text-[#F5F0E6] text-xs font-bold transition cursor-pointer border border-[#3D332B]"
            >
              <Printer className="w-3.5 h-3.5 text-[#C89D54]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => setIsSchemaWhitePageOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#241E1A] hover:bg-[#B84A39] text-[#F5F0E6] text-xs font-bold transition cursor-pointer border border-[#3D332B]"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close Brief</span>
            </button>
          </div>
        </div>

        {/* White Paper Header */}
        <div className="p-6 sm:p-10 border-b border-[#E2D9C5] bg-[#F3EDE0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[#2E5A44] text-xs font-extrabold uppercase tracking-widest block font-mono-tech">
                Search Dominance, Wayfinding &amp; Family Time Architecture
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-[#14110F] font-serif-editorial tracking-tight mt-1">
                Getting Rice, Roots &amp; Rolls Found on Google &amp; Syncing Hours on the Fly
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5349] mt-1.5 max-w-2xl">
                How our embedded <code className="font-mono-tech bg-white px-1.5 py-0.5 border border-[#D8CEB8]">Schema.org</code> microdata unlocks all 36 of your dishes for Google Search, guides drivers directly into 1124 N Bragg Blvd, and lets you update hours from your iPhone in 5 seconds.
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-[#5C5349] shrink-0 font-mono-tech bg-white p-3.5 rounded-none border border-[#D8CEB8]">
              <div><strong>Chef &amp; Owner:</strong> Chef A (Leakhena)</div>
              <div><strong>Restaurant:</strong> Rice, Roots &amp; Rolls</div>
              <div><strong>Location:</strong> 1124 N Bragg Blvd, Spring Lake</div>
              <div><strong>Coords:</strong> 35.1776° N, -78.9796° W</div>
            </div>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-6 sm:p-10 space-y-10 text-[#231F1C] leading-relaxed text-sm">
          {/* SECTION 1: THE CANVA "BLIND SPOT" DISCOVERY */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#14110F] font-serif-editorial flex items-center gap-2.5 border-b border-[#E2D9C5] pb-2">
              <span className="w-6 h-6 rounded-none bg-[#2E5A44] text-white flex items-center justify-center text-xs font-bold font-mono-tech">
                1
              </span>
              Why Google Couldn’t Read Your Menu on Canva (And How We Fixed It)
            </h2>

            <p className="text-[#3D352E] text-xs sm:text-sm">
              When we inspected your original Canva site (<code className="font-mono-tech text-xs">ricerootsandrolls.com</code>), we discovered a critical technical bottleneck: <strong>your entire Main Kitchen Menu, your Sushi Menu, and your 5-star Yelp reviews were uploaded as flat PNG image files.</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FDF2F0] border-l-4 border-[#B84A39] p-4 rounded-none space-y-1.5">
                <h4 className="font-bold text-[#7A281C] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#B84A39]" />
                  <span>Before: The Canva Image Trap</span>
                </h4>
                <p className="text-xs text-[#5C2820]">
                  Google, Apple Maps, and Siri cannot read text locked inside flat PNG graphics. When a soldier at Fort Bragg or a parent in Spring Lake searched <em>“Cambodian Pho near me”</em>, <em>“Sushi Nachos Spring Lake”</em>, or <em>“Bai Saik Chruk”</em>, Google saw <strong>zero menu items</strong> on your website—and also displayed Canva’s default “C” circle icon instead of your brand.
                </p>
              </div>

              <div className="bg-[#EEF5F0] border-l-4 border-[#2E5A44] p-4 rounded-none space-y-1.5">
                <h4 className="font-bold text-[#1E3F2E] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E5A44]" />
                  <span>Now: 100% Indexable Schema.org Microdata</span>
                </h4>
                <p className="text-xs text-[#254232]">
                  We transcribed all <strong>36 of your real dishes, prices, and descriptions</strong> into live HTML and embedded an enterprise <code className="font-mono-tech">Schema.org/Restaurant</code> JSON-LD graph in the page header. Now every single roll and Khmer specialty is directly searchable on Google, Apple Maps, and voice assistants.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: INTERACTIVE GOOGLE SEARCH SIMULATOR */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2D9C5] pb-2">
              <h2 className="text-xl font-bold text-[#14110F] font-serif-editorial flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-none bg-[#2E5A44] text-white flex items-center justify-center text-xs font-bold font-mono-tech">
                  2
                </span>
                Interactive Simulator: What Google &amp; Siri See Now
              </h2>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSimMode('before')}
                  className={`px-3 py-1 rounded-none text-xs font-bold cursor-pointer border ${
                    simMode === 'before'
                      ? 'bg-[#B84A39] text-white border-[#B84A39]'
                      : 'bg-white text-[#5C5349] border-[#D8CEB8]'
                  }`}
                >
                  Old Canva Site (Blind)
                </button>
                <button
                  onClick={() => setSimMode('after')}
                  className={`px-3 py-1 rounded-none text-xs font-bold cursor-pointer border ${
                    simMode === 'after'
                      ? 'bg-[#2E5A44] text-white border-[#2E5A44]'
                      : 'bg-white text-[#5C5349] border-[#D8CEB8]'
                  }`}
                >
                  New Schema.org Site ⭐
                </button>
              </div>
            </div>

            {simMode === 'before' ? (
              <div className="bg-white border-2 border-[#D8CEB8] p-5 rounded-none space-y-2">
                <div className="text-xs text-stone-500 font-mono-tech">
                  https://ricerootsandrolls.com (Canva Raster Export)
                </div>
                <div className="text-base font-bold text-blue-800">
                  Experience asian Flavors
                </div>
                <p className="text-xs text-stone-600">
                  No structured address, no opening hours specification, 0 indexed menu items, default Canva "C" favicon. Search engines cannot tell what dishes you serve or what your prices are.
                </p>
              </div>
            ) : (
              <div className="bg-white border-2 border-[#2E5A44] p-5 rounded-none space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#2E5A44] font-mono-tech font-bold">
                    https://ricerootsandrolls.com › Spring Lake, NC • 1124 N Bragg Blvd
                  </span>
                  <span className="bg-[#EEF5F0] text-[#2E5A44] text-[10px] font-bold px-2 py-0.5 border border-[#2E5A44]/30 font-mono-tech">
                    SCHEMA.ORG VERIFIED
                  </span>
                </div>
                <div className="text-lg font-bold text-[#1A4B8C]">
                  Rice, Roots &amp; Rolls – An Asian Kitchen | Cambodian Pho, Chinese &amp; Sushi
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C5349]">
                  <span className="text-[#C89D54] font-bold">★★★★★ 5.0 (4 Reviews)</span>
                  <span>•</span>
                  <span className="font-semibold text-[#14110F]">$$ • Cambodian, Sushi &amp; Asian Kitchen</span>
                  <span>•</span>
                  <span className="text-[#2E5A44] font-bold">📍 1124 N Bragg Blvd, Spring Lake, NC</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#EAE3D2] text-xs">
                  <div className="bg-[#FAF6EE] p-2.5 border border-[#E2D9C5]">
                    <strong className="block text-[#14110F]">Kathiew (Cambodian Pho)</strong>
                    <span className="text-[#2E5A44] font-mono-tech font-bold">$15.95</span> • Rich aromatic broth, beef, shrimp &amp; house meatballs
                  </div>
                  <div className="bg-[#FAF6EE] p-2.5 border border-[#E2D9C5]">
                    <strong className="block text-[#14110F]">Bai Saik Chruk (Khmer Pork)</strong>
                    <span className="text-[#2E5A44] font-mono-tech font-bold">$15.95</span> • Char-grilled pork, pickled daikon &amp; Koh Kong sauce
                  </div>
                  <div className="bg-[#FAF6EE] p-2.5 border border-[#E2D9C5]">
                    <strong className="block text-[#14110F]">Squad Leader Sushi Rolls</strong>
                    <span className="text-[#2E5A44] font-mono-tech font-bold">$14.95–$15.95</span> • Zero Dark Thirty, Dreadnought, Wyoming Cowboy
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 3: NEVER MISS THE TURN ON N BRAGG BLVD */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#14110F] font-serif-editorial flex items-center gap-2.5 border-b border-[#E2D9C5] pb-2">
              <span className="w-6 h-6 rounded-none bg-[#2E5A44] text-white flex items-center justify-center text-xs font-bold font-mono-tech">
                3
              </span>
              Solving the “Fast Bragg Blvd Turn-In” Problem
            </h2>
            <p className="text-xs sm:text-sm text-[#3D352E]">
              Traffic moves fast along N Bragg Blvd (Hwy 24/87), and first-time visitors can easily drive right past a storefront if they don’t know which lane to be in. We built three layers of protection so customers never miss your turn:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 border border-[#D8CEB8] space-y-1.5">
                <strong className="text-[#14110F] block">1. Exact Rooftop GPS Pin</strong>
                <p className="text-[#5C5349]">
                  Locked to <code className="font-mono-tech">35.1776006, -78.9795992</code> (<code className="font-mono-tech">1124 N Bragg Blvd</code>) with 1-tap buttons for <strong>iPhone Apple Maps</strong>, <strong>Google Maps</strong>, and <strong>Waze</strong>.
                </p>
              </div>
              <div className="bg-white p-4 border border-[#D8CEB8] space-y-1.5">
                <strong className="text-[#14110F] block">2. Lane &amp; Landmark Cues</strong>
                <p className="text-[#5C5349]">
                  Clear Northbound (from Fort Bragg) and Southbound (from Sanford/87) approach instructions right on the homepage so drivers get into the right lane early.
                </p>
              </div>
              <div className="bg-white p-4 border border-[#D8CEB8] space-y-1.5">
                <strong className="text-[#14110F] block">3. 1-Tap iPhone Action Bar</strong>
                <p className="text-[#5C5349]">
                  Pinned to the bottom of every customer’s iPhone screen so they can tap <strong>Navigate</strong> or <strong>Call (910) 920-1159</strong> with one thumb.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: WEBSITE + GOOGLE MAPS HOURS SYNC FOR A BUSY MOM */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#14110F] font-serif-editorial flex items-center gap-2.5 border-b border-[#E2D9C5] pb-2">
              <span className="w-6 h-6 rounded-none bg-[#2E5A44] text-white flex items-center justify-center text-xs font-bold font-mono-tech">
                4
              </span>
              Syncing Your Website &amp; Google Maps Hours Around Your 45-Min Commute &amp; Two Boys
            </h2>

            <p className="text-xs sm:text-sm text-[#3D352E]">
              With two young boys and a 45-minute drive twice daily, you should never have to sit at a laptop to let customers know you’re stuck in traffic or closing an hour early for a family event. Here is how our <strong>2-Step iPhone Sync</strong> works:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-5 border-2 border-[#2E5A44] space-y-2">
                <div className="flex items-center gap-2 text-[#2E5A44] font-bold text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>Step A: 1-Tap Website Commute Presets (Live Now)</span>
                </div>
                <p className="text-[#5C5349]">
                  Open <strong className="text-[#14110F]">“Chef A On-the-Fly Edit”</strong> on your iPhone and tap one preset button:
                </p>
                <ul className="space-y-1 text-[#231F1C] font-medium list-disc list-inside">
                  <li>🟢 <strong>Open Normal Hours</strong> (11:00 AM – 8:00/8:30 PM)</li>
                  <li>🚗 <strong>45-Min Commute Delay</strong> (Opening 15–20 mins late)</li>
                  <li>👦 <strong>Boys’ Family Event</strong> (Closing early at 7:00 PM)</li>
                  <li>🍱 <strong>Catering Prep Mode</strong> (Takeout &amp; Pickup Only)</li>
                </ul>
              </div>

              <div className="bg-white p-5 border border-[#D8CEB8] space-y-2">
                <div className="flex items-center gap-2 text-[#9A6B2F] font-bold text-sm">
                  <RefreshCw className="w-4 h-4" />
                  <span>Step B: Google Business Profile Sync (Zero Monthly Cost)</span>
                </div>
                <p className="text-[#5C5349]">
                  Right inside your iPhone Admin screen, tap <strong>“Copy &amp; Open Google Maps Profile”</strong>:
                </p>
                <ol className="space-y-1 text-[#231F1C] list-decimal list-inside">
                  <li>It copies your exact commute/hours update to your iPhone clipboard.</li>
                  <li>It launches your verified <strong>Google Business Profile</strong> (<code className="font-mono-tech">Rice, Roots &amp; Rolls - An Asian Kitchen</code>) on your phone so you can paste the update or toggle Special Hours in 10 seconds.</li>
                  <li>When we connect your Google Business Profile OAuth token, your website can also automatically read/write your Google Maps `specialHours` via API!</li>
                </ol>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 print:hidden">
              <button
                onClick={() => {
                  setIsSchemaWhitePageOpen(false);
                  setIsChefAdminOpen(true);
                }}
                className="px-5 py-2.5 rounded-none bg-[#C89D54] hover:bg-[#D6AD65] text-[#14110F] font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow"
              >
                👩‍🍳 Try Chef A’s iPhone Pocket Admin Now
              </button>
              <a
                href={businessInfo.googleMapsShortUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-none bg-[#2E5A44] hover:bg-[#3A7055] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Test Direct Google Maps Pin</span>
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#EBE3D1] border-t border-[#D8CEB8] text-center text-xs text-[#5C5349] font-mono-tech flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Rice, Roots &amp; Rolls • Schema.org &amp; Google Maps Sync Architecture Brief</span>
          <button
            onClick={() => setIsSchemaWhitePageOpen(false)}
            className="text-[#14110F] font-bold hover:underline cursor-pointer print:hidden"
          >
            Return to Website
          </button>
        </div>
      </div>
    </div>
  );
}
