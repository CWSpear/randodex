<template>
  <div class="stat-chart">
    <Radar :chartOptions="chartOptions" :chartData="chartData" />
  </div>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/tools/pokemon';
import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
} from 'chart.js';
import { computed } from 'vue';
import { Radar } from 'vue-chartjs';

ChartJS.register(Title, PointElement, RadialLinearScale, LineElement, Filler);

const props = defineProps<{
  pokemon: Pokemon;
}>();

// vite is freaking out at this, but nothing else seems to mind
// const chartData = computed<ChartData<'radar'>>(() => ({
const chartData = computed(() => ({
  labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
  datasets: [
    {
      backgroundColor: 'rgba(79, 142, 224, 0.2)',
      borderColor: 'rgba(79, 142, 224, 1)',
      pointBackgroundColor: 'rgba(79, 142, 224, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(79, 142, 224, 1)',
      data: [
        props.pokemon.hp,
        props.pokemon.attack,
        props.pokemon.defense,
        props.pokemon.specialAttack,
        props.pokemon.specialDefense,
        props.pokemon.speed,
      ],
    },
  ],
}));

// vite is freaking out at this, but nothing else seems to mind
// const chartOptions = computed<ChartOptions>(() => ({
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  font: {
    size: 16,
  },
  scales: {
    r: {
      suggestedMin: 0,
      // suggestedMax: store.extra.max,
      pointLabels: {
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}));
</script>
