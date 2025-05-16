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

export function SheetSide({ heading, content }: navbarSheetContent) {
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
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

export default SheetSide;
