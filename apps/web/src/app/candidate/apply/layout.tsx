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
        <div className="max-w-[1440px] bg-neutral-20 min-h-screen py-0 md:py-[50px] mx-auto flex justify-center">
          {children}
        </div>
    </>
  );
}