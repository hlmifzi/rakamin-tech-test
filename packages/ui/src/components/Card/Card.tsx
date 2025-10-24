"use client";
import React from "react";
import styles from "./Card.module.scss";

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ className, children, onClick }) => {
  const classes = [styles.card, className || ""].filter(Boolean).join(" ");
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;