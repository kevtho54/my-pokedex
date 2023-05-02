<template>
    <div class="search-bar input-group-lg">
        <input class="input-group-lg" v-model="searchPokemon" type="text" placeholder="Rechercher un pokémon">
    </div>
</template>

<script>


export default {
    data(){
    return{
    searchPokemon: ''
    }
 },
 watch:{
 searchPokemon(newPokemon){
     this.$emit('search', newPokemon)
 }
 }
}

</script>