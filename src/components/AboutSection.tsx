import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";
import founderImage from "/lovable-uploads/6cc168a1-4df4-4afe-8f8d-7821cd59b7df.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Matrix Minds — Founded by S. Hareedh
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <strong>Matrix Minds</strong> is an AI, machine-learning and cybersecurity studio founded by
            <strong> S. Hareedh</strong> (often searched as <em>"Matrix Minds Hareedh"</em>). We build
            production-grade AI systems, run authorised penetration tests, and turn raw data into business outcomes
            for clients in India and worldwide.
          </p>
        </div>

        <div id="founder" className="grid lg:grid-cols-2 gap-12 items-center scroll-mt-24">
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 text-center">
                <img 
                  src={founderImage} 
                  alt="Mr. S. Hareedh - Founder" 
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-primary/30 shadow-2xl"
                />
                <h3 className="text-2xl font-bold mb-2">Mr. S. Hareedh</h3>
                <p className="text-primary font-semibold mb-4">Founder & CEO</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>matrixmindsha@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>9629310410</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Expertise & Specializations</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">AI & Machine Learning</Badge>
                <Badge variant="secondary">Ethical Hacking</Badge>
                <Badge variant="secondary">Data Science</Badge>
                <Badge variant="secondary">Cybersecurity</Badge>
                <Badge variant="secondary">Deep Learning</Badge>
                <Badge variant="secondary">Penetration Testing</Badge>
                <Badge variant="secondary">Big Data Analytics</Badge>
                <Badge variant="secondary">Neural Networks</Badge>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-3">Our Mission</h4>
              <p className="text-muted-foreground mb-4">
                To revolutionize the technology landscape by delivering innovative AI solutions that are both powerful and ethically responsible. We bridge the gap between cutting-edge technology and practical business applications.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-3">Why Choose Matrix Minds?</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Expert-led development with proven industry experience</li>
                <li>• Ethical approach to AI and security implementation</li>
                <li>• Custom solutions tailored to your business needs</li>
                <li>• Continuous support and innovation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;