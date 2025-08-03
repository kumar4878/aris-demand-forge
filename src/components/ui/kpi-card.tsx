import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  description?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
  className?: string;
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return ArrowUpRight;
    case 'down': return ArrowDownRight;
    default: return Minus;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up': return 'text-green-600';
    case 'down': return 'text-red-600';
    default: return 'text-gray-500';
  }
};

const getCardBorderColor = (color: string) => {
  switch (color) {
    case 'success': return 'border-l-4 border-l-green-500';
    case 'warning': return 'border-l-4 border-l-yellow-500';
    case 'danger': return 'border-l-4 border-l-red-500';
    default: return 'border-l-4 border-l-primary';
  }
};

export function KPICard({
  title,
  value,
  change,
  trend = 'stable',
  icon: Icon,
  description,
  color = 'default',
  onClick,
  className
}: KPICardProps) {
  const TrendIcon = getTrendIcon(trend);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`kpi-card ${getCardBorderColor(color)} ${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="kpi-card-header">
            <div>
              <p className="kpi-card-title">{title}</p>
              <div className="kpi-card-value">{value}</div>
            </div>
            <div className="p-3 rounded-full bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          {(change || description) && (
            <div className="space-y-2">
              {change && (
                <div className={`kpi-card-change ${getTrendColor(trend)}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="font-medium">{change}</span>
                </div>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}