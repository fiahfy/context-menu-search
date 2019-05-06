import { defaults } from './store/settings'
import logger from './utils/logger'
import storage from './utils/storage'
import './assets/icon16.png'
import './assets/icon48.png'
import './assets/icon128.png'

const updateContextMenu = async () => {
  const state = await storage.get()
  const { settings } = state
  chrome.contextMenus.removeAll(() => {
    for (let engine of settings.searchEngines) {
      chrome.contextMenus.create({
        title: `Search "%s" with ${engine.name}`,
        contexts: ['selection'],
        onclick: (info) => {
          const url = engine.url.replace('%s', encodeURIComponent(info.selectionText))
          chrome.tabs.create({ url })
        }
      })
    }
  })
}

chrome.runtime.onInstalled.addListener(async (details) => {
  logger.log('chrome.runtime.onInstalled', details)

  const state = await storage.get()
  const newState = {
    settings: defaults,
    ...state
  }
  await storage.set(newState)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.log('chrome.runtime.onMessage', message, sender, sendResponse)

  const { id } = message
  switch (id) {
    case 'stateChanged':
      updateContextMenu()
      break
  }
})

updateContextMenu()

logger.log('background script loaded')
