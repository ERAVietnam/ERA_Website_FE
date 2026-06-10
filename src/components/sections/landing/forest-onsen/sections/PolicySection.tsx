"use client";

import { c } from "../theme";

export function PolicySection() {
  const policies = [
    {
      label: "Khách vay ngân hàng",
      big: "25",
      unit: "%",
      sub: "Thanh toán đến khi nhận nhà",
      list: [
        { v: "70%", t: "ngân hàng hỗ trợ" },
        { v: "24 tháng", t: "miễn lãi & gốc" },
      ],
    },
    {
      label: "Khách không vay",
      big: "12",
      unit: "%",
      sub: "Chiết khấu thanh toán sớm 95%",
      list: [
        { v: "2%", t: "theo lịch chuẩn" },
        { v: "", t: "Trong 15 ngày ký HĐMB" },
      ],
    },
    {
      label: "Ưu đãi đặc biệt",
      big: "0,5",
      unit: "%",
      sub: "Khách đã sở hữu BĐS Ecopark",
      list: [
        { v: "200 triệu", t: "Cọc thiện chí" },
        { v: "", t: "Lộ trình thanh toán giãn" },
      ],
    },
  ];
  return (
    <section id="chinh-sach" className="py-16 md:py-28 bg-white">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="reveal text-center max-w-[620px] mx-auto mb-12">
          <div className="text-xs font-medium tracking-[2.5px] uppercase" style={{ color: c.greenSoft }}>
            Phương án tài chính
          </div>
          <div className="w-[46px] h-px mx-auto mt-5 mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,44px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Linh hoạt cho người chủ động dòng tiền.
          </h2>
          <p className="mt-3 text-base" style={{ color: c.inkSoft }}>
            Đồng hành đến khi nhận nhà, dự kiến Quý 3/2028.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {policies.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl p-7 md:p-8 border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:bg-[#eef3ee]"
              style={{ background: c.mist2, borderColor: c.line }}
            >
              <div className="text-[11.5px] uppercase tracking-[1.5px] font-semibold mb-4" style={{ color: c.greenSoft }}>
                {p.label}
              </div>
              <div className="font-semibold leading-none" style={{ fontSize: 50, fontFamily: "'Cormorant Garamond', Georgia, serif", color: c.green }}>
                {p.big}
                <small className="text-lg">{p.unit}</small>
              </div>
              <div className="text-sm mt-1" style={{ color: c.inkSoft }}>
                {p.sub}
              </div>
              <ul className="mt-4 pt-3 border-t" style={{ borderColor: c.line }}>
                {p.list.map((li) => (
                  <li key={li.t} className="text-sm py-1.5 flex gap-2" style={{ color: c.inkSoft }}>
                    <b className="font-semibold" style={{ color: c.greenDeep }}>{li.v}</b>
                    {li.t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="reveal text-center text-xs mt-9 max-w-[740px] mx-auto leading-relaxed" style={{ color: c.inkSoft }}>
          Chính sách chi tiết tư vấn riêng theo từng dòng sản phẩm. Hình ảnh và thông
          tin mang tính minh họa; chính sách, giá bán và tiện ích áp dụng theo quy định
          của chủ đầu tư tại từng thời điểm. Phí dịch vụ Onsen tính riêng theo gói sử
          dụng.
        </p>
      </div>
    </section>
  );
}

