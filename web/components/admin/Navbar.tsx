"use client";
import { useState } from 'react';
import { Menu, Search, Moon, Sun, Bell, LogOut } from 'lucide-react';

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-xl border-b border-[#8B1538]/20 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-[#F5E6D3]/50 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-[#8B1538]" />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B1538]/50" />
          <input 
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 bg-[#F5E6D3]/30 border border-[#8B1538]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:border-transparent transition-all placeholder:text-[#8B1538]/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-[#F5E6D3]/50 rounded-lg transition-colors text-[#8B1538]"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="relative p-2 hover:bg-[#F5E6D3]/50 rounded-lg transition-colors text-[#8B1538]">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B1538] text-white text-xs rounded-full flex items-center justify-center font-bold">
              {notifications}
            </span>
          )}
        </button>

        <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-[#8B1538]/20">
          <div className="w-8 h-8 bg-gradient-to-br from-[#8B1538] to-[#A01842] rounded-full flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-[#8B1538]">Admin User</p>
            <p className="text-xs text-[#8B1538]/60">Administrator</p>
          </div>
        </div>

        <button className="p-2 hover:bg-[#F5E6D3]/50 rounded-lg transition-colors text-[#8B1538]" title="Logout">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}