<script>
    import { keypress } from '$lib/actions'
    import { history, lineData } from '$lib/stores'
    import { onMount } from 'svelte'
    import { handle } from '../bin';
    import UserPrompt from './UserPrompt.svelte';

    let histIndex = $history.length
    let inputDomElementReference

    import { createEventDispatcher } from 'svelte';

    // Create an event dispatcher
    const dispatch = createEventDispatcher();

    function focusInput() {
        inputDomElementReference.focus();
    }

    // Dispatch the focus function when the component mounts
    onMount(() => {
        dispatch('ready', focusInput);
    });

    function handleArrowUp() {
        if (histIndex === 0) return

        histIndex--
        inputDomElementReference.value = $history[histIndex]
    }

    function handleArrowDown() {
        if (histIndex < $history.length - 1) {
            histIndex++
            inputDomElementReference.value = $history[histIndex]
        } else {
            histIndex = $history.length
            inputDomElementReference.value = ''
        }
    }

    function handleEnterButton() {
        let command = inputDomElementReference.value
        const output = handle(command)

        // Update lineData store
        lineData.update(data => [...data, { command, output }]);

        inputDomElementReference.value = ''

        if (command === '' || /^[ ]+$/.test(command) || $history[$history.length - 1] === command)
            return

        $history[$history.length] = command
    }

    function handleClick() {
        inputDomElementReference.focus()
    }
</script>

<UserPrompt></UserPrompt>
<div class="terminal-input" on:click={handleClick}>
    <input
        class="input"
        type="text"
        spellcheck="false"
        bind:this={inputDomElementReference}
        use:keypress
        on:enterkey={handleEnterButton}
        on:arrowup|preventDefault={handleArrowUp}
        on:arrowdown|preventDefault={handleArrowDown}
    />
</div>
