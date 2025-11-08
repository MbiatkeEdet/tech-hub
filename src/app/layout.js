import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Lemtech Hub Nigeria | Shaping The Future With Cutting-Edge IT Solutions",
  description: "IT and software service company  based in port harcourt, Nigeria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
