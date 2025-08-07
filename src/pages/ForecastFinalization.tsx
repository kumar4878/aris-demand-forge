
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Download,
  Send,
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  Edit2,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForecastFinalization = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("compare");
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const compareData = [
    { 
      id: '1', 
      sku: 'SKU 01', 
      region: 'Region 1',
      month: 'Jan 2025',
      aiForecast: 1850, 
      bottomUp: 1750, 
      finalForecast: 1750, 
      variance: -5.4, 
      status: 'pending',
      remarks: 'Lower demand expected due to weather conditions',
      openingInv: 500,
      sales: 1400,
      liquidation: 100
    },
    { 
      id: '2', 
      sku: 'SKU 02', 
      region: 'Region 1',
      month: 'Jan 2025',
      aiForecast: 1200, 
      bottomUp: 1100, 
      finalForecast: 1100, 
      variance: -8.3, 
      status: 'approved',
      remarks: 'Market competition from new entrants',
      openingInv: 300,
      sales: 950,
      liquidation: 50
    },
    { 
      id: '3', 
      sku: 'SKU 03', 
      region: 'Region 1',
      month: 'Jan 2025',
      aiForecast: 950, 
      bottomUp: 1200, 
      finalForecast: 1200, 
      variance: 26.3, 
      status: 'review',
      remarks: 'High demand from major distributor confirmed',
      openingInv: 400,
      sales: 850,
      liquidation: 75
    },
    { 
      id: '4', 
      sku: 'SKU 04', 
      region: 'Region 1',
      month: 'Jan 2025',
      aiForecast: 1650, 
      bottomUp: 1650, 
      finalForecast: 1650, 
      variance: 0.0, 
      status: 'approved',
      remarks: '',
      openingInv: 600,
      sales: 1300,
      liquidation: 120
    },
  ];

  const auditTrail = [
    { user: 'Rajesh Kumar (TM)', action: 'Submitted forecast', time: '2 hours ago', type: 'submit' },
    { user: 'Priya Sharma (ZSM)', action: 'Reviewed and requested changes', time: '1 hour ago', type: 'review' },
    { user: 'Rajesh Kumar (TM)', action: 'Updated SKU-003 with justification', time: '30 mins ago', type: 'update' },
    { user: 'System', action: 'Auto-validated variance rules', time: '25 mins ago', type: 'system' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': 
        return <Badge className="bg-green-100 text-green-800 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'review': 
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300"><AlertTriangle className="h-3 w-3 mr-1" />Needs Review</Badge>;
      default: 
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const getVarianceIndicator = (variance: number) => {
    const isPositive = variance > 0;
    const isHigh = Math.abs(variance) > 20;
    
    return (
      <div className="flex items-center gap-2">
        {isPositive ? 
          <TrendingUp className={`h-4 w-4 ${isHigh ? 'text-red-600' : 'text-green-600'}`} /> :
          <TrendingDown className={`h-4 w-4 ${isHigh ? 'text-red-600' : 'text-green-600'}`} />
        }
        <span className={`font-mono ${isHigh ? 'text-red-600 font-bold' : 'text-muted-foreground'}`}>
          {isPositive ? '+' : ''}{variance.toFixed(1)}%
        </span>
      </div>
    );
  };

  const handleApprove = () => {
    toast({
      title: "Forecast Approved",
      description: "The forecast has been approved and will be synced to SAP within 24 hours.",
    });
  };

  const handleRequestRework = () => {
    toast({
      title: "Rework Requested",
      description: "Territory Manager has been notified to review and resubmit the forecast.",
      variant: "destructive"
    });
  };

  const handleEdit = (rowId: string, currentValue: number) => {
    setEditingRow(rowId);
    setEditValue(currentValue.toString());
  };

  const handleSaveEdit = (rowId: string) => {
    toast({
      title: "Forecast Updated",
      description: `Final forecast for ${rowId} has been updated to ${editValue}`,
    });
    setEditingRow(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditValue("");
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'submit': return <Send className="h-4 w-4 text-blue-600" />;
      case 'review': return <Eye className="h-4 w-4 text-orange-600" />;
      case 'update': return <FileText className="h-4 w-4 text-green-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
              Forecast Finalization
            </h1>
            <p className="text-muted-foreground text-lg">
              Review, approve, and finalize forecasts for SAP integration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
              <Users className="h-3 w-3 mr-1" />
              Zone Sales Manager
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total SKUs</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <FileText className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-75" />
            </div>
            <Progress value={75} className="h-1 mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Needs Review</p>
                <p className="text-2xl font-bold text-orange-600">4</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600 opacity-75" />
            </div>
            <Progress value={17} className="h-1 mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-muted-foreground">2</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground opacity-75" />
            </div>
            <Progress value={8} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>4 SKUs</strong> require your review due to high variance (&gt;20%) between AI and field forecasts.
        </AlertDescription>
      </Alert>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compare">Compare View</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="compare" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Forecast Comparison</CardTitle>
              <CardDescription>
                Side-by-side comparison of AI-generated and field-submitted forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">SKU</TableHead>
                      <TableHead className="font-semibold">Region</TableHead>
                      <TableHead className="font-semibold">Month</TableHead>
                      <TableHead className="font-semibold">Baseline Forecast</TableHead>
                      <TableHead className="font-semibold">Bottom-Up</TableHead>
                      <TableHead className="font-semibold">Final Forecast</TableHead>
                      <TableHead className="font-semibold">Variance</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {compareData.map((row) => (
                       <TableRow key={row.id} className="hover:bg-muted/20">
                         <TableCell className="font-medium">{row.sku}</TableCell>
                         <TableCell className="font-medium">{row.region}</TableCell>
                         <TableCell className="font-medium">{row.month}</TableCell>
                         <TableCell className="font-mono text-muted-foreground">{row.aiForecast.toLocaleString()}</TableCell>
                         <TableCell className="font-mono">{row.bottomUp.toLocaleString()}</TableCell>
                         <TableCell className="font-mono font-bold">
                           {editingRow === row.id ? (
                             <div className="flex items-center gap-2">
                               <Input
                                 value={editValue}
                                 onChange={(e) => setEditValue(e.target.value)}
                                 className="w-24 h-8 text-sm"
                                 type="number"
                               />
                               <Button variant="ghost" size="sm" onClick={() => handleSaveEdit(row.sku)}>
                                 <Check className="h-4 w-4 text-green-600" />
                               </Button>
                               <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                                 <X className="h-4 w-4 text-red-600" />
                               </Button>
                             </div>
                           ) : (
                             <div className="flex items-center gap-2">
                               {row.finalForecast.toLocaleString()}
                               <Button 
                                 variant="ghost" 
                                 size="sm" 
                                 onClick={() => handleEdit(row.id, row.finalForecast)}
                                 className="p-1 h-6 w-6"
                               >
                                 <Edit2 className="h-3 w-3" />
                               </Button>
                             </div>
                           )}
                          </TableCell>
                          <TableCell>{getVarianceIndicator(row.variance)}</TableCell>
                         <TableCell>{getStatusBadge(row.status)}</TableCell>
                         <TableCell>
                           <Button variant="ghost" size="sm">
                             <Eye className="h-4 w-4 mr-1" />
                             Review
                           </Button>
                         </TableCell>
                       </TableRow>
                     ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>
                Complete history of forecast submission and review process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditTrail.map((entry, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="mt-1">
                      {getActionIcon(entry.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{entry.action}</p>
                        <span className="text-sm text-muted-foreground">{entry.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>
                Justifications and supporting files for forecast changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Market Analysis - SKU-003.pdf</p>
                      <p className="text-sm text-muted-foreground">Uploaded 1 hour ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Competitor Analysis Q1 2025.xlsx</p>
                      <p className="text-sm text-muted-foreground">Uploaded 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-muted/30 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Current inventory = Opening inv - Sales - Liquidation</p>
          <p>Last review: <span className="font-medium">Today at 2:30 PM</span></p>
          <p>Pending approvals: <span className="font-medium text-orange-600">4 SKUs</span></p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRequestRework}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Request Rework
          </Button>
          <Button onClick={handleApprove} className="bg-primary hover:bg-primary/90">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve All
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForecastFinalization;
