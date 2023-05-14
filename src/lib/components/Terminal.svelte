<!-- main component -->
<script>
    import TerminalOutput from './TerminalOutput.svelte'
    import TerminalInput from './TerminalInput.svelte'

    let focusInput;

    function handleTerminalClick() {
        if (focusInput) {
            focusInput();
        }
    }
</script>

<div class="terminal" on:click={handleTerminalClick}>
    <TerminalOutput />
    <TerminalInput on:ready={event => focusInput = event.detail} />
</div>
