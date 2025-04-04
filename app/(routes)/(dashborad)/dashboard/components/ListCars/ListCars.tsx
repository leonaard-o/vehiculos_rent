"use client";
import { Car } from "@prisma/client";
import { ListCarsProps } from "./ListCars.types";

import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { useLovedCars } from "@/hooks/use-loved-cars";
import ShineImage from "@/app/(routes)/(home)/components/gsap-shine/Shine";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { addLoveItem, lovedItems, removeLoveItem } = useLovedCars();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4  overflow-y-auto h-screen">
      {cars.map((car: Car) => {
        const { priceDay, photo, id, name } = car;
        const likedCar = lovedItems.some((item) => item.id === car.id);

        return (
          <div
            key={id}
            className="rounded-lg  hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white via-slate-200 to-slate-100 border border-slate-900 hover:border-slate-900 p-4"
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
                  <Gem className="h-4 w-4 mr-2 text-cyan-400" strokeWidth={2} />
                  {car.type}
                </p>
                <p className="flex items-center">
                  <Wrench
                    className="h-4 w-4 mr-2 text-amber-500"
                    strokeWidth={2}
                  />
                  {car.transmission}
                </p>
                <p className="flex items-center">
                  <Users
                    className="h-4 w-4 mr-2 text-emerald-400"
                    strokeWidth={2}
                  />
                  {car.people}
                </p>
                <p className="flex items-center">
                  <Fuel
                    className="h-4 w-4 mr-2 text-indigo-500"
                    strokeWidth={2}
                  />
                  {car.engine}
                </p>
                <p className="flex items-center">
                  <Gauge
                    className="h-4 w-4 mr-2 text-cyan-500"
                    strokeWidth={2}
                  />
                  {car.cv} CV
                </p>
              </div>

              <div className="flex items-center justify-center gap-x-3">
                <ModalAddReservation car={car} />
                <Heart
                  className={`mt-2 cursor-pointer text-purple-500 ${
                    likedCar && "fill-black"
                  }`}
                  strokeWidth={2}
                  onClick={
                    likedCar
                      ? () => removeLoveItem(car.id)
                      : () => addLoveItem(car)
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}