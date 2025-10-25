import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";

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
        <Navbar />
        <div className="p-6">
          {children}
        </div>
    </>
  );
}