import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  ArrowLeft, 
  Send, 
  Bot,
  User,
  Mic,
  Paperclip,
  MoreVertical
} from "lucide-react";

interface ChatbotPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatbotPage({ onBack, onNavigate }: ChatbotPageProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Salom! Men PARLAMENT AI yordamchisiman. Huquqiy masalalar bo'yicha qanday yordam bera olaman?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        id: messages.length + 1,
        text: message.trim(),
        isBot: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage("");
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: getBotResponse(message.trim()),
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("ajralish") || lowerMsg.includes("nikoh")) {
      return "Ajralish jarayoni bo'yicha sizga yordam bera olaman. Oila kodeksiga ko'ra, nikohni bekor qilish uchun mahkamaga murojaat qilish kerak. Sizga qaysi masala bo'yicha batafsil ma'lumot kerak?";
    }
    
    if (lowerMsg.includes("mehnat") || lowerMsg.includes("ish")) {
      return "Mehnat huquqi bo'yicha savolingiz bor ekan. Mehnat shartnomasi, ish haqi, ishdan bo'shatish yoki boshqa mehnat masalalari bo'yicha yordam bera olaman. Aniq nima haqida gaplashmoqchisiz?";
    }
    
    if (lowerMsg.includes("mulk") || lowerMsg.includes("uy") || lowerMsg.includes("meros")) {
      return "Mulk huquqi masalalari juda muhim. Ko'chmas mulk sotib olish, sotish, meros qoldirish yoki mulkiy nizolar bo'yicha maslahat bera olaman. Qaysi vaziyat sizni qiziqtirmoqda?";
    }
    
    if (lowerMsg.includes("biznes") || lowerMsg.includes("kompaniya")) {
      return "Biznes yuritish bo'yicha huquqiy maslahat kerakmi? Kompaniya ochish, shartnomalar tuzish, soliq masalalari va boshqa biznes huquqi bo'yicha yordam bera olaman.";
    }
    
    if (lowerMsg.includes("yurist") || lowerMsg.includes("advokat")) {
      return "Sizga professional yurist kerakmi? Mening tavsiyam - ixtisoslashgan yuristdan yordamchi maslahat oling. 'Yuristlar' bo'limidan o'z soha mutaxassisini topishingiz mumkin.";
    }
    
    return "Savolingizni tushundim. Bu murakkab huquqiy masala bo'lishi mumkin. Aniq javob uchun mutaxassis yurist bilan bog'lanishni maslahat beraman. Sizga qo'shimcha ma'lumot berishim mumkinmi?";
  };

  const quickSuggestions = [
    "Ajralish jarayoni qanday?",
    "Mehnat shartnomasi",
    "Mulk sotib olish",
    "Meros huquqi",
    "Biznes ochish"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('uz-UZ', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-black h-full flex flex-col">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-[#2c3e50] dark:to-[#1a1a1a] px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-medium text-white">AI Yordamchi</h1>
              <p className="text-xs text-white/80">Onlayn</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-white hover:bg-white/20"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex items-start space-x-2 max-w-[280px] ${msg.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className={msg.isBot ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}>
                    {msg.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.isBot 
                    ? 'bg-white border border-gray-100' 
                    : 'bg-blue-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[280px]">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Tez savollar:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setMessage(suggestion)}
                className="text-xs rounded-full border-gray-200 bg-white hover:bg-gray-50"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-gray-400 hover:text-gray-600"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Savolingizni yozing..."
              className="pr-12 rounded-full border-gray-200 focus:border-blue-300 focus:ring-blue-300"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 hover:text-gray-600"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            size="icon"
            className="w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="mt-2 px-2">
          <p className="text-xs text-gray-500 text-center">
            AI yordamchi huquqiy maslahat beradi, ammo rasmiy huquqiy xizmat emas
          </p>
        </div>
      </div>
    </div>
  );
}