<template>
  <div class="pokemon-name">
    <PokemonTypeBackground :pokemon="pokemon">
      <div class="outline">{{ pokemon.name }}</div>
    </PokemonTypeBackground>
  </div>
</template>

<script lang="ts" setup>
import PokemonTypeBackground from '@/PokemonTypeBackground.vue';
import type { BasicInfo } from '@/tools/pokemon';

const props = defineProps<{
  pokemon: BasicInfo;
  withName?: boolean;
}>();
</script>

<style lang="scss" scoped>
.pokemon-name {
  font-size: 1.75rem;
  line-height: 1.75rem;
  text-align: center;

  .outline {
    padding: 0.5rem 2rem;
  }
}
</style>
