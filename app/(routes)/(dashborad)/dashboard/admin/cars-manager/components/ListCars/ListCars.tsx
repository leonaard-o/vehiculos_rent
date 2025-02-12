import { CardCar } from "./CardCar";
import { ListCarsProps } from "./ListCars.types";


export  function ListCars(props: ListCarsProps) {
    const { cars } = props;
  return (
    <div className="grid grid-cols-2 gap-4 my-4 lg:grid-cols-3 overflow-y-auto h-screen scrollbar-hide">
        {cars.map((car) => (
            <CardCar car={car} key={car.id} />
        ))}
         
    </div>
  )
}
