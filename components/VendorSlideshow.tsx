"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from "react-icons/fa";

interface Props {
  images: string[];    // all slides (logo + gallery)
  vendorName: string;
}

export default function VendorSlideshow({ images, vendorName }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      <div className="mt-8">
        {/* Main slide */}
        <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-gray-100 shadow-md group">
          <Image
            src={images[current]}
            alt={`${vendorName} — photo ${current + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
          />

          {/* Counter */}
          <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>

          {/* Expand */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <FaExpand size={12} />
          </button>

          {/* Always-visible arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors shadow-md"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors shadow-md"
              >
                <FaChevronRight size={14} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  i === current
                    ? "border-[#c9a84c] shadow-md scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(false)}
          >
            <FaTimes size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            className="relative w-full max-w-4xl h-[75vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${vendorName} — photo ${current + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          >
            <FaChevronRight size={20} />
          </button>

          {/* Lightbox thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#c9a84c] scale-125" : "bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
