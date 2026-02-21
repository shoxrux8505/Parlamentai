import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  Filter,
  Search
} from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";

interface YangiliklarPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function YangiliklarPage({ onBack, onNavigate }: YangiliklarPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("barchasi");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedArticles, setSavedArticles] = useState<number[]>([]);

  const newsCategories = [
    { id: "barchasi", name: "Barchasi" },
    { id: "qonunchilik", name: "Qonunchilik" },
    { id: "saylovlar", name: "Saylovlar" },
    { id: "majlis", name: "Majlis" },
    { id: "xalqaro", name: "Xalqaro" },
    { id: "iqtisodiyot", name: "Iqtisodiyot" }
  ];

  const newsArticles = [
    {
      id: 1,
      title: "Yangi qonun loyihasi parlament komissiyasida muhokama qilindi",
      summary: "Raqamli iqtisodiyot rivojlantirish bo'yicha qonun loyihasi....",
      category: "qonunchilik",
      categoryName: "Qonunchilik",
      readTime: "5 daqiqa",
      views: 1250,
      publishedAt: "2 soat oldin",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Parlament a'zolari fuqarolar bilan uchrashuv o'tkazdi",
      summary: "Bugungi kunda parlament a'zolari saylovchilar bilan...",
      category: "majlis",
      categoryName: "Majlis",
      readTime: "3 daqiqa",
      views: 890,
      publishedAt: "4 soat oldin",
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=300&h=200&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Yangi saylov qoidalari tasdiqlanishi kutilmoqda",
      summary: "Saylov tizimini isloh qilish bo'yicha taklif...",
      category: "saylovlar",
      categoryName: "Saylovlar",
      readTime: "7 daqiqa",
      views: 2100,
      publishedAt: "6 soat oldin",
      image: "https://images.unsplash.com/photo-1541872725-2d0d211adfcf?w=300&h=200&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "Xalqaro hamkorlik shartnomasi imzolandi",
      summary: "O'zbekiston va qo'shni davlatlar o'rtasida...",
      category: "xalqaro",
      categoryName: "Xalqaro",
      readTime: "4 daqiqa",
      views: 1650,
      publishedAt: "1 kun oldin",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Iqtisodiy islohlar parlament tomonidan ko'rib chiqildi",
      summary: "Kichik biznes va tadbirkorlikni qo'llab-quvvatlash...",
      category: "iqtisodiyot",
      categoryName: "Iqtisodiyot",
      readTime: "6 daqiqa",
      views: 980,
      publishedAt: "2 kun oldin",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      featured: false
    }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "barchasi" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsArticles.filter(article => article.featured);

  const handleSaveArticle = (articleId: number) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
      toast.success("Maqola saqlangandaalar ro'yxatidan olib tashlandi");
    } else {
      setSavedArticles([...savedArticles, articleId]);
      toast.success("Maqola saqlanganlar ro'yxatiga qo'shildi");
    }
  };

  const handleShare = (article: any) => {
    toast.info(`"${article.title}" maqolasi ulashildi`);
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
          <h1 className="font-medium text-white">Yangiliklar</h1>
          <div className="w-10" />
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Yangiliklar ichida qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-2xl"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-white" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {newsCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Featured News */}
        {selectedCategory === "barchasi" && featuredNews.length > 0 && (
          <div>
            <h2 className="font-medium text-gray-900 mb-4">Asosiy yangiliklar</h2>
            <div className="space-y-4">
              {featuredNews.map(article => (
                <Card key={article.id} className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-orange-500 text-white">
                          Asosiy
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSaveArticle(article.id)}
                          className="w-8 h-8 bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 rounded-full p-0"
                        >
                          {savedArticles.includes(article.id) ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.categoryName}
                        </Badge>
                        <span className="text-xs text-gray-500">{article.publishedAt}</span>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{article.summary}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleShare(article)}
                          className="w-8 h-8 text-gray-400 hover:text-gray-600 rounded-full p-0"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All News */}
        <div>
          <h2 className="font-medium text-gray-900 mb-4">
            {selectedCategory === "barchasi" ? "Barcha yangiliklar" : 
             newsCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          
          <div className="space-y-4">
            {filteredNews.map(article => (
              <Card key={article.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      {article.featured && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {article.categoryName}
                        </Badge>
                        <span className="text-xs text-gray-500">{article.publishedAt}</span>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSaveArticle(article.id)}
                            className="w-6 h-6 text-gray-400 hover:text-gray-600 rounded-full p-0"
                          >
                            {savedArticles.includes(article.id) ? (
                              <BookmarkCheck className="w-3 h-3" />
                            ) : (
                              <Bookmark className="w-3 h-3" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleShare(article)}
                            className="w-6 h-6 text-gray-400 hover:text-gray-600 rounded-full p-0"
                          >
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}