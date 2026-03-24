import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "700", "800"],
});

export const metadata = {
  title: "Spektra | Private Hedera Payments",
  description: "Stealth payments on Hedera",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
