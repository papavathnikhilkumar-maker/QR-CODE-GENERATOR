import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cloud, 
  Key, 
  Database, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Trash2,
  ShieldAlert,
  Save,
  RefreshCw
} from 'lucide-react';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  clearSupabaseConfig, 
  getSupabaseClient 
} from '../utils/storageService';

export default function StorageSettingsModal({ isOpen, onClose }) {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [bucket, setBucket] = useState('qr-studio-files');
  const [testStatus, setTestStatus] = useState(null); // 'testing' | 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getSupabaseConfig();
      setUrl(config.url || '');
      setAnonKey(config.anonKey || '');
      setBucket(config.bucket || 'qr-studio-files');
      setTestStatus(null);
      setStatusMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveSupabaseConfig({
      url: url.trim(),
      anonKey: anonKey.trim(),
      bucket: bucket.trim() || 'qr-studio-files',
    });
    setTestStatus('success');
    setStatusMessage('Settings saved successfully!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    clearSupabaseConfig();
    setUrl('');
    setAnonKey('');
    setBucket('qr-studio-files');
    setTestStatus('success');
    setStatusMessage('Supabase configuration cleared. QR Studio will use default cloud storage fallback.');
  };

  const handleTestConnection = async () => {
    if (!url || !anonKey) {
      setTestStatus('error');
      setStatusMessage('Please enter both Supabase Project URL and Anon Public Key.');
      return;
    }

    setTestStatus('testing');
    setStatusMessage('Verifying Supabase connection...');

    try {
      saveSupabaseConfig({
        url: url.trim(),
        anonKey: anonKey.trim(),
        bucket: bucket.trim() || 'qr-studio-files',
      });

      const client = getSupabaseClient();
      if (!client) throw new Error('Could not instantiate Supabase client');

      // Test listing buckets
      const { data, error } = await client.storage.getBucket(bucket.trim() || 'qr-studio-files');

      if (error) {
        // If bucket not found
        setTestStatus('error');
        setStatusMessage(`Connection reached Supabase, but bucket '${bucket}' could not be accessed (${error.message}). Please ensure the bucket exists and is set to Public.`);
      } else {
        setTestStatus('success');
        setStatusMessage(`Success! Connected to bucket '${bucket}' with public access.`);
      }
    } catch (err) {
      setTestStatus('error');
      setStatusMessage(`Connection failed: ${err.message || 'Check your URL and API Key.'}`);
    }
  };

  const sampleSql = `-- Create public storage bucket in Supabase SQL editor:
insert into storage.buckets (id, name, public)
values ('${bucket || 'qr-studio-files'}', '${bucket || 'qr-studio-files'}', true)
on conflict (id) do nothing;

-- Allow public uploads:
create policy "Allow public uploads"
on storage.objects for insert
with check ( bucket_id = '${bucket || 'qr-studio-files'}' );

-- Allow public reads:
create policy "Allow public reads"
on storage.objects for select
using ( bucket_id = '${bucket || 'qr-studio-files'}' );`;

  const copySql = () => {
    navigator.clipboard.writeText(sampleSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-purple-500/10 bg-slate-50/50 dark:bg-navy-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Cloud Storage Settings
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 font-semibold">
                  Optional
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connect your personal Supabase project for persistent image, PDF & video hosting.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-6">
          
          {/* Notice banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200/80 dark:border-purple-500/20 flex gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <ShieldAlert className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-semibold">Zero-Configuration Fallback:</strong> If you don't enter Supabase keys, QR Studio seamlessly uses free anonymous public hosting and local data viewers. You can generate image and PDF QR codes right away!
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-brand-500" />
                Supabase Project URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full px-4 py-3 rounded-xl text-sm glass-input font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-brand-500" />
                Supabase Public Anon Key
              </label>
              <input
                type="password"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-4 py-3 rounded-xl text-sm glass-input font-mono outline-none"
              />
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                Only use your public `anon` key. Never paste the `service_role` secret key.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-brand-500" />
                Storage Bucket Name
              </label>
              <input
                type="text"
                value={bucket}
                onChange={(e) => setBucket(e.target.value)}
                placeholder="qr-studio-files"
                className="w-full px-4 py-3 rounded-xl text-sm glass-input font-mono outline-none"
              />
            </div>
          </div>

          {/* Status Message */}
          {testStatus && (
            <div className={`p-4 rounded-2xl flex items-start gap-3 text-xs ${
              testStatus === 'success'
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/50'
                : testStatus === 'error'
                ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200 border border-rose-300 dark:border-rose-700/50'
                : 'bg-purple-50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-200 border border-purple-300 dark:border-purple-700/50'
            }`}>
              {testStatus === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
              {testStatus === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              {testStatus === 'testing' && <RefreshCw className="w-5 h-5 text-brand-500 shrink-0 animate-spin" />}
              <span className="font-medium">{statusMessage}</span>
            </div>
          )}

          {/* Quick Setup Instructions & SQL helper */}
          <div className="rounded-2xl border border-slate-200 dark:border-purple-500/10 p-4 bg-slate-50/50 dark:bg-navy-950/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Quick SQL Policy (Supabase Dashboard)
              </span>
              <button
                onClick={copySql}
                className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedSql ? 'Copied SQL!' : 'Copy SQL'}
              </button>
            </div>
            <pre className="text-[11px] font-mono p-3 bg-slate-900 text-purple-200 rounded-xl overflow-x-auto">
              {sampleSql}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-purple-500/10 bg-slate-50/80 dark:bg-navy-950/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Reset to Default
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-purple-500/30 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
              Test Connection
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-md shadow-brand-500/30 transition-all hover:scale-105"
            >
              <Save className="w-3.5 h-3.5" />
              Save Configuration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
