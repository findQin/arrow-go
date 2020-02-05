import * as PIXI from "pixi.js";
import { Text, TextStyle} from "pixi.js";
import { modelList } from '../config/model.config'


export default class GameBoy {
    private ModelMap: Map<string, any> = new Map()

    private gameboy: PIXI.Application

    public width: number

    public height: number

    public state: string

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.gameboy = new PIXI.Application({ width, height });
        this.state = 'initial';
    }

    init() {
        // 初始化显示文字
        this.initStartMessage();
        // 初始化资源
        this.initLoader();
        // 初始化动画执行器
        this.initGameLoop();
    }

    play() {
        this.state = 'play';
    }

    pause() {
        this.state = 'pause';
    }

    restart() {

    }

    end() {

    }

    get view() {
        return this.gameboy.view
    }

    private initStartMessage() {

        let textStyle: TextStyle = new TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "white",
            stroke: "#ff3300",
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        });

        let startMsg: Text = new Text("GAME BOY", textStyle);

        startMsg.position.set(this.width / 2 - 45, this.height / 2 + 16);

        this.gameboy.stage.addChild(startMsg);
    }


    private initLoader() {
        let resources: Array<string> = [];
        let onSetupAction: Array<any> = [];
        

        modelList.forEach(model => {
            let ins = model.instance;
            let name = model.name;

            ins.resource && resources.push(ins.resource);
            onSetupAction.push(ins.onSetup.bind(ins));

            this.ModelMap.set(name, ins);
        });

        this.gameboy.loader
            .add(...resources)
            .load((loader, loadedResources) => {
                onSetupAction.forEach(action => {
                    action(loader, loadedResources, this.gameboy);
                })
        })
    }

    private initGameLoop() {
        this.gameboy.ticker.add(delta => {
            this.stateAction(delta);
        });
    }

    private stateAction(delta: number) {
        switch (this.state) {
            case 'play':
                // 游戏执行
                this.playAction(delta);
                break;
            case 'pause':
                // 游戏执行
                this.pauseAction(delta);
                break
            default:
                break;
        }
    }

    private playAction(delta: number) {
        this.ModelMap.forEach((model) => {
            model.playAction(delta);
        });
    }

    private pauseAction(delta: number) {
        this.ModelMap.forEach((model) => {
            model.pauseAction(delta);
        });
    }
}   