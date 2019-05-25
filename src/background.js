import browser from 'webextension-polyfill'
import createStore from './store'
import './assets/icon.png'

const getSettings = async () => {
  const store = await createStore(true)
  return store.state
}

const updateContextMenus = async () => {
  await browser.contextMenus.removeAll()

  const { searchEngines } = await getSettings()
  for (let engine of searchEngines) {
    await browser.contextMenus.create({
      title: `Search ${engine.name} for "%s"`,
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
