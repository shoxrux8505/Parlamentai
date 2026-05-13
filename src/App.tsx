import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import { LanguageProvider } from "./components/LanguageContext";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegistrationScreen } from "./components/RegistrationScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { DashboardPage } from "./components/DashboardPage";
import { ServicesCatalogPage } from "./components/ServicesCatalogPage";
import { ConsultationPage } from "./components/ConsultationPage";
import { DocumentsPage } from "./components/DocumentsPage";
import { ProfilePage } from "./components/ProfilePage";
import { ServiceBookingPage } from "./components/ServiceBookingPage";
import { MenuPage } from "./components/MenuPage";
import { FavoritesPage } from "./components/FavoritesPage";
import { ChatbotPage } from "./components/ChatbotPage";
import { EditProfilePage } from "./components/EditProfilePage";
import { YangiliklarPage } from "./components/YangiliklarPage";
import { FAQPage } from "./components/FAQPage";
import { JonliEfirPage } from "./components/JonliEfirPage";
import { SaylovlarPage } from "./components/SaylovlarPage";
import { TaklifBerishPage } from "./components/TaklifBerishPage";
import { QonunchilikPage } from "./components/QonunchilikPage";
import { SuccessPage } from "./components/SuccessPage";
import { SponsorsPage } from "./components/SponsorsPage";
import { BildirishnomalarPage } from "./components/BildirishnomalarPage";
import { AppLayout } from "./components/AppLayout";
import { MapPage } from "./components/MapPage";
import { LawyerDetailModal } from "./components/LawyerDetailModal";

type ViewMode = 
  | "onboarding"
  | "login"
  | "register"
  | "forgot-password"
  | "dashboard"
  | "services"
  | "consultation"
  | "documents"
  | "profile"
  | "edit-profile"
  | "service-booking"
  | "menu"
  | "favorites"
  | "chatbot"
  | "yangiliklar"
  | "faq"
  | "jonli-efir"
  | "saylovlar"
  | "taklif-berish"
  | "qonunchilik"
  | "sponsors"
  | "bildirishnomalar"
  | "map"
  | "success";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("onboarding");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [favoriteServices, setFavoriteServices] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [successPageData, setSuccessPageData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Hon. Sarah Johnson",
    phone: "+1 202 555 0123",
    email: "s.johnson@parliament.gov",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face",
    position: "Member of Parliament",
    district: "Central District"
  });

  const handleUpdateProfile = (updatedUser: any) => {
    setCurrentUser(updatedUser);
  };

  // Mock government services data
  const SERVICES = [
    {
      id: 1,
      name: "Aliya Karimova",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop",
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
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
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
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
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
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
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
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      department: "Jinoyat huquqi",
      rating: 4.9,
      experience: "15 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 97 555 00 11",
      email: "m.nazarov@law.uz",
      type: "Senior Partner",
      description: "Jinoyat ishlari bo'yicha yuqori malakali advokat"
    },
    {
      id: 6,
      name: "Dilnoza Ahmedova",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      department: "Oila huquqi",
      rating: 4.8,
      experience: "7 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 99 888 77 66",
      email: "d.ahmedova@law.uz",
      type: "Professional",
      description: "Nikoh shartnomalari va mulk taqsimoti mutaxassisi"
    },
    {
      id: 7,
      name: "Sardor Ikromov",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      department: "Biznes huquqi",
      rating: 4.7,
      experience: "9 yil",
      availability: "Band",
      online: false,
      phone: "+998 90 444 33 22",
      email: "s.ikromov@law.uz",
      type: "Expert",
      description: "Startaplar va investitsiya huquqi bo'yicha maslahatchi"
    },
    {
      id: 8,
      name: "Malika Soyipova",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      department: "Intellektual mulk",
      rating: 4.9,
      experience: "11 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 91 777 55 44",
      email: "m.soyipova@law.uz",
      type: "Senior Expert",
      description: "Mualliflik huquqi va patentlar bo'yicha ekspert"
    },
    {
      id: 9,
      name: "Javohir Qosimov",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
      department: "Soliq huquqi",
      rating: 4.6,
      experience: "13 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 93 111 22 33",
      email: "j.qosimov@law.uz",
      type: "Professional",
      description: "Soliq auditi va optimallashtirish bo'yicha mutaxassis"
    },
    {
      id: 10,
      name: "Guli Mansurova",
      photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop",
      department: "Tibbiyot huquqi",
      rating: 4.8,
      experience: "8 yil",
      availability: "Mavjud",
      online: true,
      phone: "+998 94 999 00 88",
      email: "g.mansurova@law.uz",
      type: "Legal Consultant",
      description: "Tibbiy xatolar va sug'urta nizolari mutaxassisi"
    }
  ];

  const handleServiceBooking = (service: any, dateTime: string) => {
    toast.success(`Your ${service.name} appointment is scheduled for ${dateTime}!`);
    setViewMode("dashboard");
  };

  const handleAddToFavorites = (service: any) => {
    if (!favoriteServices.find((s: any) => s.id === service.id)) {
      setFavoriteServices([...favoriteServices, service]);
      toast.success(`${service.name} added to favorites!`);
    }
  };

  const handleRemoveFromFavorites = (serviceId: number) => {
    setFavoriteServices(favoriteServices.filter((s: any) => s.id !== serviceId));
    toast.success("Removed from favorites!");
  };

  // Render current view
  const renderCurrentView = () => {
    const pagesWithoutNav = ["onboarding", "login", "register", "forgot-password", "service-booking", "edit-profile", "success", "chatbot"];
    
    const pageContent = () => {
      switch (viewMode) {
        case "onboarding":
          return (
            <OnboardingScreen
              currentStep={onboardingStep}
              onSkip={() => setViewMode("login")}
              onNext={() => {
                if (onboardingStep < 2) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  setViewMode("login");
                }
              }}
              onPrevious={() => setOnboardingStep(Math.max(0, onboardingStep - 1))}
            />
          );
          
        case "login":
          return (
            <LoginScreen
              onBack={() => setViewMode("onboarding")}
              onLogin={() => setViewMode("dashboard")}
              onRegister={() => setViewMode("register")}
              onForgotPassword={() => setViewMode("forgot-password")}
            />
          );
          
        case "register":
          return (
            <RegistrationScreen
              onBack={() => setViewMode("login")}
              onRegister={() => setViewMode("dashboard")}
              onLogin={() => setViewMode("login")}
            />
          );
          
        case "forgot-password":
          return (
            <ForgotPasswordScreen
              onBack={() => setViewMode("login")}
              onResetSent={() => setViewMode("login")}
            />
          );
          
        case "dashboard":
          return (
            <DashboardPage
              currentUser={currentUser}
              services={SERVICES}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              onSelectService={setSelectedService}
              favoriteServices={favoriteServices}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          );
          
        case "services":
          return (
            <ServicesCatalogPage
              services={SERVICES}
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              onSelectService={setSelectedService}
              favoriteServices={favoriteServices}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          );
          
        case "consultation":
          return (
            <ConsultationPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );
          
        case "documents":
          return (
            <DocumentsPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );
          
        case "service-booking":
          return (
            <ServiceBookingPage
              service={selectedService}
              onBack={() => setViewMode("services")}
              onConfirmBooking={handleServiceBooking}
            />
          );
          
        case "profile":
          return (
            <ProfilePage
              currentUser={currentUser}
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "edit-profile":
          return (
            <EditProfilePage
              currentUser={currentUser}
              onBack={() => setViewMode("profile")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              onUpdateProfile={handleUpdateProfile}
            />
          );
          
        case "menu":
          return (
            <MenuPage
              currentUser={currentUser}
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              onLogout={() => setViewMode("login")}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
          );

        case "favorites":
          return (
            <FavoritesPage
              favoriteServices={favoriteServices}
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              onSelectService={setSelectedService}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          );

        case "chatbot":
          return (
            <ChatbotPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "yangiliklar":
          return (
            <YangiliklarPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "faq":
          return (
            <FAQPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "jonli-efir":
          return (
            <JonliEfirPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "saylovlar":
          return (
            <SaylovlarPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "taklif-berish":
          return (
            <TaklifBerishPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              onSetSuccessData={setSuccessPageData}
            />
          );

        case "qonunchilik":
          return (
            <QonunchilikPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "sponsors":
          return (
            <SponsorsPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "bildirishnomalar":
          return (
            <BildirishnomalarPage
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
            />
          );

        case "map":
          return (
            <MapPage
              services={SERVICES}
              onBack={() => setViewMode("dashboard")}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              onSelectService={setSelectedService}
            />
          );

        case "success":
          return (
            <SuccessPage
              title={successPageData?.title}
              message={successPageData?.message}
              submessage={successPageData?.submessage}
              onNavigate={(v: string) => setViewMode(v as ViewMode)}
              primaryAction={successPageData?.primaryAction}
              secondaryAction={successPageData?.secondaryAction}
            />
          );
          
        default:
          return (
            <OnboardingScreen
              currentStep={onboardingStep}
              onSkip={() => setViewMode("login")}
              onNext={() => {
                if (onboardingStep < 2) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  setViewMode("login");
                }
              }}
              onPrevious={() => setOnboardingStep(Math.max(0, onboardingStep - 1))}
            />
          );
      }
    };

    if (pagesWithoutNav.includes(viewMode)) {
      return pageContent();
    } else {
      return (
        <AppLayout currentPage={viewMode} onNavigate={(v: string) => setViewMode(v as ViewMode)}>
          {pageContent()}
        </AppLayout>
      );
    }
  };

  return (
    <LanguageProvider>
      <div className={`min-h-screen bg-background ${isDarkMode ? 'dark text-foreground' : 'text-foreground'}`}>
        {renderCurrentView()}
        
        <LawyerDetailModal
          lawyer={selectedService}
          isOpen={!!selectedService && viewMode !== "service-booking"}
          onClose={() => setSelectedService(null)}
          isFavorite={selectedService ? favoriteServices.find(s => s.id === selectedService.id) : false}
          onToggleFavorite={(s) => {
            if (favoriteServices.find(f => f.id === s.id)) handleRemoveFromFavorites(s.id);
            else handleAddToFavorites(s);
          }}
          onBook={(s) => {
            setViewMode("service-booking");
          }}
        />
      </div>
    </LanguageProvider>
  );
}