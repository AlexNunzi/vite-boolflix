<template>
    <li v-show="selectedGenre()" class="card px-1 py-3">
        <a href="#">
            <div class="film-content h-100 position-relative rounded overflow-hidden">
                <div class="img-film m-auto">
                <!-- SE LA CHIAVE poster_path CONTIENE UN VALORE RENDERIZZA L'IMMAGINE CORRISPONDENTE -->
                    <img v-if="filmOrTv.poster_path != null" class="card-img" :src="`https://image.tmdb.org/t/p/w342/${filmOrTv.poster_path}`" alt="Film cover image">
                <!-- ALTRIMENTI IMMAGINE PLACEHOLDER -->
                    <div v-else class="position-relative">
                        <img src="/img_miss.png" alt="Image not available" class="card-img">
                        <h4 class="missingImg label p-3"> {{ filmOrTv.title ? filmOrTv.title : filmOrTv.name }} </h4>
                    </div>
                </div>
                
                <ul class="info-film list-style-none p-2 overflow-y-auto text-shadow">
                    <li class="my-2">
                        <h5>Titolo: <span class="fw-normal">{{ filmOrTv.title ? filmOrTv.title : filmOrTv.name }}</span></h5>
                    </li>
                    <li class="my-2">
                        <h5>Titolo Originale: <span class="fw-normal">{{ filmOrTv.original_title ? filmOrTv.original_title : filmOrTv.name }}</span></h5>
                    </li>
                    <li class="my-2">
                        <h5>Voti ricevuti - {{ filmOrTv.vote_count }}</h5>
                        <RatingStars :voteStars="filmOrTv.vote_average / 2" />
                    </li>
                    <li class="my-2">
                        <h5>Lingua originale: 
                        
                        <!-- SE IN flagImg ESISTE UNA CHIAVE UGUALE A original_language DELL'OGGETTO FILM RENDERIZZA  -->
                        <!-- LA BANDIERA CORRISPONDENTE -->
                            <img class="flag" v-if="storage.flagImg[filmOrTv.original_language]" :src="storage.flagImg[filmOrTv.original_language]">
                        <!-- ALTRIMENTI MOSTRA LA SIGLA DELLA LINGUA -->
                            <span v-else>{{ filmOrTv.original_language }}</span>
                        </h5>
                    </li>
                    <li class="my-2">
                            <h5>Trama: <span class="fw-light"> {{ filmOrTv.overview }} </span></h5>
                    </li>
                    <li class="my-2">
                        <h5>Cast</h5>
                        <ul v-if="filmOrTv.castInfo" class="list-style-none">
                        <!-- STAMPA OGNI NOME PRESENTE ALLA KEY castInfo DI filmOrTv -->
                            <li v-for="char in filmOrTv.castInfo.cast" class="fs-small"> 
                                {{ char.name }} 
                            </li>
                        </ul>
                    </li>
                    <li class="my-2">
                        <h5>Generi associati</h5>
                        <ul class="list-style-none fs-small">
                        <!-- STAMPA OGNI GENERE PRESENTE ALLA KEY genre_ids CODIFICANDONE IL VALORE TRAMITE LA FUNZIONE findGenre(id) -->
                            <li v-for="genre in filmOrTv.genre_ids"> {{ findGenre(genre) }} </li>
                        </ul>
                    </li>
                </ul>

            </div>
        </a>
    </li>
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
        filmOrTv: Object
    },
    components:{
        RatingStars,
    },
    methods:{
        findGenre(id){
            return this.storage.genresList.filter(genre => genre.id == id)[0].name;
        },
        selectedGenre(){
            if(this.storage.selectInput != ''){
                let included = false;
                for(let i = 0; i < this.filmOrTv.genre_ids.length; i++){
                    if(this.storage.selectInput == this.filmOrTv.genre_ids[i]){
                        included = true;
                    }
                return included;
                }
            } else {
                return true;
            }
        }
    }
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
.card-img{
    position: relative;
    z-index: 10;
    height: 400px;
    object-fit: cover;
    display: block;
}
.flag{
    width: 1rem;
}

.missingImg{
    position: absolute;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.info-film{
    color: $text-info;
    opacity: 0;
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.film-content{
    border: 1px solid transparent;
}

.film-content:hover{
    transform: scale(1.15);
    transition: all 1s;
    z-index: 100;
    background-color: $bg-film-content;
    border: solid 1px $border-card-hover;

    & .img-film{
        transition: all 1s;
        opacity: 0.25;
    }

    & .info-film{
        transition: all 1s;
        opacity: 1;
    }
}


</style>