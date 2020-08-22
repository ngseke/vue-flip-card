import Theme from './theme'

export default class GameOptions {
  public size: [Number, Number] = [5, 4]
  public theme: Theme = new Theme

  constructor ({ size, theme }: {
    size?: [Number, Number],
    theme?: Theme,
  } = {}) {
    if (size) this.size = size
    if (theme) this.theme = theme
  }
}