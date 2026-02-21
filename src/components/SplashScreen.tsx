import { Building, Shield } from "lucide-react";
import { Progress } from "./ui/progress";

interface SplashScreenProps {
  progress: number;
}

export function SplashScreen({ progress }: SplashScreenProps) {
  return (
    <div className="h-full bg-gradient-to-br from-primary via-primary to-accent flex flex-col items-center justify-center px-8 text-white">
      {/* Logo */}
      <div className="mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm mb-6">
            <Building className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* App Name */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">PARLAMENT AI</h1>
        <p className="text-lg opacity-90">Government Services Portal</p>
        <p className="text-sm opacity-75 mt-2">Powered by Artificial Intelligence</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs">
        <Progress 
          value={progress} 
          className="h-2 bg-white/20"
        />
        <p className="text-center text-sm opacity-75 mt-4">
          Initializing secure connection...
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs opacity-60">
          Ministry of Parliamentary Affairs
        </p>
        <p className="text-xs opacity-60">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}