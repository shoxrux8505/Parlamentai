import { Button } from "./ui/button";
import { useLanguage } from "./LanguageContext";
import { ChevronLeft } from "lucide-react";
import logoImage from "../assets/5cc4edff383c30532f088193ee5b23ec14628554.png";

interface OnboardingScreenProps {
  currentStep: number;
  onSkip: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function OnboardingScreen({ currentStep, onSkip, onNext, onPrevious }: OnboardingScreenProps) {
  const { t } = useLanguage();

  const onboardingData = [
    {
      title: t('onboarding.step1Title'),
      description: t('onboarding.step1Description')
    },
    {
      title: t('onboarding.step2Title'),
      description: t('onboarding.step2Description')
    },
    {
      title: t('onboarding.step3Title'),
      description: t('onboarding.step3Description')
    }
  ];

  const currentData = onboardingData[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col text-white">
      {/* Header */}
      <div className="flex justify-end items-center pt-12 pb-6 px-6">
        <Button
          variant="ghost"
          onClick={onSkip}
          className="text-white/90 hover:bg-white/10 text-sm font-medium"
        >
          {t('common.skip')}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Logo */}
        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-12">
          <img 
            src={logoImage} 
            alt="Parlament AI" 
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-6">
          {currentData.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-white/90 leading-relaxed mb-16 max-w-sm">
          {currentData.description}
        </p>

        {/* Step Indicators */}
        <div className="flex space-x-2 mb-16">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between">
          {currentStep > 0 ? (
            <Button
              variant="ghost"
              onClick={onPrevious}
              className="text-white hover:bg-white/10 flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('common.back')}</span>
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button
            onClick={onNext}
            className="bg-white text-blue-600 hover:bg-white/90 rounded-full px-6 py-2 font-medium flex items-center space-x-2"
          >
            <span>
              {currentStep === onboardingData.length - 1 ? t('onboarding.step3Title').split(' ')[0] : t('common.next')}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}