import React, { useState } from 'react';
import { 
  Globe, 
  FileText, 
  Image as ImageIcon, 
  FileCode2, 
  Video, 
  Wifi, 
  MessageCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  UserSquare, 
  MapPin, 
  Calendar, 
  Share2, 
  Sliders, 
  Sparkles, 
  Layers, 
  Info,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { QR_CATEGORIES, generateQRPayload } from '../utils/qrPayloads';
import CategoryForms from '../components/generator/CategoryForms';
import CustomizationControls from '../components/generator/CustomizationControls';
import QRPreviewCard from '../components/generator/QRPreviewCard';

export default function GeneratorPage({ 
  selectedCategory, 
  setSelectedCategory, 
  onOpenStorageSettings,
  onSavedToHistory,
  initialFormData,
  initialOptions
}) {
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'design'
  
  // Category data dictionary
  const [categoriesData, setCategoriesData] = useState(() => {
    if (initialFormData) {
      return { [selectedCategory]: initialFormData };
    }
    return {
      url: { url: 'https://github.com' },
      text: { text: 'Welcome to QR Studio! Scan me.' },
      image: { imageUrl: '', fileName: '' },
      pdf: { pdfUrl: '', fileName: '' },
      video: { videoUrl: 'https://www.youtube.com' },
      wifi: { ssid: 'MyHomeWiFi', password: '', security: 'WPA', hidden: false },
      whatsapp: { countryCode: '+1', phone: '', message: 'Hi there!' },
      email: { email: '', subject: '', body: '' },
      phone: { phone: '' },
      sms: { phone: '', message: '' },
      contact: { firstName: '', lastName: '', phone: '', email: '', company: '' },
      location: { address: 'Central Park, New York', latitude: '', longitude: '' },
      event: { title: 'Product Launch Party', startDate: '', startTime: '18:00' },
      social: { platform: 'instagram', username: '' },
    };
  });

  // Customization studio options
  const [customizationOptions, setCustomizationOptions] = useState(() => {
    if (initialOptions) return initialOptions;
    return {
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      dotsColor: '#7c3aed',
      dotsColorType: 'gradient',
      dotsGradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#7c3aed' },
          { offset: 1, color: '#06b6d4' },
        ],
      },
      backgroundColor: '#ffffff',
      isTransparent: false,
      logoSrc: null,
      logoName: null,
      logoSize: 0.35,
      logoMargin: 4,
      errorCorrectionLevel: 'H',
    };
  });

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

  const currentCategoryData = categoriesData[selectedCategory] || {};

  const handleCategoryDataChange = (newData) => {
    setCategoriesData((prev) => ({
      ...prev,
      [selectedCategory]: newData,
    }));
  };

  const payload = generateQRPayload(selectedCategory, currentCategoryData);
  const currentCategoryObj = QR_CATEGORIES.find((c) => c.id === selectedCategory) || QR_CATEGORIES[0];
  const CurrentIcon = categoryIcons[selectedCategory] || Globe;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Category Selection Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              QR Studio Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select category, configure your details, and personalize your design in real-time.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Free & Unlimited</span>
          </div>
        </div>

        {/* 14 Category Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          {QR_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category.id] || Globe;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white border-transparent shadow-lg shadow-brand-500/25 scale-[1.02]'
                    : 'bg-white/60 dark:bg-navy-900/60 border-slate-200/80 dark:border-purple-500/15 text-slate-700 dark:text-slate-300 hover:border-brand-500/40 hover:bg-white dark:hover:bg-navy-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-brand-500'}`} />
                <span>{category.name}</span>
                {category.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                  }`}>
                    {category.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Design Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Sub-tab Navigation: [Content Data] vs [Design & Logo] */}
          <div className="flex items-center gap-2 bg-slate-200/60 dark:bg-navy-900/60 p-1.5 rounded-2xl border border-slate-200 dark:border-purple-500/10">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'content'
                  ? 'bg-white dark:bg-navy-800 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CurrentIcon className="w-4 h-4 text-brand-500" />
              <span>1. Enter {currentCategoryObj.name} Data</span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'design'
                  ? 'bg-white dark:bg-navy-800 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>2. Design, Logo & Colors</span>
            </button>
          </div>

          {/* Active Panel Container */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-xl min-h-[420px]">
            {activeTab === 'content' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-purple-500/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      <CurrentIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {currentCategoryObj.name} Details
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {currentCategoryObj.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form fields for active category */}
                <CategoryForms
                  category={selectedCategory}
                  data={currentCategoryData}
                  onChange={handleCategoryDataChange}
                  onOpenStorageSettings={onOpenStorageSettings}
                />

                {/* Next Step Banner */}
                <div className="pt-4 border-t border-slate-100 dark:border-purple-500/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('design')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 transition-colors"
                  >
                    <span>Customize Design & Logo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <CustomizationControls
                options={customizationOptions}
                onChange={setCustomizationOptions}
              />
            )}
          </div>

        </div>

        {/* Right Column: Live QR Preview & Downloads (5 cols, sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <QRPreviewCard
            payload={payload}
            type={selectedCategory}
            formData={currentCategoryData}
            options={customizationOptions}
            onSavedToHistory={onSavedToHistory}
          />
        </div>

      </div>

    </div>
  );
}
