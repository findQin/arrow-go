// TODO 继续抽象成基层类 纹理类型
import { default as Keybroad } from '../lib/keybroad';
import * as PIXI from 'pixi.js';

export class Mario {
    public sprite : any

    public x: number

    public y: number

    public width: number

    public height: number

    public resource: string

    constructor(position: any) {

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.resource = require("../assets/sprite/PixelArt.png");
    }

    playAction(delta: number) {
        this.sprite && (this.sprite.x += Keybroad.right * 3 - Keybroad.left * 3);
        this.sprite && (this.sprite.y += Keybroad.bottom * 3 - Keybroad.top * 3);
    }

    onResouceLoad() {

    }

    onSetup(loader: any, loadedFiles: Partial<Record<string, PIXI.LoaderResource>>, gb: PIXI.Application) {
        let marioResource: any = loadedFiles[this.resource];
        let marioTexture: PIXI.Texture = marioResource.texture;

        // 初始帧
        marioTexture.frame = new PIXI.Rectangle(300, 50, 200, 200);;

        this.sprite = new PIXI.Sprite(marioTexture);

        this.sprite.x = this.x;
        this.sprite.y = this.y;

        this.sprite.width = 40;
        this.sprite.height = 40;

        gb.stage.addChild(this.sprite);
    }
}

