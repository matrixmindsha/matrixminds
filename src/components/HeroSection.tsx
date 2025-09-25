import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Database } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Free Consultation Offer Banner */}
          <div className="mb-8 animate-pulse-glow">
            <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-center">
                <p className="font-orbitron text-lg md:text-xl font-bold text-primary mb-2 animate-data-stream">
                  🚀 FREE AI CONSULTATION NOW! 🚀
                </p>
                <p className="font-rajdhani text-sm md:text-base text-accent font-semibold">
                  Limited Time Offer • Worldwide Remote Services • Book Today!
                </p>
              </div>
            </div>
          </div>

          <div className="animate-matrix-text">
            <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
              MATRIX MINDS
            </h1>
            <p className="font-rajdhani text-xl md:text-2xl text-muted-foreground mb-4 font-semibold">
              Building the Future with AI • Worldwide Services
            </p>
            <p className="font-exo text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              🌍 Serving clients globally with cutting-edge artificial intelligence, ethical hacking, and data science expertise. Remote consulting worldwide. FREE consultation available now!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToContact}
              className="animate-glow font-orbitron font-bold relative overflow-hidden group"
            >
              <span className="relative z-10">🆓 CLAIM FREE CONSULTATION</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowRight className="ml-2 relative z-10" />
            </Button>
            <Button 
              variant="matrix" 
              size="lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-rajdhani font-semibold"
            >
              Explore Services Worldwide
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-xl bg-gradient-to-br from-card/60 via-card/40 to-transparent backdrop-blur-md border border-primary/30 hover:border-primary/60 transition-all duration-500 animate-float hover:animate-pulse-glow group">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-circuit-glow group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-orbitron text-xl font-bold mb-2 text-primary">AI & ML</h3>
              <p className="font-exo text-muted-foreground">🌍 Global AI solutions & consulting</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-card/60 via-card/40 to-transparent backdrop-blur-md border border-accent/30 hover:border-accent/60 transition-all duration-500 animate-float hover:animate-pulse-glow group" style={{animationDelay: '0.2s'}}>
              <Shield className="w-12 h-12 text-accent mx-auto mb-4 animate-circuit-glow group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-orbitron text-xl font-bold mb-2 text-accent">Ethical Hacking</h3>
              <p className="font-exo text-muted-foreground">🔒 Worldwide cybersecurity services</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-card/60 via-card/40 to-transparent backdrop-blur-md border border-primary/30 hover:border-primary/60 transition-all duration-500 animate-float hover:animate-pulse-glow group" style={{animationDelay: '0.4s'}}>
              <Database className="w-12 h-12 text-primary mx-auto mb-4 animate-circuit-glow group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-orbitron text-xl font-bold mb-2 text-primary">Data Science</h3>
              <p className="font-exo text-muted-foreground">📊 Remote data analytics globally</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;