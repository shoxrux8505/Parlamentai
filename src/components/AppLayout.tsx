import React from "react";
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
  const navItems = [
    { id: "dashboard", icon: Home, label: "Bosh sahifa" },
    { id: "services", icon: Users, label: "Yuristlar" },
    { id: "favorites", icon: Heart, label: "Sevimlilar" },
    { id: "consultation", icon: MessageSquare, label: "Chat" },
    { id: "menu", icon: Menu, label: "Menyu" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Fixed Side Navigation (Desktop) */}
      <div className="hidden md:flex flex-col w-64 bg-card border-r border-border p-6 h-screen sticky top-0 shrink-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3 mb-10 px-2 cursor-pointer" onClick={() => onNavigate("dashboard")}>
           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center shadow-md">
             <span className="text-white font-bold text-xl">P</span>
           </div>
           <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">Parlament</span>
        </div>
        
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button 
                key={item.id}
                className={`flex items-center space-x-4 p-3.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md transform scale-[1.02]" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon className={`w-5 h-5 ${isActive ? "" : "opacity-80"}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-20 md:pb-0 relative">
        {children}
      </div>

      {/* Fixed Bottom Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4 z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button 
                key={item.id}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors relative ${
                  isActive 
                    ? "text-primary bg-transparent" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <div className={`relative ${isActive ? "bg-primary/10 p-1.5 rounded-full" : "p-1.5"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}