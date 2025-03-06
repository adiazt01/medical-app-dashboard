import { useToast } from "@/modules/core/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth-api";
import { useForm } from "@tanstack/react-form";
import { adminLoginSchema } from "../schemas/auth-schemas";
import { useEffect } from "react";

export function useLoginForm() {
  const navigate = useNavigate();
  const { setAccessToken, accessTokenData } = useAuth();
  const { toast } = useToast();

  const loginUserMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return login(data.email, data.password);
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Bienvenido al panel de administración',
      });
      navigate({
        to: '/dashboard'
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error al iniciar sesión',
        description: error.response?.data?.message || 'Verifique sus credenciales e intente nuevamente',
        variant: 'destructive',
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: adminLoginSchema,
      onBlur: adminLoginSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value)
      loginUserMutation.mutate(value);
    },
  });

  useEffect(() => {
    if (accessTokenData) {
      navigate({
        to: '/dashboard'
      })
    }
  }, [accessTokenData, navigate]);

  return { form, loginUserMutation };
}