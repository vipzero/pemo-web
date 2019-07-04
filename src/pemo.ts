import _ from 'lodash'
import axios from 'axios'
import { base64 } from './utils'

const langClient = axios.create({
	baseURL: `https://language.googleapis.com/v1/documents:analyzeSyntax?key=${
		process.env.REACT_APP_CNL_TOKEN
	}`,
	headers: {
		'Content-Type': `application/json; charset=utf-8`,
	},
})
const postAnalyze = (content: string) =>
	langClient.post('', {
		encodingType: 'UTF8',
		document: {
			content,
			type: 'PLAIN_TEXT',
		},
	})

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

// exclude "を", include ぱ行, "っ", "ー"
const allCharas = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわんぱぴぷぺぽっー'.split(
	''
)

const level1Chars = ['ぺ']
const level2Chars = ('も' + 'ぱぴぷぽ').split('')
const level3Chars = ('まみむめ' + 'らりるれろ' + 'け' + 'ん').split('')
const level4Chars = 'っー'.split('')
const level5Chars = _.difference(
	allCharas,
	level1Chars,
	level2Chars,
	level3Chars,
	level4Chars
)
console.log(level5Chars.length)

type LevelSet = {
	charas: string[]
	weight: number
	weightTop: number
}

const levelSets: LevelSet[] = [
	{
		charas: level1Chars,
		weight: 10,
		weightTop: 10,
	},
	{
		charas: level2Chars,
		weight: 36,
		weightTop: 46,
	},
	{
		charas: level3Chars,
		weight: 44,
		weightTop: 90,
	},
	{
		charas: level4Chars,
		weight: 5,
		weightTop: 95,
	},
	{
		charas: level5Chars,
		weight: 5,
		weightTop: 100,
	},
]

function charToPemoChar(c: string): string {
	const nl = c.charCodeAt(0)
	const n = nl % 100
	const level = levelSets.find(level => n < level.weightTop)
	if (!level) {
		return '？'
	}
	return level.charas[nl % level.charas.length]
}

function pemoraNormalize(word: string): string {
	return word.replace(/^ー/, 'ぺ')
}

export function generatePemora(text: string): string {
	const pemoChars = text.split('').map(charToPemoChar)
	return _.chunk(pemoChars, 4)
		.map(cs => pemoraNormalize(cs.join('')))
		.join('　')
}

export async function generatePemon(text: string) {
	base64.encode(text)
	return '開発中'
}

export async function generatePemo(text: string) {
	// Detects the sentiment of the text

	const res = await postAnalyze(text)
	console.dir(res)
	// console.log(`Text: ${text}`)
	// console.log(`Sentiment score: ${sentiment.score}`)
	// console.log(`Sentiment magnitude: ${sentiment.magnitude}`)
	return '開発中'
}
