const isEven = require('is-even')

import BoardEvents from '../interfaces/boardEvents'
import BoardOptions from '../interfaces/boardOptions'
import Pattern from './pattern'
import Cards from './cards'
import Card from './card'
import themes from '../themes'

export default class Board {
  private row = 5
  private col = 4
  private patterns: Array<Pattern> = themes[0].patterns
  private events: BoardEvents

  cards: Cards

  constructor (
    { size, patterns }: BoardOptions = {},
    events: BoardEvents = {},
  ) {
    this.events = events
    if (size) {
      // 初始化行列大小
      const [row, col] = size
      const length: number = row * col
      if (!isEven(length)) throw Error('`row * col` must be an even number!')

      this.row = row
      this.col = col
    }

    if (patterns) this.patterns = patterns

    if (this.patterns.length < this.row * this.col / 2) throw Error('patterns are too short!')

    this.cards = new Cards(this.patterns, this.row * this.col / 2)
  }

  click (card: Card, by?: any) {
    const { cards } = this
    const { flippedCard } = cards

    if (
      cards.flippedCard === card ||  // 同一張
      card.isFlipped ||              // 已翻過的
      card.isMatched ||              // 已配對過的
      card.isStale                   // 歷史卡牌
    ) return false

    cards.handleMissedCards()  // 處理上一輪翻錯的牌
    cards.handleMatchCards()  // 處理上一輪配對的牌

    if (cards.isNoFlippedCard) {  // 若無任何一張翻開的牌
      card.flip()
      this.events.flip?.({ card, by })
    } else if (cards.isHasOneFlippedCard) {  // 若有一張翻開的牌
      if (card === flippedCard) return console.log('翻自己')  // 再次翻自己
      else if (card.pattern === flippedCard?.pattern) {
        flippedCard.match()
        card.match()
        this.events.match?.({ pattern: card.pattern, by })
      } else {
        flippedCard?.miss()
        card.miss()
        this.events.miss?.({ by })
      }
    }
    if (this.cards.isAllFlipped) {
      this.events.gameOver?.()
    }
  }
}