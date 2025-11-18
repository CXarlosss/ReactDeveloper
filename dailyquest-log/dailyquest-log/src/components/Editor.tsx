"use client";

import { useState } from "react";
import Button from "./UI/Button";

export default function Editor() {
  const [text, setText] = useState("");
  const [imgs, setImgs] = useState<string[]>([]);

  const onUpload = (e: any) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f: any) => URL.createObjectURL(f));
    setImgs(urls);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-32 p-3 border rounded-lg"
        placeholder="Escribe algo aquí..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input type="file" accept="image/*" multiple onChange={onUpload} />

      <div className="grid grid-cols-2 gap-2">
        {imgs.map((src, i) => (
          <img key={i} src={src} className="h-24 rounded-lg object-cover" />
        ))}
      </div>

      <Button>Guardar</Button>
    </div>
  );
}
