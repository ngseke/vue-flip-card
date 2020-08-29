import Theme from './classes/theme'
import Pattern from './classes/pattern'

const emojis = require('emojis-list')
const generate = Pattern.generatePatterns

export default [
  new Theme(generate([
    ...emojis.slice(317, 318),
    ...emojis.slice(319, 324),
    ...emojis.slice(325, 326),
    ...emojis.slice(328, 329),
    ...emojis.slice(348, 349),
    ...emojis.slice(631, 632),
    ...emojis.slice(1747, 1748),
  ], '#00b4d8'), '風景畫框'),
  new Theme(generate([
    ...emojis.slice(1941, 1976),
  ], '#ef233c'), '交通'),
  new Theme(generate([
    ...emojis.slice(1749, 1818),
  ], '#ffd019'), '表情'),
  new Theme(generate(emojis.slice(1627, 1651), '#212529'), '時鐘'),
  new Theme(generate([
    ...emojis.slice(1446, 1459),
  ], '#E34FB5'), '愛心'),
  new Theme(generate([
    ...emojis.slice(815, 833),
  ], '#26ee2c'), '服飾/配件'),
  new Theme(generate([
    ...emojis.slice(667, 732),
  ], '#eddcd2'), '動物/生物'),
  new Theme(generate([
    ...emojis.slice(632, 640),
    ...emojis.slice(641, 647),
    ...emojis.slice(648, 650),
  ]), '建築'),
  new Theme(generate([
    ...emojis.slice(431, 439),
    ...emojis.slice(440, 441),
  ], '#677423'), '飲料'),
  new Theme(generate([
    ...emojis.slice(362, 383),
  ], '#fb6376'), '植物/花'),
  new Theme(generate([
    ...emojis.slice(383, 398),
  ], '#ff6b6b'), '水果'),
  new Theme(generate([
    ...emojis.slice(359, 362),
    ...emojis.slice(398, 430),
  ], '#eaac8b'), '食物'),
  new Theme(generate([
    ...emojis.slice(333, 341),
    ...emojis.slice(341, 348)
  ], '#15616d'), '月球/天文'),
  new Theme(generate([
    ...emojis.slice(324, 325),
    ...emojis.slice(326, 328),
    ...emojis.slice(350, 359)
  ], '#4ecdc4'), '氣象'),
  new Theme(generate([...emojis.slice(333, 341)], '#f5cb5c'), '月球'),
  new Theme(generate([
    ...emojis.slice(17, 301).filter((i: string, index: number) => ![17, 39, 60, 68, 78, 85, 105, 112, 124, 129, 141, 153, 177, 190, 192, 207, 209, 215, 237, 255, 263, 271, 274, 276, 279, 283].includes(index))
  ], '#52e3e1'), '國旗'),
  new Theme(generate([...'⌚📱📲💻⌨🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞☎📟📠📺📻🎙🎚🎛🧭⏱⏲⏰🕰⌛⏳📡🔋🔌💡🔦🕯🪔🧯🛢💸💵💴💶💷💰💳💎⚖🧰🔧🔨⚒🛠⛏🔩⚙🧱⛓🧲🔫💣🧨🪓🔪🗡⚔🛡🚬⚰⚱🏺🔮📿🧿💈⚗🔭🔬🕳🩹🩺💊💉🩸🧬🦠🧫🧪🌡🧹🧺🧻🚽🚰🚿🛁🛀🧼🪒🧽🧴🛎🔑🗝🚪🪑🛋🛏🛌🧸🖼🛍🛒🎁🎈🎏🎀🎊🎉🎎🏮🎐🧧✉📩📨📧💌📥📤📦🏷📪📫📬📭📮📯📜📃📄📑🧾📊📈📉🗒🗓📆📅🗑📇🗃🗳🗄📋📁📂🗂🗞📰📓📔📒📕📗📘📙📚📖🔖🧷🔗📎🖇📐📏🧮📌📍✂🖊🖋✒🖌🖍📝✏🔍🔎🔏🔐🔒🔓'], '#ef233c'), '物件'),
  new Theme(generate(emojis.slice(301, 316), '#f5cb5c'), '日式文字'),
  new Theme(generate([...'😺😸😹😻😼😽🙀😿😾'], '#f4d35e'), '喵喵臉'),
  new Theme(generate([...'😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃'], '#bc00dd'), '怪怪臉'),
  new Theme(generate([...'👋🤚🖐✋🖖👌🤏✌️🤞🤟🤘🤙👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🙌👐🤲🤝'], '#f9c74f'), '手勢'),
  new Theme(generate([...'✍💅🤳💪🦾🦵🦿🦶👂🦻👃🧠🦷🦴👀👁👅👄💋🩸'], '#f9c74f'), '身體'),
  new Theme(generate([...'⚽🏀🏈⚾🥎🎾🏐🏉🥏🎱🪀'], '#eeef20'), '球'),
  new Theme(generate([...'🏓🏸🏒🏑🥍🏏🥅⛳🪁🏹🎣🤿🥊🥋🎽🛹🛷⛸🥌🎿⛷🏂🪂⚽🏀🏈⚾🥎🎾🏐🏉🥏🎱🪀'], '#ff6000'), '運動'),
  new Theme(generate([...'🎬🎤🎧🎼🎹🥁🎷🎺🎸🪕🎻🎵']), '音樂'),
  new Theme(generate([...'⛎♈♉♊♋♌♍♎♏♐♑♒♓'], '#9132AF'), '星座'),
  new Theme(generate([...'🚷🚯🚳🚱🔞📵🚭'], '#ef233c'), '禁止符號'),
  new Theme(generate([...'🟥🟧🟨🟩🟦🟪⬛⬜🟫'], '#ef233c'), '色塊'),
  new Theme(generate([...'🔴🟠🟡🟢🔵🟣⚫⚪🟤'], '#ef233c'), '色球'),
  new Theme(generate([...'🟥🔴🟧🟠🟨🟡🟩🟢🟦🔵🟪🟣⬛⚫⬜⚪🟫🟤'], '#ef233c'), '色塊和色球'),
  new Theme(generate([...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ']), '注音符號'),
  new Theme(generate([...'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん']), 'ひらがな'),
  new Theme(generate([...'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン']), 'カタカナ'),
  new Theme(generate([...'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ']), 'カタカナ (半角)'),
  new Theme(generate([...'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ']), '諺文子音'),
]