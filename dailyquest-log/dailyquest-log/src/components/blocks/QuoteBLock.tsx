export default function QuoteBlock({ content }: { content: string }) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
      {content}
    </blockquote>
  );
}
