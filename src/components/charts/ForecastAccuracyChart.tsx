
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', accuracy: 82.1, target: 85 },
  { month: 'Feb', accuracy: 84.3, target: 85 },
  { month: 'Mar', accuracy: 81.7, target: 85 },
  { month: 'Apr', accuracy: 85.9, target: 85 },
  { month: 'May', accuracy: 87.2, target: 85 },
  { month: 'Jun', accuracy: 86.4, target: 85 },
];

const ForecastAccuracyChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            className="text-sm"
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[75, 90]}
            className="text-sm"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-primary">
                      Accuracy: {payload[0].value}%
                    </p>
                    <p className="text-sm text-gray-500">
                      Target: {payload[1].value}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="accuracy" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastAccuracyChart;
