import React, { Suspense, lazy } from 'react';
import { KitchenProvider, useKitchen } from './context/KitchenContext';
import DesignSwitcherBar from './components/DesignSwitcherBar';
import AngkorSanctuaryLayout from './components/themes/AngkorSanctuaryLayout';
import OrderDrawer from './components/OrderDrawer';
import { Phone, Navigation, ShoppingBag, ChefHat } from 'lucide-react';

const JasmineSilkLayout = lazy(() => import('./components/themes/JasmineSilkLayout'));
const SushiCraftBoardLayout = lazy(() => import('./components/themes/SushiCraftBoardLayout'));
const ChefAdminModal = lazy(() => import('./components/ChefAdminModal'));
const SchemaDiscoveryWhitePage = lazy(() => import('./components/SchemaDiscoveryWhitePage'));
const TvMenuModal = lazy(() => import('./components/TvMenuModal'));
const PrintableMenuModal = lazy(() => import('./components/PrintableMenuModal'));

function AppContent() {
  const {
    themeVersion,
    businessInfo,
    cartItemCount,
    setIsCartOpen,
    setIsChefAdminOpen
  } = useKitchen();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans pb-16 md:pb-0 w-full max-w-full overflow-x-hidden relative ${
        themeVersion === 'jasmine'
          ? 'bg-[#FAF6EE] text-[#231F1C]'
          : themeVersion === 'craftboard'
          ? 'bg-[#161917] text-[#F4F1EA]'
          : 'bg-[#14110F] text-[#F5F0E6]'
      }`}
    >
      {/* Top 3-Concept Switcher & Operator Tools Bar */}
      <DesignSwitcherBar />

      {/* Active Website Concept Layout */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-[#C89D54] font-serif-editorial text-xl">
            Loading Rice, Roots &amp; Rolls...
          </div>
        }
      >
        {themeVersion === 'jasmine' ? (
          <JasmineSilkLayout />
        ) : themeVersion === 'craftboard' ? (
          <SushiCraftBoardLayout />
        ) : (
          <AngkorSanctuaryLayout />
        )}

        <ChefAdminModal />
        <SchemaDiscoveryWhitePage />
        <TvMenuModal />
        <PrintableMenuModal />
      </Suspense>

      <OrderDrawer />

      {/* =================================================================== */}
      {/* iPHONE & MOBILE STICKY BOTTOM ACTION BAR (<768px)                   */}
      {/* =================================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#362E26] bg-[#14110F]/95 backdrop-blur-md p-2 flex items-center gap-1.5 shadow-2xl">
        <a
          href={`tel:${businessInfo.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#2E5A44] text-white font-extrabold py-2.5 px-2 rounded-none text-xs uppercase tracking-wider border border-[#4A7C59]"
        >
          <Phone className="w-3.5 h-3.5 text-[#C89D54]" />
          <span>Call</span>
        </a>

        <a
          href={businessInfo.googleMapsShortUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#C89D54] text-[#14110F] font-extrabold py-2.5 px-2 rounded-none text-xs uppercase tracking-wider"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </a>

        <button
          onClick={() => setIsChefAdminOpen(true)}
          className="flex items-center justify-center gap-1 bg-[#241E1A] border border-[#3D332B] text-[#E6DEC8] font-bold py-2.5 px-2.5 rounded-none text-xs uppercase tracking-wider cursor-pointer"
        >
          <ChefHat className="w-3.5 h-3.5 text-[#C89D54]" />
          <span>Edit</span>
        </button>

        {cartItemCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 bg-[#8C3B2B] text-white font-extrabold py-2.5 px-2 rounded-none text-xs uppercase tracking-wider border border-[#C89D54] cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Tray ({cartItemCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <KitchenProvider>
      <AppContent />
    </KitchenProvider>
  );
}
