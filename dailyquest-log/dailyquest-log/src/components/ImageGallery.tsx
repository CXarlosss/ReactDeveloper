export default function ImageGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0)
    return <p className="text-gray-400">No hay imágenes.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className="w-full h-32 object-cover rounded-xl shadow-sm"
        />
      ))}
    </div>
  );
}
