
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Package, 
  Target, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  Bell,
  Brain,
  RefreshCw,
  Download,
  Filter,
  MoreVertical,
  Lightbulb,
  CloudRain,
  Users,
  BarChart3
} from "lucide-react";
import ForecastAccuracyChart from "@/components/charts/ForecastAccuracyChart";
import InventoryHeatmap from "@/components/charts/InventoryHeatmap";
import { ApexVarianceChart } from "@/components/charts/ApexVarianceChart";
import { AIInsightsPanel } from "@/components/ui/ai-insights-panel";
import { KPICard } from "@/components/ui/kpi-card";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const kpiData = [
    {
      title: "Forecast Accuracy",
      value: "91.2%",
      change: "+4.8%",
      trend: "up" as const,
      icon: Target,
      description: "vs last quarter",
      color: "success" as const
    },
    {
      title: "Stock Coverage",
      value: "6.2 weeks",
      change: "+0.5 weeks",
      trend: "up" as const,
      icon: Package,
      description: "average across regions",
      color: "default" as const
    },
    {
      title: "Scheme Utilization",
      value: "85.3%",
      change: "+11.2%",
      trend: "up" as const,
      icon: TrendingUp,
      description: "of allocated budget",
      color: "success" as const
    },
    {
      title: "High Risk SKUs",
      value: "3",
      change: "-14 SKUs",
      trend: "up" as const,
      icon: AlertTriangle,
      description: "immediate attention needed",
      color: "warning" as const
    }
  ];

  const aiInsights = [
    {
      id: '1',
      type: 'weather' as const,
      priority: 'high' as const,
      title: 'Monsoon Impact Forecast',
      description: 'Above-normal rainfall predicted in West region (15-20% increase). Recommend increasing herbicide and fungicide stocks by 25% for next quarter.',
      confidence: 94,
      actionRequired: true,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'market' as const,
      priority: 'medium' as const,
      title: 'Market Expansion Opportunity',
      description: 'Cotton price surge detected in Central region. Consider increasing cotton-specific product allocation by 18% for optimal market capture.',
      confidence: 87,
      actionRequired: true,
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'inventory' as const,
      priority: 'low' as const,
      title: 'Inventory Optimization',
      description: 'Slow-moving inventory identified in North depot. Suggest cross-dock transfer to high-demand South region to improve turnover.',
      confidence: 91,
      actionRequired: false,
      timestamp: '6 hours ago'
    }
  ];

  const varianceData = [
    { month: 'Jan 2024', actual: 2200, forecast: 2150, variance: 2.3 },
    { month: 'Feb 2024', actual: 2850, forecast: 2900, variance: -1.7 },
    { month: 'Mar 2024', actual: 3100, forecast: 3050, variance: 1.6 },
    { month: 'Apr 2024', actual: 3850, forecast: 3800, variance: 1.3 },
    { month: 'May 2024', actual: 4200, forecast: 4150, variance: 1.2 },
    { month: 'Jun 2024', actual: 3900, forecast: 4000, variance: -2.5 },
    { month: 'Jul 2024', actual: 4500, forecast: 4400, variance: 2.3 },
    { month: 'Aug 2024', actual: 4100, forecast: 4200, variance: -2.4 },
  ];

  const notifications = [
    {
      id: 1,
      type: "critical" as const,
      title: "Immediate Action Required",
      message: "3 SKUs below critical safety stock in West region. Replenishment needed within 48 hours.",
      time: "30 minutes ago",
      action: "Take Action",
      urgent: true
    },
    {
      id: 2,
      type: "warning" as const,
      title: "Forecast Deviation Alert",
      message: "Bottom-up forecast for East region deviates by 25% from AI baseline. Review required.",
      time: "2 hours ago",
      action: "Review Now",
      urgent: false
    },
    {
      id: 3,
      type: "info" as const,
      title: "Weekly Sync Complete",
      message: "All zone forecasts successfully synchronized with SAP. Weekly planning cycle completed.",
      time: "1 day ago",
      action: "View Report",
      urgent: false
    },
    {
      id: 4,
      type: "success" as const,
      title: "AI Model Updated",
      message: "New ML model deployed with 3.2% improved accuracy. Historical data reprocessed.",
      time: "2 days ago",
      action: "View Details",
      urgent: false
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated with the latest information.",
    });
  };

  const handleKPIClick = (title: string) => {
    toast({
      title: "Navigation",
      description: `Opening detailed view for ${title}...`,
    });
  };

  const handleNotificationAction = (notification: any) => {
    toast({
      title: "Action Triggered",
      description: `Processing: ${notification.action}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 p-6"
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-space-grotesk font-bold text-foreground">
              ARIS Dashboard
            </h1>
            <p className="text-muted-foreground text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              All systems healthy. Plan confidently. React proactively.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last quarter</DropdownMenuItem>
                <DropdownMenuItem>Custom range</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>

        {/* KPI Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {kpiData.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <KPICard
                {...kpi}
                onClick={() => handleKPIClick(kpi.title)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Forecast Variance Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ApexVarianceChart 
                data={varianceData}
                title="Forecast vs Actual Performance"
                height={400}
              />
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="chart-container border-0 shadow-sm">
                  <CardHeader className="chart-header">
                    <div>
                      <CardTitle className="chart-title">
                        Forecast Accuracy Trend
                      </CardTitle>
                      <CardDescription className="chart-description">
                        Last 6 months performance across all regions
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Export Data</DropdownMenuItem>
                        <DropdownMenuItem>Configure</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <ForecastAccuracyChart />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="chart-container border-0 shadow-sm">
                  <CardHeader className="chart-header">
                    <div>
                      <CardTitle className="chart-title">
                        Inventory Coverage Heatmap
                      </CardTitle>
                      <CardDescription className="chart-description">
                        Stock coverage in weeks by SKU and region
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Real-time
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <InventoryHeatmap />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <AIInsightsPanel insights={aiInsights} />
            </motion.div>
          </div>
        </div>

        {/* Notifications Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-space-grotesk">
                      Recent Notifications
                    </CardTitle>
                    <CardDescription>
                      Critical updates and system alerts
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {notifications.filter(n => n.urgent).length} urgent
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <Alert 
                    className={`transition-all duration-200 hover:shadow-md ${
                      notification.urgent ? 'border-l-4 border-l-red-500 bg-red-50/30' :
                      notification.type === "warning" ? 'border-l-4 border-l-yellow-500 bg-yellow-50/30' :
                      notification.type === "success" ? 'border-l-4 border-l-green-500 bg-green-50/30' :
                      'border-l-4 border-l-blue-500 bg-blue-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          {notification.type === "critical" && (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          )}
                          {notification.type === "warning" && (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          )}
                          {notification.type === "info" && (
                            <Clock className="h-4 w-4 text-blue-600" />
                          )}
                          {notification.type === "success" && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          <span className="font-semibold text-foreground">
                            {notification.title}
                          </span>
                          {notification.urgent && (
                            <Badge variant="destructive" className="text-xs px-2 py-0.5">
                              URGENT
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {notification.time}
                          </Badge>
                        </div>
                        <AlertDescription className="text-sm text-foreground/80 leading-relaxed">
                          {notification.message}
                        </AlertDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleNotificationAction(notification)}
                        className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                      >
                        {notification.action}
                        <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </Alert>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
