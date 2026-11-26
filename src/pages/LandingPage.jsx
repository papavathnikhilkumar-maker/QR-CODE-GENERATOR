import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Download, 
  Palette, 
  Eye, 
  Smartphone, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  Scan,
  Sliders,
  Share2,
  FileText,
  Lock,
  Globe,
  Wifi,
  MessageCircle,
  Image as ImageIcon,
  FileCode2,
  Video,
  Mail,
  Phone,
  MessageSquare,
  UserSquare,
  MapPin,
  Calendar
} from 'lucide-react';
import { QR_CATEGORIES } from '../utils/qrPayloads';

export default function LandingPage({ onSelectCategory, onStartCreating, onOpenScanner }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroPreviewIndex, setHeroPreviewIndex] = useState(0);

  const heroPreviews = [
    {
      name: 'Cyber Neon',
      fg: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
      bg: '#ffffff',
      tag: 'Dynamic URL',
      subtitle: 'https://qrstudio.app/portfolio',
    },
    {
      name: 'Sunset Glow',
      fg: '#f97316',
      gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
      bg: '#ffffff',
      tag: 'Wi-Fi Network',
      subtitle: 'WIFI: Studio_5G; Pass: ••••••••',
    },
    {
      name: 'Matrix Emerald',
      fg: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      bg: '#ffffff',
      tag: 'vCard Contact',
      subtitle: 'Alex Parker • Creative Director',
    },
  ];

  const categoryIcons = {
    url: Globe,
    text: FileText,
    image: ImageIcon,
    pdf: FileCode2,
    video: Video,
    wifi: Wifi,
    whatsapp: MessageCircle,
    email: Mail,
    phone: Phone,
    sms: MessageSquare,
    contact: UserSquare,
    location: MapPin,
    event: Calendar,
    social: Share2,
  };

  const features = [
    {
      icon: Zap,
      title: '100% Free Forever',
      desc: 'No hidden subscription fees, no locked premium tiers, and no annoying watermark on your downloads.',
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Registration',
      desc: 'No email or password needed. Open the site, configure your QR data, style it, and download immediately.',
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      icon: Eye,
      title: 'Instant Live Preview',
      desc: 'Watch your QR code change in real-time as you tweak dot patterns, corner curves, gradient colors, and logos.',
      color: 'text-brand-500 bg-brand-500/10',
    },
    {
      icon: Palette,
      title: 'Studio Grade Customization',
      desc: 'Linear and radial gradients, 6 dot architectures, custom corner brackets, and center company logo insertion.',
      color: 'text-pink-500 bg-pink-500/10',
    },
    {
      icon: Download,
      title: 'High-Res Vector Downloads',
      desc: 'Export crisp scalable SVG vectors for billboards and high-density 4K PNG / JPG images for digital marketing.',
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      icon: Smartphone,
      title: 'Mobile-Optimized & Scanner',
      desc: 'Includes an integrated web camera QR scanner to scan and decode physical QR codes directly on your device.',
      color: 'text-cyan-500 bg-cyan-500/10',
    },
    {
      icon: Lock,
      title: 'Client-Side Privacy',
      desc: 'URL, text, Wi-Fi, and contact information is generated locally inside your browser. Your private details stay yours.',
      color: 'text-purple-500 bg-purple-500/10',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Select QR Type',
      desc: 'Choose from 14 specialized categories: URLs, Wi-Fi, WhatsApp, Images, PDFs, vCards, or social profiles.',
      icon: Sliders,
    },
    {
      num: '02',
      title: 'Enter Information',
      desc: 'Fill in your target link, connection credentials, or drag and drop your image and document files.',
      icon: FileText,
    },
    {
      num: '03',
      title: 'Customize in Studio',
      desc: 'Personalize with vibrant gradients, rounded corner eyes, and your own brand logo right in the center.',
      icon: Palette,
    },
    {
      num: '04',
      title: 'Download & Share',
      desc: 'Export in ultra-sharp PNG, JPG or lossless SVG. Your QR code is immediately ready for print or web!',
      icon: Download,
    },
  ];

  const faqs = [
    {
      q: 'Is QR Studio really 100% free with no hidden charges?',
      a: 'Yes, completely! QR Studio is 100% free to use. There are no subscriptions, paywalls, scan limits, trial periods, or mandatory accounts. You have unlimited access to every generator and customization feature.',
    },
    {
      q: 'Do the generated QR codes ever expire?',
      a: 'Standard static QR codes (URL, Wi-Fi, Text, Contact, SMS, Phone, Email, Event) never expire. Once printed or shared, they work indefinitely because the data is encoded directly into the matrix itself without relying on redirects.',
    },
    {
      q: 'Can I use these QR codes for commercial projects and packaging?',
      a: 'Absolutely! You have full commercial rights to every QR code you generate. You can use them on restaurant menus, business cards, merchandise, billboards, product packaging, and TV ads without royalties.',
    },
    {
      q: 'How does Image and PDF to QR work?',
      a: 'When you upload an image or PDF, the file is either hosted via your own connected Supabase bucket or via fast cloud storage. The generated QR code links directly to the shareable file so scanning instantly opens the document on any smartphone.',
    },
    {
      q: 'Will my QR code remain easily scannable with a logo and gradient?',
      a: 'Yes! QR codes contain built-in Reed-Solomon Error Correction (up to 30% recovery). When you add a logo or custom pattern, QR Studio automatically adjusts error correction to Level H to ensure fast, reliable scanning across all iPhone and Android camera apps.',
    },
    {
      q: 'Can I export in vector format for printing?',
      a: 'Yes. You can export in SVG (Scalable Vector Graphics), which allows graphic designers and print shops to scale your QR code to any size—even building-size banners—without losing any sharpness or quality.',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/20 via-indigo-600/20 to-cyan-400/20 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-cyan-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300">
                <Sparkles className="w-4 h-4 text-brand-500 animate-spin-slow" />
                <span>Zero Sign-Up • Unlimited Scans • 100% Free Forever</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Create QR Codes <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-400 bg-clip-text text-transparent">
                  Instantly & Freely
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Generate, customize, and download beautiful, high-resolution QR codes in seconds. No login required. No expiration dates. No hidden paywalls.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={onStartCreating}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>Start Creating Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#features"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-base text-slate-700 dark:text-slate-200 glass-panel-interactive flex items-center justify-center gap-2 transition-all"
                >
                  <span>Explore Features</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Vector SVG & 4K PNG</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Custom Logos & Gradients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>14 Specialized Categories</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Hero Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Decorative border wrapper */}
                <div className="relative p-1 rounded-3xl bg-gradient-to-b from-brand-500/40 via-purple-500/20 to-transparent shadow-2xl shadow-purple-500/10">
                  <div className="glass-panel rounded-[22px] p-6 sm:p-8 space-y-6">
                    
                    {/* Header bar of preview */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300">
                        {heroPreviews[heroPreviewIndex].tag}
                      </span>
                    </div>

                    {/* QR Code Presentation Box */}
                    <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-purple-500/20 group">
                      
                      {/* Stylized QR Visual SVG */}
                      <div className="w-52 h-52 relative flex items-center justify-center p-2 rounded-xl bg-white shadow-md">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Corner Top-Left */}
                          <rect x="8" y="8" width="24" height="24" rx="6" fill="none" stroke={heroPreviews[heroPreviewIndex].fg} strokeWidth="4" />
                          <circle cx="20" cy="20" r="5" fill={heroPreviews[heroPreviewIndex].fg} />

                          {/* Corner Top-Right */}
                          <rect x="68" y="8" width="24" height="24" rx="6" fill="none" stroke={heroPreviews[heroPreviewIndex].fg} strokeWidth="4" />
                          <circle cx="80" cy="20" r="5" fill={heroPreviews[heroPreviewIndex].fg} />

                          {/* Corner Bottom-Left */}
                          <rect x="8" y="68" width="24" height="24" rx="6" fill="none" stroke={heroPreviews[heroPreviewIndex].fg} strokeWidth="4" />
                          <circle cx="20" cy="80" r="5" fill={heroPreviews[heroPreviewIndex].fg} />

                          {/* Data points */}
                          <circle cx="42" cy="15" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="54" cy="15" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="42" cy="25" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="54" cy="25" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />

                          <circle cx="15" cy="42" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="25" cy="42" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="15" cy="54" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="25" cy="54" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />

                          <rect x="68" y="40" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />
                          <rect x="82" y="40" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />
                          <rect x="74" y="52" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />
                          <rect x="86" y="52" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />

                          <circle cx="42" cy="68" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="54" cy="68" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="42" cy="80" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />
                          <circle cx="54" cy="80" r="2.5" fill={heroPreviews[heroPreviewIndex].fg} />

                          <rect x="68" y="70" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />
                          <rect x="80" y="70" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />
                          <rect x="72" y="82" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />
                          <rect x="84" y="82" width="6" height="6" rx="2" fill={heroPreviews[heroPreviewIndex].fg} />

                          {/* Center badge */}
                          <rect x="36" y="36" width="28" height="28" rx="8" fill={heroPreviews[heroPreviewIndex].fg} />
                          <path d="M44 50h12M50 44v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>

                        {/* Scan Me floating pill */}
                        <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5">
                          <Scan className="w-3 h-3 text-cyan-400" />
                          <span>Scan Verified</span>
                        </div>
                      </div>

                      {/* Content preview subtitle */}
                      <p className="mt-6 text-xs font-mono text-slate-500 dark:text-slate-400 text-center truncate max-w-full">
                        {heroPreviews[heroPreviewIndex].subtitle}
                      </p>
                    </div>

                    {/* Style switcher pills */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Theme Preset:
                      </span>
                      <div className="flex gap-2">
                        {heroPreviews.map((preview, idx) => (
                          <button
                            key={preview.name}
                            onClick={() => setHeroPreviewIndex(idx)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              heroPreviewIndex === idx
                                ? 'bg-brand-600 text-white shadow-sm'
                                : 'bg-slate-200/60 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-navy-700'
                            }`}
                          >
                            {preview.name}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 glass-panel p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-purple-500/20">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Ready for Print</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">ISO/IEC 18004 Standard</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QR CATEGORIES SECTION */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            14 Universal Formats
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything You Can Convert to QR
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            From everyday website links to encrypted Wi-Fi credentials, cloud documents, and vCards. Select a category to start immediately.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {QR_CATEGORIES.map((category) => {
            const IconComponent = categoryIcons[category.id] || Globe;
            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="group relative p-6 rounded-3xl glass-panel-interactive cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/10 dark:bg-purple-950/50 border border-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {category.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        {category.badge}
                      </span>
                    )}
                    {category.popular && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {category.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-purple-500/10 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span>Create Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 lg:p-16 rounded-[32px] bg-gradient-to-b from-purple-900/10 via-indigo-900/5 to-transparent border border-purple-500/20">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Simple 4-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              How QR Studio Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No complicated manuals or technical setup. Create your custom QR code in under 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="relative group">
                  {/* Step Connector Line */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-purple-500/30 to-transparent -z-10" />
                  )}

                  <div className="p-6 rounded-3xl glass-panel space-y-4 h-full border border-purple-500/15">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-mono text-brand-600 dark:text-brand-400">
                        {step.num}
                      </span>
                      <div className="p-3 rounded-2xl bg-purple-500/10 text-brand-600 dark:text-brand-400">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            Professional Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Built for Perfection, Always Free
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Everything you need to craft high-impact, brand-aligned QR codes with zero compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-8 rounded-3xl glass-panel border border-purple-500/10 dark:border-purple-500/20 space-y-4 hover:border-brand-500/40 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.color}`}>
                  <FeatureIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPARISON CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-purple-500/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Why Creators Prefer QR Studio
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                No Expirations. No Scan Limits. No Forced Subscriptions.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Most commercial QR generators trick users by letting them create a code, then locking the QR code behind an expensive $29/month subscription after only 50 scans. QR Studio encodes your data directly into permanent standard QR codes that never expire.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-emerald-200">
                  QR Studio: Unlimited Scans Forever (Free)
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 opacity-80">
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">✕</span>
                <span className="text-xs font-medium text-slate-800 dark:text-rose-200">
                  Others: QR expires after 14 days unless you pay
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700 dark:bg-purple-900/40 dark:text-brand-300">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Clear, honest answers about our technology, formatting, and free policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-slate-200 dark:border-purple-500/15 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-base hover:text-brand-600 dark:hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-purple-500/10 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 text-white shadow-2xl overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Generate Your Custom QR Code?
          </h2>
          <p className="text-purple-100 text-base max-w-xl mx-auto font-normal">
            Join thousands of creators, businesses, and developers. No login, no payments, no hassle.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartCreating}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-brand-900 bg-white hover:bg-slate-100 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-brand-600" />
              <span>Launch Studio Now</span>
            </button>
            <button
              onClick={onOpenScanner}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base text-white border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Scan className="w-5 h-5" />
              <span>Try QR Scanner</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
