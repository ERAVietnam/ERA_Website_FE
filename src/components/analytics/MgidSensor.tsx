"use client";

import Script from "next/script";

export function MgidSensor() {
  return (
    <Script
      id="mgid-sensor"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function() {
          var d = document, w = window;
          w.MgSensorData = w.MgSensorData || [];
          w.MgSensorData.push({
            cid: 943258,
            project: "a.mgid.com"
          });
          var l = "a.mgid.com";
          var n = d.getElementsByTagName("script")[0];
          var s = d.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          var dt = !Date.now ? new Date().valueOf() : Date.now();
          s.src = "https://" + l + "/mgsensor.js?d=" + dt;
          n.parentNode.insertBefore(s, n);
        })();`,
      }}
    />
  );
}
