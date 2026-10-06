const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 1000 } });
  const imgFails = [];
  page.on("requestfailed", (r) => imgFails.push(r.url() + " :: " + (r.failure()?.errorText || "")));
  page.on("response", (r) => { if (r.status() >= 400) imgFails.push(r.url() + " :: HTTP " + r.status()); });
  await page.goto("http://localhost:1234/du-an/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  const cardInfo = await page.evaluate(() => {
    const card = document.querySelector('a[href="/du-an-phu-gia-bao-loc"]');
    if (!card) return { found: false };
    const img = card.querySelector("img");
    return {
      found: true,
      imgSrc: img?.src || null,
      imgComplete: img?.complete,
      imgNatural: img?.naturalWidth,
      rect: card.getBoundingClientRect().toJSON(),
    };
  });
  console.log("CARD:", JSON.stringify(cardInfo, null, 1));
  console.log("FAILED:", JSON.stringify(imgFails, null, 1));
  await page.screenshot({ path: "tmp/duan2.png" });
  await browser.close();
})();
