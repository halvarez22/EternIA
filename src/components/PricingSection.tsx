import React from 'react';
import { PRICING_PLANS } from '../data/mockStories';
import { Check, Sparkles, Shield, Clock, Film } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section
      id="precios"
      className="min-h-screen flex flex-col justify-center py-12 relative bg-transparent overflow-hidden border-t border-[var(--glass-border)]"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium glass text-[var(--text-primary)] opacity-80 mb-3 sm:mb-4 border border-[var(--glass-border)]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>INVERSIÓN EN RECUERDOS ETERNOS</span>
          </div>
          <h2 className="serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-normal text-[var(--text-primary)] gradient-text mb-3 sm:mb-4">
            Planes de Creación Cinematográfica
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Inversiones transparentes con producción orquestal a medida, entrega prioritaria en 4K y satisfacción asegurada.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`relative rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'glass border-2 border-[var(--text-primary)] bg-[var(--glass-hover-bg)] shadow-2xl lg:-translate-y-3'
                    : 'glass border border-[var(--glass-border)] hover:border-[var(--glass-border)] bg-transparent'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl">
                    ★ El Más Elegido
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">Colección</span>
                  </div>
                  <h3 className="serif italic text-2xl text-[var(--text-primary)] tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 min-h-[32px] font-light leading-relaxed">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-5 sm:mt-6 flex items-baseline gap-2">
                    <span className="serif italic text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] font-normal tracking-tight">
                      ${plan.price}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase">{plan.currency}</span>
                    {plan.originalPrice && (
                      <span className="text-xs font-mono text-[var(--text-muted)] line-through ml-2 opacity-50">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Delivery & Revision badges */}
                  <div className="mt-5 sm:mt-6 pt-5 border-t border-[var(--glass-border)] flex flex-col gap-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Clock className="w-3.5 h-3.5 shrink-0 opacity-60" />
                      <span className="text-[11px]">Plazo: <strong className="text-[var(--text-primary)] font-medium">{plan.deliveryTime}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Shield className="w-3.5 h-3.5 shrink-0 opacity-60" />
                      <span className="text-[11px]">Garantía: {plan.revisions}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="mt-5 sm:mt-6 space-y-3 text-xs text-[var(--text-secondary)] font-light">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full glass border border-[var(--glass-border)] text-[var(--text-primary)] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Button */}
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[var(--glass-border)]">
                  <button
                    id={`btn-select-plan-${plan.id}`}
                    onClick={() => onSelectPlan(plan)}
                    className={`touch-target w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                      plan.isPopular
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-105 shadow-xl'
                        : 'glass text-[var(--text-primary)] border border-[var(--glass-border)] hover:bg-[var(--glass-hover-bg)]'
                    }`}
                  >
                    Elegir {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revision Policy Banner */}
        <div className="mt-12 max-w-3xl mx-auto text-center glass rounded-2xl p-4 sm:p-5 border border-[var(--glass-border)]">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Garantía de Calidad EternIA</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
            Las Canciones a la medida incluyen <strong>1 ronda de ajuste</strong> y 2 versiones maestras finales. Nuestra obra maestra (Video Musicalizado) no admite ajustes adicionales, asegurando que recibas una película perfecta lista para estrenarse.
          </p>
        </div>
      </div>
    </section>
  );
};
