import React from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import useSessionStorage from 'react-use/lib/useSessionStorage'
import { generatePemo, generatePemora, generatePemon } from './pemo'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

function App() {
	const [text, setText] = useLocalStorage<string>(
		'text',
		'ペモペモ語を作ります。'
	)
	const [pemonText, setPemonText] = useSessionStorage<string>(
		'pemonText',
		'---'
	)
	const [pemoraText, setPemoraText] = useSessionStorage<string>(
		'pemoraText',
		'---'
	)
	const [pemoText, setPemo] = useSessionStorage<string>('pemoText', '---')
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
					setPemoraText(generatePemora(e.target.value))
				}}
			/>
			<Button
				onClick={async () => {
					setPemonText(await generatePemon(text))
					setPemo(await generatePemo(text))
				}}
			>
				翻訳
			</Button>
			<Typography variant="h5">ぺもら語</Typography>
			<Typography>ランダム・一意・非可逆</Typography>
			<TextField fullWidth variant="outlined" value={pemoraText} />
			<Typography variant="h5">ぺもん語</Typography>
			<Typography>長い・一意・可逆</Typography>
			<TextField fullWidth variant="outlined" value={pemonText} />
			<Typography variant="h5">ぺも語</Typography>
			<Typography>一意・可逆</Typography>
			<TextField fullWidth variant="outlined" value={pemoText} />
		</div>
	)
}

export default App
