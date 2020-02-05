// TODO 继续抽象成基层类 纹理类型
import { default as Keybroad } from '../lib/keybroad';
import * as PIXI from 'pixi.js';

export class Arrow {
    public sprite : any

    public x: number

    public y: number

    public width: number

    public height: number

    public resource: string | void

    public forward: number = 0

    constructor(position: any) {

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.resource = require("../assets/sprite/PixelArt.png");

        this.initPosition(position);
    }

    initPosition(position: any) {
        this.x = position.x;
        this.y = position.y;
    }

    playAction(delta: number) {
        if(this.sprite) {
            // 旋转
            this.sprite.rotation += Keybroad.right * 0.02 - Keybroad.left * 0.02;
            let sinRota = Math.sin(-this.sprite.rotation);
            let conRota = Math.cos(-this.sprite.rotation);

            let a = Keybroad.top ? 1 : 0;
            let b = Keybroad.bottom ? 1 : 0;

            // 算错了
            this.sprite.x += b * sinRota - a * sinRota;
            this.sprite.y += b * conRota - a * conRota;

            console.log(this.sprite.x, this.sprite.y, sinRota);
        }


        // this.sprite && (this.sprite.y += Keybroad.bottom * 3 - Keybroad.top * 3);
        // let forward = 
    }
    
    pauseAction(delta: number) {
        // dont change
    }

    onSetup(loader: any, loadedFiles: Partial<Record<string, PIXI.LoaderResource>>, gb: PIXI.Application) {
        let sqrt3 = Math.sqrt(3);
        let arrow1Coordinate = [
            0, 0,
            50 * sqrt3, 50,
            0, 100,
            0, 80,
            30 * sqrt3, 50,
            0, 20
        ]
        
        let arrow = new PIXI.Graphics();
        // tri area
        arrow.beginFill(0x76a3d5);
        arrow.moveTo(0, 0);
        for(let i = 2, j = 3; j < arrow1Coordinate.length; i += 2, j+=2) {
            arrow.lineTo(arrow1Coordinate[i], arrow1Coordinate[j])
        }
        arrow.endFill();

        arrow.beginFill(0xfefce0);
        arrow.drawCircle(sqrt3 * 10, 50, sqrt3 * 10);
        arrow.endFill();
        arrow.x = 180;
        arrow.y = 180;

        arrow.pivot.set(50 / sqrt3, 50);
        
        this.sprite = arrow;

        // this.sprite.rotation += 0.5 * Math.PI;
            
        gb.stage.addChild(arrow);
    }
}

