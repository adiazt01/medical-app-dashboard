import { get, post } from "@/config/http";
import { IMetaDataFindAll } from "@/modules/core/interface/meta-interface";
import qs from 'query-string';

export const getMedicinesByBranchs = async <T>(page = 1, limit = 4, search = "", branchId?: null, medicineId?: null): Promise<{
    data: T[],
    meta: IMetaDataFindAll
}> => {

    const query = qs.stringify({
        page,
        limit,
        search,
        branchId,
        medicineId
    }, {
        skipEmptyString: true,
        skipNull: true,
    });

    const response = await get<{ data: T[], meta: IMetaDataFindAll }>(`branchs-medicines?${query}`);

    return response;
}

export const createBranchsMedicines = async <T>(data: T): Promise<T> => {
    const response = await post<T>(`branchs-medicines`, data);

    return response;
}