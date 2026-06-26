"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "@/lib/theme";

interface CompassMergeAnimationProps {
  cycle: number;
}

export function CompassMergeAnimation({ cycle }: CompassMergeAnimationProps) {
  const [step, setStep] = useState(0);
  const [moveX, setMoveX] = useState(136);

  useEffect(() => {
    const update = () => setMoveX(window.innerWidth >= 768 ? 200 : 136);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setStep(0));
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep(1), 300));     // blobs + logos enter
    timers.push(setTimeout(() => setStep(2), 1000));    // cross pop
    timers.push(setTimeout(() => setStep(3), 2000));    // cross shrink
    timers.push(setTimeout(() => setStep(4), 2500));    // blobs move in
    timers.push(setTimeout(() => setStep(5), 3900));    // flash when blobs half-merged
    timers.push(setTimeout(() => setStep(6), 4100));    // logos fade
    timers.push(setTimeout(() => setStep(7), 4200));    // center blob reveal + left/right hide
    timers.push(setTimeout(() => setStep(8), 4550));    // glow fade
    timers.push(setTimeout(() => setStep(9), 4600));    // emerge — scale up (1s after merge)
    timers.push(setTimeout(() => setStep(10), 7000));   // rings fade out
    timers.push(setTimeout(() => setStep(11), 7500));   // neon appear
    timers.push(setTimeout(() => setStep(12), 13000));  // neon fade out
    timers.push(setTimeout(() => setStep(13), 17000));  // blob + logo fade out
    timers.push(setTimeout(() => setStep(14), 18000));  // reset
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const circleSizeClass = "w-28 h-28 md:w-44 md:h-44";
  const bigCircleSizeClass = "w-40 h-40 md:w-60 md:h-60";
  const isGooey = step >= 4 && step < 7;

  return (
    <div className="relative w-96 h-52 md:w-[36rem] md:h-52">
      {/* SVG Gooey filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
            <feDropShadow in="goo" dx="0" dy="15" stdDeviation="20" floodColor="#0f172a" floodOpacity="0.15" />
          </filter>
        </defs>
      </svg>

      {/* Flash effect — camera-like burst */}
      <AnimatePresence>
        {step >= 5 && step < 8 && (
          <motion.div
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 4], opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, times: [0, 0.15, 1], ease: "easeOut" }}
          >
            <div
              className="w-40 h-40 md:w-56 md:h-56 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.7) 45%, rgba(29,78,216,0.95) 70%, transparent 100%)",
                boxShadow: "0 0 60px 30px rgba(59,130,246,0.4), 0 0 120px 60px rgba(37,99,235,0.7)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cross */}
      {step >= 2 && step < 4 && (
        <motion.div
          className="absolute left-1/2 top-1/2 z-30"
          style={{ x: "-50%", y: "-50%" }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: step >= 3 ? 0 : 1, opacity: step >= 3 ? 0 : 1, rotate: step >= 3 ? 720 : 360 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <svg
            viewBox="0 0 80 80"
            className="w-14 h-14 md:w-18 md:h-18"
            fill="none"
          >
            <line x1="16" y1="16" x2="64" y2="64" stroke={colors.primary.DEFAULT} strokeWidth="10" strokeLinecap="round" />
            <line x1="64" y1="16" x2="16" y2="64" stroke={colors.primary.DEFAULT} strokeWidth="10" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Halo — rotating off-axis lights (BEHIND merged circle) */}
      {step >= 11 && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 14 ? 0 : step >= 11 ? 0.8 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Orb 1 wrapper — rotates around center */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5.3, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute w-20 h-20 md:w-[9rem] md:h-[9rem] rounded-full bg-[#2563eb] -mt-[40px] md:-mt-[60px]"
              style={{ filter: "blur(16px)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.9 }}
            />
          </motion.div>
          {/* Orb 2 wrapper */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6.7, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute w-20 h-20 md:w-[9rem] md:h-[9rem] rounded-full bg-[#3b82f6] -mt-[40px] md:-mt-[60px]"
              style={{ filter: "blur(12px)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.85 }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Radiating rings — behind merged circle, vivid & slow */}
      {step >= 9 && step < 11 && (
        <>
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-2 border-[#3b82f6] pointer-events-none"
            style={{ boxShadow: "0 0 24px 6px rgba(59,130,246,0.3)" }}
            initial={{ scale: 0.8, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-2 border-[#60a5fa] pointer-events-none"
            style={{ boxShadow: "0 0 24px 6px rgba(96,165,250,0.25)" }}
            initial={{ scale: 0.8, opacity: 0.85 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.25 }}
          />
        </>
      )}

      {/* Gooey container — blobs only */}
      <div className="absolute inset-0 z-0" style={{ filter: isGooey ? "url(#goo)" : "none" }}>
        {/* Blob left */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 ${circleSizeClass} rounded-full bg-white ${!isGooey ? "shadow-2xl" : ""}`}
          style={{ left: 0 }}
          initial={{ scale: 0, opacity: 0, x: -moveX }}
          animate={{
            scale: step >= 13 ? 0 : step >= 1 ? 1 : 0,
            opacity: step >= 13 ? 0 : step >= 1 ? 1 : 0,
            x: step >= 4 ? moveX : 0,
          }}
          transition={{ x: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.5 }, scale: { duration: 2, ease: "easeOut" } }}
        />
        {/* Blob right */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 ${circleSizeClass} rounded-full bg-white ${!isGooey ? "shadow-2xl" : ""}`}
          style={{ right: 0 }}
          initial={{ scale: 0, opacity: 0, x: moveX }}
          animate={{
            scale: step >= 13 ? 0 : step >= 1 ? 1 : 0,
            opacity: step >= 13 ? 0 : step >= 1 ? 1 : 0,
            x: step >= 4 ? -moveX : 0,
          }}
          transition={{ x: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.5 }, scale: { duration: 2, ease: "easeOut" } }}
        />
        {/* Blob center (merged) */}
        <motion.div
          className={`absolute left-1/2 top-1/2 ${bigCircleSizeClass} rounded-full bg-white`}
          style={{ x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: step >= 14 ? 0 : step >= 7 ? 1 : 0,
            scale: step >= 14 ? 0.8 : step >= 9 ? 1 : step >= 7 ? 0.6 : 0,
          }}
          transition={{ opacity: { duration: 0.8, ease: "easeInOut" }, scale: { type: "spring", stiffness: 200, damping: 15 } }}
        />
      </div>

      {/* Logo Anywhere */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 z-20 ${circleSizeClass} flex items-center justify-center p-4 md:p-6`}
        style={{ left: 0 }}
        initial={{ scale: 0, opacity: 0, x: -moveX }}
        animate={{
          scale: step >= 13 ? 0 : step >= 1 ? 1 : 0,
          opacity: step >= 13 ? 0 : step >= 1 ? 1 : 0,
          x: step >= 4 ? moveX : 0,
        }}
        transition={{ x: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.5 }, scale: { duration: 2, ease: "easeOut" } }}
      >
        <motion.div className="w-full h-full" animate={{ opacity: step >= 6 ? 0 : 1 }} transition={{ duration: 0.3 }}>
          <Image src="/about/about_anywhere_hero.webp" alt="Anywhere" width={140} height={140} className="object-contain w-full h-full" priority />
        </motion.div>
      </motion.div>

      {/* Logo Compass */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 z-20 ${circleSizeClass} flex items-center justify-center p-4 md:p-6`}
        style={{ right: 0 }}
        initial={{ scale: 0, opacity: 0, x: moveX }}
        animate={{
          scale: step >= 13 ? 0 : step >= 1 ? 1 : 0,
          opacity: step >= 13 ? 0 : step >= 1 ? 1 : 0,
          x: step >= 4 ? -moveX : 0,
        }}
        transition={{ x: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.5 }, scale: { duration: 2, ease: "easeOut" } }}
      >
        <motion.div className="w-full h-full" animate={{ opacity: step >= 6 ? 0 : 1 }} transition={{ duration: 0.3 }}>
          <Image src="/about/about_compass_hero.webp" alt="Compass" width={140} height={140} className="object-contain w-full h-full" priority />
        </motion.div>
      </motion.div>

      {/* Final logo (merged) */}
      <motion.div
        className={`absolute left-1/2 top-1/2 z-20 ${bigCircleSizeClass} flex items-center justify-center p-4 md:p-6`}
        style={{ x: "-50%", y: "-50%" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: step >= 14 ? 0 : step >= 9 ? 1 : 0,
          scale: step >= 14 ? 0.8 : step >= 9 ? 1 : 0.6,
        }}
        transition={{ opacity: { duration: 0.4 }, scale: { type: "spring", stiffness: 200, damping: 15 } }}
      >
        <Image src="/about/about_compass_inter.webp" alt="Compass International" width={180} height={180} className="object-contain w-full h-full" priority />
      </motion.div>
    </div>
  );
}
