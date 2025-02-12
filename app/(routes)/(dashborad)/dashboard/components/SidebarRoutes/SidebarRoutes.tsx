"use client";

import { SidebarItem } from "./SidebarItem";
import { dataGeneralSidebar } from "./SidebarRoutes.data";

// Definimos las props que SidebarRoutes acepta
interface SidebarRoutesProps {
  onItemClick: () => void; // Prop para cerrar el menú
}

export function SidebarRoutes({ onItemClick }: SidebarRoutesProps) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <div className="p-4 md:p-6 space-y-4">
          <p className="mb-2 text-slate-700">GENERAL</p>

          {/* Mapeamos dataGeneralSidebar y pasamos onItemClick a cada SidebarItem */}
          {dataGeneralSidebar.map((item) => (
            <SidebarItem
              key={item.label} // Clave única para cada ítem
              item={item} // Datos del ítem (icono, label, href)
              onItemClick={onItemClick} // Pasamos onItemClick a SidebarItem
            />
          ))}
        </div>
      </div>
    </div>
  );
}