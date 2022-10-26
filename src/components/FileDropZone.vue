<template>
  <div
    class="file-drop-zone"
    @drop.prevent="handleDrop($event)"
    @dragover.prevent
    @dragleave.prevent="isDragging = false"
    @dragenter.prevent="isDragging = true"
    :class="{ dragging: isDragging }"
  >
    <div class="msg">
      Drop your
      <span class="code">seedname.gba.log</span>
      file here
    </div>

    <div class="error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseGameVersion, parsePokemon } from '@/tools/parser';
import type { Pokemon } from '@/tools/pokemon';
import { getFileContents } from '@/tools/util';
import { ref } from 'vue';

const isDragging = ref(false);

const emit = defineEmits<{
  (event: 'fileDropped', pokemon: Pokemon[]): void;
}>();

const error = ref('');

async function handleDrop(event: DragEvent) {
  isDragging.value = false;
  error.value = '';

  let file: File | undefined;
  if (event.dataTransfer?.items) {
    const item = event.dataTransfer.items[0];
    if (item.kind === 'file') {
      file = item.getAsFile()!;
    }
  } else {
    file = event.dataTransfer?.files[0]!;
  }

  try {
    const logContents = await getFileContents(file);

    console.log('version', parseGameVersion(logContents));

    const parsed = parsePokemon(logContents);
    emit('fileDropped', parsed);

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
.file-drop-zone {
  width: 80vw;
  height: 50vh;
  border: 4px dashed grey;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;

  &.dragging {
    background: lightgray;
  }
}

.code {
  background: rgba(#ffba48, 0.4);
  padding: 0 0.7rem;
  border: rgba(#ffba48, 0.8) 4px solid;
  border-radius: 4px;
  pointer-events: none;
}

.error {
  pointer-events: none;
  font-size: 1rem;
  background-color: rgba(#ff3844, 0.4);
  padding: 0.5rem 1rem;
  max-width: 80%;
}

.msg {
  pointer-events: none;
}
</style>
