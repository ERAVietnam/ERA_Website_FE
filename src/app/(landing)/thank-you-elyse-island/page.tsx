import type { Metadata } from "next";
import ThankYouElyseIslandClient from "./ThankYouElyseIslandClient";

export const metadata: Metadata = {
  title: "Đăng ký thành công | Elyse Island",
  robots: { index: false, follow: false },
};

export default function ThankYouElyseIslandPage() {
  return <ThankYouElyseIslandClient />;
}
