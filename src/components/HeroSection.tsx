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
          <div className="animate-matrix-text">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              MATRIX MINDS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Advanced AI & Machine Learning Solutions
            </p>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Transforming businesses with cutting-edge artificial intelligence, ethical hacking, and data science expertise. Building the future, one algorithm at a time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToContact}
              className="animate-glow"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="matrix" 
              size="lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 animate-float">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI & ML</h3>
              <p className="text-muted-foreground">Advanced machine learning algorithms and AI solutions</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 animate-float" style={{animationDelay: '0.2s'}}>
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ethical Hacking</h3>
              <p className="text-muted-foreground">Cybersecurity expertise and penetration testing</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 animate-float" style={{animationDelay: '0.4s'}}>
              <Database className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Data Science</h3>
              <p className="text-muted-foreground">Extract insights from complex data patterns</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;