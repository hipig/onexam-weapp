import Vue from 'vue'
import store from './store'
import './assets/css/font.css'
import './app.css'

const App = {
  store,
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
