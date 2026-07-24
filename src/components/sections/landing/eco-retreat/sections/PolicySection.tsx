"use client";

import { c, fonts } from "../theme";

export function PolicySection() {
  return (
    <section
      className="reveal py-[88px] px-5 md:px-6"
      style={{ background: "linear-gradient(180deg,#EDF4E3,#F7FAF2)" }}
    >
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-10 md:mb-11 max-w-[900px] mx-auto">
          <span
            className="inline-block mb-0.5"
            style={{
              color: c.red,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: "clamp(24px,2.5vw,34px)",
              lineHeight: 1.05,
            }}
          >
            Chính sách bán hàng
          </span>
          <h2
            className="font-black leading-[1.06] tracking-tight mt-3.5 mb-3"
            style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
          >
            Chính sách thanh toán
          </h2>
          <p
            className="m-0"
            style={{
              color: c.text,
              fontSize: "clamp(16px,1.5vw,18px)",
            }}
          >
            Hai hướng cho hai kiểu khách - người cần đòn bẩy và người có sẵn vốn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-[22px]" data-stack>
          <div
            className="bg-white border rounded-[18px] p-7 md:p-8"
            style={{ borderColor: "#E6E9E1" }}
          >
            <div
              className="inline-block text-white font-bold text-[13px] px-3.5 py-1.5 rounded-full mb-4"
              style={{ background: c.red }}
            >
              Khách vay ngân hàng
            </div>
            <ul
              className="m-0 pl-[18px] text-[15.5px] leading-[2]"
              style={{ color: "#333" }}
            >
              <li>Thanh toán 10% đến khi nhận nhà</li>
              <li>Hỗ trợ vay tối đa 70%</li>
              <li>Miễn lãi và gốc trong 24 tháng (không muộn hơn 31/12/2028)</li>
            </ul>
          </div>
          <div
            className="bg-white border rounded-[18px] p-7 md:p-8"
            style={{ borderColor: "#E6E9E1" }}
          >
            <div
              className="inline-block text-white font-bold text-[13px] px-3.5 py-1.5 rounded-full mb-4"
              style={{ background: c.green }}
            >
              Khách không vay
            </div>
            <ul
              className="m-0 pl-[18px] text-[15.5px] leading-[2]"
              style={{ color: "#333" }}
            >
              <li>Chiết khấu 12% khi thanh toán sớm 95% trong 15 ngày kể từ ký HĐMB (không muộn hơn 30/11/2026)</li>
              <li>Hoặc lịch thanh toán chuẩn 20 tháng</li>
            </ul>
          </div>
        </div>

        <div
          className="text-center mt-6 text-[15px] bg-white border rounded-[14px] p-4 md:p-5"
          style={{ borderColor: "#E6E9E1", color: "#333" }}
        >
          Ưu đãi thêm: chiết khấu{" "}
          <strong style={{ color: c.orange }}>0,5%</strong> cho khách đã sở hữu bất động sản Ecopark.
        </div>

        <p
          className="text-center mt-4 md:mt-5 text-[12.5px] leading-relaxed m-0"
          style={{ color: "#999" }}
        >
          Giá bán theo từng đợt do chủ đầu tư công bố. Chính sách có thể thay đổi theo từng đợt mở bán - vui lòng liên hệ để nhận thông tin chính thức mới nhất.
        </p>
      </div>
    </section>
  );
}
