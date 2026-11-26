import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Filter,
  AlertTriangle
} from 'lucide-react';
import { getHistory, deleteHistoryItem, clearHistory } from '../utils/historyStorage';

export default function HistoryPage({ onLoadIntoStudio, onStartCreating }) {
  const [historyList, setHistoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setHistoryList(getHistory());
  }, []);

  const handleDelete = (id) => {
    const updated = deleteHistoryItem(id);
    setHistoryList(updated);
  };

  const handleClearAll = () => {
    clearHistory();
    setHistoryList([]);
    setShowClearConfirm(false);
  };

  const handleCopyPayload = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSnapshot = (item) => {
    if (!item.previewDataUrl) return;
    const a = document.createElement('a');
    a.href = item.previewDataUrl;
    a.download = `qr-studio-${item.type}-${item.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filtered items
  const filteredList = historyList.filter((item) => {
    const matchesSearch = 
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.payload || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.type || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedTypeFilter === 'all' || item.type === selectedTypeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700 dark:bg-purple-900/40 dark:text-brand-300 mb-2">
            <History className="w-3.5 h-3.5" /> Local Browser Vault
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Saved QR Code History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Stored locally in your browser. No accounts or tracking ever.
          </p>
        </div>

        {historyList.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Clear All */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-navy-900 rounded-3xl p-6 border border-purple-500/20 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Clear All History?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This will permanently delete all {historyList.length} saved QR codes from this browser's local storage. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-purple-900/20"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      {historyList.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
            {['all', 'url', 'wifi', 'image', 'pdf', 'contact', 'whatsapp'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  selectedTypeFilter === t
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-200/50 dark:bg-navy-900 text-slate-600 dark:text-slate-400 hover:bg-slate-300/60'
                }`}
              >
                {t === 'all' ? 'All Types' : t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History Items Grid */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => {
            const isCopied = copiedId === item.id;
            const dateStr = item.createdAt 
              ? new Date(item.createdAt).toLocaleDateString(undefined, { 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) 
              : 'Recent';

            return (
              <div
                key={item.id}
                className="glass-panel p-5 rounded-3xl border border-purple-500/15 flex flex-col justify-between space-y-4 hover:border-brand-500/40 transition-all duration-200 group"
              >
                <div>
                  {/* Top Bar with Type & Delete */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
                      {item.type}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete this item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Thumbnail & Info row */}
                  <div className="flex items-start gap-4">
                    {item.previewDataUrl ? (
                      <img
                        src={item.previewDataUrl}
                        alt="QR Thumbnail"
                        className="w-16 h-16 rounded-xl object-contain bg-white p-1 border border-slate-200 dark:border-purple-500/20 shadow-sm shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-purple-500/10 flex items-center justify-center text-brand-500 shrink-0 font-bold text-xs">
                        QR
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
                        {item.payload}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                        <Clock className="w-3 h-3" />
                        <span>{dateStr}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-purple-500/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {item.previewDataUrl && (
                      <button
                        onClick={() => handleDownloadSnapshot(item)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:text-brand-600 text-xs font-bold"
                        title="Download Image"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyPayload(item.id, item.payload)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:text-brand-600 text-xs font-bold"
                      title="Copy Raw Content"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <button
                    onClick={() => onLoadIntoStudio(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 transition-colors"
                  >
                    <span>Load in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-purple-500/10 text-brand-500 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {historyList.length === 0 ? 'No Saved QR Codes Yet' : 'No Matching Results'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {historyList.length === 0
              ? 'Whenever you create and save or download a QR code, it will safely appear here for quick access and re-downloading.'
              : 'Try clearing your search query or switching filters.'}
          </p>
          {historyList.length === 0 && (
            <button
              onClick={onStartCreating}
              className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/25 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Your First QR</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
}
