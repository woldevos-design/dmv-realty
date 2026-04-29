"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  images: string[];
  name: string;
}

export default function VendorCardSlideshow({ images, name }: Props) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return <div className="h-36 w-full bg-gradient-to-br from-navy-900 to-navy-700" />;
  }

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  }

  return (
    <div className="relative h-36 w-full bg-gray-100 overflow-hidden">
      <Image
        src={images[current]}
        alt={`${name} photo ${current + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
      />

      {/* Always-visible arrows — only when multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 transition-colors z-10 shadow"
            aria-label="Previous image"
          >
            <FaChevronLeft size={11} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 transition-colors z-10 shadow"
            aria-label="Next image"
          >
            <FaChevronRight size={11} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
              />
            ))}
          </div>

          {/* Image count badge */}
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-full z-10">
            {current + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}
