<template>
  <div class="team">
    <div class="row">
      <div v-for="pokemon,index in teamPokemon" :key=index class="slot col-sm-2">
        <h2>Mon Équipe</h2>
        <template v-if="pokemon">
          <img class="w-75" :src="pokemon.image" :alt="pokemon.name" />
          <div class="name">{{ pokemon.name }}</div>
          <button class="btn btn-secondary btn-rounded btn-sm text-sm" @click="removePokemon(pokemon)">Supprimer de l'équipe</button>
        </template>
        <div v-else class="empty-slot">Emplacement vide</div>
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
    }
  },

};
</script>
