import { IMetaDataFindAll } from "@/modules/core/interface/meta-interface"

export interface IBranch {
    name: string
    address: string
    phone: string
    email: string
    createdAt: string
}

export interface IGetBranchs {
    data: IBranch[]
    meta: IMetaDataFindAll
}