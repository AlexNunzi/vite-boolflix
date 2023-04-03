<template>
    <div class="card p-3">
            <li>
                <img class="w-100" :src="`https://image.tmdb.org/t/p/w342/${filmOrTv.poster_path}`" alt="Film cover image">
                <h4 class="my-3">Il titolo tradotto è: {{ filmOrTv.title ? filmOrTv.title : filmOrTv.name }}</h4>
                <h3 class="my-3">Il titolo originale è: {{ filmOrTv.original_title ? filmOrTv.original_title : filmOrTv.name }}</h3>
                <h5 class="my-3">Lingua originale: 
                    <img class="flag" v-if="storage.flagImg[filmOrTv.original_language]" :src="storage.flagImg[filmOrTv.original_language]">
                    <span v-else>{{ filmOrTv.original_language }}</span>
                </h5>
                <h5 class="my-3">Il voto medio ricevuto è: {{ filmOrTv.vote_average / 2 }}</h5>
                <RatingStars :voteStars="filmOrTv.vote_average / 2" />
            </li>
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
        filmOrTv: Object,
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