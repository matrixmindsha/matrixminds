import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Mic, MicOff, MessageCircle, X, Sparkles, Bot, Volume2, Play, Lightbulb, Target, Zap } from "lucide-react";
import harAIAvatar from "@/assets/har-ai-avatar.png";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🚀 Welcome to Matrix Minds! I'm your AI assistant. How can I help you explore our cutting-edge solutions today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputMessage(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const predefinedResponses: { [key: string]: string } = {
    "services": "🚀 Matrix Minds offers cutting-edge AI & Machine Learning solutions, Ethical Hacking & Cybersecurity services, and Data Science & Analytics. We specialize in custom AI models, penetration testing, and business intelligence solutions designed to transform businesses.",
    "ai": "🧠 Our AI services include Custom Machine Learning models, Natural Language Processing, Computer Vision solutions, Predictive Analytics, AI Automation & Chatbots, and Deep Learning applications to solve complex problems and drive innovation.",
    "contact": "📞 Ready to transform your business? Contact Matrix Minds:\n📧 Email: matrixmindsha@gmail.com\n☎️ Phone: +91 9942658278\n🌍 Location: India (Serving clients worldwide)\n\nOur team responds within 24 hours!",
    "consultation": "🎉 FREE CONSULTATION AVAILABLE NOW! Our experts will analyze your needs and provide tailored AI solutions. Limited time offer - reach out today at matrixmindsha@gmail.com or +91 9942658278 to secure your spot!",
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("service") || message.includes("offer") || message.includes("solution")) {
      return predefinedResponses.services;
    }
    if (message.includes("ai") || message.includes("artificial intelligence") || message.includes("machine learning")) {
      return predefinedResponses.ai;
    }
    if (message.includes("contact") || message.includes("reach") || message.includes("phone") || message.includes("email")) {
      return predefinedResponses.contact;
    }
    if (message.includes("consultation") || message.includes("free") || message.includes("help")) {
      return predefinedResponses.consultation;
    }
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "👋 Hello! Welcome to Matrix Minds. I'm here to help you explore our innovative AI solutions and cybersecurity services. What would you like to know?";
    }
    
    return "🤔 That's an interesting question! Our expert team at Matrix Minds can provide comprehensive answers. Contact us at matrixmindsha@gmail.com or +91 9942658278 for detailed discussions about your requirements!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponseText = getBotResponse(inputMessage);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponseText.replace(/[🚀🧠📞🎉👋🤔📧☎️🌍]/g, ''));
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 1000);
  };

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const quickSuggestions = [
    "Tell me about AI services",
    "How can you help my business?",
    "What is cybersecurity?",
    "Free consultation details",
    "Pricing information"
  ];

  const advantages = [
    { icon: Zap, title: "Fast Response", desc: "24/7 instant AI support" },
    { icon: Target, title: "Precision", desc: "Tailored solutions for your needs" },
    { icon: Sparkles, title: "Innovation", desc: "Cutting-edge technology" }
  ];

  const TypingIndicator = () => (
    <div className="flex justify-start mb-4">
      <div className="bg-muted/50 backdrop-blur-sm p-3 rounded-lg max-w-[80%] border border-primary/20">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 shadow-2xl hover:shadow-primary/50 transition-all duration-300"
          size="lg"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-20 right-6 z-50 w-96"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      <Card ref={cardRef} className="h-[600px] shadow-2xl border border-primary/30 bg-background/95 backdrop-blur-xl overflow-hidden"
            style={{ userSelect: isDragging ? 'none' : 'auto' }}>
        <div className="drag-handle flex items-center justify-between p-4 bg-gradient-to-r from-primary via-accent to-primary text-white border-b border-primary/30 cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-3 pointer-events-none">
            <div className="relative">
              <img src={harAIAvatar} alt="AI Assistant" className="w-8 h-8 rounded-full" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Matrix Minds AI</h3>
              <p className="text-xs opacity-90">Online • Ready to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-8 w-8 p-0 pointer-events-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="chat" className="text-xs">Chat</TabsTrigger>
            <TabsTrigger value="start" className="text-xs">Getting Started</TabsTrigger>
            <TabsTrigger value="help" className="text-xs">Quick Help</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4 max-h-[350px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 animate-fade-in ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg backdrop-blur-sm border ${
                      message.isBot
                        ? "bg-muted/50 border-primary/20 text-foreground"
                        : "bg-primary/90 border-primary text-primary-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.isBot && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.isBot && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-primary/20"
                          onClick={() => {
                            if ('speechSynthesis' in window) {
                              const utterance = new SpeechSynthesisUtterance(message.text.replace(/[🚀🧠📞🎉👋🤔📧☎️🌍]/g, ''));
                              speechSynthesis.speak(utterance);
                            }
                          }}
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="start" className="flex-1 p-4">
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg mb-2">🚀 Getting Started</h3>
                  <p className="text-sm text-muted-foreground">Welcome to Matrix Minds AI! Here's how to get the most out of our assistant:</p>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Quick Start</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Ask me about our AI services, cybersecurity solutions, or request a free consultation!</p>
                  </div>
                  
                  <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Mic className="w-4 h-4 text-accent" />
                      <span className="font-medium text-sm">Voice Commands</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Click the microphone to use voice input. I can speak responses back to you!</p>
                  </div>
                  
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-sm">Free Consultation</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Book your FREE consultation now! Limited time offer for AI and cybersecurity services.</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="help" className="flex-1 p-4">
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg mb-2">💡 Quick Suggestions</h3>
                </div>
                
                <div className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start text-xs h-auto p-2"
                      onClick={() => {
                        setInputMessage(suggestion);
                        setActiveTab("chat");
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3 text-sm">🎯 Our Advantages</h4>
                  <div className="space-y-3">
                    {advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg">
                        <advantage.icon className="w-4 h-4 mt-0.5 text-primary" />
                        <div>
                          <p className="font-medium text-xs">{advantage.title}</p>
                          <p className="text-xs text-muted-foreground">{advantage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {activeTab === "chat" && (
          <div className="p-4 border-t border-primary/30 bg-background/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or use voice..."
                  className="min-h-[40px] max-h-[100px] resize-none bg-muted/50 border-primary/30 focus:border-primary backdrop-blur-sm pr-20"
                  rows={1}
                />
                {speechSupported && (
                  <div className="absolute right-12 top-1 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${
                        isListening 
                          ? "text-red-500 hover:text-red-600 animate-pulse" 
                          : "text-cyan-500 hover:text-cyan-600"
                      }`}
                      onClick={isListening ? stopListening : startListening}
                      title="Voice Input"
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                )}
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="h-10 w-10 p-0 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {isListening && (
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs animate-pulse bg-cyan-500/20 text-cyan-600 border-cyan-500/30">
                  🎤 Listening... Speak now
                </Badge>
              </div>
            )}
            
            <div className="mt-2 text-xs text-muted-foreground text-center">
              🎉 <strong>FREE CONSULTATION NOW</strong> • Offer ends soon!
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatBox;