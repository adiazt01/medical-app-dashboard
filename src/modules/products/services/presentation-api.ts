import { get } from "@/config/http";

export const getPresentations = async () : Promise<IPresentation[]> => {
    const response = await get('/hub/presentations');

    return (response as IPresentation[]);
}