import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Vote,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  FileText,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface SaylovlarPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function SaylovlarPage({ onBack, onNavigate }: SaylovlarPageProps) {
  const [selectedElection, setSelectedElection] = useState<string | null>(null);

  const currentElections = [
    {
      id: "election-1",
      title: "Qonunchilik palatasi deputatlari saylovlari",
      date: "2024-12-22",
      status: "upcoming",
      type: "parliamentary",
      description: "O'zbekiston Respublikasi Qonunchilik palatasi deputatlarini saylash",
      registrationDeadline: "2024-11-15",
      totalSeats: 150,
      registeredVoters: 25680000,
      participationRate: null,
      districts: [
        { name: "Toshkent shahri", seats: 15, candidates: 45 },
        { name: "Toshkent viloyati", seats: 12, candidates: 36 },
        { name: "Samarqand viloyati", seats: 10, candidates: 30 }
      ]
    }
  ];

  const upcomingElections = [
    {
      id: "election-2", 
      title: "Mahalla fuqarolar yig'ini raisi saylovlari",
      date: "2024-03-15",
      status: "registration",
      type: "local",
      description: "Mahalla darajasida fuqarolar yig'ini raislari saylovlari",
      registrationDeadline: "2024-02-20",
      totalPositions: 12500,
      registeredCandidates: 8900
    },
    {
      id: "election-3",
      title: "Viloyat kengashi deputatlari saylovlari", 
      date: "2024-06-10",
      status: "scheduled",
      type: "regional",
      description: "Viloyat va shahar kengashlari deputatlari saylovlari",
      registrationDeadline: "2024-05-01",
      totalSeats: 2400,
      estimatedVoters: 15200000
    }
  ];

  const pastElections = [
    {
      id: "past-1",
      title: "Prezident saylovlari - 2021",
      date: "2021-10-24",
      status: "completed",
      type: "presidential", 
      winner: "Shavkat Mirziyoyev",
      participationRate: 80.1,
      totalVotes: 19850000,
      results: [
        { candidate: "Shavkat Mirziyoyev", party: "UzLiDeP", votes: 15886784, percentage: 80.1 },
        { candidate: "Robaxon Machmuydova", party: "Adolat", votes: 1526859, percentage: 7.7 },
        { candidate: "Bahtiyor Narmatov", party: "Milliy Tiklanish", votes: 1245632, percentage: 6.3 }
      ]
    },
    {
      id: "past-2",
      title: "Qonunchilik palatasi saylovlari - 2019",
      date: "2019-12-22", 
      status: "completed",
      type: "parliamentary",
      participationRate: 71.8,
      totalSeats: 150,
      results: [
        { party: "UzLiDeP", seats: 53, percentage: 35.3 },
        { party: "Milliy Tiklanish", seats: 36, percentage: 24.0 },
        { party: "Adolat", seats: 24, percentage: 16.0 },
        { party: "Ekologlar", seats: 15, percentage: 10.0 }
      ]
    }
  ];

  const electionNews = [
    {
      id: "news-1",
      title: "Saylov jarayoniga tayyorgarlik boshlandi",
      date: "2024-01-12",
      summary: "Markaziy saylov komissiyasi kelgusi saylovlar uchun tayyorgarlik ishlarini boshladi"
    },
    {
      id: "news-2", 
      title: "Nomzodlar ro'yxatga olish jarayoni",
      date: "2024-01-10",
      summary: "Saylov nomzodlari uchun ro'yxatga olish jarayoni rasmiy ravishda boshlandi"
    }
  ];

  const handleViewDetails = (electionId: string) => {
    setSelectedElection(electionId);
    toast.info("Saylov tafsilotlari yuklanmoqda...");
  };

  const handleRegisterToVote = () => {
    toast.success("Saylovchiga ro'yxatga olish uchun yo'naltirilmoqda...");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-700">Kelgusi</Badge>;
      case "registration":
        return <Badge className="bg-orange-100 text-orange-700">Ro'yxatga olish</Badge>;
      case "scheduled":
        return <Badge className="bg-purple-100 text-purple-700">Rejalashtirilgan</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Yakunlangan</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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
          <h1 className="font-medium text-white">Saylovlar</h1>
          <div className="w-10" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-3 text-center">
              <Vote className="w-6 h-6 text-white mx-auto mb-1" />
              <div className="text-lg font-medium text-white">1</div>
              <div className="text-xs text-white/80">Joriy saylov</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-3 text-center">
              <Users className="w-6 h-6 text-white mx-auto mb-1" />
              <div className="text-lg font-medium text-white">25.7M</div>
              <div className="text-xs text-white/80">Saylovchi</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1">
            <TabsTrigger value="current" className="rounded-xl">Joriy</TabsTrigger>
            <TabsTrigger value="upcoming" className="rounded-xl">Kelgusi</TabsTrigger>
            <TabsTrigger value="results" className="rounded-xl">Natijalar</TabsTrigger>
          </TabsList>

          {/* Current Elections */}
          <TabsContent value="current" className="space-y-4">
            {currentElections.map(election => (
              <Card key={election.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusBadge(election.status)}
                        <Badge variant="outline" className="text-xs">
                          {election.type === "parliamentary" ? "Parlament" : 
                           election.type === "presidential" ? "Prezident" : "Mahalliy"}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{election.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{election.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Saylov sanasi</div>
                        <div className="text-xs text-gray-500">{election.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Ro'yxat muddat</div>
                        <div className="text-xs text-gray-500">{election.registrationDeadline}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-medium text-gray-900">{election.totalSeats}</div>
                        <div className="text-xs text-gray-500">Jami o'rinlar</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-gray-900">
                          {(election.registeredVoters / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-gray-500">Ro'yxatdagi saylovchilar</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Asosiy tumanlar</h4>
                    {election.districts.map((district, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-medium text-sm">{district.name}</div>
                          <div className="text-xs text-gray-500">{district.candidates} nomzod</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{district.seats}</div>
                          <div className="text-xs text-gray-500">o'rin</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 mt-6">
                    <Button
                      onClick={() => handleViewDetails(election.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                      Batafsil ko'rish
                    </Button>
                    <Button
                      onClick={handleRegisterToVote}
                      variant="outline"
                      className="flex-1 rounded-xl border-gray-200"
                    >
                      Ro'yxatga olish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Upcoming Elections */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingElections.map(election => (
              <Card key={election.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusBadge(election.status)}
                        <Badge variant="outline" className="text-xs">
                          {election.type === "local" ? "Mahalliy" : 
                           election.type === "regional" ? "Viloyat" : "Boshqa"}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{election.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{election.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Saylov sanasi</div>
                        <div className="text-xs text-gray-500">{election.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Ro'yxat muddat</div>
                        <div className="text-xs text-gray-500">{election.registrationDeadline}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-medium text-gray-900">
                          {election.totalSeats || election.totalPositions}
                        </div>
                        <div className="text-xs text-gray-500">
                          {election.totalSeats ? "O'rinlar" : "Lavozimlar"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-gray-900">
                          {election.registeredCandidates || 
                           (election.estimatedVoters && `${(election.estimatedVoters / 1000000).toFixed(1)}M`)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {election.registeredCandidates ? "Nomzodlar" : "Saylovchilar"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewDetails(election.id)}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    Batafsil ma'lumot
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Past Results */}
          <TabsContent value="results" className="space-y-4">
            {pastElections.map(election => (
              <Card key={election.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusBadge(election.status)}
                        <Badge variant="outline" className="text-xs">
                          {election.type === "presidential" ? "Prezident" : "Parlament"}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{election.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{election.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{election.participationRate}% ishtirok</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {election.winner && (
                    <div className="bg-green-50 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">G'olib</span>
                      </div>
                      <div className="font-medium text-gray-900">{election.winner}</div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Natijalar</h4>
                    {election.results.map((result, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">
                              {result.candidate || result.party}
                            </div>
                            {result.party && result.candidate && (
                              <div className="text-xs text-gray-500">{result.party}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">{result.percentage}%</div>
                            {result.votes && (
                              <div className="text-xs text-gray-500">
                                {result.votes.toLocaleString()} ovoz
                              </div>
                            )}
                            {result.seats && (
                              <div className="text-xs text-gray-500">
                                {result.seats} o'rin
                              </div>
                            )}
                          </div>
                        </div>
                        <Progress value={result.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleViewDetails(election.id)}
                    variant="outline"
                    className="w-full mt-4 rounded-xl border-gray-200"
                  >
                    To'liq natijalar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Election News */}
        <div className="mt-8">
          <h2 className="font-medium text-gray-900 mb-4">Saylov yangiliklari</h2>
          <div className="space-y-3">
            {electionNews.map(news => (
              <Card key={news.id} className="bg-white rounded-2xl border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1">{news.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                      <div className="text-xs text-gray-500">{news.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}