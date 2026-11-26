const HISTORY_STORAGE_KEY = 'qr_studio_history_v1';
const MAX_HISTORY_ITEMS = 50;

export const getHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.error('Failed to load QR history from localStorage', e);
    return [];
  }
};

export const saveToHistory = (item) => {
  try {
    const current = getHistory();
    const newItem = {
      id: item.id || `qr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type: item.type || 'url',
      title: item.title || item.payload?.substring(0, 30) || 'Untitled QR',
      payload: item.payload,
      formData: item.formData || {},
      options: item.options || {},
      previewDataUrl: item.previewDataUrl || null,
      createdAt: new Date().toISOString(),
    };

    // Filter out duplicate if same ID or exact same payload & options
    const filtered = current.filter(
      (h) => h.id !== newItem.id && h.payload !== newItem.payload
    );

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  } catch (e) {
    console.error('Failed to save QR to history', e);
    return null;
  }
};

export const deleteHistoryItem = (id) => {
  try {
    const current = getHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete history item', e);
    return [];
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    return [];
  } catch (e) {
    console.error('Failed to clear history', e);
    return [];
  }
};
