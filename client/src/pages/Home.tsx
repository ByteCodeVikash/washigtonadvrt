import { useRef, useState, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Rocket, BarChart3, PenTool, Shield, TrendingUp, Users, DollarSign, Quote } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';

// --- Scroll Logic Helpers (Unchanged) ---
function ScrollParallax({ children, speed = 0.5, className = "" }: { children: React.ReactNode, speed?: number, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", `${10 * speed}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-full w-full">{children}</motion.div>
    </div>
  );
}

function ScrollReveal3D({ children, className = "", delayOffset = 0 }: { children: React.ReactNode, className?: string, delayOffset?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 60%"] });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div ref={ref} style={{ opacity, rotateX, scale, y }} className="will-change-transform origin-bottom">
        {children}
      </motion.div>
    </div>
  );
}

function ImageZoomScroll({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ scale }} className="w-full h-full object-cover will-change-transform" />
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}

// --- Main Page Component ---

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { scrollY } = useScroll();

  const heroTextY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Dynamic Styles based on Theme
  // Dark: #0E1621 (Main BG), White (Text)
  // Light: #F8FAFC (Main BG), Slate-900 (Text)

  const bgMain = theme === 'dark' ? 'bg-[#0E1621]' : 'bg-[#F8FAFC]';
  const textMain = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textMuted = theme === 'dark' ? 'text-[#B6C7D6]' : 'text-slate-600';
  const gradientOverlay = theme === 'dark'
    ? 'from-[#0E1621] via-transparent to-transparent'
    : 'from-[#F8FAFC] via-transparent to-transparent';

  const cardBg = theme === 'dark'
    ? 'bg-[#111A29]/80 border-white/10'
    : 'bg-white/80 border-slate-200 shadow-xl';

  const sectionBg = theme === 'dark'
    ? 'bg-[#0E1621]/50'
    : 'bg-slate-50';

  return (
    <div className={`min-h-screen ${bgMain} ${textMain} selection:bg-[#4FA3FF] selection:text-white overflow-x-hidden font-body transition-colors duration-500`}>
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* GLOBAL 3D BACKGROUND (FIXED) */}
      <div className={`fixed inset-0 z-0 pointer-events-none ${theme === 'dark' ? 'opacity-40' : 'opacity-80'}`}>
        <ThreeBackground theme={theme} />
      </div>

      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay} pointer-events-none`} />

          <div className="container mx-auto px-6 relative z-20 text-center pt-20">
            <motion.div style={{ y: heroTextY, opacity: heroOpacity }}>
              <ScrollReveal3D>
                <div className={`inline-block px-4 py-1.5 border rounded-full backdrop-blur-sm mb-8 transition-colors cursor-default ${theme === 'dark' ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-slate-300 bg-white/60 hover:bg-white'}`}>
                  <h2 className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/80' : 'text-slate-600'}`}>
                    WASHINGTON ADVERT • GLOBAL AGENCY
                  </h2>
                </div>
              </ScrollReveal3D>

              <ScrollReveal3D delayOffset={1}>
                {/* HEADLINE: Dark mode uses mix-blend-overlay for that transparent text effect. Light mode needs standard dark text. */}
                <h1 className={`font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[1] mb-8 ${theme === 'dark' ? 'text-white mix-blend-overlay opacity-90' : 'text-slate-900 opacity-100'}`}>
                  Authority in <br />
                  Digital.
                </h1>
                <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[1] mb-8 text-[#4FA3FF]">
                  Growth.
                </h1>
              </ScrollReveal3D>

              <ScrollReveal3D delayOffset={2}>
                <p className={`text-base md:text-lg ${textMuted} max-w-2xl mx-auto font-light leading-relaxed mb-12`}>
                  Washington Advert drives enterprise-level performance through data-driven strategy and cinematic creative execution.
                </p>
              </ScrollReveal3D>

              <ScrollReveal3D delayOffset={3}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="#contact" className="px-10 py-5 bg-[#2563EB] text-white text-sm uppercase tracking-[0.1em] font-bold rounded hover:bg-[#1D4ED8] transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                    Start Your Project
                  </a>
                  <button className={`px-10 py-5 border text-sm uppercase tracking-[0.1em] font-bold rounded transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                    View Showreel
                  </button>
                </div>
              </ScrollReveal3D>
            </motion.div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="relative z-20 -mt-24 pb-20 px-6 pointer-events-none">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "AVERAGE ROI", value: "500%", icon: TrendingUp },
                { label: "CLIENTS SERVED", value: "200+", icon: Users },
                { label: "AD SPEND MANAGED", value: "$50M+", icon: DollarSign },
              ].map((metric, idx) => (
                <TiltCard key={idx} className={`${cardBg} backdrop-blur-xl p-8 border rounded-sm pointer-events-auto h-full hover:border-[#2563EB]/50 transition-colors`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{metric.label}</span>
                    <metric.icon className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <p className={`text-4xl md:text-5xl font-display font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{metric.value}</p>
                  <div className={`w-full h-0.5 mt-6 relative overflow-hidden rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-200'}`}>
                    <div className="absolute top-0 left-0 h-full bg-[#2563EB] w-1/3 animate-pulse"></div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section id="about" className="py-24 px-6 relative z-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <ScrollParallax speed={0.2}>
                  <div className="aspect-[4/3] overflow-hidden rounded-sm relative shadow-2xl shadow-[#2563EB]/10">
                    <ImageZoomScroll
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                      alt="Modern Office"
                      className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                </ScrollParallax>
              </div>

              <div className="order-1 lg:order-2">
                <ScrollReveal3D>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[2px] w-12 bg-[#2563EB]"></div>
                    <span className="text-[#2563EB] text-xs font-bold uppercase tracking-[0.2em]">Our Philosophy</span>
                  </div>
                </ScrollReveal3D>

                <ScrollReveal3D delayOffset={1}>
                  <h2 className={`font-display text-5xl md:text-6xl mb-8 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Built on Trust.<br />
                    <span className="text-[#4b5563] text-4xl md:text-5xl">Defined by Results.</span>
                  </h2>
                </ScrollReveal3D>

                <ScrollReveal3D delayOffset={2}>
                  <blockquote className={`border-l-4 border-[#2563EB] pl-6 italic text-xl mb-8 font-light leading-relaxed ${theme === 'dark' ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
                    "Strategy is the art of sacrifice. We focus on long-term brand building rather than short-term hacks."
                  </blockquote>
                </ScrollReveal3D>

                <ScrollReveal3D delayOffset={3}>
                  <p className={`${theme === 'dark' ? 'text-[#64748B]' : 'text-slate-500'} leading-relaxed font-light mb-8 text-lg`}>
                    In a world of noise, clarity is power. We partner with ambitious brands to cut through the clutter using precision data and compelling narratives.
                  </p>
                  <a href="#" className={`inline-flex items-center gap-2 text-[#2563EB] text-sm font-bold uppercase tracking-[0.1em] hover:text-[#1D4ED8] transition-colors group`}>
                    Read Our Full Story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </ScrollReveal3D>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES SECTION */}
        <section id="services" className={`py-24 px-6 relative z-10 backdrop-blur-sm ${sectionBg}`}>
          <div className="container mx-auto content-center">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <ScrollReveal3D>
                <h2 className={`font-display text-4xl md:text-6xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Core Capabilities</h2>
                <p className={`${theme === 'dark' ? 'text-[#94A3B8]' : 'text-slate-500'} font-light text-xl`}>
                  Comprehensive digital solutions designed to scale enterprise growth.
                </p>
              </ScrollReveal3D>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Performance Marketing", icon: Rocket, desc: "Data-driven strategies that optimize machine learning to maximize ROAS." },
                { title: "Brand Strategy", icon: Shield, desc: "Long-term positioning that defines your market authority and builds customer loyalty." },
                { title: "Creative Design", icon: PenTool, desc: "Cinema-grade content and UI/UX design that captivates audiences and drives conversions." },
                { title: "Data Analytics", icon: BarChart3, desc: "Real-time optimization and deep-dive insights to understand the 'why' behind the data." },
              ].map((service, idx) => (
                <ScrollReveal3D key={idx} delayOffset={idx} className="h-full">
                  <TiltCard className={`group h-full p-8 rounded-sm hover:bg-[#2563EB] transition-all duration-500 cursor-default border hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#2563EB]/20 ${theme === 'dark' ? 'bg-[#1A2639] border-white/5 hover:border-white/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 text-[#2563EB] group-hover:bg-white/20 group-hover:text-white transition-colors backdrop-blur-sm ${theme === 'dark' ? 'bg-[#2563EB]/10' : 'bg-[#EFF6FF]'}`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className={`text-2xl font-display font-bold mb-4 group-hover:text-white ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                    <p className={`text-sm leading-relaxed group-hover:text-white/80 ${theme === 'dark' ? 'text-[#94A3B8]' : 'text-slate-500'}`}>{service.desc}</p>
                  </TiltCard>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* BLUEPRINT SECTION - STYLIZED */}
        <section className="py-32 px-6 relative z-10 overflow-hidden">
          {/* Decorative BG element */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/10 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto">
            <ScrollReveal3D>
              <h2 className={`font-display text-4xl md:text-5xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>The Blueprint</h2>
              <p className={`${theme === 'dark' ? 'text-[#94A3B8]' : 'text-slate-500'} font-light mb-20 text-lg`}>A systematic approach to predictable success.</p>
            </ScrollReveal3D>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className={`hidden md:block absolute top-[28px] left-0 w-full h-[1px] bg-gradient-to-r via-white/20 z-0 ${theme === 'dark' ? 'from-transparent to-transparent' : 'from-transparent to-transparent via-slate-300'}`}></div>

              {[
                { step: "01", title: "Research & Strategy", desc: "Deep dive market analysis and competitor auditing." },
                { step: "02", title: "Experience Design", desc: "Crafting the visual and interactive assets." },
                { step: "03", title: "Performance Marketing", desc: "Launching campaigns across targeted channels." },
                { step: "04", title: "Scale & Optimize", desc: "Continuous A/B testing and scaling." }
              ].map((item, idx) => (
                <ScrollReveal3D key={idx} delayOffset={idx} className="relative z-10">
                  <div className={`w-14 h-14 rounded-full border-2 border-[#2563EB] flex items-center justify-center font-display font-bold text-xl mb-8 mx-auto md:mx-0 shadow-[0_0_20px_rgba(37,99,235,0.3)] ${theme === 'dark' ? 'bg-[#0E1621] text-white' : 'bg-white text-slate-900'}`}>
                    {item.step}
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-[#64748B]' : 'text-slate-500'}`}>{item.desc}</p>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION - 3D CARDS */}
        <section className={`py-24 px-6 relative z-10 ${theme === 'dark' ? 'bg-[#0B121B]' : 'bg-slate-100'}`}>
          <div className="container mx-auto">
            <ScrollReveal3D>
              <h2 className={`font-display text-4xl md:text-5xl mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Client Perspectives</h2>
            </ScrollReveal3D>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                { quote: "Washington Advert completely redefined our digital presence. Their strategic approach drove a 200% increase in qualified leads within the first quarter.", author: "Sarah Jenkins", role: "CMO, TechFlow" },
                { quote: "The level of creativity and data sophistication is unmatched. They don't just execute campaigns; they engineer growth engines.", author: "Michael Chang", role: "Director of Growth, FinScale" }
              ].map((item, idx) => (
                <ScrollReveal3D key={idx} delayOffset={idx}>
                  <TiltCard className={`p-12 rounded-sm border relative h-full transition-all ${theme === 'dark' ? 'bg-[#1A2639]/50 backdrop-blur-md border-white/5 hover:border-[#2563EB]/30 hover:bg-[#1A2639]' : 'bg-white shadow-xl hover:shadow-2xl border-transparent'}`}>
                    <Quote className="w-12 h-12 text-[#2563EB] mb-8 opacity-50" />
                    <p className={`text-xl md:text-2xl font-light leading-relaxed mb-10 italic ${theme === 'dark' ? 'text-[#E2E8F0]' : 'text-slate-600'}`}>"{item.quote}"</p>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-purple-600"></div>
                      <div>
                        <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.author}</p>
                        <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#64748B]' : 'text-slate-400'}`}>{item.role}</p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION - Always Dark/Black for Impact */}
        <section id="contact" className="relative py-40 px-6 overflow-hidden bg-black text-white text-center z-10">
          <div className="absolute inset-0 bg-[#2563EB]/10 blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto relative z-10 max-w-4xl">
            <ScrollReveal3D>
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">Ready to Scale?</h2>
            </ScrollReveal3D>
            <ScrollReveal3D delayOffset={1}>
              <p className="text-[#94A3B8] text-xl font-light mb-12">
                Join forward-thinking companies that trust us to deliver exceptional growth.
              </p>
            </ScrollReveal3D>

            <ScrollReveal3D delayOffset={2}>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-12 py-6 bg-[#2563EB] text-white font-bold uppercase tracking-[0.1em] rounded shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-[#1D4ED8] hover:scale-105 transition-all duration-300">
                  Start Your Project
                </button>
              </div>
            </ScrollReveal3D>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
