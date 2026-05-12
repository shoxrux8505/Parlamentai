import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NotificationDropdown } from "./NotificationDropdown";
import { 
  Menu, 
  Bell, 
  Search, 
  Calendar, 
  FileText, 
  Users, 
  MessageSquare,
  Heart,
  Star,
  Clock,
  ChevronRight,
  User,
  Scale,
  Home,
  Bot
} from "lucide-react";
import parlamentLogo from "../assets/c998fc552b7b40f39fda694ac3c0aad18cb7b674.png";

interface DashboardPageProps {
  currentUser: any;
  services: any[];
  onNavigate: (view: string) => void;
  onSelectService: (service: any) => void;
  favoriteServices: any[];
  onAddToFavorites: (service: any) => void;
  onRemoveFromFavorites: (serviceId: number) => void;
}

export function DashboardPage({ 
  currentUser, 
  services, 
  onNavigate, 
  onSelectService,
  favoriteServices,
  onAddToFavorites,
  onRemoveFromFavorites
}: DashboardPageProps) {
  
  const isFavorite = (serviceId: number) => {
    return favoriteServices.some(s => s.id === serviceId);
  };

  const handleFavoriteToggle = (service: any) => {
    if (isFavorite(service.id)) {
      onRemoveFromFavorites(service.id);
    } else {
      onAddToFavorites(service);
    }
  };

  return (
    <div className="bg-background min-h-full pb-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-[#2c3e50] dark:to-[#1a1a1a] px-6 md:px-10 pt-12 md:pt-16 pb-8 md:rounded-b-3xl shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src={parlamentLogo} alt="Parlament AI" className="h-10 object-contain" />
            </div>
            <div className="flex items-center space-x-4">
              <NotificationDropdown className="w-10 h-10 text-white hover:bg-white/10 rounded-lg flex items-center justify-center cursor-pointer transition-colors" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("profile")}
                className="w-10 h-10 text-white hover:bg-white/10"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-1">
              Salom, Anvar!
            </h2>
            <p className="text-white/90 text-sm">Bugun sizga qanday yordam beramiz?</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Huquqiy savolingizni kiriting..."
              className="w-full h-12 px-4 bg-white/20 backdrop-blur-sm border-0 rounded-2xl placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4">
          <Card className="bg-card rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Tezkor amallar</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div 
                  className="flex flex-col items-center cursor-pointer p-4 rounded-2xl hover:bg-secondary transition-colors"
                  onClick={() => onNavigate("services")}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-foreground">Yurist topish</span>
                </div>
                <div 
                  className="flex flex-col items-center cursor-pointer p-4 rounded-2xl hover:bg-secondary transition-colors"
                  onClick={() => onNavigate("consultation")}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm text-foreground">Maslahat</span>
                </div>
                <div 
                  className="flex flex-col items-center cursor-pointer p-4 rounded-2xl hover:bg-secondary transition-colors"
                  onClick={() => onNavigate("qonunchilik")}
                >
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mb-3">
                    <Scale className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-sm text-foreground">Qonunchilik</span>
                </div>
                <div 
                  className="flex flex-col items-center cursor-pointer p-4 rounded-2xl hover:bg-secondary transition-colors"
                  onClick={() => onNavigate("chatbot")}
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-3">
                    <Bot className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-sm text-foreground">Chatbot AI</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* News/Updates Section */}
        <div className="px-6 mb-4">
          <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 rounded-3xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Qonunchilikda yangi o'zgarishlar</h4>
                    <p className="text-sm text-muted-foreground">1-yanvardan Oila kodeksiga o'zgarishlar kiritildi</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Lawyers */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Tavsiya etilgan yuristlar</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate("services")}
              className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Barcha yuristlar
            </Button>
          </div>

          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 pb-6">
            <Card className="bg-card rounded-3xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="font-semibold text-foreground">Aliya Karimova</h4>
                        <p className="text-sm text-muted-foreground">Oila huquqi</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFavoriteToggle({id: 999, name: "Aliya Karimova"})}
                        className="p-1 h-auto"
                      >
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>4.6 (127)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>8 yil</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Add more lawyer cards for scrolling demonstration */}
            <Card className="bg-card rounded-3xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
                      <AvatarFallback>BT</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 border-2 border-card rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="font-semibold text-foreground">Bobur Toshmatov</h4>
                        <p className="text-sm text-muted-foreground">Biznes huquqi</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFavoriteToggle({id: 998, name: "Bobur Toshmatov"})}
                        className="p-1 h-auto"
                      >
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>4.8 (203)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>12 yil</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-3xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" />
                      <AvatarFallback>MN</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="font-semibold text-foreground">Murod Nazarov</h4>
                        <p className="text-sm text-muted-foreground">Jinoiy huquq</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFavoriteToggle({id: 997, name: "Murod Nazarov"})}
                        className="p-1 h-auto"
                      >
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>4.9 (156)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>15 yil</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}