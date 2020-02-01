<template>
  <div id="demo">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import demo1 from "@/board/demo1";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  mounted() {
    demo1();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#demo {
  position: fixed;
  top: 0; left: 0; bottom: 0; right: 0;
  z-index: -1;
}
</style>
