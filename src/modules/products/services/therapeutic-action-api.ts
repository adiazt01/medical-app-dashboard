import { get } from "@/config/http";

export const getTherapeuticActions = async () : Promise<ITherapeuticAction[]> => {
    const response = await get("/hub/therapeutic-actions");
    return (response as ITherapeuticAction[]);
}