<template>
    <div v-if="storage.filmList.length != 0" class="container d-flex flex-wrap m-auto">
        <CardFilm class="card-container" v-for="film in storage.filmList"
         :filmName="film.original_title"
         />
    </div>
    <h2 v-else class="text-center">Effettua la tua prima ricerca</h2>
</template>

<script>
import CardFilm from './CardFilm.vue';
import { storage } from '../storage.js'
export default{
    name: 'FilmList',
    components: {
        CardFilm,
    },
    data() {
        return {
            storage,
        }
    }
}
</script>

<style lang="scss">
@use '../styles/variables' as *;

.card-container{
    width: calc(100% / 5);
}
</style>