"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Lightbox from "yet-another-react-lightbox";
import type { ImageCarouselItem } from "./image-carousel-layout";
import "yet-another-react-lightbox/styles.css";

interface ImageCarouselProps {
  items: ImageCarouselItem[];
}

function CarouselCaption({ caption }: { caption?: string }) {
  if (!caption) return null;
  return (
    <div className="bg-gray-100 p-2 text-center text-lg italic text-gray-600 shadow-md">
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlide, setLightboxSlide] = useState<{ src: string; alt: string }>({
    src: "",
    alt: "",
  });

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

  const openLightbox = useCallback((item: ImageCarouselItem) => {
    setLightboxSlide({ src: item.src, alt: item.alt || "" });
    setLightboxOpen(true);
  }, []);

  const handleSlideClick = useCallback(
    (index: number, item: ImageCarouselItem, isSelected: boolean) => {
      if (isSelected) {
        openLightbox(item);
      } else {
        emblaApi?.scrollTo(index);
      }
    },
    [emblaApi, openLightbox]
  );

  if (items.length === 0) return null;

  if (items.length < 3) {
    return (
      <>
        <div className="era-image-carousel-public my-4 flex flex-wrap gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-[200px] flex-1 cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.src}
                alt={item.alt || ""}
                className="aspect-[4/3] w-full object-cover object-right-top shadow-md"
                style={{ cursor: "zoom-in" }}
              />
              <CarouselCaption caption={item.caption} />
            </div>
          ))}
        </div>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[{ src: lightboxSlide.src, alt: lightboxSlide.alt }]}
          controller={{ closeOnBackdropClick: true, disableSwipeNavigation: true }}
          carousel={{ finite: true, preload: 0 }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className="era-image-carousel-public relative w-full select-none py-3">
        <div className="overflow-hidden pb-1.5" ref={emblaRef}>
          <div className="flex">
            {items.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`min-w-0 flex-[0_0_40%] px-2 ${
                    isSelected ? "cursor-zoom-in" : "cursor-pointer"
                  }`}
                  onClick={() => handleSlideClick(index, item, isSelected)}
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
                      draggable="false"
                    />
                    <CarouselCaption caption={item.caption} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: lightboxSlide.src, alt: lightboxSlide.alt }]}
        controller={{ closeOnBackdropClick: true, disableSwipeNavigation: true }}
        carousel={{ finite: true, preload: 0 }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}
