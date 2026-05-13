import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  Heart,
  Clock,
  CheckCircle,
  X,
  Phone,
  Mail,
  Share2,
  ShieldCheck,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";
import { LawyerDetailModal } from "./LawyerDetailModal";

interface ServicesCatalogPageProps {
  services: any[];
  onBack: () => void;
  onNavigate: (view: string) => void;
  onSelectService: (service: any) => void;
  favoriteServices: any[];
  onAddToFavorites: (service: any) => void;
  onRemoveFromFavorites: (serviceId: number) => void;
}

export function ServicesCatalogPage({
  services,
  onBack,
  onNavigate,
  onSelectService,
  favoriteServices,
  onAddToFavorites,
  onRemoveFromFavorites
}: ServicesCatalogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);

  const categories = [
    "Barchasi", 
    "Oila huquqi", 
    "Mehnat huquqi", 
    "Mulk huquqi", 
    "Jinoiy huquq",
    "Biznes huquqi"
  ];

  const lawyers = [
    {
      id: 1,
      name: "Aliya Karimova",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face",
      department: "Oila huquqi",
      rating: 4.9,
      experience: "8 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 90 123 45 67",
      email: "a.karimova@law.uz",
      type: "Professional",
      description: "Oila nizolari, ajralish va bola huquqlari bo'yicha mutaxassis"
    },
    {
      id: 2,
      name: "Bobur Toshmatov", 
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      department: "Biznes huquqi",
      rating: 4.8,
      experience: "12 yil",
      availability: "Band",
      online: false,
      phone: "+998 91 234 56 78",
      email: "b.toshmatov@law.uz",
      type: "Senior Expert",
      description: "Korporativ huquq va biznes shartnomalar bo'yicha ekspert"
    },
    {
      id: 3,
      name: "Nigora Rahimova",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", 
      department: "Mulk huquqi",
      rating: 4.7,
      experience: "6 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 93 345 67 89",
      email: "n.rahimova@law.uz",
      type: "Legal Consultant",
      description: "Ko'chmas mulk va meros masalalari bo'yicha maslahatchi"
    },
    {
      id: 4,
      name: "Ruslan Yusupov",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
      department: "Mehnat huquqi", 
      rating: 4.6,
      experience: "10 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 94 456 78 90",
      email: "r.yusupov@law.uz",
      type: "Professional",
      description: "Mehnat nizolari va xodimlar huquqlari bo'yicha yurist"
    },
    {
      id: 5,
      name: "Murod Nazarov",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
      department: "Jinoiy huquq",
      rating: 4.9,
      experience: "15 yil", 
      availability: "Mavjud",
      online: true,
      phone: "+998 97 567 89 01",
      email: "m.nazarov@law.uz",
      type: "Defense Attorney",
      description: "Jinoiy ishlar va sud jarayonlari bo'yicha tajribali yurist"
    }
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Barchasi" || lawyer.department === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isFavorite = (lawyerId: number) => {
    return favoriteServices.some(s => s.id === lawyerId);
  };

  const handleFavoriteToggle = (lawyer: any) => {
    if (isFavorite(lawyer.id)) {
      onRemoveFromFavorites(lawyer.id);
    } else {
      onAddToFavorites(lawyer);
    }
  };

  const handleShare = (lawyer: any) => {
    if (navigator.share) {
      navigator.share({
        title: lawyer.name,
        text: `${lawyer.name} - ${lawyer.department} mutaxassisi`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast.success("Profil havolasi nusxalandi!");
    }
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
          <h1 className="text-lg font-medium text-white">Yuristlar</h1>
          <div className="w-10"></div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
          <Input
            type="text"
            placeholder="Yurist qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white/20 backdrop-blur-sm border-0 rounded-2xl placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {/* Info */}
        <div className="mb-4">
          <h2 className="text-white font-medium mb-1">Professional yuristlar</h2>
          <p className="text-white/90 text-sm">Tajribali mutaxassislardan yordam oling</p>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-4">
        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full text-sm ${
                selectedCategory === category 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 py-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredLawyers.length} yurist mavjud
        </p>
      </div>

      {/* Lawyers List */}
      <div className="px-6 pb-20">
        <div className="space-y-4">
          {filteredLawyers.map((lawyer) => (
            <Card 
              key={lawyer.id} 
              className="bg-white dark:bg-gray-800 rounded-3xl border-0 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
              onClick={() => setSelectedLawyer(lawyer)}
            >
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-[1.8rem] overflow-hidden shadow-inner">
                      <img 
                        src={lawyer.photo} 
                        alt={lawyer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-4 border-white dark:border-gray-800 rounded-full ${
                      lawyer.online ? "bg-green-500" : "bg-orange-500"
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-0.5">
                          {lawyer.name}
                        </h4>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{lawyer.department}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(lawyer);
                        }}
                        className="p-2 h-auto rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            isFavorite(lawyer.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-gray-400"
                          }`} 
                        />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">{lawyer.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs font-medium">{lawyer.experience}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-bold text-xs"
                      >
                        Batafsil
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20"
                      >
                        Yozilish
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lawyer Detail Modal */}
      <LawyerDetailModal
        lawyer={selectedLawyer}
        isOpen={!!selectedLawyer}
        onClose={() => setSelectedLawyer(null)}
        isFavorite={selectedLawyer ? favoriteServices.some(s => s.id === selectedLawyer.id) : false}
        onToggleFavorite={handleFavoriteToggle}
        onBook={(l) => {
          onSelectService(l);
          onNavigate("service-booking");
        }}
      />
    </div>
  );
}