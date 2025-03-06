import { get } from "@/config/http";

export const getTherapeuticActions = async () : Promise<ITherapeuticAction[]> => {
    const response = await get("therapeutic-actions");
    console.log(response)
    return (response as ITherapeuticAction[]);
}