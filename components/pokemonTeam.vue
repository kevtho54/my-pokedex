<template>
  <div class="team">
    <div v-if="teamPokemon.length > 0" class="row my-team mx-auto">
      <h2 class="team-title">Mon Équipe</h2>
      <div v-for="pokemon,index in teamPokemon" :key=index class="slot col-sm-2 ">
        <template v-if="pokemon">
          <img class="w-75" :src="pokemon.image" :alt="pokemon.name" />
          <div class="name">{{ pokemon.name }}</div>
          <button class="btn btn-secondary btn-rounded btn-sm text-sm" @click="removePokemon(pokemon)">Supprimer</button>
        </template>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teamPokemon: {
      type: Array,
      default: () => []
    }
  },
  
  
  methods:{
   
    

    removePokemon(pokemon) {
      this.$emit('remove-pokemon', pokemon);
    },
    
  },
  

};
</script>
