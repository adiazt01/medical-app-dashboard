import { Role } from "../../enums/role";

export interface IUserApi {
    id: number;
    firstNames: string;
    lastNames:  string;
    email:    string;
    role: Role;
    employee: number | null;
    costumer: number | null;
    createdAt: string;
    updatedAt: string;
    Cart: number | null;
}