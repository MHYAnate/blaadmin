import Vendors from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function VendorPage() {
  return (
    <>
     <Suspense fallback={<LoadingSvg/>}>
      <Vendors />
      </Suspense>
    </>
  );
}
