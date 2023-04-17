<template>
    <button class="btn btn-secondary btn-rounded btn-sm text-sm" @click="handleClick" >{{ buttonText }}</button>
</template>

<script>
export default{
    props:{
        buttonText:{
            type: String,
            required: true
        },
        route:{
            type: String,
            default: null
        },
        clickAction: {
            type: [Function,String],
            default: null
        }
    },
    methods:{
        handleClick(){
            if(this.route){
                this.$router.push(this.route)
            }else if (typeof this.clickAction === "function") { // appel de la fonction si c'est une fonction
                this.clickAction();
            } else if (typeof this.clickAction === "string") { // appel de la fonction correspondante en fonction de la chaîne de caractères
                switch (this.clickAction) {
                    case "addPokemon":
                        this.$emit("addPokemon");
                     
                   }
            }
        }
     }
}

</script>