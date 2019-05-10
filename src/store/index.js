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
    const json = result[key]

    let state = {}
    try {
      state = JSON.parse(json)
    } catch (e) {} // eslint-disable-line no-empty

    return {
      ...state,
      __storageReady: true
    }
  },
  saveState: async (key, state, storage) => {
    const json = JSON.stringify(state)
    await storage.set({ [key]: json })
  }
})

const initialState = {
  searchEngines: []
}

const config = {
  state: {
    ...initialState
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
}

export default function createStore(waitStorageReady = false) {
  return new Promise((resolve) => {
    const store = new Vuex.Store(config)
    if (!waitStorageReady) {
      resolve(store)
      return
    }
    // wait for async storage restore
    // @see https://github.com/championswimmer/vuex-persist/issues/15
    const timeout = Date.now() + 1000
    const timer = setInterval(() => {
      if (store.state.__storageReady || Date.now() > timeout) {
        clearInterval(timer)
        resolve(store)
      }
    }, 100)
  })
}
