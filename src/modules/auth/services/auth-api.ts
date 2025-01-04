import { post } from "../../../config/http";

export const login = async (email: string, password: string) => {
    const data = { email, password };
    return await post('/auth/login', data);
}

