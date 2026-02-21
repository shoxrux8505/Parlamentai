import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLanguage } from "./LanguageContext";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import logoImage from "figma:asset/0b74857ba84b9eb638d12603bc93ee1831a5042b.png";

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onResetSent: () => void;
}

export function ForgotPasswordScreen({ onBack, onResetSent }: ForgotPasswordScreenProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate sending reset email
    setTimeout(() => {
      onResetSent();
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="h-full bg-white dark:bg-card flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('forgotPassword.emailSent')}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('forgotPassword.emailSentMessage')}
          </p>
          
          <Button
            onClick={onBack}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium"
          >
            {t('forgotPassword.backToLogin')}
          </Button>
        </div>
      </div>
    );
  }

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

        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
            <Mail className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('forgotPassword.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('forgotPassword.subtitle')}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 flex-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('forgotPassword.emailLabel')}
            </label>
            <Input
              name="email"
              type="email"
              placeholder={t('forgotPassword.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-300 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium"
            >
              {t('forgotPassword.sendResetLink')}
            </Button>
          </div>

          {/* Back to Login Link */}
          <div className="text-center pt-6">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('forgotPassword.rememberPassword')}{" "}
              <Button
                type="button"
                variant="link"
                onClick={onBack}
                className="text-sm text-primary hover:text-primary/80 p-0 h-auto font-medium"
              >
                {t('forgotPassword.backToLogin')}
              </Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
