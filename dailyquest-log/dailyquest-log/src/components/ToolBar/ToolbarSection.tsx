"use client";

import {
  ReactNode,
  useRef,
  useState,
  useLayoutEffect,
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
  description?: string;    // opcional
  withDivider?: boolean;   // opcional
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
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  // Actualizar altura real del contenido
  useLayoutEffect(() => {
    if (!bodyRef.current) return;

    if (open) {
      const contentHeight = bodyRef.current.scrollHeight;
      setHeight(contentHeight);

      // después de animar, fijar auto para que crezca dinámicamente
      const timer = setTimeout(() => setHeight(undefined), 200);
      return () => clearTimeout(timer);
    } else {
      setHeight(bodyRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div className={clsx("mb-3", className)}>
      {/* HEADER */}
      <button
        role="button"
        aria-expanded={open}
        aria-controls={`section-body-${title}`}
        onClick={() => collapsible && setOpen(!open)}
        className={clsx(
          "flex items-center justify-between w-full",
          "text-xs font-semibold text-neutral-500 select-none",
          "uppercase tracking-wide transition",
          dense ? "px-1 py-1" : "px-2 py-1",
          "hover:text-neutral-700"
        )}
      >
        <div className="flex flex-col text-left">
          <span>{title}</span>
          {description && (
            <span className="text-[10px] text-neutral-400 normal-case">
              {description}
            </span>
          )}
        </div>

        {collapsible && (
          <span className="transition-transform">
            {open ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </span>
        )}
      </button>

      {/* BODY */}
      <div
        id={`section-body-${title}`}
        ref={bodyRef}
        style={{
          height: height,
          overflow: "hidden",
          transition: "height 200ms ease, opacity 150ms ease",
        }}
        className={clsx(open ? "opacity-100" : "opacity-0")}
      >
        <div className={clsx(dense ? "space-y-1" : "space-y-2", "px-1 pt-2")}>
          {children}
        </div>
      </div>

      {withDivider && <div className="border-t border-neutral-200 mt-3" />}
    </div>
  );
}

export default memo(ToolbarSection);
