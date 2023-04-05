<template>
    <header>
        <div class="container d-flex justify-content-between align-center h-100 m-auto">
            <div class="position-relative logo">
                <h1>BOOLFLIX</h1>
                <h1 class="reflected">BOOLFLIX</h1>
            </div>
            <div>
                <label class="label-select d-block mb-2 text-white" for="genreFilter">Filtra in base al genere che stai cercando</label>
                <select class="select-genre d-block m-auto" v-model="storage.selectInput" name="genreFilter" id="genreFilter">
                    <option value="">Tutti i generi</option>
                    <option v-for="genre in storage.genresList" :value="genre.id"> {{ genre.name }} </option>
                </select>
            </div>
            <div>
                <input class="input-search me-3" type="text" placeholder="Cerca un titolo..." v-model="storage.searchInput" @keyup.enter="$emit('searchFilm')">
                <button class="search px-2" @click="$emit('searchFilm')">Cerca</button>
            </div>
        </div>
    </header>
</template>

<script>
import { storage } from '../storage.js';
export default{
    name: 'TheHeader',
    data() {
        return {
            storage,
        }
    }
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

header { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    background-color: $bg-primary;
    height: 5rem;
    box-shadow: 0px 4px 10px 0px darken($bg-body, 20);

    & .logo{
    color: $text-color-header;
    font-size: $header-logo-fs;
}

    & .reflected{
        position: absolute;
        top: 90%;
        left: 0;
        transform: rotatex(180deg) translatey(10px);
        mask-image: linear-gradient(transparent 20%, white 100%);
        -webkit-mask-image: linear-gradient(transparent 20%, white 100%);
    }
}

.search{
    border: none;
    border-radius: 0.5rem;
    background-color: $bg-search;
    color: lighten($bg-search, 80);

    &:hover{
        cursor: pointer;
        transition: all 0.25s;
        transform: scale(1.05);
        background-color: lighten($bg-search, 20);
    }

    &:active{
        transform: scale(0.995);
        background-color: darken($bg-search, 10);

    }
}

.input-search{
    padding-left: 0.25rem;
    background-color: $bg-input;
    border: 1px solid $border-search;
    color: $text-color-white;
    appearance: none;

    &::placeholder{
        color: #c6c6c6;
    }

    &:focus-visible{
        outline: none;
    }
}

.input-search,
.search {
    height: 1.5rem;
}

.label-select{
    color: $text-label-select;
}

.select-genre{
    padding: 2.5px;
    background-color: $bg-color-white;
}
</style>