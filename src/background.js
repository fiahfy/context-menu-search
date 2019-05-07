import browser from 'webextension-polyfill'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

const getSettings = () => {
  return new Promise((resolve) => {
    // remove module cache
    delete require.cache['./store/index.js']
    const store = require('./store').default
    // wait for async storage restore
    // @see https://github.com/championswimmer/vuex-persist/issues/15
    const timeout = Date.now() + 1000
    const timer = setInterval(() => {
      if (store.state.restore || Date.now() > timeout) {
        clearInterval(timer)
        resolve(store.state)
      }
    }, 100)
  })
}

const updateContextMenus = async () => {
  await browser.contextMenus.removeAll()

  const { searchEngines } = await getSettings()
  for (let engine of searchEngines) {
    await browser.contextMenus.create({
      title: `Search "%s" with ${engine.name}`,
      contexts: ['selection'],
      onclick: (info) => {
        const url = engine.url.replace(
          '%s',
          encodeURIComponent(info.selectionText)
        )
        browser.tabs.create({ url })
      }
    })
  }
}

browser.runtime.onMessage.addListener(async (message) => {
  const { id } = message

  switch (id) {
    case 'settingsChanged':
      await updateContextMenus()
      break
  }
})

updateContextMenus()
