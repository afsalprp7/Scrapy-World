import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarSheetContent } from "@/tpes/home";
import { FaBars } from "react-icons/fa";

const SHEET_SIDES = ["top"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide({ userLoggedIn,heading, content }: navbarSheetContent) {
  return (
    <div className="grid grid-cols-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <FaBars height={300}/>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{heading}</SheetTitle>
            </SheetHeader>
            <div className="mt-4">{content()}</div>
            <div className={`${userLoggedIn ? 'flex justify-end' : 'hidden'}`}>
              <button className="bg-gradient-to-r from-green-500 to-black text-white font-medium py-2 px-4 rounded-lg hover:from-green-600 hover:to-gray-900 transition-all duration-300  p-1">BUY / SELL</button>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

export default SheetSide;
