
import * as PIXI from "pixi.js";
import Proton from "proton-engine/build/proton.js";


let proton: any;
let pixiRender: any;
let pixiStage: any;

class GameBoard {

  public app: PIXI.Application;

  constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: 0xffffff,
    });
  }

  setup() {
    (window as any).PIXI = PIXI;
    (document.getElementById("demo") as HTMLElement).appendChild(this.app.view);
  }
}

export default function runDemo2(): void {
  
  const gameBd = new GameBoard();
  const proton = new Proton();
  const emitter = new Proton.Emitter();

  // debugger;
  // Setup Board
  gameBd.setup();
  const canvas = gameBd.app.view; //debugger

  //set Rate
  emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);
  
  //add Initialize
  emitter.addInitialize(new Proton.Radius(1, 12));
  emitter.addInitialize(new Proton.Life(2, 4));
  emitter.addInitialize(new Proton.Velocity(3, Proton.getSpan(0, 360), 'polar'));
  
  //add Behaviour
  emitter.addBehaviour(new Proton.Color('ff0000', 'random'));
  emitter.addBehaviour(new Proton.Alpha(1, 0));
  
  //set emitter position
  emitter.p.x = canvas.width / 2;
  emitter.p.y = canvas.height / 2;
  emitter.emit(5);
  
  //add emitter to the proton
  proton.addEmitter(emitter);
    
  // add canvas renderer
  const renderer = new Proton.PixiRenderer(gameBd.app.stage);
  proton.addRenderer(renderer);

  gameBd.app.start();
  gameBd.app.ticker.add(() => {
    proton.update();
    proton.stats.update(2, document.getElementById("demo"));
  });

  // (window as any).proton = proton;
}