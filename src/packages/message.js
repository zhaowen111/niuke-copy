import { h, onUnmounted, render } from "vue"
import Message from "./Message.vue"

export default {
  install: (app) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    app.config.globalProperties.$showMessage = (msg, time) => {
      const instance = h(Message, {
        text: msg, time, onClose() {
          render(null, div)
        }
      })
      render(instance, div);

    }
  }
}