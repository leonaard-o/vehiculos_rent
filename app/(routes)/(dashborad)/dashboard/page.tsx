import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db" 
import { ListCars } from "./components/ListCars";

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) {
         return redirect("/")
    }
         const cars = await db.car.findMany({
            where: {
                isPublish: true,

            },
            orderBy: {
                createAt: "desc",
            },
         });
         console.log(cars);
   
  return (
    <div >
       <div className="flex justify-between">
        <h2 className="text-2xl font-bold">List of Vehicles</h2>
       </div>
       <ListCars cars={cars} />
    </div>
  );
}
