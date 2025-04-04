"use client";
import { useState } from "react"; // Importamos useState
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";
import { UserButton } from "@clerk/nextjs";

export function NavbarDashboard() {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Estado para controlar si el Sheet está abierto

  return (
    <nav className="flex items-center justify-between h-20 border-b-2 border-slate-800 px-2 gap-x-4 md:px-6  w-full">
      {/* Menú lateral en modo desktop (visible en pantallas grandes) */}
      <div className="hidden xl:flex">
        <SidebarRoutes onItemClick={() => setIsSheetOpen(false)} />
      </div>

      {/* Botón de menú en modo móvil (visible en pantallas pequeñas) */}
      <div className="block xl:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="flex items-center">
            <MenuIcon/>
          </SheetTrigger>
          <SheetContent side="left">
            {/* Pasamos setIsSheetOpen a SidebarRoutes para cerrar el Sheet al hacer clic en una ruta */}
            <SidebarRoutes onItemClick={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Botón de usuario */}
      <div className="flex items-center justify-end w-full gap-x-2">
        <UserButton />
      </div>
    </nav>
  );
}