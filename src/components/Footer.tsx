import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl font-extrabold text-primary mb-3">Snorri Bjarkason</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Research Engineer at Nox Medical. Passionate about AI, distributed systems, and network security.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-primary mb-4 uppercase tracking-widest text-xs">Get in Touch</h3>
            <a
              href="mailto:snorribjarka@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 text-sm group"
            >
              <Mail size={14} className="text-accent" />
              snorribjarka@gmail.com
            </a>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-3">
              <MapPin size={14} className="text-accent" />
              Reykjavík — Iceland
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-bold text-primary mb-4 uppercase tracking-widest text-xs">Follow</h3>
            <div className="flex gap-4">
              <motion.a
                href="https://www.instagram.com/snorri03/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
              >
                <Instagram size={16} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/snorribjarkason"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
              >
                <Linkedin size={16} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Snorri Bjarkason. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
}
