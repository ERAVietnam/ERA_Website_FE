"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors, withOpacity } from "@/lib/theme";

const offices = [
  {
    id: "south",
    region: "MIỀN NAM - TRỤ SỞ CHÍNH",
    name: "Thành Phố Hồ Chí Minh",
    address: "Số 22 - 24, Đường số 5, KĐT Sala, P. An Khánh, TP. Thủ Đức, TP. Hồ Chí Minh",
    phone: "1800 6701",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.10350116574!2d106.7125376253905!3d10.781570777917167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c73e041f1f%3A0xdaa106e0931962aa!2sERA%20Vietnam!5e0!3m2!1svi!2s!4v1776248529080!5m2!1svi!2s",
  },
  {
    id: "central",
    region: "MIỀN TRUNG",
    name: "VP Đà Nẵng",
    address: "Tầng 2, 368 Trần Hưng Đạo, Quận Sơn Trà, TP. Đà Nẵng",
    phone: "(+84) 778 571 720",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15337.011008661819!2d108.22244994122025!3d16.05236865494923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421960ad594601%3A0x3ca7ecbfc778e473!2zRVJBIFZpZXRuYW0gLSBDaGkgbmjDoW5oIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1776248647025!5m2!1svi!2s",
  },
  {
    id: "north",
    region: "MIỀN BẮC",
    name: "VP Hà Nội",
    address: "Tòa nhà Viễn Đông, số 36 Hoàng Cầu, Quận Đống Đa, Hà Nội",
    phone: "(+84) 986 628 222",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3464456601896!2d105.82146467471416!3d21.018819488121032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb4623fb1d3%3A0x10291e8bc5361d64!2sPeakview%20Tower!5e0!3m2!1svi!2s!4v1776248860207!5m2!1svi!2s",
  },
];

export function ContactOfficesSection() {
  const [activeOffice, setActiveOffice] = useState("south");
  const active = offices.find((o) => o.id === activeOffice) || offices[0];

  return (
    <Section padding="sm" bg="white">
      <div data-nosnippet="true">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: colors.primary.navy.DEFAULT }}
          />
          <h2
            style={{
              color: colors.primary.navy.DEFAULT,
              fontWeight: 700,
              fontSize: '30px',
            }}
          >
            Hệ thống văn phòng
          </h2>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full justify-between">
            {offices.map((office) => {
              const isActive = office.id === activeOffice;
              return (
                <Button
                  key={office.id}
                  variant={isActive ? "navy" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap hover:scale-[1.02]"
                  style={isActive ? undefined : { color: colors.gray[500] }}
                  onClick={() => setActiveOffice(office.id)}
                >
                  {office.id === "south" ? "TPHCM" : office.id === "central" ? "Đà Nẵng" : "Hà Nội"}
                </Button>
              );
            })}
          </div>

          {/* Map */}
          <div className="relative h-[280px]">
            <div
              className="relative rounded-xl p-2 h-full"
              style={{
                backgroundColor: colors.neutral.white,
                boxShadow: `0 20px 50px -12px ${withOpacity(colors.neutral.black, 0.15)}`,
              }}
            >
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <iframe
                  key={active.mapSrc}
                  src={active.mapSrc}
                  title={`ERA Vietnam Office - ${active.name}`}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: colors.primary.navy.DEFAULT }}
          >
            <p
              className="tracking-wider mb-1"
              style={{
                color: colors.tertiary.orange.DEFAULT,
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              {active.region}
            </p>
            <h3
              className="mb-3"
              style={{
                color: colors.neutral.white,
                fontWeight: 700,
                fontSize: '20px',
              }}
            >
              {active.name}
            </h3>

            <div className="flex items-start gap-2 mb-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={colors.neutral.white} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p
                style={{
                  color: colors.neutral.white,
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 1.5,
                }}
              >
                {active.address}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={colors.neutral.white} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <p
                style={{
                  color: withOpacity(colors.neutral.white, 0.85),
                  fontSize: '14px',
                }}
              >
                {active.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Left - Office List */}
          <div className="space-y-4">
            {offices.map((office) => {
              const isActive = office.id === activeOffice;
              return (
                <button
                  key={office.id}
                  onClick={() => setActiveOffice(office.id)}
                  className="w-full text-left rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                  style={{
                    backgroundColor: isActive ? colors.primary.navy.DEFAULT : colors.neutral.white,
                    boxShadow: isActive
                      ? `0 10px 30px ${withOpacity(colors.neutral.black, 0.18)}`
                      : `0 4px 14px ${withOpacity(colors.neutral.black, 0.08)}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="tracking-wider mb-1"
                        style={{
                          color: isActive ? colors.tertiary.orange.DEFAULT : colors.secondary.DEFAULT,
                          fontWeight: 600,
                          fontSize: '12px',
                        }}
                      >
                        {office.region}
                      </p>
                      <h3
                        className="mb-3"
                        style={{
                          color: isActive ? colors.neutral.white : colors.gray[600],
                          fontWeight: 700,
                          fontSize: '20px',
                        }}
                      >
                        {office.name}
                      </h3>

                      {/* Divider */}
                      <div
                        className="mb-3"
                        style={{
                          height: '1px',
                          backgroundColor: isActive ? withOpacity(colors.neutral.white, 0.2) : colors.gray[200],
                        }}
                      />

                      <div className="flex items-start gap-2 mb-2">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={isActive ? colors.neutral.white : colors.gray[500]} strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <p
                          style={{
                            color: isActive ? colors.neutral.white : colors.gray[800],
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: 1.5,
                          }}
                        >
                          {office.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={isActive ? colors.neutral.white : colors.gray[500]} strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <p
                          className="text-xs"
                          style={{
                            color: isActive ? withOpacity(colors.neutral.white, 0.85) : colors.gray[500],
                          }}
                        >
                          {office.phone}
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isActive ? withOpacity(colors.neutral.white, 0.1) : colors.gray[50] }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.neutral.white : colors.gray[400]} strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right - Map */}
          <div className="lg:col-span-2 relative h-[400px] lg:h-full">
            <div
              className="relative rounded-xl p-3 h-full"
              style={{
                backgroundColor: colors.neutral.white,
                boxShadow: `0 20px 50px -12px ${withOpacity(colors.neutral.black, 0.15)}`,
              }}
            >
              <div className="absolute inset-3 rounded-lg overflow-hidden">
                <iframe
                  key={active.mapSrc}
                  src={active.mapSrc}
                  title={`ERA Vietnam Office - ${active.name}`}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
