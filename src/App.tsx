import React from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { generatePemo } from './pemo'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const toj = (a: any) => JSON.stringify(a, null, '\t')
function App() {
	const [text, setText] = useLocalStorage<string>(
		'text',
		'ペモペモ語を作ります。'
	)
	const [pemoText, setRes] = useLocalStorage<any>('---')
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
			<Button
				onClick={async () => {
					setRes(await generatePemo(text))
				}}
			>
				翻訳
			</Button>
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
			<Typography variant="h6">定義済み</Typography>
			<ul>
				<li>格助詞</li>
				<li>接続助詞</li>
			</ul>
		</div>
	)
}

export default App
