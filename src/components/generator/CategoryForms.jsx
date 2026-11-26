import React, { useState, useRef } from 'react';
import { 
  Upload, 
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
  Globe, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Lock, 
  ExternalLink,
  Loader2,
  HelpCircle
} from 'lucide-react';
import { SOCIAL_PLATFORMS } from '../../utils/qrPayloads';
import { uploadFileToStorage } from '../../utils/storageService';

export default function CategoryForms({ category, data, onChange, onOpenStorageSettings }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const result = await uploadFileToStorage(file);
      setUploading(false);
      setUploadSuccess(`File uploaded successfully via ${result.provider}!`);
      
      if (type === 'image') {
        onChange({
          ...data,
          imageUrl: result.url,
          fileName: result.name,
          fileSize: (result.size / 1024 / 1024).toFixed(2) + ' MB',
          provider: result.provider,
        });
      } else if (type === 'pdf') {
        onChange({
          ...data,
          pdfUrl: result.url,
          fileName: result.name,
          fileSize: (result.size / 1024 / 1024).toFixed(2) + ' MB',
          provider: result.provider,
        });
      } else if (type === 'video') {
        onChange({
          ...data,
          videoUrl: result.url,
          fileName: result.name,
          fileSize: (result.size / 1024 / 1024).toFixed(2) + ' MB',
          provider: result.provider,
        });
      }
    } catch (err) {
      setUploading(false);
      setUploadError(err.message || 'Upload failed');
    }
  };

  const clearUploadedFile = (urlField) => {
    onChange({
      ...data,
      [urlField]: '',
      fileName: '',
      fileSize: '',
      provider: '',
    });
    setUploadSuccess(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. URL */}
      {category === 'url' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
              <span>Target Website URL</span>
              <span className="text-[11px] text-slate-400 font-normal">e.g. yoursite.com or https://...</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.url || ''}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3.5 rounded-2xl glass-input text-base outline-none font-mono"
              />
            </div>
          </div>

          {/* Quick URL prefixes */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500">Quick Fill:</span>
            {['https://', 'https://www.', 'portfolio', 'company.com'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (item.startsWith('http')) {
                    handleInputChange('url', item);
                  } else {
                    handleInputChange('url', `https://${item}`);
                  }
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-200/60 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-brand-500 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. TEXT */}
      {category === 'text' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Plain Text or Message
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {(data.text || '').length} characters
            </span>
          </div>
          <textarea
            rows={5}
            value={data.text || ''}
            onChange={(e) => handleInputChange('text', e.target.value)}
            placeholder="Type or paste any text, secret notes, serial numbers, passwords, or instructions..."
            className="w-full px-4 py-3 rounded-2xl glass-input text-sm outline-none resize-none leading-relaxed"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Encodes directly into the QR matrix. Scanners display this text upon scan with no internet needed.
          </p>
        </div>
      )}

      {/* 3. IMAGE TO QR */}
      {category === 'image' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Upload Image (JPG, PNG, WEBP, GIF)
            </label>
            <button
              type="button"
              onClick={onOpenStorageSettings}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Storage Settings
            </button>
          </div>

          {!data.imageUrl ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-purple-500/30 rounded-3xl p-8 text-center cursor-pointer hover:border-brand-500/60 dark:hover:border-brand-500/60 bg-white/40 dark:bg-navy-950/40 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                onChange={(e) => handleFileUpload(e, 'image')}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {uploading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <Upload className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">
                    {uploading ? 'Uploading Image...' : 'Click to Browse or Drag & Drop'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Supports JPG, PNG, WEBP, GIF up to 25MB
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl glass-panel border border-brand-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={data.imageUrl}
                  alt="Uploaded"
                  className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-purple-500/30 shrink-0"
                />
                <div className="truncate">
                  <div className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {data.fileName || 'Uploaded Image'}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{data.fileSize}</span>
                    <span>•</span>
                    <span className="capitalize">{data.provider || 'Cloud'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={data.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-brand-600"
                  title="View Image"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => clearUploadedFile('imageUrl')}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
                  title="Remove Image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Or Paste Direct Image URL */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Or paste an existing image link:
            </label>
            <input
              type="url"
              value={data.imageUrl || ''}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono outline-none"
            />
          </div>

          {uploadError && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
          {uploadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          )}
        </div>
      )}

      {/* 4. PDF TO QR */}
      {category === 'pdf' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Upload PDF Document
            </label>
            <button
              type="button"
              onClick={onOpenStorageSettings}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Storage Settings
            </button>
          </div>

          {!data.pdfUrl ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-purple-500/30 rounded-3xl p-8 text-center cursor-pointer hover:border-brand-500/60 dark:hover:border-brand-500/60 bg-white/40 dark:bg-navy-950/40 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e, 'pdf')}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {uploading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <FileCode2 className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">
                    {uploading ? 'Uploading PDF Document...' : 'Upload PDF Document'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Select menus, brochures, catalogs, manuals up to 25MB
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl glass-panel border border-brand-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <FileCode2 className="w-6 h-6" />
                </div>
                <div className="truncate">
                  <div className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {data.fileName || 'Uploaded Document.pdf'}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{data.fileSize}</span>
                    <span>•</span>
                    <span className="capitalize">{data.provider || 'Cloud'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={data.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-brand-600"
                  title="Open PDF Document"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => clearUploadedFile('pdfUrl')}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
                  title="Remove PDF"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Or Paste Direct PDF URL */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Or paste an existing public PDF link:
            </label>
            <input
              type="url"
              value={data.pdfUrl || ''}
              onChange={(e) => handleInputChange('pdfUrl', e.target.value)}
              placeholder="https://example.com/document.pdf"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono outline-none"
            />
          </div>
        </div>
      )}

      {/* 5. VIDEO */}
      {category === 'video' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Video URL (YouTube, Vimeo, TikTok, MP4)
            </label>
            <input
              type="text"
              value={data.videoUrl || ''}
              onChange={(e) => handleInputChange('videoUrl', e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://tiktok.com/@..."
              className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm outline-none font-mono"
            />
          </div>

          {/* Video file upload */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              Or upload video file (MP4, WEBM up to 25MB):
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-slate-300 dark:border-purple-500/30 rounded-2xl p-4 text-center cursor-pointer hover:border-brand-500/60"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm"
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
              />
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-brand-500" />}
                <span>{uploading ? 'Uploading Video...' : 'Choose MP4 Video File'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. WI-FI */}
      {category === 'wifi' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Network Name (SSID) *
            </label>
            <input
              type="text"
              required
              value={data.ssid || ''}
              onChange={(e) => handleInputChange('ssid', e.target.value)}
              placeholder="MyHomeWifi_5G"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Network Password
            </label>
            <input
              type="text"
              value={data.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Leave empty if open network"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Security Encryption
              </label>
              <select
                value={data.security || 'WPA'}
                onChange={(e) => handleInputChange('security', e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none bg-white dark:bg-navy-900"
              >
                <option value="WPA">WPA / WPA2 / WPA3 (Default)</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={data.hidden || false}
                  onChange={(e) => handleInputChange('hidden', e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                />
                <span>Hidden Network (SSID not broadcast)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 7. WHATSAPP */}
      {category === 'whatsapp' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Country Code
              </label>
              <input
                type="text"
                value={data.countryCode || '+1'}
                onChange={(e) => handleInputChange('countryCode', e.target.value)}
                placeholder="+1 or 1"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                value={data.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="2345678900"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Pre-filled Message (Optional)
            </label>
            <textarea
              rows={3}
              value={data.message || ''}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Hi! I scanned your QR code and would like to ask about..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* 8. EMAIL */}
      {category === 'email' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Recipient Email Address *
            </label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contact@company.com"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Email Subject
            </label>
            <input
              type="text"
              value={data.subject || ''}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Inquiry from QR Code"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Message Body
            </label>
            <textarea
              rows={3}
              value={data.body || ''}
              onChange={(e) => handleInputChange('body', e.target.value)}
              placeholder="Hello team, I would like to get in touch regarding..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* 9. PHONE */}
      {category === 'phone' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number to Dial *
            </label>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full px-4 py-3.5 rounded-2xl glass-input text-base outline-none font-mono"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              Scanning dials this phone number directly on any mobile device.
            </p>
          </div>
        </div>
      )}

      {/* 10. SMS */}
      {category === 'sms' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Recipient Phone Number *
            </label>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Pre-defined SMS Text
            </label>
            <textarea
              rows={3}
              value={data.message || ''}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="RSVP YES for Saturday's event!"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* 11. CONTACT / vCARD */}
      {category === 'contact' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={data.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Alex"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={data.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Parker"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Organization / Company
              </label>
              <input
                type="text"
                value={data.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Acme Studio Inc."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={data.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Head of Product"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Mobile Phone
              </label>
              <input
                type="tel"
                value={data.mobile || ''}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="+1 555-0199"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={data.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="alex@acme.com"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Website
              </label>
              <input
                type="text"
                value={data.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://acme.com"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                City, Country
              </label>
              <input
                type="text"
                value={data.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="San Francisco, USA"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 12. LOCATION */}
      {category === 'location' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Street Address, Landmark or Place Name
            </label>
            <input
              type="text"
              value={data.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="e.g. Eiffel Tower, Paris or 1600 Amphitheatre Pkwy, Mountain View, CA"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none"
            />
          </div>

          <div className="relative flex items-center justify-center my-3">
            <span className="px-3 bg-slate-100 dark:bg-navy-900 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Or Exact Coordinates
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Latitude
              </label>
              <input
                type="text"
                value={data.latitude || ''}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                placeholder="37.4220"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Longitude
              </label>
              <input
                type="text"
                value={data.longitude || ''}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                placeholder="-122.0841"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* 13. EVENT */}
      {category === 'event' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Annual Design Summit 2026"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Start Date & Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={data.startDate || ''}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-2 py-2 rounded-xl glass-input text-xs outline-none bg-white dark:bg-navy-900"
                />
                <input
                  type="time"
                  value={data.startTime || '10:00'}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full px-2 py-2 rounded-xl glass-input text-xs outline-none bg-white dark:bg-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                End Date & Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={data.endDate || ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-2 py-2 rounded-xl glass-input text-xs outline-none bg-white dark:bg-navy-900"
                />
                <input
                  type="time"
                  value={data.endTime || '18:00'}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-2 py-2 rounded-xl glass-input text-xs outline-none bg-white dark:bg-navy-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Location / Venue
            </label>
            <input
              type="text"
              value={data.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Moscone Convention Center, Room 302"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Event Description
            </label>
            <textarea
              rows={2}
              value={data.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Keynote speech, interactive workshop & networking..."
              className="w-full px-4 py-2 rounded-xl glass-input text-sm outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* 14. SOCIAL MEDIA */}
      {category === 'social' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Select Social Platform
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {SOCIAL_PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => handleInputChange('platform', platform.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    (data.platform || 'instagram') === platform.id
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                      : 'bg-slate-200/50 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300/70 dark:hover:bg-navy-700'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Username or Profile Handle</span>
              <span className="text-[11px] text-slate-400 font-mono">
                {SOCIAL_PLATFORMS.find(p => p.id === (data.platform || 'instagram'))?.prefix}
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="yourhandle or paste full URL"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm outline-none font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              Enter your handle without '@', or paste your complete profile URL.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
