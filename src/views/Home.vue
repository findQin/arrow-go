<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Menu />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Menu from "@/components/Menu.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Menu
  }
};
</script>
