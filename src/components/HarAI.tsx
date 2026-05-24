import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, Mic, MicOff, Volume2, Sparkles, Lightbulb, Code, Shield, Users, Zap, Square, StopCircle } from "lucide-react";
import harAIAvatar from "@/assets/har-ai-avatar.png";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion';
}

interface SuggestedPrompt {
  id: string;
  text: string;
  icon: any;
  category: string;
}

const HarAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "✨ Hello! I'm HAR AI, your intelligent assistant powered by Matrix Minds. I can help you explore our cutting-edge AI solutions, cybersecurity services, and S. Hareedh's expertise. What would you like to discover today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(true);
  const recognitionRef = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [longPressTimer, setLongPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

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
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        
        setInputMessage(transcript);
        
        // Check for voice commands
        if (voiceCommands) {
          const command = transcript.toLowerCase().trim();
          if (command.includes('send message') || command.includes('send')) {
            recognition.stop();
            setTimeout(() => handleSendMessage(), 500);
          } else if (command.includes('clear') || command.includes('reset')) {
            setInputMessage('');
          } else if (command.includes('stop listening')) {
            recognition.stop();
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [voiceCommands]);

  // Long press and dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Start long press timer
    const timer = setTimeout(() => {
      setIsLongPressing(true);
      setIsDragging(true);
    }, 500); // 500ms long press

    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    // Clear long press timer
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setIsLongPressing(false);
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });

    const timer = setTimeout(() => {
      setIsLongPressing(true);
      setIsDragging(true);
    }, 500);

    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setIsLongPressing(false);
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Keep within viewport bounds
        const maxX = window.innerWidth - 384; // 384px is card width (w-96)
        const maxY = window.innerHeight - 500; // 500px is card height
        
        setPosition({
          x: Math.max(0, Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY)),
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.x;
        const newY = touch.clientY - dragOffset.y;
        
        const maxX = window.innerWidth - 384;
        const maxY = window.innerHeight - 500;
        
        setPosition({
          x: Math.max(0, Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY)),
        });
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, dragOffset]);

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      id: "1",
      text: "What AI services does Matrix Minds offer?",
      icon: Sparkles,
      category: "AI Solutions"
    },
    {
      id: "2", 
      text: "What is cybersecurity?",
      icon: Shield,
      category: "Security Knowledge"
    },
    {
      id: "3",
      text: "What is ethical hacking?",
      icon: Code,
      category: "Security Knowledge"
    },
    {
      id: "4",
      text: "Tell me about penetration testing",
      icon: Shield,
      category: "Security Knowledge"
    },
    {
      id: "5",
      text: "Who is S. Hareedh?",
      icon: Users,
      category: "About"
    },
    {
      id: "6",
      text: "How can I get started?",
      icon: Zap,
      category: "Getting Started"
    },
    {
      id: "7",
      text: "What is network security?",
      icon: Shield,
      category: "Security Knowledge"
    },
    {
      id: "8",
      text: "Explain vulnerability assessment",
      icon: Shield,
      category: "Security Knowledge"
    }
  ];

  const predefinedResponses: { [key: string]: string } = {
    "services": "🚀 Matrix Minds offers cutting-edge AI & Machine Learning solutions, Ethical Hacking & Cybersecurity services, and Data Science & Analytics. We specialize in:\n\n• Custom AI models and automation\n• Penetration testing & security audits\n• Business intelligence solutions\n• Advanced data analytics\n\nOur solutions are designed to transform businesses and enhance security posture.",
    "hareedh": "👨‍💻 S. Hareedh is the visionary founder and CEO of Matrix Minds. He's a certified expert in:\n\n• AI & Machine Learning\n• Ethical Hacking & Cybersecurity\n• Data Science & Analytics\n\nWith 50+ successful projects across industries, Hareedh combines technical excellence with business acumen to deliver innovative solutions that drive real results.",
    "contact": "📞 Ready to transform your business? Reach out to Matrix Minds:\n\n📧 Email: matrixmindsha@gmail.com\n☎️ Phone: +91 9942658278\n🌍 Location: India (Serving clients worldwide)\n\nOur team responds within 24 hours to discuss your specific requirements!",
    "ai": "🧠 Our AI services leverage cutting-edge technology:\n\n• Custom Machine Learning models\n• Natural Language Processing\n• Computer Vision solutions\n• Predictive Analytics\n• AI Automation & Chatbots\n• Deep Learning applications\n\nWe help businesses harness AI to solve complex problems, improve efficiency, and drive innovation.",
    "hacking": "🛡️ Our ethical hacking services ensure your digital security:\n\n• Comprehensive Penetration Testing\n• Vulnerability Assessments\n• Security Audits & Compliance\n• Red Team Exercises\n• Security Consulting\n• Incident Response Planning\n\nWe identify vulnerabilities before malicious actors do, keeping your business secure.",
    "projects": "🏆 Matrix Minds has delivered 50+ successful projects:\n\n• Healthcare AI diagnostic tools\n• Finance fraud detection systems\n• E-commerce recommendation engines\n• Manufacturing predictive maintenance\n• Security assessment platforms\n• Custom data analytics dashboards\n\nEach project showcases our commitment to innovation and excellence.",
    "experience": "💼 S. Hareedh brings extensive technology leadership experience:\n\n• 5+ years in AI/ML development\n• Expert in multiple programming languages\n• Certified in cybersecurity frameworks\n• Published researcher in AI ethics\n• Mentor to tech startups\n• Speaker at international conferences\n\nHis vision drives Matrix Minds' mission to democratize advanced technology.",
    
    // General Knowledge Base - Cybersecurity & Ethical Hacking
    "cybersecurity_definition": "🔒 **Cybersecurity** is the practice of protecting systems, networks, and programs from digital attacks. It involves:\n\n• **Network Security**: Protecting computer networks from intruders\n• **Information Security**: Protecting data integrity and privacy\n• **Application Security**: Keeping software and devices free of threats\n• **Operational Security**: Handling and protecting data assets\n• **Disaster Recovery**: Responding to cyber incidents and maintaining business continuity\n• **End-user Education**: Teaching people about security best practices\n\nCybersecurity is essential in today's digital world where cyber threats are constantly evolving.",
    
    "ethical_hacking": "⚡ **Ethical Hacking** (White Hat Hacking) is the authorized practice of bypassing system security to identify potential data breaches and threats in a network.\n\n**Key Principles:**\n• **Authorization**: Always have explicit permission\n• **Documentation**: Report all findings responsibly\n• **No Damage**: Don't cause harm to systems\n• **Privacy**: Respect data confidentiality\n\n**Common Techniques:**\n• Penetration Testing\n• Vulnerability Assessments\n• Social Engineering Tests\n• Network Scanning\n• Web Application Testing\n\nEthical hackers help organizations strengthen their security posture by finding vulnerabilities before malicious actors do.",
    
    "penetration_testing": "🎯 **Penetration Testing** is a simulated cyber attack against your computer system to check for exploitable vulnerabilities.\n\n**Types of Pen Testing:**\n• **Black Box**: No prior knowledge of the system\n• **White Box**: Full knowledge of the system\n• **Gray Box**: Partial knowledge of the system\n\n**Phases:**\n1. **Planning & Reconnaissance**: Gathering intel\n2. **Scanning**: Understanding target responses\n3. **Gaining Access**: Exploiting vulnerabilities\n4. **Maintaining Access**: Seeing if persistence is possible\n5. **Analysis & Reporting**: Compiling results\n\nPen testing helps identify security weaknesses before attackers do.",
    
    "vulnerability_assessment": "🔍 **Vulnerability Assessment** is the process of identifying, quantifying, and prioritizing vulnerabilities in a system.\n\n**Key Components:**\n• **Asset Identification**: Cataloging all system assets\n• **Vulnerability Scanning**: Using automated tools\n• **Risk Assessment**: Evaluating potential impact\n• **Reporting**: Documenting findings and recommendations\n• **Remediation**: Providing solutions to fix vulnerabilities\n\n**Tools Used:**\n• Nessus, OpenVAS, Nmap\n• Burp Suite, OWASP ZAP\n• Metasploit, Wireshark\n\nRegular vulnerability assessments are crucial for maintaining strong security posture.",
    
    "network_security": "🌐 **Network Security** involves protecting the integrity, confidentiality, and accessibility of computer networks and data.\n\n**Core Elements:**\n• **Firewalls**: Control network traffic\n• **IDS/IPS**: Intrusion Detection/Prevention Systems\n• **VPN**: Secure remote access\n• **Network Access Control**: Managing device access\n• **Network Segmentation**: Isolating critical systems\n\n**Common Threats:**\n• DDoS Attacks\n• Man-in-the-Middle Attacks\n• Packet Sniffing\n• Network Reconnaissance\n• Unauthorized Access\n\nStrong network security is the foundation of overall cybersecurity strategy.",
    
    "information_security": "📊 **Information Security** (InfoSec) protects information and information systems from unauthorized access, use, disclosure, disruption, modification, or destruction.\n\n**CIA Triad:**\n• **Confidentiality**: Ensuring information is accessible only to authorized users\n• **Integrity**: Maintaining accuracy and completeness of data\n• **Availability**: Ensuring authorized users have access when needed\n\n**Key Areas:**\n• Data Classification\n• Access Controls\n• Encryption\n• Data Loss Prevention\n• Incident Response\n• Compliance Management\n\nInfoSec is critical for protecting sensitive business and personal data."
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

  const toggleVoiceCommands = () => {
    setVoiceCommands(!voiceCommands);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Enhanced keyword matching with general knowledge
    const keywordMap: { [key: string]: string[] } = {
      "services": ["service", "offer", "provide", "solution", "what do you do"],
      "hareedh": ["hareedh", "founder", "ceo", "who is", "about hareedh"],
      "contact": ["contact", "reach", "phone", "email", "get in touch"],
      "ai": ["artificial intelligence", "machine learning", "ml", "ai solution", "ai service"],
      "hacking": ["ethical hacking", "white hat", "pen test", "penetration test"],
      "projects": ["project", "portfolio", "work", "case study", "example"],
      "experience": ["experience", "background", "expertise", "skill", "qualification"],
      
      // General Knowledge Keywords
      "cybersecurity_definition": ["what is cybersecurity", "define cybersecurity", "cybersecurity definition", "cybersecurity meaning", "cyber security"],
      "ethical_hacking": ["what is ethical hacking", "define ethical hacking", "ethical hacking definition", "white hat hacking", "authorized hacking"],
      "penetration_testing": ["what is penetration testing", "pen testing", "pentest", "penetration test definition", "security testing"],
      "vulnerability_assessment": ["vulnerability assessment", "vulnerability scan", "security assessment", "vuln assessment"],
      "network_security": ["network security", "network protection", "network safety", "secure network"],
      "information_security": ["information security", "infosec", "data security", "data protection"]
    };
    
    // Check for exact matches first for general knowledge
    for (const [key, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        if (predefinedResponses[key]) {
          return predefinedResponses[key];
        }
      }
    }

    // Specific cybersecurity terms
    if (message.includes("firewall") || message.includes("intrusion detection") || message.includes("ids") || message.includes("ips")) {
      return "🔥 **Firewalls & IDS/IPS** are critical network security components:\n\n**Firewall:**\n• Controls incoming/outgoing network traffic\n• Acts as a barrier between trusted and untrusted networks\n• Can be hardware or software-based\n\n**IDS (Intrusion Detection System):**\n• Monitors network traffic for suspicious activity\n• Alerts administrators of potential threats\n\n**IPS (Intrusion Prevention System):**\n• Actively blocks detected threats\n• Combines monitoring with automated response\n\nThese tools form the foundation of network defense strategies.";
    }

    if (message.includes("malware") || message.includes("virus") || message.includes("trojan") || message.includes("ransomware")) {
      return "🦠 **Malware** (Malicious Software) includes various types of harmful programs:\n\n**Common Types:**\n• **Virus**: Replicates and spreads to other files\n• **Trojan**: Disguised as legitimate software\n• **Ransomware**: Encrypts files and demands payment\n• **Spyware**: Secretly monitors user activity\n• **Adware**: Displays unwanted advertisements\n• **Rootkit**: Hides malicious activity from detection\n\n**Protection Methods:**\n• Antivirus software\n• Regular system updates\n• Safe browsing practices\n• Email security\n• User education\n\nStaying informed about malware threats is crucial for cybersecurity.";
    }

    if (message.includes("social engineering") || message.includes("phishing") || message.includes("social attack")) {
      return "🎭 **Social Engineering** attacks manipulate people to divulge confidential information:\n\n**Common Techniques:**\n• **Phishing**: Fraudulent emails/websites\n• **Pretexting**: Creating false scenarios\n• **Baiting**: Offering something enticing\n• **Quid Pro Quo**: Offering service in exchange for info\n• **Tailgating**: Following authorized persons into secure areas\n\n**Prevention:**\n• Security awareness training\n• Verification procedures\n• Healthy skepticism\n• Multi-factor authentication\n• Clear security policies\n\nHuman psychology is often the weakest link in security chains.";
    }

    if (message.includes("encryption") || message.includes("cryptography") || message.includes("crypto")) {
      return "🔐 **Encryption** converts readable data into coded form to prevent unauthorized access:\n\n**Types:**\n• **Symmetric**: Same key for encryption/decryption\n• **Asymmetric**: Public/private key pairs\n• **Hashing**: One-way transformation\n\n**Common Algorithms:**\n• AES (Advanced Encryption Standard)\n• RSA (Rivest-Shamir-Adleman)\n• SHA (Secure Hash Algorithm)\n\n**Applications:**\n• Secure communications\n• Data storage protection\n• Digital signatures\n• Authentication\n\nEncryption is fundamental to modern cybersecurity and privacy protection.";
    }
    
    // General conversation handlers
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "👋 Hello! Welcome to Matrix Minds. I'm HAR AI, your intelligent assistant ready to explore our innovative AI solutions, cybersecurity services, and answer general questions about technology and security. How can I help you today?";
    }
    
    if (message.includes("help") || message.includes("what can you do")) {
      return "🤖 I can help you with:\n\n**Matrix Minds Services:**\n• 🚀 AI & ML solutions\n• 🛡️ Cybersecurity services\n• 👨‍💻 About our team\n• 📞 Contact information\n\n**General Knowledge:**\n• Cybersecurity concepts\n• Ethical hacking explanations\n• Network security basics\n• Information security principles\n\nAsk me anything about these topics!";
    }

    if (message.includes("unique") || message.includes("different") || message.includes("special")) {
      return "✨ Matrix Minds stands out because:\n\n• 🎯 Personalized solutions tailored to your needs\n• 🏆 50+ successful projects across industries\n• 🔒 Security-first approach in all implementations\n• 🚀 Cutting-edge AI technologies\n• 👨‍💻 Led by certified experts\n• 🌍 Global reach with local understanding\n\nWe don't just build technology - we craft solutions that transform businesses!";
    }

    if (message.includes("started") || message.includes("begin") || message.includes("how to")) {
      return "🚀 Getting started with Matrix Minds is easy:\n\n1. 📞 Contact us for a free consultation\n2. 💬 Discuss your specific requirements\n3. 📋 Receive a customized proposal\n4. 🤝 Begin your transformation journey\n\nReach out at matrixmindsha@gmail.com or +91 9942658278. Our team is ready to help you leverage the power of AI and security!";
    }
    
    return "🤔 That's an interesting question! I can help with general cybersecurity and technology questions, or provide information about Matrix Minds services.\n\n📧 For detailed discussions: matrixmindsha@gmail.com\n📞 For immediate assistance: +91 9942658278\n\nTry asking me about cybersecurity, ethical hacking, or our AI solutions!";
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    setTimeout(() => {
      const botResponseText = getBotResponse(textToSend);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Speak the bot response
      setTimeout(() => speakText(botResponseText.replace(/[🚀🛡️👨‍💻📞🧠🏆💼✨🤖👋🎯🔒🌍💬📋🤝📧☎️🤔]/g, '')), 500);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex justify-start mb-4">
      <div className="bg-muted p-3 rounded-lg max-w-[80%]">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs text-muted-foreground ml-2">HAR AI is typing...</span>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-14 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 shadow-lg hover:shadow-2xl transition-all duration-300 p-2 animate-pulse-glow"
          size="lg"
        >
          <div className="relative w-full h-full">
            <img src={harAIAvatar} alt="HAR AI" className="w-full h-full object-contain" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div 
      className={`fixed z-50 ${position.x === 0 && position.y === 0 ? 'bottom-14 right-6' : ''}`}
      style={
        position.x !== 0 || position.y !== 0
          ? { left: `${position.x}px`, top: `${position.y}px` }
          : {}
      }
    >
      <Card className="w-96 h-[600px] shadow-2xl border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
        <CardHeader 
          className={`pb-3 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white rounded-t-lg cursor-move select-none relative overflow-hidden ${isLongPressing ? 'bg-opacity-80' : ''}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={harAIAvatar} alt="HAR AI" className="w-8 h-8 object-contain" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <CardTitle className="text-lg font-bold">HAR AI</CardTitle>
                <p className="text-xs text-white/80">Intelligent Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-2 relative z-10">
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Matrix Minds
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl transition-all duration-200 ${
                      message.isBot
                        ? "bg-muted text-foreground rounded-bl-md shadow-sm"
                        : "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-br-md shadow-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2 flex items-center gap-1">
                      {message.isBot && <Bot className="w-3 h-3" />}
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              
              {showSuggestions && messages.length <= 1 && (
                <div className="space-y-3 animate-fade-in">
                  <p className="text-sm text-muted-foreground text-center font-medium">
                    ✨ Quick suggestions to get started:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedPrompts.slice(0, 4).map((prompt) => {
                      const IconComponent = prompt.icon;
                      return (
                        <Button
                          key={prompt.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestedPrompt(prompt.text)}
                          className="justify-start h-auto p-3 text-left hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 group"
                        >
                          <IconComponent className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="text-sm font-medium">{prompt.text}</p>
                            <p className="text-xs text-muted-foreground">{prompt.category}</p>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {suggestedPrompts.slice(4).map((prompt) => {
                      const IconComponent = prompt.icon;
                      return (
                        <Button
                          key={prompt.id}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSuggestedPrompt(prompt.text)}
                          className="text-xs h-auto py-2 px-3 hover:bg-primary/10 transition-all duration-200"
                        >
                          <IconComponent className="w-3 h-3 mr-1" />
                          {prompt.category}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-background/50 space-y-3">
            {/* Voice Commands Toggle */}
            {speechSupported && (
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Voice Commands</span>
                </div>
                <Button
                  onClick={toggleVoiceCommands}
                  size="sm"
                  variant={voiceCommands ? "default" : "outline"}
                  className="h-6 px-2 text-xs"
                >
                  {voiceCommands ? "ON" : "OFF"}
                </Button>
              </div>
            )}
            
            {/* Enhanced Input Area */}
            <div className="space-y-2">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleTextareaKeyPress}
                    placeholder="Ask me anything about Matrix Minds... (Press Enter to send, Shift+Enter for new line)"
                    className="min-h-[60px] max-h-[120px] resize-none border-2 focus:border-primary transition-all duration-200 pr-12"
                    disabled={isTyping}
                  />
                  
                  {/* Voice Recording Button */}
                  {speechSupported && (
                    <div className="absolute right-2 top-2 flex flex-col gap-1">
                      <Button
                        onClick={isListening ? stopListening : startListening}
                        size="sm"
                        variant="ghost"
                        className={`rounded-full h-8 w-8 p-0 transition-all duration-300 ${
                          isListening 
                            ? "text-red-500 bg-red-50 animate-pulse hover:bg-red-100" 
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                        disabled={isTyping}
                      >
                        {isListening ? (
                          <div className="flex items-center justify-center">
                            <StopCircle className="w-4 h-4" />
                          </div>
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={() => handleSendMessage()} 
                  size="sm" 
                  disabled={!inputMessage.trim() || isTyping}
                  className="rounded-full h-12 w-12 p-0 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Status Indicators */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  {speechSupported && (
                    <span className={`flex items-center gap-1 ${isListening ? 'text-red-500' : ''}`}>
                      {isListening ? (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          Listening... {isRecording && "Say 'send' to send message"}
                        </>
                      ) : (
                        <>
                          <Mic className="w-3 h-3" />
                          Voice input ready
                        </>
                      )}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {voiceCommands && speechSupported && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="w-2 h-2 mr-1" />
                      Commands: ON
                    </Badge>
                  )}
                  <span>{inputMessage.length}/1000</span>
                </div>
              </div>
              
              {/* Voice Commands Help */}
              {speechSupported && voiceCommands && isListening && (
                <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Voice Commands:</p>
                  <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    <div>• Say "send" or "send message" to send</div>
                    <div>• Say "clear" to clear input</div>
                    <div>• Say "stop listening" to stop recording</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HarAI;