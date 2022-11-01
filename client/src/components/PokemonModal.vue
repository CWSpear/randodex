<template>
  <div class="modal">
    <div class="close" @click="closeModal()">&times;</div>

    <PokemonTypeBackground class="type-background" :pokemon="pokemon" />

    <div class="scroll-area" @click="closeModal($event)">
      <div class="pokemon-details">
        <PokemonSprite :size="3" :withName="false" :pokemon="pokemon" />
        <h1>{{ pokemon.name }}</h1>

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
                <th>Ability 1</th>
                <td>{{ pokemon.ability1 }}</td>
              </tr>
              <tr v-if="pokemon.ability2">
                <th>Ability 2</th>
                <td>{{ pokemon.ability2 }}</td>
              </tr>
              <tr v-if="pokemon.ability3">
                <th>Ability 3</th>
                <td>{{ pokemon.ability3 }}</td>
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
            <!--<tr class="row">-->
            <!--  <th title="Base Stat Total" class="bst header">BST</th>-->
            <!--  <td class="bst cell">{{ sumOfStats }}</td>-->
            <!--</tr>-->
          </table>

          <StatsChart :pokemon="pokemon" />
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

        <div class="moves-and-machines">
          <div class="moves-table-wrapper" v-if="pokemon.moves && pokemon.moves.length > 0">
            <div class="toggle-wrapper" v-if="gymTMs.length > 0">
              <!-- for spacing purposes -->
              &nbsp;
            </div>
            <table class="moves-table table">
              <tr :key="move.level + move.name" v-for="move in pokemon.moves">
                <th class="move-level">Level {{ move.level }}</th>
                <td class="move-name">{{ move.name }}</td>
              </tr>
            </table>
          </div>

          <div
            class="machines-table-wrapper"
            v-if="pokemon.machines && pokemon.machines.length > 0"
          >
            <div class="toggle-wrapper" v-if="gymTMs.length > 0">
              <Toggle class="no-outline" v-model="store.userOptions.filterGymTms" />
              Filter Gym TMs
            </div>

            <table
              class="machines-table table"
              v-if="gymTMs.length > 0 && store.userOptions.filterGymTms"
            >
              <tr
                :key="machine.number + '' + (machine.isHM + '')"
                v-for="machine in gymTMs"
                :class="{ unlearnable: !knowsGymTm(machine) }"
              >
                <th class="machine-number-and-leader-name">
                  <div class="flex">
                    <span class="leader-name" v-if="machine.gymLeader">
                      {{ machine.gymLeader }}
                    </span>
                    <strong class="machine-number">{{ machineToStr(machine) }}</strong>
                  </div>
                </th>
                <td class="machine-name">
                  {{ machine.move }}
                </td>
              </tr>
            </table>

            <table class="machines-table table" v-else>
              <tr
                :key="machine.number + '' + (machine.isHM + '')"
                v-for="machine in pokemon.machines"
              >
                <th class="machine-number">
                  <div class="flex">
                    <span class="leader-name" v-if="machine.gymLeader">
                      {{ machine.gymLeader }}
                    </span>
                    <strong>{{ machineToStr(machine) }}</strong>
                  </div>
                </th>
                <td class="machine-name">
                  {{ machine.move }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { store } from '@/tools/store';
import Toggle from '@vueform/toggle';
import PokemonSprite from '@/components/PokemonSprite.vue';
import PokemonType from '@/components/PokemonType.vue';
import PokemonTypeBackground from '@/components/PokemonTypeBackground.vue';
import StatsChart from '@/components/StatsChart.vue';
import type { Machine, Pokemon } from '@/tools/pokemon';
import { machineToStr } from '@/tools/util';
import { computed, ref } from 'vue';

const props = defineProps<{
  pokemon: Pokemon;
}>();

// sumOfStats !== BST
const sumOfStats = computed<number>(
  () =>
    props.pokemon.hp +
    props.pokemon.attack +
    props.pokemon.defense +
    props.pokemon.specialAttack +
    props.pokemon.specialDefense +
    props.pokemon.speed,
);

const gymTMs = computed(() => {
  return store.machines.filter((machine) => !!machine.gymLeader);
});

function knowsGymTm(machine: Machine) {
  return !!props.pokemon.machines.find((m) => !m.isHM && m.number === machine.number);
}

function closeModal(event?: MouseEvent) {
  if (event) {
    if (!(<HTMLElement>event?.target).classList.contains('scroll-area')) {
      // event.preventDefault();
      // event.stopPropagation();
      return;
    }
  }

  store.selectedPokemonName = null;
}
</script>

<style lang="scss" scoped>
$gridLineColor: #ccc;

h1 {
  line-height: 2rem;
}

.close {
  position: absolute;
  z-index: 6;
  right: 0.5rem;
  top: 0;
  font-size: 10rem;
  line-height: 10rem;
  height: 10rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

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

.moves-and-machines {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rem;
}

.pokemon-details {
  cursor: auto;
  background: white;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem 2rem 2rem;

  text-align: center;
}

.type-and-abilities {
  margin-top: 1.5rem;
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
  cursor: pointer;
}

.machine-number {
  white-space: nowrap;
  vertical-align: middle;
}

.leader-name {
  font-weight: 400;
  font-size: 0.7rem;
  margin-right: 0.25rem;
}

.flex {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.toggle-wrapper {
  height: 40px;
}

.unlearnable {
  $opacity: 0.7;

  .machine-number {
    opacity: $opacity;
    text-decoration: line-through;
  }
  .machine-number-and-leader-name,
  .machine-name {
    opacity: $opacity;
  }
}
</style>

<style src="@vueform/toggle/themes/default.css"></style>
