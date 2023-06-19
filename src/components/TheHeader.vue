<template>
    <header>
        <nav class="container d-flex justify-content-between align-center h-100 m-auto">
            <div class="position-relative logo">
                <h1>BOOLFLIX</h1>
                <h1 class="reflected">BOOLFLIX</h1>
            </div>

            <ul class="d-flex list-style-none flex-grow-1 ms-3">
                <li class="nav-link mx-2 position-relative" v-for="link in storage.navbarLinks" :class="storage.currentPage == link.lable ? 'selected-nav' : ''" @click="selectPage(link.lable)">
                    <a class="text-decoration-none text-white" :href="link.ref">{{ link.lable }}</a>
                </li>
            </ul>

            <div class="d-flex">
                <!-- <label class="label-select me-3 text-white" for="genreFilter">Genere:</label> -->
                <select class="select-genre m-auto" v-model="storage.selectInput" name="genreFilter" id="genreFilter">
                    <option value="">Tutti i generi</option>
                    <option v-for="genre in storage.genresList" :value="genre.id"> {{ genre.name }} </option>
                </select>

                <input class="input-search" type="text" placeholder="Cerca un titolo..." v-model="storage.searchInput" @keyup.enter="$emit('searchFilm')">
                <span class="search px-2 d-flex align-center" @click="$emit('searchFilm')">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>
        </nav>
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
    },
    methods: {
        selectPage(lable) {
            this.storage.currentPage = lable;
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
    border-radius: 0 0.5rem 1rem 0;
    background-color: $bg-search;
    color: lighten($bg-search, 80);
    border: 1px solid $border-search;

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
.search,
.select-genre {
    height: 1.5rem;
}

.label-select{
    color: $text-label-select;
}

.select-genre{
    padding: 2.5px;
    background-color: $bg-input;
    color: $text-color-white;
    border-radius: 1rem 0 0 0.5rem;
}

.selected-nav::after{
    content: '';
    width: 50%;
    height: 2px;
    background-color: $text-color-header;
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translatex(-50%);
}

.nav-link:hover::after{
    content: '';
    width: 50%;
    height: 2px;
    background-color: darken($text-color-header, 20);
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translatex(-50%);
}
</style>