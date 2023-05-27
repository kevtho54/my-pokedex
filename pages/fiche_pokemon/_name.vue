<template>
  <div class="fiche-pokemon">
    
    <img class="logo" src="@/static/img/logo.png" alt="logo pokedex">
    <div class="contener-sheet">
      <div class="title-type">
      <h1 class="title mb-2 text-center">{{ pokemonName }}</h1> 
      <div class="row text-center">
                <div class="contenerTypes col-sm-12">
                  <p class="type" v-for="(type, index) in pokemon.types" :key="index" :style="{backgroundColor: getTypeColor(type.type.name)}"> {{ type.type.name}}</p>
                </div>
              </div>
            </div>
            <div  @click="toggleCollapse" class="containerCollapse text-center">
             <div    class= "Collapse text-center" :style="{backgroundColor:btnColor}">
              <p class="mb-0"> Le saviez-vous ?</p>
              <img class="arrow-down" :class= "{'arrow-up': isCollapsed}" src="@/static/img/vector.svg" alt="arrow">
             </div>
             <div class="collapseContent" v-if="isCollapsed">
               <p>{{ pokemonDescriptions }}</p>
             </div>
            </div>

      <div class="contener-card">
        <div class="description">
          <div class="details mb-3">
            <p class="txt mb-0">pokémon n°{{pokemonOrder}}</p>
            <p class="mb-0"> Poid : {{ pokemonWeight }} g</p>
          </div>

          <div class="container p-0">
            <div class=" stats row pt-2">
              <div v-for="stat in pokemonStats" class="p-0">
                <p class="mb-0">{{ stat.name }}</p>
                <div class="progress-bar p-1 rounded" :style="{width: getProgressBar(stat), backgroundColor:btnColor}">
                  <p class="mb-0">{{ stat.base_stat }}</p> 
                </div>
                <div class="progress-bar-max p-1 rounded"></div>
            </div>
          </div>
            
          </div>
        </div>
        
        <!-- J'utilise une boucle v-for pour recupéré le background en fonction du type de pokemon. J'utilise ensuite la variable "btnColor" pour stocké la couleur et la réutilisé sur mon bouton retour -->
        
        <div v-for="(type,index) in pokemon.types" :key="index" v-if="index ===0" :style="{ backgroundColor: btnColor=getTypeColor(pokemon.types[0].type.name)}" class="contener-img">
          <img :src="pokemonImage" :alt="pokemonName" class="img-pokemon">
        </div>
      </div>
      <nuxt-link to="/" class="btn-back rounded-pill text-center text-sm" :style="{backgroundColor: btnColor}">Retour au pokedex</nuxt-link>
      
    </div>
    
  </div>
</template>

<script>


export default {
  data() {
   
    return {
      pokemon: {},
      pokemonDescriptions: '',
      isCollapsed: false,
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
       // recupération des données de l'api
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.pokemonName);
      const data = await response.json();
      // récupération des données de l'url présente dans l'api  
      const speciesResponse = await fetch(data.species.url)
      const speciesData = await speciesResponse.json()
    
      // récupération du texte uniquement en francais présent dans l'api
      for (const entry of speciesData.flavor_text_entries) {
        if (entry.language.name === 'fr'){
          this.pokemonDescriptions = entry.flavor_text;
          break;
        }
      }
  
      /* J'utilise les données récupérées pour initialiser la propriété pokemon de mon composant */
      this.pokemon = {
       sprites: data.sprites,
       types: data.types,
       weight: data.weight,
       stats: data.stats,
       order: data.order,
       entries:data.species.url
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
    return this.pokemon.types.map(type => type.type.name).join('');
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

      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed
      },
      getProgressBar(stat){
        return (stat.base_stat / 255)*100+'%'
      }
  }
  
  
}
</script>