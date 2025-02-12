import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";
import { isAdministrator } from "@/lib/isAdministrator";


export default async function pageReservesAdmin() {
    const {userId} = await  auth();
    const user = await  currentUser();
    if(!userId || !user ||!isAdministrator(userId)){
            return redirect("/")
    }
    const oreders = await db.order.findMany({
        orderBy: {
            createsAt: "desc",

        },

    });
    console.log(oreders)
  return (
    <div>
        <h1 className="text-3xl mb-4 ">Admin Reservations Page</h1> 
        <TableReserves orders={oreders} />
    </div>
  )
}
