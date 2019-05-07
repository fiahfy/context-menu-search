import logger from './utils/logger'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

const getSettings = () => {
  return new Promise(async (resolve) => {
    // remove module cache
    delete require.cache['./store/index.js']
    const store = require('./store').default
    // wait for async storage restore
    // @see https://github.com/championswimmer/vuex-persist/issues/15
    setTimeout(() => {
      resolve(store.state.settings)
    })
  })
}

const updateContextMenu = async () => {
  const { searchEngines } = await getSettings()
  chrome.contextMenus.removeAll(() => {
    for (let engine of searchEngines) {
      chrome.contextMenus.create({
        title: `Search "%s" with ${engine.name}`,
        contexts: ['selection'],
        onclick: (info) => {
          const url = engine.url.replace(
            '%s',
            encodeURIComponent(info.selectionText)
          )
          chrome.tabs.create({ url })
        }
      })
    }
  })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.log('chrome.runtime.onMessage', message, sender, sendResponse)

  const { id } = message
  switch (id) {
    case 'stateChanged':
      updateContextMenu()
      break
  }
})

logger.log('background script loaded')

updateContextMenu()
