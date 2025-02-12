import Link from "next/link";
import { SidebarAdminProps } from "./SidebarAdmin.types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


export function SidebarAdmin(props: SidebarAdminProps) {
    const { items} = props;
    const { href, icon: Icon, label } = items;
    const pathname = usePathname();
    const activePath = pathname === href;
    

  return (
    <Link
    href={href}
    className={cn(`flex gap-x-2 mt-2 text-slate-700 text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`, activePath && "bg-slate-500/20")}>

    <Icon className="h-5" strokeWidth={2}/>
    <p className="text-sm font-semibold text-blue-900">{label}</p>

    </Link>

  )
}