import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";



export default  async function pageReserves() {
    const { userId } = await auth();
        if(!userId)  {
            return redirect("/")
        }
        const orders = await db.order.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createsAt: "desc",
            },
        });
      
    
  return (
    <div>
        
        <h1 className="text-2xl mb-4 font-bold">
        Reservations Page
        </h1>
        {orders.length === 0 ? (
            <div className="flex flex-col justify-center gap-6 ">
                <h2 className="text-xl">You have no reservations yet</h2>
                <p>You can make a reservation by clicking on the car you want to rent</p>
                <Link href="/cars">
                    <Button className="bg-blue-500 text-white">
                       Vehicules list
                    </Button>
                </Link>
            </div>
        ) : (

           <TableReserves orders={orders} />
            
        )}
    </div>
  )
}
