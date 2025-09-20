import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, Mic, MicOff, Volume2 } from "lucide-react";
import harAIAvatar from "@/assets/har-ai-avatar.png";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const HarAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm HAR AI, your intelligent assistant from Matrix Minds. I can help you with information about our AI, ML, ethical hacking services, and answer questions about S. Hareedh's expertise. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const predefinedResponses: { [key: string]: string } = {
    "services": "Matrix Minds offers cutting-edge AI & Machine Learning solutions, Ethical Hacking & Cybersecurity services, and Data Science & Analytics. We specialize in custom AI models, penetration testing, security audits, and business intelligence solutions.",
    "hareedh": "S. Hareedh is the founder and CEO of Matrix Minds, an expert in AI, Machine Learning, Ethical Hacking, and Data Science with 50+ successful projects. He holds multiple certifications in AI, ML, cybersecurity, and has extensive experience in developing innovative tech solutions.",
    "contact": "You can reach Matrix Minds at: Email: matrixmindsha@gmail.com, Phone: +91 9942658278. We're based in India and serve clients worldwide.",
    "ai": "Our AI services include custom machine learning models, natural language processing, computer vision, predictive analytics, and AI automation solutions. We help businesses leverage artificial intelligence to solve complex problems and improve efficiency.",
    "hacking": "Our ethical hacking services include penetration testing, vulnerability assessments, security audits, compliance testing, and cybersecurity consulting. We help organizations identify and fix security vulnerabilities before malicious actors can exploit them.",
    "projects": "Matrix Minds has successfully completed 50+ projects across various industries including healthcare, finance, e-commerce, and manufacturing. Our portfolio includes AI chatbots, security assessment tools, data analytics dashboards, and custom ML solutions.",
    "experience": "S. Hareedh has extensive experience in technology leadership, having worked on diverse projects ranging from AI-powered applications to comprehensive security assessments. His expertise spans multiple programming languages, frameworks, and cutting-edge technologies."
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! Welcome to Matrix Minds. I'm here to help you learn more about our AI, ML, and cybersecurity services. What would you like to know?";
    }
    
    if (message.includes("help")) {
      return "I can help you with information about: Services, Hareedh's background, Contact details, AI solutions, Ethical hacking, Our projects, and Experience. Just ask me about any of these topics!";
    }
    
    return "Thank you for your question! For detailed information about Matrix Minds services, please contact us directly at matrixmindsha@gmail.com or +91 9942658278. Our team will be happy to assist you with specific requirements.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    const botResponseText = getBotResponse(inputMessage);
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage("");
    
    // Speak the bot response
    setTimeout(() => speakText(botResponseText), 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-14 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 p-2"
          size="lg"
        >
          <img src={harAIAvatar} alt="HAR AI" className="w-full h-full object-contain" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-14 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-2xl border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={harAIAvatar} alt="HAR AI" className="w-6 h-6 object-contain" />
              <CardTitle className="text-lg">HAR AI Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-white/90">Powered by Matrix Minds</p>
        </CardHeader>
        
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type or click mic to speak..."
                className="flex-1"
              />
              {speechSupported && (
                <Button
                  onClick={isListening ? stopListening : startListening}
                  size="sm"
                  variant={isListening ? "destructive" : "outline"}
                  className={isListening ? "animate-pulse" : ""}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              )}
              <Button onClick={handleSendMessage} size="sm" disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {speechSupported && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {isListening ? "Listening... Speak now" : "Click the microphone to speak"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HarAI;