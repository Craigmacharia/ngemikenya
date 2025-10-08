import React, { useEffect } from "react";

function AdUnit({ slot, style }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
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
    ></ins>
  );
}

export default AdUnit;
