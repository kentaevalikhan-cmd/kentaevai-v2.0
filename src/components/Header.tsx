import React, { useState } from 'react';
import { Sparkles, Terminal, Menu, X, ChevronRight } from 'lucide-react';
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
      launch: 'KentaevAI 2.0',
      chapters: 'Главы KentaevAI 2.0',
    },
    en: {
      arch: 'Architecture',
      precision: 'Precision',
      mastery: 'Mastery',
      context: 'Context',
      pricing: 'Pro Plans',
      launch: 'KentaevAI 2.0',
      chapters: 'KentaevAI 2.0 Chapters',
    },
    kk: {
      arch: 'Архитектура',
      precision: 'Дәлдік',
      mastery: 'Шеберлік',
      context: 'Жады',
      pricing: 'Тарифтер',
      launch: 'KentaevAI 2.0',
      chapters: 'KentaevAI 2.0 бөлімдері',
    },
  }[lang];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-1 sm:gap-2.5 px-2 sm:px-4 md:px-8 py-1.5 sm:py-2.5 liquid-glass pt-[max(0.4rem,env(safe-area-inset-top))]">
        {/* Zone 1: Brand Wordmark (Compact & sleek) */}
        <button
          onClick={() => {
            soundEngine.playInteraction();
            onSelectStage(0);
          }}
          className="flex items-center gap-1 sm:gap-1.5 text-left text-white tracking-wider font-display font-bold text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 group transition-opacity hover:opacity-90 min-h-[30px] sm:min-h-[36px]"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-pulse shrink-0" />
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            KENTAEV<span className="text-cyan-400 font-mono-data text-[9px] sm:text-[10px] ml-0.5 font-semibold opacity-95">.AI 2.0</span>
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-white/60">
          <button
            onClick={() => onSelectStage(1)}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-cyan-400/50 underline-offset-8"
          >
            {t.arch}
          </button>
          <button
            onClick={() => onSelectStage(2)}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-emerald-400/50 underline-offset-8"
          >
            {t.precision}
          </button>
          <button
            onClick={() => onSelectStage(3)}
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-pink-400/50 underline-offset-8"
          >
            {t.mastery}
          </button>
          <button
            onClick={() => onSelectStage(4)}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-400/50 underline-offset-8"
          >
            {t.context}
          </button>
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.pricing}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Language, KentaevAI 2.0, Mobile Menu) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Language selector */}
          <div className="flex items-center text-[9px] sm:text-[10px] font-mono-data bg-white/[0.05] border border-white/10 rounded-lg p-0.5 shrink-0">
            {(['ru', 'en', 'kk'] as const).map((l) => (
              <button
                key={l}
                onClick={() => onToggleLang(l)}
                className={`px-1 sm:px-1.5 py-0.5 rounded uppercase min-w-[18px] sm:min-w-[22px] min-h-[22px] sm:min-h-[26px] flex items-center justify-center transition-colors ${
                  lang === l
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Primary Action Button: KentaevAI 2.0 (Compact & refined) */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onOpenTerminal();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 min-h-[28px] sm:min-h-[32px] text-[10px] sm:text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-lg shadow-[0_0_12px_rgba(0,240,255,0.35)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] active:scale-95 transition-all whitespace-nowrap shrink-0"
            title="KentaevAI 2.0"
          >
            <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0 stroke-[2.5]" />
            <span className="font-bold tracking-wide">
              <span className="hidden min-[380px]:inline">Kentaev</span>AI 2.0
            </span>
          </button>

          {/* Mobile Menu Trigger (button:nth-of-type(2)) - made compact and guaranteed visible on smartphones */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden w-7 h-7 sm:w-8 sm:h-8 flex shrink-0 items-center justify-center p-1 rounded-lg border border-white/20 text-white hover:text-cyan-300 bg-white/[0.08] hover:bg-white/[0.15] transition-all active:scale-95 shadow-sm"
            aria-label="Toggle mobile chapters menu"
            title={t.chapters}
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
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
