import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { localStorage } from '~/utils/chrome-storage'
import settings from './settings'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: localStorage,
  asyncStorage: true,
  restoreState: async (key, storage) => {
    return await storage.getItem(key)
  },
  saveState: async (key, state, storage) => {
    await storage.setItem(key, state)
  }
})

export default new Vuex.Store({
  modules: {
    settings
  },
  plugins: [
    vuexPersist.plugin,
    (store) => {
      store.subscribe(() => {
        chrome.runtime.sendMessage({ id: 'stateChanged' })
      })
    }
  ]
})
