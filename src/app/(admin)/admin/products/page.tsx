import Products from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function ProductsPage() {
  return (
      <Suspense fallback={<LoadingSvg/>}>
    <section>
      <Products />
    </section>
    </Suspense>
  );
}
