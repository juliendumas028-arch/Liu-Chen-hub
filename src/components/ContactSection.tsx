import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Globe, 
  Tv, 
  Send, 
  CheckCircle, 
  Sparkles, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  MessageSquare,
  Building
} from 'lucide-react';
import { Language, ThemeMode, InquiryFormData } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
  theme: ThemeMode;
  prefilledProjectTitle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  theme,
  prefilledProjectTitle,
}) => {
  const t = translations[currentLang];

  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    serviceType: 'commercial',
    date: '',
    budgetRange: 'tier2',
    location: 'Paris',
    message: prefilledProjectTitle ? `Demande concernant le projet : ${prefilledProjectTitle}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section 
      id="contact-section"
      className="relative py-24 bg-[#08090a] text-white overflow-hidden"
    >
      {/* Background Cinematic Glow matching Page 86 of PDF */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff3b1e]/15 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#ff6b4a]/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 film-grain-overlay opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Massive Headline matching Page 86 */}
        <div className="text-center space-y-2 relative">
          <div className="relative inline-block">
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#ff3b1e] uppercase tracking-tighter leading-none select-none">
              {t.contact.heading}
            </h2>
            <span className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 pointer-events-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              {t.contact.scriptTogether}
            </span>
          </div>
          <p className="text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto font-sans-body">
            {t.contact.subheading}
          </p>
        </div>

        {/* Contact Links Ribbon matching Page 86 bottom icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <a 
            href="mailto:cielisea@gmail.com"
            className="p-4 rounded-2xl bg-white/5 hover:bg-[#ff3b1e]/20 border border-white/10 hover:border-[#ff3b1e]/60 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ff3b1e]/20 text-[#ff3b1e] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 font-mono block">E-MAIL DIRECT</span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ff6b4a] transition-colors">
                {t.contact.email}
              </span>
            </div>
          </a>

          <a 
            href="tel:+33664213917"
            className="p-4 rounded-2xl bg-white/5 hover:bg-[#ff3b1e]/20 border border-white/10 hover:border-[#ff3b1e]/60 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ff3b1e]/20 text-[#ff3b1e] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 font-mono block">TÉLÉPHONE / WHATSAPP</span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ff6b4a] transition-colors">
                {t.contact.phone}
              </span>
            </div>
          </a>

          <a 
            href="https://www.cielisea.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-white/5 hover:bg-[#ff3b1e]/20 border border-white/10 hover:border-[#ff3b1e]/60 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ff3b1e]/20 text-[#ff3b1e] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 font-mono block">SITE WEB OFFICIEL</span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ff6b4a] transition-colors">
                {t.contact.website}
              </span>
            </div>
          </a>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff3b1e]/20 text-[#ff3b1e] flex items-center justify-center">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 font-mono block">BILIBILI / PORTFOLIO</span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {t.contact.bilibili}
              </span>
            </div>
          </div>

        </div>

        {/* Interactive Booking & Project Inquiry Form */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/15 bg-neutral-900/90 shadow-2xl p-6 sm:p-10 space-y-8">
          
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {t.contact.formTitle}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {currentLang === 'cn' 
                ? '请填写拍摄需求，我们将在24小时内为您提供定制化执行方案及报价。' 
                : 'Remplissez vos besoins de tournage pour recevoir une proposition de réalisation et devis sur-mesure sous 24h.'}
            </p>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">
                {currentLang === 'cn' ? '需求已成功提交！' : 'Demande Envoyée avec Succès !'}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                {t.contact.successMsg}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#ff3b1e] text-white hover:bg-[#e63216] transition-all"
              >
                {currentLang === 'cn' ? '发送新咨询' : 'Envoyer un nouveau message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 block">
                    {t.contact.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean Dupont / 姓名"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-neutral-500 focus:border-[#ff3b1e] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 block">
                    {t.contact.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@brand.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-neutral-500 focus:border-[#ff3b1e] focus:outline-none"
                  />
                </div>

                {/* Company / Brand */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 block">
                    {t.contact.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Maison de Mode / Production Agency"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-neutral-500 focus:border-[#ff3b1e] focus:outline-none"
                  />
                </div>

                {/* Service Requested */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 block">
                    {t.contact.serviceLabel} *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-[#ff3b1e] focus:outline-none"
                  >
                    <option value="commercial">{t.contact.services.commercial}</option>
                    <option value="fashion">{t.contact.services.fashion}</option>
                    <option value="interview">{t.contact.services.interview}</option>
                    <option value="event">{t.contact.services.event}</option>
                    <option value="cinema">{t.contact.services.cinema}</option>
                    <option value="drone">{t.contact.services.drone}</option>
                    <option value="postprod">{t.contact.services.postprod}</option>
                    <option value="other">{t.contact.services.other}</option>
                  </select>
                </div>

                {/* Target Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 block">
                    {t.contact.dateLabel}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-[#ff3b1e] focus:outline-none"
                  />
                </div>

                {/* Budget Range */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 block">
                    {t.contact.budgetLabel}
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-[#ff3b1e] focus:outline-none"
                  >
                    <option value="tier1">{t.contact.budgets.tier1}</option>
                    <option value="tier2">{t.contact.budgets.tier2}</option>
                    <option value="tier3">{t.contact.budgets.tier3}</option>
                    <option value="tier4">{t.contact.budgets.tier4}</option>
                    <option value="undecided">{t.contact.budgets.undecided}</option>
                  </select>
                </div>

              </div>

              {/* Message Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300 block">
                  {t.contact.messageLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre projet (lieu de tournage, format attendu 16:9/9:16, diffusion TV/Web, date souhaitée de livraison)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-neutral-500 focus:border-[#ff3b1e] focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl text-sm font-extrabold bg-[#ff3b1e] hover:bg-[#e63216] text-white transition-all shadow-xl shadow-[#ff3b1e]/30 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{t.contact.submitBtn}</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
