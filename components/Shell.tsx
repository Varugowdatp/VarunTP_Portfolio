"use client";
import { useState, type ReactNode } from "react";
import { Aurora, CursorGlow, Dock, Palette, ScrollProgress, SmoothScroll } from "./Chrome";

export default function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="noise relative">
      <SmoothScroll />
      <ScrollProgress />
      <Aurora />
      <CursorGlow />
      {children}
      <Dock onPalette={() => setOpen(true)} />
      <Palette open={open} setOpen={setOpen} />
    </div>
  );
}
