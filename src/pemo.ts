import util from 'util'
import kuromoji from 'kuromoji'
import _ from 'lodash'

const Base64 = {
	encode: (str: string) => btoa(unescape(encodeURIComponent(str))),
	decode: (str: string) => decodeURIComponent(escape(atob(str))),
}
export type Tokenizer = kuromoji.Tokenizer<kuromoji.IpadicFeatures>

const builder = kuromoji.builder({
	// ここで辞書があるパスを指定します。今回は kuromoji.js 標準の辞書があるディレクトリを指定
	dicPath: 'dict/',
})
export const buildTokenizer = util.promisify(builder.build).bind(builder)

const head = ['ぺも', 'も', 'と', 'ぺも', 'ぷも', 'おり', 'ぷ', 'ぽ']
const joshi: Record<string, string> = {
	が: 'けら',
	の: 'ぷも',
	を: 'ぴも',
	に: 'んみ',
	へ: 'ぺぺ',
	と: 'もぽ',
	より: 'ぽみ',
	から: 'まぱ',
	で: 'ぱめ',
	や: 'ぱや',
	// 接続
	は: 'っは',
	// と: 'っと',
	ても: 'っめ',
	けれど: 'っれ',
	ながら: 'な',
	// が: 'っみ',
	のに: 'っの',
	ので: 'っね',
	// から: 'っら',
	など: 'っろ',
}

// 固有名詞は「」に囲む
export function generatePemo(text: string, tokenizer: Tokenizer) {
	const tokens = tokenizer.tokenize(text)
	console.log(tokens)
	const pemos = tokens.map(
		(token): { text: string; tail: boolean } => {
			// 助詞
			if (token.pos === '助詞') {
				return { text: joshi[token.basic_form] || 'ぺも', tail: true }
			}
			// 助詞以外
			const bstr = Base64.encode(token.basic_form)
			return { text: head[bstr.charCodeAt(0) % head.length], tail: false }
		}
	)
	const pemoTexts: string[][] = []
	pemos.forEach(pemo => {
		const l = _.last(pemoTexts)
		if (!l || l.length === 2) {
			if (pemo.tail) {
				pemoTexts.push([
					_.get(pemoTexts, [pemoTexts.length - 2, 1]) || 'ぺも',
					pemo.text,
				])
			} else {
				pemoTexts.push([pemo.text])
			}
			return
		}
		if (l.length === 1) {
			l.push(pemo.text)
			return
		}
	})
	return { pemoText: pemoTexts.map(p => p.join('')).join('　'), tokens }
}

// 形態素解析機を作るメソッド

builder.build((err, tokenizer) => {
	// 辞書がなかったりするとここでエラーになります(´・ω・｀)
	if (err) {
		throw err
	}

	// tokenizer.tokenize に文字列を渡すと、その文を形態素解析してくれます。
	const tokens = tokenizer.tokenize('今日は森へ行った')
	console.dir(tokens)
})
