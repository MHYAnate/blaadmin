import InventoryManagement from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function InventoryPage() {
  return (
    <>
      <Suspense fallback={<LoadingSvg/>}>
      <InventoryManagement />
      </Suspense>
    </>
  );
}
