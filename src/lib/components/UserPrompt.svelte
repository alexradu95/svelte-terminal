<!-- Prompt.svelte -->
<script>
    import { user, machine } from '$lib/stores'
</script>

<p class="prompt">{$user}@{$machine}:$&nbsp;</p>