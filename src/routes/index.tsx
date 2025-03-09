import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight, HeartPulse, Lock, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import hero from '../assets/home.webp'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MediDash</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="grid w-full gap-6 md:grid-cols-2 lg:gap-16 max-w-7xl">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Bienvenido a su plataforma médica
              </h1>
              <p className="text-muted-foreground md:text-xl">
                {/* !TODO Cambiar */}
                Acceda a su dashboard para gestionar pacientes, citas e historias clínicas de forma segura y eficiente.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link to="/dashboard">
                  Ir al Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/auth/register">Registrarse</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex justify-center mb-4">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={hero}
                  alt="Ilustración médica"
                  className="h-full w-full rounded-md object-cover border border-primary/20"
                />
              </AspectRatio>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Gestión de Pacientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Administre historiales, citas y seguimientos de forma centralizada.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Agenda Inteligente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Organice su día con recordatorios y notificaciones automáticas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Historias Clínicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Acceda y actualice expedientes médicos de forma segura.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Reportes y Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visualice datos clave para mejorar la atención médica.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">MediDash</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MediDash. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/terminos" className="text-sm text-muted-foreground hover:underline">
              Términos
            </Link>
            <Link href="/privacidad" className="text-sm text-muted-foreground hover:underline">
              Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
