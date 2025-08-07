import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CropGIS = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CROP GIS</h1>
          <p className="text-muted-foreground">
            Interactive geographic information system for crop monitoring and analysis
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Crop Geographic Intelligence System</CardTitle>
          <CardDescription>
            Real-time crop monitoring, field analysis, and agricultural intelligence mapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-hidden rounded-lg border">
            <iframe
              src="https://piyushgupta135-crop-gis.hf.space"
              frameBorder="0"
              width="100%"
              height="1200"
              className="w-full"
              title="Crop GIS Application"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropGIS;