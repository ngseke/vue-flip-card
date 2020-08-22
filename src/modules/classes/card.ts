import Pattern from './pattern'
import CardStatus from '../cardStatus'

export default class Card {
  readonly id: Symbol
  readonly pattern: Pattern
  status: CardStatus = CardStatus.Fold

  constructor (pattern: Pattern) {
    this.pattern = pattern
    this.id = Symbol(pattern.face)
  }

  get face () { return this.pattern.face }
  get color () { return this.pattern.color }

  get isFolded  () { return this.status === CardStatus.Fold }
  get isFlipped () { return this.status === CardStatus.Flip }
  get isMissed  () { return this.status === CardStatus.Miss }
  get isMatched () { return this.status === CardStatus.Match }
  get isStale   () { return this.status === CardStatus.Stale }

  flip () {
    this.status = CardStatus.Flip
  }

  fold () {
    this.status = CardStatus.Fold
  }

  match () {
    this.status = CardStatus.Match
  }

  miss () {
    this.status = CardStatus.Miss
  }

  stale () {
    this.status = CardStatus.Stale
  }
}