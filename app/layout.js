import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Josh meeting scheduler",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
