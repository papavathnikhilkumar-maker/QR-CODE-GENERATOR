/**
 * Formatters and generators for all 14 QR Code types
 */

// Format date to iCalendar compact format YYYYMMDDTHHMMSSZ
const formatICalDate = (dateStr, timeStr) => {
  if (!dateStr) return '';
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanTime = (timeStr || '00:00').replace(/:/g, '') + '00';
  return `${cleanDate}T${cleanTime}Z`;
};

// Escape special characters for Wi-Fi strings
const escapeWifi = (str = '') => {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/:/g, '\\:').replace(/,/g, '\\,');
};

export const QR_CATEGORIES = [
  { id: 'url', name: 'Website URL', icon: 'Globe', desc: 'Link to any website or landing page', popular: true },
  { id: 'text', name: 'Plain Text', icon: 'FileText', desc: 'Display custom text, notes or codes' },
  { id: 'image', name: 'Image to QR', icon: 'Image', desc: 'Upload photo & scan to view', badge: 'Cloud' },
  { id: 'pdf', name: 'PDF Document', icon: 'FileCode2', desc: 'Upload PDF and view on scan', badge: 'Cloud' },
  { id: 'video', name: 'Video Link', icon: 'Video', desc: 'YouTube, TikTok or MP4 video' },
  { id: 'wifi', name: 'Wi-Fi Network', icon: 'Wifi', desc: 'Auto-connect to Wi-Fi network', popular: true },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', desc: 'Direct chat with prefilled message', popular: true },
  { id: 'email', name: 'Email Message', icon: 'Mail', desc: 'Send an email with subject & body' },
  { id: 'phone', name: 'Phone Call', icon: 'Phone', desc: 'Dial a phone number automatically' },
  { id: 'sms', name: 'SMS Text', icon: 'MessageSquare', desc: 'Send predefined text message' },
  { id: 'contact', name: 'vCard Contact', icon: 'UserSquare', desc: 'Save complete digital business card' },
  { id: 'location', name: 'Google Maps', icon: 'MapPin', desc: 'Coordinates or physical address' },
  { id: 'event', name: 'Calendar Event', icon: 'Calendar', desc: 'Save event with date, time & location' },
  { id: 'social', name: 'Social Media', icon: 'Share2', desc: 'Instagram, YouTube, X, LinkedIn & more' },
];

export const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', prefix: 'https://instagram.com/', placeholder: 'username' },
  { id: 'x', name: 'X (Twitter)', prefix: 'https://x.com/', placeholder: 'username' },
  { id: 'youtube', name: 'YouTube', prefix: 'https://youtube.com/@', placeholder: 'channel_handle' },
  { id: 'linkedin', name: 'LinkedIn', prefix: 'https://linkedin.com/in/', placeholder: 'profile-name' },
  { id: 'facebook', name: 'Facebook', prefix: 'https://facebook.com/', placeholder: 'page_or_profile' },
  { id: 'tiktok', name: 'TikTok', prefix: 'https://tiktok.com/@', placeholder: 'username' },
  { id: 'github', name: 'GitHub', prefix: 'https://github.com/', placeholder: 'username' },
  { id: 'telegram', name: 'Telegram', prefix: 'https://t.me/', placeholder: 'username' },
  { id: 'discord', name: 'Discord', prefix: 'https://discord.gg/', placeholder: 'invite_code' },
  { id: 'twitch', name: 'Twitch', prefix: 'https://twitch.tv/', placeholder: 'channel' },
];

export const generateQRPayload = (type, data) => {
  if (!data) return 'https://qrstudio.app';

  switch (type) {
    case 'url': {
      let url = (data.url || '').trim();
      if (!url) return '';
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;
    }

    case 'text':
      return data.text || '';

    case 'image':
      // Return direct public URL or data URL
      return data.imageUrl || data.fileUrl || '';

    case 'pdf':
      return data.pdfUrl || data.fileUrl || '';

    case 'video': {
      let videoUrl = (data.videoUrl || data.fileUrl || '').trim();
      if (videoUrl && !/^https?:\/\//i.test(videoUrl)) {
        videoUrl = 'https://' + videoUrl;
      }
      return videoUrl;
    }

    case 'wifi': {
      const { ssid = '', password = '', security = 'WPA', hidden = false } = data;
      if (!ssid) return '';
      const safeSsid = escapeWifi(ssid);
      const safePass = escapeWifi(password);
      return `WIFI:T:${security};S:${safeSsid};P:${safePass};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'whatsapp': {
      const countryCode = (data.countryCode || '').replace(/\D/g, '');
      const phone = (data.phone || '').replace(/\D/g, '');
      const fullPhone = `${countryCode}${phone}`;
      if (!fullPhone) return '';
      const text = data.message ? `?text=${encodeURIComponent(data.message)}` : '';
      return `https://wa.me/${fullPhone}${text}`;
    }

    case 'email': {
      const email = (data.email || '').trim();
      if (!email) return '';
      const params = [];
      if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
      if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${email}${query}`;
    }

    case 'phone': {
      const phone = (data.phone || '').trim();
      if (!phone) return '';
      return `tel:${phone}`;
    }

    case 'sms': {
      const phone = (data.phone || '').trim();
      if (!phone) return '';
      const body = data.message ? `?body=${encodeURIComponent(data.message)}` : '';
      return `sms:${phone}${body}`;
    }

    case 'contact': {
      const {
        firstName = '',
        lastName = '',
        company = '',
        title = '',
        phone = '',
        mobile = '',
        email = '',
        website = '',
        street = '',
        city = '',
        state = '',
        zip = '',
        country = '',
        note = ''
      } = data;

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${[firstName, lastName].filter(Boolean).join(' ')}`,
      ];

      if (company) lines.push(`ORG:${company}`);
      if (title) lines.push(`TITLE:${title}`);
      if (phone) lines.push(`TEL;TYPE=WORK,VOICE:${phone}`);
      if (mobile) lines.push(`TEL;TYPE=CELL,VOICE:${mobile}`);
      if (email) lines.push(`EMAIL;TYPE=PREF,INTERNET:${email}`);
      if (website) lines.push(`URL:${website.startsWith('http') ? website : 'https://' + website}`);
      
      const addrFields = [street, city, state, zip, country].some(Boolean);
      if (addrFields) {
        lines.push(`ADR;TYPE=WORK:;;${street};${city};${state};${zip};${country}`);
      }

      if (note) lines.push(`NOTE:${note}`);
      lines.push('END:VCARD');

      return lines.join('\n');
    }

    case 'location': {
      const { latitude, longitude, address } = data;
      if (latitude && longitude) {
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      }
      if (address) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      }
      return '';
    }

    case 'event': {
      const { title = '', location = '', description = '', startDate = '', startTime = '', endDate = '', endTime = '' } = data;
      if (!title) return '';

      const dtStart = formatICalDate(startDate, startTime);
      const dtEnd = formatICalDate(endDate || startDate, endTime || startTime);

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
      ];

      if (description) lines.push(`DESCRIPTION:${description.replace(/\n/g, '\\n')}`);
      if (location) lines.push(`LOCATION:${location}`);
      if (dtStart) lines.push(`DTSTART:${dtStart}`);
      if (dtEnd) lines.push(`DTEND:${dtEnd}`);

      lines.push('END:VEVENT');
      lines.push('END:VCALENDAR');

      return lines.join('\n');
    }

    case 'social': {
      const platformId = data.platform || 'instagram';
      const handle = (data.username || '').trim();
      if (!handle) return '';
      
      // If user pasted a full URL, use it directly
      if (/^https?:\/\//i.test(handle)) return handle;

      const cleanHandle = handle.replace(/^@/, '');
      const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId);
      return platform ? `${platform.prefix}${cleanHandle}` : `https://${cleanHandle}`;
    }

    default:
      return typeof data === 'string' ? data : JSON.stringify(data);
  }
};
