import React, { Suspense, lazy } from 'react';
import { KitchenProvider, useKitchen } from './context/KitchenContext';
import DesignSwitcherBar from './components/DesignSwitcherBar';
import AngkorSanctuaryLayout from './components/themes/AngkorSanctuaryLayout';
import MobileAppView from './components/MobileAppView';
import OrderDrawer from './components/OrderDrawer';
import { ShoppingBag } from 'lucide-react';

const JasmineSilkLayout = lazy(() => import('./components/themes/JasmineSilkLayout'));
const SushiCraftBoardLayout = lazy(() => import('./components/themes/SushiCraftBoardLayout'));
const ChefAdminModal = lazy(() => import('./components/ChefAdminModal'));
const SchemaDiscoveryWhitePage = lazy(() => import('./components/SchemaDiscoveryWhitePage'));
const TvMenuModal = lazy(() => import('./components/TvMenuModal'));
const PrintableMenuModal = lazy(() => import('./components/PrintableMenuModal'));

function AppContent() {
  const {
    themeVersion,
    cartItemCount,
    cartTotal,
    setIsCartOpen
  } = useKitchen();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans w-full max-w-full overflow-x-hidden relative ${
        themeVersion === 'jasmine'
          ? 'bg-[#FAF7F2] text-[#1C1815]'
          : themeVersion === 'craftboard'
          ? 'bg-[#121614] text-[#F2EFE9]'
          : 'bg-[#0F0D0B] text-[#F5EFE6]'
      }`}
    >
      {/* Desktop/Tablet Floating 3-Concept Switcher & Chef Tools Pill */}
      <DesignSwitcherBar />

      {/* ================================================================= */}
      {/* DEDICATED MINIMAL NATIVE MOBILE APP VIEW (<768px)                 */}
      {/* ================================================================= */}
      <div className="md:hidden">
        <MobileAppView />
      </div>

      {/* ================================================================= */}
      {/* DESKTOP & TABLET EDITORIAL BENTO LAYOUTS (>=768px)                */}
      {/* ================================================================= */}
      <div className="hidden md:block">
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
        </Suspense>
      </div>

      {/* Shared Interactive Modals & Order Sheet */}
      <Suspense fallback={null}>
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
            ${cartTotal.toFixed(2)}
          </span>
        </button>
      )}
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
