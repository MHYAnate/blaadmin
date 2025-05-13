import Customers from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function CustomersPage() {
  return (
    <>
      <Suspense fallback={<LoadingSvg/>}>
      <Customers />
      </Suspense>
    </>
  );
}
