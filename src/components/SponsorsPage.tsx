import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { 
  ArrowLeft, 
  Building2, 
  ExternalLink,
  Globe,
  Mail,
  Phone,
  MapPin,
  Star,
  CheckCircle2
} from "lucide-react";

interface SponsorsPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function SponsorsPage({ onBack, onNavigate }: SponsorsPageProps) {
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const sponsors = [
    {
      id: 1,
      name: "O'zbekiston Respublikasi Prezidenti Administratsiyasi",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
      category: "government",
      tier: "platinum",
      description: "O'zbekiston Respublikasi Prezidenti Administratsiyasi parlament faoliyatini qo'llab-quvvatlaydi va davlat boshqaruvi tizimida muhim o'rin tutadi.",
      website: "https://president.uz",
      email: "info@president.uz",
      phone: "+998 71 239 18 25",
      location: "Toshkent, O'zbekiston",
      established: "1991",
      verified: true
    },
    {
      id: 2,
      name: "Adliya Vazirligi",
      logo: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop",
      category: "government",
      tier: "platinum",
      description: "Adliya vazirligi qonunchilik faoliyati va huquqiy masalalar bo'yicha parlament bilan hamkorlik qiladi.",
      website: "https://minjust.uz",
      email: "info@minjust.uz",
      phone: "+998 71 239 94 91",
      location: "Toshkent, O'zbekiston",
      established: "1991",
      verified: true
    },
    {
      id: 3,
      name: "Iqtisodiyot va Moliya Vazirligi",
      logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=200&fit=crop",
      category: "government",
      tier: "gold",
      description: "Davlat byudjeti va iqtisodiy siyosat bo'yicha parlament bilan hamkorlik.",
      website: "https://mf.uz",
      email: "info@mf.uz",
      phone: "+998 71 239 13 11",
      location: "Toshkent, O'zbekiston",
      established: "1991",
      verified: true
    },
    {
      id: 4,
      name: "Ta'lim Vazirligi",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop",
      category: "government",
      tier: "gold",
      description: "Ta'lim sohasidagi qonunchilik islohotlarini qo'llab-quvvatlaydi.",
      website: "https://edu.uz",
      email: "info@edu.uz",
      phone: "+998 71 244 79 34",
      location: "Toshkent, O'zbekiston",
      established: "1992",
      verified: true
    },
    {
      id: 5,
      name: "Fuqarolik Jamiyatini Rivojlantirish Markazi",
      logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop",
      category: "ngo",
      tier: "silver",
      description: "Fuqarolik jamiyati institutlarini rivojlantirish va parlament faoliyatida jamoatchilik ishtirokini oshirish.",
      website: "https://ngo.uz",
      email: "info@ngo.uz",
      phone: "+998 71 244 88 88",
      location: "Toshkent, O'zbekiston",
      established: "2005",
      verified: true
    },
    {
      id: 6,
      name: "Yoshlar Ittifoqi",
      logo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
      category: "ngo",
      tier: "silver",
      description: "Yoshlar siyosatini shakllantirish va parlament faoliyatida yoshlar ishtirokini ta'minlash.",
      website: "https://yoshlar.uz",
      email: "info@yoshlar.uz",
      phone: "+998 71 244 77 77",
      location: "Toshkent, O'zbekiston",
      established: "2001",
      verified: false
    },
    {
      id: 7,
      name: "UNDP O'zbekiston",
      logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200&h=200&fit=crop",
      category: "international",
      tier: "gold",
      description: "BMT Rivojlanish Dasturi parlament islohotlari va demokratik jarayonlarni qo'llab-quvvatlaydi.",
      website: "https://undp.org/uz",
      email: "registry.uz@undp.org",
      phone: "+998 71 120 34 50",
      location: "Toshkent, O'zbekiston",
      established: "1993",
      verified: true
    },
    {
      id: 8,
      name: "Yevropa Ittifoqi Delegatsiyasi",
      logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop",
      category: "international",
      tier: "gold",
      description: "Yevropa Ittifoqi parlament faoliyatini rivojlantirish va demokratik boshqaruv tizimini mustahkamlashda yordam beradi.",
      website: "https://eeas.europa.eu/uz",
      email: "delegation-uzbekistan@eeas.europa.eu",
      phone: "+998 71 120 53 00",
      location: "Toshkent, O'zbekiston",
      established: "2011",
      verified: true
    }
  ];

  const categories = [
    { id: "all", name: "Barchasi", count: sponsors.length },
    { id: "government", name: "Davlat organlari", count: sponsors.filter(s => s.category === "government").length },
    { id: "ngo", name: "NNT va tashkilotlar", count: sponsors.filter(s => s.category === "ngo").length },
    { id: "international", name: "Xalqaro tashkilotlar", count: sponsors.filter(s => s.category === "international").length }
  ];

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "platinum":
        return <Badge className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900">Platinum</Badge>;
      case "gold":
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">Oltin</Badge>;
      case "silver":
        return <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white">Kumush</Badge>;
      default:
        return <Badge variant="secondary">Hamkor</Badge>;
    }
  };

  const filteredSponsors = activeCategory === "all" 
    ? sponsors 
    : sponsors.filter(s => s.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
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
          <h1 className="text-white">Hamkorlar</h1>
          <div className="w-10"></div>
        </div>

        <p className="text-white/90 text-center text-sm">
          Parlament faoliyatini qo'llab-quvvatlovchi tashkilotlar
        </p>
      </div>

      {/* Category Filters */}
      <div className="px-6 py-4 overflow-x-auto">
        <div className="flex space-x-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-2xl whitespace-nowrap ${
                activeCategory === category.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card hover:bg-secondary"
              }`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Sponsors Grid */}
      <div className="px-6 pb-6 space-y-4">
        {filteredSponsors.map((sponsor) => (
          <Card 
            key={sponsor.id} 
            className="bg-card rounded-3xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedSponsor(sponsor)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-foreground line-clamp-1">{sponsor.name}</h3>
                        {sponsor.verified && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {sponsor.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    {getTierBadge(sponsor.tier)}
                    <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto">
                      Batafsil
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sponsor Details Dialog */}
      <Dialog open={!!selectedSponsor} onOpenChange={() => setSelectedSponsor(null)}>
        <DialogContent className="max-h-[85vh] overflow-hidden rounded-3xl p-5">
          <DialogHeader className="pr-8">
            <DialogTitle className="text-left break-words leading-tight">
              {selectedSponsor?.name}
              {selectedSponsor?.verified && (
                <CheckCircle2 className="w-4 h-4 text-blue-600 inline-block ml-2" />
              )}
            </DialogTitle>
            <DialogDescription className="text-left text-sm">
              {selectedSponsor?.category === "government" && "Davlat organi"}
              {selectedSponsor?.category === "ngo" && "NNT va tashkilot"}
              {selectedSponsor?.category === "international" && "Xalqaro tashkilot"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSponsor && (
            <div className="space-y-4 overflow-y-auto max-h-[calc(85vh-8rem)] pr-1">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
                  <img 
                    src={selectedSponsor.logo} 
                    alt={selectedSponsor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Tier Badge */}
              <div className="flex justify-center">
                {getTierBadge(selectedSponsor.tier)}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedSponsor.description}
              </p>

              {/* Contact Information */}
              <div className="space-y-3 pt-3 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">Aloqa ma'lumotlari</h4>
                
                {selectedSponsor.website && (
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Veb-sayt</p>
                      <a 
                        href={selectedSponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline break-all leading-tight"
                      >
                        {selectedSponsor.website}
                      </a>
                    </div>
                  </div>
                )}

                {selectedSponsor.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <a 
                        href={`mailto:${selectedSponsor.email}`}
                        className="text-xs text-foreground hover:underline break-all leading-tight"
                      >
                        {selectedSponsor.email}
                      </a>
                    </div>
                  </div>
                )}

                {selectedSponsor.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Telefon</p>
                      <a 
                        href={`tel:${selectedSponsor.phone}`}
                        className="text-xs text-foreground hover:underline leading-tight"
                      >
                        {selectedSponsor.phone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedSponsor.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Manzil</p>
                      <p className="text-xs text-foreground leading-tight">{selectedSponsor.location}</p>
                    </div>
                  </div>
                )}

                {selectedSponsor.established && (
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Tashkil etilgan</p>
                      <p className="text-xs text-foreground leading-tight">{selectedSponsor.established}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-3">
                {selectedSponsor.website && (
                  <Button
                    onClick={() => window.open(selectedSponsor.website, '_blank')}
                    className="w-full h-10 bg-primary hover:bg-primary/90 rounded-2xl text-sm"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Saytga o'tish
                  </Button>
                )}
                {selectedSponsor.email && (
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `mailto:${selectedSponsor.email}`}
                    className="w-full h-10 rounded-2xl text-sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Xat yuborish
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}