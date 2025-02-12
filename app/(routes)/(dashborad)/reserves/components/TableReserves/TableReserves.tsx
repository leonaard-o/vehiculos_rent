import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableReservesProps } from "./TableReserves.types";
import { formatPrice } from "@/lib/formatPrice";

export function TableReserves(props:TableReservesProps) {
    const { orders} = props;

    const totalAmount = orders.reduce((acc, booking) => {
        const amount = parseFloat(booking.totalAmount);
        return !isNaN(amount) ? acc + amount : acc;
    }, 0);
    
  return (
    <Table>
      <TableCaption>A list of your recent bookings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Vehicle</TableHead>
          <TableHead>Date Start</TableHead>
          <TableHead>Date End</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order)=>(
        <TableRow key={order.id}>
          <TableCell className="font-medium">{order.carName}</TableCell>
          <TableCell>
            {new Date(order.orderDate).toLocaleDateString()}
          </TableCell>
          <TableCell>
            {new Date(order.orderEndDate).toLocaleDateString()}
          </TableCell>
          <TableCell>
  <div
    className={`p-2 rounded-lg w-fit hidden sm:table-cell ${
      order.status === "Completed" ? "bg-yellow-600" : "bg-green-600"
    } text-white`}
  >
    {order.status}
  </div>
</TableCell>
            <TableCell className="text-right">
            {formatPrice(parseInt(order.totalAmount))}
            </TableCell>

        </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
            <TableCell  colSpan={4} className="text-left font-bold text-blue-800">Total</TableCell>
            <TableCell className="text-right font-bold text-blue-800">{formatPrice(totalAmount)}  </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
