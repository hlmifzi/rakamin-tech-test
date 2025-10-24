"use client";
import React from "react";
import styles from "./EmptyState.module.scss";
import { Typography } from "../Typography/Typography";

export interface EmptyStateProps {
  icon?: React.ReactNode | string;
  title: string;
  description?: string;
  primaryAction?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryAction,
}) => {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return <img className={styles.icon} src={icon} alt="Empty state artwork" />;
    }
    return <div className={styles.icon}>{icon}</div>;
  };

  return (
    <div className={styles.container}>
      {renderIcon()}
      <Typography variant="HeadingSBold" as="h3" className={styles.title}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="TextLRegular" className={styles.description}>
          {description}
        </Typography>
      ) : null}
      {primaryAction ? <div className={styles.cta}>{primaryAction}</div> : null}
    </div>
  );
};

export default EmptyState;