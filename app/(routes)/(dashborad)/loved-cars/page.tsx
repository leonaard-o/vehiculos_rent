
import { auth } from "@clerk/nextjs/server";
import ListLovedCars from "./components/ListLovedCars/ListLovedCars";
import { redirect } from "next/navigation";


export default async function pageLovedCars() {
    const { userId } = await  auth();
    if (!userId) {
        return redirect("/");
    }
  return (
    <div>
        
        <h1 className="text-2xl mb-5 font-bold">
        Here you can see all the vehicles you prefered 
        </h1>
            <ListLovedCars/>
     
    </div>
  )
}
