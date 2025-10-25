import type { Metadata } from "next";
import { NavbarCandidate } from "@/components/navbarCandidate";

export const metadata: Metadata = {
  title: "Rakamin Test",
  description: "Candidate admin test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <NavbarCandidate />
        <div className="max-w-[1440px] mx-auto px-4 md:px-[104px] py-[40px]">
          {children}
        </div>
    </>
  );
}