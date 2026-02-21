import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  Search, 
  FileText, 
  Calendar, 
  Users,
  Scale,
  Shield,
  BookOpen,
  Gavel,
  Building2,
  Briefcase,
  Home,
  Heart,
  Zap,
  Bookmark,
  BookmarkCheck,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface QonunchilikPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function QonunchilikPage({ onBack, onNavigate }: QonunchilikPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [savedLaws, setSavedLaws] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const categories = [
    "Barchasi", 
    "Asosiy qonunlar", 
    "Kodekslar", 
    "Fuqarolik huquqi", 
    "Jinoyat huquqi", 
    "Ma'muriy huquq",
    "Mehnat huquqi",
    "Oila huquqi",
    "Iqtisodiy qonunlar"
  ];

  const lawCategories = [
    {
      id: 1,
      title: "Konstitutsiya va asosiy qonunlar",
      description: "Davlat tuzilishi va asosiy huquqlar to'g'risida",
      icon: Shield,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      count: 15,
      laws: [
        "O'zbekiston Respublikasi Konstitutsiyasi",
        "Konstitutsiyaviy sud to'g'risida qonun",
        "Davlat hokimiyati mahalliy organlari to'g'risida qonun",
        "Prezident saylovlari to'g'risida qonun",
        "Oliy Majlis saylovlari to'g'risida qonun"
      ]
    },
    {
      id: 2,
      title: "Kodekslar",
      description: "Asosiy kodeks hujjatlari",
      icon: BookOpen,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      count: 12,
      laws: [
        "Fuqarolik kodeksi",
        "Jinoyat kodeksi",
        "Ma'muriy javobgarlik to'g'risida kodeks",
        "Mehnat kodeksi",
        "Oila kodeksi",
        "Soliq kodeksi",
        "Tashqi iqtisodiy faoliyat kodeksi"
      ]
    },
    {
      id: 3,
      title: "Fuqarolik huquqi",
      description: "Fuqarolarning shaxsiy va mulkiy huquqlari",
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      count: 28,
      laws: [
        "Fuqarolik to'g'risida qonun",
        "Mulk huquqi to'g'risida qonun",
        "Notarial faoliyat to'g'risida qonun",
        "Advokatlik to'g'risida qonun",
        "Arbitraj sudlari to'g'risida qonun"
      ]
    },
    {
      id: 4,
      title: "Jinoyat huquqi",
      description: "Jinoyat va jazo huquqi masalalari",
      icon: Gavel,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      count: 18,
      laws: [
        "Jinoyat kodeksi",
        "Jinoyat-ijro'iya kodeksi",
        "Jinoyat protsessual kodeksi",
        "Prokuratura to'g'risida qonun",
        "Ichki ishlar organlari to'g'risida qonun"
      ]
    },
    {
      id: 5,
      title: "Iqtisodiy qonunlar",
      description: "Tadbirkorlik va iqtisodiy faoliyat",
      icon: Briefcase,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      count: 35,
      laws: [
        "Tadbirkorlik faoliyati erkinligi kafolatlari to'g'risida qonun",
        "Raqobat to'g'risida qonun",
        "Aksiyadorlik jamiyatlari to'g'risida qonun",
        "Banklar va bank faoliyati to'g'risida qonun",
        "Kapital bozori to'g'risida qonun"
      ]
    },
    {
      id: 6,
      title: "Mehnat huquqi",
      description: "Mehnat munosabatlari va ijtimoiy himoya",
      icon: Building2,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-100",
      count: 22,
      laws: [
        "Mehnat kodeksi",
        "Mehnat muhofazasi to'g'risida qonun",
        "Kasaba uyushmalari to'g'risida qonun",
        "Pensiya ta'minoti to'g'risida qonun",
        "Aholini bandlik to'g'risida qonun"
      ]
    },
    {
      id: 7,
      title: "Oila huquqi",
      description: "Oila munosabatlari va bolalar huquqlari",
      icon: Heart,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
      count: 14,
      laws: [
        "Oila kodeksi",
        "Bolalar huquqlarini himoya qilish to'g'risida qonun",
        "Nikoh va oila to'g'risida qonun",
        "Farzand asrab olish to'g'risida qonun",
        "Voyaga etmaganlarni himoya qilish to'g'risida qonun"
      ]
    },
    {
      id: 8,
      title: "Ta'lim va madaniyat",
      description: "Ta'lim tizimi va madaniy merosi",
      icon: Home,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      count: 19,
      laws: [
        "Ta'lim to'g'risida qonun",
        "Madaniy meros to'g'risida qonun",
        "Til to'g'risida davlat qonuni",
        "Kitob to'g'risida qonun",
        "Sport to'g'risida qonun"
      ]
    },
    {
      id: 9,
      title: "Raqamli texnologiyalar",
      description: "IT va raqamlashtirish qonunlari",
      icon: Zap,
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-100",
      count: 8,
      laws: [
        "Raqamli iqtisodiyotni rivojlantirish to'g'risida qonun",
        "Elektron tijorat to'g'risida qonun",
        "Elektron hukumat to'g'risida qonun",
        "Axborot xavfsizligi to'g'risida qonun",
        "Shaxsiy ma'lumotlarni himoya qilish to'g'risida qonun"
      ]
    }
  ];

  const recentUpdates = [
    {
      id: 1,
      title: "Raqamli iqtisodiyotni rivojlantirish to'g'risida yangi qonun",
      date: "15 yanvar 2024",
      type: "Yangi qonun",
      status: "Qabul qilindi"
    },
    {
      id: 2,
      title: "Mehnat kodeksiga o'zgarishlar",
      date: "28 dekabr 2023",
      type: "O'zgartirish",
      status: "Kuchga kirdi"
    },
    {
      id: 3,
      title: "Soliq kodeksiga qo'shimchalar",
      date: "20 dekabr 2023",
      type: "Qo'shimcha",
      status: "Ko'rib chiqilmoqda"
    }
  ];

  const filteredCategories = lawCategories.filter(category => {
    if (selectedCategory === "Barchasi") return true;
    return category.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
           category.laws.some(law => law.toLowerCase().includes(selectedCategory.toLowerCase()));
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Qabul qilindi":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Kuchga kirdi":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Ko'rib chiqilmoqda":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleSaveLaw = (categoryId: number, categoryTitle: string) => {
    if (savedLaws.includes(categoryId)) {
      setSavedLaws(savedLaws.filter(id => id !== categoryId));
      toast.success(`"${categoryTitle}" saqlangan qonunlardan o'chirildi`);
    } else {
      setSavedLaws([...savedLaws, categoryId]);
      toast.success(`"${categoryTitle}" saqlangan qonunlarga qo'shildi`);
    }
  };

  const toggleCategoryExpansion = (categoryId: number) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const isLawSaved = (categoryId: number) => savedLaws.includes(categoryId);
  const isCategoryExpanded = (categoryId: number) => expandedCategories.includes(categoryId);

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
          <h1 className="text-lg font-medium text-white">O'zbekiston qonunlari</h1>
          <div className="w-10"></div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
          <Input
            type="text"
            placeholder="Qonunlar ichida qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white/20 border-0 rounded-2xl text-white placeholder:text-white/70 focus:bg-white/30"
          />
        </div>

        {/* Info Section */}
        <div className="mb-4">
          <h2 className="text-white font-medium mb-1">Qonunchilik ma'lumotlari</h2>
          <p className="text-white/90 text-sm">O'zbekiston Respublikasining barcha qonunlari va kodekslari</p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="px-6 py-4">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full ${
                selectedCategory === category 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-card text-foreground border border-border hover:bg-accent"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Law Categories */}
      <div className="px-6 pb-4">
        <h3 className="font-semibold text-foreground mb-4">Qonun turlari</h3>
        <div className="space-y-3">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="bg-card border-0 shadow-sm rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${category.iconBg} dark:bg-opacity-20 rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${category.iconColor} dark:opacity-80`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{category.title}</h4>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                          {category.count} qonun
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {category.laws.slice(0, isCategoryExpanded(category.id) ? category.laws.length : 3).map((law, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Scale className="w-3 h-3 text-muted-foreground mr-2" />
                            <span className="text-foreground">{law}</span>
                          </div>
                        ))}
                        {!isCategoryExpanded(category.id) && category.laws.length > 3 && (
                          <p className="text-xs text-muted-foreground pl-5">
                            +{category.laws.length - 3} qo'shimcha qonun
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={isLawSaved(category.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSaveLaw(category.id, category.title)}
                          className={`flex items-center space-x-1 text-xs h-8 px-3 ${
                            isLawSaved(category.id) 
                              ? "bg-blue-600 text-white hover:bg-blue-700" 
                              : "border-border hover:bg-accent"
                          }`}
                        >
                          {isLawSaved(category.id) ? (
                            <BookmarkCheck className="w-3 h-3" />
                          ) : (
                            <Bookmark className="w-3 h-3" />
                          )}
                          <span>{isLawSaved(category.id) ? "Saqlangan" : "Saqlash"}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCategoryExpansion(category.id)}
                          className="flex items-center space-x-1 text-xs h-8 px-3 border-border hover:bg-accent"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{isCategoryExpanded(category.id) ? "Kamroq" : "Batafsil"}</span>
                          {isCategoryExpanded(category.id) ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="px-6 pb-6">
        <h3 className="font-semibold text-foreground mb-4">So'nggi yangilanishlar</h3>
        <div className="space-y-3">
          {recentUpdates.map((update) => (
            <Card key={update.id} className="bg-card border-0 shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{update.title}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{update.date}</span>
                      <span className="text-xs text-muted-foreground">• {update.type}</span>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(update.status)}`}>
                      {update.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="px-6 pb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-0 rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Qonunchilik statistikasi</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">180+</div>
                <div className="text-sm text-muted-foreground">Qonunlar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">25+</div>
                <div className="text-sm text-muted-foreground">Kodekslar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">15</div>
                <div className="text-sm text-muted-foreground">Yangi qonunlar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">8</div>
                <div className="text-sm text-muted-foreground">O'zgarishlar</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}