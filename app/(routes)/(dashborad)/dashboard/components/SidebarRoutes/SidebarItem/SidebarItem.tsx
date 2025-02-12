import Link from "next/link";
import { SidebarItemProps } from "./SidebarItem.types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Definimos las props que SidebarItem acepta
interface SidebarItemExtendedProps extends SidebarItemProps {
  onItemClick: () => void; // Prop para cerrar el menú
}

export function SidebarItem({ item, onItemClick }: SidebarItemExtendedProps) {
  const { href, icon: Icon, label } = item;
  const pathname = usePathname();
  const activePath = pathname === href;

  return (
    <Link
      href={href}
      onClick={onItemClick} // Cerramos el Sheet al hacer clic
      className={cn(
        `flex gap-x-3 items-center p-3 rounded-lg transition-all duration-200`,
        `hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-400 hover:shadow-sm`,
        `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
        activePath
          ? "bg-gradient-to-r from-blue-200 to-purple-100 shadow-sm text-blue-900 font-semibold"
          : "text-slate-700 hover:text-blue-900"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-colors duration-200",
          activePath ? "text-purple-900 group-hover:text-blue-600" : "text-slate-500 group-hover:text-blue-600"
        )}
        strokeWidth={2}
      />
      <p
        className={cn(
          "text-sm transition-colors duration-200",
          activePath ? "text-blue-900 font-semibold" : "text-slate-700 group-hover:text-blue-900"
        )}
      >
        {label}
      </p>
    </Link>
  );
}