import Pattern from "../classes/pattern"

export default interface BoardOptions {
  readonly size?: [number, number]
  readonly patterns?: Array<Pattern>
}