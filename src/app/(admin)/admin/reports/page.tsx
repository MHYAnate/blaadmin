import Reports from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function CustomersOverviewPage() {
  return (
      <Suspense fallback={<LoadingSvg/>}>
    <section>
      <Reports />
    </section>
    </Suspense>
  );
}
