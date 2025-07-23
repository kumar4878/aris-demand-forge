
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FilterBarProps {
  zone: string;
  region: string;
  season: string;
  onZoneChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
}

const FilterBar = ({ zone, region, season, onZoneChange, onRegionChange, onSeasonChange }: FilterBarProps) => {
  return (
    <Card className="p-4 border-0 shadow-sm">
      <div className="flex flex-wrap gap-4">
        <div className="min-w-[150px]">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Zone</label>
          <Select value={zone} onValueChange={onZoneChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north">North Zone</SelectItem>
              <SelectItem value="south">South Zone</SelectItem>
              <SelectItem value="east">East Zone</SelectItem>
              <SelectItem value="west">West Zone</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[150px]">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Region</label>
          <Select value={region} onValueChange={onRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="region1">Region 1</SelectItem>
              <SelectItem value="region2">Region 2</SelectItem>
              <SelectItem value="region3">Region 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[150px]">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Crop Season</label>
          <Select value={season} onValueChange={onSeasonChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kharif">Kharif 2024</SelectItem>
              <SelectItem value="rabi">Rabi 2024-25</SelectItem>
              <SelectItem value="summer">Summer 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default FilterBar;
