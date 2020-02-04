<template>
  <van-overlay class="menu" :show="isShow">
    <div class="mask" @click="isShow = false"></div>
    <div class="title">{{config.title}}</div>
    <van-button class="button" @click="onMenuOptionClick" :data-index="index" v-for="(item, index) in config.buttons" :key="item.text" type="default">{{item.text}}</van-button>
  </van-overlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { Overlay, Button } from "vant";
import "vant/lib/overlay/style"
import "vant/lib/button/style"

Vue.use(Overlay);
Vue.use(Button)

@Component
export default class Menu extends Vue {
  // @Prop() private showMenu!: boolean;

  data() {
    return {
      menuConfig: null,
    }
  }

  mounted() {

  }

  get isShow() {
    return this.$store.state.menu.isShow;
  }
  set isShow(showMenu) {
    this.$store.commit(showMenu ? 'showMenu' : 'hideMenu');
  }

  get config() {
    return this.$data.menuConfig || this.$store.state.menu.config;
  }

    onMenuOptionClick(e: MouseEvent) {
    if (e.currentTarget) {
      const { dataset } = e.currentTarget as any;
      const index: number = Number(dataset.index);
      const clickAction = this.config.buttons[index].click;
      if (typeof clickAction === 'string') {
        if (clickAction === "close") {
          this.isShow = false;
        } else {
          console.log("Action: " + clickAction);
        }
      } else {
        this.$data.menuConfig = clickAction;
      }
    }
  }
    

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mask {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  color: #fff;
  font-size: 60px;
}
.button {
  margin-top: 2rem;
  width: 60%;
  max-width: 300px;
}
</style>
