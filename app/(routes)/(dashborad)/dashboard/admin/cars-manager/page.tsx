import { auth } from "@clerk/nextjs/server";
import { ButtonAddCar } from "./components/ButtonAddCar";
import { ListCars } from "./components/ListCars";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdministrator"

export default async function CarsManagerPage(){
    const { userId} = await auth()

    if(!userId || !isAdministrator(userId)){
        return redirect("/")
       
    }
    const car = await db.car.findMany({
        where: {
            userId,
        },
        orderBy: {
            createAt: "desc",
        }
    })

    return(
        <div className="p-2">
            <div className="flex justify-between  ">
                <h2 className="text-2xl font-bold ">Manage Your Vehicles</h2>
                <ButtonAddCar/>
            </div>
            <ListCars cars={car}/>
        </div>
    )
}