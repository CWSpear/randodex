<template>
  <div class="pokedex-wrapper">
    <PokemonSearch class="search" @search="searchStr = $event" />

    <div class="pokedex">
      <PokemonCard
        :meta="meta"
        class="pokecard"
        v-for="mon in filteredPokemon"
        :key="mon.number"
        :pokemon="mon"
      />
      <div class="empty pokecard"><!-- intentionally left here --></div>
      <div class="empty pokecard"><!-- intentionally left here --></div>
      <div class="empty pokecard"><!-- intentionally left here --></div>
      <div class="empty pokecard"><!-- intentionally left here --></div>
      <div class="empty pokecard"><!-- intentionally left here --></div>
      <div class="empty pokecard"><!-- intentionally left here --></div>

      <PokemonModal v-if="pokemonModal" :pokemon="pokemonModal" :meta="meta" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonModal from '@/components/PokemonModal.vue';
import PokemonSearch from '@/components/PokemonSearch.vue';
import router from '@/router';
import type { Meta, Pokemon } from '@/tools/pokemon';
import { closePokemonModal, getPokemonForModal, openPokemonModal } from '@/tools/select';
import { flatMap, max, maxBy, min, minBy } from 'lodash';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pokemonModal = computed(() => getPokemonForModal());

const props = defineProps<{
  pokemon: Pokemon[];
}>();

const filteredPokemon = computed(() =>
  props.pokemon.filter(
    (mon) => !searchStr.value || mon.name.toLowerCase().includes(searchStr.value?.toLowerCase()),
  ),
);

const searchStr = ref('');

watch(
  () => route.hash?.replace('#', '') || '',
  (hash) => {
    const pokemon = props.pokemon.find((mon) => mon.name === hash);
    if (pokemon) {
      openPokemonModal(pokemon, false);
    } else {
      closePokemonModal();
    }
  },
);

const meta = computed<Meta>(() => ({
  minHp: minBy(props.pokemon, (mon) => mon.hp)!.hp,
  maxHp: maxBy(props.pokemon, (mon) => mon.hp)!.hp,
  minAttack: minBy(props.pokemon, (mon) => mon.attack)!.attack,
  maxAttack: maxBy(props.pokemon, (mon) => mon.attack)!.attack,
  minDefense: minBy(props.pokemon, (mon) => mon.defense)!.defense,
  maxDefense: maxBy(props.pokemon, (mon) => mon.defense)!.defense,
  minSpecialAttack: minBy(props.pokemon, (mon) => mon.specialAttack)!.specialAttack,
  maxSpecialAttack: maxBy(props.pokemon, (mon) => mon.specialAttack)!.specialAttack,
  minSpecialDefense: minBy(props.pokemon, (mon) => mon.specialDefense)!.specialDefense,
  maxSpecialDefense: maxBy(props.pokemon, (mon) => mon.specialDefense)!.specialDefense,
  minSpeed: minBy(props.pokemon, (mon) => mon.speed)!.speed,
  maxSpeed: maxBy(props.pokemon, (mon) => mon.speed)!.speed,
  min: min(
    flatMap(props.pokemon, (mon) => [
      mon.hp,
      mon.attack,
      mon.defense,
      mon.specialAttack,
      mon.specialDefense,
      mon.speed,
    ]),
  )!,
  max: max(
    flatMap(props.pokemon, (mon) => [
      mon.hp,
      mon.attack,
      mon.defense,
      mon.specialAttack,
      mon.specialDefense,
      mon.speed,
    ]),
  )!,
}));
</script>

<style lang="scss" scoped>
.pokedex-wrapper {
  position: relative;
}

.search {
  position: sticky;
  top: 0;
  z-index: 1;
}

.pokedex {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.pokecard {
  flex: 1 0 405px;
  min-width: 405px;

  .empty {
    //height: 1px;
  }
}
</style>
