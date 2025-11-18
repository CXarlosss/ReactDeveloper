export default function ImageBlock({ content }: { content: string }) {
  return (
    <div className="my-4">
      <img
        src={content}
        alt="Imagen del día"
        className="w-full rounded-lg shadow"
      />
    </div>
  );
}
