const puppeteer = require("puppeteer");
const uuid = require("uuid").v4;

const INSTRAGRAM_STORY = { width: 1080, height: 1920 };

const NUMBER_OF_POST = [...Array(10).keys()]; //Crear un array con 20 elementos

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport(INSTRAGRAM_STORY);
  await page.setCacheEnabled(false); //Desabilitar cache
  await page.goto("http://localhost:1234/");

  console.log("Generando imágenes");

  for (const _ of NUMBER_OF_POST) {
    await page.reload({ waitUntil: "networkidle0" }); //Refrezcar la página y esperar a que la página se cargue
    await page.screenshot({
      path: `./images/${uuid()}.jpeg`,
      fullPage: true,
      type: "jpeg",
      quality: 100,
    });
  }

  await browser.close();
})();
