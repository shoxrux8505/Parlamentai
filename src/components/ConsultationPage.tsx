import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  Video, 
  Send,
  Clock,
  FileText,
  User,
  Bot
} from "lucide-react";

interface ConsultationPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function ConsultationPage({ onBack, onNavigate }: ConsultationPageProps) {
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState("message");

  const consultationTypes = [
    {
      id: "message",
      title: "Yozma maslahat",
      description: "Oddiy savollarga javob oling",
      icon: MessageSquare,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      available: true,
      responseTime: "~2 soat"
    },
    {
      id: "call", 
      title: "Telefon orqali",
      description: "To'g'ridan-to'g'ri telefon maslahati",
      icon: Phone,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      available: false,
      responseTime: "Vaqt belgilash kerak"
    },
    {
      id: "video",
      title: "Video qo'ng'iroq",
      description: "Yuzma-yuz maslahat",
      icon: Video,
      iconColor: "text-purple-600", 
      iconBg: "bg-purple-100",
      available: true,
      responseTime: "~15 daqiqa"
    },
    {
      id: "ai",
      title: "AI Chatbot",
      description: "Sun'iy intellekt yordamchisi",
      icon: Bot,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100", 
      available: true,
      responseTime: "Bir zumda"
    }
  ];

  const recentConsultations = [
    {
      id: 1,
      title: "Oila nizolari bo'yicha maslahat",
      date: "2 soat oldin",
      status: "Javob berildi",
      expert: "Aliya Karimova",
      category: "Oila huquqi"
    },
    {
      id: 2,
      title: "Mehnat shartnomasi masalasi",
      date: "Kecha",
      status: "Ko'rib chiqilmoqda",
      expert: "Ruslan Yusupov",
      category: "Mehnat huquqi"
    },
    {
      id: 3,
      title: "Mulk huquqi bo'yicha savol",
      date: "3 kun oldin",
      status: "Tugallandi",
      expert: "Nigora Rahimova",
      category: "Mulk huquqi"
    }
  ];

  const handleSubmit = () => {
    if (message.trim()) {
      // Handle message submission
      setMessage("");
    }
  };

  return (
    <div className="bg-background">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-[#2c3e50] dark:to-[#1a1a1a] px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-white">Maslahat olish</h1>
          <div className="w-10"></div>
        </div>

        {/* Info Section */}
        <div 
          className="mb-4 cursor-pointer p-3 rounded-2xl hover:bg-white/10 transition-colors"
          onClick={() => onNavigate("chatbot")}
        >
          <h2 className="text-white font-medium mb-1">24/7 qo'llab quvatlash</h2>
          <p className="text-white/90 text-sm">Huquqiy masalalaringizda professional yordam</p>
        </div>
      </div>

      {/* Consultation Types */}
      <div className="px-6 py-4">
        <h3 className="font-semibold text-foreground mb-4">Maslahat turini tanlang</h3>
        <div className="space-y-3">
          {consultationTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all rounded-2xl border-0 shadow-sm ${
                  selectedType === type.id 
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" 
                    : "bg-card"
                } ${!type.available ? "opacity-50" : ""}`}
                onClick={() => {
                  if (type.available) {
                    if (type.id === "ai") {
                      onNavigate("chatbot");
                    } else {
                      setSelectedType(type.id);
                    }
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${type.iconBg} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${type.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">{type.title}</h4>
                        {!type.available && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                            Mavjud emas
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{type.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {type.responseTime}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Message Input */}
      {selectedType === "message" && (
        <div className="px-6 py-4">
          <Card className="bg-card rounded-2xl border-0 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h4 className="font-medium text-foreground">Savolingizni yozing</h4>
              <Textarea
                placeholder="Savolingizni batafsil yozing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none border-gray-200 rounded-xl"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mutaxassis 2 soat ichida javob beradi
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={!message.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Yuborish
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Consultations */}
      <div className="px-6 pb-6">
        <h3 className="font-semibold text-foreground mb-4">So'nggi maslahatlar</h3>
        <div className="space-y-3">
          {recentConsultations.map((consultation) => (
            <Card key={consultation.id} className="bg-card rounded-2xl border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground mb-1">
                      {consultation.title}
                    </h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{consultation.expert}</span>
                      <span className="text-xs text-muted-foreground">• {consultation.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{consultation.date}</span>
                      <Badge 
                        variant="secondary"
                        className={`text-xs rounded-full ${
                          consultation.status === "Tugallandi" 
                            ? "bg-green-100 text-green-700" 
                            : consultation.status === "Javob berildi"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {consultation.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}