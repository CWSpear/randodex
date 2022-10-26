<template>
  <div class="pokemon-card-wrapper">
    <div @click="openModal()" class="pokemon-card" :id="pokemon.name" :class="{ highlight }">
      <PokemonSprite :pokemon="pokemon" :withName="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonSprite from '@/components/PokemonSprite.vue';
import type { Pokemon } from '@/tools/pokemon';
import type { Meta } from '@/tools/pokemon';
import { getPokeHash, openPokemonModal } from '@/tools/select';
import { computed } from 'vue';

const props = defineProps<{
  pokemon: Pokemon;
  meta: Meta;
}>();

const highlight = computed(() => getPokeHash() === props.pokemon.name);

function openModal() {
  openPokemonModal(props.pokemon);
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
</style>
