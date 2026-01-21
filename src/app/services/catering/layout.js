"use client";

import { CateringProvider } from "../../../context/CateringContext";

export default function CateringLayout({ children }) {
  return (
    <CateringProvider>
      {children}
    </CateringProvider>
  );
}
