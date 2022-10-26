<template>
  <div class="modal">
    <PokemonTypeBackground class="type-background" :pokemon="pokemon" />

    <div class="scroll-area" @click="closeModal($event)">
      <div class="pokemon-details">
        <PokemonSprite :size="3" :withName="true" :pokemon="pokemon" />

        <div class="type-and-abilities" v-if="pokemon.type1 || pokemon.ability1">
          <div class="types">
            <template v-if="pokemon.type1">
              <PokemonType :type="pokemon.type1" />
            </template>
            <template v-if="pokemon.type2">
              &nbsp;/&nbsp;
              <PokemonType :type="pokemon.type2" />
            </template>
          </div>
          <div class="abilities" v-if="pokemon.ability1">
            <table class="stats-table table">
              <tr>
                <th title="Health Points">Ability 1</th>
                <td>{{ pokemon.ability1 }}</td>
              </tr>
              <tr v-if="pokemon.ability2">
                <th title="Attack">Ability 2</th>
                <td>{{ pokemon.ability2 }}</td>
              </tr>
            </table>
          </div>
        </div>

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

        <div class="evolutions" v-if="pokemon.evolutions.length">
          <PokemonTypeBackground :pokemon="pokemon" class="evo-sprite">
            <PokemonSprite :size="1" :pokemon="pokemon" :withName="false" />
          </PokemonTypeBackground>

          <img class="arrow" width="64" src="/right-arrow.svg" alt="evolves into" />

          <div class="possible-evos">
            <a
              class="evo-sprite linkable-evo-sprite"
              v-for="evolution in pokemon.evolutions"
              :key="evolution.name"
              :href="`#${evolution.name}`"
            >
              <PokemonTypeBackground :pokemon="evolution">
                <PokemonSprite :size="1" :pokemon="evolution" :withName="false" />
              </PokemonTypeBackground>
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
import PokemonType from '@/components/PokemonType.vue';
import StatsChart from '@/components/StatsChart.vue';
import PokemonTypeBackground from '@/PokemonTypeBackground.vue';
import type { BasicInfo, Meta, Pokemon } from '@/tools/pokemon';
import { closePokemonModal } from '@/tools/select';
import { computed, ref } from 'vue';

const props = defineProps<{
  pokemon: Pokemon;
  meta: Meta;
}>();

const showMoves = ref(true);

const showMachines = ref(true);

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
  margin-bottom: 1rem;

  .arrow {
    margin: 0 1rem 1rem;
  }

  .evo-sprite {
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem;

    &.linkable-evo-sprite {
      display: block;

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
  padding: 1rem 2rem 2rem;

  text-align: center;
}

.type-and-abilities {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .types {
    display: flex;
    align-items: center;
  }

  .abilities {
    margin-top: 2rem;
  }
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
