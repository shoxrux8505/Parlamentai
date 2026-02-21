import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'uz' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('parlament-language');
    return (saved as Language) || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('parlament-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations
const translations = {
  uz: {
    // Common
    common: {
      back: "Orqaga",
      next: "Keyingisi",
      skip: "O'tkazib yuborish",
      save: "Saqlash",
      cancel: "Bekor qilish",
      confirm: "Tasdiqlash",
      search: "Qidirish",
      filter: "Filter",
      all: "Hammasi",
      yes: "Ha",
      no: "Yo'q",
      loading: "Yuklanmoqda...",
      error: "Xatolik yuz berdi",
      success: "Muvaffaqiyatli",
      close: "Yopish",
      viewAll: "Hammasini ko'rish",
      seeAll: "Barchasini ko'rish"
    },

    // Onboarding
    onboarding: {
      step1Title: "PARLAMENT AI ga xush kelibsiz",
      step1Description: "Parlament xizmatlariga qulay va samarali raqamli kirish",
      step2Title: "Real vaqtda yangiliklar",
      step2Description: "Muhim voqealar va qonunchilik o'zgarishlari haqida xabardor bo'ling",
      step3Title: "Keling, boshlaylik",
      step3Description: "Parlamentning raqamli xizmatlarini kashf eting"
    },

    // Login
    login: {
      title: "Kirish",
      subtitle: "Davom etish uchun tizimga kiring",
      oneIdLogin: "OneID orqali kirish",
      googleLogin: "Google orqali kirish",
      orDivider: "yoki",
      phoneNumber: "Telefon raqami",
      phonePlaceholder: "+998 XX XXX XX XX",
      password: "Parol",
      passwordPlaceholder: "Parolingizni kiriting",
      forgotPassword: "Parolni unutdingizmi?",
      loginButton: "Kirish",
      noAccount: "Hisobingiz yo'qmi?",
      register: "Ro'yxatdan o'tish"
    },

    // Register
    register: {
      title: "Ro'yxatdan o'tish",
      subtitle: "Yangi hisob yarating",
      fullName: "To'liq ism",
      fullNamePlaceholder: "Ismingizni kiriting",
      email: "Email",
      emailPlaceholder: "Email manzilingizni kiriting",
      phone: "Telefon raqami",
      phonePlaceholder: "+998 XX XXX XX XX",
      password: "Parol",
      passwordPlaceholder: "Parol yarating",
      confirmPassword: "Parolni tasdiqlang",
      confirmPasswordPlaceholder: "Parolni qayta kiriting",
      acceptTerms: "Men foydalanish shartlari va maxfiylik siyosatiga roziman",
      registerButton: "Ro'yxatdan o'tish",
      haveAccount: "Hisobingiz bormi?",
      loginLink: "Kirish"
    },

    // Forgot Password
    forgotPassword: {
      title: "Parolni tiklash",
      subtitle: "Parolni tiklash havolasini yuborish uchun email manzilingizni kiriting",
      emailLabel: "Email manzil",
      emailPlaceholder: "Email manzilingizni kiriting",
      sendResetLink: "Tiklash havolasini yuborish",
      rememberPassword: "Parolni esladingizmi?",
      backToLogin: "Kirish sahifasiga qaytish",
      emailSent: "Email yuborildi!",
      emailSentMessage: "Parolni tiklash havolasi email manzilingizga yuborildi. Iltimos, emailingizni tekshiring."
    },

    // Dashboard
    dashboard: {
      greeting: "Xush kelibsiz",
      searchPlaceholder: "Xizmatlar, hujjatlar va boshqalarni qidiring...",
      quickActions: "Tezkor harakatlar",
      consultation: "Maslahat",
      documents: "Hujjatlar",
      services: "Xizmatlar",
      support: "Yordam",
      favorites: "Sevimlilar",
      news: "Yangiliklar",
      faq: "Savollar",
      liveBroadcast: "Jonli efir",
      elections: "Saylovlar",
      submitProposal: "Taklif berish",
      legislation: "Qonunchilik",
      sponsors: "Homiylar",
      popularServices: "Mashhur xizmatlar",
      available: "Mavjud",
      busy: "Band",
      online: "Onlayn",
      offline: "Oflayn"
    },

    // Menu
    menu: {
      title: "Menyu",
      profile: "Profil",
      settings: "Sozlamalar",
      darkMode: "Tungi rejim",
      language: "Til",
      notifications: "Bildirishnomalar",
      privacy: "Maxfiylik",
      terms: "Shartlar",
      help: "Yordam",
      about: "Dastur haqida",
      logout: "Chiqish",
      version: "Versiya 1.0.0"
    },

    // Profile
    profile: {
      title: "Profil",
      editProfile: "Profilni tahrirlash",
      personalInfo: "Shaxsiy ma'lumotlar",
      name: "Ism",
      phone: "Telefon",
      email: "Email",
      position: "Lavozim",
      district: "Tuman",
      memberSince: "A'zo bo'lgan sana",
      accountSettings: "Hisob sozlamalari",
      changePassword: "Parolni o'zgartirish",
      privacySettings: "Maxfiylik sozlamalari",
      notificationSettings: "Bildirishnoma sozlamalari"
    },

    // Edit Profile
    editProfile: {
      title: "Profilni tahrirlash",
      uploadPhoto: "Rasmni yuklash",
      fullName: "To'liq ism",
      phoneNumber: "Telefon raqami",
      emailAddress: "Email manzil",
      position: "Lavozim",
      district: "Tuman",
      bio: "Biografiya",
      bioPlaceholder: "O'zingiz haqingizda qisqacha ma'lumot yozing...",
      saveChanges: "O'zgarishlarni saqlash",
      successMessage: "Profil muvaffaqiyatli yangilandi!"
    },

    // Services
    services: {
      title: "Xizmatlar katalogi",
      allServices: "Barcha xizmatlar",
      searchPlaceholder: "Xizmatlarni qidirish...",
      department: "Bo'lim",
      rating: "Reyting",
      availability: "Mavjudlik",
      bookNow: "Hozir band qilish",
      addToFavorites: "Sevimlilar ro'yxatiga qo'shish",
      removeFromFavorites: "Sevimlilardan olib tashlash",
      noServices: "Xizmatlar topilmadi"
    },

    // Consultation
    consultation: {
      title: "Maslahat olish",
      selectType: "Maslahat turini tanlang",
      legal: "Huquqiy maslahat",
      legalDesc: "Qonunchilik va parlament jarayonlari bo'yicha maslahat",
      technical: "Texnik yordam",
      technicalDesc: "Platforma va xizmatlardan foydalanishda yordam",
      policy: "Siyosat bo'yicha maslahat",
      policyDesc: "Siyosat ishlab chiqish va tahlil bo'yicha maslahat",
      general: "Umumiy so'rovlar",
      generalDesc: "Boshqa barcha savollar va so'rovlar",
      requestConsultation: "Maslahat so'rash"
    },

    // Documents
    documents: {
      title: "Hujjatlar",
      myDocuments: "Mening hujjatlarim",
      bills: "Qonun loyihalari",
      reports: "Hisobotlar",
      meeting: "Yig'ilish yozuvlari",
      research: "Tadqiqot hujjatlari",
      uploadDocument: "Hujjat yuklash",
      recent: "So'nggi hujjatlar",
      size: "Hajmi",
      date: "Sana",
      noDocuments: "Hujjatlar topilmadi"
    },

    // Favorites
    favorites: {
      title: "Sevimli xizmatlar",
      noFavorites: "Hali sevimli xizmatlar yo'q",
      addFavorites: "Xizmatlarni ko'rib chiqing va sevimlilar ro'yxatiga qo'shing"
    },

    // Chatbot
    chatbot: {
      title: "AI Yordamchi",
      placeholder: "Savolingizni yozing...",
      typing: "Yozmoqda...",
      welcome: "Salom! Men sizga qanday yordam bera olaman?"
    },

    // News
    news: {
      title: "Yangiliklar",
      latest: "So'nggi yangiliklar",
      trending: "Mashhur",
      categories: "Kategoriyalar",
      politics: "Siyosat",
      economy: "Iqtisodiyot",
      social: "Ijtimoiy",
      international: "Xalqaro",
      readMore: "Davomini o'qish",
      minutesAgo: "daqiqa oldin",
      hoursAgo: "soat oldin",
      daysAgo: "kun oldin"
    },

    // FAQ
    faq: {
      title: "Tez-tez so'raladigan savollar",
      searchPlaceholder: "Savollarni qidirish...",
      general: "Umumiy",
      technical: "Texnik",
      account: "Hisob",
      services: "Xizmatlar",
      noResults: "Natija topilmadi"
    },

    // Live Broadcast
    liveBroadcast: {
      title: "Jonli efir",
      live: "JONLI",
      viewers: "tomoshabin",
      schedule: "Efir jadvali",
      upcoming: "Kelayotgan",
      past: "O'tgan efirlar",
      noLive: "Hozirda jonli efir yo'q"
    },

    // Elections
    elections: {
      title: "Saylovlar",
      upcoming: "Kelayotgan saylovlar",
      results: "Natijalar",
      candidates: "Nomzodlar",
      districts: "Tumanlar",
      registration: "Ro'yxatdan o'tish",
      information: "Ma'lumot",
      daysLeft: "kun qoldi"
    },

    // Proposals
    proposals: {
      title: "Taklif berish",
      yourProposal: "Sizning taklifingiz",
      category: "Kategoriya",
      selectCategory: "Kategoriyani tanlang",
      education: "Ta'lim",
      healthcare: "Sog'liqni saqlash",
      infrastructure: "Infratuzilma",
      economy: "Iqtisodiyot",
      environment: "Atrof-muhit",
      social: "Ijtimoiy",
      other: "Boshqa",
      title_field: "Sarlavha",
      titlePlaceholder: "Taklifingizning sarlavhasini kiriting",
      description: "Tavsif",
      descriptionPlaceholder: "Taklifingizni batafsil tasvirlab bering...",
      attachments: "Qo'shimcha fayllar",
      uploadFiles: "Fayllarni yuklash",
      anonymous: "Anonim taklif",
      submit: "Yuborish",
      successTitle: "Taklif qabul qilindi!",
      successMessage: "Taklifingiz muvaffaqiyatli yuborildi va ko'rib chiqilmoqda.",
      successSubmessage: "Tez orada javob olasiz."
    },

    // Legislation
    legislation: {
      title: "Qonunchilik",
      activeBills: "Faol qonun loyihalari",
      approved: "Tasdiqlangan",
      pending: "Kutilmoqda",
      rejected: "Rad etilgan",
      allLegislation: "Barcha qonunlar",
      searchPlaceholder: "Qonunlarni qidirish...",
      status: "Holat",
      date: "Sana",
      viewDetails: "Batafsil",
      draft: "Loyiha",
      underReview: "Ko'rib chiqilmoqda",
      votingStage: "Ovoz berish bosqichi"
    },

    // Sponsors
    sponsors: {
      title: "Homiylar va hamkorlar",
      categories: "Kategoriyalar",
      all: "Hammasi",
      government: "Davlat organlari",
      ngo: "NNT va tashkilotlar",
      international: "Xalqaro tashkilotlar",
      tier: "Daraja",
      platinum: "Platina",
      gold: "Oltin",
      silver: "Kumush",
      bronze: "Bronza",
      verified: "Tasdiqlangan",
      contactInfo: "Aloqa ma'lumotlari",
      website: "Veb-sayt",
      email: "Email",
      phone: "Telefon",
      address: "Manzil",
      established: "Tashkil etilgan",
      visitWebsite: "Saytga o'tish",
      sendEmail: "Xat yuborish"
    },

    // Booking
    booking: {
      title: "Xizmatni band qilish",
      selectDateTime: "Sana va vaqtni tanlang",
      selectDate: "Sanani tanlang",
      selectTime: "Vaqtni tanlang",
      morning: "Ertalab",
      afternoon: "Tushdan keyin",
      evening: "Kechqurun",
      additionalInfo: "Qo'shimcha ma'lumot",
      notesPlaceholder: "Har qanday maxsus so'rovlar yoki eslatmalar...",
      confirmBooking: "Bandlikni tasdiqlash",
      serviceDetails: "Xizmat tafsilotlari",
      selectedDateTime: "Tanlangan sana va vaqt"
    },

    // Notifications
    notifications: {
      title: "Bildirishnomalar",
      markAllRead: "Hammasini o'qilgan deb belgilash",
      new: "Yangi",
      earlier: "Avvalgi",
      noNotifications: "Bildirishnomalar yo'q",
      clear: "Tozalash"
    }
  },

  en: {
    // Common
    common: {
      back: "Back",
      next: "Next",
      skip: "Skip",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      search: "Search",
      filter: "Filter",
      all: "All",
      yes: "Yes",
      no: "No",
      loading: "Loading...",
      error: "An error occurred",
      success: "Successful",
      close: "Close",
      viewAll: "View All",
      seeAll: "See All"
    },

    // Onboarding
    onboarding: {
      step1Title: "Welcome to PARLAMENT AI",
      step1Description: "Convenient and efficient digital access to parliamentary services",
      step2Title: "Real-time Updates",
      step2Description: "Stay informed about important events and legislative changes",
      step3Title: "Let's Get Started",
      step3Description: "Explore parliament's digital services"
    },

    // Login
    login: {
      title: "Sign In",
      subtitle: "Sign in to continue",
      oneIdLogin: "Sign in with OneID",
      googleLogin: "Sign in with Google",
      orDivider: "or",
      phoneNumber: "Phone Number",
      phonePlaceholder: "+998 XX XXX XX XX",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot password?",
      loginButton: "Sign In",
      noAccount: "Don't have an account?",
      register: "Register"
    },

    // Register
    register: {
      title: "Create Account",
      subtitle: "Sign up to get started",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      email: "Email",
      emailPlaceholder: "Enter your email address",
      phone: "Phone Number",
      phonePlaceholder: "+998 XX XXX XX XX",
      password: "Password",
      passwordPlaceholder: "Create a password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      acceptTerms: "I agree to the terms of service and privacy policy",
      registerButton: "Create Account",
      haveAccount: "Already have an account?",
      loginLink: "Sign In"
    },

    // Forgot Password
    forgotPassword: {
      title: "Reset Password",
      subtitle: "Enter your email address to receive a password reset link",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      sendResetLink: "Send Reset Link",
      rememberPassword: "Remember your password?",
      backToLogin: "Back to Sign In",
      emailSent: "Email Sent!",
      emailSentMessage: "A password reset link has been sent to your email address. Please check your inbox."
    },

    // Dashboard
    dashboard: {
      greeting: "Welcome",
      searchPlaceholder: "Search services, documents and more...",
      quickActions: "Quick Actions",
      consultation: "Consultation",
      documents: "Documents",
      services: "Services",
      support: "Support",
      favorites: "Favorites",
      news: "News",
      faq: "FAQ",
      liveBroadcast: "Live Broadcast",
      elections: "Elections",
      submitProposal: "Submit Proposal",
      legislation: "Legislation",
      sponsors: "Sponsors",
      popularServices: "Popular Services",
      available: "Available",
      busy: "Busy",
      online: "Online",
      offline: "Offline"
    },

    // Menu
    menu: {
      title: "Menu",
      profile: "Profile",
      settings: "Settings",
      darkMode: "Dark Mode",
      language: "Language",
      notifications: "Notifications",
      privacy: "Privacy",
      terms: "Terms",
      help: "Help",
      about: "About",
      logout: "Logout",
      version: "Version 1.0.0"
    },

    // Profile
    profile: {
      title: "Profile",
      editProfile: "Edit Profile",
      personalInfo: "Personal Information",
      name: "Name",
      phone: "Phone",
      email: "Email",
      position: "Position",
      district: "District",
      memberSince: "Member Since",
      accountSettings: "Account Settings",
      changePassword: "Change Password",
      privacySettings: "Privacy Settings",
      notificationSettings: "Notification Settings"
    },

    // Edit Profile
    editProfile: {
      title: "Edit Profile",
      uploadPhoto: "Upload Photo",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      emailAddress: "Email Address",
      position: "Position",
      district: "District",
      bio: "Bio",
      bioPlaceholder: "Write a brief description about yourself...",
      saveChanges: "Save Changes",
      successMessage: "Profile updated successfully!"
    },

    // Services
    services: {
      title: "Services Catalog",
      allServices: "All Services",
      searchPlaceholder: "Search services...",
      department: "Department",
      rating: "Rating",
      availability: "Availability",
      bookNow: "Book Now",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
      noServices: "No services found"
    },

    // Consultation
    consultation: {
      title: "Request Consultation",
      selectType: "Select Consultation Type",
      legal: "Legal Advice",
      legalDesc: "Guidance on legislation and parliamentary procedures",
      technical: "Technical Support",
      technicalDesc: "Help with using the platform and services",
      policy: "Policy Consultation",
      policyDesc: "Assistance with policy development and analysis",
      general: "General Inquiries",
      generalDesc: "All other questions and requests",
      requestConsultation: "Request Consultation"
    },

    // Documents
    documents: {
      title: "Documents",
      myDocuments: "My Documents",
      bills: "Bills",
      reports: "Reports",
      meeting: "Meeting Minutes",
      research: "Research Papers",
      uploadDocument: "Upload Document",
      recent: "Recent Documents",
      size: "Size",
      date: "Date",
      noDocuments: "No documents found"
    },

    // Favorites
    favorites: {
      title: "Favorite Services",
      noFavorites: "No favorite services yet",
      addFavorites: "Browse services and add them to your favorites"
    },

    // Chatbot
    chatbot: {
      title: "AI Assistant",
      placeholder: "Type your question...",
      typing: "Typing...",
      welcome: "Hello! How can I help you today?"
    },

    // News
    news: {
      title: "News",
      latest: "Latest News",
      trending: "Trending",
      categories: "Categories",
      politics: "Politics",
      economy: "Economy",
      social: "Social",
      international: "International",
      readMore: "Read More",
      minutesAgo: "minutes ago",
      hoursAgo: "hours ago",
      daysAgo: "days ago"
    },

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      searchPlaceholder: "Search questions...",
      general: "General",
      technical: "Technical",
      account: "Account",
      services: "Services",
      noResults: "No results found"
    },

    // Live Broadcast
    liveBroadcast: {
      title: "Live Broadcast",
      live: "LIVE",
      viewers: "viewers",
      schedule: "Broadcast Schedule",
      upcoming: "Upcoming",
      past: "Past Broadcasts",
      noLive: "No live broadcast at the moment"
    },

    // Elections
    elections: {
      title: "Elections",
      upcoming: "Upcoming Elections",
      results: "Results",
      candidates: "Candidates",
      districts: "Districts",
      registration: "Registration",
      information: "Information",
      daysLeft: "days left"
    },

    // Proposals
    proposals: {
      title: "Submit Proposal",
      yourProposal: "Your Proposal",
      category: "Category",
      selectCategory: "Select Category",
      education: "Education",
      healthcare: "Healthcare",
      infrastructure: "Infrastructure",
      economy: "Economy",
      environment: "Environment",
      social: "Social",
      other: "Other",
      title_field: "Title",
      titlePlaceholder: "Enter your proposal title",
      description: "Description",
      descriptionPlaceholder: "Describe your proposal in detail...",
      attachments: "Attachments",
      uploadFiles: "Upload Files",
      anonymous: "Submit Anonymously",
      submit: "Submit",
      successTitle: "Proposal Received!",
      successMessage: "Your proposal has been successfully submitted and is under review.",
      successSubmessage: "You will receive a response soon."
    },

    // Legislation
    legislation: {
      title: "Legislation",
      activeBills: "Active Bills",
      approved: "Approved",
      pending: "Pending",
      rejected: "Rejected",
      allLegislation: "All Legislation",
      searchPlaceholder: "Search legislation...",
      status: "Status",
      date: "Date",
      viewDetails: "View Details",
      draft: "Draft",
      underReview: "Under Review",
      votingStage: "Voting Stage"
    },

    // Sponsors
    sponsors: {
      title: "Sponsors & Partners",
      categories: "Categories",
      all: "All",
      government: "Government Agencies",
      ngo: "NGOs & Organizations",
      international: "International Organizations",
      tier: "Tier",
      platinum: "Platinum",
      gold: "Gold",
      silver: "Silver",
      bronze: "Bronze",
      verified: "Verified",
      contactInfo: "Contact Information",
      website: "Website",
      email: "Email",
      phone: "Phone",
      address: "Address",
      established: "Established",
      visitWebsite: "Visit Website",
      sendEmail: "Send Email"
    },

    // Booking
    booking: {
      title: "Book Service",
      selectDateTime: "Select Date and Time",
      selectDate: "Select Date",
      selectTime: "Select Time",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      additionalInfo: "Additional Information",
      notesPlaceholder: "Any special requests or notes...",
      confirmBooking: "Confirm Booking",
      serviceDetails: "Service Details",
      selectedDateTime: "Selected Date & Time"
    },

    // Notifications
    notifications: {
      title: "Notifications",
      markAllRead: "Mark All as Read",
      new: "New",
      earlier: "Earlier",
      noNotifications: "No notifications",
      clear: "Clear"
    }
  },

  ru: {
    // Common
    common: {
      back: "Назад",
      next: "Далее",
      skip: "Пропустить",
      save: "Сохранить",
      cancel: "Отмена",
      confirm: "Подтвердить",
      search: "Поиск",
      filter: "Фильтр",
      all: "Все",
      yes: "Да",
      no: "Нет",
      loading: "Загрузка...",
      error: "Произошла ошибка",
      success: "Успешно",
      close: "Закрыть",
      viewAll: "Смотреть все",
      seeAll: "Посмотреть все"
    },

    // Onboarding
    onboarding: {
      step1Title: "Добро пожаловать в PARLAMENT AI",
      step1Description: "Удобный и эффективный цифровой доступ к парламентским услугам",
      step2Title: "Обновления в реальном времени",
      step2Description: "Будьте в курсе важных событий и законодательных изменений",
      step3Title: "Давайте начнем",
      step3Description: "Изучите цифровые услуги парламента"
    },

    // Login
    login: {
      title: "Вход",
      subtitle: "Войдите, чтобы продолжить",
      oneIdLogin: "Войти через OneID",
      googleLogin: "Войти через Google",
      orDivider: "или",
      phoneNumber: "Номер телефона",
      phonePlaceholder: "+998 XX XXX XX XX",
      password: "Пароль",
      passwordPlaceholder: "Введите пароль",
      forgotPassword: "Забыли пароль?",
      loginButton: "Войти",
      noAccount: "Нет аккаунта?",
      register: "Регистрация"
    },

    // Register
    register: {
      title: "Регистрация",
      subtitle: "Создайте новый аккаунт",
      fullName: "Полное имя",
      fullNamePlaceholder: "Введите ваше имя",
      email: "Email",
      emailPlaceholder: "Введите email адрес",
      phone: "Номер телефона",
      phonePlaceholder: "+998 XX XXX XX XX",
      password: "Пароль",
      passwordPlaceholder: "Создайте пароль",
      confirmPassword: "Подтвердите пароль",
      confirmPasswordPlaceholder: "Введите пароль повторно",
      acceptTerms: "Я согласен с условиями использования и политикой конфиденциальности",
      registerButton: "Зарегистрироваться",
      haveAccount: "Уже есть аккаунт?",
      loginLink: "Войти"
    },

    // Forgot Password
    forgotPassword: {
      title: "Восстановление пароля",
      subtitle: "Введите email адрес для получения ссылки восстановления пароля",
      emailLabel: "Email адрес",
      emailPlaceholder: "Введите ваш email адрес",
      sendResetLink: "Отправить ссылку",
      rememberPassword: "Вспомнили пароль?",
      backToLogin: "Вернуться ко входу",
      emailSent: "Email отправлен!",
      emailSentMessage: "Ссылка для восстановления пароля отправлена на ваш email адрес. Пожалуйста, проверьте почту."
    },

    // Dashboard
    dashboard: {
      greeting: "Добро пожаловать",
      searchPlaceholder: "Поиск услуг, документов и др...",
      quickActions: "Быстрые действия",
      consultation: "Консультация",
      documents: "Документы",
      services: "Услуги",
      support: "Поддержка",
      favorites: "Избранное",
      news: "Новости",
      faq: "Вопросы",
      liveBroadcast: "Прямой эфир",
      elections: "Выборы",
      submitProposal: "Подать предложение",
      legislation: "Законодательство",
      sponsors: "Спонсоры",
      popularServices: "Популярные услуги",
      available: "Доступно",
      busy: "Занято",
      online: "Онлайн",
      offline: "Офлайн"
    },

    // Menu
    menu: {
      title: "Меню",
      profile: "Профиль",
      settings: "Настройки",
      darkMode: "Темный режим",
      language: "Язык",
      notifications: "Уведомления",
      privacy: "Конфиденциальность",
      terms: "Условия",
      help: "Помощь",
      about: "О приложении",
      logout: "Выход",
      version: "Версия 1.0.0"
    },

    // Profile
    profile: {
      title: "Профиль",
      editProfile: "Редактировать профиль",
      personalInfo: "Личная информация",
      name: "Имя",
      phone: "Телефон",
      email: "Email",
      position: "Должность",
      district: "Район",
      memberSince: "Участник с",
      accountSettings: "Настройки аккаунта",
      changePassword: "Сменить пароль",
      privacySettings: "Настройки конфиденциальности",
      notificationSettings: "Настройки уведомлений"
    },

    // Edit Profile
    editProfile: {
      title: "Редактировать профиль",
      uploadPhoto: "Загрузить фото",
      fullName: "Полное имя",
      phoneNumber: "Номер телефона",
      emailAddress: "Email адрес",
      position: "Должность",
      district: "Район",
      bio: "Биография",
      bioPlaceholder: "Напишите краткое описание о себе...",
      saveChanges: "Сохранить изменения",
      successMessage: "Профиль успешно обновлен!"
    },

    // Services
    services: {
      title: "Каталог услуг",
      allServices: "Все услуги",
      searchPlaceholder: "Поиск услуг...",
      department: "Отдел",
      rating: "Рейтинг",
      availability: "Доступность",
      bookNow: "Забронировать",
      addToFavorites: "Добавить в избранное",
      removeFromFavorites: "Удалить из избранного",
      noServices: "Услуги не найдены"
    },

    // Consultation
    consultation: {
      title: "Запрос консультации",
      selectType: "Выберите тип консультации",
      legal: "Юридическая консультация",
      legalDesc: "Руководство по законодательству и парламентским процедурам",
      technical: "Техническая поддержка",
      technicalDesc: "Помощь в использовании платформы и услуг",
      policy: "Консультация по политике",
      policyDesc: "Помощь в разработке и анализе политики",
      general: "Общие вопросы",
      generalDesc: "Все остальные вопросы и запросы",
      requestConsultation: "Запросить консультацию"
    },

    // Documents
    documents: {
      title: "Документы",
      myDocuments: "Мои документы",
      bills: "Законопроекты",
      reports: "Отчеты",
      meeting: "Протоколы собраний",
      research: "Исследовательские документы",
      uploadDocument: "Загрузить документ",
      recent: "Недавние документы",
      size: "Размер",
      date: "Дата",
      noDocuments: "Документы не найдены"
    },

    // Favorites
    favorites: {
      title: "Избранные услуги",
      noFavorites: "Пока нет избранных услуг",
      addFavorites: "Просмотрите услуги и добавьте их в избранное"
    },

    // Chatbot
    chatbot: {
      title: "AI Помощник",
      placeholder: "Напишите свой вопрос...",
      typing: "Печатает...",
      welcome: "Здравствуйте! Чем я могу вам помочь?"
    },

    // News
    news: {
      title: "Новости",
      latest: "Последние новости",
      trending: "Популярные",
      categories: "Категории",
      politics: "Политика",
      economy: "Экономика",
      social: "Социальные",
      international: "Международные",
      readMore: "Читать далее",
      minutesAgo: "минут назад",
      hoursAgo: "часов назад",
      daysAgo: "дней назад"
    },

    // FAQ
    faq: {
      title: "Часто задаваемые вопросы",
      searchPlaceholder: "Поиск вопросов...",
      general: "Общие",
      technical: "Технические",
      account: "Аккаунт",
      services: "Услуги",
      noResults: "Результатов не найдено"
    },

    // Live Broadcast
    liveBroadcast: {
      title: "Прямой эфир",
      live: "ПРЯМОЙ ЭФИР",
      viewers: "зрителей",
      schedule: "Расписание эфиров",
      upcoming: "Предстоящие",
      past: "Прошедшие эфиры",
      noLive: "Сейчас нет прямого эфира"
    },

    // Elections
    elections: {
      title: "Выборы",
      upcoming: "Предстоящие выборы",
      results: "Результаты",
      candidates: "Кандидаты",
      districts: "Районы",
      registration: "Регистрация",
      information: "Информация",
      daysLeft: "дней осталось"
    },

    // Proposals
    proposals: {
      title: "Подать предложение",
      yourProposal: "Ваше предложение",
      category: "Категория",
      selectCategory: "Выберите категорию",
      education: "Образование",
      healthcare: "Здравоохранение",
      infrastructure: "Инфраструктура",
      economy: "Экономика",
      environment: "Окружающая среда",
      social: "Социальные",
      other: "Другое",
      title_field: "Заголовок",
      titlePlaceholder: "Введите заголовок предложения",
      description: "Описание",
      descriptionPlaceholder: "Подробно опишите ваше предложение...",
      attachments: "Вложения",
      uploadFiles: "Загрузить файлы",
      anonymous: "Подать анонимно",
      submit: "Отправить",
      successTitle: "Предложение получено!",
      successMessage: "Ваше предложение успешно отправлено и находится на рассмотрении.",
      successSubmessage: "Вы получите ответ в ближайшее время."
    },

    // Legislation
    legislation: {
      title: "Законодательство",
      activeBills: "Активные законопроекты",
      approved: "Утверждено",
      pending: "В ожидании",
      rejected: "Отклонено",
      allLegislation: "Все законы",
      searchPlaceholder: "Поиск законов...",
      status: "Статус",
      date: "Дата",
      viewDetails: "Подробнее",
      draft: "Проект",
      underReview: "На рассмотрении",
      votingStage: "Стадия голосования"
    },

    // Sponsors
    sponsors: {
      title: "Спонсоры и партнеры",
      categories: "Категории",
      all: "Все",
      government: "Государственные органы",
      ngo: "НПО и организации",
      international: "Международные организации",
      tier: "Уровень",
      platinum: "Платина",
      gold: "Золото",
      silver: "Серебро",
      bronze: "Бронза",
      verified: "Подтверждено",
      contactInfo: "Контактная информация",
      website: "Веб-сайт",
      email: "Email",
      phone: "Телефон",
      address: "Адрес",
      established: "Основано",
      visitWebsite: "Посетить сайт",
      sendEmail: "Отправить письмо"
    },

    // Booking
    booking: {
      title: "Забронировать услугу",
      selectDateTime: "Выберите дату и время",
      selectDate: "Выберите дату",
      selectTime: "Выберите время",
      morning: "Утро",
      afternoon: "День",
      evening: "Вечер",
      additionalInfo: "Дополнительная информация",
      notesPlaceholder: "Любые особые запросы или примечания...",
      confirmBooking: "Подтвердить бронирование",
      serviceDetails: "Детали услуги",
      selectedDateTime: "Выбранные дата и время"
    },

    // Notifications
    notifications: {
      title: "Уведомления",
      markAllRead: "Отметить все как прочитанные",
      new: "Новые",
      earlier: "Ранее",
      noNotifications: "Нет уведомлений",
      clear: "Очистить"
    }
  }
};