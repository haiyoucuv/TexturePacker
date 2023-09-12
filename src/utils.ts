import * as Sharp from "../sharp/index";

export const clamp = (value, min, max) => {
    return value < min ? min : value > max ? max : value
}

export const getPixel = (imgData, col, row, width) => {
    const index = 4 * col + row * width * 4;
    return {
        r: imgData[index],
        g: imgData[index + 1],
        b: imgData[index + 2],
        a: imgData[index + 3]
    }
};

export const getTrim = (buffer, width, height, trimThreshold) => {
    let col, row, d = width, m = height, f = 0, c = 0;

    for (row = 0; row < height; row++) {
        for (col = 0; col < width; col++) {
            if (getPixel(buffer, col, row, width).a >= trimThreshold) {
                m = row;
                row = height;
                break;
            }
        }
    }
    for (row = height - 1; row >= m; row--) {
        for (col = 0; col < width; col++) {
            if (getPixel(buffer, col, row, width).a >= trimThreshold) {
                c = row - m + 1;
                row = 0;
                break;
            }
        }
    }
    for (col = 0; col < width; col++) {
        for (row = m; row < m + c; row++) {
            if (getPixel(buffer, col, row, width).a >= trimThreshold) {
                d = col;
                col = width;
                break
            }
        }
    }
    for (col = width - 1; col >= d; col--) {
        for (row = m; row < m + c; row++) {
            if (getPixel(buffer, col, row, width).a >= trimThreshold) {
                f = col - d + 1;
                col = 0;
                break
            }
        }
    }
    return [d, m, f, c]
};

export const toBuffer = (file) => {
    return new Promise<any>((resolve, reject) => {
        const sharp = Sharp(file)
            // @ts-ignore
            .raw()
            .toBuffer((err, buffer, info) => {
                resolve({
                    ...info,
                    buffer, sharp,
                });
            });
    });
}
