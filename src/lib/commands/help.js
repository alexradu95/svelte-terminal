const print = (...args) => args.map(text => `<pre class="output">${text}</pre>`)

export const help = () => print(
	'You found my terminal!',
	"This project serves as my browser's homepage. The bookmarks are 'commands' that you can type in the terminal.",
	"Type 'ls' to see all the commands.",
	"Type 'src' to see the code for this project on GitHub."
)
