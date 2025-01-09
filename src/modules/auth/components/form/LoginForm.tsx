import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { useEffect } from "react";
import { login } from "../../services/auth-api";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import { adminLoginSchema } from "../../schemas/auth-schemas";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <small className="ml-2 text-sm text-red-500 font-medium leading-none">{field.state.meta.errors.join(", ")}</small>
      ) : null}
    </>
  );
}

export function LoginForm() {
  const navigate = useNavigate()
  const { setAccessToken, accessTokenData } = useAuth()
  const { toast } = useToast();

  const loginUserMutation = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return login(data.email, data.password)
    }
  })

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: adminLoginSchema,
      onBlur: adminLoginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const accessToken = await loginUserMutation.mutateAsync(value);
        setAccessToken(accessToken.accessToken);
        toast({
          title: 'Inicio de sesión exitoso',
          description: 'Bienvenido al panel de administración',
        })
      } catch (error) {
        toast({
          title: 'Error al iniciar sesión',
          description: 'Verifique sus credenciales e intente nuevamente',
          variant: 'destructive'
        })
      }
    },
    onSubmitInvalid: () => {
      toast({
        title: 'Ocurrio un error al iniciar sesión',
        description: 'El servidor no pudo procesar la solicitud',
        variant: 'destructive'
      })
    }
  });

  useEffect(() => {
    if (accessTokenData) {
      navigate({
        to: '/dashboard'
      })
    }
  }
    , [accessTokenData])



  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Iniciar sesión
          </CardTitle>
          <CardDescription>
            Ingrese sus credenciales para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <form.Field
                  name="email"
                  children={(field) => (
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        placeholder="email@mail.com"
                        id="email"
                        disabled={loginUserMutation.isPending}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <form.Field
                  name="password"
                  children={(field) => (
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        disabled={loginUserMutation.isPending}
                        placeholder="password"
                        type="password"
                        id="********"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </div>
              <Button
                disabled={loginUserMutation.isPending}
                type="submit" className="w-full">
                {loginUserMutation.isPending ?
                  <Loader className="w-6 animate-spin h-6" />
                  : 'Iniciar sesión'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}