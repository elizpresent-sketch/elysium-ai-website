"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Google Analytics 4 — loads on all public pages.
// Excluded from /system-preview (internal operator dashboard).
const GA4_ID = "G-N577E1SXBP";

export default function GA4Script() {
  const pathname = usePathname();
  if (pathname === "/system-preview") return null;

  return (
    <>
      <Script
        id="ga4-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
        }}
      />
    </>
  );
}
