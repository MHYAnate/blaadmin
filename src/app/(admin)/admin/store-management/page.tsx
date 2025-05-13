import StoreManagement from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function StoreManagementPage() {
  return (
    <>
       <Suspense fallback={<LoadingSvg/>}>
      <StoreManagement />
      </Suspense>
    </>
  );
}
