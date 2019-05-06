const getItem = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key])
    })
  })
}

const setItem = (key, value) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => {
      resolve()
    })
  })
}

const removeItem = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.remove(key, () => {
      resolve()
    })
  })
}

const clear = () => {
  return new Promise((resolve) => {
    chrome.storage.local.clear(() => {
      resolve()
    })
  })
}

const localStorage = { getItem, setItem, removeItem, clear }

export { localStorage }
