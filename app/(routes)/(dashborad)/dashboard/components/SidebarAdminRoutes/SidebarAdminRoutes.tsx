    "use client"

import { useAuth } from "@clerk/nextjs"
import { SidebarAdmin } from "./SidebarAdmin/SidebarAdmin"
import { dataAdminSidebar } from "./SidebarAdminRoutes.data"
import { isAdministrator } from "@/lib/isAdministrator"


export function SidebarAdminRoutes() {
    const { userId } = useAuth() 

    return (
        isAdministrator(userId) && (
          <div className="flex flex-col justify-between h-screen">
            <div>
              <div className="p-2 md:p-6">
                <p className="mb-2 text-slate-700">ADMIN</p>
                {dataAdminSidebar.map((item) => (
                  <SidebarAdmin key={item.label} items={item} />
                ))}
              </div>
            </div>
          </div>
        )
      );
    }      