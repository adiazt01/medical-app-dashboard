import { get } from "@/config/http";

export const getMainComponents = async () : Promise<IMainComponent[]> => {
    const response = await get('main-components');

    return (response as IMainComponent[]);
}