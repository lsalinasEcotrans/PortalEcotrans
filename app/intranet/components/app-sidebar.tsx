"use client";

import type * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bot, Command, SquareTerminal } from "lucide-react";

import { NavMain } from "../components/nav-main";
import { NavUser } from "../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Locucion",
      url: "",
      icon: SquareTerminal,
      items: [
        {
          title: "Libro Novedades",
          url: "/dashboard/locucion/libro_novedades",
        },
        { title: "Turnos", url: "/dashboard/locucion/turnos" },
        {
          title: "Turnos Conductores",
          url: "/dashboard/locucion/turnos_moviles",
        },
        {
          title: "Postulacion hualpen",
          url: "/dashboard/locucion/postulacion_hualpen",
        },
        {
          title: "Moviles Suspendidos",
          url: "/dashboard/locucion/moviles_suspendidos",
        },
        {
          title: "Moviles con habitual",
          url: "/dashboard/locucion/moviles_habituales",
        },
        {
          title: "Capacidad de Moviles",
          url: "/dashboard/locucion/capacidad_moviles",
        },
      ],
    },
    {
      title: "Gestión de Servicios",
      url: "/gestion_servicios",
      icon: Bot,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const getNavItemsWithActiveState = () => {
    return data.navMain.map((item) => {
      const hasActiveChild = item.items?.some((sub) => pathname === sub.url);

      return {
        ...item,
        isActive: pathname === item.url || hasActiveChild,
        items: item.items?.map((sub) => ({
          ...sub,
          isActive: pathname === sub.url,
        })),
      };
    });
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {/* <Command className="size-4" /> */}
                  <Image
                    src="/images/preload.png"
                    alt="Ecotrans Logo"
                    width={24}
                    height={28}
                    className="h-auto w-6"
                  ></Image>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h1>Ecotrans</h1>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={getNavItemsWithActiveState()} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
