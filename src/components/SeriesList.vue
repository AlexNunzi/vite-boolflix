<template>
    <div class="container m-auto">
        <h2 class="my-3">Lista delle serie tv:</h2>
        <div v-if="storage.seriesList.length > 0" class="d-flex flex-wrap m-auto">
            <CardSerie class="card-container" v-for="serie in storage.seriesList"
            :originalSerieName="serie.original_name"
            :translatedSerieName="serie.name"
            :languageSerie="serie.original_language"
            :voteAvarage="serie.vote_average"
            />
        </div>
        <h3 v-else>Non sono state trovate serie TV che contengano "{{ storage.searchInput }}" nel proprio titolo</h3>
    </div>
</template>

<script>
import CardSerie from './CardSerie.vue';
import { storage } from '../storage.js';
export default{
    name: 'SeriesList',
    components: {
        CardSerie,
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