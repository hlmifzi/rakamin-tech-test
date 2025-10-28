import { SkeletonInput, SkeletonTable } from "@rakamin/ui";

export default function Loading() {
  return (
    <div className="p-6">
      {/* Header dengan skeleton input */}
      <div className="mb-6">
        <SkeletonInput/>
      </div>
      
      {/* Skeleton table dengan many rows */}
      <SkeletonTable
        columns={[
          { width: "210px", isFixed: true },
          { width: "189px" },
          { width: "189px" },
          { width: "189px" },
          { width: "189px" },
          { width: "125px" },
          { width: "249px" },
        ]}
        rows={10}
      />
    </div>
  );
}