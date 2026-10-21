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
      className="fixed inset-0 z-50 flex items-end sm:items-stretch justify-end bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="bg-[#181512] rounded-t-3xl sm:rounded-none border-t sm:border-t-0 sm:border-l border-white/15 w-full sm:max-w-md max-h-[88vh] sm:h-full flex flex-col shadow-2xl text-[#F5EFE6]"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C89D54] text-[#14110F] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white leading-none">
                Your Order Bag
              </h3>
              <p className="text-xs text-[#A59B8F] mt-1">
                {cartItemCount} {cartItemCount === 1 ? 'dish' : 'dishes'} • 1124 N Bragg Blvd
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#A59B8F]">
              <ShoppingBag className="w-10 h-10 text-[#C89D54] mb-3" />
              <h4 className="text-base font-bold text-white">Your order bag is empty</h4>
              <p className="text-xs mt-1 max-w-xs">
                Tap + on any dish or sushi roll to build your pickup or dine-in order.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.05] border border-white/10 p-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                  <p className="text-xs font-bold text-[#C89D54] mt-0.5">
                    ${(item.price * item.quantity).toFixed(2)}{' '}
                    <span className="text-[10px] text-[#8E8478] font-normal">
                      (${item.price.toFixed(2)} ea)
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center rounded-full bg-black/40 border border-white/10 p-0.5">
                    <button
                      onClick={() => updateCartQty(idx, -1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQty(idx, 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(idx)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-[#EF4444] cursor-pointer"
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
          <div className="bg-[#120F0D] border-t border-white/10 p-5 space-y-3">
            <div className="space-y-1 text-xs text-[#C6BCB0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#8E8478]">
                <span>Est. NC Tax (7%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="text-[#C89D54] font-serif text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-[#C89D54] hover:bg-[#D7AE66] text-[#14110F] font-bold py-3 rounded-full text-xs transition shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call Kitchen to Place Order • {businessInfo.phone}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSmsOrder}
                  className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white font-semibold py-2.5 rounded-full text-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C89D54]" />
                  <span>Text Order</span>
                </button>

                <button
                  onClick={handleCopyOrder}
                  className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white font-semibold py-2.5 rounded-full text-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#52B788]" />
                      <span className="text-[#52B788]">Copied!</span>
                    </>
                  ) : (
                    <span>Copy Summary</span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8E8478] pt-1">
              <span>Pickup at 1124 N Bragg Blvd</span>
              <button
                onClick={clearCart}
                className="text-[#A59B8F] hover:text-white underline cursor-pointer"
              >
                Clear Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
