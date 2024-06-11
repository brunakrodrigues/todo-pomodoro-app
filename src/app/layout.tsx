import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Auth0App from "./auth0app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo",
  description: "ToDo list and pomodoro app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth0App>{children}</Auth0App>
      </body>
    </html>
  );
}
