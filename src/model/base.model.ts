import * as PIXI from 'pixi.js';

export abstract class BaseModel {
    public sprite: PIXI.Sprite | PIXI.Graphics | void = undefined

    public x: number = 0

    public y: number = 0

    public width: number

    public height: number

    public type: string = 'graph'

    public resource: string = ''

    constructor(options: any) {
        let { width, height, resource } = options;

        this.width = width;
        this.height = height;

        if(resource) {
            this.type = 'sprite';
            this.resource = resource;
        }
    }

    abstract playAction(delta: number): void

    abstract pauseAction(delta: number): void

    abstract onSetup(loader: any, loadedFiles: Partial<Record<string, PIXI.LoaderResource>>, gb: PIXI.Application): void
}   