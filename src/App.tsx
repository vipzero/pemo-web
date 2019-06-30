import React from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { generatePemo, buildTokenizer, Tokenizer } from './pemo'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const toj = (a: any) => JSON.stringify(a, null, '\t')
function App() {
	const [tokenizer, setTokenizer] = React.useState<Tokenizer | null>(null)
	React.useEffect(() => {
		;(async () => {
			setTokenizer(await buildTokenizer())
		})()
	}, [])
	const [text, setText] = useLocalStorage('text', 'ペモペモ語を作ります')
	if (!tokenizer) {
		return <Typography>loading...</Typography>
	}
	const { pemoText, tokens } = generatePemo(text, tokenizer)
	return (
		<div className="App">
			<Typography variant="h2">ぺもじぇねれーた</Typography>
			<Typography variant="h6">標準語</Typography>
			<TextField
				variant="outlined"
				fullWidth
				value={text}
				onChange={e => {
					setText(e.target.value)
				}}
			/>
			<Typography variant="h6">ぺも語</Typography>
			<TextField
				fullWidth
				InputProps={{
					readOnly: true,
				}}
				variant="outlined"
				value={pemoText}
				onChange={e => {
					setText(e.target.value)
				}}
			/>
			<Typography variant="h6">でばっぐ</Typography>
			<pre>{toj(tokens)}</pre>
			<Typography variant="h6">定義済み</Typography>
			<ul>
				<li>格助詞</li>
				<li>接続助詞</li>
			</ul>
		</div>
	)
}

export default App
