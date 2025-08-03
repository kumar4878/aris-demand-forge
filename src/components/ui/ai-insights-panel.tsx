import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AIInsight {
  id: string;
  type: 'forecast' | 'inventory' | 'market' | 'weather';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  confidence: number;
  actionRequired: boolean;
  timestamp: string;
}

interface AIInsightsPanelProps {
  insights: AIInsight[];
  className?: string;
}

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'forecast': return TrendingUp;
    case 'inventory': return AlertTriangle;
    case 'market': return Brain;
    case 'weather': return Lightbulb;
    default: return Brain;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-50 text-red-700 border-red-200';
    case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export function AIInsightsPanel({ insights, className }: AIInsightsPanelProps) {
  return (
    <Card className={`ai-insights ${className}`}>
      <CardHeader className="pb-4">
        <div className="ai-insights-header">
          <Brain className="h-6 w-6 text-purple-600" />
          <div>
            <CardTitle className="text-lg font-semibold">AI Insights</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Real-time intelligence for smarter decisions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const IconComponent = getInsightIcon(insight.type);
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-white/60 dark:bg-black/20 border border-purple-100 dark:border-purple-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                    <IconComponent className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground">{insight.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`text-xs font-medium border ${getPriorityColor(insight.priority)}`}
                  >
                    {insight.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                {insight.description}
              </p>
              
              {insight.actionRequired && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-3 text-xs hover:bg-purple-100 dark:hover:bg-purple-900/50"
                >
                  Take Action
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}