// TODO 继续抽象成基层类 纹理类型
import { default as Keybroad } from '../lib/keybroad';
import * as PIXI from 'pixi.js';
import { BaseModel } from './base.model'

export class Arrow extends BaseModel{
    playAction(delta: number) {
        if(this.sprite) {
            // 旋转
            this.sprite.rotation += Keybroad.right * 0.05 - Keybroad.left * 0.05;
            let sinRota = - Math.sin(this.sprite.rotation);
            let conRota = - Math.cos(this.sprite.rotation);

            let a = Keybroad.top ? 5 : 0;
            let b = Keybroad.bottom ? 5 : 0;

            this.sprite.x += b * conRota - a * conRota;
            this.sprite.y += b * sinRota - a * sinRota;           
        }
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

        arrow.width = arrow.width / 3;
        arrow.height = arrow.height / 3;

        arrow.pivot.set(50 / sqrt3, 50);
        
        this.sprite = arrow;

        // this.sprite.rotation += 0.5 * Math.PI;
            
        gb.stage.addChild(arrow);
    }
}

