if (process.arch.includes('x64')) {
	module.exports = require('../build/sharp_x64/build/Release/sharp.node');
} else {
	module.exports = require('../build/sharp_arm/build/Release/sharp.node');
}
