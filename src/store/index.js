import browser from 'webextension-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: browser.storage.local,
  asyncStorage: true,
  restoreState: async (key, storage) => {
    const result = await storage.get(key)
    return {
      ...result[key],
      restore: true
    }
  },
  saveState: async (key, state, storage) => {
    await storage.set({ [key]: state })
  }
})

const defaultState = {
  searchEngines: []
}

export default new Vuex.Store({
  state: {
    ...defaultState
  },
  mutations: {
    addSearchEngine(state, { searchEngine }) {
      const id =
        Math.max.apply(null, [
          0,
          ...state.searchEngines.map((item) => item.id)
        ]) + 1

      state.searchEngines = [
        ...state.searchEngines,
        {
          id: id + 1,
          ...searchEngine
        }
      ]
    },
    removeSearchEngine(state, { id }) {
      state.searchEngines = state.searchEngines.filter((item) => item.id !== id)
    },
    setSearchEngine(state, { id, searchEngine }) {
      state.searchEngines = state.searchEngines.map((item) => {
        if (item.id !== id) {
          return item
        }
        return {
          ...item,
          ...searchEngine
        }
      })
    }
  },
  plugins: [
    vuexPersist.plugin,
    (store) => {
      store.subscribe(() => {
        browser.runtime.sendMessage({ id: 'settingsChanged' })
      })
    }
  ]
})
