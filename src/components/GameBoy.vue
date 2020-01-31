<template>
  <div id="gameboy">
      
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as PIXI from 'pixi.js';
import { Container as PixiStage, Text, TextStyle} from 'pixi.js'

@Component
export default class GameBoy extends Vue {
  mounted() {
    this.init();
  }

  init() {
    let gb: any = new PIXI.Application({
      width: 375,
      height: 337
    });
    let stage: PixiStage = gb.stage;

    this.startMessageInit(stage);
    
    this.$el.appendChild(gb.view);
  }

  private startMessageInit(stage: PixiStage) {
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
