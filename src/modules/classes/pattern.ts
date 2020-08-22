const isColor = require('is-color')

export default class Pattern {
  id: Symbol
  face: string
  color: string = '#ccc'

  constructor (face: string, color?: string) {
    this.id = Symbol(face)
    this.face = face
    if (color && isColor(color)) this.color = color
  }

  static generatePatterns (
    list: Array<string | Pattern>,
    color?: string
  ) : Array<Pattern> {
    return list
      .filter(_ => _ != null)
      .map((_): Pattern => {
        if (_ instanceof Pattern) return _
        return new Pattern(_, color)
      })
  }
}