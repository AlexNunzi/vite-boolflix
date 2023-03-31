<template>
    <div class="card p-3">
        <ul class="list-style-none">
            <li>
                <h4 class="my-3">Il titolo tradotto è: {{ translatedSerieName }}</h4>
                <h3 class="my-3">Il titolo originale è: {{ originalSerieName }}</h3>
                <h5 class="my-3">Lingua originale: 
                    <img class="flag" v-if="storage.flagImg[languageSerie]" :src="storage.flagImg[languageSerie]">
                    <span v-else>{{ languageSerie }}</span>
                </h5>
                <h5 class="my-3">Il voto medio ricevuto è: {{ voteAvarage }}</h5>
            </li>
        </ul>
    </div>
</template>

<script>
import { storage } from '../storage';
export default{
    name: 'CardSerie',
    data() {
        return {
            storage,
        }
    },
    props: {
        originalSerieName: String,
        translatedSerieName: String,
        languageSerie: String,
        voteAvarage: Number,
    }
}
</script>

<style scoped lang="scss">
.card{
    border: 2px solid red;
}

.flag{
    width: 2rem;
}
</style>