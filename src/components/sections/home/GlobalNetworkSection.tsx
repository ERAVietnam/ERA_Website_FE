"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";

const stats = [
  { value: 39, suffix: "+", label: "QUỐC GIA", icon: "/network/network_countries_icon.svg" },
  { value: 2394, suffix: "+", label: "VĂN PHÒNG", icon: "/network/network_office_icon.svg" },
  { value: 40000, suffix: "+", label: "AGENTS", icon: "/network/network_agent_icon.svg" },
];

// Hook for counting animation
function useCountUp(end: number, duration: number = 3500, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    const startTime = performance.now();
    const frameRef = { current: 0 };
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, start]);

  return count;
}

function StatCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const count = useCountUp(value, 4000, isVisible);
  const formatNumber = (num: number) => num.toLocaleString('en-US');
  return <span>{formatNumber(count)}{suffix}</span>;
}

export function GlobalNetworkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoId = "T4gQ37irTtg";

  // Intersection Observer for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Separate observer for video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Build video URL based on visibility
  const getVideoUrl = (isMobile: boolean) => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams({
      rel: '0',
      mute: '1',
      autoplay: isInView ? '1' : '0',
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <Section
      ref={sectionRef}
      padding="md" bg="white"
    >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Title - Mobile: 48px centered, Desktop: 72px left */}
            <h2 
              className="leading-none mb-2 text-center lg:text-left"
              style={{
                fontWeight: 900,
              }}
            >
              <span 
                className="text-[48px] lg:text-[72px]"
                style={{ color: colors.primary.navy.DEFAULT }}
              >
                ERA Global
              </span>
              <br />
              <span 
                className="text-[48px] lg:text-[72px]"
                style={{ color: colors.primary.DEFAULT }}
              >
                Network
              </span>
            </h2>
            
            {/* Subtitle - Mobile: 24px centered, Desktop: 30px left */}
            <p 
              className="mb-6 lg:mb-10 text-center lg:text-left"
              style={{ 
                color: colors.gray[500],
                fontWeight: 500,
                fontSize: '24px',
                letterSpacing: '-1.8px',
              }}
            >
              <span className="lg:text-[30px]">Mạng lưới kết nối toàn cầu</span>
            </p>

            {/* Video - Mobile only */}
            <div className="lg:hidden mb-6 relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                key="era-video-mobile"
                src={getVideoUrl(true)}
                title="ERA Global Network Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            {/* Description - Mobile: 18px centered, Desktop: 24px left */}
            <p 
              className="mb-8 text-center lg:text-left"
              data-nosnippet="true"
              style={{ 
                color: colors.primary.navy.DEFAULT,
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: '-0.8px',
              }}
            >
              <span className="text-[18px] lg:text-[24px]">
                Thành lập năm 1971 tại Mỹ, ERA (Electronic Realty Associates) tự hào là một trong những thương hiệu môi giới bất động sản nhượng quyền hàng đầu thế giới, trực thuộc sự điều hành của Compass International Holdings - Công ty môi giới bất động sản nhà ở lớn nhất Hoa Kỳ.
              </span>
            </p>

            {/* Stats - Mobile: grey cards with 2-column grid (icon | text), Desktop: horizontal */}
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-16">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-[40px_1fr] gap-4 items-center rounded-xl p-4 bg-gray-50 lg:!bg-transparent lg:flex lg:flex-col lg:items-start lg:gap-0 lg:p-0"
                >
                  {/* Icon - Mobile: 40px in left column, Desktop: 25px top */}
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] lg:w-[25px] lg:h-[25px] lg:mb-2"
                  />
                  {/* Text - Mobile: right column left aligned, Desktop: normal */}
                  <div className="flex flex-col items-start">
                    {/* Number - Mobile: 48px, Desktop: 30px */}
                    <p 
                      className="text-[48px] lg:text-[30px] leading-[1.1] lg:leading-[1.2]"
                      style={{ 
                        color: colors.primary.navy.DEFAULT,
                        fontWeight: 800,
                      }}
                    >
                      <StatCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                    </p>
                    {/* Label - Mobile: 24px, Desktop: 14px */}
                    <p 
                      className="uppercase tracking-wider text-[24px] lg:text-[14px] lg:mt-1"
                      style={{ 
                        color: colors.primary.navy.DEFAULT,
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - YouTube Video - Desktop only */}
          <div className="hidden lg:block lg:col-span-3 relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              key="era-video-desktop"
              src={getVideoUrl(false)}
              title="ERA Global Network Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </div>
    </Section>
  );
}
