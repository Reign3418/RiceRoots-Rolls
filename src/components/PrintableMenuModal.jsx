import React from 'react';
import { useKitchen } from '../context/KitchenContext';
import { X, Download, FileImage } from 'lucide-react';

export default function PrintableMenuModal() {
  const { isPrintableMenuOpen, setIsPrintableMenuOpen } = useKitchen();

  if (!isPrintableMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-3 sm:p-6 flex justify-center items-start animate-fadeIn"
      onClick={() => setIsPrintableMenuOpen(false)}
    >
      <div
        className="bg-[#181411] border-2 border-[#C89D54] max-w-5xl w-full my-4 p-4 sm:p-6 text-[#F5F0E6] space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#332B24] pb-4">
          <div className="flex items-center gap-2.5">
            <FileImage className="w-5 h-5 text-[#C89D54]" />
            <div>
              <h3 className="text-xl font-bold font-serif-editorial">
                Chef A’s Original Printable Menu Boards
              </h3>
              <p className="text-xs text-[#A69B8D]">
                High-resolution Main Kitchen Menu &amp; Sushi Menu boards for printing or saving to your phone
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPrintableMenuOpen(false)}
            className="p-2 bg-[#26201B] hover:bg-[#B84A39] text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#120F0D] border border-[#332B24] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#C89D54]">1. Main Kitchen Menu Board</span>
              <a
                href="./images/menu-board-main.png"
                download="Rice_Roots_Rolls_Main_Menu.png"
                className="px-3 py-1.5 bg-[#2E5A44] hover:bg-[#3A7055] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </a>
            </div>
            <img
              src="./images/menu-board-main.png"
              alt="Rice, Roots & Rolls Main Kitchen Menu"
              className="w-full h-auto border border-[#2C2520]"
            />
          </div>

          <div className="bg-[#120F0D] border border-[#332B24] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#C89D54]">2. Sushi Menu Board</span>
              <a
                href="./images/menu-board-sushi.png"
                download="Rice_Roots_Rolls_Sushi_Menu.png"
                className="px-3 py-1.5 bg-[#2E5A44] hover:bg-[#3A7055] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </a>
            </div>
            <img
              src="./images/menu-board-sushi.png"
              alt="Rice, Roots & Rolls Sushi Menu"
              className="w-full h-auto border border-[#2C2520]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
