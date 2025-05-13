import FinancialReport from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function FinancialReportPage() {
  return (
    <>
     <Suspense fallback={<LoadingSvg/>}>
      <FinancialReport />
      </Suspense>
    </>
  );
}
