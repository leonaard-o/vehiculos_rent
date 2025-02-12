import { Navbar } from "@/components/Shared/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function OrderErrorPage() {
  return (
    <div>
        <Navbar/>
        <div>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold">😢 Something went wrong</h1>
            <p>Please try again later</p>
            <Link className="text-blue-500" href="/">
            <Button>
                    Return to vehicle Selection
            </Button>
            </Link>

        </div>
    </div>
</div>
  )
}
