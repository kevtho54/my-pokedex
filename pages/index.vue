<template>
  <div class="page">
  
    <img src="../static/img/logo.png" alt="logo pokemon" class="logo center">
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
