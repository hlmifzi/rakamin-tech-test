"use client"

import React from "react";
import styles from "./SkeletonTable.module.scss";

export interface SkeletonTableColumn {
  width?: number | string;
  isFixed?: boolean;
}

export interface SkeletonTableProps {
  columns: SkeletonTableColumn[];
  rows?: number;
  className?: string;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  columns,
  rows = 5,
  className,
}) => {
  const firstFixedIdx = columns.findIndex((col) => col.isFixed);

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <div className={styles.scrollX}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={`skeleton-th-${idx}`}
                  className={[
                    styles.th,
                    col.isFixed ? styles.sticky : "",
                    col.isFixed && idx === firstFixedIdx ? styles.stickyShadow : "",
                  ].filter(Boolean).join(" ")}
                  style={{ width: col.width, minWidth: col.width }}
                >
                  {col.isFixed && idx === firstFixedIdx ? (
                    <div className={styles.stickyShadowInner}>
                      <div className={styles.skeletonHeader} />
                    </div>
                  ) : (
                    <div className={styles.skeletonHeader} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={`skeleton-row-${rowIdx}`}>
                {columns.map((col, colIdx) => (
                  <td
                    key={`skeleton-td-${rowIdx}-${colIdx}`}
                    className={[
                      styles.td,
                      col.isFixed ? styles.stickyRow : "",
                      col.isFixed && colIdx === firstFixedIdx ? styles.stickyShadow : "",
                    ].filter(Boolean).join(" ")}
                    style={{ width: col.width, minWidth: col.width }}
                  >
                    {col.isFixed && colIdx === firstFixedIdx ? (
                      <div className={styles.stickyShadowInner}>
                        <div className={styles.skeletonCell} />
                      </div>
                    ) : (
                      <div className={styles.skeletonCell} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;