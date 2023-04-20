

<template>
  <div>
    <searchBar @search="filterPokemons" class="mb-"></searchBar>
    <template v-if="filteredPokemons && filteredPokemons.length > 0">
      <div class="row gallery">
        
        <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="col-sm-2">
          <div class="card mb-3">
            <img :src="pokemon.image" :alt="pokemon.name"/>
            <div class="card-body">
              <h5 class="card-title">{{ pokemon.name }}</h5>
              <div class="row btn-card">
              <div class="col-sm-6 btn">
                <button class="btn btn-secondary btn-rounded btn-sm text-sm" @click="addPokemonToTeam(pokemon)">Ajouter à l'équipe</button>
            </div>
            <div class="col-sm-6 btn">
              <router-link :to="`/fiche_pokemon/${pokemon.name}`">
               <CardBoutton  button-text="Plus de details"></CardBoutton>
              </router-link>
            </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </template>
    <p v-else>Aucun Pokémon trouvé</p>
    <pokemonTeam :team-pokemon="team" @remove-pokemon="removePokemon"></pokemonTeam>
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
          image: data.sprites.other["official-artwork"].front_default
          
        };
      }));
      this.pokemons = pokemons;
      this.filteredPokemons = pokemons; // j'initialise le filtre de pokemon avec la liste complète au départ.
    } catch (error) {
      console.log(error);//eslint-disable-line
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
