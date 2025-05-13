import Orders from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function OrdersPage() {
  return (
    <Suspense fallback={<LoadingSvg/>}>
    <section>
      <Orders />
    </section>
    </Suspense>
  );
}
