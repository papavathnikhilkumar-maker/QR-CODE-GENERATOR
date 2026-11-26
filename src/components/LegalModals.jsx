import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Info, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function LegalModals({ activeModal, onClose }) {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    subject: 'Feedback',
    message: '',
  });

  if (!activeModal) return null;

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackForm.message) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-purple-500/10 bg-slate-50/50 dark:bg-navy-950/40">
          <div className="flex items-center gap-3">
            {activeModal === 'privacy' && (
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            )}
            {activeModal === 'terms' && (
              <div className="p-2.5 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <FileText className="w-6 h-6" />
              </div>
            )}
            {activeModal === 'about' && (
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Info className="w-6 h-6" />
              </div>
            )}
            {activeModal === 'contact' && (
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Mail className="w-6 h-6" />
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms of Service'}
                {activeModal === 'about' && 'About QR Studio'}
                {activeModal === 'contact' && 'Contact & Feedback'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeModal === 'privacy' && 'Your privacy and data ownership are guaranteed.'}
                {activeModal === 'terms' && '100% Free for personal and commercial applications.'}
                {activeModal === 'about' && 'The open, unlimited QR suite for modern creators.'}
                {activeModal === 'contact' && 'Have suggestions or requests? We would love to hear from you.'}
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

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          
          {/* Privacy Policy */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-medium text-xs">
                QR Studio was architected from day one with a strict <strong>Privacy-First, Zero-Account Guarantee</strong>.
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">1. Zero Registration & Account Free</h4>
              <p>
                We do not require names, passwords, email addresses, credit cards, or signups. Anyone in the world can generate and customize QR codes with immediate full access.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">2. Local-First Processing</h4>
              <p>
                All URL, Wi-Fi, Text, Contact (vCard), SMS, Phone, and Event QR codes are generated entirely client-side inside your browser. No personal payload text is sent to our servers.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">3. QR Code History Stored Locally</h4>
              <p>
                Your recent QR code history is saved purely within your browser's LocalStorage. It never leaves your machine unless you explicitly export or download the images.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">4. File Uploads (Images & PDFs)</h4>
              <p>
                When using the Image-to-QR or PDF-to-QR feature, files are hosted either on your own connected Supabase bucket or via secure public cloud file storage so that people who scan your QR code can view the file. You retain full copyright and ownership of all uploaded content.
              </p>
            </div>
          )}

          {/* Terms of Service */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">1. Free Universal License</h4>
              <p>
                QR Studio grants you an irrevocable, royalty-free license to generate, download, print, publish, and use QR codes for both commercial and personal endeavors worldwide.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">2. Acceptable Use</h4>
              <p>
                You agree not to use QR Studio to generate links to malware, phishing sites, unsolicited spam, or unlawful material.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">3. Disclaimer</h4>
              <p>
                QR codes are generated mathematically according to ISO/IEC 18004 standards. Always test your generated QR codes with multiple physical scanner apps before high-volume commercial printing.
              </p>
            </div>
          )}

          {/* About QR Studio */}
          {activeModal === 'about' && (
            <div className="space-y-4">
              <p>
                <strong>QR Studio</strong> is a modern, high-fidelity QR Code Generation and Customization platform designed to provide a truly free, ad-free, and account-free alternative to commercial QR paywalls.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/15">
                  <span className="block text-xl font-extrabold text-brand-600 dark:text-brand-400">14+</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Specialized QR Types</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/15">
                  <span className="block text-xl font-extrabold text-indigo-600 dark:text-indigo-400">100%</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Free, No Watermarks</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/15">
                  <span className="block text-xl font-extrabold text-cyan-600 dark:text-cyan-400">Vector</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">SVG, PNG & High-Res</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/15">
                  <span className="block text-xl font-extrabold text-emerald-600 dark:text-emerald-400">Live</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Camera QR Scanner</span>
                </div>
              </div>
            </div>
          )}

          {/* Contact / Feedback Form */}
          {activeModal === 'contact' && (
            <div>
              {feedbackSent ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Message Received!</h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Thank you for reaching out. We appreciate your feedback to make QR Studio even better.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name or Organization
                    </label>
                    <input
                      type="text"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                      placeholder="Alex Parker"
                      className="w-full px-4 py-2.5 rounded-xl text-sm glass-input outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={feedbackForm.email}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl text-sm glass-input outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Topic
                    </label>
                    <select
                      value={feedbackForm.subject}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm glass-input outline-none bg-white dark:bg-navy-900"
                    >
                      <option value="Feedback">General Feedback</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Partnership">Commercial Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      placeholder="Share your thoughts, suggestions, or questions..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm glass-input outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-purple-500/10 bg-slate-50/80 dark:bg-navy-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-purple-500/30 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
