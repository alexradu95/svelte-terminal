<script>
    import UserPrompt from "./UserPrompt.svelte"
    import { lineData } from '../stores'; // import the store
</script>

{#each $lineData as line, i (i)} <!-- use $lineData to access the current value of the store -->
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

<style>
    .input-old {
        background: transparent;
        border: none;
        display: inline;
        font-family: monospace;
        white-space: nowrap;
        color: var(--color-text-primary);
        outline: none;
    }
</style>
