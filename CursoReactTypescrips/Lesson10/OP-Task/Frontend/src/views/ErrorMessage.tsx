export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
   <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-md border border-red-200 shadow-sm">
      {children}
    </div> 

  );
}
