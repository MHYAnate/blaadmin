import Manufacturer from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function ManufacturerInventoryPage() {
  return (
    <>
     <Suspense fallback={<LoadingSvg/>}>
      <Manufacturer />
      </Suspense>
    </>
  );
}
