# pack_textures


### npm使用
```js
npm install pack_textures
//or
cnpm install pack_textures

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
```js
npm install pack_textures -g
//or
cnpm install pack_textures -g

packTextures -i ./input -o ./output
