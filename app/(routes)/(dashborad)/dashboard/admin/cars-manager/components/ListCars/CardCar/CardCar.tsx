"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Download, Fuel, Gauge, Gem, Trash, Upload, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

import { CardCarProps } from "./CardCar.types";
import { ButtonEditCar } from "./ButtonEditCar";

export function CardCar(props: CardCarProps) {
  const { car } = props;
  const router = useRouter();
  const deleteCar = async () => {
    try {
      await axios.delete(`/api/car/${car.id}`);
      toast({ title: "Car deleted ❌" });
      router.refresh();
    } catch {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  const handlerPublishCar = async (publish: boolean) => {
    try {
      await axios.patch(`/api/car/${car.id}`, { isPublish: publish });
      if (publish) {
       

        toast({
          title: "Car published ✅",
        });
      } else {
        toast({
          title: "Car unpublished ⚠️",
        });
      }
      router.refresh();
    } catch{
      toast({
        title: "Something went very wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="relative  p-4  rounded-lg shadow-md hover:shadow-lg">
<Image
  src={car.photo}
  alt={car.name}
  width={400}
  height={600}
  className="rounded-3xl h-[8em] lg:h-[12em] object-cover mt-5 shadow-[0_0_20px_10px_rgba(0,0,0,0.3)] backdrop-blur-sm "
/>
      {car.isPublish ? (
        <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-800 rounded-lg">
          Published
        </p>
      ) : (
        <p className="absolute top-0 right-0 w-full p-2 text-center text-slate-600 bg-gradient-to-tr from-red-500 via-orange-300 to-blue-300 rounded-lg font-semibold text-xs lg:text-[0.90em]mt-5">
          Not published
        </p>
      )}
     <div className="">
                  {/* Nombre y precio */}
                  <div className="mb-4">
                    <p className="text-xl font-bold text-slate-900">{car.name}</p>
                    <p className="text-lg font-semibold text-slate-800">
                      <span className="text-[0.9em] font-light text-slate-500">
                        $
                      </span>
                      {car.priceDay}{" "}
                      <span className="text-sm text-slate-500">/day</span>
                    </p>
                  
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-slate-700">
                    <p className="flex items-center">
                      <Gem className="h-4 w-4 mr-2 text-rose-500" strokeWidth={2} />
                      {car.type}
                    </p>
                    <p className="flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-amber-500" strokeWidth={2} />
                      {car.transmission}
                    </p>
                    <p className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-emerald-500" strokeWidth={2} />
                      {car.people}
                    </p>
                    <p className="flex items-center">
                      <Fuel className="h-4 w-4 mr-2 text-indigo-500" strokeWidth={2} />
                      {car.engine}
                    </p>
                    <p className="flex items-center">
                      <Gauge className="h-4 w-4 mr-2 text-cyan-500" strokeWidth={2} />
                      {car.cv} CV
                    </p>
                  </div>
        <div className="flex lg:justify-between mt-3 gap-x-2 lg:gap-x-4 ">
          <Button
            variant="outline"
            onClick={deleteCar}
            className="w-[7em] lg:w-full text-[0.70em] lg:text-[0.90em]"
          >
            Delete
            <Trash
              className="w-1 lg:w-4 h-2 lg:h-4 ml-2 text-red-700"
              strokeWidth={2}
            />
          </Button>
          <ButtonEditCar carData={car} />
        </div>
        {car.isPublish ? (
          <Button
            className="w-full mt-3"
            variant="outline"
            onClick={() => handlerPublishCar(false)}
          >
            Unpublish
            <Download className="w-4 h-4 ml-2 text-red-700" strokeWidth={2} />

          </Button>
        ) : (
          <Button
            className="w-full mt-3"
            onClick={() => handlerPublishCar(true)}
          >
            Publish
            <Upload className="w-4 h-4 ml-2 text-emerald-700" strokeWidth={2} />
          </Button>
        )}
      </div>
    </div>
  );
}
