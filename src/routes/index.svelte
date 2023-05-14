<!-- main component -->
<script>
    import { onMount } from 'svelte'
    import { handle } from '$lib/bin'
    import { keypress } from '$lib/actions'
    import { history } from '$lib/stores'
    import UserPrompt from '../lib/components/UserPrompt.svelte'
    import TerminalOutput from '../lib/components/TerminalOutput.svelte'
	import DateTimeWidget from '../lib/components/DateTimeWidget.svelte'

    let lineData = []
    let histIndex = $history.length
    let termInput

    function enter() {
        let command = termInput.value
        const output = handle(command)
        lineData[lineData.length] = { command, output }
        termInput.value = ''

        if (command === '' || /^[ ]+$/.test(command) || $history[$history.length - 1] === command)
            return

        $history[$history.length] = command
        histIndex = $history.length
    }

    function arrowUp() {
        if (histIndex === 0) return

        histIndex--
        termInput.value = $history[histIndex]
    }

    function arrowDown() {
        if (histIndex < $history.length - 1) {
            histIndex++
            termInput.value = $history[histIndex]
        } else {
            histIndex = $history.length
            termInput.value = ''
        }
    }

    onMount(() => {
        termInput.focus()
    })
</script>

<svelte:head>
    <title>Terminal</title>
</svelte:head>

<div class="terminal" on:click={() => termInput.focus()}>
    <TerminalOutput {lineData} />
    <UserPrompt></UserPrompt>    
    <input
        class="input"
        type="text"
        spellcheck="false"
        bind:this={termInput}
        use:keypress
        on:enterkey={enter}
        on:arrowup|preventDefault={arrowUp}
        on:arrowdown|preventDefault={arrowDown}
    />
</div>
<DateTimeWidget></DateTimeWidget>
