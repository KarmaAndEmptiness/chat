<script setup lang="ts">
import { useWsAutoConnect } from '@/hooks/useWsAutoConnect';
import { useWsBindEvents } from '@/hooks/useWsBindEvents';

onMounted(() => {
   useWsBindEvents()
   useWsAutoConnect()
})
</script>
<template>
    <slot />
</template>