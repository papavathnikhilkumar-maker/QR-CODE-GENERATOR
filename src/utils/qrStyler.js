// Preset Logos as high-quality SVGs encoded as Data URIs for instant center logos
export const PRESET_LOGOS = [
  {
    id: 'none',
    name: 'No Logo',
    icon: 'Ban',
    src: null,
  },
  {
    id: 'qr-studio',
    name: 'QR Studio',
    icon: 'QrCode',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='25' fill='%237c3aed'/%3E%3Cpath d='M30 30h16v16H30zM54 30h16v16H54zM30 54h16v16H30zM58 58h12v12H58z' fill='white'/%3E%3C/svg%3E",
  },
  {
    id: 'scan',
    name: 'Scan Me',
    icon: 'Scan',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='25' fill='%236366f1'/%3E%3Cpath d='M30 38V30h8m32 0h-8v8m-32 24v8h8m32 0h-8v-8' stroke='white' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='50' cy='50' r='8' fill='white'/%3E%3C/svg%3E",
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'MessageCircle',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%2325D366'%3E%3Crect width='100' height='100' rx='25' fill='%2325D366'/%3E%3Cpath fill='white' d='M50 20c-16.5 0-30 13.5-30 30 0 5.3 1.4 10.3 3.8 14.6L20 80l16-4.2c4.1 2.2 8.8 3.5 13.9 3.5 16.5 0 30-13.5 30-30 0-16.5-13.4-29.3-29.9-29.3zm15.4 42.6c-.6 1.8-3.1 3.5-4.8 3.7-1.3.2-3 .3-8.8-2.1-7.4-3.1-12.2-10.7-12.6-11.2-.4-.5-3.1-4.1-3.1-7.9s2-5.6 2.7-6.4c.7-.8 1.6-1 2.1-1 .5 0 1.1 0 1.6.1.5.1 1.2-.2 1.9 1.5.7 1.7 2.4 5.9 2.6 6.3.2.5.3 1 .1 1.6-.2.6-.5 1.1-.9 1.5-.4.5-.8 1-1.2 1.4-.4.4-.8.9-.4 1.7.5.8 2.1 3.4 4.5 5.5 3.1 2.8 5.7 3.6 6.5 4.1.8.4 1.3.4 1.8-.2.5-.6 2.1-2.5 2.7-3.3.6-.9 1.2-.7 2-.4.8.3 5.3 2.5 6.2 3 .9.5 1.5.7 1.7 1.1.3.4.3 2.2-.3 4z'/%3E%3C/svg%3E",
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    icon: 'Wifi',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='25' fill='%230284c7'/%3E%3Cpath d='M25 40c14-11 36-11 50 0M34 51c9-7 23-7 32 0M43 62c4-3 10-3 14 0' stroke='white' stroke-width='7' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='72' r='4' fill='white'/%3E%3C/svg%3E",
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Share2',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3CradialGradient id='ig' cx='30%25' cy='105%25' r='105%25'%3E%3Cstop offset='0%25' stop-color='%23fdf497'/%3E%3Cstop offset='20%25' stop-color='%23fd5949'/%3E%3Cstop offset='50%25' stop-color='%23d6249f'/%3E%3Cstop offset='100%25' stop-color='%23285AEB'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='25' fill='url(%23ig)'/%3E%3Crect x='28' y='28' width='44' height='44' rx='12' fill='none' stroke='white' stroke-width='6'/%3E%3Ccircle cx='50' cy='50' r='11' fill='none' stroke='white' stroke-width='6'/%3E%3Ccircle cx='63' cy='37' r='3.5' fill='white'/%3E%3C/svg%3E",
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'Video',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='25' fill='%23FF0000'/%3E%3Cpath d='M75 39c-.4-2.5-2.5-4.4-5-4.8C65.5 33 50 33 50 33s-15.5 0-20 1.2c-2.5.4-4.6 2.3-5 4.8C23.8 43.5 23.8 50 23.8 50s0 6.5 1.2 11c.4 2.5 2.5 4.4 5 4.8 4.5 1.2 20 1.2 20 1.2s15.5 0 20-1.2c2.5-.4 4.6-2.3 5-4.8 1.2-4.5 1.2-11 1.2-11s0-6.5-1.2-11z' fill='white'/%3E%3Cpolygon points='44,42 60,50 44,58' fill='%23FF0000'/%3E%3C/svg%3E",
  },
  {
    id: 'location',
    name: 'Location',
    icon: 'MapPin',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='25' fill='%23ef4444'/%3E%3Cpath d='M50 24c-11 0-20 9-20 20 0 15 20 34 20 34s20-19 20-34c0-11-9-20-20-20zm0 27c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z' fill='white'/%3E%3C/svg%3E",
  },
  {
    id: 'star',
    name: 'Star',
    icon: 'Star',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='25' fill='%23f59e0b'/%3E%3Cpolygon points='50,22 58,39 77,41 63,55 67,74 50,64 33,74 37,55 23,41 42,39' fill='white'/%3E%3C/svg%3E",
  },
];

export const STYLE_PRESETS = [
  {
    id: 'cyber-neon',
    name: 'Cyber Violet',
    dotsType: 'rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
    dotsColor: '#8b5cf6',
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
  },
  {
    id: 'sunset-blaze',
    name: 'Sunset Glow',
    dotsType: 'extra-rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
    dotsColor: '#f97316',
    dotsColorType: 'gradient',
    dotsGradient: {
      type: 'linear',
      rotation: 45,
      colorStops: [
        { offset: 0, color: '#ec4899' },
        { offset: 1, color: '#f97316' },
      ],
    },
    backgroundColor: '#ffffff',
    isTransparent: false,
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    dotsType: 'classy',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
    dotsColor: '#059669',
    dotsColorType: 'single',
    dotsGradient: null,
    backgroundColor: '#ffffff',
    isTransparent: false,
  },
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    dotsType: 'rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'square',
    dotsColor: '#eab308',
    dotsColorType: 'gradient',
    dotsGradient: {
      type: 'linear',
      rotation: 45,
      colorStops: [
        { offset: 0, color: '#f59e0b' },
        { offset: 1, color: '#d97706' },
      ],
    },
    backgroundColor: '#090c20',
    isTransparent: false,
  },
  {
    id: 'modern-dark',
    name: 'Dark Studio',
    dotsType: 'dots',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
    dotsColor: '#a78bfa',
    dotsColorType: 'single',
    dotsGradient: null,
    backgroundColor: '#0f172a',
    isTransparent: false,
  },
  {
    id: 'classic-black',
    name: 'Classic Black',
    dotsType: 'square',
    cornersSquareType: 'square',
    cornersDotType: 'square',
    dotsColor: '#000000',
    dotsColorType: 'single',
    dotsGradient: null,
    backgroundColor: '#ffffff',
    isTransparent: false,
  },
];

export const DOT_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'dots', label: 'Dots' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'classy', label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Rounded' },
  { id: 'extra-rounded', label: 'Extra Rounded' },
];

export const CORNER_SQUARE_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'extra-rounded', label: 'Rounded' },
  { id: 'dot', label: 'Dot' },
];

export const CORNER_DOT_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Dot' },
];

export const ERROR_CORRECTION_LEVELS = [
  { id: 'L', label: 'Low (7%)', desc: 'Good for simple URLs' },
  { id: 'M', label: 'Medium (15%)', desc: 'Standard balance' },
  { id: 'Q', label: 'Quarter (25%)', desc: 'High reliability' },
  { id: 'H', label: 'High (30%)', desc: 'Best when using logos' },
];
