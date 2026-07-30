import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";

interface CultureRowProps {
  tag: string;
  titleRed: string;
  titleNavy: string;
  bullets: string[];
  mainImage: string;
  overlapImage: string;
  reverse?: boolean;
  overlapClassName?: string;
}

function CultureRow({
  tag,
  titleRed,
  titleNavy,
  bullets,
  mainImage,
  overlapImage,
  reverse = false,
  overlapClassName = "",
}: CultureRowProps) {
  const imageBlock = (
    <div className="relative w-full max-w-[540px] mx-auto lg:mx-0">
      <Image
        src={mainImage}
        alt={tag}
        width={540}
        height={360}
        className="rounded-2xl object-cover w-full h-[260px] md:h-[340px] border-4 border-white shadow-lg"
      />
      <Image
        src={overlapImage}
        alt={`${tag} detail`}
        width={220}
        height={150}
        className={`rounded-xl object-cover absolute w-[45%] md:w-[200px] h-auto shadow-xl border-4 border-white ${
          reverse
            ? "-bottom-5 -left-5 md:-bottom-8 md:-left-8"
            : "-bottom-5 -right-5 md:-bottom-8 md:-right-8"
        } ${overlapClassName}`}
      />
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center">
      <span
        className="inline-block self-start text-white text-sm font-semibold px-6 py-1.5 rounded-md uppercase tracking-wide"
        style={{ backgroundColor: colors.primary.DEFAULT }}
      >
        {tag}
      </span>
      <h3 className="text-2xl md:text-3xl font-bold mt-4 leading-tight">
        <span style={{ color: colors.primary.DEFAULT }}>{titleRed}</span>
        <br />
        <span style={{ color: colors.primary.navy.DEFAULT }}>{titleNavy}</span>
      </h3>
      <ul className="mt-5 space-y-3 text-gray-700 text-[15px] leading-relaxed max-w-sm">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-lg leading-none mt-0.5 shrink-0">•</span>
            <span>
              {b.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j < b.split("\n").length - 1 && <br />}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      <div className={reverse ? "lg:order-2" : "lg:order-1"}>{imageBlock}</div>
      <div className={reverse ? "lg:order-1" : "lg:order-2"}>{textBlock}</div>
    </div>
  );
}

interface MobileRowProps {
  tag: string;
  titleRed: string;
  titleNavy: string;
  bullets: string[];
  image?: string;
}

function MobileRow({ tag, titleRed, titleNavy, bullets, image }: MobileRowProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {image && (
        <Image
          src={image}
          alt={tag}
          width={600}
          height={340}
          className="rounded-2xl object-cover w-full h-auto"
        />
      )}
      <span
        className="inline-block text-white text-sm font-semibold px-6 py-1.5 rounded-md uppercase tracking-wide"
        style={{ backgroundColor: colors.primary.DEFAULT }}
      >
        {tag}
      </span>
      <h3 className="text-xl font-bold leading-tight text-center">
        <span style={{ color: colors.primary.DEFAULT }}>{titleRed}</span>{" "}
        <span style={{ color: colors.primary.navy.DEFAULT }}>{titleNavy}</span>
      </h3>
      <ul className="w-full space-y-3 text-gray-700 text-[15px] leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-lg leading-none mt-0.5 shrink-0">•</span>
            <span>
              {b.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j < b.split("\n").length - 1 && <br />}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JoinCultureSection() {
  return (
    <Section padding="md" bg="white">
      <Container size="lg">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            <span className="text-primary-navy">Văn hoá & Môi trường</span>
            <br className="hidden sm:block" />
            <span className="text-primary-navy"> làm việc </span>
            <span className="text-primary">tại ERA</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Khám phá hệ sinh thái làm việc tiêu chuẩn quốc tế, nơi mỗi cá nhân
            được tôn trọng, gắn kết và tạo mọi điều kiện để bứt phá giới hạn bản
            thân.
          </p>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-col gap-10">
          <Image
            src="/join/join_envi_2.webp"
            alt="ERA Team"
            width={720}
            height={400}
            className="rounded-2xl object-cover w-full h-auto"
          />

          <MobileRow
            tag="Môi trường"
            titleRed="Năng động &"
            titleNavy="Chuyên nghiệp"
            bullets={[
              "Làm việc trong không gian mở tiêu chuẩn quốc tế, khơi nguồn cảm hứng để bạn tự do phát huy tối đa năng lực cá nhân.",
              "Môi trường không khoảng cách giúp mọi ý tưởng đều được lắng nghe.",
            ]}
          />

          <MobileRow
            tag="Văn hoá"
            titleRed="Teamwork &"
            titleNavy="chủ động"
            bullets={[
              'Đề cao tinh thần "One ERA" gắn kết. Không có sự đơn độc, chúng tôi cùng nhau chủ động bứt phá và chinh phục mọi mục tiêu.',
              "Sự thành công của mỗi cá nhân là niềm tự hào của tập thể.",
            ]}
            image="/join/join_op_01.webp"
          />

          <MobileRow
            tag="Cách làm"
            titleRed="Công nghệ"
            titleNavy="hỗ trợ tối ưu"
            bullets={[
              "Làm việc thông minh thay vì làm việc chăm chỉ.",
              "Ứng dụng hệ sinh thái số hóa toàn diện giúp Agent rút ngắn thời gian chốt deal, quản lý giỏ hàng và khách hàng mọi lúc mọi nơi.",
            ]}
            image="/join/join_tech.webp"
          />
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-col gap-28">
          <CultureRow
            tag="Môi trường"
            titleRed="Năng động &"
            titleNavy="Chuyên nghiệp"
            bullets={[
              "Làm việc trong không gian mở tiêu chuẩn quốc tế, khơi nguồn cảm hứng để bạn tự do phát huy tối đa năng lực cá nhân.",
              "Môi trường không khoảng cách giúp mọi ý tưởng đều được lắng nghe.",
            ]}
            mainImage="/join/join_envi_2.webp"
            overlapImage="/join/join_envi.webp"
          />

          <CultureRow
            tag="Văn hoá"
            titleRed="Teamwork &"
            titleNavy="Chủ động"
            bullets={[
              'Đề cao tinh thần "One ERA" gắn kết. Không có sự đơn độc, chúng tôi cùng nhau chủ động bứt phá và chinh phục mọi mục tiêu.',
              "Sự thành công của mỗi cá nhân là niềm tự hào của tập thể.",
            ]}
            mainImage="/join/join_cul_03.webp"
            overlapImage="/join/join_cult_04.webp"
            reverse
          />

          <CultureRow
            tag="Cách làm"
            titleRed="Công nghệ"
            titleNavy="hỗ trợ tối ưu"
            bullets={[
              "Làm việc thông minh thay vì làm việc chăm chỉ.",
              "Ứng dụng hệ sinh thái số hóa toàn diện giúp Agent rút ngắn thời gian chốt deal, quản lý giỏ hàng và khách hàng mọi lúc mọi nơi.",
            ]}
            mainImage="/join/join_tech.webp"
            overlapImage="/join/join_mascot.webp"
          />
        </div>
      </Container>
    </Section>
  );
}
