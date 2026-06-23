"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { Upload, ChevronDown } from "lucide-react";

const positions = [
  "Chuyên viên tư vấn bất động sản",
  "Trưởng phòng kinh doanh",
  "Quản lý văn phòng",
  "Marketing",
  "Chăm sóc khách hàng",
  "Nhân viên văn phòng",
];

export function ApplySection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [position, setPosition] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCvFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !position) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Ứng tuyển thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
      setName("");
      setPhone("");
      setEmail("");
      setPortfolio("");
      setPosition("");
      setCvFile(null);
    }, 1200);
  };

  return (
    <Section padding="md" bg="white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Left: Form */}
            <div>
              <h2
                className="mb-1.5"
                style={{
                  color: colors.secondary.DEFAULT,
                  fontWeight: 900,
                  fontSize: "clamp(22px, 2.8vw, 32px)",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                }}
              >
                Ứng tuyển ngay
              </h2>
              <p
                className="mb-6"
                style={{
                  color: colors.gray[500],
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                Để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Ho ten + SDT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: colors.gray[700] }}
                    >
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập họ và tên"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors"
                      style={{ color: colors.gray[800] }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: colors.gray[700] }}
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="090x xxx xxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors"
                      style={{ color: colors.gray[800] }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors"
                    style={{ color: colors.gray[800] }}
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Link portfolio
                  </label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://portfolio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors"
                    style={{ color: colors.gray[800] }}
                  />
                </div>

                {/* Vi tri */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Vị trí mong muốn
                  </label>
                  <div className="relative">
                    <select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                      style={{ color: position ? colors.gray[800] : colors.gray[400] }}
                    >
                      <option value="" disabled>
                        Chọn vị trí ứng tuyển
                      </option>
                      {positions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                    />
                  </div>
                </div>

                {/* Upload CV */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Tải lên CV (định dạng PDF/Doc)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-colors"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {cvFile ? cvFile.name : "Kéo thả hoặc click để chọn tệp"}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full shadow-lg hover:shadow-xl"
                >
                  Ứng tuyển ngay
                </Button>
              </form>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:block h-full">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <Image
                  src="/join/aca_join_section.webp"
                  alt="ERA Team"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
