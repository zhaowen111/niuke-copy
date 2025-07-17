import { h, render } from "vue"
import Message from "./MessageComp.jsx"

export default {
  install: (app) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const globalProperties = app.config.globalProperties;
    globalProperties.$showMessage = (msg, time) => {

      render(null, div);
      const instance = h(Message, {
        text: msg, time, onClose() {
          render(null, div)
        }
      })
      render(instance, div);
    }
    globalProperties.$message = globalProperties.$showMessage
  }
}