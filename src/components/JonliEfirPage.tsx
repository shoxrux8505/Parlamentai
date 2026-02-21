import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Play, 
  Calendar, 
  Clock, 
  Users, 
  Eye,
  Bell,
  BellOff,
  Share2,
  Radio,
  Video,
  Mic
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface JonliEfirPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function JonliEfirPage({ onBack, onNavigate }: JonliEfirPageProps) {
  const [notifications, setNotifications] = useState<string[]>([]);

  const currentLive = {
    id: "live-1",
    title: "Parlament majlisi jonli translyatsiyasi",
    description: "Bugungi kun davomida parlament palatalari yig'ilishi bo'lib o'tadi. Muhim qonun loyihalari muhokama qilinadi.",
    startTime: "14:00",
    duration: "2 soat",
    viewers: 15420,
    status: "live",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop",
    category: "Majlis yig'ilishi"
  };

  const upcomingBroadcasts = [
    {
      id: "upcoming-1",
      title: "Qonun loyihasi bo'yicha komissiya majlisi",
      description: "Yangi ta'lim qonuni loyihasi bo'yicha muhokama",
      date: "2024-01-15",
      time: "10:00",
      duration: "1.5 soat",
      category: "Komissiya",
      thumbnail: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=300&h=200&fit=crop",
      status: "scheduled"
    },
    {
      id: "upcoming-2", 
      title: "Fuqarolar bilan uchrashuv",
      description: "Parlament a'zolarining saylovchilar bilan onlayn uchrashvi",
      date: "2024-01-16",
      time: "15:30",
      duration: "45 daqiqa",
      category: "Uchrashuv",
      thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300&h=200&fit=crop",
      status: "scheduled"
    },
    {
      id: "upcoming-3",
      title: "Iqtisodiy masalalar bo'yicha munozara",
      description: "Joriy yil byudjeti va iqtisodiy istiqbollar muhokamasi",
      date: "2024-01-18",
      time: "11:00", 
      duration: "2 soat",
      category: "Munozara",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      status: "scheduled"
    }
  ];

  const pastBroadcasts = [
    {
      id: "past-1",
      title: "O'tgan hafta parlament sessiyasi",
      description: "Davlat byudjeti va ijtimoiy dasturlar muhokamasi",
      date: "2024-01-10",
      duration: "3 soat",
      views: 28500,
      category: "Sessiya",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
      status: "completed"
    },
    {
      id: "past-2",
      title: "Konstitutsiyaviy o'zgarishlar bo'yicha munozara", 
      description: "Konstitutsiyaga kiritilayotgan o'zgarishlar muhokamasi",
      date: "2024-01-08",
      duration: "2.5 soat",
      views: 45200,
      category: "Munozara",
      thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop",
      status: "completed"
    }
  ];

  const handleNotificationToggle = (broadcastId: string) => {
    if (notifications.includes(broadcastId)) {
      setNotifications(notifications.filter(id => id !== broadcastId));
      toast.success("Bildirishnoma o'chirildi");
    } else {
      setNotifications([...notifications, broadcastId]);
      toast.success("Bildirishnoma yoqildi");
    }
  };

  const handleShare = (broadcast: any) => {
    toast.info(`"${broadcast.title}" ulashildi`);
  };

  const handleWatchLive = () => {
    toast.info("Jonli efir ochilmoqda...");
  };

  const handleWatchRecording = (broadcast: any) => {
    toast.info(`"${broadcast.title}" yozuvi ochilmoqda...`);
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
          <h1 className="font-medium text-white">Jonli efir</h1>
          <div className="w-10" />
        </div>

        {/* Live Status */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
            <Radio className="w-4 h-4" />
            <span className="text-sm font-medium">JONLI</span>
          </div>
          <div className="flex items-center space-x-1 text-white/80">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{currentLive.viewers.toLocaleString()} tomoshabin</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Current Live Broadcast */}
        <div>
          <h2 className="font-medium text-gray-900 mb-4">Hozir efirda</h2>
          <Card className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <ImageWithFallback
                  src={currentLive.thumbnail}
                  alt={currentLive.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    onClick={handleWatchLive}
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-2 border-white/50 rounded-full w-16 h-16 p-0"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 text-white animate-pulse">
                    JONLI
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center space-x-2">
                  <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{currentLive.viewers.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {currentLive.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{currentLive.startTime} dan</span>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-2">{currentLive.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{currentLive.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span>{currentLive.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleNotificationToggle(currentLive.id)}
                      className="w-8 h-8 text-gray-400 hover:text-gray-600 rounded-full p-0"
                    >
                      {notifications.includes(currentLive.id) ? (
                        <Bell className="w-4 h-4" />
                      ) : (
                        <BellOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleShare(currentLive)}
                      className="w-8 h-8 text-gray-400 hover:text-gray-600 rounded-full p-0"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Broadcasts */}
        <div>
          <h2 className="font-medium text-gray-900 mb-4">Kelgusi efirlar</h2>
          <div className="space-y-4">
            {upcomingBroadcasts.map(broadcast => (
              <Card key={broadcast.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="relative w-24 h-16 flex-shrink-0">
                      <ImageWithFallback
                        src={broadcast.thumbnail}
                        alt={broadcast.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {broadcast.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                          Rejalashtirilgan
                        </Badge>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                        {broadcast.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {broadcast.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{broadcast.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{broadcast.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mic className="w-3 h-3" />
                            <span>{broadcast.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleNotificationToggle(broadcast.id)}
                            className="w-6 h-6 text-gray-400 hover:text-gray-600 rounded-full p-0"
                          >
                            {notifications.includes(broadcast.id) ? (
                              <Bell className="w-3 h-3" />
                            ) : (
                              <BellOff className="w-3 h-3" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleShare(broadcast)}
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

        {/* Past Broadcasts */}
        <div>
          <h2 className="font-medium text-gray-900 mb-4">Arxiv yozuvlar</h2>
          <div className="space-y-4">
            {pastBroadcasts.map(broadcast => (
              <Card key={broadcast.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="relative w-24 h-16 flex-shrink-0">
                      <ImageWithFallback
                        src={broadcast.thumbnail}
                        alt={broadcast.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                        <Button
                          size="sm"
                          onClick={() => handleWatchRecording(broadcast)}
                          className="w-6 h-6 bg-white/80 hover:bg-white text-gray-900 rounded-full p-0"
                        >
                          <Play className="w-3 h-3 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {broadcast.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                          Arxiv
                        </Badge>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                        {broadcast.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {broadcast.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{broadcast.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{broadcast.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{broadcast.views.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleShare(broadcast)}
                          className="w-6 h-6 text-gray-400 hover:text-gray-600 rounded-full p-0"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
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