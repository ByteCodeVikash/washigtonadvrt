import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Globe, Layers, Zap, Shield, TrendingUp, Landmark, Award } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Scene3D } from '@/components/Scene3D';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCreateInquiry } from '@/hooks/use-inquiries';
import { insertInquirySchema } from '@shared/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function SectionWrapper({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  const createInquiry = useCreateInquiry();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertInquirySchema>>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof insertInquirySchema>) => {
    createInquiry.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Inquiry Sent",
          description: "We will get back to you shortly.",
        });
        form.reset();
      },
    });
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-primary selection:text-white bg-background">
      <Scene3D />
      <Navigation />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="h-[110vh] flex items-center justify-center px-6 relative overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="text-sm md:text-base font-bold tracking-[0.4em] uppercase text-primary mb-8 drop-shadow-sm">
                Washington Advert • Digital Agency
              </h2>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[8rem] font-semibold tracking-tighter leading-[0.9] mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30"
            >
              DIGITAL MARKETING
              <br />
              <span className="italic font-light opacity-90">THAT DRIVES</span>
              <br />
              YOUR BUSINESS
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                Get Started Today, Supercharge Your Digital Presence. 
                We engineer market-leading narratives for brands that demand monumental scale.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8"
            >
              <a href="#contact" className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-primary/20">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </a>
              <div className="h-px w-12 bg-white/20 hidden md:block" />
              <span className="text-white/40 text-xs uppercase tracking-[0.3em]">Est. 2025 • Washington D.C.</span>
            </motion.div>
          </motion.div>
        </section>

        {/* INTRODUCTION BLOCK */}
        <SectionWrapper className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl text-center">
            <Landmark className="w-12 h-12 text-primary/40 mx-auto mb-8" />
            <h3 className="font-display text-3xl md:text-4xl mb-6 tracking-tight">A Brand-first Digital Agency</h3>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              We are a passionate team of strategists, creatives, and storytellers who weave compelling narratives across all digital channels. From cutting-edge website design to data-driven social media campaigns, we push boundaries to deliver results that not only resonate but ignite brand growth.
            </p>
          </div>
        </SectionWrapper>

        {/* ABOUT SECTION */}
        <SectionWrapper id="about" className="py-48 px-6 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=1200&q=80" 
                    alt="Washington DC Architectural Detail"
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </motion.div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
              </div>
              <div className="relative z-10">
                <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-6 block">Our Foundation</span>
                <h2 className="font-display text-5xl md:text-7xl mb-10 leading-[0.9] tracking-tighter">
                  Authority<br/>
                  <span className="text-primary italic font-light">By Design.</span>
                </h2>
                <div className="space-y-8 text-xl text-white/70 leading-relaxed font-light">
                  <p>
                    We don't just follow trends, we set them, ensuring your brand stays ahead of the curve in this ever-evolving digital world.
                  </p>
                  <p>
                    Our approach integrates high-level strategic planning with high-performance digital execution, creating a presence that doesn't just participate in the market—it leads it.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-16">
                  <div>
                    <h4 className="font-display text-3xl text-white mb-2">850+</h4>
                    <p className="text-xs uppercase tracking-widest text-white/40">Projects Done</p>
                  </div>
                  <div>
                    <h4 className="font-display text-3xl text-white mb-2">15+</h4>
                    <p className="text-xs uppercase tracking-widest text-white/40">Glorious Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* SERVICES SECTION */}
        <SectionWrapper id="services" className="py-48 px-6 bg-white/[0.01] backdrop-blur-sm relative border-y border-white/5">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <div className="max-w-2xl">
                <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Our Expertise</span>
                <h2 className="font-display text-5xl md:text-7xl tracking-tighter">Engineered for Scale</h2>
              </div>
              <p className="text-white/40 max-w-xs text-sm uppercase tracking-widest leading-loose">
                Comprehensive digital services tailored to your business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {[
                {
                  icon: Globe,
                  title: "Web Designing",
                  desc: "Craft stunning, user-friendly websites that captivate and convert.",
                  micro: "High-performance architecture."
                },
                {
                  icon: Zap,
                  title: "Pay Per Click",
                  desc: "Maximize your ROI with expertly managed pay-per-click campaigns.",
                  micro: "Data-driven growth."
                },
                {
                  icon: Shield,
                  title: "SEO Mastery",
                  desc: "Enhance your online presence with comprehensive SEO strategies.",
                  micro: "Get found on the 1st page."
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="group p-12 bg-background hover:bg-white/[0.03] transition-all duration-700"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 font-display tracking-tight text-white">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed font-light mb-8 text-lg">{service.desc}</p>
                  <p className="text-primary/60 text-xs uppercase tracking-widest font-bold">{service.micro}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* STRATEGY BLOCK */}
        <SectionWrapper className="py-48 px-6 border-b border-white/5">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
               <div className="order-2 md:order-1">
                 <h2 className="font-display text-4xl md:text-5xl mb-8 tracking-tight text-white">Why Choose Our Agency?</h2>
                 <ul className="space-y-12">
                   {[
                     { step: "01", title: "Proven Results", desc: "Measurable success driving brands to the top of search rankings." },
                     { step: "02", title: "Strategic Approach", desc: "Ensuring your brand stays ahead in the dynamic digital landscape." },
                     { step: "03", title: "Comprehensive Services", desc: "Tailored to meet the unique needs of your business." }
                   ].map((item, i) => (
                     <li key={i} className="flex gap-8">
                       <span className="font-display text-primary text-xl font-bold">{item.step}</span>
                       <div>
                         <h4 className="text-lg font-bold mb-2 uppercase tracking-widest text-white">{item.title}</h4>
                         <p className="text-white/50 font-light">{item.desc}</p>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="order-1 md:order-2 aspect-square rounded-full border border-primary/10 flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full" />
                 <Landmark className="w-32 h-32 text-primary/20 animate-pulse" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-white/10 rotate-45" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-white/10 -rotate-45" />
               </div>
            </div>
          </div>
        </SectionWrapper>

        {/* WORK SECTION */}
        <SectionWrapper id="work" className="py-48 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center mb-24">
              <span className="text-primary text-sm font-bold uppercase tracking-[0.4em] mb-4">Portfolio</span>
              <h2 className="font-display text-5xl md:text-7xl tracking-tighter mb-8 text-white">Our Masterpieces</h2>
              <p className="text-white/50 max-w-xl font-light text-lg">
                Experience measurable success with our proven track record.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                {
                  url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
                  title: "Elite Web Redesign",
                  cat: "Web Design",
                  desc: "Crafting a stunning digital portal."
                },
                {
                  url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80",
                  title: "Global Growth Strategy",
                  cat: "Digital Marketing",
                  desc: "Data-driven social media expansion."
                }
              ].map((work, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all duration-700 z-10" />
                    <img
                      src={work.url}
                      alt={work.title}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000"
                    />
                    <div className="absolute top-8 right-8 z-20">
                      <div className="bg-background/80 backdrop-blur-md border border-white/10 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">{work.cat}</p>
                    <h3 className="text-3xl font-display font-bold tracking-tight mb-3 text-white">{work.title}</h3>
                    <p className="text-white/40 font-light">{work.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* TRUST SECTION */}
        <SectionWrapper className="py-24 border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6">
             <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-30 grayscale hover:opacity-100 transition-opacity duration-700 text-primary">
                < LandMarkIcon className="w-12 h-12" />
                < Award className="w-12 h-12" />
                < Shield className="w-12 h-12" />
                < Globe className="w-12 h-12" />
                < Zap className="w-12 h-12" />
             </div>
          </div>
        </SectionWrapper>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-48 px-6 relative">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[150px] -mr-48 -mt-48" />
              <div className="relative z-10">
                <div className="text-center mb-16">
                  <span className="text-primary text-sm font-bold uppercase tracking-[0.4em] mb-4 block text-primary">Get in Touch</span>
                  <h2 className="font-display text-5xl md:text-7xl mb-6 tracking-tighter text-white">Schedule a Call</h2>
                  <p className="text-white/50 text-xl font-light max-w-2xl mx-auto">
                    Ready to supercharge your digital presence? Let's talk.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 uppercase tracking-widest text-xs font-bold">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="YOUR NAME" 
                                className="bg-white/[0.03] border-white/10 focus:border-primary/50 h-16 rounded-xl text-white placeholder:text-white/10 text-lg tracking-wide px-6" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 uppercase tracking-widest text-xs font-bold">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="EMAIL@EXAMPLE.COM" 
                                className="bg-white/[0.03] border-white/10 focus:border-primary/50 h-16 rounded-xl text-white placeholder:text-white/10 text-lg tracking-wide px-6" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 uppercase tracking-widest text-xs font-bold">Project Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="TELL US ABOUT YOUR PROJECT..." 
                              className="bg-white/[0.03] border-white/10 focus:border-primary/50 min-h-[200px] rounded-xl text-white placeholder:text-white/10 text-lg tracking-wide px-6 py-6 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={createInquiry.isPending}
                      className="w-full h-20 rounded-xl bg-primary text-primary-foreground hover:bg-white hover:text-black text-xl font-bold tracking-[0.2em] uppercase transition-all duration-700 shadow-2xl shadow-primary/20"
                    >
                      {createInquiry.isPending ? "PROCESSSING..." : "SCHEDULE NOW"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function LandMarkIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

