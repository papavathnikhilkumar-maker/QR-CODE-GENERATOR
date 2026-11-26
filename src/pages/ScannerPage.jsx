import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  Camera, 
  Upload, 
  Copy, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Scan, 
  Wifi, 
  Globe, 
  UserSquare, 
  FileText, 
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';

export default function ScannerPage({ onTransferToGenerator }) {
  const [scanMode, setScanMode] = useState('camera'); // 'camera' | 'file'
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  
  const scannerInstanceRef = useRef(null);
  const readerElementId = 'qr-camera-stream';
  const fileInputRef = useRef(null);

  // Initialize camera list on mount
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          setCameras(devices);
          // Prefer back camera if available
          const backCamera = devices.find((d) => 
            d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('rear')
          );
          setSelectedCameraId(backCamera ? backCamera.id : devices[0].id);
        }
      })
      .catch((err) => {
        console.warn('Could not list cameras:', err);
      });

    return () => {
      stopCameraScanner();
    };
  }, []);

  const startCameraScanner = async (cameraId) => {
    setErrorMessage(null);
    setScanResult(null);

    try {
      if (!scannerInstanceRef.current) {
        scannerInstanceRef.current = new Html5Qrcode(readerElementId);
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      const cameraChoice = cameraId || selectedCameraId || { facingMode: 'environment' };

      await scannerInstanceRef.current.start(
        cameraChoice,
        config,
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        (error) => {
          // ignore scan frame errors
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Camera start error:', err);
      setIsScanning(false);
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in your browser settings.'
          : err.message || 'Unable to access camera.'
      );
    }
  };

  const stopCameraScanner = async () => {
    if (scannerInstanceRef.current && isScanning) {
      try {
        await scannerInstanceRef.current.stop();
      } catch (e) {
        console.warn('Error stopping scanner:', e);
      }
      setIsScanning(false);
    }
  };

  const handleScanSuccess = (text) => {
    setScanResult(text);
    stopCameraScanner();
  };

  const handleFileUploadScan = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setScanResult(null);

    try {
      const html5QrCode = new Html5Qrcode('qr-file-dummy');
      const decodedText = await html5QrCode.scanFile(file, true);
      html5QrCode.clear();
      setScanResult(decodedText);
    } catch (err) {
      console.error('File scan error:', err);
      setErrorMessage('No valid QR code found in this image. Please ensure the QR is well-lit and unobstructed.');
    }
  };

  const copyResult = () => {
    if (!scanResult) return;
    navigator.clipboard.writeText(scanResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Analyze result type
  const isUrl = /^https?:\/\//i.test(scanResult || '');
  const isWifi = (scanResult || '').startsWith('WIFI:');
  const isVCard = (scanResult || '').includes('BEGIN:VCARD');
  const isEmail = (scanResult || '').startsWith('mailto:');
  const isPhone = (scanResult || '').startsWith('tel:');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700 dark:bg-purple-900/40 dark:text-brand-300">
          <Scan className="w-3.5 h-3.5" /> Instant Browser Scanner
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Scan Any QR Code
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Scan QR codes directly through your device webcam or drop any image file to decode instantly.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center">
        <div className="flex bg-slate-200/60 dark:bg-navy-900/60 p-1.5 rounded-2xl border border-slate-200 dark:border-purple-500/10">
          <button
            onClick={() => {
              setScanMode('camera');
              setScanResult(null);
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              scanMode === 'camera'
                ? 'bg-white dark:bg-navy-800 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Camera className="w-4 h-4 text-brand-500" />
            <span>Live Camera</span>
          </button>

          <button
            onClick={() => {
              stopCameraScanner();
              setScanMode('file');
              setScanResult(null);
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              scanMode === 'file'
                ? 'bg-white dark:bg-navy-800 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Upload className="w-4 h-4 text-indigo-500" />
            <span>Upload Image File</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-2xl space-y-6">
        
        {/* CAMERA MODE */}
        {scanMode === 'camera' && (
          <div className="space-y-6">
            
            {/* Camera controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {cameras.length > 1 && (
                <div className="w-full sm:w-auto">
                  <select
                    value={selectedCameraId}
                    onChange={(e) => {
                      setSelectedCameraId(e.target.value);
                      if (isScanning) {
                        stopCameraScanner();
                        startCameraScanner(e.target.value);
                      }
                    }}
                    className="w-full sm:w-64 px-3 py-2 rounded-xl text-xs glass-input bg-white dark:bg-navy-900 outline-none"
                  >
                    {cameras.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label || `Camera ${c.id.substring(0, 5)}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {!isScanning ? (
                  <button
                    onClick={() => startCameraScanner(selectedCameraId)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-md flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Start Camera</span>
                  </button>
                ) : (
                  <button
                    onClick={stopCameraScanner}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Stop Camera</span>
                  </button>
                )}
              </div>
            </div>

            {/* Video Viewport Frame */}
            <div className="relative min-h-[300px] sm:min-h-[360px] bg-slate-900 rounded-3xl overflow-hidden flex items-center justify-center border border-purple-500/20">
              <div id={readerElementId} className="w-full h-full max-w-sm" />

              {!isScanning && !scanResult && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950/80 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white">Camera is Ready</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Click "Start Camera" above to scan QR codes with your device's camera.
                  </p>
                  <button
                    onClick={() => startCameraScanner(selectedCameraId)}
                    className="mt-2 px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white"
                  >
                    Enable Camera
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* FILE UPLOAD MODE */}
        {scanMode === 'file' && (
          <div className="space-y-4">
            <div id="qr-file-dummy" className="hidden" />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-purple-500/30 rounded-3xl p-12 text-center cursor-pointer hover:border-brand-500/60 bg-white/30 dark:bg-navy-950/30 hover:bg-purple-50/20 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUploadScan}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Select or Drop QR Code Image
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PNG, JPG, WEBP, Screenshots and Photos
                  </p>
                </div>
                <button
                  type="button"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md"
                >
                  Browse Files
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200 border border-rose-200 dark:border-rose-800 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Decoded Result Card */}
        {scanResult && (
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Decoded Successfully
                </span>
              </div>

              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                {isUrl && 'Web URL'}
                {isWifi && 'Wi-Fi Network'}
                {isVCard && 'vCard Contact'}
                {isEmail && 'Email Message'}
                {isPhone && 'Phone Number'}
                {!isUrl && !isWifi && !isVCard && !isEmail && !isPhone && 'Plain Text'}
              </span>
            </div>

            {/* Result text */}
            <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-purple-500/10 break-all font-mono text-sm text-slate-800 dark:text-slate-200">
              {scanResult}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isUrl && (
                <a
                  href={scanResult}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Website</span>
                </a>
              )}

              <button
                onClick={copyResult}
                className="px-4 py-2.5 rounded-xl text-xs font-bold glass-panel-interactive text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Text!' : 'Copy Decoded Text'}</span>
              </button>

              <button
                onClick={() => onTransferToGenerator(scanResult)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-brand-600 dark:text-brand-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Re-style in Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
