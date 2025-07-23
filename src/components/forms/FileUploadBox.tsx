
import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const FileUploadBox = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
      return;
    }

    setFileName(file.name);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          toast({
            title: "File Uploaded Successfully",
            description: `${file.name} has been processed and data extracted.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Excel template has been downloaded to your device.",
    });
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-primary bg-primary/5 scale-105'
            : uploadStatus === 'success'
            ? 'border-green-500 bg-green-50'
            : uploadStatus === 'error'
            ? 'border-destructive bg-destructive/5'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          {uploadStatus === 'success' ? (
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-scale-in" />
          ) : uploadStatus === 'error' ? (
            <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
          ) : (
            <Upload className={`h-16 w-16 mx-auto transition-colors duration-300 ${
              dragActive ? 'text-primary' : 'text-muted-foreground'
            }`} />
          )}
          
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {uploadStatus === 'success' 
                ? 'Upload Complete!' 
                : dragActive 
                ? 'Drop your file here' 
                : 'Drag & drop your Excel file'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {uploadStatus === 'success'
                ? `Successfully processed ${fileName}`
                : 'Or click to browse files (Excel format only)'}
            </p>
          </div>

          {uploadStatus === 'uploading' && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">Uploading {fileName}... {uploadProgress}%</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={downloadTemplate}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Template
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileSpreadsheet className="h-4 w-4" />
          Excel files only (.xlsx, .xls)
        </div>
      </div>

      {uploadStatus === 'success' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>156 rows</strong> of forecast data imported successfully. Review the data below before submitting.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUploadBox;
