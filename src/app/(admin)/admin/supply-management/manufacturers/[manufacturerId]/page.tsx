import ManufacturerDetails from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function ManufacturerDetailsPage({
  params,
}: {
  params: { manufacturerId: string };
}) {
  return (
    <>
    <Suspense fallback={<LoadingSvg/>}>
      <ManufacturerDetails manufacturerId={params && params?.manufacturerId} />
      </Suspense>
    </>
  );
}
