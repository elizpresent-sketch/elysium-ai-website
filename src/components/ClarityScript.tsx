"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Microsoft Clarity — loads on all public pages.
// Excluded from /system-preview (internal operator dashboard).
export default function ClarityScript() {
  const pathname = usePathname();
  if (pathname === "/system-preview") return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","wxwug9vil6");`,
      }}
    />
  );
}
