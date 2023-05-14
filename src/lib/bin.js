// Import command handlers
import { echo } from './commands/echo'
import { help } from './commands/help'
import { ls } from './commands/ls'
import { local } from './commands/local'

// Import bookmarks
import { bookmarks } from './bookmarks'

// Define command actions
// Each command has its own handler imported from a separate file
const actions = {
	echo,   // Echo command just echoes the input back to the user
	local,  // Local command navigates to a local URL
	help,   // Help command provides some general help information
	ls,     // LS command lists available bookmarks
}

// Helper function to get URL associated with a command
// If the command is found in the bookmarks, return the URL
// If the command is not found in the bookmarks, return null
const getURL = (command) => {
	for (const key in bookmarks)
		if (bookmarks[key][command]) return bookmarks[key][command]
	return null
}

// Helper function to handle URL navigation
// If the openInNewTab flag is true, open the URL in a new tab
// Otherwise, navigate to the URL in the current tab
const handleURL = (url, openInNewTab) => {
	if (openInNewTab) window.open(url, '_blank')
	else window.location.href = url
}

// Main command handler
// This function takes in a text input, splits it into command and arguments,
// and calls the appropriate handler based on the command.
// If the command is not found in the defined actions, it tries to get a URL from bookmarks.
// If a URL is found, it navigates to the URL.
// If no URL is found, it returns an error message.
export const handle = (text) => {
	const [command, ...args] = text.trim().split(' ')
	const executor = actions[command]

	if (executor) {
		return executor(args.join(' '))
	} else {
		const url = getURL(command)
		if (url) {
			handleURL(url, args[0] === '-t')
			return `Loading ${url}...`
		}
	}

	return `Command '${command}' not found. Type 'ls' for all commands.`
}
