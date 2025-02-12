import { LucideIcon } from "lucide-react";

export type SidebarAdminProps = {
    items: {
        label: string;
        icon: LucideIcon,
        href: string;   
    }   
    key: string;

}