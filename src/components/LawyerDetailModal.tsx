import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  X, 
  Heart, 
  Share2, 
  Star, 
  Clock, 
  Users, 
  Briefcase,
  Calendar,
  MessageCircle,
  ArrowLeft,
  DollarSign,
  ChevronRight,
  Info,
  MapPin,
  GraduationCap,
  Award,
  User
} from "lucide-react";
import { toast } from "sonner";

interface LawyerDetailModalProps {
  lawyer: any;
  isOpen: boolean;
  onClose: () => void;
  onBook: (lawyer: any) => void;
  isFavorite: boolean;
  onToggleFavorite: (lawyer: any) => void;
}

export function LawyerDetailModal({ 
  lawyer, 
  isOpen, 
  onClose, 
  onBook, 
  isFavorite, 
  onToggleFavorite 
}: LawyerDetailModalProps) {
  const [activeTab, setActiveTab] = useState("About");

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !lawyer) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lawyer.name,
        text: `${lawyer.name} - ${lawyer.department} mutaxassisi`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast.success("Havola nusxalandi!");
    }
  };

  const tabs = ["About", "Availability", "Experience", "Education"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-black text-gray-900 mb-4">Description</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {lawyer.description}. {lawyer.name} is a highly experienced, board-certified specialist with over {lawyer.experience || "11 years"} of expertise in professional legal matters. His specialization includes... <span className="text-blue-600 font-bold cursor-pointer">Read More</span>
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Session Fee</p>
                <p className="text-lg font-black text-gray-900">$95.00</p>
              </Card>
              <Card className="bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-3">
                  <MessageCircle className="w-5 h-5 text-teal-600" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Message Fee</p>
                <p className="text-lg font-black text-gray-900">$20.00</p>
              </Card>
            </div>
          </div>
        );
      case "Availability":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <h3 className="text-lg font-black text-gray-900 mb-4">Weekly Schedule</h3>
            {["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"].map(day => (
              <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="font-bold text-gray-700">{day}</span>
                <span className="text-sm font-black text-blue-600">09:00 - 18:00</span>
              </div>
            ))}
          </div>
        );
      case "Experience":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <h3 className="text-lg font-black text-gray-900 mb-4">Work History</h3>
            <div className="relative pl-8 border-l-2 border-blue-100 space-y-8">
              {[
                { year: "2018 - Present", title: "Bosh yurist", place: "Toshkent Davlat Adliya Departamenti" },
                { year: "2014 - 2018", title: "Katta maslahatchi", place: "Legal Pro Hamkorligi" }
              ].map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                  <p className="text-xs font-bold text-blue-600 mb-1">{exp.year}</p>
                  <h4 className="font-black text-gray-900 mb-1">{exp.title}</h4>
                  <p className="text-sm text-gray-500">{exp.place}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Education":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <h3 className="text-lg font-black text-gray-900 mb-4">Qualifications</h3>
            {[
              { icon: GraduationCap, title: "Huquq fanlari doktori", school: "TDYU" },
              { icon: Award, title: "Xalqaro litsenziya", school: "Adliya Vazirligi" }
            ].map((edu, i) => (
              <div key={i} className="flex items-center space-x-4 p-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <edu.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">{edu.title}</h4>
                  <p className="text-sm text-gray-500">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col animate-in slide-in-from-bottom-full duration-500">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[150px]">
      {/* Light Blue Header Background */}
      <div className="absolute top-0 left-0 right-0 h-[45vh] bg-[#EDF5FF] -z-10"></div>

      {/* Top Header Controls */}
      <div className="flex items-center justify-between p-6 w-full z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white shadow-md text-gray-900 hover:bg-gray-50 active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(lawyer)}
            className="w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-50 active:scale-90 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="w-12 h-12 rounded-full bg-white shadow-md text-gray-900 hover:bg-gray-50 active:scale-90 transition-transform"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {/* Lawyer Info Section */}
        <div className="px-8 pb-4 flex relative pt-4 min-h-[35vh]">
          <div className="flex-1 z-10 pr-24">
            <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Info className="w-3 h-3 mr-2 opacity-60" />
              {lawyer.department}
            </div>
            <h2 className="text-3xl font-black text-[#1A1C1E] leading-tight mb-2 tracking-tight">
              {lawyer.name}
            </h2>
            <p className="text-gray-400 text-[10px] font-bold leading-relaxed mb-8 max-w-[180px]">
              MBBS, FCPS, FRCP (Edin), FCCP (USA), FACC (USA), FESC
            </p>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-black text-blue-600">$90</span>
              <span className="text-gray-400 text-xs font-bold ml-1">/session</span>
            </div>
          </div>
          
          {/* Lawyer Photo */}
          <div className="absolute right-0 bottom-0 w-64 h-80 z-0 flex items-end">
            {lawyer.photo ? (
              <img 
                src={lawyer.photo} 
                alt={lawyer.name} 
                className="w-full h-full object-contain object-bottom mix-blend-multiply"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-100/30 rounded-full mb-10">
                <User className="w-32 h-32 text-blue-200" />
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-8 grid grid-cols-3 gap-3 -mt-6 mb-8 relative z-20">
          <Card className="bg-white border-0 shadow-xl shadow-blue-500/5 rounded-[1.5rem] p-4 flex flex-col items-center justify-center text-center h-28">
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-orange-500" />
              </div>
            </div>
            <p className="text-lg font-black text-gray-900 mt-4 mb-0.5">{lawyer.experience || "11 years"}</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Experience</p>
          </Card>
          <Card className="bg-white border-0 shadow-xl shadow-blue-500/5 rounded-[1.5rem] p-4 flex flex-col items-center justify-center text-center h-28">
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <p className="text-lg font-black text-gray-900 mt-4 mb-0.5">{lawyer.rating}</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Rating</p>
          </Card>
          <Card className="bg-white border-0 shadow-xl shadow-blue-500/5 rounded-[1.5rem] p-4 flex flex-col items-center justify-center text-center h-28">
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-500" />
              </div>
            </div>
            <p className="text-lg font-black text-gray-900 mt-4 mb-0.5">1500+</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Clients</p>
          </Card>
        </div>

        {/* Details Area */}
        <div className="bg-white px-8 pt-6 pb-48">
          {/* Pill Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100/60 p-1.5 rounded-full mb-8 overflow-x-auto no-scrollbar border border-gray-100/50">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[100px] py-3 rounded-full text-xs font-black transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-white text-gray-900 shadow-md shadow-gray-200/50" 
                    : "text-gray-400 hover:text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
             {renderTabContent()}
          </div>
        </div>
      </div>
    </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white to-transparent pt-10 z-[100000] pb-12">
        <Button
          className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(59,130,246,0.3)] flex items-center justify-center space-x-3 transition-all active:scale-95 group"
          onClick={() => onBook(lawyer)}
        >
          <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Band qilish</span>
        </Button>
      </div>
    </div>
  );
}
