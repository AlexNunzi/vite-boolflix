<template>
    <div class="card p-3">
        <ul class="list-style-none">
            <li>
                <h4 class="my-3">Il titolo tradotto è: {{ translatedFilmName }}</h4>
                <h3 class="my-3">Il titolo originale è: {{ originalFilmName }}</h3>
                <h5 class="my-3">La lingua originale del film è: {{ languageFilm }}</h5>
                <h5 class="my-3">Il voto medio ricevuto è: {{ voteAvarage }}</h5>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    name: 'CardFilm',
    props: {
        originalFilmName: String,
        translatedFilmName: String,
        languageFilm: String,
        voteAvarage: Number,

    }
}
</script>

<style scoped lang="scss">
.card{
    border: 2px solid red;
}
</style>