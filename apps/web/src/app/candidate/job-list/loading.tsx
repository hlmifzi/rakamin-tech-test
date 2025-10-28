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

const Loading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[400px_auto] gap-6">
      <div>
        <CandidateJobListSkeleton />
      </div>
      <div className="relative overflow-hidden flex p-6 h-fit text-white rounded-2xl">
        <div className="absolute inset-0 bg-neutral-30" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="w-full flex flex-col items-start justify-start gap-6 z-10">
          <div className="w-full">
            <Skeleton active title={false} paragraph={{ rows: 1 }} />
            <br />
            <Skeleton active title={false} paragraph={{ rows: 1 }} />
          </div>
          <SkeletonButton size="default" />
        </div>
      </div>
    </div>
  );
};

export default Loading;