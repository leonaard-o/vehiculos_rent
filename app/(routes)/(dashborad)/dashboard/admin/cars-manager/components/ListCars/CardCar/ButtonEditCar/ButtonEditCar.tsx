"use client";

import { Button } from "@/components/ui/button";
import { ButtonEditCarProps } from "./ButtonEditCar.types";
import{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Pencil } from "lucide-react";
  import { useState } from "react";
import { FormEditCar } from "../FormEditCar";

export  function ButtonEditCar(props: ButtonEditCarProps) {
    const { carData } = props;
    const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpenDialog(true)}
                className=" w-[6em] text-[0.70em] lg:text-[0.90em]">
                Edit 
                <Pencil className="ml-2 w-4 h-4 text-blue-700 " strokeWidth={2}/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogDescription>
               <FormEditCar setOpenDialog={setOpenDialog} carData={carData}/>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
