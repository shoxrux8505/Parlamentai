import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  FileText, 
  Download, 
  Share2,
  Filter,
  Calendar,
  Folder,
  Eye
} from "lucide-react";

interface DocumentsPageProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function DocumentsPage({ onBack, onNavigate }: DocumentsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Bills", "Reports", "Amendments", "Proposals"];

  const documents = [
    {
      id: 1,
      title: "Climate Action Bill 2024",
      type: "Bill",
      status: "In Progress",
      date: "Dec 15, 2024",
      size: "2.4 MB",
      description: "Comprehensive legislation for environmental protection and sustainability measures"
    },
    {
      id: 2,
      title: "Budget Committee Report",
      type: "Report",
      status: "Completed",
      date: "Dec 10, 2024",
      size: "1.8 MB",
      description: "Annual budget review and recommendations for fiscal year 2025"
    },
    {
      id: 3,
      title: "Healthcare Amendment Proposal",
      type: "Amendment",
      status: "Under Review",
      date: "Dec 8, 2024",
      size: "856 KB",
      description: "Proposed changes to existing healthcare legislation framework"
    },
    {
      id: 4,
      title: "Infrastructure Development Plan",
      type: "Proposal",
      status: "Draft",
      date: "Dec 5, 2024",
      size: "3.2 MB",
      description: "Strategic planning document for national infrastructure improvements"
    },
    {
      id: 5,
      title: "Education Policy Review",
      type: "Report",
      status: "Completed",
      date: "Nov 28, 2024",
      size: "2.1 MB",
      description: "Comprehensive analysis of current education policies and reform recommendations"
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-orange-100 text-orange-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Documents</h1>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full ${
                selectedCategory === category 
                  ? "bg-primary text-white" 
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 py-3">
        <p className="text-sm text-gray-600">
          {filteredDocuments.length} documents found
        </p>
      </div>

      {/* Documents List */}
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {document.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {document.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <Badge className={`text-xs ${getStatusColor(document.status)}`}>
                        {document.status}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {document.date}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Folder className="w-3 h-3 mr-1" />
                        {document.size}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-9 rounded-xl border-gray-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 rounded-xl border-gray-200"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 rounded-xl border-gray-200"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}