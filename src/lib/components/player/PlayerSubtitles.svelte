<script lang="ts">
	let {text}: {text: string} = $props();

	let texts: string[] = $derived(function() {
		let txts = [];
		let txt = text.replaceAll('{\\an8}', '');
		txts = txt.split(/\s(?=-\s)/);
		if (txts.length === 0) txts[0] = txt;

		return txts;
	}());
</script>

{#if text}
    <div class="absolute bottom-[10%] bg-black/30 rounded-md cursor-default text-center">
        {#each texts as txt}
			{#if txt.includes('<i>')}
                <h1 class="text-4xl p-2 italic">{(function () {return txt.replaceAll('<i>', '').replaceAll('</i>', '')})()}</h1>
            {:else}
                <h1 class="text-4xl p-2">{txt}</h1>
            {/if}
        {/each}
    </div>
{/if}