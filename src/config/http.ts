import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
};

export const post = async <T>(url: string, data: any): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
};

export const put = async <T>(url: string, data: any): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
};

export const del = async <T>(url: string): Promise<T> => { // 'delete' is a reserved word
    const response = await axiosInstance.delete<T>(url);
    return response.data;
};

export const patch = async <T>(url: string, data: any): Promise<T> => {
    const response = await axiosInstance.patch<T>(url, data);
    return response.data;
};

export const setToken = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};