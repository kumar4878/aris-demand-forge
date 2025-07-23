
import React from 'react';
import { ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface HeatmapData {
  region: string;
  sku: string;
  coverage: number;
  risk: 'low' | 'medium' | 'high';
}

const mockData: HeatmapData[] = [
  { region: 'North', sku: 'SKU-001', coverage: 2.1, risk: 'high' },
  { region: 'North', sku: 'SKU-002', coverage: 4.5, risk: 'medium' },
  { region: 'North', sku: 'SKU-003', coverage: 6.2, risk: 'low' },
  { region: 'South', sku: 'SKU-001', coverage: 3.8, risk: 'medium' },
  { region: 'South', sku: 'SKU-002', coverage: 1.9, risk: 'high' },
  { region: 'South', sku: 'SKU-003', coverage: 5.1, risk: 'low' },
  { region: 'East', sku: 'SKU-001', coverage: 4.2, risk: 'medium' },
  { region: 'East', sku: 'SKU-002', coverage: 6.8, risk: 'low' },
  { region: 'East', sku: 'SKU-003', coverage: 2.3, risk: 'high' },
  { region: 'West', sku: 'SKU-001', coverage: 5.5, risk: 'low' },
  { region: 'West', sku: 'SKU-002', coverage: 3.1, risk: 'medium' },
  { region: 'West', sku: 'SKU-003', coverage: 1.7, risk: 'high' },
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high': return 'hsl(var(--destructive))';
    case 'medium': return 'hsl(45, 93%, 58%)';
    case 'low': return 'hsl(142, 76%, 36%)';
    default: return 'hsl(var(--muted))';
  }
};

const InventoryHeatmap = () => {
  const regions = Array.from(new Set(mockData.map(d => d.region)));
  const skus = Array.from(new Set(mockData.map(d => d.sku)));

  return (
    <div className="h-64 w-full">
      <div className="grid grid-cols-4 gap-1 h-full">
        <div className="text-center text-sm font-medium text-muted-foreground flex items-end justify-center pb-2">
          Regions →
        </div>
        {skus.map(sku => (
          <div key={sku} className="text-center text-sm font-medium text-muted-foreground flex items-end justify-center pb-2">
            {sku}
          </div>
        ))}
        
        {regions.map(region => (
          <React.Fragment key={region}>
            <div className="text-sm font-medium text-muted-foreground flex items-center justify-end pr-2">
              {region}
            </div>
            {skus.map(sku => {
              const dataPoint = mockData.find(d => d.region === region && d.sku === sku);
              return (
                <div
                  key={`${region}-${sku}`}
                  className="relative group cursor-pointer rounded-md transition-all duration-200 hover:scale-105 hover:shadow-md"
                  style={{
                    backgroundColor: dataPoint ? getRiskColor(dataPoint.risk) : 'hsl(var(--muted))',
                    opacity: dataPoint ? 0.8 : 0.3
                  }}
                >
                  {dataPoint && (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                      {dataPoint.coverage.toFixed(1)}w
                    </div>
                  )}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded shadow-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    {dataPoint ? `${dataPoint.coverage} weeks coverage` : 'No data'}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(142, 76%, 36%)' }}></div>
          <span className="text-muted-foreground">Low Risk (&gt;5 weeks)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(45, 93%, 58%)' }}></div>
          <span className="text-muted-foreground">Medium Risk (3-5 weeks)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--destructive))' }}></div>
          <span className="text-muted-foreground">High Risk (&lt;3 weeks)</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryHeatmap;
