"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "soft";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: Props) {
  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary:
      "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-400",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    soft:
      "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "rounded-lg font-medium transition-all select-none inline-flex items-center justify-center gap-2",
        "active:scale-[0.97]",
        disabled && "opacity-50 cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}
