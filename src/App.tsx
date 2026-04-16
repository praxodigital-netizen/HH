import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone, MapPin, Clock, Mail, ChevronRight,
  Heart, Activity, Stethoscope, Bone, Shield, Zap,
  Users, Award, Building2, Menu, X,
  CheckCircle, Eye, Target, FileText, Download,
  Microscope, Radio, Scan, Cross, Pill, Truck,
  BedDouble, Coffee, BadgeCheck, ArrowUp
} from 'lucide-react';

// ─── Constants ──────────────────────────────────────────
const LOGO_URL = '/assets/logo.jpeg';

const IMAGES = {
  hero: '/assets/hospital-exterior.jpeg',
  heroBg: '/assets/hero-bg.jpeg',
  reception: '/assets/Front from outside.jpeg',
  otRoom1: '/assets/ot-room-1.jpeg',
  otRoom2: '/assets/ot-room-2.jpeg',
  otRoom3: '/assets/ot-room-3-new.jpeg',
  generalWard: '/assets/general-ward.jpeg',
  canteen: '/assets/canteen.jpeg',
  consultationRoom: '/assets/consultation-room.jpeg',
  historySection: '/assets/history-section.jpeg',
  uroOtDoor: '/assets/uro-ot-door.jpeg',
  generalOtDoor: '/assets/general-ot-door.jpeg',
  sterilization: '/assets/sterilization-room.jpeg',
  pharmacy: '/assets/pharmacy.jpeg',
  ambulance: '/assets/ambulance.jpg',
  mriRoom: '/assets/mri-room.jpeg',
  ctScanRoom: '/assets/ct-scan-room.jpeg',
  opgRoom: '/assets/opg-room.jpeg',
  receptionBilling: '/assets/reception-billing.jpeg',
};

const DOCTORS = [
  {
    name: 'Dr. Hemant Gupta',
    qualification: 'MBBS, M.S.',
    role: 'Senior Surgeon & Founder',
    description: 'Senior Surgeon with extensive experience in general and laparoscopic procedures. With over two decades of surgical expertise, he has successfully performed thousands of complex surgeries.',
    image: '/assets/Dr Hemant New.jpeg',
  },
  {
    name: 'Dr. Kokila Gupta',
    qualification: 'MBBS, MD',
    role: 'Radiologist',
    description: 'Specialist in advanced diagnostic imaging including MRI, CT Scan and Ultrasound. Her precision in diagnostics ensures accurate and timely patient assessments.',
    image: '/assets/Dr Kokila New.jpeg',
  },
  {
    name: 'Dr. Anurag Garg',
    qualification: 'MBBS, MS, MCh',
    role: 'Urologist',
    description: 'Specialist in advanced endo-urological and surgical procedures. Trained with modern techniques to deliver minimally invasive treatments with excellent outcomes.',
    image: '/assets/dr-anurag-garg.jpeg',
  },
  {
    name: 'Dr. Deepak Semwal',
    qualification: 'MBBS, DNB (Ortho Surgery)',
    role: 'Orthopaedic Surgeon',
    description: 'Experienced orthopaedic surgeon specializing in joint replacement, fracture management and bone-related treatments with a focus on patient rehabilitation.',
    image: '/assets/dr-deepak-semwal.jpeg',
  },
  {
    name: 'Dr. Rachit Ahuja',
    qualification: 'MBBS, MD',
    role: 'Oncologist',
    description: 'Specialist in cancer diagnosis, treatment planning and patient care. Dedicated to providing compassionate and evidence-based oncology services.',
    image: '/assets/dr-rachit-ahuja.jpg',
    imageClass: 'object-cover object-center',
  },
  {
    name: 'Dr. Sounak Chabri',
    qualification: 'MBBS, MD (Gen. Med), DM Neurology',
    role: 'Neurologist',
    description: 'Expert in neurological diagnosis and treatment. Specializes in managing complex neurological conditions with advanced therapeutic approaches.',
    image: '/assets/dr-sounak-chabri.png',
    imageClass: 'object-cover object-[center_20%]',
  },
];

const CONTACT = {
  phone: '9837693698',
  phoneFormatted: '+91 98376 93698',
  phoneLink: 'tel:+919837693698',
  email: 'hemanthospital234@gmail.com',
  name: 'Hemant Healthcare Private Limited',
  shortName: 'Hemant Healthcare',
  tagline: 'Where Care Comes First',
  location: '1473 Chow Mandi, Malviya Chowk, Roorkee, Uttarakhand 247667',
  mapUrl: 'https://maps.google.com/maps?q=Hemant+Hospital+Roorkee+Uttarakhand+247667&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapLink: 'https://maps.app.goo.gl/siB7d9bxpfUmVNn96',
};

// ─── Hooks ──────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  const easeOutQuart = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  }, []);

  useEffect(() => {
    if (!start || hasStarted.current) return;
    hasStarted.current = true;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.round(easedProgress * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration, easeOutQuart]);

  return count;
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, isVisible = false, className = '' }: {
  end: number; suffix?: string; prefix?: string; duration?: number; isVisible?: boolean; className?: string;
}) {
  const count = useCountUp(end, duration, isVisible);
  return <span className={className}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Section Header Component ──────────────────────────────────────────
function SectionHeader({ label, title, subtitle, light = false }: {
  label: string; title: string; subtitle?: string; light?: boolean;
}) {
  return (
    <div className="text-center mb-16">
      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${light ? 'bg-white/10 text-white/90' : 'bg-primary-50 text-primary-700 border border-primary-100'}`}>
        {label}
      </span>
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl mx-auto text-lg ${light ? 'text-white/70' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-20 h-1 mx-auto mt-6 rounded-full ${light ? 'bg-white/30' : 'bg-primary-500'}`} />
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-primary-900/5' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className={`hidden md:block transition-all duration-500 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-end gap-6 text-xs text-slate-500">
          <a href={CONTACT.phoneLink} className="flex items-center gap-1.5 hover:text-primary-700 transition-colors">
            <Phone className="w-3 h-3" /> {CONTACT.phoneFormatted}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-primary-700 transition-colors">
            <Mail className="w-3 h-3" /> {CONTACT.email}
          </a>
        </div>
        <div className="border-b border-slate-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt={`${CONTACT.name} Logo`} className="w-12 h-12 rounded-full object-cover border-2 border-primary-100 shadow-sm" />
            <div>
              <span className="font-display text-lg font-bold text-primary-900 leading-tight block">
                {CONTACT.shortName}
              </span>
              <p className="text-[10px] font-medium tracking-wider uppercase text-primary-600">
                Private Limited
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all duration-300">
                {link.label}
              </a>
            ))}
            <a href={CONTACT.phoneLink} className="ml-4 btn-primary text-sm !px-6 !py-2.5 gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 transition-colors">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-slate-100 animate-fade-in">
          <div className="px-4 py-6 space-y-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <a href={CONTACT.phoneLink} className="btn-primary w-full justify-center mt-4 gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────
function HeroSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-white">
      {/* Subtle hospital image background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Hospital building photo — visible background */}
        <img
          src={IMAGES.heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.35] scale-[1.02]"
        />
        {/* Soft white overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/55 to-white/90" />
        {/* Light blue medical tint */}
        <div className="absolute inset-0 bg-primary-50/15" />
        {/* Decorative accent orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary-100/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary-50/30 blur-3xl" />
      </div>

      {/* Main content — centered text layout */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-44 pb-20 md:pb-24 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Top badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold tracking-widest uppercase mb-8">
            <Cross className="w-3.5 h-3.5 text-red-500" />
            Established 2004 &bull; Trusted Healthcare in Roorkee
          </span>

          {/* Main heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
            Hemant Healthcare{' '}
            <span className="text-gradient">Private Limited</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Delivering compassionate, high-quality medical care with advanced surgical expertise and modern diagnostic facilities.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href={CONTACT.phoneLink} className="btn-primary text-base !px-8 !py-3.5 gap-2.5 shadow-lg shadow-primary-500/25">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href="#about" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
              Learn More <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          {/* Decorative divider */}
          <div className="w-16 h-px bg-slate-200 mx-auto mb-10" />

          {/* Trust highlights */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {[
              { icon: Activity, text: '40,000+ Surgeries' },
              { icon: Zap, text: 'Emergency Services Available' },
              { icon: Stethoscope, text: 'Expert Doctors' },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2.5 text-sm text-slate-500 font-medium">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 border border-primary-100">
                  <item.icon className="w-4 h-4 text-primary-600" />
                </span>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip — smooth visual connection */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { value: 20, suffix: '+', label: 'Years of Experience' },
                { value: 40000, suffix: '+', label: 'Surgeries Performed' },
                { value: 6, suffix: '+', label: 'Specialist Doctors' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={isVisible} duration={2000 + i * 300} />
                  </div>
                  <p className="text-primary-300 text-xs mt-1 font-medium tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────────
function AboutSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10">
              <img src={IMAGES.reception} alt="Hospital Reception" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-2xl p-6 shadow-xl hidden md:block">
              <div className="font-display text-4xl font-bold">20+</div>
              <div className="text-primary-100 text-sm">Years of Trust</div>
            </div>
          </div>

          <div>
            <SectionHeader label="About Us" title="A Legacy of Trusted Healthcare" />
            <div className="space-y-5 text-slate-600 leading-relaxed text-[15px]" style={{ textAlign: 'left' }}>
              <p>
                <strong className="text-slate-800">Hemant Healthcare Private Limited</strong> is a well-established and trusted healthcare institution serving the community of Roorkee and surrounding regions. Since its inception, the hospital has earned a distinguished reputation for delivering quality medical care rooted in a patient-first philosophy.
              </p>
              <p>
                With a proven track record of over <strong className="text-primary-700">40,000 major and minor surgeries</strong>, our institution stands as a testament to clinical excellence and surgical precision. Our dedicated team comprises highly trained surgeons, experienced paramedical staff, and compassionate nursing professionals — all committed to the highest standards of patient care.
              </p>
              <p>
                The hospital offers <strong className="text-primary-700">round-the-clock emergency services</strong> supported by advanced diagnostic capabilities. We maintain rigorous standards of cleanliness, patient comfort and safety across every department, including our state-of-the-art operation theatres.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Shield, text: 'Patient Safety First' },
                { icon: Award, text: 'Certified & Registered' },
                { icon: Users, text: 'Expert Medical Team' },
                { icon: Activity, text: 'Emergency Services Available' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary-50/50 border border-primary-100/50">
                  <item.icon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── History Section ──────────────────────────────────────────
function HistorySection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <SectionHeader label="Our History" title="Serving Since 2004" />
            <div className="space-y-5 text-slate-600 leading-relaxed text-[15px]" style={{ textAlign: 'left' }}>
              <p>
                <strong className="text-slate-800">Hemant Healthcare Private Limited</strong> was founded in the year <strong className="text-primary-700">2004</strong> with a clear vision — to bring quality healthcare closer to the people of Roorkee and its neighbouring communities.
              </p>
              <p>
                Since its establishment, the hospital has maintained an unwavering focus on delivering high-quality surgical and medical care at affordable costs. What began as a commitment to accessible healthcare has grown into one of the most trusted medical institutions in the region.
              </p>
              <p>
                Over the course of two decades, the hospital has successfully conducted <strong className="text-primary-700">thousands of complication-free surgeries</strong> across multiple specialities. We continue to evolve, invest in modern medical technologies and upgrade our infrastructure to meet and exceed contemporary healthcare standards.
              </p>
            </div>

            <div className="flex items-center gap-6 mt-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-slate-900">Est. 2004</h4>
                <p className="text-slate-500 text-sm">Over 20 years of compassionate healthcare and surgical excellence</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10">
              <img src={IMAGES.receptionBilling} alt="Hemant Healthcare Reception" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Vision & Mission Section ──────────────────────────────────────────
function VisionMissionSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Vision - Mission Statement" title="Vision & Mission" light />

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:bg-white/15 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Vision</h3>
            <p className="text-white/75 leading-relaxed text-[15px]">
              To be an exemplary representative of holistic, affordable, accessible and personalised health care
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:bg-white/15 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Mission</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                <p className="text-white/75 leading-relaxed text-[15px]">
                  To provide accessible and affordable health care by empathetic medical professionals.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                <p className="text-white/75 leading-relaxed text-[15px]">
                  To continuously strive for excellence in healthcare service and add value to the communities we serve.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ──────────────────────────────────────────
function ServicesSection() {
  const { ref, isVisible } = useInView();

  const surgicalServices = [
    { icon: Stethoscope, name: 'General & Laparoscopic Surgery', desc: 'Comprehensive surgical care including minimally invasive laparoscopic procedures for faster recovery.' },
    { icon: Bone, name: 'Orthopaedic Surgery', desc: 'Expert bone, joint and musculoskeletal treatments including joint replacement and fracture management.' },
    { icon: Activity, name: 'Endo-Urology', desc: 'Advanced urological procedures using state-of-the-art endoscopic techniques for precise treatment.' },
    { icon: Heart, name: 'General Medicine', desc: 'Complete internal medicine services covering diagnosis, treatment and management of complex medical conditions.' },
    { icon: Zap, name: 'Emergency Care', desc: 'Round-the-clock emergency services with rapid response teams and critical care expertise.' },
  ];

  const diagnostics = [
    { icon: Scan, name: 'MRI' },
    { icon: Radio, name: 'CT Scan' },
    { icon: Microscope, name: 'Ultrasound' },
    { icon: Scan, name: 'X-Ray' },
    { icon: Microscope, name: 'Mammography' },
    { icon: Scan, name: 'OPG' },
  ];

  return (
    <section id="services" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Services" title="Departments & Specialities" subtitle="Comprehensive medical care across multiple specialities, backed by experienced professionals and modern facilities." />

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Surgical Services */}
          <h3 className="font-display text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500" /> Surgical & Medical Departments
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {surgicalServices.map((service, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-primary-900/5 hover:border-primary-100 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-display text-lg font-bold text-slate-900 mb-2">{service.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Diagnostics */}
          <h3 className="font-display text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500" /> Diagnostic Facilities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {diagnostics.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-primary-50 to-sky-50 border border-primary-100/50 text-center hover:shadow-lg hover:shadow-primary-900/5 transition-all duration-300">
                <item.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <span className="font-semibold text-sm text-slate-800">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Diagnostic Equipment Showcase */}
          <h3 className="font-display text-xl font-bold text-slate-800 mb-6 mt-16 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500" /> Our Diagnostic Equipment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
  { img: IMAGES.mriRoom, label: 'MRI Machine', imageClass: 'object-center' },
  { img: IMAGES.ctScanRoom, label: 'CT Scan', imageClass: 'object-[center_25%]' },
  { img: IMAGES.opgRoom, label: 'OPG (Digital Panoramic X-Ray)', imageClass: 'object-[center_25%]' },
].map((item, i) => (
  <div key={i} className="relative rounded-2xl overflow-hidden group h-56">
    <img
      src={item.img}
      alt={item.label}
      className={`w-full h-full object-cover ${item.imageClass} group-hover:scale-105 transition-transform duration-500`}
    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* OT Images Showcase */}
          <h3 className="font-display text-xl font-bold text-slate-800 mb-6 mt-12 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500" /> Operation Theatres
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: IMAGES.otRoom2, label: 'Advanced Operation Theatre' },
              { img: IMAGES.otRoom1, label: 'Surgical Suite' },
              { img: IMAGES.otRoom3, label: 'Uro Operation Theatre' },
            ].map((item, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group h-56">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Doctors Section ──────────────────────────────────────────
function DoctorsSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="doctors" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Doctors" title="Meet Our Medical Experts" subtitle="A team of highly qualified and experienced medical professionals dedicated to your health and well-being." />

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {DOCTORS.map((doctor, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-300 group border border-slate-100">
              <div className="h-72 bg-gradient-to-br from-primary-100 to-sky-100 relative overflow-hidden">
                {doctor.image ? (
                  <img src={doctor.image} alt={doctor.name} className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${(doctor as any).imageClass ? (doctor as any).imageClass : 'object-cover object-top'}`} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-primary-200 flex items-center justify-center">
                      <span className="font-display text-4xl font-bold text-primary-700">
                        {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-3">{doctor.role}</span>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-3">{doctor.qualification}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{doctor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Facilities Section ──────────────────────────────────────────
function FacilitiesSection() {
  const { ref, isVisible } = useInView();

  const facilities = [
    { icon: BedDouble, name: 'HDU (High Dependency Unit)', desc: 'Specialized care for patients requiring close monitoring', image: IMAGES.otRoom1 },
    { icon: Building2, name: 'Indoor Patient Facility', desc: 'Comfortable and well-equipped in-patient rooms', image: IMAGES.generalWard },
    { icon: Truck, name: 'Ambulance Service', desc: 'Ambulance service with trained paramedics', image: IMAGES.ambulance },
    { icon: Scan, name: 'MRI & CT Scan', desc: 'Advanced imaging for precise diagnostics', image: IMAGES.mriRoom },
    { icon: Pill, name: 'Pharmacy', desc: 'In-house pharmacy for patient convenience', image: IMAGES.pharmacy },
    { icon: Coffee, name: 'Canteen', desc: 'On-premise canteen for patients and visitors', image: IMAGES.canteen },
  ];

  return (
    <section id="facilities" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Facilities" title="World-Class Infrastructure" subtitle="Modern facilities designed for your comfort, safety and well-being throughout your healthcare journey." />

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {facilities.map((facility, i) => (
            <div key={i} className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-primary-900/5 hover:border-primary-100 transition-all duration-300">
              {facility.image && (
                <div className="h-44 overflow-hidden">
                  <img src={facility.image} alt={facility.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
                    <facility.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900">{facility.name}</h4>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{facility.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us Section ──────────────────────────────────────────
function WhyChooseUsSection() {
  const { ref, isVisible } = useInView();

  const reasons = [
    { icon: Award, value: '20+', label: 'Years of Experience', desc: 'Two decades of trusted healthcare excellence' },
    { icon: Heart, value: '40,000+', label: 'Surgeries Performed', desc: 'Proven track record of surgical success' },
    { icon: Zap, value: 'Medical', label: 'Emergency Services', desc: 'Round-the-clock critical care availability' },
    { icon: Scan, value: 'Advanced', label: 'Diagnostic Facilities', desc: 'MRI, CT, X-Ray and more under one roof' },
    { icon: Users, value: '6+', label: 'Specialist Doctors', desc: 'Highly qualified medical professionals' },
    { icon: Shield, value: '100%', label: 'Hygiene & Patient Care', desc: 'Uncompromising focus on cleanliness' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-950 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)', }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Why Choose Us" title="Your Trusted Healthcare Partner" subtitle="Here's why thousands of patients place their trust in Hemant Healthcare." light />

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {reasons.map((reason, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                  <reason.icon className="w-6 h-6 text-primary-300" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-white mb-1">{reason.value}</div>
                  <h4 className="font-semibold text-white/90 mb-1 text-sm">{reason.label}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications Section ──────────────────────────────────────────
function CertificationsSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Trust & Compliance" title="Certifications & Registrations" subtitle="Our registrations and certifications reflect our commitment to quality and regulatory compliance." />

        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <BadgeCheck className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Registered Healthcare Institution</h3>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Hemant Healthcare Private Limited is a duly registered healthcare facility, operating in full compliance with all applicable regulatory norms and standards. Our registration certificate is available for verification.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/assets/registration-certificate.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-50 text-primary-700 font-semibold hover:bg-primary-100 transition-colors border border-primary-100">
                <FileText className="w-5 h-5" /> View Certificate
              </a>
              <a href="/assets/registration-certificate.pdf" download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25">
                <Download className="w-5 h-5" /> Download PDF
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-100">
              {[
                { icon: CheckCircle, text: 'Govt. Registered' },
                { icon: Shield, text: 'Quality Assured' },
                { icon: Award, text: 'Compliance Certified' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <item.icon className="w-6 h-6 text-green-500" />
                  <span className="text-xs font-medium text-slate-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────
function ContactSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contact" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Get In Touch" title="Contact Us" subtitle="We're here to help. Reach out to us for any queries or to schedule a visit." />

        <div className={`grid md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-br from-primary-50 to-sky-50 rounded-2xl p-8 text-center border border-primary-100/50 hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-primary-600" />
            </div>
            <h4 className="font-display text-lg font-bold text-slate-900 mb-2">Call Us</h4>
            <a href={CONTACT.phoneLink} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              {CONTACT.phoneFormatted}
            </a>
            <p className="text-slate-400 text-xs mt-2">Emergency Services Available</p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-sky-50 rounded-2xl p-8 text-center border border-primary-100/50 hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-primary-600" />
            </div>
            <h4 className="font-display text-lg font-bold text-slate-900 mb-2">Email Us</h4>
            <a href={`mailto:${CONTACT.email}`} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm">
              {CONTACT.email}
            </a>
            <p className="text-slate-400 text-xs mt-2">We'll respond promptly</p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-sky-50 rounded-2xl p-8 text-center border border-primary-100/50 hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-primary-600" />
            </div>
            <h4 className="font-display text-lg font-bold text-slate-900 mb-2">Visit Us</h4>
            <p className="text-primary-600 font-semibold text-sm leading-relaxed">{CONTACT.location}</p>
            <p className="text-slate-400 text-xs mt-2">Walk-in welcome</p>
          </div>
        </div>

        {/* Our Location — Google Map */}
        <div className={`mt-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold tracking-widest uppercase mb-4">
              <MapPin className="w-3.5 h-3.5" /> Our Location
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">Find Us on the Map</h3>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{CONTACT.location}</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10 border border-slate-100">
            <iframe
              src={CONTACT.mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hemant Healthcare Location Map"
              className="w-full h-[300px] md:h-[450px]"
            />
          </div>
          <div className="text-center mt-6">
            <a
              href={CONTACT.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
            >
              <MapPin className="w-4 h-4" /> Open in Google Maps
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </a>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href={CONTACT.phoneLink} className="btn-primary text-lg !px-10 !py-4 gap-3 shadow-2xl shadow-primary-500/25">
            <Phone className="w-5 h-5" /> Call Now — {CONTACT.phoneFormatted}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt={`${CONTACT.name} Logo`} className="w-12 h-12 rounded-full object-cover border-2 border-slate-700" />
              <div>
                <span className="font-display text-lg font-bold text-white block leading-tight">{CONTACT.shortName}</span>
                <span className="text-xs text-slate-400">Private Limited</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A trusted name in healthcare since 2004, delivering quality medical services with compassion.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Open 24×7</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Doctors', 'Facilities', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {['General Surgery', 'Laparoscopic Surgery', 'Orthopaedics', 'Endo-Urology', 'Emergency Care', 'Diagnostic Imaging'].map((service) => (
                <li key={service}>
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-6">Contact</h4>
            <div className="space-y-4">
              <a href={CONTACT.phoneLink} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 text-primary-400" /> {CONTACT.phoneFormatted}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 text-primary-400" /> {CONTACT.email}
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" /> <span>{CONTACT.location}</span>
              </div>
              <a href={CONTACT.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm mt-1">
                <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg> View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Website Designed by{' '}
            <a href="https://praxodigital.in/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">
              Praxo Digital Consulting
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Back to Top Button ──────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/25 flex items-center justify-center hover:bg-primary-700 transition-all duration-300 animate-fade-in">
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

// ─── App ──────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HistorySection />
      <VisionMissionSection />
      <ServicesSection />
      <DoctorsSection />
      <FacilitiesSection />
      <WhyChooseUsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
}
