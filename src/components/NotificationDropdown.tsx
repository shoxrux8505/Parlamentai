import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Calendar,
  Scale,
  MessageSquare
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "urgent";
  time: string;
  icon: any;
}

interface NotificationDropdownProps {
  className?: string;
}

export function NotificationDropdown({ className }: NotificationDropdownProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Mock notifications data - show only latest 3
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Yangi qonun o'zgarishi",
      message: "Oila kodeksiga yangi o'zgarishlar kiritildi",
      type: "info",
      time: "2 soat oldin",
      icon: Scale
    },
    {
      id: 2,
      title: "Maslahat javob keldi",
      message: "Sizning so'rovingizga javob berildi",
      type: "success", 
      time: "4 soat oldin",
      icon: MessageSquare
    },
    {
      id: 3,
      title: "Parlament yig'ilishi",
      message: "Ertaga parlament majlisi bo'lib o'tadi",
      type: "warning",
      time: "1 kun oldin",
      icon: Calendar
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertCircle;
      case "urgent":
        return AlertCircle;
      default:
        return Info;
    }
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bell Icon with Badge */}
      <div className="relative">
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-medium">
              {notifications.length}
            </span>
          </div>
        )}
      </div>

      {/* Notification Dropdown */}
      {isHovered && (
        <div className="absolute top-full right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] z-50">
          <Card className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
                <h3 className="font-semibold text-gray-900 text-sm">Bildirishnomalar</h3>
              </div>

              {/* Notifications List */}
              <div className="max-h-56 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 3).map((notification) => {
                    const IconComponent = notification.icon;
                    
                    return (
                      <div 
                        key={notification.id}
                        className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start space-x-2.5">
                          <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-xs mb-1 truncate">
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2" style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${getNotificationColor(notification.type)}`}>
                                {notification.type === "info" ? "Ma'lumot" : 
                                 notification.type === "success" ? "Muvaffaqiyat" : 
                                 notification.type === "warning" ? "Ogohlantirish" : 
                                 "Muhim"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-3 py-4 text-center">
                    <Bell className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Yangi bildirishnomalar yo'q</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                  <button className="w-full text-xs text-blue-600 hover:text-blue-500 font-medium">
                    Barchasi
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}