import * as fs from "fs";
import * as path from "path";
import { MaxRectsPacker } from "maxrects-packer";

import * as Sharp from "../sharp/index";
import { clamp, getTrim, toBuffer } from "./utils";

//指令上都有提示
export function packTextures(
    inDir, //"./psd/common"
    outPath,// "./psd/common/out",
    maxWidth = 4096,
    maxHeight = 4096,
    powerOf2 = true,
    shapePadding = 2,
    borderPadding = 2,
    allowRotation = true,
    trim = true
) {

    //读文件夹
    const files = fs.readdirSync(inDir);

    outPath = outPath || inDir

    const images = [];
    let count = 0, countAll = files.length;
    files.forEach(async (fileName) => {
        //不是png，也不是jpg，只计数，还没发，待测试
        if (path.extname(fileName).indexOf(".png") < 0 && path.extname(fileName).indexOf(".jpg") < 0) {
            if (++count === countAll) tm();
            return;
        }
        const img = await handleImage(fileName)
        if (img) images.push(img)

        if (++count === countAll) tm();
    })

    //开始处理
    function tm() {
        const options = {
            smart: true,
            pot: powerOf2,//是否powerOf2
            square: false,
            allowRotation,
            tag: false,
            border: borderPadding
        };

        const packer = new MaxRectsPacker(maxWidth, maxHeight, shapePadding, options);
        packer.addArray(images);

        packer.bins.forEach((bin, i) => {

            const {width, height} = bin;

            // @ts-ignore
            const buffer = Buffer.alloc(width * height * 4, 0);

            const obj = {}

            const m = [];

            const ps = bin.rects.map((rect: any) => {
                const {
                    name, sharp, rot,
                    trimX, trimY,
                    x, y,
                    height, width,
                    originW, originH
                } = rect;

                sharp.toFormat('png');
                sharp.extract({
                    left: trimX, top: trimY,
                    width, height,
                });

                rot && sharp.rotate(90);

                return sharp.toBuffer().then((input) => {
                    obj[name] = {
                        "x": x,
                        "y": y,
                        "w": width,
                        "h": height,
                        "ox": trimX || 0,
                        "oy": trimY || 0,
                        "sw": originW,
                        "sh": originH,
                        "ro": rot,
                    }

                    m.push({input: input, left: x, top: y,});
                });
            });

            Promise.all(ps)
                .then(() => {
                    const out = outPath + (i ? i : "");

                    // 保存数据
                    // @ts-ignore
                    fs.writeFileSync(out + ".json", JSON.stringify(obj, "", "\t"));

                    Sharp(buffer, {raw: {width, height, channels: 4}})
                    // @ts-ignore
                        .composite(m)
                        .png({compressionLevel: 6,})
                        .toFile(out + ".png");

                    console.log("生成图集：" + path.basename(inDir) + (i || ""));
                });
        });
    }

    /**
     * 处理图片
     * @param {*} imgName
     */
    async function handleImage(imgName) {

        const {width, height, channels, buffer, sharp} = await toBuffer(inDir + "/" + (imgName));

        const data = {
            name: imgName,
            trimX: 0, trimY: 0,
            width, height,
            originW: width,
            originH: height,
            sharp,
        }

        // 不裁切透明像素直接返回
        if (!trim) return data;

        if (4 === channels) {
            const [trimX, trimY, w, h] = getTrim(buffer, width, height, 1);
            data.width = Math.max(w, 1);
            data.height = Math.max(h, 1);
            data.trimX = clamp(trimX, 0, width - data.width);
            data.trimY = clamp(trimY, 0, height - data.height);
        }
        return data;
    }

}
