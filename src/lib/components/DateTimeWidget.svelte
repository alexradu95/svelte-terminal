<script>

	import { dateTime } from "../stores"

</script>

<div class="clock">{$dateTime}</div>

<style>
	/* Styles for the clock */
	.clock {
		font-family: monospace;
		color: var(--color-text-secondary);
		text-align: right;
	}
</style>