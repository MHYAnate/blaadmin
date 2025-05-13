import Support from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function SupportPage() {
  return (
    <>
     <Suspense fallback={<LoadingSvg/>}>
      <Support />
      </Suspense>
    </>
  );
}
