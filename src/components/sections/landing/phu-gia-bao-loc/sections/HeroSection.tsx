"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex aspect-[390/500] w-full flex-col items-center overflow-hidden text-center sm:aspect-auto sm:min-h-[110dvh]"
    >
      {/* Desktop background */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 hidden bg-cover bg-top bg-no-repeat sm:block"
        style={{
          backgroundImage: "url('/landing/phu-gia-bao-loc/images/hero_bg.png')",
        }}
      />
      {/* Mobile background */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 block bg-cover bg-top bg-no-repeat sm:hidden"
        style={{
          backgroundImage: "url('/landing/phu-gia-bao-loc/images/hero_bg_mobile.png')",
        }}
      />

      {/* Top logos */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center gap-6 px-6 py-5 pt-8 sm:gap-10 sm:px-10 lg:gap-14 lg:px-16"
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }}>
          <Image
            src="/landing/phu-gia-bao-loc/images/eras_logo.png"
            alt="ERAS Dalat"
            width={140}
            height={56}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }}>
          <Image
            src="/landing/phu-gia-bao-loc/images/pgbl_green.png"
            alt="Phú Gia Bảo Lộc"
            width={90}
            height={90}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }}>
          <Image
            src="/landing/phu-gia-bao-loc/images/era_logo.png"
            alt="ERA Vietnam"
            width={110}
            height={44}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-10 sm:px-10 sm:pt-14 lg:px-16 lg:pt-20"
      >
        {/* Desktop title */}
        <Image
          src="/landing/phu-gia-bao-loc/images/pgbl_hero_title.png"
          alt="Phú Gia Bảo Lộc"
          width={966}
          height={120}
          priority
          className="hidden h-auto w-full max-w-[90%] sm:block sm:max-w-[700px] lg:max-w-[900px]"
        />
        {/* Mobile title */}
        <Image
          src="/landing/phu-gia-bao-loc/images/pgbl_hero_title_mobile.png"
          alt="Phú Gia Bảo Lộc"
          width={257}
          height={123}
          priority
          className="block h-auto w-full max-w-[240px] sm:hidden"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-6 text-xl font-normal sm:mt-4 sm:text-3xl lg:text-4xl"
          style={{
            color: theme.primaryBright,
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            textShadow: "0 1px 4px rgba(255,255,255,0.7)",
          }}
        >
          Gated Community
          <br className="sm:hidden" /> phong cách Mỹ
        </motion.p>
      </motion.div>
    </section>
  );
}
