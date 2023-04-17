<template>
  <div class="fiche-pokemon">
    <h1>{{ pokemonName }}</h1>
    <img :src="pokemonImage" :alt="pokemonName">
    <div class="description">
      <p>pokémon n°{{pokemonOrder}}</p>
      <p>pokémon de type {{ pokemonTypes }}</p>
      <ul>
        Stats du pokémon
        <li v-for="(value, name) in pokemonStats" :key="name">
          {{ name }}: {{ value }}

        </li>
      </ul>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    /* J'utilise la methode data() qui me retourne un objet avec comme propriété un tableau vide */
    return {
      pokemon: {},
    };
  },

  async mounted() {
    console.log(this.team);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.pokemonName);
      const data = await response.json();
      
      /* J'utilise les données récupérées pour initialiser la propriété pokemon de mon composant */
      this.pokemon = {
        image: data.sprites.front_default,
       types: data.types,
       weigth: data.weight,
       stats: data.stats,
       order: data.order
      };
    } catch (error) {
      console.log(error);//eslint-disable-line
    }
  },
  computed: {
    pokemonName() {
      return this.$route.params.name;
    },
    pokemonImage() {
      return this.pokemon.image || '';
    },
    pokemonOrder(){
      return this.pokemon.order
    },
    pokemonTypes() {
    if (!this.pokemon.types) {
      return [];
    }
    return this.pokemon.types.map(type => type.type.name).join(',');
  },



  },
  
  
}
</script>