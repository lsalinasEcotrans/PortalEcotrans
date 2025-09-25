import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { secret, user } = await req.json();

    if (!secret || !user) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Login exitoso" });

    // Cookie HttpOnly para el token (secret)
    response.cookies.set({
      name: "token",
      value: secret,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60, // 1 hora
    });

    // Cookie HttpOnly para los datos del usuario
    response.cookies.set({
      name: "user",
      value: JSON.stringify(user),
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60, // 1 hora
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error en el login" }, { status: 500 });
  }
}
