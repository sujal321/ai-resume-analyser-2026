"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";

interface UploadBoxProps {
  onUploadComplete: (data: any) => void;
}

export default function UploadBox({ onUploadComplete }: UploadBoxProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>
          Drag and drop your PDF resume or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-colors hover:bg-accent/50
            ${isDragActive ? "border-primary bg-accent/50" : "border-border"}
            ${uploading ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p>Analyzing your resume with AI...</p>
            </div>
          ) : isDragActive ? (
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-primary" />
              <p>Drop your resume here...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <p>
                Drag & drop your PDF resume here, or{" "}
                <span className="text-primary underline">browse</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Only PDF files are supported
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
