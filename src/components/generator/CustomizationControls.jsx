import React, { useRef } from 'react';
import { 
  Palette, 
  Sparkles, 
  Upload, 
  X, 
  Sliders, 
  RotateCw, 
  ShieldCheck, 
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { 
  STYLE_PRESETS, 
  DOT_STYLES, 
  CORNER_SQUARE_STYLES, 
  CORNER_DOT_STYLES, 
  ERROR_CORRECTION_LEVELS, 
  PRESET_LOGOS 
} from '../../utils/qrStyler';

export default function CustomizationControls({ options, onChange }) {
  const logoInputRef = useRef(null);

  const handleUpdate = (patch) => {
    onChange({ ...options, ...patch });
  };

  const applyPreset = (preset) => {
    onChange({
      ...options,
      dotsType: preset.dotsType,
      cornersSquareType: preset.cornersSquareType,
      cornersDotType: preset.cornersDotType,
      dotsColor: preset.dotsColor,
      dotsColorType: preset.dotsColorType,
      dotsGradient: preset.dotsGradient,
      backgroundColor: preset.backgroundColor,
      isTransparent: preset.isTransparent,
    });
  };

  const handleCustomLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        ...options,
        logoSrc: reader.result,
        logoName: file.name,
        // Auto bump error correction to H for scannability
        errorCorrectionLevel: 'H',
      });
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    onChange({
      ...options,
      logoSrc: null,
      logoName: null,
    });
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  return (
    <div className="space-y-8 text-sm">
      
      {/* 1. Quick Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-500" />
            Designer Presets
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className="p-2.5 rounded-2xl glass-panel-interactive text-left flex items-center gap-2.5 border hover:border-brand-500/50"
            >
              <span
                className="w-5 h-5 rounded-full shrink-0 shadow-sm border border-black/10"
                style={{
                  background: preset.dotsColorType === 'gradient'
                    ? `linear-gradient(135deg, ${preset.dotsGradient?.colorStops?.[0]?.color}, ${preset.dotsGradient?.colorStops?.[1]?.color})`
                    : preset.dotsColor
                }}
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Color Settings (Solid or Gradient) */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-purple-500/10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-brand-500" />
            Color Palette & Gradients
          </label>
          <div className="flex gap-1 bg-slate-200/50 dark:bg-navy-900 p-0.5 rounded-xl">
            <button
              type="button"
              onClick={() => handleUpdate({ dotsColorType: 'single' })}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                options.dotsColorType === 'single'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Solid
            </button>
            <button
              type="button"
              onClick={() => {
                const currentGrad = options.dotsGradient || {
                  type: 'linear',
                  rotation: 45,
                  colorStops: [
                    { offset: 0, color: options.dotsColor || '#7c3aed' },
                    { offset: 1, color: '#06b6d4' },
                  ],
                };
                handleUpdate({ dotsColorType: 'gradient', dotsGradient: currentGrad });
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                options.dotsColorType === 'gradient'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Gradient
            </button>
          </div>
        </div>

        {/* Foreground Color Picker (Solid) */}
        {options.dotsColorType === 'single' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl glass-panel flex items-center justify-between">
              <div>
                <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">QR Pattern Color</span>
                <span className="text-[11px] text-slate-400 font-mono">{options.dotsColor || '#000000'}</span>
              </div>
              <input
                type="color"
                value={options.dotsColor || '#000000'}
                onChange={(e) => handleUpdate({ dotsColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
              />
            </div>

            {/* Quick swatches */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['#000000', '#7c3aed', '#2563eb', '#059669', '#dc2626', '#d97706', '#ec4899'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleUpdate({ dotsColor: c })}
                  style={{ backgroundColor: c }}
                  className="w-7 h-7 rounded-lg border border-black/10 hover:scale-110 transition-transform shadow-sm"
                  title={c}
                />
              ))}
            </div>
          </div>
        )}

        {/* Foreground Color (Gradient) */}
        {options.dotsColorType === 'gradient' && (
          <div className="space-y-3 p-4 rounded-2xl glass-panel">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/50 dark:bg-navy-950/50">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Start Color</span>
                <input
                  type="color"
                  value={options.dotsGradient?.colorStops?.[0]?.color || '#7c3aed'}
                  onChange={(e) => {
                    const stops = [...(options.dotsGradient?.colorStops || [{ offset: 0, color: '#7c3aed' }, { offset: 1, color: '#06b6d4' }])];
                    stops[0] = { ...stops[0], color: e.target.value };
                    handleUpdate({
                      dotsGradient: { ...options.dotsGradient, colorStops: stops }
                    });
                  }}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/50 dark:bg-navy-950/50">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">End Color</span>
                <input
                  type="color"
                  value={options.dotsGradient?.colorStops?.[1]?.color || '#06b6d4'}
                  onChange={(e) => {
                    const stops = [...(options.dotsGradient?.colorStops || [{ offset: 0, color: '#7c3aed' }, { offset: 1, color: '#06b6d4' }])];
                    stops[1] = { ...stops[1], color: e.target.value };
                    handleUpdate({
                      dotsGradient: { ...options.dotsGradient, colorStops: stops }
                    });
                  }}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Gradient Type & Angle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">Angle: {options.dotsGradient?.rotation || 45}°</span>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={options.dotsGradient?.rotation || 45}
                onChange={(e) => {
                  handleUpdate({
                    dotsGradient: { ...options.dotsGradient, rotation: parseInt(e.target.value) }
                  });
                }}
                className="w-36 accent-brand-600"
              />
            </div>
          </div>
        )}

        {/* Background Color & Transparent Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-2xl glass-panel flex items-center justify-between">
            <div>
              <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">Background Color</span>
              <span className="text-[11px] text-slate-400 font-mono">
                {options.isTransparent ? 'Transparent' : (options.backgroundColor || '#ffffff')}
              </span>
            </div>
            <input
              type="color"
              disabled={options.isTransparent}
              value={options.backgroundColor || '#ffffff'}
              onChange={(e) => handleUpdate({ backgroundColor: e.target.value, isTransparent: false })}
              className={`w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent ${
                options.isTransparent ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div className="p-3 rounded-2xl glass-panel flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Transparent Background
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={options.isTransparent || false}
                onChange={(e) => handleUpdate({ isTransparent: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-navy-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600" />
            </label>
          </div>
        </div>
      </div>

      {/* 3. Dot & Corner Styles */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-purple-500/10">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-brand-500" />
          Pattern & Corner Shapes
        </label>

        {/* Dots Style */}
        <div>
          <span className="text-xs text-slate-500 block mb-2 font-medium">Matrix Dot Style</span>
          <div className="grid grid-cols-3 gap-2">
            {DOT_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => handleUpdate({ dotsType: style.id })}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  (options.dotsType || 'square') === style.id
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-200/50 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300/70 dark:hover:bg-navy-700'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Square Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <span className="text-xs text-slate-500 block mb-2 font-medium">Corner Square (Eye)</span>
            <div className="grid grid-cols-3 gap-1.5">
              {CORNER_SQUARE_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleUpdate({ cornersSquareType: style.id })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    (options.cornersSquareType || 'extra-rounded') === style.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-200/50 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-500 block mb-2 font-medium">Corner Dot (Inner)</span>
            <div className="grid grid-cols-2 gap-1.5">
              {CORNER_DOT_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleUpdate({ cornersDotType: style.id })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    (options.cornersDotType || 'dot') === style.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-200/50 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Center Logo Management */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-purple-500/10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-brand-500" />
            Center Brand Logo
          </label>
          {options.logoSrc && (
            <button
              type="button"
              onClick={clearLogo}
              className="text-xs text-rose-500 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remove Logo
            </button>
          )}
        </div>

        {/* Preset Logos */}
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_LOGOS.map((logo) => {
            const isSelected = options.logoSrc === logo.src;
            return (
              <button
                key={logo.id}
                type="button"
                onClick={() => {
                  if (logo.src) {
                    onChange({
                      ...options,
                      logoSrc: logo.src,
                      logoName: logo.name,
                      errorCorrectionLevel: 'H',
                    });
                  } else {
                    clearLogo();
                  }
                }}
                className={`p-2 rounded-xl flex items-center gap-2 border transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-300 font-bold'
                    : 'border-slate-200 dark:border-purple-500/15 bg-white/40 dark:bg-navy-900/40 text-slate-600 dark:text-slate-300 hover:border-brand-500/30'
                }`}
              >
                {logo.src ? (
                  <img src={logo.src} alt={logo.name} className="w-5 h-5 rounded" />
                ) : (
                  <X className="w-4 h-4 text-slate-400" />
                )}
                <span className="text-xs">{logo.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Logo Upload */}
        <div className="pt-2">
          <div
            onClick={() => logoInputRef.current?.click()}
            className="p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-purple-500/30 hover:border-brand-500 cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white/30 dark:bg-navy-950/30"
          >
            <input
              ref={logoInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleCustomLogoUpload}
              className="hidden"
            />
            <Upload className="w-4 h-4 text-brand-500" />
            <span>{options.logoName ? `Change: ${options.logoName}` : 'Upload Custom Logo (PNG, SVG, JPG)'}</span>
          </div>
        </div>

        {/* Logo Sizing Controls */}
        {options.logoSrc && (
          <div className="grid grid-cols-2 gap-4 p-3 rounded-2xl glass-panel">
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Logo Size</span>
                <span>{Math.round((options.logoSize || 0.35) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.45"
                step="0.05"
                value={options.logoSize || 0.35}
                onChange={(e) => handleUpdate({ logoSize: parseFloat(e.target.value) })}
                className="w-full accent-brand-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Logo Margin</span>
                <span>{options.logoMargin || 4}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={options.logoMargin || 4}
                onChange={(e) => handleUpdate({ logoMargin: parseInt(e.target.value) })}
                className="w-full accent-brand-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Error Correction & QR Resolution */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-purple-500/10">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Reliability & Error Correction
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ERROR_CORRECTION_LEVELS.map((level) => {
            const isSelected = (options.errorCorrectionLevel || 'H') === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => handleUpdate({ errorCorrectionLevel: level.id })}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-300 font-bold'
                    : 'border-slate-200 dark:border-purple-500/15 bg-white/40 dark:bg-navy-900/40 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{level.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{level.desc}</div>
              </button>
            );
          })}
        </div>

        {options.logoSrc && options.errorCorrectionLevel !== 'H' && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
            <span>Tip: Level H (High) is strongly recommended when including center logos.</span>
          </div>
        )}
      </div>

    </div>
  );
}
