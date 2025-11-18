export default function TitleBlock({ content }: { content: string }) {
  return (
    <h2 className="text-3xl font-bold mb-4">
      {content}
    </h2>
  );
}
