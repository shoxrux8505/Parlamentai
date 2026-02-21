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
  CheckCircle
} from "lucide-react";

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

  const categories = [
    "Barchasi", 
    "Oila huquqi", 
    "Mehnat huquqi", 
    "Mulk huquqi", 
    "Jinoiy huquq",
    "Biznes huquqi"
  ];

  // Mock lawyers data since we're adapting to government services
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

  return (
    <div className="bg-gray-50 dark:bg-black">
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
        <div className="flex space-x-3 overflow-x-auto pb-2">
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
      <div className="px-6 pb-6">
        <div className="space-y-3">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden">
                      <img 
                        src={lawyer.photo} 
                        alt={lawyer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${
                      lawyer.online ? "bg-green-500" : "bg-orange-500"
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {lawyer.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lawyer.department}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFavoriteToggle(lawyer)}
                        className="p-1 h-auto"
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

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {lawyer.description}
                    </p>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{lawyer.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{lawyer.experience}</span>
                      </div>
                      <div className="flex items-center">
                        {lawyer.online ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-orange-500" />
                        )}
                        <span className="text-sm ml-1 text-gray-600 dark:text-gray-400">
                          {lawyer.availability}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-9 rounded-xl border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        Batafsil
                      </Button>
                      <Button
                        onClick={() => {
                          onSelectService(lawyer);
                          onNavigate("service-booking");
                        }}
                        size="sm"
                        className="flex-1 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
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

        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Yurist topilmadi</h3>
            <p className="text-gray-600 dark:text-gray-400">Qidiruv so'zini o'zgartirib ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
}