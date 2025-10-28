import React from "react";
import { Skeleton, SkeletonButton } from "@rakamin/ui";

export const CandidateJobListSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="border border-neutral-50 rounded-xl p-4">
          <Skeleton />
        </div>
      ))}
    </div>
  );
};

export const DetailJobListSkeleton: React.FC<{ noBorder?: boolean }> = ({ noBorder = false }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${noBorder ? "" : "border border-neutral-40 p-6"} bg-neutral-10`}>
      <div className="flex items-start gap-4">
        {/* Image/company logo skeleton */}
        <div className="w-24 h-24 rounded-xl bg-neutral-50 animate-pulse" />
        {/* Header text skeletons (job type, title, badge) */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-4 w-24 bg-neutral-50 rounded animate-pulse" />
          <div className="h-6 w-2/3 bg-neutral-50 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-neutral-50 rounded animate-pulse" />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-neutral-50 my-6" />

      {/* Detail content skeleton */}
      <div className="space-y-4">
        <Skeleton active title={false} paragraph={{ rows: 2 }} />
        <Skeleton active title={false} paragraph={{ rows: 2 }} />
      </div>

      {/* Apply button skeleton */}
      <div className="mt-6">
        <SkeletonButton size="default" />
      </div>
    </div>
  );
};

const Loading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[400px_auto] gap-6">
      <div>
        <CandidateJobListSkeleton />
      </div>
      <DetailJobListSkeleton />
    </div>
  );
};

export default Loading;