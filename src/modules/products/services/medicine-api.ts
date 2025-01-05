import { get } from "@/config/http";
import { product } from "../components/table/columns";

export const getMedicines = async () : Promise<product[]> => {
    const response = await get('/hub/medicines');

    return (response as product[]);
}