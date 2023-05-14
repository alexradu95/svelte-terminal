<!-- TerminalOutput.svelte -->
<script>
	import UserPrompt from "./UserPrompt.svelte"
    export let lineData = []
</script>

<pre class="output">Type 'help' to learn more.</pre>
{#each lineData as line, i (i)}
    <span>
        <UserPrompt></UserPrompt>
        <pre class="input-old">{line.command}</pre>
        <br />
        {#if typeof line.output === 'string'}
            <pre class="output">{line.output}</pre>
        {:else}
            {#each line.output as out}
                {@html out}
            {/each}
        {/if}
    </span>
{/each}
