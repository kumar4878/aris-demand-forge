
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, BarChart } from "lucide-react";

const BaselineForecast = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
          Baseline Forecast
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered forecasts built on your historic strength.
        </p>
      </div>

      {/* Model Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Forecasting Model
          </CardTitle>
          <CardDescription>
            Select the model for generating baseline forecasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="linear">Linear</TabsTrigger>
              <TabsTrigger value="arima">ARIMA</TabsTrigger>
              <TabsTrigger value="ai">AI Model</TabsTrigger>
            </TabsList>
            <TabsContent value="ai" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">AI-Enhanced Forecasting</h3>
                  <p className="text-sm text-muted-foreground">
                    Machine learning model trained on 5 years of historical data
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">92%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>
              <Progress value={92} className="h-2" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Placeholder for additional components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Historical Analysis</CardTitle>
            <CardDescription>5-year sales trend and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-12 w-12 mx-auto mb-2" />
                <p>Historical Sales Chart</p>
                <p className="text-sm">(Chart component will be added)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Forecast Grid</CardTitle>
            <CardDescription>Editable forecast by SKU and region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                <p>Forecast Data Grid</p>
                <p className="text-sm">(Data grid component will be added)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BaselineForecast;
