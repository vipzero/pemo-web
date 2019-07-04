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

export function generatePemora(text: string): string {
	const bt = base64.encode(text)
	return 'pemorad'
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
