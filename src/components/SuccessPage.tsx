import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Home, FileText, ArrowRight } from "lucide-react";

interface SuccessPageProps {
  title?: string;
  message?: string;
  submessage?: string;
  onNavigate: (view: string) => void;
  primaryAction?: {
    label: string;
    view: string;
  };
  secondaryAction?: {
    label: string;
    view: string;
  };
}

export function SuccessPage({ 
  title = "Muvaffaqiyatli!",
  message = "Arizangiz muvaffaqiyatli qabul qilindi",
  submessage = "Tez orada siz bilan bog'lanamiz",
  onNavigate,
  primaryAction = { label: "Bosh sahifa", view: "dashboard" },
  secondaryAction
}: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-[#2c3e50] dark:to-[#1a1a1a] px-6 pt-12 pb-32">
        <div className="flex items-center justify-center">
          <h1 className="text-white text-center">Tasdiqlash</h1>
        </div>
      </div>

      {/* Content Card - Overlapping Header */}
      <div className="flex-1 -mt-24 px-6">
        <Card className="bg-card rounded-3xl shadow-lg mb-6">
          <CardContent className="p-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* Success Title */}
            <h2 className="text-center text-foreground mb-3">
              {title}
            </h2>

            {/* Success Message */}
            <p className="text-center text-muted-foreground mb-2">
              {message}
            </p>

            {/* Sub Message */}
            {submessage && (
              <p className="text-center text-sm text-muted-foreground">
                {submessage}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 rounded-3xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  Keyingi qadamlar
                </h4>
                <p className="text-sm text-muted-foreground">
                  Arizangiz ko'rib chiqilmoqda. Natijalar haqida sizga bildirishnoma orqali xabar beramiz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            onClick={() => onNavigate(primaryAction.view)}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
          >
            <Home className="w-5 h-5 mr-2" />
            {primaryAction.label}
          </Button>

          {secondaryAction && (
            <Button
              onClick={() => onNavigate(secondaryAction.view)}
              variant="outline"
              className="w-full h-12 border-2 rounded-2xl"
            >
              {secondaryAction.label}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}