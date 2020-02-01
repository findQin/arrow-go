<template>
  <div id="gameboy"> 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as PIXI from 'pixi.js';
import { Container as PixiStage, Text, TextStyle, Graphics, Application} from 'pixi.js'
// import {default as resources} from '../../lib/const/resource.config.js';

const resources: any = []; 

@Component
export default class GameBoy extends Vue {
  protected actionArr: Array<any> = [];

  mounted() {
    this.init(resources);
    this.actionArr = [];
  }

  init(resources: any) {
    let gb: Application = new PIXI.Application({
      width: 375,
      height: 600
    });
    let stage: PixiStage = gb.stage;

    this.initStartMessage(stage);
    this.initLoader(gb, resources);
    this.initGameLoop(gb);
    
    this.$el.appendChild(gb.view);
  }

  /*
  * @desc: 初始化资源
  */
  private initLoader(gameboy: Application, resources: Array <string>, 
    loadProgressHandler: any = (loader: any, resource: string) => {console.log(`loading args ${JSON.stringify(resource)}`)}, 
    setupHanderler: any = (...args: []) => {console.log(`setup args ${JSON.stringify(args)}`)}) {
    
    if(resources && resources.length > 0) {
      gameboy.loader.add(...resources)
        .on('progress', loadProgressHandler)
        .load(setupHanderler);
    }
  }

  /*
  * @desc: 动画循环
  */
  private initGameLoop(gameboy: Application){
    gameboy.ticker.add(delta => {
      // console.log(delta);
    });
  }

  /*
  * @desc: 背景文案
  */
  private initStartMessage(stage: PixiStage) {
    let textStyle: TextStyle = new TextStyle( {
      fontFamily: "Arial",
      fontSize: 36,
      fill: "white",
      stroke: '#ff3300',
      strokeThickness: 4,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    let startMsg: Text = new Text('GAME BOY', textStyle);
    startMsg.position.set(90, 100);
    stage.addChild(startMsg);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
