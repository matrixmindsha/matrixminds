import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Award, Clock } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      number: "50+",
      label: "Projects Completed",
      description: "Successfully delivered AI and security solutions"
    },
    {
      icon: Users,
      number: "10+",
      label: "Happy Clients",
      description: "Satisfied customers across various industries"
    },
    {
      icon: Award,
      number: "95%",
      label: "Success Rate",
      description: "Project delivery and client satisfaction rate"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support",
      description: "Round-the-clock technical support and maintenance"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Track Record
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proven results that speak for themselves. Building trust through excellence and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="p-8">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-primary mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Featured Projects</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/20">
                <h4 className="text-xl font-semibold mb-3">AI-Powered Business Analytics</h4>
                <p className="text-muted-foreground mb-4">
                  Developed a comprehensive machine learning platform that increased client operational efficiency by 40%.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">TensorFlow</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">AWS</span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/20">
                <h4 className="text-xl font-semibold mb-3">Enterprise Security Audit</h4>
                <p className="text-muted-foreground mb-4">
                  Conducted comprehensive penetration testing that identified and resolved 25+ security vulnerabilities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">Penetration Testing</span>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">Kali Linux</span>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">OWASP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;