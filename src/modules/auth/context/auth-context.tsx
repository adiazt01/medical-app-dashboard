import { QueryClient, useMutation } from "@tanstack/react-query";
import { createContext, useReducer } from "react";
import { login as loginApi } from '../services/auth-api';


interface AuthState {
    user: any;
}

interface AuthAction {
    type: 'login' | 'logout'
    payload?: any
}

const initialState: AuthState = {
    user: null,
};

export const AuthContext = createContext<any>(null)

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload };
        case 'logout':
            return { ...state, user: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (email: string, password: string) => {
        const mutation = useMutation({
            mutationFn: () => loginApi(email, password),
            onSuccess: (data) => {
                dispatch({ type: 'login', payload: data });
            },
        })
        console.log(`mutation`, mutation)
        return mutation;
    }

    return (
        <AuthContext.Provider value={{ state, login }}>
            {children}
        </AuthContext.Provider>
    )
}