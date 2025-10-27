import React from "react";
import { Skeleton, SkeletonInput, SkeletonButton } from "@rakamin/ui";

export const JobsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_18.75rem] gap-6 pt-3">
      <div>
        <div className="mb-3">
          <SkeletonInput size="large" />
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="border border-neutral-50 rounded-xl p-4">
              {/* Badge chips skeleton */}
              <Skeleton />

              {/* CTA button skeleton */}
              <div className="flex justify-end mt-3">
                <SkeletonButton size="small" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative col-start-1 md:col-start-2 overflow-hidden flex p-6 h-fit text-white rounded-2xl">
        {/* Hero banner area placeholder (no image) */}
        <div className="absolute inset-0 bg-neutral-30" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="w-full flex flex-col items-start justify-start gap-6 z-10">
          <div className="w-full">
            <Skeleton active title={false} paragraph={{ rows: 1 }} />
            <Skeleton active title={false} paragraph={{ rows: 1 }} />
          </div>
          <SkeletonButton size="default" />
        </div>
      </div>
    </div>
  );
};

export default JobsSkeleton;