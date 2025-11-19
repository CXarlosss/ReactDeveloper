// src/components/ImageGallery.tsx

export default function ImageGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Imagen ${i + 1}`}
          className="rounded-lg shadow-sm object-cover w-full h-40"
        />
      ))}
    </div>
  );
}
