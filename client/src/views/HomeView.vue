<template>
  <main :class="{ 'drop-zone': !logIsLoaded }">
    <PokeDex v-if="logIsLoaded" />
    <template v-else>
      <div class="info">
        <div class="title">Randomizer Log &rarr; PokeDex</div>
        <div class="notes">
          Transform your logs from the randomer into a more easily navigable PokeDex to view stats,
          moves and evolutions.
        </div>
      </div>

      <FileDropZone @fileDropped="handleFile($event)">
        Drop your
        <span class="code">seedname.gba.log</span>
        file here

        <template v-if="error" #error>
          {{ error }}
        </template>
      </FileDropZone>

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
import { parseGameVersion, parseMachines, parseMoves, parsePokemon } from '@/tools/parser';
import { store } from '@/tools/store';
import { getFileContents, getLogFormat } from '@/tools/util';
import { computed, ref } from 'vue';

const logIsLoaded = computed<boolean>(() => store.pokemon.length > 0);
const error = ref('');

async function handleFile(file?: File) {
  try {
    const logContents = await getFileContents(file);

    store.logFormat = getLogFormat(file?.name);
    store.version = parseGameVersion(logContents);

    const parsed = parsePokemon(logContents);

    store.pokemon = parsed;
    store.machines = parseMachines(logContents);
    store.moves = parseMoves(logContents);

    console.log('Detected Version:', store.version);

    if (parsed.length === 0) {
      error.value =
        'This tool currently only works if you at least shuffle/randomize base stats. If you think this is a mistake, please share your log with AwesomeVolkner on the IronMON Discord';
    }
  } catch (err) {
    console.error('Error parsing file', err);
    error.value =
      'There was an error parsing your log. Try reaching out to AwesomeVolkner on the IronMON Discord.';
  }
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

.code {
  background: rgba(#ffba48, 0.4);
  padding: 0 0.7rem;
  border: rgba(#ffba48, 0.8) 4px solid;
  border-radius: 4px;
  pointer-events: none;
}
</style>
