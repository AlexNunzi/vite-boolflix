<template>
    <div class="container m-auto">
        <h2 class="my-3">Lista dei film:</h2>
        <div v-if="storage.filmList.length > 0" class="d-flex flex-wrap m-auto">
            <CardFilm class="card-container" v-for="film in storage.filmList"
            :originalFilmName="film.original_title"
            :translatedFilmName="film.title"
            :languageFilm="film.original_language"
            :voteAvarage="film.vote_average"
            />
        </div>
        <h3 v-else>Non sono stati trovati film che contengano "{{ storage.searchInput }}" nel proprio titolo</h3>
    </div>
</template>

<script>
import CardFilm from './CardFilm.vue';
import { storage } from '../storage.js';
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
</style>