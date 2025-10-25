"use client"

import React, { useMemo, useState } from "react";
import styles from "./Table.module.scss";
import { Typography } from "../Typography/Typography";
import { Checkbox } from "../Checkbox/Checkbox";

export interface Column<T> {
  key: keyof T | string;
  title: string;
  isFixed?: boolean;
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId?: (row: T) => string;
  selectionKey?: keyof T | string; // column that shows checkbox on header & rows
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  getRowId = (row: T) => String(row.id ?? row.key ?? JSON.stringify(row)),
  selectionKey,
}: TableProps<T>) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = selected.size > 0 && selected.size === data.length;

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(new Set(data.map((row) => getRowId(row))));
    } else {
      setSelected(new Set());
    }
  };

  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id); else next.delete(id);
      return next;
    });
  };

  const headers = useMemo(() => columns, [columns]);
  const firstFixedIdx = useMemo(() => headers.findIndex((h) => h.isFixed), [headers]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollX}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {headers.map((col, idx) => (
                <th
                  key={`th-${idx}-${String(col.key)}`}
                  className={[
                    styles.th,
                    col.isFixed ? styles.sticky : "",
                    col.isFixed && idx === firstFixedIdx ? styles.stickyShadow : "",
                  ].filter(Boolean).join(" ")}
                  style={{ width: col.width, minWidth: col.width }}
                >
                  {col.isFixed && idx === firstFixedIdx ? (
                    <div className={styles.stickyShadowInner}>
                      {selectionKey === col.key ? (
                        <div className={styles.columnCheckbox}>
                          <Checkbox checked={allSelected} onChange={toggleAll} />
                          <Typography variant="TextSBold" className={styles.thText}>
                            {col.title}
                          </Typography>
                        </div>
                      ) : (
                        <Typography variant="TextSBold" className={styles.thText}>
                          {col.title}
                        </Typography>
                      )}
                    </div>
                  ) : (
                    selectionKey === col.key ? (
                      <div className={styles.columnCheckbox}>
                        <Checkbox checked={allSelected} onChange={toggleAll} />
                        <Typography variant="TextSBold" className={styles.thText}>
                          {col.title}
                        </Typography>
                      </div>
                    ) : (
                      <Typography variant="TextSBold" className={styles.thText}>
                        {col.title}
                      </Typography>
                    )
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const id = getRowId(row);
              return (
                <tr key={id}>
                  {headers.map((col, idx) => (
                    <td
                      key={`td-${idx}-${id}`}
                      className={[
                        styles.td,
                        col.isFixed ? styles.stickyRow : "",
                        col.isFixed && idx === firstFixedIdx ? styles.stickyShadow : "",
                      ].filter(Boolean).join(" ")}
                      style={{ width: col.width, minWidth: col.width }}
                    >
                      {col.isFixed && idx === firstFixedIdx ? (
                        <div className={styles.stickyShadowInner}>
                          {selectionKey === col.key ? (
                            <div className={styles.columnCheckbox}>
                              <Checkbox
                                checked={selected.has(id)}
                                onChange={(checked) => toggleOne(id, checked)}
                              />
                              <Typography variant="TextMRegular" className={styles.tdText}>
                                {String(row[col.key as keyof T])}
                              </Typography>
                            </div>
                          ) : col.render ? (
                            col.render(row)
                          ) : (
                            <Typography variant="TextMRegular" className={styles.tdText}>
                              {String(row[col.key as keyof T])}
                            </Typography>
                          )}
                        </div>
                      ) : (
                        selectionKey === col.key ? (
                          <div className="flex items-center">
                            <Checkbox
                              checked={selected.has(id)}
                              onChange={(checked) => toggleOne(id, checked)}
                            />
                            <Typography variant="TextMRegular" className={styles.tdText}>
                              {String(row[col.key as keyof T])}
                            </Typography>
                          </div>
                        ) : col.render ? (
                          col.render(row)
                        ) : (
                          <Typography variant="TextMRegular" className={styles.tdText}>
                            {String(row[col.key as keyof T])}
                          </Typography>
                        )
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;