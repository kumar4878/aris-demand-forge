import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, BarChart3, CheckCircle } from "lucide-react";

interface ModelOption {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  confidence: number;
  processingSpeed: string;
  icon: React.ComponentType<any>;
}

interface ForecastModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models: ModelOption[] = [
  {
    id: "ai",
    name: "AI (LSTM)",
    description: "Deep learning model with weather & market data",
    accuracy: 94,
    confidence: 91,
    processingSpeed: "Fast",
    icon: Brain
  },
  {
    id: "arima",
    name: "ARIMA",
    description: "Statistical time series forecasting",
    accuracy: 87,
    confidence: 83,
    processingSpeed: "Medium",
    icon: TrendingUp
  },
  {
    id: "linear",
    name: "Linear Regression",
    description: "Traditional linear trend analysis",
    accuracy: 79,
    confidence: 76,
    processingSpeed: "Very Fast",
    icon: BarChart3
  }
];

const ForecastModelSelector = ({ selectedModel, onModelChange }: ForecastModelSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {models.map((model) => {
        const isSelected = selectedModel === model.id;
        const Icon = model.icon;
        
        return (
          <motion.div
            key={model.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-primary border-primary bg-primary/5' 
                  : 'hover:border-primary/30'
              }`}
              onClick={() => onModelChange(model.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{model.name}</h3>
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </motion.div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <Badge variant={model.accuracy >= 90 ? "default" : "secondary"}>
                      {model.accuracy}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <Badge variant={model.confidence >= 85 ? "default" : "secondary"}>
                      {model.confidence}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Speed</span>
                    <Badge variant="outline">{model.processingSpeed}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export { ForecastModelSelector };