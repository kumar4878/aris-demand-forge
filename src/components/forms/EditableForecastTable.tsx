
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ForecastRow {
  id: string;
  sku: string;
  month: string;
  fieldForecast: number | null;
  aiForecast: number;
  variance: number;
  remarks: string;
}

const mockData: ForecastRow[] = [
  { id: '1', sku: 'SKU 01', month: 'Jan 2025', fieldForecast: 1200, aiForecast: 1000, variance: 20, remarks: '' },
  { id: '2', sku: 'SKU 02', month: 'Jan 2025', fieldForecast: null, aiForecast: 850, variance: 0, remarks: '' },
  { id: '3', sku: 'SKU 03', month: 'Jan 2025', fieldForecast: 600, aiForecast: 800, variance: -25, remarks: 'Lower demand expected due to competition' },
  { id: '4', sku: 'SKU 01', month: 'Feb 2025', fieldForecast: 1100, aiForecast: 1050, variance: 4.8, remarks: '' },
  { id: '5', sku: 'SKU 02', month: 'Feb 2025', fieldForecast: 900, aiForecast: 870, variance: 3.4, remarks: '' },
];

const EditableForecastTable = () => {
  const [data, setData] = useState<ForecastRow[]>(mockData);
  const [editingCell, setEditingCell] = useState<string | null>(null);

  const calculateVariance = (field: number, ai: number) => {
    return ((field - ai) / ai) * 100;
  };

  const getVarianceBadge = (variance: number) => {
    if (Math.abs(variance) > 25) {
      return <Badge variant="destructive" className="text-xs">High {variance > 0 ? '+' : ''}{variance.toFixed(1)}%</Badge>;
    } else if (Math.abs(variance) > 10) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">Med {variance > 0 ? '+' : ''}{variance.toFixed(1)}%</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300 text-xs">Low {variance > 0 ? '+' : ''}{variance.toFixed(1)}%</Badge>;
    }
  };

  const updateFieldForecast = (id: string, value: number) => {
    setData(prevData => 
      prevData.map(row => {
        if (row.id === id) {
          const newVariance = calculateVariance(value, row.aiForecast);
          return { ...row, fieldForecast: value, variance: newVariance };
        }
        return row;
      })
    );
  };

  const updateRemarks = (id: string, value: string) => {
    setData(prevData => 
      prevData.map(row => 
        row.id === id ? { ...row, remarks: value } : row
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">SKU</TableHead>
              <TableHead className="font-semibold">Month</TableHead>
              <TableHead className="font-semibold">Field Forecast</TableHead>
              <TableHead className="font-semibold">Baseline Forecast</TableHead>
              <TableHead className="font-semibold">Variance</TableHead>
              <TableHead className="font-semibold min-w-[200px]">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/20">
                <TableCell className="font-medium">{row.sku}</TableCell>
                <TableCell>{row.month}</TableCell>
                <TableCell className="relative">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={row.fieldForecast || ''}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        updateFieldForecast(row.id, value);
                      }}
                      className="w-24 h-8"
                      placeholder="Enter"
                    />
                    <Edit3 className="h-3 w-3 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.aiForecast}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getVarianceBadge(row.variance)}
                    {Math.abs(row.variance) > 25 && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Textarea
                    value={row.remarks}
                    onChange={(e) => updateRemarks(row.id, e.target.value)}
                    placeholder={Math.abs(row.variance) > 25 ? "Remarks required for high variance" : "Optional remarks"}
                    className="min-h-[60px] text-xs"
                    required={Math.abs(row.variance) > 25}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlertTriangle className="h-4 w-4" />
        <span>Remarks are mandatory for forecasts with variance &gt; 25%</span>
      </div>
    </div>
  );
};

export default EditableForecastTable;
