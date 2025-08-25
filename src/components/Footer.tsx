import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Matrix Minds" className="h-10 w-10" />
              <div>
                <h3 className="text-lg font-bold text-foreground">MATRIX MINDS</h3>
                <p className="text-xs text-muted-foreground">Advanced AI Solutions</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Transforming businesses with cutting-edge AI, ethical hacking, and data science expertise.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>matrixmindsha@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 9942658278</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>AI & Machine Learning</li>
              <li>Ethical Hacking</li>
              <li>Data Science</li>
              <li>Custom Development</li>
              <li>Research & Development</li>
              <li>Digital Transformation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get Started</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to transform your business with AI?
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Matrix Minds. All rights reserved. | Founded by Mr. S. Hareedh
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Specialist in AI, ML, Ethical Hacking & Data Science
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;