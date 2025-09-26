"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");

  const getErrorMessage = (error: string, step: string) => {
    if (step === "external") {
      return "Las credenciales ingresadas no son correctas. Por favor, verifica tu usuario y contraseña de Autocab.";
    }
    if (step === "internal") {
      return "No se pudieron obtener tus datos de empleado. Por favor, contacta al administrador del sistema.";
    }
    if (step === "cookies") {
      return "Hubo un problema al iniciar tu sesión. Por favor, intenta nuevamente.";
    }
    return "Ocurrió un error inesperado. Por favor, verifica tu conexión a internet e intenta nuevamente.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      setLoadingStep("Verificando credenciales...");

      // 1️⃣ Llamada a la API externa
      const resExternal = await fetch(
        "https://ghost-main-static-b7ec98c880a54ad5a4782393902a32a2.ghostapi.app:29003/api/v1/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!resExternal.ok) {
        setIsLoading(false);
        setLoadingStep("");
        setError(getErrorMessage("", "external"));
        return;
      }

      const dataExternal = await resExternal.json();

      setLoadingStep("Obteniendo datos del empleado...");

      // 2️⃣ Llamada a la API interna
      const resInternal = await fetch(
        "https://ecotrans-intranet-370980788525.europe-west1.run.app/employee_login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );

      if (!resInternal.ok) {
        setIsLoading(false);
        setLoadingStep("");
        setError(getErrorMessage("", "internal"));
        return;
      }

      const dataInternal = await resInternal.json();

      setLoadingStep("Iniciando sesión...");

      // 3️⃣ Guardar secret y user en cookies mediante API interna
      const cookieResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: dataExternal.secret,
          user: dataInternal[0],
        }),
      });

      if (!cookieResponse.ok) {
        setIsLoading(false);
        setLoadingStep("");
        setError(getErrorMessage("", "cookies"));
        return;
      }

      setLoadingStep("¡Acceso concedido! Redirigiendo...");

      setTimeout(() => {
        router.push("/intranet/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setLoadingStep("");
      setError(getErrorMessage("", "general"));
    }
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Acceso Intranet</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingrese su usuario y contraseña de Ghost para iniciar.
          </p>
          {error && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="usernameCab">Usuario Autocab</Label>
            <Input
              id="usernameCab"
              type="text"
              placeholder="usuario (Autocab)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="contraseña (Autocab)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validando acceso...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </div>
      </form>

      <Dialog open={isLoading} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {loadingStep.includes("¡Acceso concedido!") ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
              Validando acceso
            </DialogTitle>
            <DialogDescription className="text-center py-4">
              {loadingStep || "Procesando..."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            {!loadingStep.includes("¡Acceso concedido!") && (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
