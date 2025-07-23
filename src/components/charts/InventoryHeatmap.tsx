import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const heatmapData = [
  { region: "North", sku: "SKU-001", coverage: 2.1, status: "low" },
  { region: "North", sku: "SKU-002", coverage: 4.5, status: "medium" },
  { region: "North", sku: "SKU-003", coverage: 6.2, status: "high" },
  { region: "North", sku: "SKU-004", coverage: 1.8, status: "low" },
  { region: "South", sku: "SKU-001", coverage: 5.4, status: "high" },
  { region: "South", sku: "SKU-002", coverage: 3.2, status: "medium" },
  { region: "South", sku: "SKU-003", coverage: 7.1, status: "high" },
  { region: "South", sku: "SKU-004", coverage: 2.9, status: "medium" },
  { region: "East", sku: "SKU-001", coverage: 1.5, status: "low" },
  { region: "East", sku: "SKU-002", coverage: 4.8, status: "medium" },
  { region: "East", sku: "SKU-003", coverage: 5.9, status: "high" },
  { region: "East", sku: "SKU-004", coverage: 3.7, status: "medium" },
  { region: "West", sku: "SKU-001", coverage: 6.8, status: "high" },
  { region: "West", sku: "SKU-002", coverage: 2.3, status: "low" },
  { region: "West", sku: "SKU-003", coverage: 5.2, status: "high" },
  { region: "West", sku: "SKU-004", coverage: 4.1, status: "medium" },
];

const regions = ["North", "South", "East", "West"];
const skus = ["SKU-001", "SKU-002", "SKU-003", "SKU-004"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "low":
      return "bg-red-100 border-red-200 text-red-800 hover:bg-red-200";
    case "medium":
      return "bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200";
    case "high":
      return "bg-green-100 border-green-200 text-green-800 hover:bg-green-200";
    default:
      return "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200";
  }
};

const InventoryHeatmap = () => {
  const getCoverageData = (region: string, sku: string) => {
    return heatmapData.find(item => item.region === region && item.sku === sku);
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-200 rounded"></div>
          <span>&lt; 2 weeks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-200 rounded"></div>
          <span>2-4 weeks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-200 rounded"></div>
          <span>&gt; 4 weeks</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 gap-2 min-w-fit">
          {/* Header */}
          <div className="p-2 text-sm font-medium text-muted-foreground"></div>
          {skus.map(sku => (
            <div key={sku} className="p-2 text-sm font-medium text-center text-muted-foreground">
              {sku}
            </div>
          ))}

          {/* Data Rows */}
          {regions.map(region => (
            <React.Fragment key={region}>
              <div className="p-2 text-sm font-medium text-muted-foreground flex items-center">
                {region}
              </div>
              {skus.map(sku => {
                const data = getCoverageData(region, sku);
                return (
                  <Button
                    key={`${region}-${sku}`}
                    variant="outline"
                    className={`h-16 p-2 ${data ? getStatusColor(data.status) : 'bg-gray-100'} 
                               transition-all duration-200 hover:scale-105 border`}
                    onClick={() => {
                      console.log(`Clicked: ${region} - ${sku}`, data);
                      // This would open a modal with SKU details
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium">
                        {data ? `${data.coverage}w` : 'N/A'}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Badge variant="destructive">
          {heatmapData.filter(item => item.status === "low").length} Critical
        </Badge>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          {heatmapData.filter(item => item.status === "medium").length} Watch
        </Badge>
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
          {heatmapData.filter(item => item.status === "high").length} Healthy
        </Badge>
      </div>
    </div>
  );
};

export default InventoryHeatmap;
