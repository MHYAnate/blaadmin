import Feedbacks from "./components";
import { Suspense } from "react";
import LoadingSvg from "@/components/load";

export default function FeedbackPage() {
  return (
    <>
     <Suspense fallback={<LoadingSvg/>}>
      <Feedbacks />
      </Suspense>
    </>
  );
}
