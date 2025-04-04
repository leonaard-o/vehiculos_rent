import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

import { TableReservesProps } from "./TableReserves.types";
import { formatPrice } from "@/lib/formatPrice";


export  function TableReserves(props: TableReservesProps) {
    const { orders} = props;
    const totalAmount = orders.reduce((acc, booking) => {
        return acc + parseFloat(booking.totalAmount);
        
    }, 0);


  return (
    <Table>
  <TableCaption>A list of your recent bookings.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Order Date</TableHead>
      <TableHead>Custumer ID</TableHead>
      <TableHead>Vehicle</TableHead>
      <TableHead>Date Start</TableHead>
      <TableHead>Date End</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
        {orders.map((order)=> (
    <TableRow key={order.id}>
         
      
      <TableCell className="font-medium">{new Date(order.createsAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        })}
      </TableCell>
      <TableCell className="font-medium max-w-[100px] truncate">{order.userId}</TableCell>
      <TableCell className="font-medium">{order.carName}</TableCell>
      <TableCell>{new Date(order.orderDate).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}</TableCell>
               
      <TableCell>{new Date(order.orderEndDate).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}</TableCell>
      <TableCell className="text-right">
       {formatPrice(Number(order.totalAmount))}
      </TableCell>
    </TableRow>
))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell className="font-bold text-xl"  colSpan={5}>Total </TableCell>
      <TableCell className="text-right font-bold text-blue-800 text-[1em]">{formatPrice(totalAmount)}</TableCell>
      </TableRow>
  </TableFooter>
</Table>

  )
}
