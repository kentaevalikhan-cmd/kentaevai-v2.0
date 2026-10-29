import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { STAGES } from '../utils/particleShapes';
import { soundEngine } from '../utils/audio';
import { STAGE_TRANSLATIONS, UI_TRANSLATIONS, Language } from '../utils/translations';

interface SlideOverlayProps {
  currentStage: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectStage: (idx: number) => void;
  onStart: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  lang: Language;
}

export const SlideOverlay: React.FC<SlideOverlayProps> = ({
  currentStage,
  onNext,
  onPrev,
  onSelectStage,
  onStart,
  isAutoPlay,
  onToggleAutoPlay,
  lang,
}) => {
  const stage = STAGES[currentStage] || STAGES[0];
  const isHero = currentStage === 0;
  const isFinale = currentStage === STAGES.length - 1;

  // Retrieve comprehensive localized copy for current stage & language
  const stageTranslations = STAGE_TRANSLATIONS[stage.id] || STAGE_TRANSLATIONS.hero;
  const localizedData = stageTranslations[lang] || stageTranslations.ru;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 md:px-16 overflow-hidden">
      {/* Ambient background light matching active stage */}
      <div
        className="absolute top-1/3 left-1/2 md:left-1/4 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] max-w-[550px] max-h-[550px] rounded-full blur-[100px] md:blur-[140px] pointer-events-none transition-all duration-1000 opacity-40"
        style={{ background: stage.primaryColor }}
      />

      {/* Main Content Area - Completely transparent container to let 3D background particles shine through */}
      <div className="flex-1 flex items-center max-w-4xl my-auto">
        <div
          key={stage.id}
          className="pointer-events-auto w-full max-w-2xl sm:max-w-3xl p-1 sm:p-2 space-y-3 sm:space-y-4 md:space-y-5 animate-slide-up select-none"
        >
          {/* Metadata Kicker with dynamic stage color line & glowing indicator */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm tracking-[0.2em] font-mono-data uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: stage.primaryColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2 shadow-[0_0_10px_currentColor]"
                style={{ backgroundColor: stage.primaryColor, color: stage.primaryColor }}
              />
            </span>
            <span
              className="font-bold tracking-wider transition-colors duration-500"
              style={{ color: stage.primaryColor }}
            >
              {localizedData.kicker}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/80 font-semibold">
              {UI_TRANSLATIONS.chapter[lang]} {stage.number}
            </span>
          </div>

          {/* Animated Accent Line that responds to stage theme */}
          <div
            className="w-16 sm:w-24 h-0.5 rounded-full transition-all duration-700 animate-pulse"
            style={{
              background: `linear-gradient(90deg, ${stage.primaryColor}, transparent)`,
            }}
          />

          {/* Dominant Headline - with flowing gradient colors and zero physical movement */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-balance font-display transition-all duration-500 animate-color-flow select-none">
            {localizedData.title}
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-sm sm:text-base md:text-lg text-cyan-200/95 font-medium max-w-2xl text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]">
            {localizedData.tagline}
          </p>

          {/* Descriptive Body - High readability on top of active particle field */}
          <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            {localizedData.description}
          </p>

          {/* Quantitative Metrics Bar - Lightweight glassy pills revealing 3D field with animated hover */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 max-w-xl">
            {localizedData.metrics.map((metric, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-white/15 bg-black/40 backdrop-blur-xs p-2.5 sm:p-3 text-center sm:text-left transition-all duration-300 hover:border-cyan-400/50 hover:bg-black/60 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
              >
                <div className="text-sm sm:text-base md:text-lg font-extrabold font-mono-data text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-cyan-300 transition-colors">
                  {metric.value}
                </div>
                <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-cyan-300/90 font-mono-data truncate mt-0.5 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons with fluid hover effects */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* button:nth-of-type(1) - Primary Action */}
            {isHero ? (
              <div className="relative group inline-block w-full sm:w-auto">
                <div
                  className="absolute -inset-1 rounded-2xl sm:rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"
                  style={{ background: `linear-gradient(90deg, ${stage.primaryColor}, #00f0ff, #10b981)` }}
                />
                <button
                  onClick={() => {
                    soundEngine.playInteraction();
                    onStart();
                  }}
                  className="relative w-full sm:w-auto min-h-[50px] flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wider uppercase font-mono-data shadow-[0_0_30px_rgba(0,240,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:shadow-[0_0_50px_rgba(0,240,255,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="font-extrabold tracking-wider">{localizedData.cta}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            ) : isFinale ? (
              <button
                onClick={() => {
                  soundEngine.playInteraction();
                  onStart();
                }}
                className="group relative overflow-hidden min-h-[50px] flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wider uppercase font-mono-data shadow-[0_0_35px_rgba(0,240,255,0.6),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:shadow-[0_0_55px_rgba(0,240,255,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 animate-spin text-slate-950" style={{ animationDuration: '4s' }} />
                <span className="font-extrabold tracking-wider">{localizedData.cta}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEngine.playInteraction();
                  onNext();
                }}
                className="group relative overflow-hidden min-h-[48px] flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/25 via-teal-500/20 to-cyan-500/25 hover:from-cyan-400 hover:via-teal-300 hover:to-cyan-300 border border-cyan-400/50 hover:border-cyan-300 text-white hover:text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase font-mono-data backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10 font-bold">{localizedData.cta}</span>
                <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>
            )}

            {/* button:nth-of-type(2) - Quick jump to interactive Crystal 2.2 terminal */}
            <button
              onClick={() => {
                soundEngine.playInteraction();
                onStart();
              }}
              className="group relative min-h-[48px] flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl border border-cyan-400/40 hover:border-cyan-300/80 bg-gradient-to-r from-[#0c1424]/90 via-[#0a192f]/85 to-[#082032]/90 backdrop-blur-xl text-cyan-300 hover:text-white font-mono-data text-xs tracking-wider uppercase font-semibold shadow-[0_0_20px_rgba(0,240,255,0.18),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-ping" />
              <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              <span>{UI_TRANSLATIONS.terminalBtn[lang]}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400/80 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Bar - Mobile Thumb Zone with safe bounds */}
      <footer className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl liquid-glass text-xs font-mono-data text-white/70 mb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {/* Left: Current Chapter counter and touch progress */}
        <div className="flex items-center gap-2 sm:gap-5 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-white/80 shrink-0">
            <span className="font-semibold text-white text-xs sm:text-sm">
              {String(currentStage + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/40 text-xs sm:text-sm">
              {String(STAGES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Interactive stage progress dots with compact sizing on mobile */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  soundEngine.playInteraction();
                  onSelectStage(idx);
                }}
                aria-label={`Jump to stage ${s.number}`}
                className="py-1.5 px-0.5 group transition-all duration-300 shrink-0"
              >
                <div
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    currentStage === idx
                      ? 'w-4 sm:w-8 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                      : 'w-1 sm:w-2 bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Center: Particle physics hint on desktop */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" />
          <span>
            {lang === 'kk'
              ? '3D кванттық нейрондық өрісті қозғау үшін меңзерді жылжытыңыз'
              : lang === 'ru'
              ? 'Перемещайте курсор для взаимодействия с 3D квантовым полем'
              : 'Move cursor to perturb 3D quantum neural field'}
          </span>
        </div>

        {/* Right: Controls (Previous, Next, Auto-Play) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Auto play toggle */}
          <button
            onClick={onToggleAutoPlay}
            className={`min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-xl border text-white/70 transition-colors ${
              isAutoPlay
                ? 'border-cyan-500/50 text-cyan-300 bg-cyan-950/30'
                : 'border-white/10 hover:border-white/25 hover:text-white'
            }`}
            title={isAutoPlay ? 'Pause Auto-Cycle' : 'Enable Auto-Cycle'}
            aria-label="Toggle auto play"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Prev button */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onPrev();
            }}
            disabled={currentStage === 0}
            className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-xl border border-white/10 hover:border-white/25 text-white/70 hover:text-white disabled:opacity-20 disabled:pointer-events-none active:scale-95 transition-all"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next button */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onNext();
            }}
            disabled={currentStage === STAGES.length - 1}
            className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-xl border border-white/10 hover:border-white/25 text-white/70 hover:text-white disabled:opacity-20 disabled:pointer-events-none active:scale-95 transition-all"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
