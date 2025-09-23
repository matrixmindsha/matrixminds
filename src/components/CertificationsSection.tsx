import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";

// Import certificate images
import roboticsCert from "@/assets/certificates/robotics-certificate.jpg";
import mlCert from "@/assets/certificates/ml-certificate.jpg";
import aiCert from "@/assets/certificates/ai-certificate.jpg";
import electronicsCert from "@/assets/certificates/electronics-certificate.jpg";
import dataAnalyticsCert from "@/assets/certificates/data-analytics-certificate.jpg";
import stemDiploma from "@/assets/certificates/stem-diploma.jpg";
import aiMasterclassCert from "@/assets/certificates/ai-masterclass-certificate.jpg";
import cybersecurityCert from "@/assets/certificates/cybersecurity-certificate.jpg";

const certifications = [
  {
    title: "Cybersecurity Assessment",
    organization: "LearnTube.ai",
    date: "March 26, 2025",
    image: cybersecurityCert,
    type: "Certificate",
    category: "Cybersecurity"
  },
  {
    title: "30 Days MasterClass in Artificial Intelligence",
    organization: "NoviTech R&D Private Limited",
    date: "April 15 - May 20, 2025",
    image: aiMasterclassCert,
    type: "MasterClass",
    category: "AI"
  },
  {
    title: "Machine Learning Internship",
    organization: "NoviTech R&D Private Limited",
    date: "April 15 - May 15, 2025",
    image: mlCert,
    type: "Internship",
    category: "ML"
  },
  {
    title: "Artificial Intelligence Internship",
    organization: "NoviTech R&D Private Limited", 
    date: "April 15 - May 15, 2025",
    image: aiCert,
    type: "Internship",
    category: "AI"
  },
  {
    title: "Data Analytics Internship",
    organization: "NoviTech R&D Private Limited",
    date: "April 15 - May 15, 2025", 
    image: dataAnalyticsCert,
    type: "Internship",
    category: "Data Science"
  },
  {
    title: "Next Gen Robotics Workshop",
    organization: "Techobytes Technologies & Mechanica'25, IIT Madras",
    date: "April 5-6, 2025",
    image: roboticsCert,
    type: "Workshop",
    category: "Robotics"
  },
  {
    title: "Advanced Electronics Course",
    organization: "Chitti Maker School",
    date: "2025",
    image: electronicsCert,
    type: "Performance Certificate",
    category: "Electronics"
  },
  {
    title: "STEM Diploma",
    organization: "Chitti Maker School",
    date: "2022-23",
    image: stemDiploma,
    type: "Diploma",
    category: "STEM"
  }
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Certifications & Achievements
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and training programs that showcase expertise in AI, Machine Learning, Data Science, and emerging technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40"
            >
              <CardContent className="p-6">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                      {cert.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {cert.type}
                    </Badge>
                    <h3 className="font-bold text-lg leading-tight">
                      {cert.title}
                    </h3>
                  </div>
                  
                  <p className="text-primary font-medium">
                    {cert.organization}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Continuous Learning Journey</h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                These certifications represent a commitment to staying at the forefront of technology. 
                Each program has contributed to building expertise in cutting-edge domains including 
                Artificial Intelligence, Machine Learning, Data Analytics, and Robotics.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;