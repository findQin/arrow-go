const config = require('../config/menu.config.json');

export default {
  state: {
    isShow: true,
    config: config,
  },

  mutations: {
    showMenu(state: any) {
      state.isShow = true;
    },

    hideMenu(state: any) {
      state.isShow = false;
    }
  }
}