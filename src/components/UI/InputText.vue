<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
    <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)" 
    class="border-transparent rounded-lg p-3 bg-black/40" />
</template> 