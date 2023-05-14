import { bookmarks } from '../bookmarks'

const print = (...args) => args.map(text => `<pre class="output">${text}</pre>`)
const printWithColor = (text, color = 'inherit') => `<pre class="output" style="color: ${color};">${text}</pre>`

export const ls = () => Object.keys(bookmarks).flatMap(bookmark => [
	printWithColor(bookmark, '#00FF9C'),
	print(`> ${Object.keys(bookmarks[bookmark]).join(' > ')}`)
])
