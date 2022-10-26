<template>
  <div :class="`${pokemon.type1.toLowerCase()}-type-bg`" class="primary-type type-bg">
    <div
      :class="`${pokemon.type2.toLowerCase()}-type-bg`"
      class="secondary-type"
      v-if="pokemon.type2"
    ></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '@/tools/pokemon';

const props = defineProps<{
  pokemon: Pokemon;
}>();
</script>

<style lang="scss" scoped>
.type-bg {
  position: relative;
}

.secondary-type {
  position: absolute;
  bottom: 0;
  top: 50%;
  left: 0;
  right: 0;
}
</style>
