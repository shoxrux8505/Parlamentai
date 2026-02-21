import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { 
  ArrowLeft, 
  Send, 
  FileText, 
  Clock, 
  CheckCircle, 
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Eye,
  ThumbsUp,
  MessageCircle,
  Upload,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface TaklifBerishPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
  onSetSuccessData?: (data: any) => void;
}

export function TaklifBerishPage({ onBack, onNavigate, onSetSuccessData }: TaklifBerishPageProps) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    details: "",
    impact: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    location: "",
    anonymous: false,
    publicView: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const proposalCategories = [
    { id: "qonunchilik", name: "Qonunchilik", description: "Yangi qonunlar va o'zgarishlar" },
    { id: "iqtisodiyot", name: "Iqtisodiyot", description: "Iqtisodiy siyosat va biznes" },
    { id: "ijtimoiy", name: "Ijtimoiy masalalar", description: "Ta'lim, sog'liqni saqlash" },
    { id: "infrastruktura", name: "Infrastruktura", description: "Transport, aloqa, qurilish" },
    { id: "ekologiya", name: "Ekologiya", description: "Atrof-muhit va tabiat" },
    { id: "texnologiya", name: "Texnologiya", description: "Raqamlashtirish va innovatsiya" },
    { id: "madaniyat", name: "Madaniyat", description: "San'at, sport, turizm" },
    { id: "boshqa", name: "Boshqa", description: "Boshqa masalalar" }
  ];

  const recentProposals = [
    {
      id: "prop-1",
      title: "Raqamli davlat xizmatlarini kengaytirish",
      category: "texnologiya",
      author: "Anonym",
      date: "2024-01-12",
      status: "review",
      votes: 245,
      comments: 18,
      views: 1250
    },
    {
      id: "prop-2", 
      title: "Maktablarda yangi dasturlash kurslarini joriy etish",
      category: "ijtimoiy",
      author: "Dilshod Karimov",
      date: "2024-01-10",
      status: "discussion",
      votes: 189,
      comments: 32,
      views: 890
    },
    {
      id: "prop-3",
      title: "Shahar markazida ko'proq yashil zonalar yaratish",
      category: "ekologiya", 
      author: "Nargiza Aliyeva",
      date: "2024-01-08",
      status: "approved",
      votes: 432,
      comments: 56,
      views: 2100
    }
  ];

  const myProposals = [
    {
      id: "my-1",
      title: "Mahalla darajasida sport maydonchalarini tiklash",
      category: "infrastruktura",
      date: "2024-01-05",
      status: "review",
      votes: 67,
      comments: 12
    },
    {
      id: "my-2",
      title: "Kichik biznes uchun soliq imtiyozlari",
      category: "iqtisodiyot", 
      date: "2024-01-01",
      status: "discussion",
      votes: 123,
      comments: 28
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitProposal = async () => {
    if (!formData.category || !formData.title || !formData.description) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Set success page data
      if (onSetSuccessData) {
        onSetSuccessData({
          title: "Muvaffaqiyatli yuborildi!",
          message: "Taklifingiz qabul qilindi va ko'rib chiqilmoqda",
          submessage: "Taklifingiz parlamentda muhokama qilinadi. Natijalar haqida sizga bildirishnoma orqali xabar beramiz.",
          primaryAction: { label: "Bosh sahifa", view: "dashboard" },
          secondaryAction: { label: "Takliflarimni ko'rish", view: "taklif-berish" }
        });
      }
      
      // Navigate to success page
      onNavigate("success");
      
      // Reset form
      setFormData({
        category: "",
        title: "",
        description: "",
        details: "",
        impact: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        location: "",
        anonymous: false,
        publicView: true
      });
      setAttachments([]);
    }, 2000);
  };

  const handleAddAttachment = () => {
    const fileName = `hujjat_${attachments.length + 1}.pdf`;
    setAttachments([...attachments, fileName]);
    toast.success("Fayl qo'shildi");
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
    toast.info("Fayl olib tashlandi");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "review":
        return <Badge className="bg-yellow-100 text-yellow-700">Ko'rib chiqilmoqda</Badge>;
      case "discussion":
        return <Badge className="bg-blue-100 text-blue-700">Muhokamada</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-700">Tasdiqlangan</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rad etilgan</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryName = (categoryId: string) => {
    return proposalCategories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
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
          <h1 className="font-medium text-white">Taklif berish</h1>
          <div className="w-10" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-3 text-center">
              <FileText className="w-5 h-5 text-white mx-auto mb-1" />
              <div className="text-sm font-medium text-white">1,250</div>
              <div className="text-xs text-white/80">Takliflar</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-3 text-center">
              <CheckCircle className="w-5 h-5 text-white mx-auto mb-1" />
              <div className="text-sm font-medium text-white">187</div>
              <div className="text-xs text-white/80">Tasdiqlangan</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-3 text-center">
              <Clock className="w-5 h-5 text-white mx-auto mb-1" />
              <div className="text-sm font-medium text-white">89</div>
              <div className="text-xs text-white/80">Ko'rib chiqilmoqda</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1">
            <TabsTrigger value="submit" className="rounded-xl">Yuborish</TabsTrigger>
            <TabsTrigger value="recent" className="rounded-xl">So'ngggi</TabsTrigger>
            <TabsTrigger value="my" className="rounded-xl">Mening</TabsTrigger>
          </TabsList>

          {/* Submit Proposal */}
          <TabsContent value="submit" className="space-y-6">
            <Card className="bg-white rounded-2xl border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-medium text-gray-900 mb-6">Yangi taklif yuborish</h2>
                
                <div className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <Label htmlFor="category">Toifa *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-1 rounded-xl border-gray-200">
                        <SelectValue placeholder="Taklifingiz toifasini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {proposalCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            <div>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-xs text-gray-500">{category.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Sarlavha *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Taklifingizning qisqa sarlavhasi"
                      className="mt-1 rounded-xl border-gray-200"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Qisqacha tavsif *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Taklifingizning qisqacha tavsifi (maksimal 500 belgi)"
                      className="mt-1 rounded-xl border-gray-200 resize-none"
                      rows={3}
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.description.length}/500 belgi
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <Label htmlFor="details">Batafsil tavsif</Label>
                    <Textarea
                      id="details"
                      value={formData.details}
                      onChange={(e) => handleInputChange("details", e.target.value)}
                      placeholder="Taklifingizning to'liq tafsiloti, amalga oshirish yo'llari va foydali tomonlari"
                      className="mt-1 rounded-xl border-gray-200 resize-none"
                      rows={5}
                    />
                  </div>

                  {/* Expected Impact */}
                  <div>
                    <Label htmlFor="impact">Kutilayotgan ta'sir</Label>
                    <Textarea
                      id="impact"
                      value={formData.impact}
                      onChange={(e) => handleInputChange("impact", e.target.value)}
                      placeholder="Ushbu taklif amalga oshirilganda qanday ijobiy natijalar kutiladi"
                      className="mt-1 rounded-xl border-gray-200 resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Hudud/Joylashuv</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Taklif qaysi hududga tegishli (masalan: Toshkent sh., Yunusobod t.)"
                      className="mt-1 rounded-xl border-gray-200"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-900 mb-4">Aloqa ma'lumotlari</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="contactName">To'liq ism</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange("contactName", e.target.value)}
                          placeholder="Ism sharif"
                          className="mt-1 rounded-xl border-gray-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Telefon raqam</Label>
                        <Input
                          id="contactPhone"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                          placeholder="+998 90 123 45 67"
                          className="mt-1 rounded-xl border-gray-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Email manzil</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                          placeholder="example@mail.com"
                          className="mt-1 rounded-xl border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Attachments */}
                  <div>
                    <Label>Qo'shimcha hujjatlar</Label>
                    <div className="mt-2 space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{file}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveAttachment(index)}
                            className="w-6 h-6 text-gray-400 hover:text-red-600 rounded-full p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={handleAddAttachment}
                        variant="outline"
                        className="w-full rounded-xl border-gray-200 border-dashed"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Fayl qo'shish
                      </Button>
                    </div>
                  </div>

                  {/* Settings */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-900 mb-4">Maxfiylik sozlamalari</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={formData.anonymous}
                          onCheckedChange={(checked) => handleInputChange("anonymous", checked as boolean)}
                        />
                        <Label htmlFor="anonymous" className="text-sm">
                          Anonim taklif (ismim ko'rsatilmasin)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="publicView"
                          checked={formData.publicView}
                          onCheckedChange={(checked) => handleInputChange("publicView", checked as boolean)}
                        />
                        <Label htmlFor="publicView" className="text-sm">
                          Ommaga ochiq ko'rish (boshqa foydalanuvchilar ko'rishi mumkin)
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmitProposal}
                    disabled={isSubmitting}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Yuborilmoqda...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Taklifni yuborish</span>
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Proposals */}
          <TabsContent value="recent" className="space-y-4">
            {recentProposals.map(proposal => (
              <Card key={proposal.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryName(proposal.category)}
                        </Badge>
                        {getStatusBadge(proposal.status)}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{proposal.title}</h3>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{proposal.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{proposal.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{proposal.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{proposal.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{proposal.views}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl text-xs"
                    >
                      Batafsil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* My Proposals */}
          <TabsContent value="my" className="space-y-4">
            {myProposals.map(proposal => (
              <Card key={proposal.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryName(proposal.category)}
                        </Badge>
                        {getStatusBadge(proposal.status)}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{proposal.title}</h3>
                      <div className="text-xs text-gray-500">{proposal.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{proposal.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{proposal.comments}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl text-xs"
                      >
                        Tahrirlash
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl text-xs"
                      >
                        Ko'rish
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {myProposals.length === 0 && (
              <Card className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Hali takliflar yo'q</h3>
                  <p className="text-gray-600 mb-4">
                    Siz hali hech qanday taklif yubormagansiz. Birinchi taklifingizni yuboring!
                  </p>
                  <Button
                    onClick={() => {}}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    Taklif yuborish
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}