import { get } from "@/config/http";

export const getPresentations = async () : Promise<IPresentation[]> => {
    const response = await get('presentations');

    return (response as IPresentation[]);
}