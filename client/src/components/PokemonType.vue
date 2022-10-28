<template>
  <span :class="`${type.toLowerCase()}-type-bg`" class="pokemon-type">
    <span class="outline">{{ type }}</span>
  </span>
</template>

<script lang="ts" setup>
import type { Type } from '@/tools/pokemon';

const props = defineProps<{
  type: Type;
}>();
</script>

<style lang="scss" scoped>
.pokemon-type {
  font-size: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  display: inline-block;

  .outline {
    display: inline-block;
    padding: 0.25rem 1rem;
  }
}
</style>
