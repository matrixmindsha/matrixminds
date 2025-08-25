import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, Quote } from "lucide-react";

const FeedbackSection = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    company: '',
    rating: 5,
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFeedbackData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link for feedback notification
      const subject = `⭐ New Client Feedback - ${feedbackData.rating} Stars from ${feedbackData.name}`;
      const body = `
MATRIX MINDS - CLIENT FEEDBACK NOTIFICATION
==========================================

Client Details:
- Name: ${feedbackData.name}
- Email: ${feedbackData.email}
- Company: ${feedbackData.company}
- Rating: ${'⭐'.repeat(feedbackData.rating)} (${feedbackData.rating}/5 stars)

Feedback:
${feedbackData.feedback}

---
This feedback was submitted through the Matrix Minds website.
Please follow up with the client if needed.

Timestamp: ${new Date().toLocaleString()}
      `.trim();

      const mailtoLink = `mailto:matrixmindsha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. The Matrix Minds team has been notified.",
      });

      // Reset form
      setFeedbackData({
        name: '',
        email: '',
        company: '',
        rating: 5,
        feedback: ''
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Solutions",
      rating: 5,
      feedback: "Matrix Minds delivered an exceptional AI solution that increased our operational efficiency by 40%. Highly recommended!"
    },
    {
      name: "Raj Patel",
      company: "DataFlow Industries",
      rating: 5,
      feedback: "The security audit conducted by Matrix Minds identified critical vulnerabilities we missed. Professional and thorough work."
    },
    {
      name: "Emily Chen",
      company: "Smart Analytics Ltd",
      rating: 5,
      feedback: "Outstanding data science consulting. The insights provided helped us make data-driven decisions that boosted our revenue."
    }
  ];

  return (
    <section className="py-20 bg-background/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about working with Matrix Minds
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-muted-foreground mb-4 italic">"{testimonial.feedback}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Share Your Experience</CardTitle>
              <p className="text-muted-foreground">Your feedback helps us improve and will be sent directly to our team</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-name">Name *</Label>
                    <Input
                      id="feedback-name"
                      name="name"
                      value={feedbackData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-email">Email *</Label>
                    <Input
                      id="feedback-email"
                      name="email"
                      type="email"
                      value={feedbackData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-company">Company</Label>
                  <Input
                    id="feedback-company"
                    name="company"
                    value={feedbackData.company}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rating *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={`w-8 h-8 transition-colors ${
                          star <= feedbackData.rating 
                            ? 'text-primary fill-primary' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        <Star className="w-full h-full" fill={star <= feedbackData.rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {feedbackData.rating}/5 stars
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-message">Your Feedback *</Label>
                  <Textarea
                    id="feedback-message"
                    name="feedback"
                    value={feedbackData.feedback}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="bg-background/50"
                    placeholder="Tell us about your experience working with Matrix Minds..."
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Feedback <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;