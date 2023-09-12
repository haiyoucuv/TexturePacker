#!/usr/bin/env node
const argv = require('yargs')
	.option('i', {
		alias: 'inDir',
		demand: true,
		demandOption: true,
		describe: '输入路径',
		type: 'string'
	})
	.option('o', {
		alias: 'outPath',
		demand: false,
		demandOption: false,
		describe: '输出路径',
		type: 'string',
	})
	.option('mw', {
		alias: 'maxWidth',
		demand: false,
		demandOption: false,
		describe: '最大宽度',
		type: 'number',
		default: 4096,
	})
	.option('mh', {
		alias: 'maxHeight',
		demand: false,
		demandOption: false,
		describe: '最大高度',
		type: 'number',
		default: 4096,
	})
	.option('p', {
		alias: 'powerOf2',
		demand: false,
		demandOption: false,
		describe: '长宽是否2的指数',
		type: 'boolean',
		default: true,
	})
	.option('sp', {
		alias: 'shapePadding',
		demand: false,
		demandOption: false,
		describe: '图片间距',
		type: 'number',
		default: 2,
	})
	.option('bp', {
		alias: 'borderPadding',
		demand: false,
		demandOption: false,
		describe: '边间距',
		type: 'number',
		default: 2,
	})
	.option('r', {
		alias: 'allowRotation',
		demand: false,
		demandOption: false,
		describe: '是否允许旋转图片',
		type: 'boolean',
		default: true,
	})
	.option('t', {
		alias: 'trim',
		demand: false,
		demandOption: false,
		describe: '是否允许裁剪透明像素',
		type: 'boolean',
		default: true,
	})
	.usage('Usage: packTextures [options]')
	.example('packTextures -i ./input -o ./output')
	.help('h')
	.alias('h', 'help')
	.argv;

const packTextures = require('./dist/src/index');

packTextures(
    argv.i,
    argv.o,
    argv.mw,
    argv.mh,
    argv.p,
    argv.sp,
    argv.bp,
    argv.r,
    argv.t
)
