const print = (...args) => args.map(text => `<pre class="output">${text}</pre>`)

export const help = () => print(
	'Welcome to my little piece of the internet 🌍!',
	"This website serves as my personal website.",
	"Type 'ls' to see all the commands."
)
