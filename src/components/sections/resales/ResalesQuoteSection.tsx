import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { Reveal } from "./Reveal";

const QUOTE =
  "“Thành công trong nghề môi giới không đến từ việc bạn đi nhanh đến đâu, mà đến từ việc bạn chọn đi cùng ai. Hãy để ERA Vietnam là điểm tựa vững chắc trên hành trình sự nghiệp của bạn.”";

/* Band quote cuối trang — nền navy riêng, không chung background với section CTA */
export function ResalesQuoteSection() {
  return (
    <section style={{ backgroundColor: rc.navy }}>
      <Container className="py-14 md:py-16">
        <Reveal>
        <blockquote
          className="mx-auto max-w-4xl text-center"
          style={{ color: colors.neutral.white, fontSize: "clamp(13px, 1.4vw, 17px)", lineHeight: 1.7, fontWeight: 400 }}
        >
          {QUOTE}
        </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
