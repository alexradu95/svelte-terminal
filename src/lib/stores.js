// Import necessary modules and libraries
import { browser } from '$app/env'
import { writable, readable } from 'svelte/store'
import dayjs from 'dayjs'

// If we are in the browser environment, try to fetch any stored command history from local storage
// If there is no stored history (or if we are not in the browser), start with an empty array
const storedHistory = browser ? JSON.parse(window.localStorage.getItem('history')) || [] : []

// Create a writable Svelte store for our command history
export const history = writable(storedHistory)

// Whenever our command history changes, save the new history to local storage
// This allows the history to persist across page reloads
history.subscribe((newHistory) => {
	if (browser) {
		window.localStorage.setItem('history', JSON.stringify(newHistory))
	}
})

// Create a readable Svelte store for the current date and time
// This store updates every second
export const dateTime = readable(getCurrentTime(), function start(set) {
	// Set the current time immediately, and then update it every second
	const interval = setInterval(() => set(getCurrentTime()), 1000)

	// When there are no more subscribers to this store, clear the interval
	return function stop() {
		clearInterval(interval)
	}
})

// Helper function to get the current time, formatted
function getCurrentTime() {
	return dayjs().format('ddd MMM DD hh:mm:ss A')
}
