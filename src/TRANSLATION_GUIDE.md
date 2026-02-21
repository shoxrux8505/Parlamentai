# Translation Guide for PARLAMENT AI

This app now supports 3 languages: **Uzbek (UZ)**, **English (EN)**, and **Russian (RU)**.

## How to Use Translations in Components

### 1. Import the useLanguage hook

```tsx
import { useLanguage } from "./LanguageContext";
```

### 2. Use the hook in your component

```tsx
export function YourComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('dashboard.greeting')}</h1>
      <p>{t('dashboard.searchPlaceholder')}</p>
    </div>
  );
}
```

### 3. Available Translation Functions

- `t(key)` - Get translated text for a key (e.g., `t('common.back')`)
- `language` - Current language ('uz', 'en', or 'ru')
- `setLanguage(lang)` - Change the current language

## Translation Keys Structure

All translations are organized in a nested structure:

```
common.*        - Common words used everywhere (back, next, save, etc.)
onboarding.*    - Onboarding screens
login.*         - Login screen
dashboard.*     - Dashboard/home page
menu.*          - Menu page
profile.*       - Profile pages
services.*      - Services catalog
consultation.*  - Consultation page
documents.*     - Documents page
favorites.*     - Favorites page
chatbot.*       - AI chatbot
news.*          - News/Yangiliklar page
faq.*           - FAQ page
liveBroadcast.* - Live broadcast/Jonli efir
elections.*     - Elections/Saylovlar
proposals.*     - Submit proposals/Taklif berish
legislation.*   - Legislation/Qonunchilik
sponsors.*      - Sponsors page
booking.*       - Service booking
notifications.* - Notifications
```

## Examples of Updating Components

### Example 1: Simple Text Replacement

**Before:**
```tsx
<h1>Xizmatlar katalogi</h1>
```

**After:**
```tsx
const { t } = useLanguage();
<h1>{t('services.title')}</h1>
```

### Example 2: Buttons

**Before:**
```tsx
<Button>Orqaga</Button>
```

**After:**
```tsx
const { t } = useLanguage();
<Button>{t('common.back')}</Button>
```

### Example 3: Placeholders

**Before:**
```tsx
<Input placeholder="Qidirish..." />
```

**After:**
```tsx
const { t } = useLanguage();
<Input placeholder={t('common.search')} />
```

### Example 4: Conditional Text Based on Language

```tsx
const { language } = useLanguage();

const description = {
  uz: "Bu o'zbek tilidagi tavsif",
  en: "This is an English description",
  ru: "Это описание на русском языке"
}[language];
```

## Language Selector

Users can change the language in the **Menu** page. The language selection includes:
- **UZ** - O'zbekcha (Uzbek)
- **EN** - English
- **RU** - Русский (Russian)

The selected language is saved to localStorage and persists between sessions.

## Components Already Updated with Translations

✅ **App.tsx** - Wrapped with LanguageProvider
✅ **MenuPage.tsx** - Menu items and language selector
✅ **OnboardingScreen.tsx** - Onboarding steps
✅ **LoginScreen.tsx** - Login form fields

## Components That Need Translation Updates

The following components still use hardcoded Uzbek text and should be updated:

- ❌ DashboardPage.tsx
- ❌ ServicesCatalogPage.tsx
- ❌ ConsultationPage.tsx
- ❌ DocumentsPage.tsx
- ❌ ProfilePage.tsx
- ❌ EditProfilePage.tsx
- ❌ ServiceBookingPage.tsx
- ❌ FavoritesPage.tsx
- ❌ ChatbotPage.tsx
- ❌ YangiliklarPage.tsx
- ❌ FAQPage.tsx
- ❌ JonliEfirPage.tsx
- ❌ SaylovlarPage.tsx
- ❌ TaklifBerishPage.tsx
- ❌ QonunchilikPage.tsx
- ❌ SponsorsPage.tsx
- ❌ SuccessPage.tsx
- ❌ AppLayout.tsx
- ❌ NotificationDropdown.tsx

## Adding New Translation Keys

To add new translations, edit `/components/LanguageContext.tsx` and add your keys to all three language objects (uz, en, ru):

```tsx
const translations = {
  uz: {
    yourSection: {
      yourKey: "O'zbek tilidagi matn"
    }
  },
  en: {
    yourSection: {
      yourKey: "English text"
    }
  },
  ru: {
    yourSection: {
      yourKey: "Русский текст"
    }
  }
};
```

Then use it in your component:
```tsx
{t('yourSection.yourKey')}
```

## Best Practices

1. **Always provide translations for all 3 languages** - Don't leave any language incomplete
2. **Use descriptive key names** - Make it clear what the text is for
3. **Group related keys together** - Keep translations organized by section
4. **Test in all languages** - Switch between languages to ensure everything displays correctly
5. **Keep text length in mind** - Different languages have different text lengths; design UI to accommodate this

## Current Default Language

The default language is **Uzbek (uz)** when a user first opens the app. The language preference is saved in localStorage.
