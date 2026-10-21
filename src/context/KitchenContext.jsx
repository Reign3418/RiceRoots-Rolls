import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BUSINESS_INFO,
  MAIN_MENU,
  INITIAL_SPECIALS,
  INITIAL_LIVE_STATUS,
  MEANING_PILLARS,
  CHEF_STORY_PARAGRAPHS,
  CUSTOMER_REVIEWS,
  CATERING_GALLERY
} from '../data/menuData';

const KitchenContext = createContext(null);

const STORAGE_KEY_MENU = 'rrr_menu_v1';
const STORAGE_KEY_SPECIALS = 'rrr_specials_v1';
const STORAGE_KEY_STATUS = 'rrr_live_status_v1';
const STORAGE_KEY_THEME = 'rrr_theme_v1';
const STORAGE_KEY_STEAMFX = 'rrr_steamfx_v1';

export function KitchenProvider({ children }) {
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MENU);
      return saved ? JSON.parse(saved) : MAIN_MENU;
    } catch {
      return MAIN_MENU;
    }
  });

  const [specials, setSpecials] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SPECIALS);
      return saved ? JSON.parse(saved) : INITIAL_SPECIALS;
    } catch {
      return INITIAL_SPECIALS;
    }
  });

  const [liveStatus, setLiveStatus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATUS);
      return saved ? JSON.parse(saved) : INITIAL_LIVE_STATUS;
    } catch {
      return INITIAL_LIVE_STATUS;
    }
  });

  // 3 Distinct Cultural Design Themes (Zero Neon):
  // 'sanctuary' (Angkor Sanctuary & Teak) | 'jasmine' (Jasmine & Silk Heritage) | 'craftboard' (Bragg Blvd Sushi & Craft Board)
  const [themeVersion, setThemeVersion] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      return saved || 'sanctuary';
    } catch {
      return 'sanctuary';
    }
  });

  const [isSteamFxActive, setIsSteamFxActive] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STEAMFX);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Cart / Takeout Tray State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals & White Papers
  const [isChefAdminOpen, setIsChefAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin' || window.location.search.includes('admin=1');
    }
    return false;
  });

  const [isSchemaWhitePageOpen, setIsSchemaWhitePageOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        window.location.hash === '#schema' ||
        window.location.hash === '#seo' ||
        window.location.hash === '#google-sync' ||
        window.location.search.includes('seo=1')
      );
    }
    return false;
  });

  const [isTvMenuOpen, setIsTvMenuOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#tv-menu' || window.location.hash === '#tv' || window.location.search.includes('tv=1');
    }
    return false;
  });

  const [isTvWhitePageOpen, setIsTvWhitePageOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#tv-brief' || window.location.search.includes('tv_brief=1');
    }
    return false;
  });

  const [isPrintableMenuOpen, setIsPrintableMenuOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash;
      if (h === '#admin') setIsChefAdminOpen(true);
      if (h === '#schema' || h === '#seo' || h === '#google-sync') setIsSchemaWhitePageOpen(true);
      if (h === '#tv-menu' || h === '#tv') setIsTvMenuOpen(true);
      if (h === '#tv-brief') setIsTvWhitePageOpen(true);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SPECIALS, JSON.stringify(specials));
  }, [specials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATUS, JSON.stringify(liveStatus));
  }, [liveStatus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, themeVersion);
  }, [themeVersion]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STEAMFX, JSON.stringify(isSteamFxActive));
  }, [isSteamFxActive]);

  // Menu Item Stock & Visibility Controls
  const toggleItemStock = (categoryKey, itemId) => {
    setMenu(prev => {
      const updated = prev[categoryKey].items.map(item =>
        item.id === itemId ? { ...item, inStock: !item.inStock } : item
      );
      return {
        ...prev,
        [categoryKey]: { ...prev[categoryKey], items: updated }
      };
    });
  };

  const toggleItemHidden = (categoryKey, itemId) => {
    setMenu(prev => {
      const updated = prev[categoryKey].items.map(item =>
        item.id === itemId ? { ...item, hidden: !item.hidden } : item
      );
      return {
        ...prev,
        [categoryKey]: { ...prev[categoryKey], items: updated }
      };
    });
  };

  const addMenuItem = (categoryKey, newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || `item_${Date.now()}`,
      inStock: true,
      hidden: false
    };
    setMenu(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        items: [itemWithId, ...prev[categoryKey].items]
      }
    }));
  };

  const editMenuItem = (categoryKey, itemId, updatedFields) => {
    setMenu(prev => {
      const updated = prev[categoryKey].items.map(item =>
        item.id === itemId ? { ...item, ...updatedFields } : item
      );
      return {
        ...prev,
        [categoryKey]: { ...prev[categoryKey], items: updated }
      };
    });
  };

  const removeMenuItem = (categoryKey, itemId) => {
    setMenu(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        items: prev[categoryKey].items.filter(item => item.id !== itemId)
      }
    }));
  };

  // Specials Controls
  const toggleSpecialStock = (specialId) => {
    setSpecials(prev =>
      prev.map(s => (s.id === specialId ? { ...s, inStock: !s.inStock } : s))
    );
  };

  const toggleSpecialHidden = (specialId) => {
    setSpecials(prev =>
      prev.map(s => (s.id === specialId ? { ...s, hidden: !s.hidden } : s))
    );
  };

  const addSpecial = (newSpecial) => {
    const specialWithId = {
      ...newSpecial,
      id: newSpecial.id || `spec_${Date.now()}`,
      inStock: true,
      hidden: false,
      image: newSpecial.image || './images/hero-khmer-beef.png'
    };
    setSpecials(prev => [specialWithId, ...prev]);
  };

  const editSpecial = (specialId, updatedFields) => {
    setSpecials(prev =>
      prev.map(s => (s.id === specialId ? { ...s, ...updatedFields } : s))
    );
  };

  const removeSpecial = (specialId) => {
    setSpecials(prev => prev.filter(s => s.id !== specialId));
  };

  // Kitchen & Sushi Bar Master Switches
  const toggleWokStatus = () => {
    setLiveStatus(prev => ({ ...prev, wokOpen: !prev.wokOpen }));
  };

  const toggleSushiStatus = () => {
    setLiveStatus(prev => ({ ...prev, sushiOpen: !prev.sushiOpen }));
  };

  const updateLiveStatus = (updates) => {
    setLiveStatus(prev => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  };

  // Cart / Order Tray Operations
  const addToCart = (item, extraDetails = '', overridePrice = null) => {
    const resolvedPrice =
      overridePrice !== null
        ? overridePrice
        : item.numericPrice ||
          item.singlePrice ||
          parseFloat(String(item.price || '').replace(/[^0-9.]/g, '')) ||
          12.0;

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.extraDetails === extraDetails);
      if (existing) {
        return prev.map(i => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name || item.title,
          price: resolvedPrice,
          extraDetails,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQty = (index, delta) => {
    setCart(prev =>
      prev
        .map((item, i) => {
          if (i === index) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const resetToDefaults = () => {
    if (window.confirm("Reset all menu items, prices, and live hours back to Rice, Roots & Rolls defaults?")) {
      setMenu(MAIN_MENU);
      setSpecials(INITIAL_SPECIALS);
      setLiveStatus(INITIAL_LIVE_STATUS);
    }
  };

  return (
    <KitchenContext.Provider
      value={{
        businessInfo: BUSINESS_INFO,
        meaningPillars: MEANING_PILLARS,
        chefStoryParagraphs: CHEF_STORY_PARAGRAPHS,
        customerReviews: CUSTOMER_REVIEWS,
        cateringGallery: CATERING_GALLERY,
        menu,
        specials,
        liveStatus,
        updateLiveStatus,
        toggleWokStatus,
        toggleSushiStatus,
        toggleItemStock,
        toggleItemHidden,
        addMenuItem,
        editMenuItem,
        removeMenuItem,
        toggleSpecialStock,
        toggleSpecialHidden,
        addSpecial,
        editSpecial,
        removeSpecial,
        themeVersion,
        setThemeVersion,
        isSteamFxActive,
        setIsSteamFxActive,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartTotal,
        cartItemCount,
        isChefAdminOpen,
        setIsChefAdminOpen,
        isSchemaWhitePageOpen,
        setIsSchemaWhitePageOpen,
        isTvMenuOpen,
        setIsTvMenuOpen,
        isTvWhitePageOpen,
        setIsTvWhitePageOpen,
        isPrintableMenuOpen,
        setIsPrintableMenuOpen,
        resetToDefaults
      }}
    >
      {children}
    </KitchenContext.Provider>
  );
}

export function useKitchen() {
  const ctx = useContext(KitchenContext);
  if (!ctx) throw new Error("useKitchen must be used within a KitchenProvider");
  return ctx;
}
