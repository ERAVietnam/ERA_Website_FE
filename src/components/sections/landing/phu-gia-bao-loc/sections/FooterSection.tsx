"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FooterSection() {
  return (
    <footer className="relative w-full bg-[#F3ECE0] py-10 sm:py-14">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 px-6 sm:flex-row sm:gap-20 sm:px-10 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Investor */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-[#555555]">Chủ đầu tư</span>
          <Image
            src="/landing/phu-gia-bao-loc/images/eras_logo.png"
            alt="ERAS Dalat"
            width={211}
            height={70}
            className="h-14 w-auto sm:h-16"
          />
        </div>

        {/* Exclusive distributor */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-[#555555]">Đơn vị phân phối độc quyền</span>
          <Image
            src="/landing/phu-gia-bao-loc/images/era_logo.png"
            alt="ERA Real Estate"
            width={69}
            height={84}
            className="h-16 w-auto sm:h-20"
          />
        </div>
      </motion.div>
    </footer>
  );
}
