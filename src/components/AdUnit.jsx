import React, { useEffect } from "react";

function AdUnit({ slot, style }) {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV === "production") {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [slot]);

  return (
    <ins
      className="adsbygoogle"
      key={slot}
      style={{
        display: "block",
        textAlign: "center",
        margin: "20px auto",
        ...style,
      }}
      data-ad-client="ca-pub-4794661557884336"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default AdUnit;
