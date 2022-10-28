<template>
  <div class="search">
    <input autofocus placeholder="Search" type="text" v-model="searchStr" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const emit = defineEmits<{
  (event: 'search', str: string): void;
}>();

const searchStr = ref('');

watch(searchStr, (str: string) => {
  emit('search', str);
});
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: #eee;

  input {
    width: 100%;
    font-size: 24px;
    font-family: monospace;
  }
}
</style>
