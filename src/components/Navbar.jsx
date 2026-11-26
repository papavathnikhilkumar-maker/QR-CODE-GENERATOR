import React, { useState } from 'react';
import { 
  QrCode, 
  Scan, 
  History, 
  Sparkles, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Cloud, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  onOpenStorageSettings,
  historyCount = 0 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'generator', label: 'QR Generator', highlight: true },
    { id: 'scanner', label: 'QR Scanner', icon: Scan },
    { id: 'history', label: 'History', count: historyCount, icon: History },
    { id: 'features', label: 'Features' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll to top when changing major pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-purple-500/10 dark:border-purple-500/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-navy-900 rounded-[14px] flex items-center justify-center">
                <QrCode className="w-6 h-6 text-brand-600 dark:text-brand-400 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-navy-900 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-brand-700 to-indigo-600 dark:from-white dark:via-purple-200 dark:to-cyan-400 bg-clip-text text-transparent">
                  QR Studio
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50">
                  Free Forever
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                No Signup • No Limits • Studio Grade
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-navy-900/60 p-1.5 rounded-2xl border border-slate-200/80 dark:border-purple-500/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-white/60 dark:hover:bg-purple-900/20'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Storage Settings Button */}
            <button
              onClick={onOpenStorageSettings}
              title="Supabase & Cloud Storage Settings"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-purple-500/20 bg-white/50 dark:bg-navy-900/50 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-purple-300 hover:border-brand-500/40 transition-all duration-200 relative group"
            >
              <Cloud className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900 text-white dark:bg-purple-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                Cloud Settings
              </span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-purple-500/20 bg-white/50 dark:bg-navy-900/50 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-purple-300 hover:border-brand-500/40 transition-all duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Start Creating CTA Button */}
            {activeTab !== 'generator' && (
              <button
                onClick={() => handleNavClick('generator')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create QR</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 lg:hidden rounded-xl border border-slate-200 dark:border-purple-500/20 bg-white/50 dark:bg-navy-900/50 text-slate-600 dark:text-slate-300"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-t border-purple-500/10 dark:border-purple-500/20 bg-slate-50/95 dark:bg-navy-950/95 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-base transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon ? <Icon className="w-5 h-5" /> : <QrCode className="w-5 h-5 opacity-70" />}
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/20 text-white font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-purple-500/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenStorageSettings();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-sm font-semibold"
              >
                <Cloud className="w-5 h-5 text-brand-500" />
                <span>Supabase & Cloud Storage Settings</span>
              </button>

              <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" /> 100% Free • No Sign-up
                </span>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
