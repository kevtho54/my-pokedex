<template>
  <div class="fiche-pokemon">
  
    <img class="logo" src="@/static/img/logo.png" alt="logo pokedex">
    <div class="contener-sheet">
      <h1 class="title">Fiche de {{ pokemonName }}</h1> 
      <div class="contener-card">
        <div class="description">
          <p class="txt">pokémon n°{{pokemonOrder}}</p>
          <p class="txt">pokémon de type {{ pokemonTypes }}</p>
          <p class="txt"> Statistique du pokémon: </p>
          <ul class="stats">
            <li v-for="stat in pokemonStats">
              {{ stat.name }}: {{ stat.base_stat }}
            </li>
          </ul>
          <p> Poid : {{ pokemonWeight }} kg</p>
        </div>

        <!-- J'utilise une boucle v-for pour recupéré le background en fonction du type de pokemon. J'utilise ensuite la variable "btnColor" pour stocké la couleur et la réutilisé sur mon bouton retour -->

        <div v-for="(type,index) in pokemon.types" :key="index" v-if="index ===0" :style="{ backgroundColor: btnColor=getTypeColor(pokemon.types[0].type.name)}" class="contener-img">
          <img :src="pokemonImage" :alt="pokemonName" class="img-pokemon">
        </div>
      </div>
      <nuxt-link to="/" class="btn-back rounded-pill text-center" :style="{backgroundColor: btnColor}">Retour au pokedex</nuxt-link>
      
  </div>
    
  </div>
</template>

<script>


export default {
  data() {
    /* J'utilise la methode data() qui me retourne un objet avec comme propriété un tableau vide */
    return {
      pokemon: {},
      btnColor: null,
      typeColors: {
        grass: "#67a300",
        poison: "#c75db0",
        fire: "#e68330",
        flying: "#c9c8e8",
        water: "#089bff",
        bug: "#A8B820",
        normal: "#A8A878",
        electric:"#F8D030",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#C03028",
        psychic:"#F85888",
        rock: "#B8A038",
        steel : "#B8B8D0",
        ice: "#98D8D8",
        ghost : "#705898",
        dragon : "#7038F8"
      },
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
  },

  
},
methods: {
    getTypeColor(type){
      return this.typeColors[type] || "gray"
      },

  }
  
  
}
</script>