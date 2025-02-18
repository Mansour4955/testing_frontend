import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Main from "@/components/custom/Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Event maker",
  description: "This is the best place to create and join events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>{children}</Main>
      </body>
    </html>
  );
}
