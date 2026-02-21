import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Calendar,
  MapPin,
  Phone,
  Video,
  MessageSquare,
  CheckCircle
} from "lucide-react";

interface ServiceBookingPageProps {
  service: any;
  onBack: () => void;
  onConfirmBooking: (service: any, dateTime: string) => void;
}

export function ServiceBookingPage({ service, onBack, onConfirmBooking }: ServiceBookingPageProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("in-person");
  const [notes, setNotes] = useState("");

  if (!service) {
    return (
      <div className="h-full bg-gray-50 dark:bg-black flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Xizmat tanlanmagan</p>
      </div>
    );
  }

  const dates = [
    { date: "Dek 20", day: "Bugun", available: true },
    { date: "Dek 21", day: "Ertaga", available: true },
    { date: "Dek 22", day: "Dush", available: false },
    { date: "Dek 23", day: "Sesh", available: true },
    { date: "Dek 24", day: "Chor", available: true }
  ];

  const times = [
    { time: "09:00", available: true },
    { time: "10:30", available: false },
    { time: "11:00", available: true },
    { time: "14:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: false }
  ];

  const meetingTypes = [
    {
      id: "in-person",
      title: "Shaxsiy uchrashuv",
      description: "Parlament binosi",
      icon: MapPin,
      duration: "60 daqiqa"
    },
    {
      id: "video",
      title: "Video konferensiya",
      description: "Xavfsiz video qo'ng'iroq",
      icon: Video,
      duration: "45 daqiqa"
    },
    {
      id: "phone",
      title: "Telefon qo'ng'irog'i",
      description: "To'g'ridan-to'g'ri telefon orqali",
      icon: Phone,
      duration: "30 daqiqa"
    }
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      const dateTime = `${selectedDate} at ${selectedTime}`;
      onConfirmBooking(service, dateTime);
    }
  };

  const canBook = selectedDate && selectedTime && selectedType;

  return (
    <div className="h-full bg-gray-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 dark:text-white dark:hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold dark:text-white">Uchrashuvga yozilish</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Service Info */}
      <div className="px-6 py-4">
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <img 
                  src={service.photo} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{service.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{service.department}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1 dark:text-white">{service.rating}</span>
                  </div>
                  <Badge 
                    className={service.online ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"}
                  >
                    {service.availability}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meeting Type Selection */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Uchrashuv turi</h3>
        <div className="space-y-3">
          {meetingTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all ${
                  selectedType === type.id 
                    ? "border-accent bg-orange-50 dark:bg-orange-900/20 dark:border-accent" 
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedType === type.id ? "bg-accent text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{type.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{type.description}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {type.duration}
                      </div>
                    </div>
                    {selectedType === type.id && (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Date Selection */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sanani tanlang</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {dates.map((date) => (
            <Button
              key={date.date}
              variant={selectedDate === date.date ? "default" : "outline"}
              disabled={!date.available}
              onClick={() => date.available && setSelectedDate(date.date)}
              className={`flex flex-col items-center p-4 h-auto min-w-[80px] ${
                selectedDate === date.date 
                  ? "bg-primary text-white dark:bg-blue-600 dark:text-white" 
                  : date.available 
                  ? "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700" 
                  : "bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700"
              }`}
            >
              <span className="text-sm font-medium">{date.day}</span>
              <span className="text-xs">{date.date}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vaqtni tanlang</h3>
        <div className="grid grid-cols-3 gap-3">
          {times.map((time) => (
            <Button
              key={time.time}
              variant={selectedTime === time.time ? "default" : "outline"}
              disabled={!time.available}
              onClick={() => time.available && setSelectedTime(time.time)}
              className={`h-12 ${
                selectedTime === time.time 
                  ? "bg-primary text-white dark:bg-blue-600 dark:text-white" 
                  : time.available 
                  ? "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700" 
                  : "bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700"
              }`}
            >
              {time.time}
            </Button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Qo'shimcha izohlar</h3>
        <Textarea
          placeholder="Muhokama qilmoqchi bo'lgan savol yoki mavzularingiz..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[80px] resize-none border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl"
        />
      </div>

      {/* Book Button */}
      <div className="px-6 py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <Button
          onClick={handleBooking}
          disabled={!canBook}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-white rounded-2xl disabled:bg-gray-300 dark:disabled:bg-gray-700"
        >
          Uchrashuvni tasdiqlash
        </Button>
        {selectedDate && selectedTime && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            {selectedDate} kuni soat {selectedTime}da uchrashuv
          </p>
        )}
      </div>
    </div>
  );
}