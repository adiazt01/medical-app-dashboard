import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useLoginForm } from "../../hooks/useLoginForm";
import { FieldInfo } from "@/modules/core/components/input/form-info";

export function LoginForm() {
  const { form, loginUserMutation } = useLoginForm();

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