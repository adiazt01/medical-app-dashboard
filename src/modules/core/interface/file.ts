interface IFileUpload {
  id: number;
  name: string;

  originalName: string;
  mimeType: string;
  fullPath: string;
  
  uploadId: string;
}
