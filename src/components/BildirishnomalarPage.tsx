import React, { useState } from "react";
import { ArrowLeft, Bell, CheckCheck, Trash2, Clock, Calendar, FileText, AlertCircle, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageContext";

interface Notification {
  id: number;
  type: "appointment" | "document" | "system" | "reminder" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
  date: string;
}

interface BildirishnomalarPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function BildirishnomalarPage({ onBack, onNavigate }: BildirishnomalarPageProps) {
  const { language } = useLanguage();

  const translations = {
    uz: {
      title: "Bildirishnomalar",
      all: "Hammasi",
      unread: "O'qilmagan",
      markAllRead: "Hammasini o'qilgan qilish",
      clearAll: "Hammasini tozalash",
      noNotifications: "Bildirishnomalar yo'q",
      noNotificationsMessage: "Sizda hozircha bildirishnomalar yo'q",
      appointmentConfirmed: "Uchrashuv tasdiqlandi",
      appointmentReminder: "Uchrashuv eslatmasi",
      documentReady: "Hujjat tayyor",
      systemUpdate: "Tizim yangilanishi",
      newFeature: "Yangi imkoniyat",
      appointmentScheduled: "Sizning uchrashuvingiz muvaffaqiyatli rejalashtirildi",
      appointmentTomorrow: "Sizning ertaga soat 10:00 da uchrashuvingiz bor",
      documentProcessed: "Sizning hujjatingiz qayta ishlandi va yuklab olish uchun tayyor",
      securityUpdate: "Tizimda xavfsizlik yangilanishi amalga oshirildi",
      chatbotFeature: "AI yordamchi endi yangi tillarda so'rashishni qo'llab-quvvatlaydi",
      proposalReceived: "Taklifingiz qabul qilindi",
      proposalReview: "Sizning taklifingiz ko'rib chiqilmoqda va tez orada javob beramiz",
      liveStreamStarting: "Jonli efir boshlanmoqda",
      liveStreamNotice: "Parlament majlisi 15 daqiqadan keyin jonli efirda boshlanadi",
      justNow: "Hozir",
      minutesAgo: "daqiqa oldin",
      hoursAgo: "soat oldin",
      yesterday: "Kecha",
      daysAgo: "kun oldin"
    },
    en: {
      title: "Notifications",
      all: "All",
      unread: "Unread",
      markAllRead: "Mark all as read",
      clearAll: "Clear all",
      noNotifications: "No notifications",
      noNotificationsMessage: "You don't have any notifications yet",
      appointmentConfirmed: "Appointment Confirmed",
      appointmentReminder: "Appointment Reminder",
      documentReady: "Document Ready",
      systemUpdate: "System Update",
      newFeature: "New Feature",
      appointmentScheduled: "Your appointment has been successfully scheduled",
      appointmentTomorrow: "You have an appointment tomorrow at 10:00 AM",
      documentProcessed: "Your document has been processed and is ready for download",
      securityUpdate: "A security update has been applied to the system",
      chatbotFeature: "AI Assistant now supports queries in new languages",
      proposalReceived: "Proposal Received",
      proposalReview: "Your proposal is being reviewed and we'll respond soon",
      liveStreamStarting: "Live Stream Starting",
      liveStreamNotice: "Parliament session will start live in 15 minutes",
      justNow: "Just now",
      minutesAgo: "minutes ago",
      hoursAgo: "hours ago",
      yesterday: "Yesterday",
      daysAgo: "days ago"
    },
    ru: {
      title: "Уведомления",
      all: "Все",
      unread: "Непрочитанные",
      markAllRead: "Отметить все как прочитанные",
      clearAll: "Очистить все",
      noNotifications: "Нет уведомлений",
      noNotificationsMessage: "У вас пока нет уведомлений",
      appointmentConfirmed: "Встреча подтверждена",
      appointmentReminder: "Напоминание о встрече",
      documentReady: "Документ готов",
      systemUpdate: "Обновление системы",
      newFeature: "Новая функция",
      appointmentScheduled: "Ваша встреча успешно запланирована",
      appointmentTomorrow: "У вас встреча завтра в 10:00",
      documentProcessed: "Ваш документ обработан и готов к загрузке",
      securityUpdate: "В систему внесено обновление безопасности",
      chatbotFeature: "AI-помощник теперь поддерживает запросы на новых языках",
      proposalReceived: "Предложение получено",
      proposalReview: "Ваше предложение рассматривается, скоро ответим",
      liveStreamStarting: "Начинается прямой эфир",
      liveStreamNotice: "Заседание парламента начнется в прямом эфире через 15 минут",
      justNow: "Только что",
      minutesAgo: "минут назад",
      hoursAgo: "часов назад",
      yesterday: "Вчера",
      daysAgo: "дней назад"
    }
  };

  const t = translations[language];

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "appointment",
      title: t.appointmentConfirmed,
      message: t.appointmentScheduled,
      time: t.justNow,
      date: new Date().toISOString(),
      read: false
    },
    {
      id: 2,
      type: "reminder",
      title: t.appointmentReminder,
      message: t.appointmentTomorrow,
      time: "2 " + t.hoursAgo,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 3,
      type: "document",
      title: t.documentReady,
      message: t.documentProcessed,
      time: "5 " + t.hoursAgo,
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: 4,
      type: "system",
      title: t.systemUpdate,
      message: t.securityUpdate,
      time: t.yesterday,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: 5,
      type: "info",
      title: t.newFeature,
      message: t.chatbotFeature,
      time: "2 " + t.daysAgo,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: 6,
      type: "document",
      title: t.proposalReceived,
      message: t.proposalReview,
      time: "3 " + t.daysAgo,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: 7,
      type: "info",
      title: t.liveStreamStarting,
      message: t.liveStreamNotice,
      time: "4 " + t.daysAgo,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      case "system":
        return <AlertCircle className="w-5 h-5" />;
      case "reminder":
        return <Clock className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "document":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "system":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      case "reminder":
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      case "info":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    }
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00227c] to-[#0047ab] dark:from-[#2c3e50] dark:to-[#1a1a1a] text-white px-6 pt-12 pb-8">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-white">{t.title}</h1>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs text-white">{unreadCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              filter === "all"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/70"
            }`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              filter === "unread"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/70"
            }`}
          >
            {t.unread} {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      {notifications.length > 0 && (
        <div className="px-6 py-4 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="flex-1 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            {t.markAllRead}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="flex-1 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {t.clearAll}
          </Button>
        </div>
      )}

      {/* Notifications List */}
      <div className="px-6 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">{t.noNotifications}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {t.noNotificationsMessage}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all ${
                notification.read
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  : "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-gray-900 dark:text-white pr-2">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1.5"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {notification.time}
                      </span>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs text-primary dark:text-blue-400 hover:underline"
                          >
                            O'qilgan
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="text-xs text-red-600 dark:text-red-400 hover:underline"
                        >
                          O'chirish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
