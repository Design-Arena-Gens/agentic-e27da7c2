"use client";

import "./globals.css";
import { ReactNode, useEffect } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const existing = document.getElementById("theme-color");
    if (!existing) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.id = "theme-color";
      meta.content = "#0f172a";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
