import Vue from 'vue'
import Vuetify from 'vuetify'
import OptionsPage from './components/OptionsPage'
import store from './store'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  components: { OptionsPage },
  template: '<OptionsPage />'
})
