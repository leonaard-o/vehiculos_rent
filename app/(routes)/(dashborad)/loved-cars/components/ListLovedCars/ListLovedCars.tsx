"use client";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { Car } from "@prisma/client";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";

import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { Button } from "@/components/ui/button";
import ShineImage from "@/app/(routes)/(home)/components/gsap-shine/Shine";

export default function ListLovedCars() {
  const { lovedItems, removeLoveItem } = useLovedCars();

  return (
    <>
      {lovedItems.length === 0 ? (
        <h2 className="text-lg font-bold text-slate-800">
          You have no loved vehicles yet
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4  overflow-y-auto h-screen">
          {lovedItems.map((car: Car) => {
            const {
              priceDay,
              photo,
              name,
              type,
              transmission,
              people,
              engine,
              cv,
              id,
            } = car;
            return (
                <div
                className="rounded-lg  hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white via-slate-200 to-slate-100 border border-slate-900 hover:border-slate-900 p-4"
                key={id}
              >
                {/* Imagen del carro */}
                <ShineImage 

src={photo}
alt={name}
width={400}
height={600}
className=""
/>


                {/* Detalles del carro */}
                <div className="p-6">
                  {/* Nombre y precio */}
                  <div className="mb-4">
                    <p className="text-xl font-bold text-slate-900">{name}</p>
                    <p className="text-lg font-semibold text-slate-800">
                      <span className="text-[0.9em] font-light text-slate-500">
                        $
                      </span>
                      {priceDay}{" "}
                      <span className="text-sm text-slate-500">/day</span>
                    </p>
                  </div>

                  {/* Especificaciones del carro */}
                  <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-slate-700">
                    <p className="flex items-center">
                      <Gem className="h-4 w-4 mr-2 text-rose-500" strokeWidth={2} />
                      {type}
                    </p>
                    <p className="flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-amber-500" strokeWidth={2} />
                      {transmission}
                    </p>
                    <p className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-emerald-500" strokeWidth={2} />
                      {people}
                    </p>
                    <p className="flex items-center">
                      <Fuel className="h-4 w-4 mr-2 text-indigo-500" strokeWidth={2} />
                      {engine}
                    </p>
                    <p className="flex items-center">
                      <Gauge className="h-4 w-4 mr-2 text-cyan-500" strokeWidth={2} />
                      {cv} CV
                    </p>
                  </div>

                {/* Botones de acción */}
                <div className="flex items-center justify-center gap-x-4 mt-4">
                    <ModalAddReservation car={car} />
                    <Button className="bg-transparent flex items-center gap-x-2 hover:bg-white transition-colors duration-200 mt-4"  onClick={() => removeLoveItem(car.id)}>

                    <Heart
                      className="h-6 w-6 text-rose-500 
                                                 fill-black"
                      strokeWidth={2}
                      onClick={() => removeLoveItem(car.id)}
                    />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}