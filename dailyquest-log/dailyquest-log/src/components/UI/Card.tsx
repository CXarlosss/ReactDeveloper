import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border shadow-sm hover:shadow-md transition bg-white p-4">
      {children}
    </div>
  );
}
