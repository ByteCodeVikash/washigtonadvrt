import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Globe, Layers, Zap } from 'lucide-react';
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

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  
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
        form.reset();
      },
    });
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-primary selection:text-white">
      <Scene3D />
      <Navigation />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-primary mb-6">
                Digital Marketing Agency
              </h2>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
              className="font-display text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            >
              PREMIUM
              <br />
              <span className="italic font-light">DIGITAL</span>
              <br />
              EXPERIENCES
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
            >
              We craft cinematic web journeys for brands that dare to be different.
              Combining strategy, design, and motion into one seamless narrative.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12"
            >
              <a href="#about" className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors">
                Discover More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-6 relative">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="font-display text-4xl md:text-6xl mb-8 leading-tight"
                >
                  We don't just build websites.<br/>
                  <span className="text-primary italic">We build worlds.</span>
                </motion.h2>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg text-white/70 leading-relaxed font-light mb-8"
                >
                  In a crowded digital landscape, standing out requires more than just good design. It requires a story. A feeling. An experience that resonates deeply with your audience.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg text-white/70 leading-relaxed font-light"
                >
                  Washington Advert bridges the gap between art and technology. We use cutting-edge 3D web technologies to create immersive environments that captivate users and drive conversion.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-32 px-6 bg-black/20 backdrop-blur-sm relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Our Expertise</span>
              <h2 className="font-display text-4xl md:text-6xl">Designed for Impact</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Web Experience",
                  desc: "Immersive 3D websites, landing pages, and web applications that push the boundaries of the browser."
                },
                {
                  icon: Layers,
                  title: "Brand Strategy",
                  desc: "Comprehensive digital strategies that align your visual identity with your business goals."
                },
                {
                  icon: Zap,
                  title: "Performance",
                  desc: "Optimized for speed and conversion without sacrificing visual fidelity or interactivity."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-display tracking-wide">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed font-light">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK / CLIENTS (Simplified for this demo) */}
        <section id="work" className="py-32 px-6">
          <div className="container mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl mb-16"
            >
              Selected Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Using Unsplash images with descriptive alts */}
              {[
                {
                  // futuristic architecture building blue lighting
                  url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
                  title: "Apex Tower",
                  cat: "Real Estate"
                },
                {
                  // abstract digital art neon fluid
                  url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
                  title: "Flux Energy",
                  cat: "Tech Startup"
                }
              ].map((work, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative group overflow-hidden rounded-lg aspect-video cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <img
                    src={work.url}
                    alt={work.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{work.cat}</p>
                    <h3 className="text-3xl font-display font-bold">{work.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 px-6 relative">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl shadow-black/50">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl mb-4">Start Your Journey</h2>
                <p className="text-white/60">Ready to transform your digital presence? Let's talk.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              className="bg-white/5 border-white/10 focus:border-primary/50 h-12 rounded-xl text-white placeholder:text-white/20" 
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
                          <FormLabel className="text-white/80">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              className="bg-white/5 border-white/10 focus:border-primary/50 h-12 rounded-xl text-white placeholder:text-white/20" 
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
                        <FormLabel className="text-white/80">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project..." 
                            className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[150px] rounded-xl text-white placeholder:text-white/20 resize-none" 
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
                    className="w-full h-14 rounded-xl bg-white text-background hover:bg-primary hover:text-white text-lg font-bold tracking-wide transition-all duration-300 shadow-lg hover:shadow-primary/25"
                  >
                    {createInquiry.isPending ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
