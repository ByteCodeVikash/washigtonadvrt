import { Link } from 'wouter';
import { Instagram, Twitter, Linkedin, Globe, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#0E2236] text-[#B6C7D6] pt-24 pb-12 border-t border-[#132F4C]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* BRAND */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight text-[#EAF2FF] mb-6 block cursor-pointer">
              WASHINGTON
              <span className="text-[#4FA3FF] font-light ml-2">ADVERT</span>
            </Link>
            <p className="text-[#B6C7D6] text-sm font-light leading-relaxed max-w-xs mb-8">
              Premium digital experiences that define brands. We engineer narratives for scale.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#132F4C] flex items-center justify-center text-[#4FA3FF] hover:bg-[#4FA3FF] hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* SITEMAP */}
          <div>
            <h4 className="text-[#EAF2FF] font-bold uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-light">
              {['About Agency', 'Our Services', 'Selected Work', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#4FA3FF] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#4FA3FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-[#EAF2FF] font-bold uppercase tracking-[0.2em] text-xs mb-8">Services</h4>
            <ul className="space-y-4 text-sm font-light">
              {['Digital Marketing', 'Web Development', 'SEO Optimization', 'Brand Strategy', 'Content Creation'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#4FA3FF] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-[#EAF2FF] font-bold uppercase tracking-[0.2em] text-xs mb-8">Contact</h4>
            <address className="not-italic space-y-6 text-sm font-light">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#4FA3FF] mt-1 shrink-0" />
                <div>
                  <p className="text-[#EAF2FF] font-medium mb-1">Headquarters</p>
                  <p>123 Innovation Drive, Suite 400<br />Washington, DC 20001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#4FA3FF] mt-1 shrink-0" />
                <div>
                  <p className="text-[#EAF2FF] font-medium mb-1">Inquiries</p>
                  <a href="mailto:hello@washingtonadvert.com" className="hover:text-[#4FA3FF] transition-colors">
                    hello@washingtonadvert.com
                  </a>
                </div>
              </div>
            </address>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#132F4C] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#B6C7D6]/60 uppercase tracking-widest font-medium">
          <p>© {new Date().getFullYear()} Washington Advert. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-[#EAF2FF] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#EAF2FF] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#EAF2FF] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
