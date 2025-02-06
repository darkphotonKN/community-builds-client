import type { Metadata } from 'next';
import {
  Cabin,
  Laila,
  Lora,
  Dosis,
  Quicksand,
  Bitter,
  Nunito_Sans,
  Lancelot,
} from 'next/font/google';
import './globals.css';
import Header from '@/components/Layout/Header';
import Nav from '@/components/Nav';

// Current Best: Cabin, Decent: Laila
const fontFamily = Lancelot({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <div id="app" className="bg-customBg text-customTxtContent p-5">
          {/* TODO: Global Modal */}
          {/* <Modal /> */}

          {/* Nav Area  */}
          <Nav />

          {/* Content Area */}
          <div className="w-[100%] h-screen pt-4">
            <Header />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
