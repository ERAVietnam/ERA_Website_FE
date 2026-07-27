"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { ImageCarouselItem } from "./image-carousel-layout";

interface ImageCarouselProps {
  items: ImageCarouselItem[];
}

function CarouselCaption({ caption }: { caption?: string }) {
  if (!caption) return null;
  return (
    <div className="bg-[#f3f4f6] p-2 text-center text-lg italic text-[#4b5563] shadow-md">
      {caption}
    </div>
  );
}

export function ImageCarousel({ items }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      containScroll: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (items.length === 0) return null;

  if (items.length < 3) {
    return (
      <div className="era-image-carousel-public my-4 flex flex-wrap gap-4">
        {items.map((item) => (
          <div key={item.id} className="min-w-[200px] flex-1">
            <img
              src={item.src}
              alt={item.alt || ""}
              className="aspect-[4/3] w-full object-cover object-right-top shadow-md"
            />
            <CarouselCaption caption={item.caption} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="era-image-carousel-public relative w-full select-none py-3">
      <div className="overflow-hidden pb-1.5" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_40%] cursor-pointer px-2"
                onClick={() => emblaApi?.scrollTo(index)}
              >
                <div
                  className={`transition-all duration-500 ${
                    isSelected
                      ? "scale-100 opacity-100"
                      : "scale-[0.85] opacity-50"
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt || ""}
                    className="aspect-[4/3] w-full object-cover object-right-top shadow-md"
                  />
                  <CarouselCaption caption={item.caption} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
