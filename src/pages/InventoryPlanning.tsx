
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  MapPin,
  Send,
  Download,
  RefreshCw,
  Edit3,
  CheckCircle,
  Clock
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const InventoryPlanning = () => {
  const { toast } = useToast();
  const [selectedSeason, setSelectedSeason] = useState("pre-season");

  const inventoryData = [
    { 
      id: '1', 
      sku: 'SKU-001', 
      depot: 'Mumbai Central', 
      currentStock: 450, 
      neededQty: 1200, 
      aiSuggested: 1150, 
      finalQty: 1200, 
      coverage: 3.2,
      reason: ''
    },
    { 
      id: '2', 
      sku: 'SKU-002', 
      depot: 'Delhi North', 
      currentStock: 120, 
      neededQty: 800, 
      aiSuggested: 750, 
      finalQty: 800, 
      coverage: 1.8,
      reason: 'Market expansion expected'
    },
    { 
      id: '3', 
      sku: 'SKU-003', 
      depot: 'Bangalore Tech', 
      currentStock: 890, 
      neededQty: 600, 
      aiSuggested: 650, 
      finalQty: 650, 
      coverage: 6.1,
      reason: ''
    },
    { 
      id: '4', 
      sku: 'SKU-004', 
      depot: 'Kolkata East', 
      currentStock: 45, 
      neededQty: 950, 
      aiSuggested: 900, 
      finalQty: 950, 
      coverage: 1.2,
      reason: 'Critical shortage'
    },
  ];

  const coverageData = [
    { name: 'Safe Stock (>4 weeks)', value: 35, color: 'hsl(142, 76%, 36%)' },
    { name: 'Moderate (2-4 weeks)', value: 45, color: 'hsl(45, 93%, 58%)' },
    { name: 'Critical (<2 weeks)', value: 20, color: 'hsl(var(--destructive))' }
  ];

  const depotPerformance = [
    { depot: 'Mumbai', coverage: 85, efficiency: 92 },
    { depot: 'Delhi', coverage: 65, efficiency: 88 },
    { depot: 'Bangalore', coverage: 78, efficiency: 94 },
    { depot: 'Kolkata', coverage: 45, efficiency: 76 },
    { depot: 'Chennai', coverage: 72, efficiency: 85 },
  ];

  const getCoverageStatus = (weeks: number) => {
    if (weeks >= 4) return { color: 'text-green-600', bg: 'bg-green-100', label: 'Safe' };
    if (weeks >= 2) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Moderate' };
    return { color: 'text-red-600', bg: 'bg-red-100', label: 'Critical' };
  };

  const handleQuantityChange = (id: string, value: number) => {
    // Update quantity logic here
    console.log(`Updated ${id} to ${value}`);
  };

  const handleSubmitPlan = () => {
    toast({
      title: "Plan Submitted",
      description: "Inventory plan has been submitted to Supply Chain Management.",
    });
  };

  const handleDownloadPlan = () => {
    toast({
      title: "Plan Downloaded",
      description: "Inventory plan has been downloaded as Excel file.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
              Inventory Planning
            </h1>
            <p className="text-muted-foreground text-lg">
              Transform forecasts into actionable shipment plans.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      {/* Season Selector */}
      <div className="flex gap-2">
        {['pre-season', 'in-season', 'end-season'].map((season) => (
          <Button
            key={season}
            variant={selectedSeason === season ? 'default' : 'outline'}
            onClick={() => setSelectedSeason(season)}
            className="capitalize"
          >
            {season.replace('-', ' ')}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Depots</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <MapPin className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Coverage</p>
                <p className="text-2xl font-bold">3.8<span className="text-sm text-muted-foreground">w</span></p>
              </div>
              <Clock className="h-8 w-8 text-blue-600 opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SKUs at Risk</p>
                <p className="text-2xl font-bold text-red-600">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Plan Status</p>
                <p className="text-2xl font-bold text-green-600">85%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-75" />
            </div>
            <Progress value={85} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>8 SKUs</strong> are below safety stock levels across 4 regions. Immediate action required.
        </AlertDescription>
      </Alert>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coverage Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Stock Coverage Distribution
            </CardTitle>
            <CardDescription>
              Percentage of SKUs by coverage category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={coverageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {coverageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Depot Performance */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Depot Performance
            </CardTitle>
            <CardDescription>
              Coverage percentage by depot location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={depotPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="depot" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip />
                  <Bar dataKey="coverage" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Planning Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Shipment Planning Grid</CardTitle>
          <CardDescription>
            Plan inventory quantities for each depot based on forecasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">SKU</TableHead>
                  <TableHead className="font-semibold">Depot</TableHead>
                  <TableHead className="font-semibold">Current Stock</TableHead>
                  <TableHead className="font-semibold">Needed Qty</TableHead>
                  <TableHead className="font-semibold">AI Suggested</TableHead>
                  <TableHead className="font-semibold">Final Qty</TableHead>
                  <TableHead className="font-semibold">Coverage</TableHead>
                  <TableHead className="font-semibold">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((row) => {
                  const coverageStatus = getCoverageStatus(row.coverage);
                  return (
                    <TableRow key={row.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium">{row.sku}</TableCell>
                      <TableCell>{row.depot}</TableCell>
                      <TableCell className="font-mono">{row.currentStock.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-primary">{row.neededQty.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{row.aiSuggested.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={row.finalQty}
                            onChange={(e) => handleQuantityChange(row.id, parseInt(e.target.value) || 0)}
                            className="w-20 h-8"
                          />
                          <Edit3 className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${coverageStatus.bg} ${coverageStatus.color} border-current`}>
                          {row.coverage}w {coverageStatus.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Textarea
                          value={row.reason}
                          placeholder={row.coverage < 2 ? "Required for critical stock" : "Optional reason"}
                          className="min-h-[60px] text-xs"
                          required={row.coverage < 2}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-muted/30 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">
          <p>Last updated: <span className="font-medium">Today at 4:15 PM</span></p>
          <p>Plan coverage: <span className="font-medium text-primary">85% complete</span></p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadPlan}>
            <Download className="h-4 w-4 mr-2" />
            Download Plan
          </Button>
          <Button onClick={handleSubmitPlan} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2" />
            Submit to SCM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPlanning;
