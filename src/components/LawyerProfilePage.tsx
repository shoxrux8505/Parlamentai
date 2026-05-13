import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Briefcase, 
  Users, 
  DollarSign,
  MessageSquare,
  Calendar,
  ChevronRight
} from "lucide-react";

interface LawyerProfilePageProps {
  lawyer: any;
  onBack: () => void;
  onBook: (lawyer: any) => void;
}

export function LawyerProfilePage({ lawyer, onBack, onBook }: LawyerProfilePageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("About");

  if (!lawyer) return null;

  const tabs = ["About", "Availability", "Experience", "Education"];

  return (
    <div className="min-h-screen bg-[#f8fbff] pb-24">
      {/* Header */}
      <div className="relative h-80 w-full overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        
        {/* Navigation Actions */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border-0"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Button>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border-0"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border-0"
            >
              <Share2 className="w-6 h-6 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Professional Image */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div className="relative w-64 h-80">
            <img 
              src={lawyer.photo} 
              alt={lawyer.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Main Info */}
      <div className="px-6 mt-6">
        <p className="text-blue-500 font-bold text-sm mb-1">Professional Lawyer</p>
        <h1 className="text-3xl font-black text-gray-900 mb-2">{lawyer.name}</h1>
        <p className="text-gray-500 text-sm font-medium mb-4">{lawyer.department} Specialist</p>
        
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-3xl font-black text-blue-600">$90</span>
          <span className="text-gray-400 font-bold">/session</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center mb-2">
              <Briefcase className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-sm font-black text-gray-900">{lawyer.experience || "10 yil"}</span>
            <span className="text-[10px] font-bold text-gray-400">Experience</span>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-2xl bg-yellow-50 flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            </div>
            <span className="text-sm font-black text-gray-900">{lawyer.rating}</span>
            <span className="text-[10px] font-bold text-gray-400">Rating</span>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-black text-gray-900">1.2k+</span>
            <span className="text-[10px] font-bold text-gray-400">Clients</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 overflow-x-auto no-scrollbar mb-6 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-black transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h3 className="text-lg font-black text-gray-900 mb-3">Description</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {lawyer.description}. This lawyer is a highly experienced, board-certified legal expert with over {lawyer.experience || "10 years"} of expertise in legal consultancy. Specialized in complex cases and strategic planning...
            <span className="text-blue-500 font-bold ml-1 cursor-pointer">Read More</span>
          </p>
        </div>

        {/* Fee Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-xs font-bold text-gray-400 mb-1">Session Fee</p>
            <p className="text-lg font-black text-gray-900">$95.00</p>
          </div>
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-xs font-bold text-gray-400 mb-1">Message Fee</p>
            <p className="text-lg font-black text-gray-900">$20.00</p>
          </div>
        </div>
      </div>

      {/* Booking CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-50 z-20">
        <Button
          onClick={() => onBook(lawyer)}
          className="w-full h-16 rounded-2xl bg-blue-600 text-white font-black text-base shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-[0.98]"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Now
        </Button>
      </div>
    </div>
  );
}
