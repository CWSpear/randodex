<template>
  <div
    class="file-drop-zone"
    @drop.prevent="handleDrop($event)"
    @dragover.prevent
    @dragleave.prevent="isDragging = false"
    @dragenter.prevent="isDragging = true"
    :class="{ dragging: isDragging }"
  >
    Drop your&nbsp;
    <span class="code">seedname.gba.log</span>
    &nbsp;file here
  </div>
</template>

<script setup lang="ts">
import { parsePokemon } from '@/tools/parser';
import type { Pokemon } from '@/tools/pokemon';
import { getFileContents } from '@/tools/util';
import { ref } from 'vue';

const isDragging = ref(false);

const emit = defineEmits<{
  (event: 'fileDropped', pokemon: Pokemon[]): void;
}>();

async function handleDrop(event: DragEvent) {
  isDragging.value = false;

  let file: File | undefined;
  if (event.dataTransfer?.items) {
    const item = event.dataTransfer.items[0];
    if (item.kind === 'file') {
      file = item.getAsFile()!;
    }
  } else {
    file = event.dataTransfer?.files[0]!;
  }

  emit('fileDropped', parsePokemon(await getFileContents(file)));
}
</script>

<style lang="scss" scoped>
.file-drop-zone {
  width: 80vw;
  height: 50vh;
  border: 4px dashed grey;
  background: whitesmoke;
  display: flex;
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
}
</style>
