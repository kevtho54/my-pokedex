<template>
  <div>
  <h1 class=" text-center">Mon pokedex</h1>
  <Pokemon-List/>
</div>
</template>

<script>
import PokemonList from '../components/pokemonList.vue';

export default {
    name: "IndexPage",
    components: { PokemonList }
}
</script>
