"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaUpload, FaTimes, FaSpinner } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ value, onChange, folder = "uploads", label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Upload failed"); }
    else { onChange(data.url); }
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
          <div className="relative w-full h-48">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-red-500 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-600 flex items-center gap-1"
            >
              <FaTimes /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#c9a84c] hover:bg-amber-50/30 transition-colors"
        >
          {uploading ? (
            <FaSpinner className="animate-spin text-[#c9a84c] mx-auto text-2xl" />
          ) : (
            <>
              <FaUpload className="mx-auto text-gray-300 text-2xl mb-2" />
              <p className="text-sm text-gray-500">Click or drag & drop to upload</p>
              <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP · max 5 MB</p>
            </>
          )}
        </div>
      )}

      {/* URL input as fallback */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL…"
        className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]"
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
