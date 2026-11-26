import { createClient } from '@supabase/supabase-js';

const STORAGE_CONFIG_KEY = 'qr_studio_supabase_config';

// Get current Supabase credentials from LocalStorage or env
export const getSupabaseConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading Supabase config', e);
  }
  return {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    bucket: import.meta.env.VITE_SUPABASE_BUCKET || 'qr-studio-files',
    autoUpload: false,
  };
};

export const saveSupabaseConfig = (config) => {
  localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(STORAGE_CONFIG_KEY);
};

export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    return createClient(config.url, config.anonKey);
  }
  return null;
};

/**
 * Upload a file (Image, PDF, Video) to Supabase Storage or fallback service
 */
export const uploadFileToStorage = async (file, onProgress) => {
  if (!file) throw new Error('No file provided');

  // Check file size (max 25MB for safety)
  const maxSize = 25 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File exceeds maximum size of 25MB');
  }

  const supabase = getSupabaseClient();
  const config = getSupabaseConfig();

  // If Supabase is configured, use it directly
  if (supabase && config.url && config.anonKey) {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `uploads/${Date.now()}-${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from(config.bucket || 'qr-studio-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Supabase upload failed: ${error.message}. Please check if bucket '${config.bucket}' is created and public.`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(config.bucket || 'qr-studio-files')
      .getPublicUrl(filePath);

    return {
      url: publicUrlData.publicUrl,
      provider: 'supabase',
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  // Fallback: Upload to tmpfiles.org or free anonymous storage API
  // Tmpfiles gives direct public links accessible from any phone or browser!
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const resData = await response.json();
      if (resData.status === 'success' && resData.data?.url) {
        // tmpfiles returns URL like https://tmpfiles.org/12345/image.png
        // Direct download/display URL is https://tmpfiles.org/dl/12345/image.png
        const rawUrl = resData.data.url;
        const directUrl = rawUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
        return {
          url: directUrl,
          provider: 'tmpfiles',
          name: file.name,
          size: file.size,
          type: file.type,
        };
      }
    }
  } catch (err) {
    console.warn('Anonymous cloud upload failed, using Data URL fallback', err);
  }

  // Final fallback: Local Data URL / Object URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        url: reader.result,
        provider: 'local',
        name: file.name,
        size: file.size,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  });
};
