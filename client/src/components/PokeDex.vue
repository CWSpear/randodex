<template>
  <div class="pokedex-wrapper">
    <PokemonSearch class="search" @search="searchStr = $event" />

    <div class="pokedex">
      <PokemonCard
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

      <PokemonModal v-if="pokemonModal" :pokemon="pokemonModal" />
    </div>

    <div class="reset" @click="reset()">Upload a New Log</div>
  </div>
</template>

<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonModal from '@/components/PokemonModal.vue';
import PokemonSearch from '@/components/PokemonSearch.vue';
import type { Pokemon } from '@/tools/pokemon';
import { closePokemonModal, getPokemonForModal, openPokemonModal } from '@/tools/select';
import { store } from '@/tools/store';
import { flatMap, max, min } from 'lodash';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pokemonModal = computed(() => getPokemonForModal());

const pokemon = computed<Pokemon[]>(() => store.pokemon);

const filteredPokemon = computed(() =>
  pokemon.value.filter(
    (mon) => !searchStr.value || mon.name.toLowerCase().includes(searchStr.value?.toLowerCase()),
  ),
);

const searchStr = ref('');

function reset() {
  window.location.reload();
}

watch(
  () => route.hash?.replace('#', '') || '',
  (hash) => {
    const mon = pokemon.value.find((pkmn) => pkmn.name === hash);
    if (mon) {
      openPokemonModal(mon, false);
    } else {
      closePokemonModal();
    }
  },
);

store.extra = {
  // minHp: minBy(pokemon.value, (mon) => mon.hp)!.hp,
  // maxHp: maxBy(pokemon.value, (mon) => mon.hp)!.hp,
  // minAttack: minBy(pokemon.value, (mon) => mon.attack)!.attack,
  // maxAttack: maxBy(pokemon.value, (mon) => mon.attack)!.attack,
  // minDefense: minBy(pokemon.value, (mon) => mon.defense)!.defense,
  // maxDefense: maxBy(pokemon.value, (mon) => mon.defense)!.defense,
  // minSpecialAttack: minBy(pokemon.value, (mon) => mon.specialAttack)!.specialAttack,
  // maxSpecialAttack: maxBy(pokemon.value, (mon) => mon.specialAttack)!.specialAttack,
  // minSpecialDefense: minBy(pokemon.value, (mon) => mon.specialDefense)!.specialDefense,
  // maxSpecialDefense: maxBy(pokemon.value, (mon) => mon.specialDefense)!.specialDefense,
  // minSpeed: minBy(pokemon.value, (mon) => mon.speed)!.speed,
  // maxSpeed: maxBy(pokemon.value, (mon) => mon.speed)!.speed,
  min: min(
    flatMap(pokemon.value, (mon) => [
      mon.hp,
      mon.attack,
      mon.defense,
      mon.specialAttack,
      mon.specialDefense,
      mon.speed,
    ]),
  )!,
  max: max(
    flatMap(pokemon.value, (mon) => [
      mon.hp,
      mon.attack,
      mon.defense,
      mon.specialAttack,
      mon.specialDefense,
      mon.speed,
    ]),
  )!,
};
</script>

<style lang="scss" scoped>
.pokedex-wrapper {
  position: relative;
  padding-bottom: 5rem;
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
  flex: 1 0 320px;
  min-width: 320px;

  .empty {
    //height: 1px;
  }
}

.reset {
  position: fixed;
  z-index: 1;
  background: lightgray;
  cursor: pointer;
  right: 1rem;
  bottom: 1rem;
  font-size: 1.5rem;
  padding: 0rem 2rem;
  border-radius: 30px;
  border: 4px solid darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  &:hover {
    background: darkgray;
  }
}
</style>
