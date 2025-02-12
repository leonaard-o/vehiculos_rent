import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import {
  categoryOurFleet,
  dataFirtsBlockOurFleet,
  dataSecondBLockOurFleet,
} from "./OurFleet.data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function OurFleet() {
  return (
    <div className="max-w-6xl mx-auto text-center py-12 lg:py-20 p-6 mb-5 mt-5">
    <h3 className="text-2xl lg:text-6xl font-bold">Our Vehicles Fleet</h3>
    <p className="text-lg mt-5 lg:mt-5 lg:text-xl text-center w-full mx-auto max-w-2xl mb-5 lg:mb-10">
      Do not  miss the chance to rent your favourite vehicles. We have a wide
      range of vehicles to choose from.
    </p>
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 items-center justify-center mb-5 max-w-2xl mx-auto">
      {categoryOurFleet.map(({ name, active }) => (
        <div
          key={name}
          className={cn(
            "rounded-xl py-2 px-3", 
            active ? "bg-black text-white" : "bg-slate-100"
      )}
        >
          {name}
        </div>
      ))}
    </div>
    <div className="mb-10 ">

    <div className="grid grid-cols-3 gap-x-6 mb-6">
        {dataFirtsBlockOurFleet.map(({url})=>(
            <div key={url}>
                <Image src={`/images/cars/${url}`} alt="Car" width={400} height={300} className="rounded-xl border-2 border-black h-[11em] p-2"
                />

            </div>
        ))}
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-x-6 mb-6 mx-auto gap-2 max-w-5xl ">
        {dataSecondBLockOurFleet.map(({url})=>(
            <div key={url}>
                <Image 
                src={`/images/cars/${url}`} 
                alt="Car"
                width={400} 
                height={300}
                className="rounded-xl border-2 border-black lg:h-[8em] p-1 lg:p-2 h-[7em]"
                />

            </div>
        ))}
    </div>

    </div>
    <Link href="/cars">
      <Button className="rounded-xl p-6 text-lg mt-5" variant="outline">Show all models
        <MoveRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  </div>
  
  );
}
