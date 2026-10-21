import React, { useState } from 'react';
import { useKitchen } from '../context/KitchenContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Phone,
  MessageSquare,
  Check,
  ShoppingBag,
  Navigation
} from 'lucide-react';

export default function OrderDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQty,
    clearCart,
    cartTotal,
    cartItemCount,
    businessInfo
  } = useKitchen();

  const [copied, setCopied] = useState(false);

  if (!isCartOpen) return null;

  const estimatedTax = cartTotal * 0.07; // NC 7% sales tax
  const grandTotal = cartTotal + estimatedTax;

  const generateOrderSummary = () => {
    let text = `Hi Chef A! I'd like to place a takeout order for pickup at Rice, Roots & Rolls (1124 N Bragg Blvd):\n\n`;
    cart.forEach(item => {
      text += `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
      if (item.extraDetails) text += `  (${item.extraDetails})\n`;
    });
    text += `\nEstimated Total (incl. NC tax): $${grandTotal.toFixed(2)}`;
    return text;
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(generateOrderSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSmsOrder = () => {
    const summary = encodeURIComponent(generateOrderSummary());
    window.open(`sms:${businessInfo.phoneRaw}?&body=${summary}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="bg-[#181411] border-l-2 border-[#C89D54] w-full max-w-full sm:max-w-md h-full flex flex-col shadow-2xl text-[#F5F0E6]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#211B16] border-b border-[#362E26] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-none bg-[#C89D54] text-[#14110F] font-black">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif-editorial text-white leading-none">
                Your Takeout Order Tray
              </h3>
              <p className="text-xs text-[#A69B8D] mt-0.5">
                {cartItemCount} {cartItemCount === 1 ? 'dish' : 'dishes'} • Pickup at 1124 N Bragg Blvd
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-none bg-[#2C241E] hover:bg-[#3D322A] text-[#D5CCC0] hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#A69B8D]">
              <ShoppingBag className="w-10 h-10 text-[#C89D54] mb-3" />
              <h4 className="text-base font-bold text-white">Your takeout tray is empty</h4>
              <p className="text-xs text-[#A69B8D] mt-1 max-w-xs">
                Tap “+ Add to Order” on any Cambodian pho, grilled pork plate, Chinese special, or hand-rolled sushi roll to build your meal!
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#211B16] border border-[#362E26] p-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                  {item.extraDetails && (
                    <p className="text-[11px] text-[#C89D54] italic">{item.extraDetails}</p>
                  )}
                  <p className="text-xs font-bold text-[#C89D54] font-mono-tech mt-0.5">
                    ${(item.price * item.quantity).toFixed(2)}{' '}
                    <span className="text-[10px] text-[#8C8275] font-sans">
                      (${item.price.toFixed(2)} ea)
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="flex items-center bg-[#14110F] border border-[#362E26] p-0.5">
                    <button
                      onClick={() => updateCartQty(idx, -1)}
                      className="p-1 text-[#A69B8D] hover:text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-bold text-white font-mono-tech">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQty(idx, 1)}
                      className="p-1 text-[#A69B8D] hover:text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(idx)}
                    className="p-1.5 text-[#A69B8D] hover:text-[#E58B7B] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="bg-[#211B16] border-t border-[#362E26] p-4 space-y-3">
            <div className="space-y-1 text-xs text-[#D5CCC0]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono-tech">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#A69B8D]">
                <span>Est. NC Tax (7%):</span>
                <span className="font-mono-tech">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#362E26]">
                <span>Estimated Pickup Total:</span>
                <span className="text-[#C89D54] font-mono-tech text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-[#2E5A44] hover:bg-[#3A7055] text-white font-extrabold py-3 rounded-none text-sm transition shadow-lg"
              >
                <Phone className="w-4 h-4 text-[#C89D54]" />
                <span>Call Kitchen to Order: {businessInfo.phone}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSmsOrder}
                  className="flex items-center justify-center gap-1.5 bg-[#2B241E] hover:bg-[#382F27] border border-[#4A3F35] text-[#C89D54] font-bold py-2 rounded-none text-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Text Order Summary</span>
                </button>

                <button
                  onClick={handleCopyOrder}
                  className="flex items-center justify-center gap-1.5 bg-[#2B241E] hover:bg-[#382F27] border border-[#4A3F35] text-[#F5F0E6] font-bold py-2 rounded-none text-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#68B684]" />
                      <span className="text-[#68B684]">Copied!</span>
                    </>
                  ) : (
                    <span>Copy Order List</span>
                  )}
                </button>
              </div>

              <a
                href={businessInfo.googleMapsShortUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 bg-[#14110F] border border-[#362E26] text-[#D5CCC0] hover:text-white py-2 text-xs font-bold"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C89D54]" />
                <span>Directions to 1124 N Bragg Blvd, Spring Lake</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8C8275] pt-1">
              <span>Dine-In &amp; Takeout Pickup</span>
              <button
                onClick={clearCart}
                className="text-[#A69B8D] hover:text-[#E58B7B] underline cursor-pointer"
              >
                Clear Tray
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
