<!-- Prompt.svelte -->
<script>
    import { user, machine } from '$lib/stores'
</script>

<p class="prompt">{$user}@{$machine}:$&nbsp;</p>


<style>

     /* Styles for prompt text */
    .prompt {
        color: var(--color-prompt);
        font-family: monospace;
        display: inline;
        white-space: nowrap;
    }

</style>