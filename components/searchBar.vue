<template>
    <div>
        <input v-model="searchPokemon" type="text" placeholder="Rechercher un pokémon">
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