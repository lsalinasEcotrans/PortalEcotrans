"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
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
        setError("Usuario o contraseña incorrectos");
        return;
      }

      const dataExternal = await resExternal.json();

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
        setError("Error al obtener datos internos");
        return;
      }

      const dataInternal = await resInternal.json();

      // 3️⃣ Guardar secret y user en cookies mediante API interna
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: dataExternal.secret,
          user: dataInternal[0],
        }),
      });

      // 4️⃣ Redirigir al dashboard
      router.push("/intranet/dashboard");
    } catch (err) {
      console.error(err);
      setError("Error inesperado, intente nuevamente");
    }
  };

  return (
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
          />
        </div>

        <Button type="submit" className="w-full">
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
}
