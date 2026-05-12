import React, { useState } from "react";
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
import { AppLayout } from "./components/AppLayout";
import { BildirishnomalarPage } from "./components/BildirishnomalarPage";

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
      name: "Legislative Drafting",
      photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=150&h=150&fit=crop",
      department: "Legal Affairs",
      rating: 4.9,
      availability: "Available",
      online: true,
      description: "Professional assistance with drafting bills and legislative proposals"
    },
    {
      id: 2,
      name: "Committee Support", 
      photo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=150&fit=crop",
      department: "Parliamentary Procedure",
      rating: 4.8,
      availability: "Busy",
      online: false,
      description: "Administrative and procedural support for parliamentary committees"
    },
    {
      id: 3,
      name: "Constituency Services",
      photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop",
      department: "Public Relations",
      rating: 4.7,
      availability: "Available", 
      online: true,
      description: "Support for managing constituent inquiries and community outreach"
    },
    {
      id: 4,
      name: "Policy Research",
      photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop",
      department: "Research Division",
      rating: 4.9,
      availability: "Available",
      online: true,
      description: "Comprehensive research support for policy development and analysis"
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
    // Pages that don't need the bottom navigation (onboarding, login, register, forgot-password, service booking, edit profile, success, chatbot)
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

    // Wrap with AppLayout if it's a main app page
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
      </div>
    </LanguageProvider>
  );
}