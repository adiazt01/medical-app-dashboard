import { get } from "@/config/http";
import { ILaboratory } from "../interface/laboratory";

export const getLaboratories = async () : Promise<ILaboratory[]> => {
    const response = await get('laboratories');

    return (response as ILaboratory[]);
}
