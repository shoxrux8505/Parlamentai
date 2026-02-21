import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useLanguage } from "./LanguageContext";
import { ArrowLeft } from "lucide-react";
import logoImage from "figma:asset/0b74857ba84b9eb638d12603bc93ee1831a5042b.png";

interface RegistrationScreenProps {
  onBack: () => void;
  onRegister: () => void;
  onLogin: () => void;
}

export function RegistrationScreen({ onBack, onRegister, onLogin }: RegistrationScreenProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="h-full bg-white dark:bg-card flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 p-0"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="Parlament AI" 
              className="h-10 w-auto object-contain"
            />
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('register.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('register.subtitle')}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 flex-1 overflow-auto pb-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.fullName')}
            </label>
            <Input
              name="fullName"
              type="text"
              placeholder={t('register.fullNamePlaceholder')}
              value={formData.fullName}
              onChange={handleInputChange}
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-300 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.email')}
            </label>
            <Input
              name="email"
              type="email"
              placeholder={t('register.emailPlaceholder')}
              value={formData.email}
              onChange={handleInputChange}
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-300 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.phone')}
            </label>
            <Input
              name="phone"
              type="tel"
              placeholder={t('register.phonePlaceholder')}
              value={formData.phone}
              onChange={handleInputChange}
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-300 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.password')}
            </label>
            <Input
              name="password"
              type="password"
              placeholder={t('register.passwordPlaceholder')}
              value={formData.password}
              onChange={handleInputChange}
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-300 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.confirmPassword')}
            </label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder={t('register.confirmPasswordPlaceholder')}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-300 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2 py-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
              }
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
              {t('register.acceptTerms')}
            </label>
          </div>

          {/* Register Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium"
              disabled={!formData.acceptTerms}
            >
              {t('register.registerButton')}
            </Button>
          </div>

          {/* Divider */}
          <div className="text-center py-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('login.orDivider')}</span>
          </div>

          {/* Social Registration */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0088cc">
                <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 9.728-.896 9.728-.613 4.262-2.269 5.01-4.777 5.01-2.508 0-4.164-.748-4.777-5.01 0 0-.727-7.87-.896-9.728C5.851 6.442 5.851 6.442 8 6.442h8c2.149 0 2.149 0 1.568 1.718z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Telegram</span>
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center pt-4 pb-8">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('register.haveAccount')}{" "}
              <Button
                type="button"
                variant="link"
                onClick={onLogin}
                className="text-sm text-primary hover:text-primary/80 p-0 h-auto font-medium"
              >
                {t('register.loginLink')}
              </Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
