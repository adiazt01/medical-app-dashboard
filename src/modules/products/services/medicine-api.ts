import { get, post } from "@/config/http";
import { IMetaDataFindAll } from "@/modules/core/interface/meta-interface";
import { CreateProductWithFileId } from "../interface/medicine";

export const getMedicines = async <T>(page = 1, limit = 2, search = ""): Promise<{
    data: T[],
    meta: IMetaDataFindAll
}> => {
    const response = await get<{ data: T[], meta: IMetaDataFindAll }>("medicines?page=" + page + "&limit=" + limit + "&search=" + search);
    return response;
}

export const createProduct = async <T>(data: CreateProductWithFileId): Promise<T> => {
    console.log(data)
    const response = await post<T>("medicines", data, {
      "Content-Type": "application/json",
    });
    return response;
}
