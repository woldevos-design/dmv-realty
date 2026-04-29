"use client";

import ImageUploader from "./ImageUploader";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
  folder?: string;
}

export default function GalleryUploader({ images, onChange, max = 5, folder = "uploads/vendors" }: Props) {
  function update(index: number, url: string) {
    const next = [...images];
    next[index] = url;
    onChange(next);
  }

  function remove(index: number) {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  }

  function add() {
    if (images.length < max) onChange([...images, ""]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Gallery Photos ({images.length}/{max})
        </label>
        {images.length < max && (
          <button
            type="button"
            onClick={add}
            className="flex items-center gap-1 text-xs text-[#c9a84c] hover:text-[#a88830] font-semibold transition-colors"
          >
            <FaPlus /> Add Photo
          </button>
        )}
      </div>

      {images.length === 0 && (
        <button
          type="button"
          onClick={add}
          className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 text-center text-sm text-gray-400 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
        >
          <FaPlus className="mx-auto mb-2" /> Click to add gallery photos (up to {max})
        </button>
      )}

      <div className="space-y-4">
        {images.map((url, i) => (
          <div key={i} className="relative">
            <div className="absolute top-2 right-2 z-10">
              <button
                type="button"
                onClick={() => remove(i)}
                className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors shadow"
                title="Remove photo"
              >
                <FaTrash size={11} />
              </button>
            </div>
            <ImageUploader
              label={`Photo ${i + 1}`}
              value={url}
              onChange={(v) => update(i, v)}
              folder={folder}
            />
          </div>
        ))}
      </div>

      {images.length > 0 && images.length < max && (
        <button
          type="button"
          onClick={add}
          className="mt-3 flex items-center gap-2 text-xs text-[#c9a84c] hover:text-[#a88830] font-semibold transition-colors"
        >
          <FaPlus /> Add another photo ({images.length}/{max})
        </button>
      )}
    </div>
  );
}
