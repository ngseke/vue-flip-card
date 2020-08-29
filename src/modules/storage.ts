const configsKey = 'vue-flip-card-configs'

export const configs = {
  load () {
    const data = localStorage.getItem(configsKey) || ''
    try {
      return JSON.parse(data) ?? {}
    } catch (e) {
      return {}
    }
  },
  save (configs: Object) {
    return localStorage.setItem(configsKey, JSON.stringify(configs))
  },
}

export const result = {
  load (id: string) {
    const data = sessionStorage.getItem(id) || ''
    try {
      return JSON.parse(data) ?? null
    } catch (e) {
      return null
    }
  },
  save (id: string, result: Object) {
    return sessionStorage.setItem(id, JSON.stringify(result))
  },
}

