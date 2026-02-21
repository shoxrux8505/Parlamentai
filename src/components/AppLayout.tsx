import { Button } from "./ui/button";
import { 
  Home, 
  Users, 
  Heart, 
  MessageSquare, 
  Menu 
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (view: string) => void;
}

export function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  return (
    <div className="h-full bg-background flex flex-col relative">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto pb-20">
        {children}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4">
        <div className="flex items-center justify-around">
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === "dashboard" 
                ? "text-primary bg-transparent" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onNavigate("dashboard")}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Bosh sahifa</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === "services" 
                ? "text-primary bg-transparent" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onNavigate("services")}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Yuristlar</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === "favorites" 
                ? "text-primary bg-transparent" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => onNavigate("favorites")}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Sevimlilar</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === "consultation" 
                ? "text-primary bg-transparent" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => onNavigate("consultation")}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Chat</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentPage === "menu" 
                ? "text-primary bg-transparent" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => onNavigate("menu")}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">menyu</span>
          </button>
        </div>
      </div>
    </div>
  );
}