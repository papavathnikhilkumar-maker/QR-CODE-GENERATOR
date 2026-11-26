import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import ScannerPage from './pages/ScannerPage';
import HistoryPage from './pages/HistoryPage';
import StorageSettingsModal from './components/StorageSettingsModal';
import LegalModals from './components/LegalModals';
import { getHistory } from './utils/historyStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'generator' | 'scanner' | 'history' | 'features' | 'faq'
  const [selectedCategory, setSelectedCategory] = useState('url');
  const [storageSettingsOpen, setStorageSettingsOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | 'about' | 'contact' | null
  const [historyCount, setHistoryCount] = useState(0);

  // States for loading history item into studio
  const [initialFormData, setInitialFormData] = useState(null);
  const [initialOptions, setInitialOptions] = useState(null);

  // Theme Management
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('qr_studio_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('qr_studio_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('qr_studio_theme', 'light');
      }
    } catch (e) {
      // ignore
    }
  }, [darkMode]);

  // Refresh history count
  const refreshHistoryCount = () => {
    setHistoryCount(getHistory().length);
  };

  useEffect(() => {
    refreshHistoryCount();
  }, []);

  // Handle selecting category from Landing Page or Footer
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setInitialFormData(null);
    setInitialOptions(null);
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle loading saved item from History into Studio
  const handleLoadIntoStudio = (historyItem) => {
    setSelectedCategory(historyItem.type || 'url');
    setInitialFormData(historyItem.formData || null);
    setInitialOptions(historyItem.options || null);
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle transfer from Scanner to Studio
  const handleTransferFromScanner = (decodedText) => {
    if (/^https?:\/\//i.test(decodedText)) {
      setSelectedCategory('url');
      setInitialFormData({ url: decodedText });
    } else if (decodedText.startsWith('WIFI:')) {
      setSelectedCategory('wifi');
      // Simple parse of WIFI:T:WPA;S:SSID;P:Pass;;
      const sMatch = decodedText.match(/S:([^;]+)/);
      const pMatch = decodedText.match(/P:([^;]+)/);
      const tMatch = decodedText.match(/T:([^;]+)/);
      setInitialFormData({
        ssid: sMatch ? sMatch[1] : '',
        password: pMatch ? pMatch[1] : '',
        security: tMatch ? tMatch[1] : 'WPA',
      });
    } else {
      setSelectedCategory('text');
      setInitialFormData({ text: decodedText });
    }
    setInitialOptions(null);
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-navy-950 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenStorageSettings={() => setStorageSettingsOpen(true)}
        historyCount={historyCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onSelectCategory={handleSelectCategory}
            onStartCreating={() => {
              setActiveTab('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenScanner={() => {
              setActiveTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'generator' && (
          <GeneratorPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenStorageSettings={() => setStorageSettingsOpen(true)}
            onSavedToHistory={refreshHistoryCount}
            initialFormData={initialFormData}
            initialOptions={initialOptions}
          />
        )}

        {activeTab === 'scanner' && (
          <ScannerPage
            onTransferToGenerator={handleTransferFromScanner}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            onLoadIntoStudio={handleLoadIntoStudio}
            onStartCreating={() => {
              setActiveTab('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Features tab shortcut */}
        {activeTab === 'features' && (
          <LandingPage
            onSelectCategory={handleSelectCategory}
            onStartCreating={() => setActiveTab('generator')}
            onOpenScanner={() => setActiveTab('scanner')}
          />
        )}

        {/* FAQ tab shortcut */}
        {activeTab === 'faq' && (
          <LandingPage
            onSelectCategory={handleSelectCategory}
            onStartCreating={() => setActiveTab('generator')}
            onOpenScanner={() => setActiveTab('scanner')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenLegalModal={(modalType) => setLegalModal(modalType)}
        setActiveTab={setActiveTab}
      />

      {/* Storage Settings Modal */}
      <StorageSettingsModal
        isOpen={storageSettingsOpen}
        onClose={() => setStorageSettingsOpen(false)}
      />

      {/* Legal & Info Modals (Privacy, Terms, About, Contact) */}
      <LegalModals
        activeModal={legalModal}
        onClose={() => setLegalModal(null)}
      />

    </div>
  );
}
