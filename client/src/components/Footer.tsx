import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="relative z-10 bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display text-3xl font-bold tracking-tight text-white mb-6 block cursor-pointer">
              WASHINGTON<span className="text-primary font-light ml-2">ADVERT</span>
            </Link>
            <p className="text-white/60 max-w-md font-light leading-relaxed">
              We create premium digital experiences that define brands. Based in Washington, operating globally.
            </p>
          </div>
          
          <div>
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-6">Socials</h4>
            <ul className="space-y-4">
              {['Instagram', 'Twitter', 'LinkedIn', 'Behance'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <address className="not-italic text-white/60 space-y-2">
              <p>123 Innovation Drive</p>
              <p>Washington, DC 20001</p>
              <p className="mt-4 text-white hover:text-primary transition-colors">
                <a href="mailto:hello@washingtonadvert.com">hello@washingtonadvert.com</a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Washington Advert. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
