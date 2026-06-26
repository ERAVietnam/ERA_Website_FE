import { MgidSensor } from "@/components/analytics/MgidSensor";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MgidSensor />
      {children}
    </>
  );
}
