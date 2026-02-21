import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { 
  ArrowLeft, 
  Edit3, 
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Clock,
  Calendar
} from "lucide-react";

interface ProfilePageProps {
  currentUser: any;
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function ProfilePage({ currentUser, onBack, onNavigate }: ProfilePageProps) {
  // Mock consultation history data
  const consultationHistory = [
    {
      id: 1,
      lawyerName: "Aliya Karimova",
      specialty: "Mehnat huquqi",
      date: "15.03.2024",
      duration: "45 daqiqa"
    },
    {
      id: 2,
      lawyerName: "Ruslan Yusupov",
      specialty: "Oila huquqi", 
      date: "12.03.2024",
      duration: "30 daqiqa"
    },
    {
      id: 3,
      lawyerName: "Nigora Rahimova",
      specialty: "Korporativ huquq",
      date: "08.03.2024", 
      duration: "60 daqiqa"
    }
  ];

  const languages = [
    { code: 'uz', label: 'UZ', active: true },
    { code: 'ru', label: 'RU', active: false },
    { code: 'en', label: 'EN', active: false }
  ];

  return (
    <div className="bg-gray-50 dark:bg-black">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 dark:bg-gradient-to-br dark:from-[#2c3e50] dark:to-[#1a1a1a] px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-white">Mening profilim</h1>
          <div className="w-10"></div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-white">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
            <AvatarFallback className="bg-white text-blue-600 font-medium">
              AK
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-white font-medium text-lg mb-1">Anvar Karimov</h2>
            <p className="text-white/90 text-sm mb-1">+998 90 123 45 67</p>
            <p className="text-white/90 text-sm">anvar.karimov@email.com</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="px-6 -mt-4 mb-6">
        <Card className="bg-white dark:bg-gray-800 border-0 dark:border-gray-700 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-auto p-0 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => onNavigate("edit-profile")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="font-medium">Profilni tahrirlash</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Consultation History */}
      <div className="px-6 mb-6">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Maslаhatlar tarixi</h3>
        <div className="space-y-3">
          {consultationHistory.map((consultation) => (
            <Card key={consultation.id} className="bg-white dark:bg-gray-800 border-0 dark:border-gray-700 shadow-sm rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{consultation.lawyerName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{consultation.specialty}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{consultation.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{consultation.duration}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-6 pb-6">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Sozlamalar</h3>
        
        {/* Notifications */}
        <Card className="bg-white dark:bg-gray-800 border-0 dark:border-gray-700 shadow-sm rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Bildirishnomalar</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Push-bildirishnomalar va SMS</p>
                </div>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Interface/Language */}
        <Card className="bg-white dark:bg-gray-800 border-0 dark:border-gray-700 shadow-sm rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Interfeys</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tilni tanlang</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 ml-13">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={lang.active ? "default" : "outline"}
                  size="sm"
                  className={`h-8 px-3 ${
                    lang.active 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 24/7 Support */}
        <Card className="bg-white dark:bg-gray-800 border-0 dark:border-gray-700 shadow-sm rounded-2xl mb-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">24/7 qo'llab-quvvatlash</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Yordam va fikr-mulohaza</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card className="bg-white dark:bg-gray-800 border-0 dark:border-gray-700 shadow-sm rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400">Hisobdan chiqish</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Joriy seansni tugatish</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}