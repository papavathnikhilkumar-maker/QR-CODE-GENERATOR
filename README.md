# QR Studio — 100% Free Professional QR Code Generator & Scanner

A production-quality, ultra-modern QR Code Studio built with **React**, **Vite**, **Tailwind CSS**, and **`qr-code-styling`**. 

> **Guaranteed 100% Free Forever:** No login, no signup, no account creation, no subscriptions, no scan limits, and no watermarks.

---

## ✨ Features

### 1. 14 Specialized QR Categories
- **Website URL**: Dynamic link validation with quick prefix helpers (`https://`, `https://www.`, etc.).
- **Plain Text**: Raw strings, notes, passwords, or serial numbers with live character counters.
- **Image to QR**: Upload JPG, PNG, WEBP, or GIF files. Scannable link opens the image directly.
- **PDF Document**: Upload menus, brochures, guides, and catalogs.
- **Video**: YouTube, Vimeo, TikTok, or direct MP4 video link/upload.
- **Wi-Fi Network**: SSID, Password, Encryption (WPA/WPA2/WPA3, WEP, Open), and Hidden Network toggle.
- **WhatsApp**: International country code, phone number, and optional pre-filled message.
- **Email**: Recipient address, subject line, and pre-written email body.
- **Phone Call**: One-tap phone number dialing.
- **SMS**: Predefined text message and phone number.
- **vCard 3.0**: Digital business card (Name, Organization, Title, Phone, Mobile, Email, Website, Address, Notes).
- **Google Maps Location**: Address search or exact GPS coordinates (`Latitude`, `Longitude`).
- **Calendar Event**: iCalendar `.ics` format with Start Date/Time, End Date/Time, Venue, and Description.
- **Social Media**: 1-click profiles for Instagram, X (Twitter), YouTube, LinkedIn, Facebook, TikTok, GitHub, Telegram, Discord, and Twitch.

### 2. Studio Customization Suite
- **Color Gradients**: Solid colors, Linear Gradients, Radial Gradients with custom angles and color stops.
- **Background Control**: Any solid color or transparent background.
- **6 Dot Styles**: `Square`, `Dots`, `Rounded`, `Classy`, `Classy Rounded`, `Extra Rounded`.
- **Corner Eye Shapes**: Custom corner square (`Square`, `Rounded`, `Dot`) and corner dot styling.
- **Center Logos**:
  - Preset Brand Logos (QR Studio, Scan Me, WhatsApp, Wi-Fi, Instagram, YouTube, Location, Star).
  - Custom logo upload (PNG, SVG, JPG) with size and margin sliders.
- **Error Correction**: `L` (7%), `M` (15%), `Q` (25%), `H` (30% - optimal for logos).
- **Designer Presets**: Cyber Violet, Sunset Glow, Emerald Matrix, Midnight Gold, Dark Studio, Classic Black.

### 3. High-Resolution Vector & Image Downloads
- **Formats**: Lossless Vector **SVG**, High-Definition **PNG**, and **JPG**.
- **Quality Scale**: `1x` (300px), `2x` (600px 2K), `4x` (1200px 4K), and `8x` (2400px Print HD).
- **Direct Clipboard Copy**: Copy QR image directly to clipboard for pasting into Photoshop, Figma, Word, or Slack.
- **Print Optimization**: Formatted clean print page via browser print dialog.

### 4. Integrated QR Scanner
- **Live Camera Scanner**: Front & rear webcam switching with viewfinder alignment.
- **File Upload Scanner**: Drag and drop any image or photo to decode QR data instantly.
- **Smart Actions**: One-click to open links, copy text, or re-load the scanned data into the Generator.

### 5. Offline Browser History Vault
- Saves generated QR codes in browser `LocalStorage`.
- Thumbnail preview, search filter, and category tags.
- "Load in Studio" to restore the exact form data and styling.
- Single item delete or clear all with confirmation.

### 6. Cloud Storage Integration (Optional)
- **Zero-Config Fallback**: Works immediately using anonymous cloud storage and local data viewers.
- **Custom Supabase Integration**: Configure your own Supabase project URL, Anon Key, and Bucket name in the in-app settings modal.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
# Clone or open the project folder
cd "QR CODE GENERATOR"

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
# Build production bundle with optimized code-splitting
npm run build

# Preview production build locally
npm run preview
```

---

## 🛡️ Privacy & Security Pledge
- **No Personal Information Collected**: No accounts or emails are collected.
- **Local Client-Side Generation**: QR matrices for text, URLs, Wi-Fi, and contacts are generated inside your browser without backend transmission.
- **No Tracking**: No advertising pixels, tracking cookies, or spyware.
