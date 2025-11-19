"use client";

import {
  ReactNode,
  useRef,
  useState,
  useLayoutEffect,
  useId,
  memo,
} from "react";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  dense?: boolean;
  description?: string;
  withDivider?: boolean;
  className?: string;
}

function ToolbarSection({
  title,
  children,
  collapsible = true,
  defaultOpen = true,
  dense = false,
  description,
  withDivider = false,
  className,
}: Props) {
  const uniqueId = useId();
  const bodyRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | "auto">(
    defaultOpen ? "auto" : 0
  );

  // animación: recalcular altura cuando cambia "open"
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    if (open) {
      const fullHeight = el.scrollHeight;

      // primero: set real height
      setHeight(fullHeight);

      // después de la animación: set auto
      const timer = setTimeout(() => setHeight("auto"), 180);
      return () => clearTimeout(timer);
    }

    // cerrar
    const current = el.scrollHeight;
    setHeight(current);
    requestAnimationFrame(() => {
      setHeight(0);
    });
  }, [open]);

  return (
    <div className={clsx("mb-4", className)}>
      {/* === HEADER === */}
      <button
        role="button"
        aria-expanded={open}
        aria-controls={`section-body-${uniqueId}`}
        onClick={() => collapsible && setOpen((v) => !v)}
        className={clsx(
          "flex items-center justify-between w-full",
          "text-xs font-semibold text-neutral-500 select-none",
          "uppercase tracking-wide transition-colors",
          dense ? "px-1 py-1" : "px-2 py-1",
          "hover:text-neutral-700"
        )}
      >
        <div className="flex flex-col text-left leading-tight">
          <span>{title}</span>
          {description && (
            <span className="text-[10px] text-neutral-400 normal-case mt-[1px]">
              {description}
            </span>
          )}
        </div>

        {collapsible && (
          <span
            className={clsx(
              "transition-transform duration-200",
              open ? "rotate-0" : "rotate-90"
            )}
          >
            <ChevronDown size={14} />
          </span>
        )}
      </button>

      {/* === BODY === */}
      <div
        id={`section-body-${uniqueId}`}
        ref={bodyRef}
        style={{
          height: height === "auto" ? "auto" : `${height}px`,
          overflow: "hidden",
          transition: "height 180ms ease, opacity 140ms ease",
        }}
        className={clsx(open ? "opacity-100" : "opacity-0")}
      >
        <div
          className={clsx(
            dense ? "space-y-1" : "space-y-2",
            "px-1 pt-2 pb-1"
          )}
        >
          {children}
        </div>
      </div>

      {withDivider && <div className="border-t border-neutral-200 mt-3" />}
    </div>
  );
}

export default memo(ToolbarSection);
