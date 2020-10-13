import { browser } from 'webextension-polyfill-ts'
import { readyStore } from '~/store'

const getSettings = async () => {
  const store = await readyStore()
  return JSON.parse(JSON.stringify(store.state.settings))
}

const updateContextMenus = async () => {
  await browser.contextMenus.removeAll()

  const { searchEngines } = await getSettings()
  for (const engine of searchEngines) {
    browser.contextMenus.create({
      title: `Search ${engine.name} for "%s"`,
      contexts: ['selection'],
      onclick: (info) => {
        if (!info.selectionText) {
          return
        }
        const url = engine.url.replace(
          '%s',
          encodeURIComponent(info.selectionText)
        )
        browser.tabs.create({ url })
      },
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
