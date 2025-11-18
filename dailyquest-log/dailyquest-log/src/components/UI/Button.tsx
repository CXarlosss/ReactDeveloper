interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-[0.97] transition"
    >
      {children}
    </button>
  );
}
