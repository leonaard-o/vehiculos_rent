import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



import { ModalAddReservationProps } from "./ModalAddReservation.types";
import { Button } from "@/components/ui/button";
import { Car } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export function ModalAddReservation(props: ModalAddReservationProps) {
  const { car } = props;
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  })
  const onReserveCar =async ( car: Car, dateSelected: DateRange) => {
    const response = await   axios.post("/api/checkout", {
         carId: car.id,
         priceDay: car.priceDay,
         startDate: dateSelected.from,
         endDate: dateSelected.to,
         carName: car.name,

    })
    window.location = response.data.url;
    toast({
        title: "Car reserved🚗",
    })
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
        variant="outline"
         className="mt-3 w-full">        
          Add Reservation
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Select the  dates you want to reserve the vehicle
            </AlertDialogTitle>
          <AlertDialogDescription>
           <CalendarSelector setDateSelected={setDateSelected} carPriceDay={car.priceDay}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onReserveCar(car, dateSelected)}>Reserve vehicle</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
