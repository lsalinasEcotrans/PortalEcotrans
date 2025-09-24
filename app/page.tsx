"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Car, Shield, Settings } from "lucide-react";
import Logo from "@/public/preload.png";
import Image from "next/image";

export default function HomePage() {
  const portals = [
    {
      title: "Portal Conductores",
      description: "Acceso exclusivo para conductores registrados",
      url: "/conductores",
      icon: Car,
      color: "bg-primary hover:bg-primary/90",
      backgroundImage: "/press-start-button-car-start-vehicle.jpg",
    },
    {
      title: "Portal Pasajeros",
      description: "Servicios y gestión para pasajeros",
      url: "/pasajeros",
      icon: Users,
      color: "bg-accent hover:bg-accent/90",
      backgroundImage: "/smiling-woman-traveling-by-car.jpg",
    },
    {
      title: "Intranet",
      description: "Sistema interno corporativo",
      url: "/intranet",
      icon: Shield,
      color: "bg-primary/80 hover:bg-primary/70",
      backgroundImage: "/office-intranet.jpg",
    },
    {
      title: "Admin Convenios",
      description: "Administración de convenios empresariales",
      url: "/admin.convenios",
      icon: Settings,
      color: "bg-accent/90 hover:bg-accent/80",
      backgroundImage: "/admin-contracts.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros Portales
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Selecciona el portal que necesitas para acceder a los servicios
              específicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {portals.map((portal, index) => {
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 transform"
                  style={{
                    backgroundImage: `url(${portal.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-500"></div>

                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <h4 className="text-xl font-semibold text-white mb-3 text-balance drop-shadow-lg">
                      {portal.title}
                    </h4>

                    <p className="text-white/90 text-sm leading-relaxed mb-6 flex-grow drop-shadow-md">
                      {portal.description}
                    </p>

                    <Button
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-white/90 hover:bg-white text-black hover:scale-105 shadow-lg"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={portal.url}
                        className="flex items-center justify-center gap-2"
                      >
                        Acceder
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <footer
        className="bg-accent  py-8 mt-auto text-white"
        style={{ backgroundColor: "#000000ff" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-bold text-lg font-ecotrans inline-flex items-center mb-2">
                <Image
                  src={Logo}
                  alt="Ecotrans Logo"
                  className="inline-block mr-2"
                  width={24}
                  height={24}
                />
                <span className="text-verde">Eco</span>trans
              </h4>

              <p className="text-sm">Soluciones de transporte.</p>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>contacto@ecotranschile.cl</p>
              <p>© 2025 Ecotrans Chile. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
