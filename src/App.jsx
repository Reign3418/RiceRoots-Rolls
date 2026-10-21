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
    cartSubtotal,
    setIsCartOpen,
    setIsChefAdminOpen
  } = useKitchen();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans pb-20 md:pb-0 w-full max-w-full overflow-x-hidden relative ${
        themeVersion === 'jasmine'
          ? 'bg-[#FAF7F2] text-[#1C1815]'
          : themeVersion === 'craftboard'
          ? 'bg-[#121614] text-[#F2EFE9]'
          : 'bg-[#0F0D0B] text-[#F5EFE6]'
      }`}
    >
      {/* Floating Bottom-Right 3-Concept Switcher & Chef Tools Pill */}
      <DesignSwitcherBar />

      {/* Active Website Concept Layout */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-[#C89D54] font-serif text-xl">
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

      {/* Desktop Floating Order Bag Capsule when items are in cart */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="hidden md:flex fixed bottom-6 left-6 z-50 items-center gap-3 px-5 py-3.5 rounded-full bg-[#C89D54] hover:bg-[#D7AE66] text-[#120F0D] font-bold text-xs shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Your Order Bag ({cartItemCount})</span>
          <span className="px-2.5 py-0.5 rounded-full bg-black/15 font-extrabold">
            ${cartSubtotal.toFixed(2)}
          </span>
        </button>
      )}

      {/* iPhone & Mobile Floating Frosted-Glass Action Capsule (<768px) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 rounded-full border border-white/15 bg-[#161311]/90 backdrop-blur-2xl p-1.5 flex items-center gap-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
        <a
          href={`tel:${businessInfo.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#2E5A44] text-white font-bold py-2.5 px-3 rounded-full text-xs"
        >
          <Phone className="w-3.5 h-3.5 text-[#E5C17B]" />
          <span>Call</span>
        </a>

        <a
          href={businessInfo.googleMapsShortUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#C89D54] text-[#14110F] font-bold py-2.5 px-3 rounded-full text-xs"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </a>

        <button
          onClick={() => setIsChefAdminOpen(true)}
          className="flex items-center justify-center gap-1 bg-white/10 text-[#F5EFE6] font-semibold py-2.5 px-3 rounded-full text-xs cursor-pointer"
        >
          <ChefHat className="w-3.5 h-3.5 text-[#C89D54]" />
          <span>Chef</span>
        </button>

        {cartItemCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 bg-[#9E4734] text-white font-bold py-2.5 px-3 rounded-full text-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cartItemCount})</span>
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
