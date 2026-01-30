import { Sparkles, Twitter, Linkedin, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";

const footerLinks = {
  Product: ["Features", "Pricing", "Roadmap", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "Community", "API"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative py-20 border-t border-border/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
        >
          {/* Brand */}
          <motion.div 
            variants={staggerItem}
            className="col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">CareerSim</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-xs">
              AI-powered career intelligence to help you land your dream role faster.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 
                    flex items-center justify-center text-muted-foreground 
                    hover:text-foreground hover:border-primary/30 hover:bg-secondary
                    transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div 
              key={category}
              variants={staggerItem}
            >
              <h4 className="font-semibold text-sm mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-foreground 
                        transition-colors duration-200 inline-flex items-center group"
                    >
                      {link}
                      <span className="w-0 group-hover:w-4 h-px bg-primary ml-0 group-hover:ml-2 
                        transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div 
          className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportSettings}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            © 2026 CareerSim. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <span className="text-primary">❤</span>
            <span>for ambitious professionals</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
