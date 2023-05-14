export const local = (args) => {
	const [port, flag] = args.trim().split(' ')
	if (!port) return 'usage: local [port] [flag]'
	let url = `http://localhost:${port}000`
	if (flag === '-a') url += '/admin'
	else if (flag === '-p') url += '/api'
	window.location.href = url
	return url
}
