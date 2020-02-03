<template>
  <div id="gameboy"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as PIXI from "pixi.js";
import { default as GameBoy } from '../board/GameBoy';


@Component
export default class Board extends Vue {
  protected actionArr: Array<any> = [];

  mounted() {
    let gameboy: GameBoy = new GameBoy(375, 600);
    gameboy.init();
    this.$el.appendChild(gameboy.view);
    gameboy.play();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
