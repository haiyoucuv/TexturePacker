const sharp = require('../src/sharp/index');
const { toBuffer, clamp, getTrim } = require("../src/utils");
const Sharp = require("../src/sharp/build/sharp_x64");


const test = async () => {
  const filePath = './common/ele8.png';

  const img1 = await toBuffer('./common/ele8.png');
  const img2 = await toBuffer('./common/222.png');


  const buffer = Buffer.alloc(1000 * 1000 * 4, 0);


  await Sharp(buffer, { raw: { width: 1000, height: 1000, channels: 4 } })
    .composite([
      { input: img1.buffer, left: 0, top: 0 },
      { input: img2.buffer, left: 0, top: 0 },
    ])
    .png({
      compressionLevel: 6,
    })
    .toFile("aaaaa.png", (ii) => {
      console.log(ii);
    });
}

test();
