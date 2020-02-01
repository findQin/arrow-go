
import * as PIXI from "pixi.js";
const catImg: string = require("@/assets/cat.png");

interface MPos {
  x: number;
  y: number;
}

class CatPos {
  speed: number = 4;
  minPos: MPos = { x: 0, y: 0 };
  maxPos: MPos = { x: 0, y: 0 };
  direction: number = Math.PI / 6; //Math.random() * Math.PI * 2;
  lastCheck: {xInMap: boolean, yInMap: boolean} = { xInMap: true, yInMap: true }
  
  initWithSprite(sprite: PIXI.Sprite): void {
    this.maxPos = {
      x: window.innerWidth - sprite.width,
      y: window.innerHeight - sprite.height,
    };
  }

  checkIfSpriteInMap(spritePos: MPos): boolean {
    const sp: MPos = spritePos;
    const xInMap: boolean = (this.minPos.x <= sp.x) && (sp.x <= this.maxPos.x);
    const yInMap: boolean = (this.minPos.y <= sp.y) && (sp.y <= this.maxPos.y);
    this.lastCheck = { xInMap, yInMap };
    return xInMap && yInMap;
  }

  turnAround(): void {
    if (!this.lastCheck.xInMap) {
      this.direction = Math.PI - this.direction;
    } else {
      this.direction = Math.PI * 2 - this.direction;
    }
  }

  getNextPos(sprite: PIXI.Sprite): MPos{
    const newPos: MPos = {
      x: sprite.x + Math.cos(this.direction) * this.speed,
      y: sprite.y + Math.sin(this.direction) * this.speed,
    }
    return newPos;
  }
}

export default function runDemo(): void {

  let app: PIXI.Application = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    resolution: 1
  });
  let cat: PIXI.Sprite;
  let catPos = new CatPos();

  (document.getElementById("demo") as HTMLElement).appendChild(app.view);
  
  app.loader.add(catImg).load(setup);
  
  
  function setup(loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>): void {
  
    cat = new PIXI.Sprite(app.loader.resources[catImg].texture);
  
    app.stage.addChild(cat);

    catPos.initWithSprite(cat);
    app.ticker.add(catLoop);
  
  }

  function catLoop(): void {
    let nextPos = catPos.getNextPos(cat);
    let isInMap = catPos.checkIfSpriteInMap(nextPos);

    if (isInMap) {
      cat.x = nextPos.x;
      cat.y = nextPos.y;
    } else {
      catPos.turnAround();
    }
  }

}