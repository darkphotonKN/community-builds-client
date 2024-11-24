import type { Metadata } from "next";
import { Cabin, Laila, Lora, Dosis } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Nav from "@/components/Nav";
import MainTitle from "@/components/MainTitle";
import Modal from "@/components/Modal";

// Current Best: Cabin, Decent: Laila
const fontFamily = Cabin({
  weight: ["400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        {/* Core Application Wrapper  */}
        <div id="app" className="flex">
          {/* TODO: Global Modal */}
          {/* <Modal /> */}

          {/* Side Area  */}
          <div className="w-[282px] min-h-screen h-full py-8 px-4 border-r border-customGray bg-white">
            <MainTitle title="Community Builds" />
            <Nav />
          </div>

          {/* Content Area */}
          <div className="w-[100%] bg-customBgGray">
            <Header />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}