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
      <slot />
    </div>

    <div class="error" v-if="error">
      {{ error }}
    </div>
    <div class="error" v-if="slots.error">
      <slot name="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';

const isDragging = ref(false);

const slots = useSlots();

const emit = defineEmits<{
  (event: 'fileDropped', file: File | undefined): void;
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
    file = event.dataTransfer?.files[0];
  }

  emit('fileDropped', file);
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
