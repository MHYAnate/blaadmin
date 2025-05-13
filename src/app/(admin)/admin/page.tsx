import Dashboard from "./components/dashboard";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";
export default function AdminHomePage() {
  return (
    <>
    	<Suspense fallback={<LoadingSvg/>}>
      <Dashboard />
      </Suspense>
    </>
  );
}
