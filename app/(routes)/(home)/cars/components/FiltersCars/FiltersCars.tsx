import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersCarsProps } from "./FiltersCars.types";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
export function FiltersCars(props: FiltersCarsProps) {
  const { clearFilters, setFilters, filters } = props;
  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };
  return (
    <div className="mt-5 mb-8  flex flex-col  space-y-2 md:-gap-5 lg:gap-5 md:flex-row md:space-y-0">
      <Select onValueChange={(value) => handleFilter("type", value)} value={filters.type}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Vehicle Categories" />
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Vehicle Categories</SelectLabel>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
              <SelectItem value="familiar">Familiar</SelectItem>
              <SelectItem value="luxe">Luxe</SelectItem>
              <SelectItem value="clasic">Clasic</SelectItem>
              <SelectItem value="convertible">Convertible</SelectItem>
              <SelectItem value="limousine">Limousine</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>

      <Select 
  onValueChange={(value) => handleFilter("transmission", value)} 
  value={filters.transmission}
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Transmission Options" />
    <SelectContent>
      <SelectGroup>
        <SelectLabel className="cursor-pointer hover:bg-slate-500 rounded-full" onClick={() => handleFilter("transmission", "")}>Transmission Options</SelectLabel> 
        <SelectItem value="manual">Manual Drive</SelectItem>
        <SelectItem value="automatic">Automatic</SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectTrigger>
</Select>


      <Select onValueChange={(value) => handleFilter("engine", value)} value={filters.engine}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Engine Type" />
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="cursor-pointer hover:bg-slate-500 rounded-full" onClick={() => handleFilter("engine", "")}>Engine Type</SelectLabel>
              <SelectItem value="gasoil">Gas Oil</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="hibride">Hibride</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>

     
      <Button onClick={clearFilters} >
        Clear Filters <Trash className="ml-2 w-4 h-4" />

      </Button>
    </div>
  );
}
