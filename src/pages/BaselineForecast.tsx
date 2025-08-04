import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModernTable } from "@/components/ui/modern-table";
import { ConfidenceGauge } from "@/components/ui/confidence-gauge";
import { ForecastModelSelector } from "@/components/ui/forecast-model-selector";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Brain, 
  FileText, 
  Download, 
  Info,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

const historicalData = [
  { month: "Jan 23", historical: 245000, forecast: 238000, variance: -2.9 },
  { month: "Feb 23", historical: 267000, forecast: 275000, variance: 3.0 },
  { month: "Mar 23", historical: 298000, forecast: 312000, variance: 4.7 },
  { month: "Apr 23", historical: 321000, forecast: 334000, variance: 4.0 },
  { month: "May 23", historical: 356000, forecast: 348000, variance: -2.2 },
  { month: "Jun 23", historical: 378000, forecast: 389000, variance: 2.9 },
  { month: "Jul 23", historical: 401000, forecast: 425000, variance: 6.0 },
  { month: "Aug 23", historical: 434000, forecast: 441000, variance: 1.6 },
  { month: "Sep 23", historical: 467000, forecast: 478000, variance: 2.4 },
  { month: "Oct 23", historical: 489000, forecast: 495000, variance: 1.2 },
  { month: "Nov 23", historical: 512000, forecast: 523000, variance: 2.1 },
  { month: "Dec 23", historical: 534000, forecast: 548000, variance: 2.6 },
];

const forecastData = [
  {
    id: "1",
    sku: "Herbicide-H41",
    region: "North",
    month: "Jan 2025",
    aiForecast: 45000,
    confidence: 94,
    trend: "up",
    category: "Herbicides",
    lastMonth: 42000,
    variance: 7.1,
  },
  {
    id: "2",
    sku: "Fungicide-F23", 
    region: "South",
    month: "Jan 2025",
    aiForecast: 38000,
    confidence: 87,
    trend: "stable",
    category: "Fungicides",
    lastMonth: 37500,
    variance: 1.3,
  },
  {
    id: "3",
    sku: "Insecticide-I15",
    region: "East", 
    month: "Jan 2025",
    aiForecast: 52000,
    confidence: 91,
    trend: "up",
    category: "Insecticides",
    lastMonth: 48000,
    variance: 8.3,
  },
  {
    id: "4",
    sku: "Fertilizer-N12",
    region: "West",
    month: "Jan 2025", 
    aiForecast: 67000,
    confidence: 78,
    trend: "down",
    category: "Fertilizers",
    lastMonth: 72000,
    variance: -6.9,
  },
];

const BaselineForecast = () => {
  const [selectedModel, setSelectedModel] = useState("ai");
  const [activeTab, setActiveTab] = useState("sku");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return <Badge className="bg-success/10 text-success border-success/20">High ({confidence}%)</Badge>;
    if (confidence >= 75) return <Badge className="bg-warning/10 text-warning border-warning/20">Medium ({confidence}%)</Badge>;
    return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Low ({confidence}%)</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleGenerateForecast = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    toast({
      title: "Forecast Generated",
      description: "AI baseline forecast has been successfully generated with 94% accuracy.",
    });
  };

  const columns = [
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("sku")}</span>
          <span className="text-xs text-muted-foreground">{row.original.category}</span>
        </div>
      ),
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }: any) => (
        <Badge variant="outline">{row.getValue("region")}</Badge>
      ),
    },
    {
      accessorKey: "aiForecast",
      header: "AI Forecast",
      cell: ({ row }: any) => (
        <span className="font-mono font-semibold">
          {row.getValue("aiForecast").toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "confidence",
      header: "Confidence",
      cell: ({ row }: any) => getConfidenceBadge(row.getValue("confidence")),
    },
    {
      accessorKey: "trend",
      header: "Trend",
      cell: ({ row }: any) => getTrendIcon(row.getValue("trend")),
    },
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Baseline Forecasting</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Generate AI-powered baseline forecasts using historical sales data
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <FileText className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button size="lg">
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <Alert className="border-info/20 bg-info/5">
        <Info className="h-4 w-4 text-info" />
        <AlertDescription className="text-info">
          AI Forecast: +14% surge expected due to favorable rainfall pattern. 
          <strong className="ml-1">Model confidence: 94%</strong>
        </AlertDescription>
      </Alert>

      {/* Model Selection */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Forecast Model Selection
          </CardTitle>
          <CardDescription>
            Choose the forecasting model that best fits your requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForecastModelSelector 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-success" />
              Model ready for forecasting
            </div>
            
            <Button 
              onClick={handleGenerateForecast}
              disabled={isGenerating}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Forecast
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chart and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Historical vs Forecast Accuracy</CardTitle>
              <CardDescription>
                AI Forecast based on 24 months historical data and weather patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="historical" fill="hsl(var(--primary))" name="Historical Sales" />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    name="AI Forecast"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ConfidenceGauge value={94} label="Overall Accuracy" />
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm font-bold">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dataset Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKUs Analyzed</span>
                  <span className="font-bold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Regions Covered</span>
                  <span className="font-bold">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Points</span>
                  <span className="font-bold">1.2M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forecast Data Table */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle>Detailed Forecast Analysis</CardTitle>
          <CardDescription>
            Comprehensive forecast breakdown with confidence intervals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="sku">By Product (SKU)</TabsTrigger>
              <TabsTrigger value="region">By Region</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sku">
              <ModernTable
                data={forecastData}
                columns={columns}
                enableSearch={true}
                enableFilters={true}
                pageSize={10}
              />
            </TabsContent>
            
            <TabsContent value="region">
              <ModernTable
                data={forecastData}
                columns={columns}
                enableSearch={true}
                enableFilters={true}
                pageSize={10}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BaselineForecast;