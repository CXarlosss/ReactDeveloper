"use client";

import clsx from "clsx";
import { JSX, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;

  variant?: "default" | "soft" | "outline" | "ghost" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  as?: keyof JSX.IntrinsicElements; // div, section, article, etc.

  header?: ReactNode;
  footer?: ReactNode;
}

export default function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = true,
  as: Tag = "div",
  header,
  footer,
}: CardProps) {
  const variantClasses = {
    default: "bg-white border border-neutral-200 shadow-sm",
    soft: "bg-neutral-50 border border-neutral-200",
    outline: "bg-white border border-neutral-300",
    ghost: "bg-transparent border border-transparent",
    elevated: "bg-white shadow-lg border border-transparent",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <Tag
      className={clsx(
        "rounded-xl transition-all",
        variantClasses[variant],
        paddingClasses[padding],
        hover && "hover:shadow-md",
        className
      )}
    >
      {header && (
        <div className="mb-3 pb-2 border-b border-neutral-200 font-semibold text-neutral-800">
          {header}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-3 pt-2 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </Tag>
  );
}
