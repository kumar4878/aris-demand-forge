
import React, { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileUploadBox = () => {
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only Excel files (.xlsx, .xls)",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "File Uploaded Successfully",
        description: `${file.name} has been processed. Data will appear in the table below.`,
      });

      // Here you would typically process the file
      console.log('Processing file:', file.name);
    }
  }, [toast]);

  const downloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Excel template has been downloaded to your device.",
    });
    // Here you would trigger the actual download
    console.log('Downloading template...');
  };

  return (
    <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Upload Forecast Data</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your Excel file here, or click to browse
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
            <Button variant="outline" className="relative overflow-hidden">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Choose File
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </Button>
            
            <Button variant="ghost" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Template
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Supported formats: .xlsx, .xls (Max 10MB)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadBox;
