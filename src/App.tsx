import React, { useState, useEffect } from 'react';
import { 
  Shield, CheckCircle2, ArrowRight, Activity, FileText, Users, DollarSign, 
  Clock, Stethoscope, ChevronRight, Star, Menu, X, Play, Sparkles, 
  Lock, Zap, RefreshCw, Award, HeartPulse, PhoneCall, Building2, HelpCircle
} from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultInput, setConsultInput] = useState('55-year-old male presents with persistent chest tightness and hypertension, BP 155/95.');
  const [consultMode, setConsultMode] = useState<'scribe' | 'billing'>('billing');
  const [consultResult, setConsultResult] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // ROI Calculator state
  const [patientsPerDay, setPatientsPerDay] = useState(25);
  const [consultFee, setConsultFee] = useState(650);

  // Demo modal state
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoFormSubmitted, setDemoFormSubmitted] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPractice, setDemoPractice] = useState('');

  const heroSlides = [
    {
      image: "/src/assets/images/doctor_hero_1_1793965144239.jpg",
      title: "Intelligent Practice Management & AI Clinical Scribe",
      subtitle: "Inspired by Healthbridge. Trusted by 4,500+ South African healthcare professionals for seamless switching, zero-rejection billing, and faster patient care.",
      tag: "South Africa's #1 Clinical & Billing Platform"
    },
    {
      image: "/src/assets/images/doctor_hero_2_1793965143472.jpg",
      title: "Eliminate Claim Rejections & Admin Burnout",
      subtitle: "Real-time ICD-10 validation across Discovery, Bonitas, Momentum, and GEMS with 99.4% first-pass claim success rate.",
      tag: "Real-Time Medical Aid Switching"
    },
    {
      image: "/src/assets/images/doctor_hero_3_1793965159710.jpg",
      title: "Empower Your Practice with Embedded AI",
      subtitle: "Transform consultation notes into structured SOAP records instantly and keep your focus where it belongs: on your patients.",
      tag: "Next-Gen Healthcare Technology"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAi(true);
    setConsultResult(null);
    try {
      const res = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: consultInput, mode: consultMode })
      });
      const data = await res.json();
      setConsultResult(data.result);
    } catch (err) {
      setConsultResult("Error generating AI insights. Please check connection.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoFormSubmitted(true);
  };

  // ROI calculations
  const monthlyRevenue = patientsPerDay * consultFee * 20; // 20 working days
  const recoveredLosses = Math.round(monthlyRevenue * 0.07); // ~7% recovered from rejections & missed billings

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 text-teal-300 animate-pulse" />
        <span>SynapseMed v3.2 Released: Enhanced POPIA Encryption & Discovery Health Direct Switch Integration</span>
        <a href="#demo" className="underline hover:text-teal-200 ml-2 font-semibold flex items-center gap-1">
          Request Practice Migration <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-700/20">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-teal-800 to-emerald-700 bg-clip-text text-transparent">
                Synapse<span className="text-teal-600">Digital</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-teal-600">Healthcare Solutions</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#pain" className="hover:text-teal-700 transition-colors">Why SynapseMed</a>
            <a href="#features" className="hover:text-teal-700 transition-colors">Features</a>
            <a href="#ai-demo" className="hover:text-teal-700 transition-colors flex items-center gap-1.5 text-teal-700 font-semibold">
              <Sparkles className="w-4 h-4 text-teal-600" /> AI Assistant
            </a>
            <a href="#calculator" className="hover:text-teal-700 transition-colors">ROI Calculator</a>
            <a href="#testimonials" className="hover:text-teal-700 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-teal-700 transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="text-teal-800 font-semibold text-sm hover:text-teal-900 transition-colors px-4 py-2.5"
            >
              Sign In
            </button>
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-teal-700/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Book Live Demo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
            <a href="#pain" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Why SynapseMed</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Features</a>
            <a href="#ai-demo" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-teal-700 font-semibold">AI Assistant Demo</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">ROI Calculator</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Testimonials</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Pricing</a>
            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); setDemoModalOpen(true); }}
                className="w-full bg-teal-700 text-white font-semibold py-3 rounded-xl shadow"
              >
                Book Live Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Slider & Black Woman Doctor Image */}
      <section className="relative bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white overflow-hidden py-20 lg:py-28">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide">
                <Shield className="w-3.5 h-3.5" />
                <span>{heroSlides[currentSlide].tag}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                {heroSlides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setDemoModalOpen(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-base"
                >
                  <span>Book Your Personalized Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a 
                  href="#ai-demo"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
                >
                  <Sparkles className="w-5 h-5 text-teal-300" />
                  <span>Test AI Clinical Scribe</span>
                </a>
              </div>

              {/* Trust badges row */}
              <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 text-slate-400 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>99.4% Claim First-Pass Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>POPIA & ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Medical Aid Switching</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card Slider */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-teal-500/30 bg-slate-800 group">
                <img 
                  src={heroSlides[currentSlide].image} 
                  alt="Doctor with tablet in modern clinic" 
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-lg">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Live Practice Status</div>
                      <div className="text-sm font-bold text-white">Dr. A. Davies • Internal Medicine Suite</div>
                    </div>
                    <div className="ml-auto bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-500/30">
                      Live
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Medical Aid Integration Trust Ticker */}
      <div className="bg-white border-b border-slate-200 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Seamlessly Integrated with South African Medical Schemes & Switching Houses
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all">
            <span className="text-xl font-black text-slate-700 tracking-tight flex items-center gap-1.5"><Shield className="w-5 h-5 text-teal-600"/> Discovery Health</span>
            <span className="text-xl font-black text-slate-700 tracking-tight flex items-center gap-1.5"><HeartPulse className="w-5 h-5 text-emerald-600"/> Bonitas</span>
            <span className="text-xl font-black text-slate-700 tracking-tight flex items-center gap-1.5"><Activity className="w-5 h-5 text-blue-600"/> Momentum Medical</span>
            <span className="text-xl font-black text-slate-700 tracking-tight flex items-center gap-1.5"><Award className="w-5 h-5 text-purple-600"/> GEMS</span>
            <span className="text-xl font-black text-slate-700 tracking-tight flex items-center gap-1.5"><Building2 className="w-5 h-5 text-teal-700"/> Medscheme</span>
          </div>
        </div>
      </div>

      {/* Pain Marketing Section: The Healthcare Reality Check */}
      <section id="pain" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-block text-rose-600 font-bold text-xs uppercase tracking-widest bg-rose-100 px-3 py-1 rounded-full">
              The Modern Practitioner's Dilemma
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Why Traditional Practice Management is Draining Your Energy & Revenue
            </h2>
            <p className="text-slate-600 text-lg">
              Running a medical practice shouldn't mean drowning in paper, delayed claim payouts, and administrative headaches after hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pain Point 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 left-0 w-2 h-full bg-rose-500" />
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xl mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Claim Rejections & Cash Flow Delays</h3>
              <p className="text-slate-600 leading-relaxed">
                Coding errors, mismatched ICD-10 modifiers, and rejected submissions from medical schemes mean thousands in uncollected revenue and months of frustrating follow-up calls.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                <X className="w-4 h-4" /> Average 14-day delay in claim payouts
              </div>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Endless After-Hours Admin Burnout</h3>
              <p className="text-slate-600 leading-relaxed">
                Spending 2+ hours every evening typing up patient notes, organizing lab results, and reviewing billing codes instead of resting or spending time with family.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-600 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> 12+ hours lost weekly on manual notes
              </div>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fragmented Patient Records & No-Shows</h3>
              <p className="text-slate-600 leading-relaxed">
                Juggling disconnected diary systems, lost physical folders, and high patient no-show rates due to lack of automated SMS reminders and patient portal engagement.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-indigo-600 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Up to 18% monthly loss from empty slots
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The SynapseMed Solution Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              <Zap className="w-3.5 h-3.5" /> The SynapseMed Advantage
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Designed for Doctors Who Value Precision & Peace of Mind
            </h2>
            <p className="text-slate-600 text-lg">
              Everything you need to run a modern, profitable, and stress-free medical practice on a single secure cloud platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">AI-Powered Clinical Scribe & SOAP Notes</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Dictate or type rough notes during consultations. SynapseMed AI instantly structures them into professional SOAP notes, prescriptions, and referral letters in seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Zero-Rejection Medical Aid Switching</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Real-time pre-validation of ICD-10 codes, tariff codes, and member scheme balances before submission. Achieve a 99.4% first-pass claim approval rate.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Bank-Grade POPIA Security & Compliance</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Patient health records are encrypted at rest and in transit with strict role-based access controls, meeting all Health Professions Council of South Africa (HPCSA) guidelines.
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Preview Box */}
            <div className="bg-gradient-to-br from-slate-900 to-teal-950 p-8 rounded-3xl text-white shadow-2xl border border-teal-500/30 relative">
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Live Preview
              </div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-sm tracking-wide">SynapseMed EHR & Billing Suite</span>
                </div>
                <span className="text-xs text-teal-300">Secure 256-bit SSL</span>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Active Patient Consultation</div>
                  <div className="font-bold text-lg text-white">Thandiwe Mthembu (ID: 840912...)</div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Discovery Comprehensive — Active & Verified
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>ICD-10 Code Validator</span>
                    <span className="text-emerald-400 font-semibold">Valid (99.8% Match)</span>
                  </div>
                  <div className="font-mono text-sm bg-slate-900 p-2.5 rounded-xl border border-white/10 text-teal-300">
                    J45.9 — Asthma, unspecified (Tariff 0190 + 1204)
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">Estimated Claim Payout</span>
                  <span className="text-lg font-black text-emerald-400">R 1,450.00 (Instant Switch)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive AI Assistant Demo Section */}
      <section id="ai-demo" className="py-24 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-teal-300" /> Interactive Feature Demo
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Test SynapseMed AI Clinical Assistant
            </h2>
            <p className="text-slate-300 text-lg">
              Experience how our embedded Gemini AI engine automatically validates ICD-10 billing codes or formats clinical SOAP notes instantly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-800/90 backdrop-blur-md rounded-3xl border border-teal-500/30 shadow-2xl p-6 sm:p-10">
            <div className="flex flex-wrap gap-4 mb-6 border-b border-slate-700 pb-4">
              <button 
                onClick={() => setConsultMode('billing')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${consultMode === 'billing' ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                ICD-10 & Billing Validator
              </button>
              <button 
                onClick={() => setConsultMode('scribe')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${consultMode === 'scribe' ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                AI Clinical SOAP Scribe
              </button>
            </div>

            <form onSubmit={handleAiConsult} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {consultMode === 'billing' ? 'Enter Clinical Case / Diagnosis Description:' : 'Enter Doctor Voice Notes / Observations:'}
                </label>
                <textarea 
                  rows={3}
                  value={consultInput}
                  onChange={(e) => setConsultInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:border-teal-500 text-sm"
                  placeholder="Describe patient symptoms or clinical findings..."
                />
              </div>

              <button 
                type="submit" 
                disabled={loadingAi}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loadingAi ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing with SynapseMed AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Run AI Analysis</span>
                  </>
                )}
              </button>
            </form>

            {consultResult && (
              <div className="mt-8 bg-slate-900 border border-teal-500/50 rounded-2xl p-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-teal-400 font-semibold mb-3 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> SynapseMed AI Output
                </div>
                <div className="text-slate-200 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {consultResult}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-block text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              Practice Financial Impact
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Calculate Your Practice Revenue Recovery
            </h2>
            <p className="text-slate-600 text-lg">
              See how much revenue and time SynapseMed unlocks by eliminating rejections and reducing admin hours.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Average Patients Seen Per Day: <span className="text-teal-600 font-black text-lg">{patientsPerDay}</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="80" 
                  value={patientsPerDay} 
                  onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Average Consultation Fee (ZAR): <span className="text-teal-600 font-black text-lg">R {consultFee}</span>
                </label>
                <input 
                  type="range" 
                  min="300" 
                  max="2000" 
                  step="50"
                  value={consultFee} 
                  onChange={(e) => setConsultFee(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="text-xs text-slate-500">
                * Based on internal South African private practice benchmarks across general practitioners and specialists.
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-900 to-emerald-900 rounded-2xl p-8 text-white space-y-6 shadow-lg">
              <div>
                <div className="text-xs text-teal-300 font-medium uppercase tracking-wider">Estimated Monthly Revenue</div>
                <div className="text-3xl sm:text-4xl font-black mt-1">R {monthlyRevenue.toLocaleString()}</div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <div className="text-xs text-emerald-300 font-medium uppercase tracking-wider">Estimated Monthly Revenue Recovered</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">R {recoveredLosses.toLocaleString()}</div>
                <p className="text-xs text-slate-300 mt-2">Recovered from zero claim rejections and optimized tariff billing.</p>
              </div>

              <button 
                onClick={() => setDemoModalOpen(true)}
                className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow"
              >
                Claim Your Practice ROI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Trusted by Practitioners
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Loved by South Africa’s Top Healthcare Professionals
            </h2>
            <p className="text-slate-600 text-lg">
              Read how SynapseMed transformed daily workflows for doctors across Johannesburg, Cape Town, and Durban.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 italic">
                  "Switching to SynapseMed was the best decision for my practice. Claim rejections dropped to virtually zero, and the AI scribe saves me hours every single evening."
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center">
                  DR
                </div>
                <div>
                  <div className="font-bold text-slate-900">Dr. D. Radebe</div>
                  <div className="text-xs text-slate-500">General Practitioner, Sandton</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 italic">
                  "The integration with Discovery Health and Bonitas is flawless. Payments clear faster and our front desk staff are no longer bogged down by tedious phone calls."
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center">
                  MN
                </div>
                <div>
                  <div className="font-bold text-slate-900">Dr. M. Naidoo</div>
                  <div className="text-xs text-slate-500">Paediatrician, Durban</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 italic">
                  "POPIA compliance and data security were our top priorities. SynapseMed gave us enterprise-grade security with an interface that is an absolute joy to use."
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center">
                  SK
                </div>
                <div>
                  <div className="font-bold text-slate-900">Dr. S. Khumalo</div>
                  <div className="text-xs text-slate-500">Specialist Surgeon, Cape Town</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Preorder Suite Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-widest animate-pulse">
              <Sparkles className="w-4 h-4 text-emerald-300" /> Early Access Preorder Event • Save up to 50%
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Preorder SynapseMed & Ecosystem Suite
            </h2>
            <p className="text-slate-300 text-lg">
              Secure founding member lifetime discounts for your practice before our nationwide Q2 rollout. Lock in grandfathered rates today.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* SynapseMed Practice OS */}
            <div className="bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl border border-teal-500/40 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-slate-950 font-black text-xs uppercase px-4 py-1 rounded-full shadow">
                Flagship Practice OS
              </div>
              <div className="space-y-6 pt-2">
                <div>
                  <div className="text-teal-400 font-bold text-sm">SynapseMed Professional</div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black">R 890</span>
                    <span className="text-sm text-slate-400 line-through">R 1,450/mo</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded font-bold">40% OFF</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">Billed annually for founding practitioners.</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> AI Clinical SOAP Scribe</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Real-time ICD-10 & Medical Aid Switch</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Patient Portal & SMS Reminders</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Priority 24/7 WhatsApp Support</li>
                </ul>
              </div>
              <button 
                onClick={() => setDemoModalOpen(true)}
                className="mt-8 w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Preorder SynapseMed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* CardioTrack App */}
            <div className="bg-gradient-to-b from-teal-900 to-slate-900 p-8 rounded-3xl border-2 border-emerald-500 flex flex-col justify-between relative shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 font-black text-xs uppercase px-4 py-1 rounded-full shadow">
                New • Preorder Special
              </div>
              <div className="space-y-6 pt-2">
                <div>
                  <div className="text-emerald-300 font-bold text-sm">CardioTrack AI ECG Suite</div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black">R 590</span>
                    <span className="text-sm text-slate-300 line-through">R 1,190/mo</span>
                    <span className="bg-emerald-400 text-slate-950 text-xs px-2 py-0.5 rounded font-black">50% OFF</span>
                  </div>
                  <p className="text-slate-300 text-xs mt-1">Advanced 12-lead ECG analysis & arrhythmia detection.</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> AI Arrhythmia & QT Alert Engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Holter Monitor Cloud Sync</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Patient Wearable Integration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Instant Cardiology PDF Reports</li>
                </ul>
              </div>
              <button 
                onClick={() => setDemoModalOpen(true)}
                className="mt-8 w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Preorder CardioTrack</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* MediGig App */}
            <div className="bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl border border-teal-500/40 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-slate-950 font-black text-xs uppercase px-4 py-1 rounded-full shadow">
                Locum & Shift Marketplace
              </div>
              <div className="space-y-6 pt-2">
                <div>
                  <div className="text-teal-400 font-bold text-sm">MediGig Locum Network</div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black">R 450</span>
                    <span className="text-sm text-slate-400 line-through">R 950/mo</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded font-bold">52% OFF</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">Connect with verified locum doctors and nursing staff.</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Instant Shift Matching & Booking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> HPCSA Credential Verification</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Automated Payroll & SARS Invoicing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Zero Commission on First 10 Shifts</li>
                </ul>
              </div>
              <button 
                onClick={() => setDemoModalOpen(true)}
                className="mt-8 w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Preorder MediGig</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">Synapse Digital</span>
            </div>
            <p className="text-sm text-slate-400">
              South Africa’s premier intelligent medical practice platform and AI clinical assistant suite.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">EHR & Clinical Notes</a></li>
              <li><a href="#ai-demo" className="hover:text-white transition-colors">AI Clinical Scribe</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Medical Aid Switching</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Compliance</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-300">POPIA Compliant</span></li>
              <li><span className="text-slate-300">ISO 27001 Certified</span></li>
              <li><span className="text-slate-300">HPCSA Guidelines</span></li>
              <li><span className="text-slate-300">Bank-Grade 256-bit SSL</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>Support: support@synapsemed.co.za</li>
              <li>Johannesburg: +27 (0)11 555 0192</li>
              <li>Cape Town: +27 (0)21 555 0193</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-xs text-center text-slate-500">
          © {new Date().getFullYear()} Synapse Digital (Pty) Ltd. All rights reserved. Inspired by healthbridge.co.za visual trust standards.
        </div>
      </footer>

      {/* Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-slate-200 animate-fadeIn text-slate-800">
            <button 
              onClick={() => { setDemoModalOpen(false); setDemoFormSubmitted(false); }}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!demoFormSubmitted ? (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Book Your Live SynapseMed Demo</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Experience a personalized walk-through with our South African healthcare practice specialists.
                </p>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name / Practice Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Dr. Sarah Johnson"
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="sarah@medpractice.co.za"
                      value={demoEmail}
                      onChange={(e) => setDemoEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Practice Discipline</label>
                    <input 
                      type="text" 
                      required
                      placeholder="General Practitioner / Specialist"
                      value={demoPractice}
                      onChange={(e) => setDemoPractice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    Confirm Demo Booking
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Demo Booked Successfully!</h3>
                <p className="text-slate-600 text-sm">
                  Thank you, <span className="font-semibold text-slate-900">{demoName}</span>. Our practice specialist will contact you shortly at <span className="font-semibold text-slate-900">{demoEmail}</span> to confirm your walkthrough time.
                </p>
                <button 
                  onClick={() => { setDemoModalOpen(false); setDemoFormSubmitted(false); }}
                  className="mt-4 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-sm"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
