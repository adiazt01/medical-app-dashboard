import { post } from "@/config/http";
import { AxiosHeaders } from "axios";

export const uploadFile = async (file: File, folder: string): Promise<IFileUpload> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const response = await post('file', formData, {
      "Content-Type": "multipart/form-data",
    });
    return response as IFileUpload;
}
