import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { useLanguage } from "./LanguageContext";
import { 
  ArrowLeft, 
  User, 
  Radio,
  Vote,
  MessageSquareText,
  HelpCircle,
  Bot,
  Newspaper,
  Building2,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Languages
} from "lucide-react";

interface MenuPageProps {
  currentUser: any;
  onBack: () => void;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function MenuPage({ currentUser, onBack, onNavigate, onLogout, isDarkMode, onToggleDarkMode }: MenuPageProps) {
  const { language, setLanguage, t } = useLanguage();

  const getMenuItemTitle = (id: string) => {
    switch (id) {
      case 'profile': return t('menu.profile');
      case 'live': return t('liveBroadcast.title');
      case 'elections': return t('elections.title');
      case 'suggestions': return t('proposals.title');
      case 'faq': return t('faq.title');
      case 'chatbot': return t('chatbot.title');
      case 'news': return t('news.title');
      case 'sponsors': return t('sponsors.title');
      case 'logout': return t('menu.logout');
      default: return '';
    }
  };

  const getMenuItemDescription = (id: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      uz: {
        profile: "Shaxsiy ma'lumotlar va sozlamalar",
        live: "To'g'ridan-to'g'ri translyatsiyalar",
        elections: "Saylov huquqi va jarayonlari",
        suggestions: "O'z takliflaringizni yuboring",
        faq: "Ko'p beriladigan savollar",
        chatbot: "Sun'iy intellekt yordamchisi",
        news: "So'nggi yangiliklar va ma'lumotlar",
        sponsors: "Parlament homiylar va hamkorlari",
        logout: "Tizimdan xavfsiz chiqish"
      },
      en: {
        profile: "Personal information and settings",
        live: "Live broadcasts and streams",
        elections: "Electoral rights and processes",
        suggestions: "Submit your proposals",
        faq: "Frequently asked questions",
        chatbot: "Artificial intelligence assistant",
        news: "Latest news and updates",
        sponsors: "Parliament sponsors and partners",
        logout: "Safely exit the system"
      },
      ru: {
        profile: "Личная информация и настройки",
        live: "Прямые трансляции",
        elections: "Избирательные права и процессы",
        suggestions: "Отправьте свои предложения",
        faq: "Часто задаваемые вопросы",
        chatbot: "Ассистент на основе ИИ",
        news: "Последние новости и обновления",
        sponsors: "Спонсоры и партнеры парламента",
        logout: "Безопасный выход из системы"
      }
    };
    return descriptions[language][id] || '';
  };

  const menuItems = [
    {
      id: "profile",
      title: getMenuItemTitle("profile"),
      description: getMenuItemDescription("profile"),
      icon: User,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100 dark:bg-blue-900/20",
      action: () => onNavigate("profile")
    },
    {
      id: "live",
      title: getMenuItemTitle("live"),
      description: getMenuItemDescription("live"),
      icon: Radio,
      iconColor: "text-red-600",
      iconBg: "bg-red-100 dark:bg-red-900/20",
      action: () => onNavigate("jonli-efir")
    },
    {
      id: "elections",
      title: getMenuItemTitle("elections"),
      description: getMenuItemDescription("elections"),
      icon: Vote,
      iconColor: "text-green-600",
      iconBg: "bg-green-100 dark:bg-green-900/20",
      action: () => onNavigate("saylovlar")
    },
    {
      id: "suggestions",
      title: getMenuItemTitle("suggestions"),
      description: getMenuItemDescription("suggestions"),
      icon: MessageSquareText,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100 dark:bg-purple-900/20",
      action: () => onNavigate("taklif-berish")
    },
    {
      id: "faq",
      title: getMenuItemTitle("faq"),
      description: getMenuItemDescription("faq"),
      icon: HelpCircle,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
      action: () => onNavigate("faq")
    },
    {
      id: "chatbot",
      title: getMenuItemTitle("chatbot"),
      description: getMenuItemDescription("chatbot"),
      icon: Bot,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100 dark:bg-blue-900/20",
      action: () => onNavigate("chatbot")
    },
    {
      id: "news",
      title: getMenuItemTitle("news"),
      description: getMenuItemDescription("news"),
      icon: Newspaper,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100 dark:bg-orange-900/20",
      action: () => onNavigate("yangiliklar")
    },
    {
      id: "sponsors",
      title: getMenuItemTitle("sponsors"),
      description: getMenuItemDescription("sponsors"),
      icon: Building2,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-100 dark:bg-teal-900/20",
      action: () => onNavigate("sponsors")
    },
    {
      id: "logout",
      title: getMenuItemTitle("logout"),
      description: getMenuItemDescription("logout"),
      icon: LogOut,
      iconColor: "text-red-600",
      iconBg: "bg-red-100 dark:bg-red-900/20",
      action: onLogout
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="bg-card px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-foreground">{t('menu.title')}</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-6 pt-6 space-y-3">
        {/* Language Selector */}
        <Card className="bg-card border-0 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                  <Languages className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {t('menu.language')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'uz' && 'O\'zbekcha'}
                    {language === 'en' && 'English'}
                    {language === 'ru' && 'Русский'}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={language === 'uz' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('uz')}
                  className={`h-8 px-3 text-xs rounded-lg ${language === 'uz' ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  UZ
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className={`h-8 px-3 text-xs rounded-lg ${language === 'en' ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  EN
                </Button>
                <Button
                  variant={language === 'ru' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('ru')}
                  className={`h-8 px-3 text-xs rounded-lg ${language === 'ru' ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  RU
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode Toggle */}
        <Card className="bg-card border-0 shadow-sm rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                  {isDarkMode ? (
                    <Moon className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  ) : (
                    <Sun className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {t('menu.darkMode')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isDarkMode 
                      ? (language === 'uz' ? 'Qorong\'i mavzuga o\'tish' : language === 'en' ? 'Switch to dark theme' : 'Переключить на темную тему')
                      : (language === 'uz' ? 'Yorug\' mavzuga o\'tish' : language === 'en' ? 'Switch to light theme' : 'Переключить на светлую тему')
                    }
                  </p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={onToggleDarkMode}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-6">
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.id} 
                className="bg-card border-0 shadow-sm cursor-pointer hover:bg-secondary transition-colors rounded-2xl"
                onClick={item.action}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${item.iconBg} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}