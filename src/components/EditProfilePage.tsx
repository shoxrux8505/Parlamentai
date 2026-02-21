import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Phone, 
  Mail, 
  Shield, 
  Bell, 
  Lock,
  Smartphone,
  Save,
  Building
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface EditProfilePageProps {
  currentUser: any;
  onBack: () => void;
  onNavigate: (view: string) => void;
  onUpdateProfile: (updatedUser: any) => void;
}

export function EditProfilePage({ currentUser, onBack, onNavigate, onUpdateProfile }: EditProfilePageProps) {
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    phone: currentUser.phone || "",
    email: currentUser.email || "",
    position: currentUser.position || "",
    district: currentUser.district || "",
    department: "Parlament Kengashi",
    employeeId: "MP-2024-001",
    workLocation: "Parlament binosi, 1-qavat",
    address: "Toshkent sh., Yunusobod tumani",
    birthDate: "1985-03-15",
    bio: "10 yillik tajribaga ega parlament a'zosi"
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    biometricLogin: true,
    sessionTimeout: "30min"
  });



  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: boolean | string) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };



  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        ...formData
      };
      
      onUpdateProfile(updatedUser);
      setIsLoading(false);
      toast.success("Profil muvaffaqiyatli yangilandi!");
    }, 1500);
  };

  const ProfileSection = ({ 
    title, 
    icon: Icon, 
    children, 
    sectionKey 
  }: { 
    title: string; 
    icon: any; 
    children: React.ReactNode; 
    sectionKey: string;
  }) => (
    <Card className="bg-white rounded-2xl border-0 shadow-sm">
      <CardContent className="p-0">
        <Button
          variant="ghost"
          onClick={() => setActiveSection(activeSection === sectionKey ? null : sectionKey)}
          className="w-full p-6 justify-between hover:bg-gray-50 rounded-2xl"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-lg font-medium text-gray-900">{title}</span>
          </div>
          <div className={`transform transition-transform ${activeSection === sectionKey ? 'rotate-180' : ''}`}>
            <ArrowLeft className="w-6 h-6 text-gray-400 -rotate-90" />
          </div>
        </Button>
        
        {activeSection === sectionKey && (
          <div className="px-6 pb-6 border-t border-gray-100">
            <div className="pt-6 space-y-4">
              {children}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-[#2c3e50] dark:to-[#1a1a1a] px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-medium text-white">Profilni tahrirlash</h1>
          <Button
            onClick={handleSaveProfile}
            disabled={isLoading}
            size="sm"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0 rounded-xl"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full overflow-hidden border-3 border-white/30">
              <ImageWithFallback 
                src={currentUser.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-0"
            >
              <Camera className="w-3 h-3" />
            </Button>
          </div>
          <div className="text-center">
            <h2 className="text-white font-medium text-lg">{formData.name}</h2>
            <p className="text-white/80 text-sm">{formData.position}</p>
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <div className="px-6 py-8 space-y-4 pb-12">
        
        {/* Personal Information */}
        <ProfileSection title="Shaxsiy ma'lumotlar" icon={User} sectionKey="personal">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">To'liq ism</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefon raqam</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="email">Email manzil</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Tug'ilgan sana</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="address">Yashash manzili</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
          </div>
        </ProfileSection>

        {/* Professional Information */}
        <ProfileSection title="Kasbiy ma'lumotlar" icon={Building} sectionKey="professional">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="position">Lavozim</Label>
              <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                <SelectTrigger className="rounded-xl border-gray-200">
                  <SelectValue placeholder="Lavozimni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Member of Parliament">Parlament a'zosi</SelectItem>
                  <SelectItem value="Committee Chair">Qo'mita raisi</SelectItem>
                  <SelectItem value="Deputy Chair">Rais o'rinbosari</SelectItem>
                  <SelectItem value="Secretary">Kotib</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Bo'lim</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="employeeId">Xodim ID</Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                disabled
                className="mt-1 rounded-xl border-gray-200 bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="district">Tuman/Viloyat</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="workLocation">Ish joyi</Label>
              <Input
                id="workLocation"
                value={formData.workLocation}
                onChange={(e) => handleInputChange("workLocation", e.target.value)}
                className="mt-1 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="bio">Qisqacha ma'lumot</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="mt-1 rounded-xl border-gray-200 resize-none"
                rows={3}
              />
            </div>
          </div>
        </ProfileSection>



        {/* Security Settings */}
        <ProfileSection title="Xavfsizlik sozlamalari" icon={Shield} sectionKey="security">
          <div className="space-y-6">
            {/* Security Settings */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Xavfsizlik sozlamalari</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Ikki bosqichli autentifikatsiya</p>
                      <p className="text-xs text-gray-500">Qo'shimcha xavfsizlik</p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Biometrik kirish</p>
                      <p className="text-xs text-gray-500">Barmoq izi/Yuz tanish</p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.biometricLogin}
                    onCheckedChange={(checked) => handleSecurityChange("biometricLogin", checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Sessiya tugash vaqti</Label>
                  <Select 
                    value={securitySettings.sessionTimeout} 
                    onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15 daqiqa</SelectItem>
                      <SelectItem value="30min">30 daqiqa</SelectItem>
                      <SelectItem value="1hour">1 soat</SelectItem>
                      <SelectItem value="4hours">4 soat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Bildirishnoma sozlamalari</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Email bildirishnomalari</p>
                      <p className="text-xs text-gray-500">Yangiliklar va xabarlar</p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.emailNotifications}
                    onCheckedChange={(checked) => handleSecurityChange("emailNotifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">SMS bildirishnomalari</p>
                      <p className="text-xs text-gray-500">Muhim xabarlar</p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.smsNotifications}
                    onCheckedChange={(checked) => handleSecurityChange("smsNotifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Push bildirishnomalari</p>
                      <p className="text-xs text-gray-500">Ilova bildirishnomalar</p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.pushNotifications}
                    onCheckedChange={(checked) => handleSecurityChange("pushNotifications", checked)}
                  />
                </div>
              </div>
            </div>


          </div>
        </ProfileSection>

      </div>

      {/* Save Button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleSaveProfile}
          disabled={isLoading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saqlanmoqda...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Saqlash</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}