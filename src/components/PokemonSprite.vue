<template>
  <div class="sprite-and-name">
    <div class="sprite">
      <img
        class="sprite-image"
        :width="64 * (size || 4)"
        :height="64 * (size || 4)"
        :alt="`${pokemon.name} Sprite`"
        :src="src"
      />
    </div>
    <PokemonName :pokemon="pokemon" v-if="withName" />
  </div>
</template>

<script lang="ts" setup>
import PokemonName from '@/components/PokemonName.vue';
import type { Pokemon } from '@/tools/pokemon';
import { computed } from 'vue';

const props = defineProps<{
  pokemon: Pokemon;
  withName: boolean;
  size?: number;
}>();

const src = computed(() => {
  const spriteNameRaw = props.pokemon.name.toLowerCase().replace(/ /g, '_');

  // some special cases...
  let spriteName: string;
  switch (spriteNameRaw) {
    case 'nidoran♀':
      spriteName = 'nidoran_f';
      break;
    case 'nidoran♂':
      spriteName = 'nidoran_m';
      break;
    case 'porygon_2':
      spriteName = 'porygon2';
      break;
    default:
      spriteName = spriteNameRaw;
      break;
  }

  return `/sprites/${spriteName}.png`;
});
</script>

<style lang="scss" scoped>
.sprite {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  .sprite-image {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
}
</style>
