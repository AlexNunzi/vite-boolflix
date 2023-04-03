<template>
    <div class="card p-3">
        <ul class="list-style-none">
            <li>
                <img class="w-100" :src="`https://image.tmdb.org/t/p/w342/${coverFilm}`" alt="Film cover image">
                <h4 class="my-3">Il titolo tradotto è: {{ translatedFilmName }}</h4>
                <h3 class="my-3">Il titolo originale è: {{ originalFilmName }}</h3>
                <h5 class="my-3">Lingua originale: 
                    <img class="flag" v-if="storage.flagImg[languageFilm]" :src="storage.flagImg[languageFilm]">
                    <span v-else>{{ languageFilm }}</span>
                </h5>
                <h5 class="my-3">Il voto medio ricevuto è: {{ voteAvarage / 2 }}</h5>
                <RatingStars :voteStars="voteAvarage / 2" />
            </li>
        </ul>
    </div>
</template>

<script>
import { storage } from '../storage';
import RatingStars from './RatingStars.vue';
export default{
    name: 'CardFilm',
    data() {
        return {
            storage,
        }
    },
    props: {
        originalFilmName: String,
        translatedFilmName: String,
        languageFilm: String,
        voteAvarage: Number,
        coverFilm: String
    },
    components:{
        RatingStars,
    }
}
</script>

<style scoped lang="scss">
.card{
    border: 2px solid gray;
}

.flag{
    width: 2rem;
}
</style>