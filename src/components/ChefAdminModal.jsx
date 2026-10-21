import React, { useState } from 'react';
import { useKitchen } from '../context/KitchenContext';
import {
  X,
  ChefHat,
  Clock,
  MapPin,
  Check,
  Power,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  Tv,
  Heart,
  Car,
  ExternalLink,
  Copy,
  Flame,
  Fish
} from 'lucide-react';

export default function ChefAdminModal() {
  const {
    isChefAdminOpen,
    setIsChefAdminOpen,
    setIsTvMenuOpen,
    setIsSchemaWhitePageOpen,
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
    resetToDefaults
  } = useKitchen();

  // Default to 'commuteHours' tab so Chef A can update hours in 1 tap on her iPhone!
  const [activeTab, setActiveTab] = useState('commuteHours'); // 'commuteHours' | 'rush86' | 'menuEditor' | 'marquee'
  const [saveMessage, setSaveMessage] = useState('');

  // Custom Status Form State
  const [customBadge, setCustomBadge] = useState(liveStatus.badgeText);
  const [customHeadline, setCustomHeadline] = useState(liveStatus.headline);
  const [customSubtext, setCustomSubtext] = useState(liveStatus.subtext);
  const [customHours, setCustomHours] = useState(liveStatus.customHoursToday);
  const [marqueeText, setMarqueeText] = useState(liveStatus.topMarquee);

  // Menu Editor Filters
  const [editorCategory, setEditorCategory] = useState('all');
  const [editorStatusFilter, setEditorStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add/Edit Item Modal Form
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('southeastSpecials');
  const [formPrice, setFormPrice] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formExtraOption, setFormExtraOption] = useState('');
  const [formIsSushi, setFormIsSushi] = useState(false);

  if (!isChefAdminOpen) return null;

  const showNotification = (msg) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 2800);
  };

  // 1-Tap Commute & Family Life Presets for Chef A
  const commutePresets = [
    {
      id: 'open_normal',
      icon: '🟢',
      label: 'Open Normal Hours (11:00 AM – 8:00/8:30 PM)',
      badgeText: '🟢 Kitchen & Sushi Bar Open Today',
      headline: '1124 N Bragg Blvd, Spring Lake, NC • Dine-In, Takeout & Catering',
      subtext: 'Mon–Thu 11:00 AM – 8:00 PM • Fri–Sat 11:00 AM – 8:30 PM • Sun Closed',
      customHoursToday: '11:00 AM – 8:00 PM (Fri–Sat till 8:30 PM)',
      topMarquee: '🌾 Welcome to Rice, Roots & Rolls at 1124 N Bragg Blvd! Fresh Cambodian Pho, Char-Grilled Khmer Pork & Hand-Rolled Sushi by Chef A.',
      wokOpen: true,
      sushiOpen: true
    },
    {
      id: 'commute_delay',
      icon: '🚗',
      label: '45-Min Commute Traffic Delay (Opening 15–20 Mins Late)',
      badgeText: '🚗 Chef A En Route — Opening Shortly!',
      headline: 'Quick Commute Update: Broth is Simmering, Doors Open at 11:20 AM Today!',
      subtext: 'Chef A is wrapping up her 45-minute morning commute — thank you for your patience, Spring Lake!',
      customHoursToday: '11:20 AM – 8:00 PM Today',
      topMarquee: '🚗 Commute Update from Chef A: Running 15–20 mins behind on our morning drive in! Doors open at 11:20 AM — call (910) 920-1159 to pre-order!',
      wokOpen: true,
      sushiOpen: true
    },
    {
      id: 'family_early',
      icon: '👦',
      label: "Boys' Family / School Event (Closing Early at 7:00 PM)",
      badgeText: '👦 Family Evening — Closing at 7:00 PM Today',
      headline: 'Open Today 11:00 AM – 7:00 PM (Closing 1 Hour Early for the Boys)',
      subtext: 'Come grab early dinner or takeout before Chef A heads out to her sons’ evening event!',
      customHoursToday: '11:00 AM – 7:00 PM Today',
      topMarquee: '🤍 Family Update: We are open 11:00 AM – 7:00 PM today so Chef A can cheer on her two boys this evening! Order dinner early at (910) 920-1159.',
      wokOpen: true,
      sushiOpen: true
    },
    {
      id: 'catering_only',
      icon: '🍱',
      label: 'Large Catering Prep (Takeout & Pickup Only)',
      badgeText: '🍱 Takeout & Phone Pickup Only right now',
      headline: 'Preparing a Large Community Catering Order — Call (910) 920-1159 for Pickup',
      subtext: 'Takeout orders welcome! Call ahead and we will have your bags hot at the counter.',
      customHoursToday: 'Takeout & Pickup Active',
      topMarquee: '🍱 We are preparing a large Fort Bragg / Spring Lake catering order today — Call (910) 920-1159 for fast takeout pickup!',
      wokOpen: true,
      sushiOpen: true
    },
    {
      id: 'closed_today',
      icon: '🔴',
      label: 'Closed Today (Family Day / Restocking)',
      badgeText: '🔴 Closed Today for Family Time',
      headline: 'Resting & Spending Time with the Boys Today — See You Tomorrow at 11:00 AM!',
      subtext: 'Normal Hours: Mon–Thu 11:00 AM – 8:00 PM • Fri–Sat 11:00 AM – 8:30 PM',
      customHoursToday: 'Closed Today • Reopens 11:00 AM',
      topMarquee: '🤍 We are closed today for family time with the boys. We can’t wait to welcome you back at 1124 N Bragg Blvd at 11:00 AM!',
      wokOpen: false,
      sushiOpen: false
    }
  ];

  const handleApplyPreset = (preset) => {
    setCustomBadge(preset.badgeText);
    setCustomHeadline(preset.headline);
    setCustomSubtext(preset.subtext);
    setCustomHours(preset.customHoursToday);
    setMarqueeText(preset.topMarquee);
    updateLiveStatus({
      mode: preset.id,
      badgeText: preset.badgeText,
      headline: preset.headline,
      subtext: preset.subtext,
      customHoursToday: preset.customHoursToday,
      topMarquee: preset.topMarquee,
      wokOpen: preset.wokOpen,
      sushiOpen: preset.sushiOpen
    });
    showNotification(`Live on site: ${preset.label}`);
  };

  const handleSaveCustomStatus = (e) => {
    e.preventDefault();
    updateLiveStatus({
      badgeText: customBadge,
      headline: customHeadline,
      subtext: customSubtext,
      customHoursToday: customHours,
      topMarquee: marqueeText
    });
    showNotification('Updated live hours & announcement banner!');
  };

  const handleCopyGoogleSyncNote = () => {
    const text = `${customBadge} — ${customHeadline} (${customHours}). Call (910) 920-1159 for takeout at 1124 N Bragg Blvd, Spring Lake, NC.`;
    navigator.clipboard.writeText(text);
    showNotification('Copied update! Opening Google Business Profile...');
    setTimeout(() => {
      window.open('https://business.google.com/', '_blank');
    }, 600);
  };

  // Menu Item Form Handlers
  const handleOpenAddForm = () => {
    setEditingTarget(null);
    setFormName('');
    setFormCategory(editorCategory !== 'all' ? editorCategory : 'southeastSpecials');
    setFormPrice('$15.95');
    setFormDescription('');
    setFormBadge('');
    setFormExtraOption('');
    setFormIsSushi(false);
    setIsItemFormOpen(true);
  };

  const handleOpenEditForm = (categoryKey, item, isSpecial = false) => {
    setEditingTarget({ categoryKey, item, isSpecial });
    setFormName(item.name || item.title || '');
    setFormCategory(isSpecial ? 'specials' : categoryKey);
    setFormPrice(item.price || '');
    setFormDescription(item.description || '');
    setFormBadge(item.badge || '');
    setFormExtraOption(item.extraOption || '');
    setFormIsSushi(Boolean(item.isSushi));
    setIsItemFormOpen(true);
  };

  const handleSaveItemForm = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;
    const numericVal = parseFloat(formPrice.replace(/[^0-9.]/g, '')) || 0;

    if (editingTarget) {
      const { categoryKey, item, isSpecial } = editingTarget;
      if (isSpecial) {
        editSpecial(item.id, {
          title: formName,
          price: formPrice,
          singlePrice: numericVal,
          description: formDescription,
          badge: formBadge,
          isSushi: formIsSushi
        });
      } else {
        editMenuItem(categoryKey, item.id, {
          name: formName,
          price: formPrice,
          numericPrice: numericVal,
          description: formDescription,
          badge: formBadge,
          extraOption: formExtraOption,
          isSushi: formIsSushi
        });
      }
      showNotification(`Saved changes to "${formName}"`);
    } else {
      if (formCategory === 'specials') {
        addSpecial({
          title: formName,
          price: formPrice,
          singlePrice: numericVal,
          description: formDescription,
          badge: formBadge || "Chef A's Special",
          source: "Featured Dish",
          isSushi: formIsSushi
        });
      } else {
        addMenuItem(formCategory, {
          name: formName,
          price: formPrice,
          numericPrice: numericVal,
          description: formDescription,
          badge: formBadge,
          extraOption: formExtraOption,
          isSushi: formIsSushi
        });
      }
      showNotification(`Added "${formName}" to live menu!`);
    }
    setIsItemFormOpen(false);
  };

  const getAllEditorItems = () => {
    let items = [];
    if (editorCategory === 'all' || editorCategory === 'specials') {
      specials.forEach(s => {
        items.push({
          id: s.id,
          name: s.title,
          price: s.price,
          description: s.description,
          badge: s.badge,
          inStock: s.inStock !== false,
          hidden: Boolean(s.hidden),
          categoryKey: 'specials',
          categoryLabel: 'Featured Spotlight',
          isSpecial: true,
          rawItem: s
        });
      });
    }
    Object.entries(menu).forEach(([catKey, catData]) => {
      if (editorCategory === 'all' || editorCategory === catKey) {
        catData.items.forEach(item => {
          items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            badge: item.badge,
            extraOption: item.extraOption,
            inStock: item.inStock !== false,
            hidden: Boolean(item.hidden),
            categoryKey: catKey,
            categoryLabel: catData.categoryName,
            isSpecial: false,
            rawItem: item
          });
        });
      }
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        i =>
          i.name.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }

    if (editorStatusFilter === 'inStock') items = items.filter(i => i.inStock && !i.hidden);
    if (editorStatusFilter === 'soldOut') items = items.filter(i => !i.inStock && !i.hidden);
    if (editorStatusFilter === 'hidden') items = items.filter(i => i.hidden);

    return items;
  };

  const editorItems = getAllEditorItems();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div
        className="bg-[#161310] border-2 border-[#C89D54] rounded-none max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-[#F5F0E6]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F1A16] border-b border-[#362E26] p-3.5 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-none bg-[#C89D54] text-[#14110F] font-black">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#253529] text-[#A5D6B5] px-2 py-0.5 rounded-none border border-[#4A7C59]">
                  iPhone-Friendly Pocket Admin
                </span>
                <span className="text-xs text-[#A69B8D] hidden sm:inline">
                  Built for Chef A’s 45-Minute Commute & Busy Family Schedule
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F0E6] font-serif-editorial tracking-wide leading-tight mt-0.5">
                On-the-Fly Hours, Fast 86 Sold-Out & Menu Editor
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsChefAdminOpen(false)}
            className="p-2 rounded-none bg-[#2A231E] hover:bg-[#3A3029] text-[#D5CCC0] hover:text-white transition cursor-pointer"
            aria-label="Close Admin"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Touch-Friendly Tab Bar */}
        <div className="bg-[#1A1613] border-b border-[#2E2721] px-2.5 sm:px-4 py-2 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('commuteHours')}
            className={`px-3 py-2 rounded-none text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'commuteHours'
                ? 'bg-[#C89D54] text-[#14110F] shadow'
                : 'text-[#D5CCC0] hover:text-white bg-[#241E1A]'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>🚗 1-Tap Commute & Family Hours</span>
          </button>

          <button
            onClick={() => setActiveTab('rush86')}
            className={`px-3 py-2 rounded-none text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'rush86'
                ? 'bg-[#C89D54] text-[#14110F] shadow'
                : 'text-[#D5CCC0] hover:text-white bg-[#241E1A]'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>⚡ Fast 86 (Sold Out)</span>
          </button>

          <button
            onClick={() => setActiveTab('menuEditor')}
            className={`px-3 py-2 rounded-none text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'menuEditor'
                ? 'bg-[#C89D54] text-[#14110F] shadow'
                : 'text-[#D5CCC0] hover:text-white bg-[#241E1A]'
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>📋 Edit Prices & Dishes</span>
          </button>

          <button
            onClick={() => {
              setIsChefAdminOpen(false);
              setIsTvMenuOpen(true);
            }}
            className="px-3 py-2 rounded-none text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap bg-[#2E5A44] hover:bg-[#3A7055] text-white shrink-0 ml-auto"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>📺 1080p TV Menu</span>
          </button>
        </div>

        {/* Save Notification */}
        {saveMessage && (
          <div className="bg-[#2E5A44] text-white text-xs sm:text-sm font-bold py-2 px-4 flex items-center justify-center gap-2 shrink-0">
            <Check className="w-4 h-4" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* ================================================================= */}
          {/* TAB 1: 1-TAP COMMUTE & FAMILY HOURS + GOOGLE MAPS SYNC BRIDGE     */}
          {/* ================================================================= */}
          {activeTab === 'commuteHours' && (
            <div className="space-y-6">
              <div className="bg-[#1F2D24] border border-[#4A7C59] p-4 sm:p-5 rounded-none space-y-2">
                <div className="flex items-center gap-2 text-[#C89D54] text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-[#C89D54]" />
                  <span>Built for Your Two Boys & Your 45-Minute Commute</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E6F0E9] leading-relaxed">
                  With two young boys and a 45-minute drive twice a day, life happens! Tap any button below from your iPhone to immediately update the website’s live banner and hours so your Spring Lake & Fort Bragg guests stay connected with you.
                </p>
              </div>

              {/* 1-Tap Preset Cards */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#C89D54]">
                  1. Tap a Live Status Preset (Instant Website Update):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {commutePresets.map(preset => {
                    const isCurrent = liveStatus.mode === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleApplyPreset(preset)}
                        className={`p-4 rounded-none border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                          isCurrent
                            ? 'bg-[#28211B] border-2 border-[#C89D54] shadow-lg'
                            : 'bg-[#1C1815] border-[#332B24] hover:border-[#C89D54]/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-sm text-[#F5F0E6]">
                            {preset.icon} {preset.label}
                          </span>
                          {isCurrent && (
                            <span className="bg-[#C89D54] text-[#14110F] text-[10px] font-black uppercase px-2 py-0.5 rounded-none shrink-0">
                              LIVE NOW
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#A69B8D]">{preset.headline}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google Maps / Business Profile 1-Tap Bridge */}
              <div className="bg-[#1C1815] border border-[#3D332B] p-4 sm:p-5 rounded-none space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono-tech uppercase text-[#C89D54] font-bold">
                      Google Maps + Apple Maps Sync Bridge
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      2. Sync Today’s Hours Update to Google Maps in 1 Tap
                    </h4>
                    <p className="text-xs text-[#A69B8D] mt-0.5">
                      Copies your current status message to your iPhone clipboard and opens your Google Business Profile (`Rice, Roots & Rolls - An Asian Kitchen`) so Google Maps matches your website in 10 seconds.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      onClick={handleCopyGoogleSyncNote}
                      className="px-4 py-2.5 rounded-none bg-[#2E5A44] hover:bg-[#3A7055] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy & Open Google Maps Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsChefAdminOpen(false);
                        setIsSchemaWhitePageOpen(true);
                      }}
                      className="px-3 py-2.5 rounded-none bg-[#26201B] hover:bg-[#332B24] border border-[#4A3F35] text-[#C89D54] font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Sync Guide</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Message Override Form */}
              <form onSubmit={handleSaveCustomStatus} className="bg-[#1C1815] border border-[#332B24] p-4 sm:p-5 rounded-none space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#C89D54]">
                  3. Or Type Any Custom Message for Your Customers Today:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#A69B8D] uppercase mb-1">
                      Status Badge
                    </label>
                    <input
                      type="text"
                      value={customBadge}
                      onChange={e => setCustomBadge(e.target.value)}
                      className="w-full bg-[#120F0D] border border-[#3D332B] rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C89D54]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#A69B8D] uppercase mb-1">
                      Today's Hours Text
                    </label>
                    <input
                      type="text"
                      value={customHours}
                      onChange={e => setCustomHours(e.target.value)}
                      className="w-full bg-[#120F0D] border border-[#3D332B] rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C89D54]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#A69B8D] uppercase mb-1">
                    Top Website Marquee Announcement
                  </label>
                  <input
                    type="text"
                    value={marqueeText}
                    onChange={e => setMarqueeText(e.target.value)}
                    className="w-full bg-[#120F0D] border border-[#3D332B] rounded-none px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C89D54]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#C89D54] hover:bg-[#D6AD65] text-[#14110F] font-extrabold px-5 py-2.5 rounded-none text-xs uppercase tracking-wider cursor-pointer"
                >
                  Save Custom Hours & Banner
                </button>
              </form>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: FAST 86 RUSH MODE (1-TAP SOLD OUT & KITCHEN CUTOFFS)       */}
          {/* ================================================================= */}
          {activeTab === 'rush86' && (
            <div className="space-y-6">
              {/* Master Kitchen & Sushi Bar Switches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-none bg-[#1C1815] border-2 border-[#3D332B] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#C89D54] uppercase flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Wok & Hot Kitchen Status
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {liveStatus.wokOpen ? '🟢 HOT KITCHEN OPEN' : '🔴 KITCHEN LAST CALL / OFF'}
                    </h4>
                    <p className="text-xs text-[#A69B8D]">
                      Toggle hot wok, pho & fryer items 30 mins before closing
                    </p>
                  </div>
                  <button
                    onClick={toggleWokStatus}
                    className={`px-4 py-2.5 rounded-none font-extrabold text-xs uppercase cursor-pointer shrink-0 ${
                      liveStatus.wokOpen
                        ? 'bg-[#B84A39] text-white'
                        : 'bg-[#2E5A44] text-white'
                    }`}
                  >
                    {liveStatus.wokOpen ? 'Turn Kitchen OFF' : 'Turn Kitchen ON'}
                  </button>
                </div>

                <div className="p-4 rounded-none bg-[#1C1815] border-2 border-[#3D332B] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#C89D54] uppercase flex items-center gap-1">
                      <Fish className="w-3.5 h-3.5" /> Hand-Rolled Sushi Bar Status
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {liveStatus.sushiOpen ? '🟢 SUSHI BAR ROLLING' : '🔴 SUSHI BAR CLOSED'}
                    </h4>
                    <p className="text-xs text-[#A69B8D]">
                      Toggle all sushi rolls & sashimi starters with 1 tap
                    </p>
                  </div>
                  <button
                    onClick={toggleSushiStatus}
                    className={`px-4 py-2.5 rounded-none font-extrabold text-xs uppercase cursor-pointer shrink-0 ${
                      liveStatus.sushiOpen
                        ? 'bg-[#B84A39] text-white'
                        : 'bg-[#2E5A44] text-white'
                    }`}
                  >
                    {liveStatus.sushiOpen ? 'Close Sushi Bar' : 'Open Sushi Bar'}
                  </button>
                </div>
              </div>

              {/* 1-Tap 86 Grid */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Tap Any Dish or Roll to Flip Between IN STOCK and SOLD OUT:
                  </h4>
                  <p className="text-xs text-[#A69B8D]">
                    Updates your mobile menu, desktop site, and 1080p TV Menu Board immediately.
                  </p>
                </div>

                {Object.entries(menu).map(([catKey, catData]) => (
                  <div key={catKey} className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#C89D54] border-b border-[#2E2721] pb-1">
                      {catData.categoryName}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {catData.items.filter(i => !i.hidden).map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleItemStock(catKey, item.id)}
                          className={`p-3 rounded-none border text-left flex items-center justify-between gap-2 transition cursor-pointer ${
                            item.inStock
                              ? 'bg-[#1F1A16] border-[#4A7C59]/60 hover:border-[#C89D54]'
                              : 'bg-[#291816] border-[#B84A39] opacity-75'
                          }`}
                        >
                          <div className="truncate">
                            <div className="text-xs font-bold text-white truncate">{item.name}</div>
                            <div className="text-[11px] text-[#C89D54] font-mono-tech">{item.price}</div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-none text-[10px] font-extrabold uppercase shrink-0 ${
                              item.inStock
                                ? 'bg-[#2E5A44] text-white'
                                : 'bg-[#B84A39] text-white'
                            }`}
                          >
                            {item.inStock ? 'IN STOCK' : 'SOLD OUT'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: FULL MENU & PRICE EDITOR                                   */}
          {/* ================================================================= */}
          {activeTab === 'menuEditor' && (
            <div className="space-y-4">
              <div className="bg-[#1C1815] border border-[#332B24] p-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#A69B8D] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search any dish, sushi roll, or price..."
                    className="w-full bg-[#120F0D] border border-[#3D332B] rounded-none pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C89D54]"
                  />
                </div>

                <button
                  onClick={handleOpenAddForm}
                  className="bg-[#2E5A44] hover:bg-[#3A7055] text-white font-extrabold px-4 py-2 rounded-none text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Dish / Roll</span>
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
                {[
                  { key: 'all', label: 'All Menu (36+ Items)' },
                  { key: 'specials', label: '★ Featured Spotlight' },
                  { key: 'southeastSpecials', label: 'Southeast Specials' },
                  { key: 'chefsSpecials', label: "Chef's Specials" },
                  { key: 'squadLeaderSushi', label: 'Squad Leader Sushi' },
                  { key: 'sushiStartersAndStandard', label: 'Sushi Starters & Rolls' },
                  { key: 'chineseSpecials', label: 'Chinese Specials' },
                  { key: 'appetizersAndDrinks', label: 'Appetizers & Drinks' }
                ].map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setEditorCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-none font-bold transition cursor-pointer whitespace-nowrap border ${
                      editorCategory === cat.key
                        ? 'bg-[#C89D54] text-[#14110F] border-[#C89D54]'
                        : 'bg-[#1C1815] text-[#D5CCC0] border-[#332B24]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {editorItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-none bg-[#1C1815] border border-[#332B24] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-[#28221D] text-[#C89D54] px-2 py-0.5 rounded-none">
                          {item.categoryLabel}
                        </span>
                        {!item.inStock && (
                          <span className="text-[10px] font-bold uppercase bg-[#B84A39] text-white px-2 py-0.5 rounded-none">
                            SOLD OUT
                          </span>
                        )}
                        {item.hidden && (
                          <span className="text-[10px] font-bold uppercase bg-stone-700 text-white px-2 py-0.5 rounded-none">
                            HIDDEN
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="text-sm font-bold text-[#C89D54] font-mono-tech">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-[#A69B8D] line-clamp-1">{item.description}</p>
                      )}
                    </div>

                    <div className="flex items-center flex-wrap gap-2 shrink-0">
                      <button
                        onClick={() =>
                          item.isSpecial
                            ? toggleSpecialStock(item.id)
                            : toggleItemStock(item.categoryKey, item.id)
                        }
                        className="px-2.5 py-1.5 rounded-none text-xs font-bold bg-[#25201B] border border-[#3D332B] text-[#E6DEC8] cursor-pointer"
                      >
                        {item.inStock ? '86 Sold Out' : 'Mark In Stock'}
                      </button>

                      <button
                        onClick={() =>
                          item.isSpecial
                            ? toggleSpecialHidden(item.id)
                            : toggleItemHidden(item.categoryKey, item.id)
                        }
                        className="px-2.5 py-1.5 rounded-none text-xs font-bold bg-[#25201B] border border-[#3D332B] text-[#A69B8D] cursor-pointer flex items-center gap-1"
                      >
                        {item.hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{item.hidden ? 'Show' : 'Hide'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditForm(item.categoryKey, item.rawItem, item.isSpecial)}
                        className="px-3 py-1.5 rounded-none bg-[#C89D54] text-[#14110F] font-bold text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${item.name}"?`)) {
                            item.isSpecial
                              ? removeSpecial(item.id)
                              : removeMenuItem(item.categoryKey, item.id);
                          }
                        }}
                        className="p-1.5 rounded-none bg-[#291816] text-[#E58B7B] border border-[#B84A39]/40 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#1A1613] border-t border-[#2E2721] px-4 py-3 flex items-center justify-between text-xs text-[#A69B8D] shrink-0">
          <button
            onClick={resetToDefaults}
            className="text-[#A69B8D] hover:text-white underline cursor-pointer"
          >
            Reset All Menu & Hours to Factory Defaults
          </button>
          <button
            onClick={() => setIsChefAdminOpen(false)}
            className="bg-[#C89D54] text-[#14110F] font-extrabold px-4 py-1.5 rounded-none cursor-pointer"
          >
            Done Editing
          </button>
        </div>

        {/* Add / Edit Item Sub-Modal */}
        {isItemFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <form
              onSubmit={handleSaveItemForm}
              className="bg-[#1C1815] border-2 border-[#C89D54] p-5 max-w-md w-full space-y-4 rounded-none"
            >
              <div className="flex items-center justify-between border-b border-[#332B24] pb-2">
                <h4 className="font-bold text-base text-white">
                  {editingTarget ? 'Edit Menu Dish / Roll' : 'Add New Dish / Roll'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsItemFormOpen(false)}
                  className="text-[#A69B8D] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#A69B8D] mb-1">
                  Dish or Roll Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  required
                  className="w-full bg-[#120F0D] border border-[#3D332B] px-3 py-2 text-sm text-white rounded-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#A69B8D] mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formPrice}
                    onChange={e => setFormPrice(e.target.value)}
                    required
                    className="w-full bg-[#120F0D] border border-[#3D332B] px-3 py-2 text-sm text-white rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#A69B8D] mb-1">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={e => setFormBadge(e.target.value)}
                    placeholder="e.g. Chef's Special"
                    className="w-full bg-[#120F0D] border border-[#3D332B] px-3 py-2 text-sm text-white rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#A69B8D] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full bg-[#120F0D] border border-[#3D332B] px-3 py-2 text-sm text-white rounded-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsItemFormOpen(false)}
                  className="px-4 py-2 bg-[#2A231E] text-white text-xs font-bold rounded-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C89D54] text-[#14110F] text-xs font-extrabold rounded-none"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
