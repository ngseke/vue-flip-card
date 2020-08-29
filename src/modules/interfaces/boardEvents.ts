export default interface BoardEvents {
  readonly flip?: Function
  readonly match?: Function
  readonly miss?: Function
  readonly gameOver?: Function
}