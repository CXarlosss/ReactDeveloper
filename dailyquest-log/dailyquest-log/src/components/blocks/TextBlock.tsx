export default function TextBlock({ content }: { content: string }) {
  return (
    <p className="text-lg leading-relaxed mb-4">
      {content}
    </p>
  );
}
