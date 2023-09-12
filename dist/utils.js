"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBuffer = exports.getTrim = exports.getPixel = exports.clamp = void 0;
var Sharp = require('../sharp/index');
var clamp = function (value, min, max) {
    return value < min ? min : value > max ? max : value;
};
exports.clamp = clamp;
var getPixel = function (imgData, col, row, width) {
    var index = 4 * col + row * width * 4;
    return {
        r: imgData[index],
        g: imgData[index + 1],
        b: imgData[index + 2],
        a: imgData[index + 3]
    };
};
exports.getPixel = getPixel;
var getTrim = function (buffer, width, height, trimThreshold) {
    var col, row, d = width, m = height, f = 0, c = 0;
    for (row = 0; row < height; row++) {
        for (col = 0; col < width; col++) {
            if ((0, exports.getPixel)(buffer, col, row, width).a >= trimThreshold) {
                m = row;
                row = height;
                break;
            }
        }
    }
    for (row = height - 1; row >= m; row--) {
        for (col = 0; col < width; col++) {
            if ((0, exports.getPixel)(buffer, col, row, width).a >= trimThreshold) {
                c = row - m + 1;
                row = 0;
                break;
            }
        }
    }
    for (col = 0; col < width; col++) {
        for (row = m; row < m + c; row++) {
            if ((0, exports.getPixel)(buffer, col, row, width).a >= trimThreshold) {
                d = col;
                col = width;
                break;
            }
        }
    }
    for (col = width - 1; col >= d; col--) {
        for (row = m; row < m + c; row++) {
            if ((0, exports.getPixel)(buffer, col, row, width).a >= trimThreshold) {
                f = col - d + 1;
                col = 0;
                break;
            }
        }
    }
    return [d, m, f, c];
};
exports.getTrim = getTrim;
var toBuffer = function (file) {
    return new Promise(function (resolve, reject) {
        var sharp = Sharp(file)
            .raw()
            .toBuffer(function (err, buffer, info) {
            resolve(__assign(__assign({}, info), { buffer: buffer, sharp: sharp }));
        });
    });
};
exports.toBuffer = toBuffer;
