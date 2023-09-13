const Os = require('os');
const platform = Os.platform();

if (platform === 'win32') {
	module.exports = require('../build/sharp_win32/build/Release/sharp.node');
} else {
	if (process.arch.includes('x64')) {
		module.exports = require('../build/sharp_x64/build/Release/sharp.node');
	} else {
		module.exports = require('../build/sharp_arm/build/Release/sharp.node');
	}
}
