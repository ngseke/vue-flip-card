import Card from './card'
import Pattern from './pattern'

const { shuffle } = require('shuffle-seed')

export default class Cards {
  list: Array<Card> = []

  constructor (
    patterns: Pattern[],
    length: number,
    seed: string | number = +new Date
  ) {
    const list = [...patterns]
    const shuffledList = shuffle(list, seed)
    shuffledList.length = length
    const doubledShuffledList = [...shuffledList, ...shuffledList]
    const cards = doubledShuffledList.map((pattern: Pattern) => new Card(pattern))
    const shuffledCards = shuffle(cards, seed)
    this.list = shuffledCards
  }

  handleMissedCards () {
    this.list.forEach(card => {
      if (card.isMissed) card.fold()
    })
  }

  handleMatchCards () {
    this.list.forEach(card => {
      if (card.isMatched) card.stale()
    })
  }

  get isNoFlippedCard () {
    return this.list.every(card => !card.isFlipped)
  }

  get isHasOneFlippedCard () {
    return this.list.filter(card => card.isFlipped).length === 1
  }

  get flippedCard (): Card | undefined {
    return this.list.find(card => card.isFlipped)
  }

  get isAllFlipped () {
    return this.list.every(card => card.isMatched || card.isStale)
  }
}