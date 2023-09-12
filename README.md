# pack_textures


### npm使用
```shell
npm install pack_textures
//or
cnpm install pack_textures
```

```js
const { packTextures } = require('pack_textures');

packTextures(
    inDir, 
    outPath,
    maxWidth,
    maxHeight,
    powerOf2,
    shapePadding,
    borderPadding,
    allowRotation,
    trim
)
```

### 命令行全局使用
```shell
npm install pack_textures -g
//or
cnpm install pack_textures -g

packTextures -i ./input -o ./output
```

### 输出数据

```js

// 输出数据
const outJson = {
	"ele8.png": {
		"x": 366,   // 在图集中的x坐标
		"y": 134,   // 在图集中的y坐标
		"w": 80,    // 在图集中的宽度
		"h": 78,    // 在图集中的高度
		"ox": 0,    // left裁切值
		"oy": 1,    // top裁切值
		"sw": 152,  // 原始宽度
		"sh": 131,  // 原始高度
		"ro": false // 是否旋转(向右旋转90度)
	},
	"waitingRot.png": {
		"x": 366,
		"y": 214,
		"w": 56,
		"h": 56,
		"ox": 0,
		"oy": 0,
		"sw": 56,
		"sh": 56,
		"ro": false
	},
    /* ... */
}
```
