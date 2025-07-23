
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, TrendingUp, BarChart, Download, RefreshCw, Info, Target, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, ComposedChart } from 'recharts';

const BaselineForecast = () => {
  const [selectedModel, setSelectedModel] = useState("ai");
  const [activeTab, setActiveTab] = useState("sku");

  const historicalData = [
    { month: 'Jan 2023', sales: 850, forecast: 920 },
    { month: 'Feb 2023', sales: 1200, forecast: 1150 },
    { month: 'Mar 2023', sales: 980, forecast: 1050 },
    { month: 'Apr 2023', sales: 1350, forecast: 1300 },
    { month: 'May 2023', sales: 1500, forecast: 1450 },
    { month: 'Jun 2023', sales: 1100, forecast: 1200 },
    { month: 'Jul 2023', sales: 1600, forecast: 1550 },
    { month: 'Aug 2023', sales: 1400, forecast: 1380 },
    { month: 'Sep 2023', sales: 1250, forecast: 1300 },
    { month: 'Oct 2023', sales: 1800, forecast: 1750 },
    { month: 'Nov 2023', sales: 2100, forecast: 2050 },
    { month: 'Dec 2023', sales: 1950, forecast: 2000 },
  ];

  const forecastData = [
    { id: '1', sku: 'SKU-001', region: 'North', month: 'Jan 2025', aiForecast: 1850, confidence: 92, trend: 'up' },
    { id: '2', sku: 'SKU-002', region: 'North', month: 'Jan 2025', aiForecast: 1200, confidence: 88, trend: 'stable' },
    { id: '3', sku: 'SKU-003', region: 'South', month: 'Jan 2025', aiForecast: 950, confidence: 76, trend: 'down' },
    { id: '4', sku: 'SKU-001', region: 'East', month: 'Jan 2025', aiForecast: 1650, confidence: 94, trend: 'up' },
    { id: '5', sku: 'SKU-002', region: 'West', month: 'Jan 2025', aiForecast: 1400, confidence: 85, trend: 'up' },
    { id: '6', sku: 'SKU-003', region: 'North', month: 'Feb 2025', aiForecast: 1100, confidence: 69, trend: 'stable' },
  ];

  const modelStats = {
    linear: { accuracy: 78, confidence: 72, processing: 'Fast' },
    arima: { accuracy: 82, confidence: 78, processing: 'Medium' },
    ai: { accuracy: 92, confidence: 88, processing: 'Slow' }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 85) return <Badge className="bg-green-100 text-green-800 border-green-300">High</Badge>;
    if (confidence >= 70) return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>;
    return <Badge variant="destructive">Low</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
              Baseline Forecast
            </h1>
            <p className="text-muted-foreground text-lg">
              AI-powered forecasts built on your historic strength.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Forecast
            </Button>
          </div>
        </div>
      </div>

      {/* Model Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(modelStats).map(([model, stats]) => (
          <Card 
            key={model}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedModel === model ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-accent/50'
            }`}
            onClick={() => setSelectedModel(model)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {model === 'ai' ? <Brain className="h-5 w-5 text-primary" /> : 
                   model === 'arima' ? <BarChart className="h-5 w-5 text-blue-600" /> :
                   <TrendingUp className="h-5 w-5 text-green-600" />}
                  <h3 className="font-semibold capitalize">{model === 'ai' ? 'AI Neural Network' : model.toUpperCase()}</h3>
                </div>
                {selectedModel === model && <Zap className="h-4 w-4 text-primary" />}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium">{stats.accuracy}%</span>
                </div>
                <Progress value={stats.accuracy} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Confidence: {stats.confidence}%</span>
                  <span>Speed: {stats.processing}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Analysis Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Historical vs Forecast Accuracy
            </CardTitle>
            <CardDescription>
              5-year sales trend with AI forecast overlay
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    className="text-sm"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    className="text-sm"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-3 border rounded-lg shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-blue-600">
                              Actual Sales: {payload[0]?.value?.toLocaleString()}
                            </p>
                            <p className="text-sm text-green-600">
                              AI Forecast: {payload[1]?.value?.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="hsl(var(--primary))" 
                    opacity={0.7}
                    name="Actual Sales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="hsl(142, 76%, 36%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 2, r: 4 }}
                    name="AI Forecast"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Model Performance Metrics */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Model Performance
            </CardTitle>
            <CardDescription>
              Real-time accuracy and confidence metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Accuracy</span>
                <span className="text-2xl font-bold text-primary">92.4%</span>
              </div>
              <Progress value={92.4} className="h-3" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Prediction Confidence</span>
                <span className="text-2xl font-bold text-green-600">88.7%</span>
              </div>
              <Progress value={88.7} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">156</div>
                <div className="text-sm text-muted-foreground">SKUs Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-sm text-muted-foreground">Regions Covered</div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Model Insights:</strong> The AI model shows strong performance with seasonal adjustments and trend recognition. Consider this baseline for your territory planning.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Data Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Forecast Data Grid</CardTitle>
              <CardDescription>
                Detailed AI-generated forecasts with confidence indicators
              </CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="sku">By SKU</TabsTrigger>
                <TabsTrigger value="region">By Region</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">SKU</TableHead>
                  <TableHead className="font-semibold">Region</TableHead>
                  <TableHead className="font-semibold">Month</TableHead>
                  <TableHead className="font-semibold">AI Forecast</TableHead>
                  <TableHead className="font-semibold">Confidence</TableHead>
                  <TableHead className="font-semibold">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecastData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{row.sku}</TableCell>
                    <TableCell>{row.region}</TableCell>
                    <TableCell>{row.month}</TableCell>
                    <TableCell className="font-mono">{row.aiForecast.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getConfidenceBadge(row.confidence)}
                        <span className="text-sm text-muted-foreground">{row.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(row.trend)}
                        <span className="text-sm capitalize">{row.trend}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BaselineForecast;
