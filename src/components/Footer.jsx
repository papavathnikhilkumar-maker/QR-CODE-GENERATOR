import React from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Globe, 
  Wifi, 
  MessageCircle, 
  Image as ImageIcon, 
  FileCode2, 
  UserSquare,
  ArrowUp
} from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenLegalModal, setActiveTab }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-purple-500/10 dark:border-purple-500/20 bg-slate-100/60 dark:bg-navy-950/80 backdrop-blur-xl pt-16 pb-12 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-white dark:bg-navy-900 rounded-[14px] flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 via-brand-700 to-indigo-600 dark:from-white dark:via-purple-200 dark:to-cyan-400 bg-clip-text text-transparent">
                QR Studio
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm">
              The premier free QR code generation & scanning studio. Create high-resolution custom codes with logos, colors, and gradients without ever logging in or paying a dime.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Free & Open
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                <Sparkles className="w-3.5 h-3.5" /> High-Resolution Vector
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Popular QR Types
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { onSelectCategory('url'); setActiveTab('generator'); }}
                  className="hover:text-brand-600 dark:hover:text-purple-300 flex items-center gap-2 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-brand-500" /> Website URL
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('wifi'); setActiveTab('generator'); }}
                  className="hover:text-brand-600 dark:hover:text-purple-300 flex items-center gap-2 transition-colors"
                >
                  <Wifi className="w-3.5 h-3.5 text-cyan-500" /> Wi-Fi Network
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('whatsapp'); setActiveTab('generator'); }}
                  className="hover:text-brand-600 dark:hover:text-purple-300 flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Chat
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('image'); setActiveTab('generator'); }}
                  className="hover:text-brand-600 dark:hover:text-purple-300 flex items-center gap-2 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-pink-500" /> Image to QR
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('pdf'); setActiveTab('generator'); }}
                  className="hover:text-brand-600 dark:hover:text-purple-300 flex items-center gap-2 transition-colors"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-amber-500" /> PDF Document
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('contact'); setActiveTab('generator'); }}
                  className="hover:text-brand-600 dark:hover:text-purple-300 flex items-center gap-2 transition-colors"
                >
                  <UserSquare className="w-3.5 h-3.5 text-indigo-500" /> vCard Digital Card
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Studio Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setActiveTab('generator')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Live Customizer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('scanner')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Webcam QR Scanner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('history')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Offline History
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('generator')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Vector SVG & 4K PNG Export
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('generator')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Custom Brand Logos
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onOpenLegalModal('privacy')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegalModal('terms')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegalModal('about')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  About QR Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegalModal('contact')}
                  className="hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  Contact & Feedback
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} QR Studio. Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for the open web.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">No cookies • No login required</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl border border-slate-200 dark:border-purple-500/20 hover:bg-white dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px] font-semibold">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
