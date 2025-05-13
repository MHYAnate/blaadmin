import Manufacturers from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function ManufacturersPage() {
  return (
     <Suspense fallback={<LoadingSvg/>}>
    <section>
      <Manufacturers />
    </section>
    </Suspense>
  );
}
