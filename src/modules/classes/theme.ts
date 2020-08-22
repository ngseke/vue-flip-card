import themeOptions from '../interfaces/themeOptions'
import Pattern from './pattern'
const isColor = require('is-color')

export default class Theme {
  name: string = '英文字母'
  patterns: Array<Pattern> = Pattern.generatePatterns(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    '#ccc'
  )
  color: string = this.patterns[0].color

  constructor (
    patterns?: Array<Pattern>,
    name?: string,
    options: themeOptions = {}
  ) {
    if (patterns) this.patterns = patterns
    if (name) this.name = name

    const { color } = options
    if (color && isColor(color)) this.color = color
  }
}