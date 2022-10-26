<template>
  <div class="modal">
    <PokemonTypeBackground class="type-background" :pokemon="pokemon" />

    <div class="scroll-area" @click="closeModal($event)">
      <div class="pokemon-details">
        <PokemonSprite :withName="true" :pokemon="pokemon" />

        <div class="stats">
          <table class="stats-table table">
            <tr class="row">
              <th title="Health Points" class="hp header">HP</th>
              <td class="hp cell">{{ pokemon.hp }}</td>
            </tr>
            <tr class="row">
              <th title="Attack" class="attack header">ATK</th>
              <td class="attack cell">{{ pokemon.attack }}</td>
            </tr>
            <tr class="row">
              <th title="Defense" class="defense header">DEF</th>
              <td class="defense cell">{{ pokemon.defense }}</td>
            </tr>
            <tr class="row">
              <th title="Special Attack" class="special-attack header">SATK</th>
              <td class="special-attack cell">{{ pokemon.specialAttack }}</td>
            </tr>
            <tr class="row">
              <th title="Special Defense" class="special-defense header">SDEF</th>
              <td class="special-defense cell">{{ pokemon.specialDefense }}</td>
            </tr>
            <tr class="row">
              <th title="Speed" class="speed header">SPD</th>
              <td class="speed cell">{{ pokemon.speed }}</td>
            </tr>
          </table>

          <StatsChart :meta="meta" :pokemon="pokemon" />
        </div>

        <div class="evolutions" v-if="evolutions.length">
          <PokemonSprite class="evo-sprite" :size="2" :pokemon="pokemon" :withName="false" />

          <img class="arrow" width="64" src="/right-arrow.svg" alt="evolves into" />

          <div class="possible-evos">
            <a
              v-for="evolution in evolutions"
              :key="evolution.name"
              :href="`#${evolution.name}`"
              class="evo-sprite linkable-evo-sprite"
            >
              <PokemonSprite :size="2" :pokemon="evolution" :withName="false" />
            </a>
          </div>
        </div>

        <div class="moves">
          <table class="moves-table table" v-if="showMoves">
            <tr :key="move.level + move.name" v-for="move in pokemon.moves">
              <th class="move-level">Level {{ move.level }}</th>
              <td class="move-name">{{ move.name }}</td>
            </tr>
          </table>

          <table class="machines-table table" v-if="showMachines">
            <tr
              :key="machine.number + '' + (machine.isHM + '')"
              v-for="machine in pokemon.machines"
            >
              <th class="machine-number">{{ machine.isHM ? 'H' : 'T' }}M {{ machine.number }}</th>
              <td class="machine-name">{{ machine.move }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PokemonSprite from '@/components/PokemonSprite.vue';
import StatsChart from '@/components/StatsChart.vue';
import PokemonTypeBackground from '@/PokemonTypeBackground.vue';
import type { Meta, Pokemon } from '@/tools/pokemon';
import { closePokemonModal } from '@/tools/select';
import { computed, ref } from 'vue';

const props = defineProps<{
  pokemon: Pokemon;
  meta: Meta;
}>();

const showMoves = ref(true);

const showMachines = ref(true);

const evolutions = computed<Pokemon[]>(() =>
  props.pokemon.evolutions.map((evo: string) => <Pokemon>{ name: evo }),
);

function closeModal(event?: MouseEvent) {
  if (event) {
    if (!(<HTMLElement>event?.target).classList.contains('scroll-area')) {
      // event.preventDefault();
      // event.stopPropagation();
      return;
    }
  }

  closePokemonModal();
}
</script>

<style lang="scss" scoped>
$gridLineColor: #ccc;

.table {
  margin-bottom: 2rem;
  border-collapse: collapse;

  tr {
    border-left: 1px solid $gridLineColor;
    border-bottom: 1px solid $gridLineColor;

    padding: 0.25rem 0.5rem;
  }

  td,
  th {
    border-right: 1px solid $gridLineColor;
    border-top: 1px solid $gridLineColor;
    padding: 0.2rem 0.5rem;
  }

  th {
    background-color: #eaeaea;
    font-weight: 700;
    text-align: right;
  }

  td {
    text-align: left;
  }
}

.stats {
  display: flex;
  align-items: center;
}

.evolutions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  .arrow {
    margin: 0 1rem;
  }

  .evo-sprite {
    background: #eee;
    border-radius: 50%;

    &.linkable-evo-sprite {
      &:hover {
        background: #ddd;
      }
    }
  }
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  .type-background {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }
}

.moves {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rem;
}

.pokemon-details {
  background: white;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  text-align: center;
}

.scroll-area {
  position: absolute;
  z-index: 4;
  max-height: 100vh;
  max-width: 100vw;
  min-height: 100vh;
  min-width: 100vw;
  overflow-y: auto;
  padding: 2rem;
}
</style>
