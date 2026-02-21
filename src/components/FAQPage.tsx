import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  Users,
  FileText,
  Gavel,
  Vote,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface FAQPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function FAQPage({ onBack, onNavigate }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("barchasi");
  const [helpfulVotes, setHelpfulVotes] = useState<{ [key: string]: 'up' | 'down' | null }>({});

  const faqCategories = [
    { id: "barchasi", name: "Barchasi", icon: HelpCircle, count: 25 },
    { id: "parlament", name: "Parlament", icon: Users, count: 8 },
    { id: "qonunlar", name: "Qonunlar", icon: FileText, count: 6 },
    { id: "saylovlar", name: "Saylovlar", icon: Vote, count: 5 },
    { id: "huquqlar", name: "Fuqaro huquqlari", icon: Gavel, count: 6 }
  ];

  const faqItems = [
    {
      id: "1",
      category: "parlament",
      question: "Parlament qanday tashkil etilgan?",
      answer: "O'zbekiston Respublikasi Parlamenti ikki palatadan iborat: Qonunchilik palatasi va Senat. Qonunchilik palatasi 150 deputatdan, Senat esa 100 senatordan tashkil topgan.",
      helpful: 45,
      notHelpful: 3,
      popular: true
    },
    {
      id: "2", 
      category: "saylovlar",
      question: "Parlament a'zolari qanday saylanadi?",
      answer: "Qonunchilik palatasi deputatlari to'g'ridan-to'g'ri saylovlar orqali 5 yil muddatga saylanadi. Senat a'zolari viloyat, tuman va shahar kengashlari tomonidan saylanadi.",
      helpful: 38,
      notHelpful: 2,
      popular: true
    },
    {
      id: "3",
      category: "qonunlar", 
      question: "Qonun qabul qilish jarayoni qanday amalga oshiriladi?",
      answer: "Qonun loyihasi avval Qonunchilik palatasida ko'rib chiqiladi, keyin Senatga yuboriladi. Ikkala palata tomonidan qabul qilingan qonun Prezidentga imzolash uchun yuboriladi.",
      helpful: 52,
      notHelpful: 1,
      popular: true
    },
    {
      id: "4",
      category: "huquqlar",
      question: "Fuqarolar parlamentga qanday murojaat qilishlari mumkin?",
      answer: "Fuqarolar o'z deputatlari va senatorlariga yozma va og'zaki murojaat qilishlari mumkin. Shuningdek, parlament rasmiy veb-sayti orqali elektron murojaat yuborish imkoniyati mavjud.",
      helpful: 29,
      notHelpful: 4,
      popular: false
    },
    {
      id: "5",
      category: "parlament",
      question: "Parlament yig'ilishlari qachon o'tkaziladi?",
      answer: "Parlament sessiyalari yiliga ikki marta o'tkaziladi: mart-iyun va sentyabr-dekabr oylarida. Favqulodda sessiyalar zarurat tug'ilganda chaqirilishi mumkin.",
      helpful: 33,
      notHelpful: 2,
      popular: false
    },
    {
      id: "6",
      category: "qonunlar",
      question: "Qonunlarning kuchi qachondan boshlanadi?",
      answer: "Qonunlar rasmiy e'lon qilingan kundan boshlab yoki qonunda ko'rsatilgan muddatdan keyin kuchga kiradi. Odatda bu 10 kundan keyin amalga oshiriladi.",
      helpful: 41,
      notHelpful: 3,
      popular: false
    },
    {
      id: "7",
      category: "saylovlar",
      question: "Parlament a'zosi bo'lish uchun qanday talablar mavjud?",
      answer: "Deputat bo'lish uchun 25 yosh, senator bo'lish uchun 30 yosh to'lgan, oliy ma'lumotli, O'zbekiston fuqarosi bo'lish va oxirgi 5 yil ichida O'zbekistonda yashash zarur.",
      helpful: 36,
      notHelpful: 1,
      popular: false
    },
    {
      id: "8",
      category: "huquqlar",
      question: "Parlament a'zolarining daxlsizligi nimani anglatadi?",
      answer: "Deputat va senatorlar o'z faoliyatlari uchun jinoiy javobgarlikka tortilmaydi, hibsga olinmaydi va sud tomonidan jazolash chora-tadbirlari qo'llanilmaydi (parlament roziligi bo'lmasa).",
      helpful: 28,
      notHelpful: 5,
      popular: false
    }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === "barchasi" || item.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqItems.filter(item => item.popular);

  const handleHelpfulVote = (faqId: string, vote: 'up' | 'down') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: prev[faqId] === vote ? null : vote
    }));
    
    if (vote === 'up') {
      toast.success("Rahmat! Sizning javobingiz hisobga olinadi");
    } else {
      toast.info("Javobni yaxshilash uchun javobingiz qabul qilindi");
    }
  };

  const handleContactSupport = () => {
    toast.info("Qo'llab-quvvatlash xizmati bilan bog'lanish...");
    onNavigate("chatbot");
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
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
          <h1 className="font-medium text-white">Ko'p beriladigan savollar</h1>
          <div className="w-10" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Savollar ichida qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-2xl"
          />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Categories */}
        <div>
          <h2 className="font-medium text-gray-900 mb-4">Bo'limlar</h2>
          <div className="grid grid-cols-2 gap-3">
            {faqCategories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`h-auto p-4 justify-start rounded-2xl ${
                    selectedCategory === category.id 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      selectedCategory === category.id 
                        ? "bg-white/20" 
                        : "bg-blue-50"
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        selectedCategory === category.id 
                          ? "text-white" 
                          : "text-blue-600"
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className={`text-xs ${
                        selectedCategory === category.id 
                          ? "text-white/70" 
                          : "text-gray-500"
                      }`}>
                        {category.count} savol
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Popular FAQs */}
        {selectedCategory === "barchasi" && (
          <div>
            <h2 className="font-medium text-gray-900 mb-4">Mashhur savollar</h2>
            <Accordion type="multiple" className="space-y-3">
              {popularFAQs.map(faq => (
                <AccordionItem key={faq.id} value={faq.id} className="border-0">
                  <Card className="bg-white rounded-2xl border-0 shadow-sm">
                    <CardContent className="p-0">
                      <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-gray-50 rounded-2xl">
                        <div className="flex items-start space-x-3 text-left">
                          <Badge className="bg-orange-100 text-orange-700 text-xs">
                            Mashhur
                          </Badge>
                          <span className="font-medium text-gray-900">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-600 mb-4">{faq.answer}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Bu javob foydali bo'ldimi?
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleHelpfulVote(faq.id, 'up')}
                                className={`w-8 h-8 rounded-full p-0 ${
                                  helpfulVotes[faq.id] === 'up' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'text-gray-400 hover:text-green-600'
                                }`}
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </Button>
                              <span className="text-sm text-gray-500">{faq.helpful}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleHelpfulVote(faq.id, 'down')}
                                className={`w-8 h-8 rounded-full p-0 ${
                                  helpfulVotes[faq.id] === 'down' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'text-gray-400 hover:text-red-600'
                                }`}
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </Button>
                              <span className="text-sm text-gray-500">{faq.notHelpful}</span>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </CardContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* All FAQs */}
        <div>
          <h2 className="font-medium text-gray-900 mb-4">
            {selectedCategory === "barchasi" ? "Barcha savollar" : 
             faqCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          
          <Accordion type="multiple" className="space-y-3">
            {filteredFAQs.map(faq => (
              <AccordionItem key={faq.id} value={faq.id} className="border-0">
                <Card className="bg-white rounded-2xl border-0 shadow-sm">
                  <CardContent className="p-0">
                    <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-gray-50 rounded-2xl">
                      <span className="font-medium text-gray-900 text-left">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-600 mb-4">{faq.answer}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Bu javob foydali bo'ldimi?
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleHelpfulVote(faq.id, 'up')}
                              className={`w-8 h-8 rounded-full p-0 ${
                                helpfulVotes[faq.id] === 'up' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'text-gray-400 hover:text-green-600'
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <span className="text-sm text-gray-500">{faq.helpful}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleHelpfulVote(faq.id, 'down')}
                              className={`w-8 h-8 rounded-full p-0 ${
                                helpfulVotes[faq.id] === 'down' 
                                  ? 'bg-red-100 text-red-600' 
                                  : 'text-gray-400 hover:text-red-600'
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                            <span className="text-sm text-gray-500">{faq.notHelpful}</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </CardContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <Card className="bg-blue-50 rounded-2xl border-0">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Javobingizni topa olmadingizmi?</h3>
            <p className="text-gray-600 mb-4">
              Bizning qo'llab-quvvatlash jamoasi sizga yordam berishga tayyor
            </p>
            <Button 
              onClick={handleContactSupport}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Yordam so'rash
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}