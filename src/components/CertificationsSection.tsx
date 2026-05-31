import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Calendar, BadgeCheck, ShieldCheck, FileText, Download } from "lucide-react";


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

        {/* Government-verified MSME / Udyam badge */}
        <Card className="mb-12 overflow-hidden border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 backdrop-blur-md relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-0" />
          <CardContent className="p-6 md:p-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-12 h-12 text-primary-foreground" />
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                    <BadgeCheck className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <Badge className="bg-accent text-accent-foreground font-bold">
                    <BadgeCheck className="w-3.5 h-3.5 mr-1" /> Government Verified
                  </Badge>
                  <Badge variant="outline" className="border-accent/50">
                    MSME · Micro Enterprise
                  </Badge>
                  <Badge variant="outline" className="border-primary/50">
                    Govt. of India
                  </Badge>
                </div>
                <h3 className="font-orbitron text-xl md:text-2xl font-black text-foreground mb-1">
                  Udyam Registered Enterprise
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Matrix Minds is officially registered with the Ministry of Micro, Small &amp; Medium
                  Enterprises, Government of India.
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                  <div className="flex justify-between sm:block">
                    <span className="text-muted-foreground">Udyam Reg. No.</span>{" "}
                    <span className="font-mono font-bold text-foreground">UDYAM-TN-01-0035075</span>
                  </div>
                  <div className="flex justify-between sm:block">
                    <span className="text-muted-foreground">Enterprise</span>{" "}
                    <span className="font-bold text-foreground">MATRIX MINDS</span>
                  </div>
                  <div className="flex justify-between sm:block">
                    <span className="text-muted-foreground">Activity</span>{" "}
                    <span className="font-bold text-foreground">IT Services (NIC 62099)</span>
                  </div>
                  <div className="flex justify-between sm:block">
                    <span className="text-muted-foreground">Registered</span>{" "}
                    <span className="font-bold text-foreground">29 May 2026</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:w-48">
                <Button asChild variant="hero" size="sm" className="font-orbitron">
                  <a
                    href="/certificates/Udyam_Registration_Certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4 mr-1.5" /> View Certificate
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="/certificates/Udyam_Registration_Certificate.pdf" download>
                    <Download className="w-4 h-4 mr-1.5" /> Download PDF
                  </a>
                </Button>
                <a
                  href="https://udyamregistration.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-center text-muted-foreground hover:text-accent underline-offset-2 hover:underline"
                >
                  Verify on udyamregistration.gov.in
                </a>
              </div>
            </div>
          </CardContent>
        </Card>



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