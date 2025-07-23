
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
  Bell
} from "lucide-react";
import ForecastAccuracyChart from "@/components/charts/ForecastAccuracyChart";
import InventoryHeatmap from "@/components/charts/InventoryHeatmap";

const Dashboard = () => {
  const statistics = [
    {
      title: "Forecast Accuracy",
      value: "86.4%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      description: "vs last quarter"
    },
    {
      title: "Stock Coverage",
      value: "5.2 weeks",
      change: "-0.3 weeks",
      trend: "down",
      icon: Package,
      description: "average across regions"
    },
    {
      title: "Scheme Utilization",
      value: "74.1%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      description: "of allocated budget"
    },
    {
      title: "Inventory At Risk",
      value: "17 SKUs",
      change: "-3 SKUs",
      trend: "up",
      icon: AlertTriangle,
      description: "below safety stock"
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "Low Stock Coverage Alert",
      message: "3 Regions flagged for Low Stock Coverage in North Zone",
      time: "2 hours ago",
      action: "View Details"
    },
    {
      id: 2,
      type: "info",
      title: "Approval Pending",
      message: "Approval pending for East Zone Forecast submission",
      time: "5 hours ago",
      action: "Review Now"
    },
    {
      id: 3,
      type: "success",
      title: "Forecast Completed",
      message: "West Zone forecast finalized and synced to SAP",
      time: "1 day ago",
      action: "View Report"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Plan confidently. React proactively.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast Accuracy Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-space-grotesk">
              Forecast Accuracy Trend
            </CardTitle>
            <CardDescription>
              Last 6 months performance across all regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForecastAccuracyChart />
          </CardContent>
        </Card>

        {/* Inventory Heatmap */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-space-grotesk">
              Inventory Coverage by Region
            </CardTitle>
            <CardDescription>
              Stock coverage in weeks by SKU and region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryHeatmap />
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-space-grotesk flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
          <CardDescription>
            Important updates and alerts from across the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <Alert key={notification.id} className="border-l-4 border-l-primary">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {notification.type === "warning" && (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                    {notification.type === "info" && (
                      <Clock className="h-4 w-4 text-blue-600" />
                    )}
                    {notification.type === "success" && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    <span className="font-medium">{notification.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {notification.time}
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm">
                    {notification.message}
                  </AlertDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                  {notification.action}
                </Button>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
