import _ from 'lodash'
import axios from 'axios'

axios.defaults.headers = {
	Authorization: `Bearer ${process.env.REACT_APP_CNL_TOKEN}`,
	'Content-Type': `application/json; charset=utf-8`,
}

const Base64 = {
	encode: (str: string) => btoa(unescape(encodeURIComponent(str))),
	decode: (str: string) => decodeURIComponent(escape(atob(str))),
}

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
export async function generatePemo(text: string) {
	const document = {
		content: text,
		type: 'PLAIN_TEXT',
	}

	// Detects the sentiment of the text
	const res = await axios.post(
		'https://language.googleapis.com/v1/documents:analyzeSyntax',
		{
			encodingType: 'UTF8',
			document,
		}
	)
	console.dir(res)
	// console.log(`Text: ${text}`)
	// console.log(`Sentiment score: ${sentiment.score}`)
	// console.log(`Sentiment magnitude: ${sentiment.magnitude}`)
	return ''
}
