<template>
  <div class="fiche-pokemon">
   <nuxt-link to="/" class="btn">Retour</nuxt-link>
    <h1>Fiche de {{ pokemonName }}</h1>
    <img :src="pokemonImage" :alt="pokemonName">
    <div class="description">
      <p>pokémon n°{{pokemonOrder}}</p>
      <p>pokémon de type {{ pokemonTypes }}</p>
      <ul>
        <li v-for="stat in pokemonStats">
        {{ stat.name }}: {{ stat.base_stat }}
      </li>
      </ul>
      <p> Poid : {{ pokemonWeight }} kg</p>
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
       sprites: data.sprites,
       types: data.types,
       weight: data.weight,
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
  if (!this.pokemon.sprites) {
    return null
  }
  return this.pokemon.sprites.other["official-artwork"].front_default
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
  pokemonStats (){
    if (!this.pokemon.stats){
      return []
    }
    return this.pokemon.stats.map(stat =>{
      
    return {
      name: stat.stat.name,
      base_stat: stat.base_stat
    }
   } )
  },
  pokemonWeight() {
   return this.pokemon.weight
  }


  },
  
  
}
</script>