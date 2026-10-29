import React, { useState } from 'react';
import { Sparkles, Terminal, X, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { STAGES } from '../utils/particleShapes';
import { STAGE_TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  currentStage: number;
  onSelectStage: (stageIndex: number) => void;
  onOpenTerminal: () => void;
  onOpenPricing: () => void;
  isAudioActive?: boolean;
  onToggleAudio?: () => void;
  lang: 'ru' | 'en' | 'kk';
  onToggleLang: (newLang: 'ru' | 'en' | 'kk') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  onSelectStage,
  onOpenTerminal,
  onOpenPricing,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    ru: {
      arch: 'Архитектура',
      precision: 'Точность',
      mastery: 'Обучение',
      context: 'Память',
      pricing: 'Тарифы',
      launch: 'Crystal 2.2',
      chapters: 'Главы KentaevAI Crystal 2.2',
    },
    en: {
      arch: 'Architecture',
      precision: 'Precision',
      mastery: 'Mastery',
      context: 'Context',
      pricing: 'Pro Plans',
      launch: 'Crystal 2.2',
      chapters: 'KentaevAI Crystal 2.2 Chapters',
    },
    kk: {
      arch: 'Архитектура',
      precision: 'Дәлдік',
      mastery: 'Шеберлік',
      context: 'Жады',
      pricing: 'Тарифтер',
      launch: 'Crystal 2.2',
      chapters: 'KentaevAI Crystal 2.2 бөлімдері',
    },
  }[lang];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-1.5 sm:gap-3 px-3 sm:px-6 md:px-10 py-2 sm:py-2.5 bg-[#06060e]/80 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.08)_inset] pt-[max(0.45rem,env(safe-area-inset-top))] transition-all duration-300">
        {/* Luminous hairline accent */}
        <div className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {/* Zone 1: Brand Wordmark (Compact, crystalline & sleek) */}
        <button
          onClick={() => {
            soundEngine.playInteraction();
            onSelectStage(0);
          }}
          className="flex items-center gap-1.5 sm:gap-2.5 text-left text-white tracking-wider font-display font-bold text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 group transition-all hover:opacity-95 min-h-[32px] sm:min-h-[36px]"
        >
          <div className="relative flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff,0_0_24px_#00f0ff] animate-pulse" />
            <span className="absolute inset-0 rounded-full bg-cyan-300/40 animate-ping" />
          </div>
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] font-extrabold tracking-wide">
            KENTAEV<span className="text-cyan-400 font-mono-data text-[9px] sm:text-[10px] ml-1 font-semibold tracking-wider">.AI CRYSTAL 2.2</span>
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.18em] uppercase font-mono-data font-medium text-white/70">
          <button
            onClick={() => onSelectStage(1)}
            className="hover:text-cyan-300 transition-all duration-200 whitespace-nowrap shrink-0 hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]"
          >
            {t.arch}
          </button>
          <button
            onClick={() => onSelectStage(2)}
            className="hover:text-emerald-300 transition-all duration-200 whitespace-nowrap shrink-0 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]"
          >
            {t.precision}
          </button>
          <button
            onClick={() => onSelectStage(3)}
            className="hover:text-pink-300 transition-all duration-200 whitespace-nowrap shrink-0 hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]"
          >
            {t.mastery}
          </button>
          <button
            onClick={() => onSelectStage(4)}
            className="hover:text-amber-300 transition-all duration-200 whitespace-nowrap shrink-0 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
          >
            {t.context}
          </button>
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-200 hover:text-white hover:border-cyan-400/70 hover:bg-cyan-900/50 transition-all duration-200 whitespace-nowrap shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{t.pricing}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Language, KentaevAI Crystal 2.2, Mobile Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language selector */}
          <div className="flex items-center text-[9px] sm:text-[10px] font-mono-data bg-white/[0.04] border border-white/[0.12] rounded-xl p-0.5 shrink-0 shadow-inner backdrop-blur-md">
            {(['ru', 'en', 'kk'] as const).map((l) => (
              <button
                key={l}
                onClick={() => onToggleLang(l)}
                className={`px-1.5 sm:px-2 py-0.5 rounded-lg uppercase min-w-[20px] sm:min-w-[24px] min-h-[22px] sm:min-h-[26px] flex items-center justify-center transition-all duration-200 ${
                  lang === l
                    ? 'bg-gradient-to-r from-cyan-500/30 to-teal-500/30 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Primary Action Button: Crystal 2.2 Jewel */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 min-h-[28px] sm:min-h-[32px] text-[10px] sm:text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-xl shadow-[0_0_18px_rgba(0,240,255,0.45),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_0_28px_rgba(0,240,255,0.85)] hover:scale-[1.03] active:scale-95 transition-all duration-200 whitespace-nowrap shrink-0"
            title="KentaevAI Crystal 2.2"
          >
            <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0 stroke-[2.5]" />
            <span className="font-extrabold tracking-wide font-mono-data">
              <span className="hidden min-[380px]:inline">Crystal </span>2.2
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer / Chapters Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-gradient-to-b from-[#11101b] to-[#050508] p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-display font-semibold text-sm text-white tracking-wide">
                {t.chapters}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    soundEngine.playInteraction();
                    onSelectStage(idx);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                    currentStage === idx
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono-data text-xs text-white/40">
                      {s.number}
                    </span>
                    <span className="text-sm font-medium">
                      {STAGE_TRANSLATIONS[s.id]?.[lang]?.title || s.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
                </button>
              ))}
            </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    onOpenPricing();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-xs font-mono-data text-white font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.pricing}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenTerminal();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-mono-data font-bold"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t.launch}</span>
                </button>
              </div>
            </div>
          </div>
      )}
    </>
  );
};
