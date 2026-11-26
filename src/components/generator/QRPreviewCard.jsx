import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Copy, 
  Printer, 
  Check, 
  Bookmark, 
  Sparkles, 
  AlertCircle, 
  Eye, 
  Maximize2,
  FileImage,
  Layers,
  Share2
} from 'lucide-react';
import { saveToHistory } from '../../utils/historyStorage';

export default function QRPreviewCard({ 
  payload, 
  type, 
  formData, 
  options, 
  onSavedToHistory 
}) {
  const qrRef = useRef(null);
  const qrInstanceRef = useRef(null);
  const [downloadFormat, setDownloadFormat] = useState('png'); // 'png' | 'jpeg' | 'svg'
  const [downloadScale, setDownloadScale] = useState(2); // 1x, 2x, 4x
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copyError, setCopyError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Initialize or update QR Code instance
  useEffect(() => {
    if (!qrRef.current) return;

    const qrData = payload || 'https://qrstudio.app';

    const qrConfig = {
      width: 280,
      height: 280,
      type: 'canvas',
      data: qrData,
      image: options.logoSrc || undefined,
      margin: 10,
      dotsOptions: {
        color: options.dotsColorType === 'single' ? (options.dotsColor || '#000000') : undefined,
        gradient: options.dotsColorType === 'gradient' ? options.dotsGradient : undefined,
        type: options.dotsType || 'rounded',
      },
      backgroundOptions: {
        color: options.isTransparent ? 'transparent' : (options.backgroundColor || '#ffffff'),
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: options.logoMargin !== undefined ? options.logoMargin : 4,
        imageSize: options.logoSize !== undefined ? options.logoSize : 0.35,
        hideBackgroundDots: true,
      },
      cornersSquareOptions: {
        type: options.cornersSquareType || 'extra-rounded',
        color: options.dotsColorType === 'single' ? (options.dotsColor || '#000000') : undefined,
      },
      cornersDotOptions: {
        type: options.cornersDotType || 'dot',
        color: options.dotsColorType === 'single' ? (options.dotsColor || '#000000') : undefined,
      },
      qrOptions: {
        errorCorrectionLevel: options.errorCorrectionLevel || (options.logoSrc ? 'H' : 'M'),
      },
    };

    if (!qrInstanceRef.current) {
      qrInstanceRef.current = new QRCodeStyling(qrConfig);
      qrRef.current.innerHTML = '';
      qrInstanceRef.current.append(qrRef.current);
    } else {
      qrInstanceRef.current.update(qrConfig);
    }
  }, [payload, options]);

  // Handle Download with custom resolution scale
  const handleDownload = async () => {
    if (!qrInstanceRef.current) return;

    setIsDownloading(true);

    try {
      const baseSize = 300;
      const targetSize = baseSize * downloadScale;
      const ext = downloadFormat; // 'png', 'jpeg', 'svg'

      // Clone styling config for target resolution
      const exportInstance = new QRCodeStyling({
        width: targetSize,
        height: targetSize,
        type: ext === 'svg' ? 'svg' : 'canvas',
        data: payload || 'https://qrstudio.app',
        image: options.logoSrc || undefined,
        margin: Math.round(10 * downloadScale),
        dotsOptions: {
          color: options.dotsColorType === 'single' ? (options.dotsColor || '#000000') : undefined,
          gradient: options.dotsColorType === 'gradient' ? options.dotsGradient : undefined,
          type: options.dotsType || 'rounded',
        },
        backgroundOptions: {
          color: options.isTransparent ? 'transparent' : (options.backgroundColor || '#ffffff'),
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: (options.logoMargin || 4) * downloadScale,
          imageSize: options.logoSize || 0.35,
          hideBackgroundDots: true,
        },
        cornersSquareOptions: {
          type: options.cornersSquareType || 'extra-rounded',
          color: options.dotsColorType === 'single' ? (options.dotsColor || '#000000') : undefined,
        },
        cornersDotOptions: {
          type: options.cornersDotType || 'dot',
          color: options.dotsColorType === 'single' ? (options.dotsColor || '#000000') : undefined,
        },
        qrOptions: {
          errorCorrectionLevel: options.errorCorrectionLevel || (options.logoSrc ? 'H' : 'M'),
        },
      });

      const cleanTitle = (formData?.title || formData?.ssid || type || 'qr-code')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const filename = `qr-studio-${cleanTitle}-${Date.now()}`;

      await exportInstance.download({
        name: filename,
        extension: ext,
      });

      // Celebration confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // ignore
      }

      // Auto save to history on successful download
      handleSaveHistory();

    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy QR Image to Clipboard
  const handleCopyImage = async () => {
    if (!qrInstanceRef.current) return;
    setCopyError(null);

    try {
      const blob = await qrInstanceRef.current.getRawData('png');
      if (!blob) throw new Error('Could not generate image blob');

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        throw new Error('ClipboardItem not supported in this browser');
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      setCopyError('Unable to copy directly. Please use Download button.');
      setTimeout(() => setCopyError(null), 3000);
    }
  };

  // Print QR Code
  const handlePrint = () => {
    window.print();
  };

  // Save to Local History
  const handleSaveHistory = async () => {
    try {
      let previewUrl = null;
      if (qrInstanceRef.current) {
        const blob = await qrInstanceRef.current.getRawData('png');
        if (blob) {
          previewUrl = await new Promise((res) => {
            const reader = new FileReader();
            reader.onloadend = () => res(reader.result);
            reader.readAsDataURL(blob);
          });
        }
      }

      const title = formData?.title || 
                    formData?.ssid || 
                    formData?.url || 
                    formData?.name || 
                    formData?.email || 
                    `${type.toUpperCase()} Code`;

      const saved = saveToHistory({
        type,
        title,
        payload,
        formData,
        options,
        previewDataUrl: previewUrl,
      });

      if (saved) {
        setIsSaved(true);
        if (onSavedToHistory) onSavedToHistory();
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (e) {
      console.error('Error saving to history', e);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Preview Container */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Header Pill */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Live Preview
            </span>
          </div>

          <button
            onClick={handleSaveHistory}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              isSaved
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-200/60 dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:text-brand-600'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved to History' : 'Save'}</span>
          </button>
        </div>

        {/* QR Canvas Container */}
        <div 
          id="qr-print-container"
          className="relative p-4 rounded-2xl flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: options.isTransparent ? 'transparent' : (options.backgroundColor || '#ffffff'),
            boxShadow: options.isTransparent ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.1)',
          }}
        >
          {/* Transparent checkerboard background hint if transparent */}
          {options.isTransparent && (
            <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none -z-10 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:8px_8px]" />
          )}

          <div ref={qrRef} className="flex items-center justify-center select-none" />
        </div>

        {/* Encoded payload preview snippet */}
        <div className="w-full mt-4 p-3 rounded-xl bg-slate-100/70 dark:bg-navy-950/70 border border-slate-200/60 dark:border-purple-500/10 text-center">
          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full">
            {payload || 'https://qrstudio.app'}
          </p>
        </div>

        {/* Copy Error Notice */}
        {copyError && (
          <div className="mt-2 text-xs text-rose-500 text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{copyError}</span>
          </div>
        )}
      </div>

      {/* Download & Export Controls */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 space-y-5">
        
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Download className="w-4 h-4 text-brand-500" />
            Export & Downloads
          </h4>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            No Watermarks
          </span>
        </div>

        {/* Format Selector */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'png', label: 'PNG Image', desc: 'Standard & Web' },
            { id: 'jpeg', label: 'JPG Image', desc: 'Photos & Print' },
            { id: 'svg', label: 'SVG Vector', desc: 'Lossless Scale' },
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setDownloadFormat(fmt.id)}
              className={`p-2.5 rounded-2xl text-center border transition-all ${
                downloadFormat === fmt.id
                  ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-300 font-bold'
                  : 'border-slate-200 dark:border-purple-500/15 bg-white/40 dark:bg-navy-900/40 text-slate-600 dark:text-slate-300'
              }`}
            >
              <div className="text-xs font-bold uppercase">{fmt.id}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{fmt.desc}</div>
            </button>
          ))}
        </div>

        {/* Resolution Scale Selector (for PNG / JPG) */}
        {downloadFormat !== 'svg' && (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Resolution Quality:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {downloadScale === 1 && 'Standard (300px)'}
                {downloadScale === 2 && 'High-Res 2K (600px)'}
                {downloadScale === 4 && 'Ultra HD 4K (1200px)'}
                {downloadScale === 8 && 'Max Print (2400px)'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { scale: 1, label: '1x' },
                { scale: 2, label: '2x' },
                { scale: 4, label: '4x' },
                { scale: 8, label: '8x' },
              ].map((s) => (
                <button
                  key={s.scale}
                  onClick={() => setDownloadScale(s.scale)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                    downloadScale === s.scale
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-200/50 dark:bg-navy-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Primary Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          <span>
            {isDownloading
              ? 'Generating Export...'
              : `Download ${downloadFormat.toUpperCase()}`}
          </span>
        </button>

        {/* Secondary Actions: Copy & Print */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleCopyImage}
            className="py-2.5 px-3 rounded-xl glass-panel-interactive text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-brand-500" />}
            <span>{isCopied ? 'Copied Image!' : 'Copy to Clipboard'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-3 rounded-xl glass-panel-interactive text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-indigo-500" />
            <span>Print QR Code</span>
          </button>
        </div>

      </div>

    </div>
  );
}
