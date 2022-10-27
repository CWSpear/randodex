<template>
  <main :class="{ 'drop-zone': !pokemon.length }">
    <PokeDex v-if="pokemon.length" :pokemon="pokemon" :version="version" />
    <template v-else>
      <div class="info">
        <div class="title">Randomizer Log &rarr; PokeDex</div>
        <div class="notes">
          Transform your logs from the randomer into a more easily navigable PokeDex to view stats,
          moves and evolutions.
        </div>
      </div>

      <FileDropZone @fileDropped="pokemonLoaded($event)" />

      <div class="caveat">
        Beta v2 — Tested with FireRed logs. Reported to work with Gen 4 logs.
      </div>

      <div class="footer">
        Made by @AwesomeVolkner on the IronMON Discord.
        <a target="_blank" href="https://github.com/CWSpear/randodex">Source code on GitHub</a>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import FileDropZone from '@/components/FileDropZone.vue';
import PokeDex from '@/components/PokeDex.vue';
import { GameVersion, ParsedResults } from '@/tools/pokemon';
import type { Pokemon } from '@/tools/pokemon';
import { ref } from 'vue';

const pokemon = ref<Pokemon[]>([]);
const version = ref<GameVersion | null>(null);

function pokemonLoaded(results: ParsedResults) {
  pokemon.value = results.pokemon;
  version.value = results.version;
}
</script>

<style lang="scss" scoped>
.drop-zone {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.info {
  margin-bottom: 5rem;
  max-width: 80vw;
}

.title {
  font-size: 4rem;
}

.notes {
  font-size: 1.5rem;
}

.caveat {
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1rem 3rem;

  text-align: right;
  background-color: #333;
  color: whitesmoke;
}
</style>
