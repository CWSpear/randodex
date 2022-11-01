<template>
  <div class="pokemon-card-wrapper">
    <div @click="selectPokemon()" class="pokemon-card" :id="pokemon.name" :class="{ highlight }">
      <PokemonSprite class="pokemon-card-sprite" :pokemon="pokemon" :withName="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonSprite from '@/components/PokemonSprite.vue';
import type { Pokemon } from '@/tools/pokemon';
import { store } from '@/tools/store';
import { computed } from 'vue';

const props = defineProps<{
  pokemon: Pokemon;
}>();

const highlight = computed(() => store.selectedPokemonName === props.pokemon.name);

function selectPokemon() {
  store.selectedPokemonName = props.pokemon.name;
}
</script>

<style lang="scss" scoped>
.pokemon-card {
  display: block;
  margin: 30px;
  border: 2px solid darkgray;
  border-radius: 5px;

  cursor: pointer;

  &:hover {
    background: antiquewhite;
  }

  &.highlight {
    background: paleturquoise;
  }
}

.pokemon-card-sprite {
  padding: 1rem 0 0;
}
</style>
