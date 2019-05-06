export const defaults = {
  searchEngines: []
}

export default {
  namespaced: true,
  state: {
    ...defaults
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
  }
}
