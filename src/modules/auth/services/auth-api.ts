import { post } from "../../../config/http";

export const login = async (email: string, password: string) => {
    const data = { email, password };
    const response = await post('/hub/auth/sign-in', data);
    return response;
}

