<script setup lang="ts">

defineProps(['label'])

</script>

<template>
    <div class="flex col-span-12 flex-col gap-2">
        <label>{{ label }}</label>
        <slot />
    </div>
</template> 