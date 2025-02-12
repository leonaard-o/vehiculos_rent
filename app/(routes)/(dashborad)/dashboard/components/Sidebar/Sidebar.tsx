
"use client";
import { LogoDashboard } from "../LogoDashboard";
import { SidebarAdminRoutes } from "../SidebarAdminRoutes";
import { SidebarRoutes } from "../SidebarRoutes";

export function Sidebar() {
  // Función que se ejecuta al hacer clic en un ítem del menú
  const handleItemClick = () => {
    console.log("Ítem del menú clickeado");
    // Aquí puedes agregar más lógica, como cerrar un menú lateral
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col h-full border-r">
        <LogoDashboard />
        {/* Pasamos handleItemClick a SidebarRoutes */}
        <SidebarRoutes onItemClick={handleItemClick} />
        <SidebarAdminRoutes/>
      </div>
    </div>
  );
}