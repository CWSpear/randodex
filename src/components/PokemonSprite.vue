<template>
  <div class="sprite-and-name">
    <div class="sprite" :class="{ 'with-name': withName }">
      <img
        class="sprite-image"
        :width="96 * (size || 2)"
        :height="96 * (size || 2)"
        :alt="`${pokemon.name} Sprite`"
        :src="src"
      />
    </div>
    <PokemonName :pokemon="pokemon" v-if="withName" />
  </div>
</template>

<script lang="ts" setup>
import PokemonName from '@/components/PokemonName.vue';
import type { BasicInfo } from '@/tools/pokemon';
import { computed } from 'vue';

const props = defineProps<{
  pokemon: BasicInfo;
  withName: boolean;
  size?: number;
}>();

const src = computed(() => {
  return `/sprites/${props.pokemon.number}.png`;

  const spriteNameRaw = props.pokemon.name.toLowerCase().replace(/ /g, '-');

  // some special cases...
  let spriteName: string;
  switch (spriteNameRaw) {
    case 'nidoran♀':
      spriteName = 'nidoran-f';
      break;
    case 'nidoran♂':
      spriteName = 'nidoran-m';
      break;
    case 'porygon-2':
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

  .sprite-image {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }

  &.with-name {
    padding-bottom: 1rem;
  }
}
</style>
