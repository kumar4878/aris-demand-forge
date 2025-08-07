
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Save, 
  Send, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Users
} from "lucide-react";
import FilterBar from "@/components/forms/FilterBar";
import EditableForecastTable from "@/components/forms/EditableForecastTable";
import FileUploadBox from "@/components/forms/FileUploadBox";
import { useToast } from "@/hooks/use-toast";

const BottomUpForecast = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    zone: "north",
    region: "all",
    season: "kharif"
  });

  const handleSubmitToZSM = () => {
    toast({
      title: "Forecast Submitted",
      description: "Your forecast has been submitted to Zone Sales Manager for review.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your forecast has been saved as draft.",
    });
  };

  const stats = [
    {
      title: "SKUs Forecasted",
      value: "12/15",
      percentage: 80,
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "High Variance Items",
      value: "3",
      percentage: 20,
      icon: AlertTriangle,
      color: "bg-red-500"
    },
    {
      title: "Completion Status",
      value: "80%",
      percentage: 80,
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Days to Deadline",
      value: "5",
      percentage: 50,
      icon: Clock,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
              Bottom-up Forecast
            </h1>
            <p className="text-muted-foreground text-lg">
              Field insight completes the forecast equation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
              <Users className="h-3 w-3 mr-1" />
              Territory Manager
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full ${stat.color}/10`}>
                  <stat.icon className={`h-5 w-5 text-white ${stat.color.replace('bg-', 'text-').replace('-500', '-600')}`} />
                </div>
              </div>
              <Progress value={stat.percentage} className="mt-2 h-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>3 SKUs</strong> have high variance (&gt;25%) and require remarks before submission.
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <FilterBar
        zone={filters.zone}
        region={filters.region}
        season={filters.season}
        onZoneChange={(value) => setFilters(prev => ({ ...prev, zone: value }))}
        onRegionChange={(value) => setFilters(prev => ({ ...prev, region: value }))}
        onSeasonChange={(value) => setFilters(prev => ({ ...prev, season: value }))}
      />

      {/* File Upload */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-space-grotesk">Bulk Upload</CardTitle>
          <CardDescription>
            Upload your forecast data using our Excel template for faster data entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploadBox />
        </CardContent>
      </Card>

      {/* Editable Forecast Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-space-grotesk">Forecast Entry</CardTitle>
          <CardDescription>
            Enter or modify forecasts for each SKU. Baseline forecasts are provided as reference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditableForecastTable />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-muted/30 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">
          <p>Last saved: <span className="font-medium">Today at 2:30 PM</span></p>
          <p>Deadline: <span className="font-medium text-orange-600">March 15, 2025</span></p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={handleSubmitToZSM} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2" />
            Submit to ZSM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomUpForecast;
