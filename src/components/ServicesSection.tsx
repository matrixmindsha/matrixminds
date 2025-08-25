import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Shield, 
  Database, 
  Code, 
  Search, 
  TrendingUp,
  Lock,
  Cpu,
  BarChart3
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Custom AI models, neural networks, and intelligent automation solutions for your business.",
      features: ["Custom ML Models", "Neural Networks", "Predictive Analytics", "Automation Systems"]
    },
    {
      icon: Shield,
      title: "Ethical Hacking",
      description: "Comprehensive cybersecurity audits and penetration testing to secure your digital assets.",
      features: ["Penetration Testing", "Vulnerability Assessment", "Security Audits", "Compliance Checks"]
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Extract valuable insights from your data with advanced analytics and visualization.",
      features: ["Data Analysis", "Statistical Modeling", "Data Visualization", "Business Intelligence"]
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Tailored software solutions built with the latest technologies and best practices.",
      features: ["Web Applications", "Mobile Apps", "API Development", "Cloud Solutions"]
    },
    {
      icon: Search,
      title: "Research & Development",
      description: "Cutting-edge research in AI, ML, and emerging technologies for your competitive advantage.",
      features: ["Technology Research", "Proof of Concepts", "Innovation Labs", "Patent Development"]
    },
    {
      icon: TrendingUp,
      title: "Digital Transformation",
      description: "Modernize your business processes with AI-driven solutions and smart automation.",
      features: ["Process Automation", "Digital Strategy", "Legacy Modernization", "Change Management"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth and digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="text-center">
                <service.icon className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-foreground/80 flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={scrollToContact}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="hero" 
            size="lg"
            onClick={scrollToContact}
          >
            Start Your Project Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;