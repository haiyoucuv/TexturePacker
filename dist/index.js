"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packTextures = void 0;
var fs = require("fs");
var path = require("path");
var maxrects_packer_1 = require("maxrects-packer");
var Sharp = require("../sharp/index");
var utils_1 = require("./utils");
function packTextures(inDir, outPath, maxWidth, maxHeight, powerOf2, shapePadding, borderPadding, allowRotation, trim) {
    var _this = this;
    if (maxWidth === void 0) { maxWidth = 4096; }
    if (maxHeight === void 0) { maxHeight = 4096; }
    if (powerOf2 === void 0) { powerOf2 = true; }
    if (shapePadding === void 0) { shapePadding = 2; }
    if (borderPadding === void 0) { borderPadding = 2; }
    if (allowRotation === void 0) { allowRotation = true; }
    if (trim === void 0) { trim = true; }
    var files = fs.readdirSync(inDir);
    outPath = outPath || inDir;
    var images = [];
    var count = 0, countAll = files.length;
    files.forEach(function (fileName) { return __awaiter(_this, void 0, void 0, function () {
        var img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (path.extname(fileName).indexOf(".png") < 0 && path.extname(fileName).indexOf(".jpg") < 0) {
                        if (++count === countAll)
                            tm();
                        return [2];
                    }
                    return [4, handleImage(fileName)];
                case 1:
                    img = _a.sent();
                    if (img)
                        images.push(img);
                    if (++count === countAll)
                        tm();
                    return [2];
            }
        });
    }); });
    function tm() {
        var options = {
            smart: true,
            pot: powerOf2,
            square: false,
            allowRotation: allowRotation,
            tag: false,
            border: borderPadding
        };
        var packer = new maxrects_packer_1.MaxRectsPacker(maxWidth, maxHeight, shapePadding, options);
        packer.addArray(images);
        packer.bins.forEach(function (bin, i) {
            var width = bin.width, height = bin.height;
            var buffer = Buffer.alloc(width * height * 4, 0);
            var obj = {};
            var m = [];
            var ps = bin.rects.map(function (rect) {
                var name = rect.name, sharp = rect.sharp, rot = rect.rot, trimX = rect.trimX, trimY = rect.trimY, x = rect.x, y = rect.y, height = rect.height, width = rect.width, originW = rect.originW, originH = rect.originH;
                sharp.toFormat('png');
                sharp.extract({
                    left: trimX, top: trimY,
                    width: width,
                    height: height,
                });
                rot && sharp.rotate(90);
                return sharp.toBuffer().then(function (input) {
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
                    };
                    m.push({ input: input, left: x, top: y, });
                });
            });
            Promise.all(ps)
                .then(function () {
                var out = outPath + (i ? i : "");
                fs.writeFileSync(out + ".json", JSON.stringify(obj, function () { return ""; }, "\t"));
                Sharp(buffer, { raw: { width: width, height: height, channels: 4 } })
                    .composite(m)
                    .png({ compressionLevel: 6, })
                    .toFile(out + ".png");
                console.log("生成图集：" + path.basename(inDir) + (i || ""));
            });
        });
    }
    function handleImage(imgName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, width, height, channels, buffer, sharp, data, _b, trimX, trimY, w, h;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, (0, utils_1.toBuffer)(inDir + "/" + (imgName))];
                    case 1:
                        _a = _c.sent(), width = _a.width, height = _a.height, channels = _a.channels, buffer = _a.buffer, sharp = _a.sharp;
                        data = {
                            name: imgName,
                            trimX: 0, trimY: 0,
                            width: width,
                            height: height,
                            originW: width,
                            originH: height,
                            sharp: sharp,
                        };
                        if (!trim)
                            return [2, data];
                        if (4 === channels) {
                            _b = (0, utils_1.getTrim)(buffer, width, height, 1), trimX = _b[0], trimY = _b[1], w = _b[2], h = _b[3];
                            data.width = Math.max(w, 1);
                            data.height = Math.max(h, 1);
                            data.trimX = (0, utils_1.clamp)(trimX, 0, width - data.width);
                            data.trimY = (0, utils_1.clamp)(trimY, 0, height - data.height);
                        }
                        return [2, data];
                }
            });
        });
    }
}
exports.packTextures = packTextures;
