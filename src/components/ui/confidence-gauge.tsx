import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const ConfidenceGauge = ({ 
  value, 
  label = "Confidence", 
  size = 'md',
  showValue = true 
}: ConfidenceGaugeProps) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return { width: 80, height: 80, strokeWidth: 6 };
      case 'lg': return { width: 140, height: 140, strokeWidth: 12 };
      default: return { width: 100, height: 100, strokeWidth: 8 };
    }
  };

  const { width, height, strokeWidth } = getSize();
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 90) return "hsl(var(--success))";
    if (value >= 70) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            className="opacity-20"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="drop-shadow-sm"
          />
        </svg>
        
        {/* Center value */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="text-2xl font-bold text-foreground">{value}%</div>
            </motion.div>
          </div>
        )}
      </div>
      
      <div className="text-sm font-medium text-muted-foreground text-center">
        {label}
      </div>
    </div>
  );
};

export { ConfidenceGauge };