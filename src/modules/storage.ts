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