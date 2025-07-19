import { Suspense } from "react";
import Spinner from "@/components/atoms/Spinner";
import DetailedViewClient from "@/components/pages/DetailedViewPage";

export default function DetailedViewPage() {
  return (
    <Suspense fallback={<div className="absolute h-3/4 inset-0 z-50 bg-white/70 flex items-center justify-center">
        <Spinner />
      </div>}>
      <DetailedViewClient />
    </Suspense>
  );
}
