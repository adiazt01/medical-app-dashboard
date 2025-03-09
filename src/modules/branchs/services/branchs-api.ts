import { get } from "@/config/http";
import { IMetaDataFindAll } from "@/modules/core/interface/meta-interface";

export const getBranchs = async <T>(page = 1, limit = 4, search = "", role = ""): Promise<{
    data: T[],
    meta: IMetaDataFindAll
}> => {
    const response = await get<{ data: T[], meta: IMetaDataFindAll }>(`branchs?page=${page}&limit=${limit}&search=${search}`);

    return response;
}