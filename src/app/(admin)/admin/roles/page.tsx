"use client"

import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function AdminsPage() {
  return (
    <Suspense fallback={<LoadingSvg/>}>
    <section>
    <LoadingSvg/>
    <> work in progress</>
    </section>
    </Suspense>
  );
  
}
