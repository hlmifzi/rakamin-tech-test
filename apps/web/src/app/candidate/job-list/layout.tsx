import type { Metadata } from "next";
import { NavbarCandidate } from "@/components/navbarCandidate";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Rakamin Test",
  description: "Candidate admin test",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const cookieHeader = hdrs.get("cookie") || "";
  const rolePair = cookieHeader
    .split(";")
    .map((s) => s.trim())
    .find((row) => row.startsWith("role="));
  const userRole = rolePair ? rolePair.split("=")[1] : "";

  return (
    <>
        <NavbarCandidate userRole={userRole} />
        <div className="max-w-[1440px] mx-auto px-4 md:px-[104px] py-[40px]">
          {children}
        </div>
    </>
  );
}