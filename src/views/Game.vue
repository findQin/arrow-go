<template>
  <div class="game">
    <GameBoy />
  </div>
</template>

<script>
// @ is an alias to /src
import GameBoy from "@/components/GameBoy.vue";

export default {
  name: "game",
  components: {
    GameBoy
  }
};
</script>
