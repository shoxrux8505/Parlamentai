import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  User
} from "lucide-react";

interface FavoritesPageProps {
  favoriteServices: any[];
  onBack: () => void;
  onNavigate: (view: string) => void;
  onSelectService: (service: any) => void;
  onRemoveFromFavorites: (serviceId: number) => void;
}

export function FavoritesPage({
  favoriteServices,
  onBack,
  onNavigate,
  onSelectService,
  onRemoveFromFavorites
}: FavoritesPageProps) {

  const handleBookService = (service: any) => {
    onSelectService(service);
    onNavigate("service-booking");
  };

  return (
    <div className="bg-gray-50 dark:bg-black">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-[#2c3e50] dark:to-[#1a1a1a] px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-white">Sevimlilar</h1>
          <div className="w-10"></div>
        </div>

        {/* Info Section */}
        <div className="mb-4">
          <h2 className="text-white font-medium mb-1">
            {favoriteServices.length} saqlangan yurist
          </h2>
          <p className="text-white/90 text-sm">Tezkor murojaat uchun sevimli yuristlaringiz</p>
        </div>
      </div>

      {/* Favorites List */}
      <div className="px-6 py-4">
        {favoriteServices.length > 0 ? (
          <div className="space-y-3">
            {favoriteServices.map((service) => (
              <Card key={service.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden">
                      <img 
                        src={service.photo} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {service.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{service.department}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveFromFavorites(service.id)}
                          className="p-1 h-auto text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">{service.rating}</span>
                        </div>
                        <div className="flex items-center">
                          {service.online ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-orange-500" />
                          )}
                          <span className="text-sm ml-1">
                            {service.availability === "Available" ? "Mavjud" : 
                             service.availability === "Busy" ? "Band" : service.availability}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-9 rounded-xl border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          Batafsil
                        </Button>
                        <Button
                          onClick={() => handleBookService(service)}
                          size="sm"
                          className="flex-1 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Yozilish
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Sevimli yuristlar yo'q
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Tezkor murojaat uchun o'z sevimli yuristlaringizni saqlang.
            </p>
            <Button
              onClick={() => onNavigate("services")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Yuristlarni ko'rish
            </Button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {favoriteServices.length > 0 && (
        <div className="px-6 pb-6">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onNavigate("services")}
              className="flex-1 h-12 rounded-xl border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Boshqa yuristlar
            </Button>
            <Button
              onClick={() => onNavigate("consultation")}
              className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
            >
              Tezkor maslahat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}