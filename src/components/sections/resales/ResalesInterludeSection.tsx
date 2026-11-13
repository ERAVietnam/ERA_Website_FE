import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";

export function ResalesInterludeSection() {
  const benefits = [
    ["/resale/myera-benefit-cost.png", "Chi phí 0đ – Kết nối 2700+ Agent"],
    ["/resale/myera-benefit-stock.png", "Quản lý rổ hàng tại ERA Vietnam"],
    ["/resale/myera-benefit-reward.png", "+2 điểm MyERA Rewards khi xác thực"],
  ] as const;

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/resale/faq_background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />
      <Container className="relative z-10 py-12 md:py-16">
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <h2 className="whitespace-nowrap text-xl font-black leading-tight text-white md:text-4xl">
                ĐĂNG TIN NGAY TRÊN myERA
              </h2>

              <div className="mt-7 space-y-4">
                {benefits.map(([icon, text]) => (
                  <div key={text} className="relative ml-9 flex w-[80%] min-h-[58px] items-center rounded-2xl border border-white/60 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.18),rgba(255,255,255,0.08))] px-4 py-1 pl-12 shadow-[0_0_18px_rgba(255,255,255,0.14)] backdrop-blur-sm md:min-h-[68px] md:px-5 md:pl-16">
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-1/2 h-5 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.08)] blur-xl" />
                    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-3px] z-20 h-1 w-[78%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.28)_38%,rgba(195,225,255,0.72)_50%,rgba(255,255,255,0.28)_62%,rgba(255,255,255,0.08)_82%,transparent_100%)] blur-[1px]" />
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-[-3px] left-1/2 z-20 h-1 w-[78%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.28)_38%,rgba(195,225,255,0.72)_50%,rgba(255,255,255,0.28)_62%,rgba(255,255,255,0.08)_82%,transparent_100%)] blur-[1px]" />
                    <Image src={icon} alt="" width={82} height={82} className="absolute left-0 top-1/2 z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain md:h-[76px] md:w-[76px]" />
                    <span className="relative z-10 text-sm font-bold text-white md:text-xl">{text}</span>
                  </div>
                ))}
              </div>

              <a href="https://app.era.com.vn/home" target="_blank" rel="noreferrer" className="group relative mt-8 block w-[min(100%,330px)] overflow-hidden rounded-full shadow-lg">
                <Image src="/resale/button2.png" alt="" width={370} height={80} className="h-auto w-full" />
                <span className="absolute inset-0 flex translate-x-[10px] items-center justify-center px-4 text-center text-base font-black text-white transition-transform duration-300 group-hover:scale-110 md:text-xl">
                  TÌM HIỂU NGAY!
                </span>
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <Image src="/resale/myera-phone.png" alt="Ứng dụng myERA" width={915} height={544} className="h-auto w-full object-contain" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
