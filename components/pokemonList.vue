

<template>
  <div>
    <searchBar @search="filterPokemons" class="mb-"></searchBar>
    <pokemonTeam :team-pokemon="team" @remove-pokemon="removePokemon"></pokemonTeam>
    <template v-if="filteredPokemons && filteredPokemons.length > 0">
      <div class="row gallery">
        
        <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="col-sm-2">
          <div class="card">
            <nuxt-link :to="`/fiche_pokemon/${pokemon.name}`" class="card mb-3">
              <img :src="pokemon.image" :alt="pokemon.name"/>
            </nuxt-link>
              <div class="card-body">
                <p class="order"> n° {{ pokemon.order }}</p>
                <h5 class="card-title">{{ pokemon.name }}</h5>
                <div class="contenerTypes" >
                 
                  <p class="type" v-for="(type, index) in pokemon.types" :key="index" :style="{backgroundColor: getTypeColor(type.type.name)}"> {{ type.type.name}}</p>
              </div>
                <div class="row btn-card">
                <div class="col btn">
                  <button class="btn btn-secondary btn-rounded btn-sm text-sm" @click="addPokemonToTeam(pokemon)">Ajouter à l'équipe</button>
                </div>
            </div>
          </div>
          </div>
        </div>
        <div v-if="index === 5 && types.length > 5">
        <button @click="showMore"> afficher plus de pokemon</button>
      </div>
      </div>
    </template>
    <p v-else>Aucun Pokémon trouvé</p>
  </div>
</template>

<script>
import searchBar from '../components/searchBar.vue'
import CardBoutton from './cardBoutton.vue';
import pokemonTeam from './pokemonTeam.vue'



export default {
  components:{
    searchBar,
    CardBoutton,
    pokemonTeam
},

  data() {
    /* J'utilise  la methode data() qui me retourne un objet avec comme propriété un tableau vide */
    return {
      pokemons: [],
      filteredPokemons:[],
      team: [],
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
      showCount:5,
      
     
      
    };
  },

  /* J'utilise ici la methode "mounted" car mon composant est monté, j'effectue un fetch pour récupéré les données de l'api */
  async mounted() {
    console.log(this.team);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
      const { results } = await response.json();

      /* J'utilise promise.all pour exécuter de manière asynchrone une fonction qui récupère les données de chaque pokemon individuellement en utilisant l'URL de chaque objet pokemon. 
      J'utilise ensuite la méthode map  qui itère sur chaque pokémon dans le tableau, ensuite, j'utilise un fetch pour recupéré les données de l'url de chaque pokémon */
      const pokemons = await Promise.all(results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          order: data.id,
          types: data.types
          
        };
      }));
      this.pokemons = pokemons;
      this.filteredPokemons = pokemons; // j'initialise le filtre de pokemon avec la liste complète au départ.
    } catch (error) {
      console.log(error);//eslint-disable-line
    }
  },
  
computed: {
  displayedTypes() {
    return this.types.slice(0, this.showCount);
  }
},
  methods: {
    filterPokemons(searchTerm) {
      if (!searchTerm) {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(pokemon => {
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        });
      }
    },
    getTypeColor(type){
    return this.typeColors[type] || "gray"
    },
    showMore(){
      this.showCount = this.types.length;
    },
  
  addPokemonToTeam(pokemon) {
    
    console.log("le pokemon a été ajouté ", pokemon.name);
    const added = this.team.some(teamPokemon => {
      return teamPokemon && teamPokemon.name === pokemon.name;
    });
    if (!added) {
      if (this.team.length < 6) {
        this.team.push({
          name: pokemon.name,
          image: pokemon.image,
          // ajoutez d'autres propriétés ici si nécessaire
        });

        this.$set(this.team, this.team.length - 1, pokemon);
        
        console.log("equipe:",this.team);
        return true;
      } else {
        alert('Vous ne pouvez avoir que 6 Pokémon dans votre équipe');
        return false;
      }
    } else {
      alert('Ce Pokémon est déjà dans votre équipe');
      return false;
    }
  },
  selectPokemon(pokemon) {
    this.selectedPokemon = pokemon;
  },

  removePokemon(pokemon) {
  // Trouve l'index du pokemon à enlever dans l'équipe en utilisant la méthode findIndex() 
  const index = this.team.findIndex(teamPokemon => {
    return teamPokemon && teamPokemon.name === pokemon.name;
  });
  // Vérifie si l'index est supérieur à -1, c'est-à-dire si le pokemon a été trouvé dans l'équipe
  if (index > -1) {
    // Si oui, supprime le pokemon de l'équipe en utilisant la méthode splice()
    // La méthode splice() prend deux arguments : l'index de départ et le nombre d'éléments à supprimer
    this.team.splice(index, 1);
   }
  }
 }
};
</script>
