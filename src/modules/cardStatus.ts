enum CardStatus {
  Fold, // 未翻
  Flip, // 已翻開
  Match, // 新配對
  Miss, // 選錯
  ContinuousMatch, // 連續配對
  Stale, // 歷史卡牌
}

export default CardStatus