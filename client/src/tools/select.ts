import router from '@/router';
import type { Pokemon } from '@/tools/pokemon';
import { ref } from 'vue';

const _pokeHash = ref('');

function setPokeHash(hash: string) {
  if (_pokeHash.value === hash) {
    return;
  }

  _pokeHash.value = hash || '';
  router.push({ hash: hash ? `#${hash}` : undefined });
}

export function getPokeHash(): string {
  return _pokeHash.value;
}

const _pokemonForModal = ref<Pokemon | null>(null);

export function getPokemonForModal(): Pokemon | null {
  return _pokemonForModal.value;
}

export function openPokemonModal(pokemon: Pokemon, setHash = true) {
  _pokemonForModal.value = pokemon;

  if (setHash) {
    setPokeHash(pokemon.name);
  }
}

export function closePokemonModal() {
  _pokemonForModal.value = null;
  setPokeHash('');
}
