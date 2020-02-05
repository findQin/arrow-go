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
    let clientWidth: number = document.body.clientWidth;
    let clientHeight: number = document.body.clientHeight;

    let gameboy: GameBoy = new GameBoy(clientWidth / 3 * 2, clientWidth / 9 * 4);

    gameboy.init();
    this.$el.appendChild(gameboy.view);
    gameboy.play();
  }
}
</script>


<style scoped lang="scss">
</style>
